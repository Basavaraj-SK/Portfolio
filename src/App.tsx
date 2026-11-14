import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import CanvasParticles from './components/CanvasParticles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import ProjectShowcase from './components/ProjectShowcase';
import InteractiveTerminal from './components/InteractiveTerminal';
import Contact from './components/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-0 text-zinc-100 overflow-x-hidden selection:bg-theme/30 selection:text-white relative">
        {/* Physics-Based Custom Cursor & Dynamic Spotlight Beam */}
        <CustomCursor />

        {/* HTML5 Canvas Geometric Particle Constellation */}
        <CanvasParticles />

        {/* Glass Navigation Bar with Theme & Audio Controls */}
        <Navbar />

        {/* Main Architectural Presentation Flow */}
        <main className="relative z-10">
          {/* Section 1: Hero with 3D Parallax Tilt, Cypher Scramble & Magnetic CTAs */}
          <Hero />

          {/* Section 2: Interactive Tech Orbit & Tools Showcase with Brand Glows */}
          <TechStack />

          {/* Section 3: Featured Projects Showcase with 3D Holographic Cards & Architecture Drawer */}
          <ProjectShowcase />

          {/* Section 4: macOS zsh Developer Terminal Sandbox Dock */}
          <InteractiveTerminal />

          {/* Section 5: Magnetic Contact Hub & Reactive Transmission Form */}
          <Contact />
        </main>

        {/* Dynamic Footer */}
        <footer className="relative z-10 py-8 border-t border-theme/20 bg-surface-0/80 backdrop-blur-md text-center text-xs font-mono text-zinc-400">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>&copy; {new Date().getFullYear()} Basavaraj S. K. &bull; All Rights Reserved</span>
            <span className="text-zinc-400">
              Crafted with React 18, Vite, Tailwind CSS, Framer Motion &amp; Canvas API
            </span>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
