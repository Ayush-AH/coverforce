"use client";

/**
 * IntegrationWavePlane – copy of the product WavePlane3D, scoped to the
 * integration page so it can be customised independently.
 *
 * Current customisations:
 *  - Grid lines kept, but the wave surface has NO colour fill (transparent),
 *    so only the animated grid is visible.
 *
 * Usage:
 *   import { IntegrationWaveCanvas } from "@/components/integration/IntegrationWavePlane";
 *   <IntegrationWaveCanvas className="h-full w-full" />
 */

import {
  shaderMaterial,
  PerspectiveCamera,
} from "@react-three/drei";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";
import React, {
  type FC,
  useMemo,
  useRef,
} from "react";
import { ShaderMaterial, Vector3 } from "three";

// ─── Inline shaders ─────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uScrollProgress;
varying vec2  vUv;
varying float vTerrainHeight;

// Self-contained simplex 3-D noise (no glslify)
vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i =floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g =step(x0.yzx,x0.xyz);
  vec3 l =1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289v3(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.,i1.z,i2.z,1.))
   +i.y+vec4(0.,i1.y,i2.y,1.))
   +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vec3 noiseInput=vec3(position.x/4.,(position.y/4.)+uScrollProgress,uTime*0.2);
  float n=snoise(noiseInput);
  n=n*0.5+0.5;
  vec3 newPosition=position;
  newPosition.z+=n*1.5;
  vec4 modelPosition   =modelMatrix   *vec4(newPosition,1.);
  vec4 viewPosition    =viewMatrix    *modelPosition;
  vec4 projectedPosition=projectionMatrix*viewPosition;
  vTerrainHeight=n;
  vUv=uv;
  gl_Position=projectedPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform float uScrollProgress;
uniform vec3  uGridColour;
uniform bool  uShowGrid;
uniform float uGridSize;
varying vec2  vUv;
varying float vTerrainHeight;

const vec4 BG_COLOUR=vec4(0.,0.,0.,0.);

void main(){
  // No colour fill on the wave surface – fully transparent.
  vec4 finalColour=vec4(0.,0.,0.,0.);

  if(uShowGrid){
    float thick=0.012;
    float linePosY=fract(vUv.y*uGridSize+uScrollProgress*6.);
    float alphaY=1.-step(thick,linePosY);
    float linePosX=fract(vUv.x*uGridSize);
    float alphaX=1.-step(thick,linePosX);
    float lineAlpha=max(alphaY,alphaX);
    vec4 lineCol=vec4(uGridColour,1.);
    finalColour=mix(finalColour,lineCol,lineAlpha*0.45);
  }

  float dist=distance(vUv,vec2(0.5));
  float fog=smoothstep(0.35,0.5,dist);
  finalColour=mix(finalColour,BG_COLOUR,fog);

  gl_FragColor=finalColour;
}
`;

function hexToVec3(hex: string): Vector3 {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6,8}$/.test(h)) return new Vector3(1, 1, 1);
  return new Vector3(
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  );
}

const DEFAULT_GRID_COLOUR = "#ffffff";

// ─── Shader material ─────────────────────────────────────────────────────────

type Uniforms = {
  uTime: number;
  uScrollProgress: number;
  uGridColour: Vector3;
  uShowGrid: boolean;
  uGridSize: number;
};

const IntegrationWavePlaneMaterial = shaderMaterial(
  {
    uTime: 0,
    uScrollProgress: 0,
    uGridColour: hexToVec3(DEFAULT_GRID_COLOUR),
    uShowGrid: true,
    uGridSize: 24,
  } as Uniforms,
  vertexShader,
  fragmentShader
);

extend({ IntegrationWavePlaneMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    integrationWavePlaneMaterial: {
      ref?: React.Ref<ShaderMaterial & Uniforms>;
      uTime: number;
      uScrollProgress: number;
      uGridColour: Vector3;
      uShowGrid: boolean;
      uGridSize: number;
      transparent?: boolean;
      key?: string;
    };
  }
}

// ─── WavePlane mesh ──────────────────────────────────────────────────────────

const WavePlane: FC<{ showGrid: boolean; gridColour: Vector3 }> = ({
  showGrid,
  gridColour,
}) => {
  const viewport = useThree((s) => s.viewport);
  const matRef = useRef<ShaderMaterial & Uniforms>(null);

  const size = useMemo(() => Math.max(Math.round(viewport.width + 2), Math.round(viewport.height * 2)), [viewport]);
  const segments = useMemo(() => size * 8, [size]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    matRef.current.uTime = clock.elapsedTime;
    matRef.current.uScrollProgress = 0;
    matRef.current.uGridColour = gridColour;
    matRef.current.uShowGrid = showGrid;
  });

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-0.28 * Math.PI, 0, 0]}
    >
      <planeGeometry args={[size, size, segments, segments]} />
      <integrationWavePlaneMaterial
        ref={matRef}
        key={IntegrationWavePlaneMaterial.key}
        uTime={0}
        uScrollProgress={0}
        uGridColour={gridColour}
        uShowGrid={showGrid}
        uGridSize={24}
        transparent
      />
    </mesh>
  );
};

// ─── Static camera – locked at the "mouse to top-center" incline ─────────────

const StaticCamera: FC = () => {
  useFrame(({ camera, scene }) => {
    camera.lookAt(scene.position);
  });

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0.7, 9]}
      fov={60}
      far={40}
      near={0.001}
    />
  );
};

// ─── Public canvas export ────────────────────────────────────────────────────

type CanvasProps = {
  className?: string;
  gridColor?: string;
  showGrid?: boolean;
};

export const IntegrationWaveCanvas: FC<CanvasProps> = ({
  className,
  gridColor = DEFAULT_GRID_COLOUR,
  showGrid = true,
}) => {
  const gridColour = useMemo(() => hexToVec3(gridColor), [gridColor]);
  const canvasKey = gridColor;

  return (
    <Canvas
      key={canvasKey}
      className={className}
      camera={{ position: [0, 0, 5], fov: 60, far: 20, near: 0.001 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <WavePlane showGrid={showGrid} gridColour={gridColour} />
      <StaticCamera />
    </Canvas>
  );
};
