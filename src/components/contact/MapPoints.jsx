"use client";

import React, { useMemo, useRef, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

import mapDotsData from '@/data/mapDots.json';

const vertexShader = `
  uniform vec2 uMouse;
  uniform float uBulgeRadius;
  uniform float uBulgeStrength;
  
  attribute float randomAlpha;
  varying float vAlpha;

  void main() {
    vAlpha = randomAlpha;
    
    vec3 pos = position;
    
    float dist = distance(vec2(pos.x, pos.y), uMouse);
    
    if (dist < uBulgeRadius && dist > 0.001) {
      float influence = 1.0 - smoothstep(0.0, uBulgeRadius, dist);
      influence = influence * influence;
      
      vec2 dir = normalize(vec2(pos.x, pos.y) - uMouse);
      
      pos.x += dir.x * influence * uBulgeStrength;
      pos.y += dir.y * influence * uBulgeStrength;
      pos.z += influence * 8.0;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    gl_PointSize = 4.8 * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vAlpha;
  
  void main() {
    vec2 circCoord = 2.0 * gl_PointCoord - 1.0;
    if (dot(circCoord, circCoord) > 1.0) {
      discard;
    }
    gl_FragColor = vec4(0.8, 0.8, 0.8, vAlpha);
  }
`;

/* Inline SVG icons */
const IconPin = () => (
  <svg className="shrink-0 w-3.5 h-3.5 mt-[1px] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg className="shrink-0 w-3.5 h-3.5 mt-[1px] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMail = () => (
  <svg className="shrink-0 w-3.5 h-3.5 mt-[1px] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function MapPoints() {
  const materialRef = useRef();
  const { viewport, size } = useThree();
  const [isHovering, setIsHovering] = useState(false);
  const hoveringRef = useRef(false);

  const groupPosition = useMemo(() => {
    if (size.width < 1024) return [-95, 4, 0];
    return [0, 0, 0];
  }, [size.width]);

  const { positions, alphas, nyCoords } = useMemo(() => {
    const dotCount = mapDotsData.length / 2;
    const posArr = new Float32Array(dotCount * 3);
    const alpArr = new Float32Array(dotCount);

    for (let i = 0; i < dotCount; i++) {
      posArr[i * 3]     = mapDotsData[i * 2];
      posArr[i * 3 + 1] = mapDotsData[i * 2 + 1];
      posArr[i * 3 + 2] = 0;
      alpArr[i] = Math.random() > 0.85 ? 0.3 : 0.8 + Math.random() * 0.2;
    }

    const ny = [80, -4, 0];
    return { positions: posArr, alphas: alpArr, nyCoords: ny };
  }, []);

  const smoothMouse = useRef(new THREE.Vector2(-9999, -9999));

  useFrame((state) => {
    if (materialRef.current) {
      if (hoveringRef.current) {
        // When hovering button/popup, send bulge far offscreen so it disappears
        smoothMouse.current.lerp(new THREE.Vector2(-9999, -9999), 0.12);
      } else {
        const mouseX = (state.pointer.x * viewport.width) / 2;
        const mouseY = (state.pointer.y * viewport.height) / 2;
        smoothMouse.current.lerp(new THREE.Vector2(mouseX, mouseY), 0.15);
      }
      materialRef.current.uniforms.uMouse.value.copy(smoothMouse.current);
    }
  });

  const uniforms = useMemo(() => ({
    uMouse: { value: new THREE.Vector2(-9999, -9999) },
    uBulgeRadius: { value: 100.0 },
    uBulgeStrength: { value: 15.0 },
  }), []);

  const handleEnter = useCallback(() => {
    hoveringRef.current = true;
    setIsHovering(true);
  }, []);

  const handleLeave = useCallback(() => {
    hoveringRef.current = false;
    setIsHovering(false);
  }, []);

  return (
    <group position={groupPosition}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-randomAlpha"
            count={alphas.length}
            array={alphas}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
        />
      </points>

      {/* New York Marker */}
      <mesh position={nyCoords}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
        <Html position={[25, -10, 0]} center zIndexRange={[100, 0]}>
          <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {/* ── Dot indicator ── */}
            <span
              className={`absolute left-[-18.5px] top-[20%] w-2 h-2 rounded-full bg-white transition-shadow duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovering
                  ? 'shadow-[0_0_12px_4px_rgba(255,255,255,0.5)]'
                  : 'shadow-[0_0_6px_2px_rgba(255,255,255,0.3)]'
              }`}
            />

            {/* ── NEW YORK Button ── */}
            <div
              className={`px-2.5 py-1 font-bold text-[11px] whitespace-nowrap rounded-[2px] cursor-pointer transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                isHovering
                  ? 'bg-white/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35),0_0_0_2px_rgba(255,255,255,0.2)]'
                  : 'bg-white/95 text-[#1e3a8a] shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
              }`}
            >
              NEW YORK
            </div>

            {/* ── Popup Card ── */}
            <div
              className={`absolute top-full left-1/2 mt-[14px] w-[380px] bg-white/5 backdrop-blur-[24px] border border-white/10 rounded-md overflow-hidden flex flex-row shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)] origin-top transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovering
                  ? 'opacity-100 pointer-events-auto -translate-x-1/2 translate-y-0'
                  : 'opacity-0 pointer-events-none -translate-x-1/2 translate-y-2'
              }`}
            >
              {/* Left: Image */}
              <div className="w-1/2 min-h-[180px] bg-[url(/images/contact/thumbnail_cv.jpg)] bg-cover bg-center" />

              {/* Right: Info */}
              <div className="w-1/2 px-3 py-4 flex flex-col justify-between">
                <h3 className="m-0 text-[18px]! font-medium text-white">CoverForce Inc.</h3>

                <div className="flex items-start gap-2 text-[11px] text-white/70 leading-[1.45]">
                  <IconPin />
                  <span>485 Madison Ave Ste 1702, New York, NY 10022, United States</span>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-white/70 leading-[1.45]">
                  <IconPhone />
                  <span>+1 917-905-6508</span>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-white/70 leading-[1.45]">
                  <IconMail />
                  <span>sales@coverforce.com</span>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}
