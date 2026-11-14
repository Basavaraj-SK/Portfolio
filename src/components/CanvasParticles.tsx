import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  shape: 'circle' | 'square' | 'triangle';
  opacity: number;
}

export default function CanvasParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Get theme color
    const getThemeRGB = () => {
      switch (theme) {
        case 'matrix':
          return { r: 16, g: 185, b: 129 };
        case 'obsidian':
          return { r: 245, g: 158, b: 11 };
        case 'tokyo-night':
        default:
          return { r: 99, g: 102, b: 241 };
      }
    };

    let particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 14000), 75);

    const initParticles = () => {
      particles = [];
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size: Math.random() * 2.5 + 1.2,
          density: Math.random() * 25 + 5,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    initParticles();

    const drawShape = (p: Particle, rgb: { r: number; g: number; b: number }) => {
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity * 0.7})`;
      ctx.beginPath();
      if (p.shape === 'circle') {
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'square') {
        ctx.rect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        ctx.fill();
      } else if (p.shape === 'triangle') {
        ctx.moveTo(p.x, p.y - p.size * 1.3);
        ctx.lineTo(p.x - p.size, p.y + p.size);
        ctx.lineTo(p.x + p.size, p.y + p.size);
        ctx.closePath();
        ctx.fill();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const rgb = getThemeRGB();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal drift
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Proximity to cursor: Elastic push and scatter
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * p.density * 0.6;
          const directionY = forceDirectionY * force * p.density * 0.6;

          p.x -= directionX;
          p.y -= directionY;
        }

        drawShape(p, rgb);

        // Tether lines between neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist2 < 110) {
            const alpha = (1 - dist2 / 110) * 0.18;
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse tether lines
        if (distance < mouse.radius) {
          const alpha = (1 - distance / mouse.radius) * 0.35;
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      style={{ opacity: 0.85 }}
    />
  );
}
