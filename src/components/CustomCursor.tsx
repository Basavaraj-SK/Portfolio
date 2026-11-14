import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -600, y: -600 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics-based follower springs
  const springX = useSpring(mouseX, { stiffness: 420, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 420, damping: 28 });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('button, a, input, textarea, select, [data-interactive]');
      if (interactive) {
        setIsHovered(true);
        setIsPointer(true);
      } else {
        setIsHovered(false);
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {/* Subtle Radial Gradient Beam Tracking Across Canvas */}
      <div
        className="fixed inset-0 pointer-events-none z-10 will-change-transform"
        style={{
          background: `radial-gradient(600px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(var(--spotlight-rgb, 99, 102, 241), 0.08), transparent 80%)`,
        }}
      />

      {/* Center Micro-Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
        />
      </motion.div>

      {/* Physics Follower Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 2.3 : 1,
            backgroundColor: isHovered
              ? 'rgba(var(--accent-rgb, 99, 102, 241), 0.16)'
              : 'rgba(var(--accent-rgb, 99, 102, 241), 0.04)',
            borderColor: isHovered
              ? 'rgba(var(--accent-rgb, 99, 102, 241), 0.85)'
              : 'rgba(var(--accent-rgb, 99, 102, 241), 0.35)',
            borderWidth: isHovered ? 1.5 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-8 h-8 rounded-full border border-theme flex items-center justify-center backdrop-blur-[1px]"
        >
          {isPointer && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
