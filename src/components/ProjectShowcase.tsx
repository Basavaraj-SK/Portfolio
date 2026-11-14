import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  X,
  Layers,
  ChevronRight,
  Sparkles,
  GitCommit,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Code
} from 'lucide-react';
import { PROJECTS, type Project } from '../data/projectsData';
import { useSoundEffects } from '../hooks/useSoundEffects';

// Interactive Architecture Drawer / Modal
function ArchitectureModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { playClick } = useSoundEffects();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-surface-100/95 p-6 sm:p-8 shadow-2xl z-10 text-zinc-100 will-change-transform"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2.5 rounded-2xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="p-3 rounded-2xl border border-theme/40 bg-theme/15 text-theme shadow-[0_0_15px_var(--glow-color)]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-theme uppercase tracking-widest font-semibold">
              SYSTEM ARCHITECTURE // {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">{project.title}</h3>
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
          {project.overview}
        </p>

        {/* Performance Metrics Bar */}
        <div className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-2xl border border-white/10 bg-surface-0/60">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                {m.label}
              </span>
              <span className="text-base font-extrabold font-mono text-white text-glow">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Data Flow Pipeline */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
              <GitCommit className="w-4 h-4 text-theme" />
              <span>Interactive Data Flow Pipeline</span>
            </h4>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {project.pipeline.map((node, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-theme/40 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-theme font-bold">
                      STAGE {node.step}
                    </span>
                    <Zap className="w-3.5 h-3.5 text-zinc-500 group-hover:text-theme transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-white block mb-1">{node.title}</span>
                  <span className="text-[11px] font-mono text-zinc-400 block mb-2">{node.tech}</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-normal">
                  {node.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Architectural Tenets */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-3">
            <Layers className="w-4 h-4 text-theme" />
            <span>Key Architectural Tenets</span>
          </h4>
          <ul className="space-y-2.5 bg-surface-0/60 p-5 rounded-2xl border border-white/10">
            {project.architectureNotes.map((item, idx) => (
              <li key={idx} className="text-xs font-mono text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                <span className="text-theme font-bold mt-0.5">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Hurdles Solved */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 mb-3">
            <Code className="w-4 h-4 text-theme" />
            <span>Technical Hurdles Solved</span>
          </h4>
          <div className="space-y-2.5">
            {project.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-zinc-300 leading-relaxed"
              >
                {challenge}
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-all cursor-pointer"
            >
              <Github className="w-4 h-4 text-theme" />
              <span>View Repository</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme hover:opacity-90 text-white font-bold text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_var(--glow-color)]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live App</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// 3D Parallax Tilt Project Card
function HolographicProjectCard({
  project,
  onExamine,
}: {
  project: Project;
  onExamine: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, isHovered: false });
  const { playClick } = useSoundEffects();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -8;
    const ry = ((x - centerX) / centerX) * 8;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rx, ry, glareX, glareY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  return (
    <div className="perspective-1000 select-none">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${tilt.isHovered ? '8px' : '0px'
            })`,
          transition: 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease',
          boxShadow: tilt.isHovered
            ? '0 20px 50px -15px rgba(0,0,0,0.8), 0 0 35px var(--glow-color)'
            : '0 6px 20px rgba(0,0,0,0.5)',
        }}
        className={`relative rounded-3xl border border-white/10 bg-surface-100/70 backdrop-blur-2xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden group will-change-transform ${project.featured ? 'lg:col-span-12' : ''
          }`}
      >
        {/* Specular Glare Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.08), transparent 75%)`,
            opacity: tilt.isHovered ? 1 : 0,
          }}
        />

        {/* Card Body */}
        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-theme/40 bg-theme/15 text-theme font-bold tracking-wider uppercase shadow-[0_0_10px_var(--glow-color)]">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              {project.featured ? 'FEATURED CASE STUDY' : 'PRODUCTION SYSTEM'}
            </span>
          </div>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/title inline-flex items-center gap-2 text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 hover:text-theme transition-colors cursor-pointer"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover/title:text-theme group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
            </a>
          ) : (
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2 group-hover:text-theme transition-colors">
              {project.title}
            </h3>
          )}
          <p className="text-xs font-mono text-zinc-400 mb-4">{project.subtitle}</p>

          <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
            {project.overview}
          </p>

          {/* Pipeline Quick Preview */}
          <div className="space-y-2 mb-6">
            {project.pipeline.slice(0, 3).map((p, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">{p.title}:</strong> {p.tech}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 rounded-lg border border-white/10 bg-surface-0/80 text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card Action Controls */}
        <div className="relative z-10 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              playClick();
              onExamine();
            }}
            className="px-5 py-2.5 rounded-xl bg-theme hover:opacity-90 text-white text-xs font-mono font-bold tracking-wide transition-all shadow-[0_0_15px_var(--glow-color)] flex items-center gap-2 cursor-pointer"
          >
            <span>Examine Architecture</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl border border-theme/40 bg-theme/15 hover:bg-theme/25 text-white transition-all flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer shadow-[0_0_12px_var(--glow-color)]"
                title="Launch Live App"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-white/10 bg-surface-0/80 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const companions = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-28 border-b border-theme/20 bg-surface-0/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-theme/30 bg-theme/10 text-xs font-mono text-zinc-300 mb-3 shadow-[0_0_12px_var(--glow-color)]">
              <Sparkles className="w-3.5 h-3.5 text-theme" />
              <span>FEATURED PRODUCTION CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Featured Projects Showcase
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              Interactive 3D holographic cards with architectural node inspection, verified data pipelines,
              and live metrics.
            </p>
          </div>
        </div>

        {/* 1. Flagship Featured Project (Wide 3D Holographic Card) */}
        <div className="mb-8">
          <HolographicProjectCard
            project={featured}
            onExamine={() => setSelectedProject(featured)}
          />
        </div>

        {/* 2. Companion Builds (2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {companions.map((project) => (
            <HolographicProjectCard
              key={project.id}
              project={project}
              onExamine={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Architecture Modal / Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <ArchitectureModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
