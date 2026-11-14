import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';
import { TECH_ITEMS, type TechItem } from '../data/techData';
import { useSoundEffects } from '../hooks/useSoundEffects';

const FILTER_TABS = [
  'All',
  'Languages & Core',
  'Web & Cloud',
  'Developer Tools & IDEs',
] as const;

type FilterTab = (typeof FILTER_TABS)[number];

// 3D Perspective Card with localized brand glow
function TechCard({ item }: { item: TechItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, isHovered: false });
  const { playClick } = useSoundEffects();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -10;
    const ry = ((x - centerX) / centerX) * 10;

    setTilt({ rx, ry, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, isHovered: false });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25 }}
      className="perspective-1000 select-none"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={playClick}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${tilt.isHovered ? '10px' : '0px'
            })`,
          transition: 'transform 0.12s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
          borderColor: tilt.isHovered ? item.color : 'rgba(255, 255, 255, 0.1)',
          boxShadow: tilt.isHovered
            ? `0 16px 36px -10px rgba(0,0,0,0.8), 0 0 28px -4px ${item.glowColor}`
            : '0 4px 14px rgba(0,0,0,0.4)',
        }}
        className="relative h-full rounded-2xl border bg-surface-100/60 p-5 flex flex-col justify-between backdrop-blur-xl overflow-hidden group will-change-transform"
      >
        {/* Dynamic Brand Color Illumination on Hover */}
        <div
          className="absolute -right-10 -top-10 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
          style={{
            backgroundColor: item.color,
            opacity: tilt.isHovered ? 0.35 : 0.03,
          }}
        />

        {/* Card Header: Official Brand SVG + Level Tag */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div
            className="w-12 h-12 rounded-xl p-2.5 flex items-center justify-center border border-white/10 bg-surface-0/80 transition-transform duration-300 group-hover:scale-105"
            style={{
              borderColor: tilt.isHovered ? item.color : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <svg
              viewBox={item.viewBox || '0 0 24 24'}
              className="w-full h-full transition-all duration-300"
              style={{
                fill: tilt.isHovered ? item.color : '#e4e4e7',
                filter: tilt.isHovered ? `drop-shadow(0 0 10px ${item.color}77)` : 'none',
              }}
            >
              <path d={item.svgPath} />
            </svg>
          </div>

          <span
            className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/10 bg-surface-0/70 text-zinc-300 transition-colors"
            style={{
              borderColor: tilt.isHovered ? `${item.color}55` : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            {item.level}
          </span>
        </div>

        {/* Name and Tagline */}
        <div className="relative z-10">
          <h4 className="text-base font-bold text-white group-hover:text-white transition-colors flex items-center justify-between">
            <span>{item.name}</span>
          </h4>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-normal">
            {item.tagline}
          </p>
        </div>

        {/* Card Footer: Category Label & Indicator Dot */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500 relative z-10">
          <span>{item.filterGroup}</span>
          <span
            className="w-2 h-2 rounded-full transition-all group-hover:scale-125 shadow-sm"
            style={{
              backgroundColor: item.color,
              boxShadow: tilt.isHovered ? `0 0 8px ${item.color}` : 'none',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const { playClick } = useSoundEffects();

  const filteredItems =
    activeTab === 'All'
      ? TECH_ITEMS
      : TECH_ITEMS.filter((item) => item.filterGroup === activeTab);

  const handleTabChange = (tab: FilterTab) => {
    playClick();
    setActiveTab(tab);
  };

  return (
    <section id="skills" className="relative py-28 border-b border-theme/20 bg-surface-0/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-theme/30 bg-theme/10 text-xs font-mono text-zinc-300 mb-3 shadow-[0_0_12px_var(--glow-color)]">
              <Cpu className="w-3.5 h-3.5 text-theme" />
              <span>INTERACTIVE TECHNICAL ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Tech Stack &amp; Tooling
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Everyday engineering toolchain with official brand SVGs, 3D tilt perspective physics,
              and localized brand illumination on hover.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl border border-white/10 bg-surface-100/80 backdrop-blur-xl">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`text-xs font-mono px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-theme text-white font-bold shadow-[0_0_15px_var(--glow-color)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Holographic Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <TechCard key={item.name} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Everyday Toolchain Terminal Dock Callout */}
        <div className="mt-12 p-6 rounded-2xl border border-theme/20 bg-surface-100/70 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl border border-theme/30 bg-theme/10 flex items-center justify-center text-theme shadow-[0_0_15px_var(--glow-color)]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Configured Everyday Toolchain</h4>
              <p className="text-xs text-zinc-400">
                VS Code &bull; PyCharm Professional &bull; Antigravity &bull; IntelliJ IDEA &bull; Eclipse IDE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Interactive CLI directive:</span>
            <code className="text-xs font-mono px-3 py-1.5 rounded-lg bg-surface-0 border border-theme/30 text-theme font-bold">
              tools
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
