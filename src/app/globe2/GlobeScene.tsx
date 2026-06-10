"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── constants ────────────────────────────────────────────────────────────────
const COUNT        = 1400;
const RING_R       = 0.9;
const RING_CORE    = 0.18;       // thin ring spine — fewer particles
const CORE_SPREAD  = 0.018;      // very narrow band on the circle
const HALO_MIN     = 0.05;       // closest halo distance from ring (not on spine)
const HALO_MAX     = 0.26;       // farthest halo distance from ring
const ATTRACT_DIST = 0.88;       // mouse influence radius
const SPRING_K     = 0.055;
const DAMPING      = 0.78;
const NOISE_SPEED  = 0.00018;
const NOISE_AMP    = 0.04;
const PULSE_SPEED  = 1.5;
const PULSE_AMP    = 0.034;
const TANGENT_SPREAD = 0.3;      // scatter along ring — breaks orbit rings
const JITTER_SPREAD  = 0.13;     // extra random XY scatter
const DRIFT_AMP    = 0.022;

// ─── tiny fast simplex-like hash noise (no external dep) ─────────────────────
function hash(n: number): number {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}
function noise2(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix,        fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix      + iy * 57.0);
  const b = hash(ix + 1  + iy * 57.0);
  const c = hash(ix      + (iy + 1) * 57.0);
  const d = hash(ix + 1  + (iy + 1) * 57.0);
  return a + (b - a) * ux + (c - a) * uy + (d - b + a - c) * ux * uy;
}

// ─── vertex shader ────────────────────────────────────────────────────────────
const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3  aColor;
  varying   float vAlpha;
  varying   vec3  vColor;

  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (560.0 / -mvPos.z);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

// ─── fragment shader ──────────────────────────────────────────────────────────
const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vec2  uv   = gl_PointCoord * 2.0 - 1.0;
    float dist = dot(uv, uv);
    if (dist > 1.0) discard;
    float core = 1.0 - smoothstep(0.15, 1.0, dist);
    float alpha = vAlpha * core;
    gl_FragColor = vec4(vColor * 1.15, alpha);
  }
