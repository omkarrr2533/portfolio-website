"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';

/* Brand hue window (emerald → cyan → indigo) so the weave stays on-palette
   instead of a full random rainbow. */
const HUE_MIN = 0.38;
const HUE_MAX = 0.66;

// --- Main Hero Component (standalone demo variant) ---
export const WovenLightHero = ({
  headline = 'Woven by Light',
  subtitle = 'An interactive tapestry of light and motion, crafted with code and creativity.',
  ctaLabel = 'Explore the Weave',
  ctaHref = '#',
  showNav = false,
}: {
  headline?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  showNav?: boolean;
}) => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 1.5,
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));
    buttonControls.start({
      opacity: 1,
      transition: { delay: 2.5, duration: 1 }
    });
  }, [textControls, buttonControls]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050807]">
      <WovenCanvas />
      {showNav && <HeroNav />}
      <div className="relative z-10 text-center px-4">
        <h1
          className="font-display text-6xl md:text-8xl text-white"
          style={{ textShadow: '0 0 50px rgba(52, 211, 153, 0.25)' }}
        >
          {headline.split(' ').map((word, i) => (
            <span key={i} className="inline-block">
              {word.split('').map((char, j) => (
                <motion.span
                  key={j}
                  custom={i * 5 + j}
                  initial={{ opacity: 0, y: 50 }}
                  animate={textControls}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
              {i < headline.split(' ').length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>
        <motion.p
          custom={headline.length}
          initial={{ opacity: 0, y: 30 }}
          animate={textControls}
          className="mx-auto mt-6 max-w-xl text-lg text-slate-300"
        >
          {subtitle}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={buttonControls} className="mt-10">
          <a
            href={ctaHref}
            className="inline-block cursor-pointer rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            {ctaLabel}
          </a>
        </motion.div>
      </div>
    </div>
  );
};

// --- Navigation Component ---
const HeroNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
      className="absolute top-0 left-0 right-0 z-20 p-6"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">⎎</span>
          <span className="text-xl font-bold text-white">Woven</span>
        </div>
      </div>
    </motion.nav>
  );
};

// --- Three.js Canvas Component ---
export const WovenCanvas = ({ className = '' }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const startTime = performance.now();

    // --- Woven Silk ---
    const particleCount = reducedMotion ? 9000 : 24000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = new THREE.Color();
      color.setHSL(HUE_MIN + Math.random() * (HUE_MAX - HUE_MIN), 0.75, 0.55);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) / 1000;

      const mx = mouse.x * 3;
      const my = mouse.y * 3;

      // Scalar physics loop — no per-particle allocations, keeps 60fps with 24k points.
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        const px = positions[ix];
        const py = positions[iy];
        const pz = positions[iz];
        let vx = velocities[ix];
        let vy = velocities[iy];
        let vz = velocities[iz];

        if (!reducedMotion) {
          const dx = px - mx;
          const dy = py - my;
          const dist = Math.sqrt(dx * dx + dy * dy + pz * pz);
          if (dist < 1.5 && dist > 0.0001) {
            const force = ((1.5 - dist) * 0.01) / dist;
            vx += dx * force;
            vy += dy * force;
            vz += pz * force;
          }
        }

        // Return to original position
        vx += (originalPositions[ix] - px) * 0.001;
        vy += (originalPositions[iy] - py) * 0.001;
        vz += (originalPositions[iz] - pz) * 0.001;

        // Damping
        vx *= 0.95;
        vy *= 0.95;
        vz *= 0.95;

        positions[ix] = px + vx;
        positions[iy] = py + vy;
        positions[iz] = pz + vz;
        velocities[ix] = vx;
        velocities[iy] = vy;
        velocities[iz] = vz;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = elapsedTime * (reducedMotion ? 0.015 : 0.05);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 z-0 ${className}`} aria-hidden="true" />;
};
