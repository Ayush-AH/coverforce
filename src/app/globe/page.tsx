"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2800;
const SPHERE_RADIUS = 1.35;
const ATTRACT_RADIUS = 1.6;

interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

function Particles() {
  const meshRef = useRef<THREE.Points>(null!);
  const mouse = useRef<MouseState>({ x: 0, y: 0, active: false });
  const { size, camera } = useThree();

  const { positions, basePositions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const base = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = SPHERE_RADIUS * (0.85 + Math.random() * 0.3);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      pos[i * 3] = x;      pos[i * 3 + 1] = y;      pos[i * 3 + 2] = z;
      base[i * 3] = x;     base[i * 3 + 1] = y;     base[i * 3 + 2] = z;
      vel[i * 3] = 0;      vel[i * 3 + 1] = 0;      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, basePositions: base, velocities: vel };
  }, []);

  const colors = useMemo(() => {
    const blue = [0.05, 0.22, 0.92];
    const purple = [0.48, 0.24, 0.88];
    const pink = [0.92, 0.42, 0.78];
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random();
      const from = t < 0.5 ? blue : purple;
      const to = t < 0.5 ? purple : pink;
      const mix = (t % 0.5) / 0.5 + (Math.random() - 0.5) * 0.08;

      col[i * 3]     = from[0] + (to[0] - from[0]) * mix;
      col[i * 3 + 1] = from[1] + (to[1] - from[1]) * mix;
      col[i * 3 + 2] = from[2] + (to[2] - from[2]) * mix;
    }
    return col;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent): void => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouse.current.x = (clientX / size.width) * 2 - 1;
      mouse.current.y = -(clientY / size.height) * 2 + 1;
      mouse.current.active = true;
    };
    const onLeave = (): void => {
      mouse.current.active = false;
    };

    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("touchmove", onMove as EventListener, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [size]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(
      new THREE.Vector2(mouse.current.x, mouse.current.y),
      camera
    );
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const cursorWorld = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, cursorWorld);

    const rotSpeed = 0.12;
    const cosR = Math.cos(t * rotSpeed);
    const sinR = Math.sin(t * rotSpeed);
    const springK = 0.07;
    const damping = 0.82;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      // Rotate base position slowly around Y axis
      const rx = bx * cosR - bz * sinR;
      const rz = bx * sinR + bz * cosR;

      let tx = rx;
      let ty = by;
      let tz = rz;

      if (mouse.current.active) {
        const dx = cursorWorld.x - arr[i3];
        const dy = cursorWorld.y - arr[i3 + 1];
        const dist2D = Math.sqrt(dx * dx + dy * dy);

        if (dist2D < 1.1) {
          // Attract to the outer arc shell
          const len = Math.sqrt(tx * tx + ty * ty + tz * tz);
          const norm = ATTRACT_RADIUS / (len + 0.0001);
          tx *= norm;
          ty *= norm;
          tz *= norm;

          // Tangential swirl nudge
          const influence = Math.max(0, 1 - dist2D / 1.1);
          tx += -dy * 0.3 * influence;
          ty +=  dx * 0.3 * influence;
        }
      }

      // Spring physics
      velocities[i3]     = (velocities[i3]     + (tx - arr[i3])     * springK) * damping;
      velocities[i3 + 1] = (velocities[i3 + 1] + (ty - arr[i3 + 1]) * springK) * damping;
      velocities[i3 + 2] = (velocities[i3 + 2] + (tz - arr[i3 + 2]) * springK) * damping;

      arr[i3]     += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

const GlobePage: React.FC = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(ellipse at 60% 40%, #fce4f0 0%, #f3e8ff 50%, #fdf0ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default GlobePage;