`;

// ─── main particle component ──────────────────────────────────────────────────
function Particles() {
  const meshRef  = useRef<THREE.Points>(null!);
  const mouse    = useRef({ x: 0, y: 0, active: false });
  const { size, camera } = useThree();

  // ── per-particle data ──────────────────────────────────────────────────────
  const data = useMemo(() => {
    const angles      = new Float32Array(COUNT);
    const baseRadii   = new Float32Array(COUNT);
    const noiseOffset = new Float32Array(COUNT);   // seed per particle
    const positions   = new Float32Array(COUNT * 3);
    const velocities  = new Float32Array(COUNT * 3);
    const sizes       = new Float32Array(COUNT);
    const alphas      = new Float32Array(COUNT);
    const colors      = new Float32Array(COUNT * 3);
    const ringCore    = new Uint8Array(COUNT);
    const haloSide    = new Int8Array(COUNT);
    const haloBaseX   = new Float32Array(COUNT);
    const haloBaseY   = new Float32Array(COUNT);
    const wavePhase   = new Float32Array(COUNT);
    const ringCount   = Math.floor(COUNT * RING_CORE);

    for (let i = 0; i < COUNT; i++) {
      const onRing = i < ringCount;
      ringCore[i] = onRing ? 1 : 0;

      let angle: number;
      let r: number;

      if (onRing) {
        angle = (i / ringCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.06;
        r = RING_R + (Math.random() - 0.5) * CORE_SPREAD;
      } else {
        angle = Math.random() * Math.PI * 2;
        haloSide[i] = Math.random() < 0.5 ? -1 : 1;
        wavePhase[i] = Math.random() * Math.PI * 2;

        const ca = Math.cos(angle);
        const sa = Math.sin(angle);
        const radial = haloSide[i] * (HALO_MIN + Math.random() * (HALO_MAX - HALO_MIN));
        const tangent = (Math.random() - 0.5) * TANGENT_SPREAD;
        const jitterX = (Math.random() - 0.5) * JITTER_SPREAD;
        const jitterY = (Math.random() - 0.5) * JITTER_SPREAD;

        const bx = RING_R * ca + ca * radial - sa * tangent + jitterX;
        const by = RING_R * sa + sa * radial + ca * tangent + jitterY;
        haloBaseX[i] = bx;
        haloBaseY[i] = by;
        r = Math.sqrt(bx * bx + by * by);
      }

      angles[i]      = angle;
      baseRadii[i]   = r;
      noiseOffset[i] = Math.random() * 100;

      const x = onRing ? r * Math.cos(angle) : haloBaseX[i];
      const y = onRing ? r * Math.sin(angle) : haloBaseY[i];
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;

      sizes[i]  = onRing
        ? 0.058 + Math.random() * 0.03
        : 0.048 + Math.random() * 0.042;
      alphas[i] = onRing
        ? 0.9 + Math.random() * 0.1
        : 0.38 + Math.random() * 0.42;

      // pink (top) → purple (bottom) by Y position
      const gradT = THREE.MathUtils.clamp((y / (RING_R + HALO_MAX) + 1) * 0.5, 0, 1);
      const pink   = [1.0, 0.43, 0.71];
      const purple = [0.63, 0.25, 0.82];
      colors[i * 3]     = purple[0] + (pink[0] - purple[0]) * gradT;
      colors[i * 3 + 1] = purple[1] + (pink[1] - purple[1]) * gradT;
      colors[i * 3 + 2] = purple[2] + (pink[2] - purple[2]) * gradT;
    }

    return { angles, baseRadii, noiseOffset, positions, velocities, sizes, alphas, colors, ringCore, haloSide, haloBaseX, haloBaseY, wavePhase };
  }, []);

  // ── build geometry ─────────────────────────────────────────────────────────
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute("aSize",    new THREE.BufferAttribute(data.sizes,     1));
    geo.setAttribute("aAlpha",   new THREE.BufferAttribute(data.alphas,    1));
    geo.setAttribute("aColor",   new THREE.BufferAttribute(data.colors,    3));
    return geo;
  }, [data]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite:  false,
    blending:    THREE.NormalBlending,
  }), []);

  // ── mouse tracking ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent): void => {
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouse.current.x = (cx / size.width)  *  2 - 1;
      mouse.current.y = (cy / size.height) * -2 + 1;
      mouse.current.active = true;
    };
    const onLeave = (): void => { mouse.current.active = false; };

    window.addEventListener("mousemove",  onMove as EventListener);
    window.addEventListener("touchmove",  onMove as EventListener, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove",  onMove as EventListener);
      window.removeEventListener("touchmove",  onMove as EventListener);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [size]);

  // ── per-frame update ───────────────────────────────────────────────────────
  useFrame((state) => {
    const t   = state.elapsed;
    const pos = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouse.current.x, mouse.current.y), camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const cursorWorld = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, cursorWorld);

    const { angles, baseRadii, noiseOffset, velocities, ringCore, haloSide, haloBaseX, haloBaseY, wavePhase } = data;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const angle = angles[i];
      const onRing = ringCore[i] === 1;

      let tx: number;
      let ty: number;
      let springK = SPRING_K;
      let damp = DAMPING;

      if (onRing) {
        const r = baseRadii[i];
        tx = r * Math.cos(angle);
        ty = r * Math.sin(angle);
      } else {
        const anchorX = RING_R * Math.cos(angle);
        const anchorY = RING_R * Math.sin(angle);
        let nx = haloBaseX[i] - anchorX;
        let ny = haloBaseY[i] - anchorY;
        const nlen = Math.hypot(nx, ny) || 1;
        nx /= nlen;
        ny /= nlen;
        const tangX = -ny;
        const tangY = nx;

        const wobbleR = Math.sin(t * PULSE_SPEED + wavePhase[i]) * PULSE_AMP;
        const wobbleT = Math.sin(t * PULSE_SPEED * 0.82 + wavePhase[i] * 1.6) * PULSE_AMP * 0.5;
        const driftX = (noise2(noiseOffset[i] + t * 0.35, i * 0.02) - 0.5) * DRIFT_AMP * 2;
        const driftY = (noise2(i * 0.02, noiseOffset[i] + t * 0.35) - 0.5) * DRIFT_AMP * 2;

        tx = haloBaseX[i] + nx * wobbleR + tangX * wobbleT + driftX;
        ty = haloBaseY[i] + ny * wobbleR + tangY * wobbleT + driftY;
        springK = SPRING_K * 1.2;
        damp = 0.76;
      }

      if (mouse.current.active) {
        const cx = arr[i3];
        const cy = arr[i3 + 1];
        const dx = cursorWorld.x - cx;
        const dy = cursorWorld.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < ATTRACT_DIST) {
          const strength = Math.pow(1 - d / ATTRACT_DIST, 2);
          if (onRing) {
            const currentR = Math.sqrt(cx * cx + cy * cy);
            const pullR = currentR + (RING_R - currentR) * strength * 1.6;
            tx = pullR * Math.cos(angle);
            ty = pullR * Math.sin(angle);
          } else {
            const ringX = RING_R * Math.cos(angle);
            const ringY = RING_R * Math.sin(angle);
            const pull = Math.min(1, strength * 1.45);
            tx += (ringX - tx) * pull;
            ty += (ringY - ty) * pull;
          }
        }
      }

      velocities[i3] = (velocities[i3] + (tx - arr[i3]) * springK) * damp;
      velocities[i3 + 1] = (velocities[i3 + 1] + (ty - arr[i3 + 1]) * springK) * damp;
      velocities[i3 + 2] = 0;

      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
    }

    pos.needsUpdate = true;
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

export default function GlobeScene() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 50%, hsla(24, 92%, 70%, 0) 0%, rgba(249, 109, 149, .075) 18%, rgba(153, 61, 240, .05) 28%, rgba(125, 31, 255, 0) 38%)",
      }}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 185, near: 0.1, far: 100 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
