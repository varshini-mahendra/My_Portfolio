import React, { useEffect, useRef } from "react";

type Vec2 = { x: number; y: number };

type Particle = {
  pos: Vec2;
  vel: Vec2;
  size: number;
  alpha: number;
  tw: number; // twinkle speed
  hue: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function SpaceParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Vec2>({ x: 0, y: 0 });
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onResize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      sizeRef.current = { w, h, dpr };

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Re-seed particles based on area
      const area = w * h;
      const targetCount = Math.max(90, Math.min(220, Math.floor(area / 15000)));
      const next: Particle[] = [];
      const baseHue = 20; // warm orange

      for (let i = 0; i < targetCount; i++) {
        next.push({
          pos: { x: rand(0, w), y: rand(0, h) },
          vel: { x: rand(-0.15, 0.15), y: rand(-0.12, 0.18) },
          size: rand(0.8, 2.2),
          alpha: rand(0.15, 0.65),
          tw: rand(0.7, 1.9),
          hue: baseHue + rand(-10, 20),
        });
      }
      particlesRef.current = next;
    };

    const onMouseMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    onResize();

    const draw = (t: number) => {
      const { w, h, dpr } = sizeRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Soft space gradient + subtle vignette
      const g = ctx.createRadialGradient(
        w * 0.55,
        h * 0.25,
        Math.min(w, h) * 0.05,
        w * 0.55,
        h * 0.25,
        Math.max(w, h) * 0.75
      );
      g.addColorStop(0, "rgba(255, 77, 0, 0.12)");
      g.addColorStop(0.4, "rgba(255, 140, 0, 0.05)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.pos.x - b.pos.x;
          const dy = a.pos.y - b.pos.y;
          const dist2 = dx * dx + dy * dy;
          const maxDist = 115;
          if (dist2 < maxDist * maxDist) {
            const dist = Math.sqrt(dist2);
            const alpha = (1 - dist / maxDist) * 0.18;
            if (alpha > 0) {
              ctx.strokeStyle = `rgba(255, 77, 0, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.pos.x, a.pos.y);
              ctx.lineTo(b.pos.x, b.pos.y);
              ctx.stroke();
            }
          }
        }
      }

      // Particles
      const time = t * 0.001;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction for a subtle interactive feel
        const dxm = mouse.x - p.pos.x;
        const dym = mouse.y - p.pos.y;
        const d2 = dxm * dxm + dym * dym;
        const influence = d2 < 220 * 220 ? 1 - d2 / (220 * 220) : 0;
        const ax = (dxm / (Math.sqrt(d2) + 0.001)) * 0.02 * influence;
        const ay = (dym / (Math.sqrt(d2) + 0.001)) * 0.02 * influence;

        p.vel.x += ax;
        p.vel.y += ay;

        // Drift
        p.pos.x += p.vel.x;
        p.pos.y += p.vel.y;

        // Wrap
        if (p.pos.x < -10) p.pos.x = w + 10;
        if (p.pos.x > w + 10) p.pos.x = -10;
        if (p.pos.y < -10) p.pos.y = h + 10;
        if (p.pos.y > h + 10) p.pos.y = -10;

        // Slight damping
        p.vel.x *= 0.995;
        p.vel.y *= 0.995;

        const twinkle = 0.5 + 0.5 * Math.sin(time * p.tw + i);
        const a = Math.max(0, Math.min(1, p.alpha * (0.55 + twinkle * 0.65)));

        ctx.fillStyle = `hsla(${p.hue}, 100%, 55%, ${a})`;
        const r = p.size * (0.85 + twinkle * 0.35);
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}

