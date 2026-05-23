"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rot: number;
  rotSpeed: number;
  hue: number;
  opacity: number;
};

const PETAL_COUNT_DESKTOP = 18;
const PETAL_COUNT_MOBILE = 10;

function makePetal(w: number, h: number, seed = false): Petal {
  return {
    x: Math.random() * w,
    y: seed ? Math.random() * h : -20 - Math.random() * h * 0.5,
    size: 6 + Math.random() * 8,
    speedY: 0.25 + Math.random() * 0.55,
    speedX: -0.25 + Math.random() * 0.5,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: -0.02 + Math.random() * 0.04,
    hue: 130 + Math.floor(Math.random() * 40),
    opacity: 0.35 + Math.random() * 0.35,
  };
}

export function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let petals: Petal[] = [];
    let rafId = 0;
    let running = true;

    const isMobile = width < 720;
    const count = isMobile ? PETAL_COUNT_MOBILE : PETAL_COUNT_DESKTOP;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rot += p.rotSpeed;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `hsla(${p.hue}, 55%, 75%, ${p.opacity})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) loop();
      else cancelAnimationFrame(rafId);
    };

    resize();
    petals = Array.from({ length: count }, () => makePetal(width, height, true));
    loop();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
