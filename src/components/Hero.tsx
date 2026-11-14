import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Github,
  ArrowDown,
  MapPin,
  User,
  Sparkles,
  Terminal,
  Layers,
  Cpu
} from 'lucide-react';
import { useSoundEffects } from '../hooks/useSoundEffects';
import profileImg from '../assets/profile.jpg';
import profileDotmatrix from '../assets/profile-dotmatrix.jpg';

// Matrix Cypher Text Deciphering Hook
const CYPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
const COMPETENCIES = [
  'Full-Stack Systems Architecture',
  'Cloud & Realtime DBs Sync',
  'Mobile Engineering & Hybrid Apps',
  'Algorithmic Problem Solving',
];

function CypherHeadline({ playKeypress }: { playKeypress: () => void }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(COMPETENCIES[0]);

  useEffect(() => {
    let frame = 0;
    const targetText = COMPETENCIES[index];
    const totalFrames = targetText.length * 3;
    let animId: number;

    const interval = setInterval(() => {
      frame = 0;
      const scramble = () => {
        let output = '';
        const progress = Math.floor(frame / 3);

        for (let i = 0; i < targetText.length; i++) {
          if (targetText[i] === ' ') {
            output += ' ';
            continue;
          }
          if (i < progress) {
            output += targetText[i];
          } else {
            output += CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)];
          }
        }

        setDisplayText(output);
        if (frame % 4 === 0) {
          playKeypress();
        }

        frame++;
        if (frame <= totalFrames) {
          animId = requestAnimationFrame(scramble);
        } else {
          setDisplayText(targetText);
        }
      };

      animId = requestAnimationFrame(scramble);
      setIndex((prev) => (prev + 1) % COMPETENCIES.length);
    }, 3800);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, [index, playKeypress]);

  return (
    <span className="font-mono text-theme text-glow font-bold tracking-tight inline-block min-h-[1.5em]">
      {displayText}
      <span className="cursor-blink text-theme ml-1 font-mono">_</span>
    </span>
  );
}

