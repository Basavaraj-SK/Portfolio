import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import {
  Terminal,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { useTheme, type ThemeName } from '../context/ThemeContext';

interface OutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

const HELP_DIRECTORY = `Available CLI Directives:
  help                                  — Show command directory
  tools                                 — Print configured toolchain (VS Code, PyCharm, Antigravity, Eclipse, IntelliJ)
  skills                                — Categorized breakdown of programming languages & libraries
  theme <tokyo-night|matrix|obsidian>   — Dynamically alter portfolio accent theme
  sudo hire                             — Trigger recruiter authorization & confetti celebration
  clear                                 — Flush terminal buffer`;

const TOOLS_ECHO = `[Configured Developer Toolchain]
  ├── [ACTIVE] VS Code       : Primary IDE (TypeScript, React 18, Tailwind, Debugger)
  ├── [ACTIVE] PyCharm       : JetBrains Professional (Django REST Framework, Virtualenvs)
  ├── [ACTIVE] Antigravity   : Futuristic Zero-G AI Agent Harness & Autonomous Workflow
  ├── [ACTIVE] IntelliJ IDEA : Enterprise JVM Architecture & Deep Refactoring
  └── [ACTIVE] Eclipse IDE   : Core Java, Maven Artifacts & Static Analysis`;

const SKILLS_ECHO = `[Engineering Matrix]
  Languages  : JavaScript (ESNext), Python, Java, C, SQL, HTML5, CSS3
  Frameworks : React 18, Tailwind CSS, Django, Node.js, Capacitor
  Databases  : Firebase Firestore, ChromaDB Vector Store, SQLite, PostgreSQL
  Core & Ops : Asymptotic Optimization, Git, Linux, Netlify CI/CD`;

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [lines, setLines] = useState<OutputLine[]>([
    {
      id: '1',
      type: 'system',
      text: 'Basavaraj S. K. CLI Kernel (zsh 5.9 — x86_64-apple-darwin23.0)\nType "help" to view directives. Try "tools", "theme matrix", or "sudo hire".',
    },
  ]);

  const { theme, setTheme } = useTheme();
  const { playClick, playKeypress, playSuccess } = useSoundEffects();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, isOpen]);

  const addLine = (type: OutputLine['type'], text: string) => {
    setLines((prev) => [...prev, { id: Math.random().toString(36), type, text }]);
  };

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    playClick();
    setHistory((prev) => [raw, ...prev]);
    setHistIndex(-1);
    addLine('input', `~/basavaraj $ ${raw}`);

    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    switch (command) {
      case 'help':
        addLine('output', HELP_DIRECTORY);
        break;

      case 'tools':
        addLine('output', TOOLS_ECHO);
        break;

      case 'skills':
        addLine('output', SKILLS_ECHO);
        break;

      case 'theme':
        if (arg === 'tokyo-night' || arg === 'matrix' || arg === 'obsidian') {
          setTheme(arg as ThemeName);
          playSuccess();
          addLine('success', `[THEME UPDATED] Active palette switched to "${arg}".`);
        } else {
          addLine('error', `Unknown theme "${arg}". Valid options: tokyo-night, matrix, obsidian`);
        }
        break;

      case 'clear':
        setLines([]);
        break;

      case 'sudo':
        if (arg === 'hire') {
          playSuccess();
          confetti({
            particleCount: 140,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#a855f7', '#10b981', '#38bdf8', '#fbbf24'],
          });
          addLine(
            'success',
            `[AUTHORIZATION GRANTED] 🎉
Candidate: Basavaraj S. K.
Degree: Master of Computer Applications (MCA) — Bangalore, India
Status: Available for SDE & Software Engineering Roles
Email: basavarajsk2004@gmail.com
GitHub: https://github.com/Basavaraj-SK
LinkedIn: https://linkedin.com/in/basavaraj-sk`
          );
        } else {
          addLine('error', 'Directive not permitted. Try: "sudo hire"');
        }
        break;

      default:
        addLine('error', `zsh: command not found: ${command}. Type "help" for valid directives.`);
    }

    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    playKeypress();
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = Math.min(histIndex + 1, history.length - 1);
      setHistIndex(nextIdx);
      if (history[nextIdx]) setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = Math.max(histIndex - 1, -1);
      setHistIndex(nextIdx);
      setInputVal(nextIdx === -1 ? '' : history[nextIdx]);
    }
  };

  return (
    <section id="terminal" className="relative py-24 border-b border-theme/20 bg-surface-0/70">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-theme/30 bg-theme/10 text-xs font-mono text-zinc-300 mb-2 shadow-[0_0_12px_var(--glow-color)]">
              <Terminal className="w-3.5 h-3.5 text-theme" />
              <span>INTERACTIVE CLI SANDBOX</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Developer Terminal Dock
            </h3>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
              Active Theme: <span className="text-theme font-bold">{theme}</span> &bull; Try typing{' '}
              <code className="text-white">tools</code> or <code className="text-white">theme matrix</code>
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              setIsOpen(!isOpen);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
          >
            {isOpen ? (
              <>
                <span>Collapse</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Expand Terminal</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Terminal Window Frame */}
        {isOpen && (
          <div
            className={`rounded-2xl border border-white/15 bg-surface-0 shadow-2xl overflow-hidden transition-all duration-300 ${
              isMaximized ? 'fixed inset-4 z-50 rounded-2xl max-w-none' : ''
            }`}
          >
            {/* macOS Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-surface-100/90">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                <span className="ml-3 text-xs font-mono text-zinc-400">
                  zsh — basavaraj@portfolio: ~ ({theme})
                </span>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setIsMaximized(!isMaximized);
                }}
                className="p-1 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={isMaximized ? 'Restore' : 'Maximize'}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Terminal Output Body */}
            <div
              className={`p-5 font-mono text-xs sm:text-sm overflow-y-auto bg-black/60 space-y-2 cursor-text ${
                isMaximized ? 'h-[calc(100vh-120px)]' : 'h-80'
              }`}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line) => {
                let textClass = 'text-zinc-300';
                if (line.type === 'input') textClass = 'text-white font-semibold';
                else if (line.type === 'error') textClass = 'text-red-400';
                else if (line.type === 'success') textClass = 'text-emerald-400 font-semibold';
                else if (line.type === 'system') textClass = 'text-zinc-400';

                return (
                  <div key={line.id} className={`whitespace-pre-wrap leading-relaxed ${textClass}`}>
                    {line.text}
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Prompt Input Line */}
            <div className="flex items-center gap-2 px-5 py-3 border-t border-white/10 bg-surface-100/70">
              <span className="text-theme font-mono text-xs sm:text-sm font-bold shrink-0">
                ~/basavaraj $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type "help", "tools", "theme matrix", or "sudo hire"...'
                className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white outline-none placeholder:text-zinc-600"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="cursor-blink text-theme font-mono text-sm">▌</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
