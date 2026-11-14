import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Menu,
  X,
  Volume2,
  VolumeX,
  Palette,
  Terminal as TerminalIcon,
  Sparkles
} from 'lucide-react';
import { useTheme, type ThemeName } from '../context/ThemeContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import confetti from 'canvas-confetti';

const NAV_LINKS = [
  { label: 'Overview', href: '#hero' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isMuted, toggleSound, playClick, playSuccess } = useSoundEffects();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (href: string) => {
    playClick();
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleHireMe = () => {
    playSuccess();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.1 },
      colors: ['#6366f1', '#a855f7', '#22d3ee', '#10b981', '#fbbf24'],
    });
    navigate('#contact');
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-0/85 backdrop-blur-2xl border-b border-theme/20 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Monogram */}
        <button
          onClick={() => navigate('#hero')}
          className="group flex items-center gap-2.5 cursor-pointer text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-theme/20 border border-theme/40 flex items-center justify-center font-mono font-black text-sm text-white group-hover:scale-105 transition-transform shadow-[0_0_15px_var(--glow-color)]">
            BSK
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-white tracking-tight block leading-tight">
              Basavaraj<span className="text-theme">.dev</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block leading-tight">
              FULL-STACK SDE
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 rounded-2xl p-1.5 border border-white/10 bg-surface-100/60 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className={`relative px-4 py-1.5 text-xs font-mono font-medium transition-colors rounded-xl cursor-pointer ${
                active === link.href ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-theme/25 border border-theme/40 shadow-[0_0_12px_var(--glow-color)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isMuted
                ? 'bg-white/5 border-white/10 text-zinc-500 hover:text-zinc-300'
                : 'bg-theme/20 border-theme/40 text-theme shadow-[0_0_12px_var(--glow-color)]'
            }`}
            title={isMuted ? 'Enable synthesized sound effects' : 'Mute sound effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playClick();
                setThemeDropdown(!themeDropdown);
              }}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
              title="Change Theme Palette"
            >
              <Palette className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {themeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl glass border border-white/15 p-2 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1 text-xs font-mono"
                >
                  <span className="text-[10px] text-zinc-400 px-3 py-1 uppercase tracking-wider font-bold">
                    Select Palette
                  </span>
                  {(['tokyo-night', 'matrix', 'obsidian'] as ThemeName[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        playClick();
                        setTheme(t);
                        setThemeDropdown(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between transition-colors cursor-pointer ${
                        theme === t
                          ? 'bg-theme/20 text-white font-bold border border-theme/40'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="capitalize">{t.replace('-', ' ')}</span>
                      {theme === t && <span className="w-2 h-2 rounded-full bg-theme shadow-sm" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Terminal Quick Link */}
          <button
            onClick={() => navigate('#terminal')}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Open Interactive Terminal"
          >
            <TerminalIcon className="w-4 h-4" />
          </button>

          {/* GitHub Profile */}
          <a
            href="https://github.com/Basavaraj-SK"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Direct CTA */}
          <button
            onClick={handleHireMe}
            className="px-4 py-2.5 rounded-xl bg-theme hover:opacity-90 text-white text-xs font-mono font-bold transition-all shadow-[0_0_15px_var(--glow-color)] flex items-center gap-1.5 cursor-pointer ml-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-surface-0/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  className={`text-left text-xs font-mono py-2.5 px-4 rounded-xl transition-all ${
                    active === link.href
                      ? 'bg-theme/20 text-white font-bold border border-theme/30'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-2">
                <span className="text-xs font-mono text-zinc-400">Audio FX:</span>
                <button
                  onClick={toggleSound}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white"
                >
                  {isMuted ? 'Muted' : 'Sound ON'}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-zinc-400">Theme:</span>
                <div className="flex gap-1.5">
                  {(['tokyo-night', 'matrix', 'obsidian'] as ThemeName[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`text-[10px] font-mono px-2 py-1 rounded-md border ${
                        theme === t
                          ? 'border-theme bg-theme/20 text-white'
                          : 'border-white/10 text-zinc-400'
                      }`}
                    >
                      {t.split('-')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleHireMe}
                className="mt-3 w-full py-3 rounded-xl bg-theme text-white text-xs font-mono font-bold transition-all shadow-[0_0_15px_var(--glow-color)]"
              >
                Hire Me &bull; Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