// Magnetic Button with spring physics damping
function MagneticButton({
  children,
  onClick,
  href,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 16, stiffness: 220 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`will-change-transform ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  const [photoMode, setPhotoMode] = useState<'dotmatrix' | 'photo'>('dotmatrix');
  const [imgError, setImgError] = useState(false);
  const { playClick, playKeypress } = useSoundEffects();

  // 3D Parallax Tilt Calculation with Specular Gloss
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -12;
    const ry = ((x - centerX) / centerX) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rx, ry, glareX, glareY });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  const scrollToProjects = () => {
    playClick();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-28 pb-20 border-b border-theme/20"
    >
      {/* Background Mesh Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-theme/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-theme/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Asymmetrical 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column (7 cols): Identity, Scramble Headline & Bio */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Live Status Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-theme/30 bg-theme/10 text-xs font-mono text-zinc-300 mb-6 backdrop-blur-md shadow-[0_0_15px_var(--glow-color)]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="font-semibold text-white">MCA Student &bull; </span>
            </motion.div>

            {/* Authoritative Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.05] mb-3"
            >
              Basavaraj
              <span className="text-gradient"> S. K.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl sm:text-2xl font-bold text-zinc-200 tracking-tight mb-4"
            >
              Full-Stack Developer &amp; MCA Graduate based in Bangalore
            </motion.h2>

            {/* Matrix Text Scramble / Cypher Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-sm sm:text-base mb-6 px-3.5 py-2 rounded-xl bg-surface-100/80 border border-white/10 backdrop-blur-md"
            >
              <Terminal className="w-4 h-4 text-theme shrink-0" />
              <CypherHeadline playKeypress={playKeypress} />
            </motion.div>

            {/* Purpose Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8 font-normal"
            >
              Building resilient, high-concurrency web systems, offline-first mobile apps, and
              real-time databases. Driven by deterministic code execution, asymptotic optimization,
              and low-overhead software architecture.
            </motion.p>

            {/* Location & Quick Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mb-9 pb-6 border-b border-white/10 w-full max-w-xl"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-theme" />
                <span className="text-zinc-200">Bangalore, Karnataka, India</span>
              </div>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-emerald-400 font-semibold">Available for SDE Roles</span>
            </motion.div>

            {/* Action CTAs: Magnetic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={scrollToProjects}
                className="group px-7 py-3.5 rounded-2xl bg-theme hover:opacity-95 text-white font-bold text-sm transition-all duration-200 shadow-[0_0_20px_var(--glow-color)] flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Explore Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </MagneticButton>

              <MagneticButton
                href="https://github.com/Basavaraj-SK"
                className="px-6 py-3.5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-semibold text-sm transition-all duration-200 flex items-center gap-2.5 cursor-pointer backdrop-blur-md"
              >
                <Github className="w-4 h-4 text-theme" />
                <span>GitHub Profile</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column (5 cols): 3D Parallax Tilt Card with Specular Gloss */}
          <div className="lg:col-span-5 flex justify-center perspective-1000">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-sm rounded-3xl p-2.5 bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/15 backdrop-blur-xl shadow-2xl group will-change-transform select-none"
            >
              {/* Inner Frame */}
              <div className="relative rounded-[22px] overflow-hidden border border-white/10 bg-surface-0 aspect-[4/5] flex flex-col justify-end">
                {/* Photo / Dot Matrix with Fallback */}
                {!imgError ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={photoMode}
                      src={photoMode === 'dotmatrix' ? profileDotmatrix : profileImg}
                      alt="Basavaraj S. K."
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.98 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      onError={() => setImgError(true)}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                    />
                  </AnimatePresence>
                ) : (
                  // Editorial SVG Silhouette Fallback
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-surface-100 via-surface-0 to-black flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full border border-theme/40 bg-theme/10 flex items-center justify-center mb-4 text-theme shadow-[0_0_20px_var(--glow-color)]">
                      <User className="w-12 h-12 stroke-[1.5]" />
                    </div>
                    <span className="text-lg font-bold text-white">Basavaraj S. K.</span>
                    <span className="text-xs font-mono text-zinc-400 mt-1">
                      Full-Stack Systems Engineer
                    </span>
                  </div>
                )}

                {/* Dot Matrix Style Interactive Toggle Pill */}
                <div
                  className="absolute top-4 right-4 z-30 pointer-events-auto"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                      setPhotoMode((prev) => (prev === 'dotmatrix' ? 'photo' : 'dotmatrix'));
                    }}
                    className="px-3 py-1.5 rounded-full border border-white/20 bg-surface-0/85 hover:border-theme/50 text-[10px] font-mono font-bold text-white transition-all shadow-xl backdrop-blur-md flex items-center gap-1.5 cursor-pointer group/btn"
                    title="Toggle between Dot Matrix and Clean Photo style"
                  >
                    <Cpu className="w-3 h-3 text-theme group-hover/btn:rotate-45 transition-transform" />
                    <span>{photoMode === 'dotmatrix' ? 'Dot Matrix' : 'Clean Photo'}</span>
                  </button>
                </div>

                {/* Scanline / Digital Texture Overlay in Dot Matrix Mode */}
                {photoMode === 'dotmatrix' && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  />
                )}

                {/* Moving Specular Reflection Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(400px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.15), transparent 70%)`,
                  }}
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-0 via-surface-0/50 to-transparent pointer-events-none" />

                {/* Overlaid Bottom Identity Stamp */}
                <div
                  className="relative z-10 p-5 text-left"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                        SOFTWARE DEVELOPMENT ENGINEER
                      </span>
                      <span className="text-base font-bold text-white tracking-wide">
                        Basavaraj S. K.
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-theme bg-theme/15 border border-theme/30 px-2.5 py-1 rounded-md">
                      BLR // IN
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Status Tag Pinned Over Photo */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                style={{ transform: 'translateZ(38px) translateX(-50%)' }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-theme/40 bg-surface-0/95 text-[11px] font-mono text-zinc-200 shadow-xl backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                  <span>Open to SDE &amp; Engineering Roles (Bangalore)</span>
                </div>
              </div>

              {/* Decorative Corner Holographic Elements */}
              <div
                className="absolute -bottom-3 -right-3 z-20"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="p-2.5 rounded-2xl glass border border-theme/30 shadow-lg text-theme">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
