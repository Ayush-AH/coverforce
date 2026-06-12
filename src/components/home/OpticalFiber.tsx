"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type OpticalFiberProps = {
  className?: string;
  /** Scales the 3D scene inside the canvas without changing container size. */
  contentScale?: number;
  /** Half-arc as a fraction of π (0.5 = 180° semicircle). */
  fanSpread?: number;
  /** Multiplier for how far fibers extend from the origin. */
  fanReach?: number;
  /** Camera field of view — wider helps fit a broad arc. */
  fov?: number;
  /** Compresses vertical reach without affecting horizontal spread. */
  fanHeight?: number;
  /** Shifts the fan horizontally inside the canvas. */
  fanOffsetX?: number;
};

export default function OpticalFiber({
  className = "",
  contentScale = 1,
  fanSpread = 0.47,
  fanReach = 1,
  fov = 75,
  fanHeight = 1,
  fanOffsetX = 0,
}: OpticalFiberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
    camera.position.set(0, 7 / contentScale, 12 / contentScale);

    const ORIGIN = new THREE.Vector3(0, -3, 0);
    const content = new THREE.Group();
    content.position.x = fanOffsetX;
    scene.add(content);

    const LINE_COUNT = 160;
    const MIN_LEN = 4 * fanReach;
    const MAX_LEN = 13 * fanReach;
    const halfSpread = Math.PI * fanSpread;

    const WAVE_RADIUS = 4.0;
    const WAVE_SEGMENTS = 24;
    const WAVE_AMP = 0.8;
    const WAVE_SPEED = 1.5;
    const WAVE_FREQ = 2.0;
    const AMBIENT_AMP = 0.5;
    const AMBIENT_SPEED = 0.72;
    const WANDER_RADIUS = 8.5;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ambientAmp = reducedMotion ? 0 : AMBIENT_AMP;
    const wanderRadius = reducedMotion ? 0 : WANDER_RADIUS;

    const mouse = new THREE.Vector2(0, 0);
    const mouseWorld = new THREE.Vector3();
    const smoothMouse = new THREE.Vector3(0, ORIGIN.y, 0);
    let mouseActive = false;
    const wanderTarget = new THREE.Vector3();
    const smoothWander = new THREE.Vector3();
    const mouseLocal = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const hitPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const _tmp = new THREE.Vector3();

    const updateMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const snapMouseToPointer = () => {
      raycaster.setFromCamera(mouse, camera);
      if (!raycaster.ray.intersectPlane(hitPlane, mouseWorld)) return;
      smoothMouse.copy(mouseWorld);
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMouse(e);
      if (!mouseActive) {
        mouseActive = true;
        snapMouseToPointer();
        return;
      }
      mouseActive = true;
    };

    const onMouseEnter = (e: MouseEvent) => {
      updateMouse(e);
      mouseActive = true;
      snapMouseToPointer();
    };

    const onMouseLeave = () => {
      mouseActive = false;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    const fibers: {
      line: THREE.Line;
      basePts: THREE.Vector3[];
      perpX: number;
      perpY: number;
      phase: number;
      end: THREE.Vector3;
    }[] = [];

    for (let i = 0; i < LINE_COUNT; i++) {
      const baseAngle =
        LINE_COUNT > 1 ? -halfSpread + (i / (LINE_COUNT - 1)) * 2 * halfSpread : 0;
      const angleJitter = (Math.random() - 0.5) * ((halfSpread * 2) / LINE_COUNT) * 0.85;
      const angle = baseAngle + angleJitter;
      const length = MIN_LEN + Math.random() * (MAX_LEN - MIN_LEN);
      const zJitter = (Math.random() - 0.5) * 0.15;

      const end = new THREE.Vector3(
        Math.sin(angle) * length,
        ORIGIN.y + Math.cos(angle) * length * fanHeight,
        zJitter,
      );

      const basePts: THREE.Vector3[] = [];
      for (let s = 0; s <= WAVE_SEGMENTS; s++) {
        basePts.push(new THREE.Vector3().lerpVectors(ORIGIN, end, s / WAVE_SEGMENTS));
      }

      const dir = new THREE.Vector3().subVectors(end, ORIGIN).normalize();
      const perpX = -dir.y;
      const perpY = dir.x;

      const t = (length - MIN_LEN) / (MAX_LEN - MIN_LEN);
      const opacity = THREE.MathUtils.lerp(0.55, 0.1, t);
      const phase = Math.random() * Math.PI * 2;

      const geo = new THREE.BufferGeometry().setFromPoints(basePts);
      const mat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      content.add(line);

      fibers.push({ line, basePts, perpX, perpY, phase, end: end.clone() });
    }

    const dotPositions = new Float32Array(LINE_COUNT * 3);
    const dotColors = new Float32Array(LINE_COUNT * 3);

    for (let i = 0; i < LINE_COUNT; i++) {
      const ep = fibers[i].end;
      const dist = ep.distanceTo(ORIGIN);
      const t = THREE.MathUtils.clamp((dist - MIN_LEN) / (MAX_LEN - MIN_LEN), 0, 1);

      dotPositions[i * 3] = ep.x;
      dotPositions[i * 3 + 1] = ep.y;
      dotPositions[i * 3 + 2] = ep.z;

      dotColors[i * 3] = THREE.MathUtils.lerp(1.0, 0.72, t);
      dotColors[i * 3 + 1] = THREE.MathUtils.lerp(1.0, 0.7, t);
      dotColors[i * 3 + 2] = 1.0;
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    content.add(new THREE.Points(dotGeo, dotMat));

    const buildGlowTexture = (size = 256) => {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0.0, "rgba(255,255,255,1.0)");
      grad.addColorStop(0.1, "rgba(210,205,255,0.85)");
      grad.addColorStop(0.35, "rgba(150,140,255,0.35)");
      grad.addColorStop(0.7, "rgba(80,70,200,0.10)");
      grad.addColorStop(1.0, "rgba(0,0,0,0.00)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    };

    const glowSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: buildGlowTexture(512),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 1.0,
      }),
    );
    glowSprite.scale.set(5, 5, 1);
    glowSprite.position.copy(ORIGIN);
    content.add(glowSprite);

    const innerSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: buildGlowTexture(256),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 1.0,
      }),
    );
    innerSprite.scale.set(1.4, 1.4, 1);
    innerSprite.position.copy(ORIGIN);
    content.add(innerSprite);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const clock = new THREE.Clock();
    let animId = 0;
    let visible = true;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(container);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!visible) return;

      const t = clock.getElapsedTime();

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(hitPlane, mouseWorld);
      if (mouseActive) {
        const mouseGap = smoothMouse.distanceTo(mouseWorld);
        smoothMouse.lerp(mouseWorld, mouseGap > 5 ? 0.4 : 0.22);
      }

      wanderTarget.set(
        Math.sin(t * 0.28) * wanderRadius,
        ORIGIN.y + 2.2 + Math.cos(t * 0.23) * 2.4,
        0,
      );
      smoothWander.lerp(wanderTarget, 0.055);
      mouseLocal.set(smoothMouse.x - fanOffsetX, smoothMouse.y, smoothMouse.z);

      for (let i = 0; i < LINE_COUNT; i++) {
        const { line, basePts, perpX, perpY, phase } = fibers[i];
        const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;

        for (let s = 0; s <= WAVE_SEGMENTS; s++) {
          const base = basePts[s];
          const u = s / WAVE_SEGMENTS;

          _tmp.set(base.x, base.y, base.z);
          const mouseDist = _tmp.distanceTo(mouseLocal);
          const mouseInfluence = mouseActive ? Math.max(0, 1 - mouseDist / WAVE_RADIUS) : 0;
          const wanderDist = _tmp.distanceTo(smoothWander);
          const wanderInfluence = Math.max(0, 1 - wanderDist / (WAVE_RADIUS * 1.65));

          const ambientWave =
            ambientAmp * u * Math.sin(WAVE_FREQ * Math.PI * u * 0.85 - t * AMBIENT_SPEED + phase);
          const mouseWave =
            mouseInfluence *
            WAVE_AMP *
            u *
            Math.sin(WAVE_FREQ * Math.PI * u - t * WAVE_SPEED + phase);
          const wanderWave =
            wanderInfluence *
            ambientAmp *
            1.9 *
            u *
            Math.sin(WAVE_FREQ * Math.PI * u * 0.7 - t * AMBIENT_SPEED * 0.85 + phase * 1.2);
          const wave = ambientWave + mouseWave + wanderWave;

          posAttr.setXYZ(s, base.x + perpX * wave, base.y + perpY * wave, base.z);
        }
        posAttr.needsUpdate = true;

        const tip = WAVE_SEGMENTS;
        dotPositions[i * 3] = posAttr.getX(tip);
        dotPositions[i * 3 + 1] = posAttr.getY(tip);
        dotPositions[i * 3 + 2] = posAttr.getZ(tip);
      }

      dotGeo.attributes.position.needsUpdate = true;

      const pulse = 0.9 + Math.sin(t * 1.4) * 0.1;
      glowSprite.scale.set(5 * pulse, 5 * pulse, 1);
      innerSprite.material.opacity = 0.85 + Math.sin(t * 2.1) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      renderer.dispose();
    };
  }, [contentScale, fanSpread, fanReach, fov, fanHeight, fanOffsetX]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
