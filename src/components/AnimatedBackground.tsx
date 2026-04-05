import { useEffect, useRef } from 'react';

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  type: 'fermion' | 'boson';
  trail: { x: number; y: number }[];
}

const FERMION_COLORS = ['#6366f1', '#818cf8', '#22d3ee', '#67e8f9'];
const BOSON_COLORS = ['#f43f5e', '#fbbf24', '#8b5cf6', '#f59e0b'];

function createParticle(w: number, h: number): FloatingParticle {
  const isFermion = Math.random() > 0.35;
  const colors = isFermion ? FERMION_COLORS : BOSON_COLORS;
  const speed = isFermion ? 0.3 + Math.random() * 0.4 : 0.15 + Math.random() * 0.3;
  const angle = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: isFermion ? 1.2 + Math.random() * 1.2 : 2 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: 0.15 + Math.random() * 0.35,
    type: isFermion ? 'fermion' : 'boson',
    trail: [],
  };
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: FloatingParticle[] = [];
    const INTERACTION_DIST = 120;
    const TRAIL_LEN = 12;
    const MOUSE_RADIUS = 180;
    const MOUSE_FORCE = 0.06;
    const mouse = { x: -9999, y: -9999 };

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + 'px';
      canvas!.style.height = window.innerHeight + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      const target = Math.max(40, Math.min(count, 120));
      particles = [];
      for (let i = 0; i < target; i++) {
        particles.push(createParticle(window.innerWidth, window.innerHeight));
      }
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      // Draw interaction lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INTERACTION_DIST) {
            // Boson-fermion interactions are brighter
            const mixed = a.type !== b.type;
            const opacity = (1 - dist / INTERACTION_DIST) * (mixed ? 0.12 : 0.05);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = mixed ? `rgba(139,92,246,${opacity})` : `rgba(255,255,255,${opacity})`;
            ctx!.lineWidth = mixed ? 0.8 : 0.4;
            ctx!.stroke();
          }
        }
      }

      // Update and draw particles
      for (const p of particles) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL_LEN) p.trail.shift();

        // Mouse interaction — particles gently repel from cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (1 - mDist / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        // Dampen velocity to prevent runaway speeds
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = p.type === 'fermion' ? 1.2 : 0.8;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw trail
        if (p.trail.length > 1) {
          for (let i = 1; i < p.trail.length; i++) {
            const t = i / p.trail.length;
            ctx!.beginPath();
            ctx!.moveTo(p.trail[i - 1].x, p.trail[i - 1].y);
            ctx!.lineTo(p.trail[i].x, p.trail[i].y);
            ctx!.strokeStyle = p.color;
            ctx!.globalAlpha = t * p.alpha * 0.3;
            ctx!.lineWidth = p.radius * t * 0.6;
            ctx!.stroke();
          }
        }

        // Draw particle
        ctx!.globalAlpha = p.alpha;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.fill();

        // Boson glow
        if (p.type === 'boson') {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'transparent');
          ctx!.fillStyle = grad;
          ctx!.globalAlpha = p.alpha * 0.2;
          ctx!.fill();
        }
      }

      // Draw mouse attraction field
      if (mouse.x > 0 && mouse.y > 0) {
        const grad = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        grad.addColorStop(0, 'rgba(139,92,246,0.03)');
        grad.addColorStop(1, 'transparent');
        ctx!.fillStyle = grad;
        ctx!.globalAlpha = 1;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
