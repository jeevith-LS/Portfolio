'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, SkillCategory } from '@/types/portfolio';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  skills: SkillCategory[];
  onNavigateToContact: () => void;
}

interface CommandHistoryEntry {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function TerminalModal({
  isOpen,
  onClose,
  projects,
  skills,
  onNavigateToContact
}: TerminalModalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryEntry[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const pastCommands = useRef<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        setHistory([
          {
            command: 'help',
            output: (
              <div className="text-slate-300 space-y-1.5 font-mono text-xs sm:text-sm">
                <p className="text-blue-400 font-bold">
                  Interactive Terminal Portfolio
                </p>
                <p className="text-slate-400">
                  Type <span className="text-emerald-400 font-bold">help</span> to view available commands, or explore <span className="text-blue-300 font-bold">projects</span>, <span className="text-blue-300 font-bold">skills</span>, and <span className="text-blue-300 font-bold">contact</span>.
                </p>
              </div>
            ),
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, history.length]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = input.trim();
    if (!rawCmd) return;

    pastCommands.current.push(rawCmd);
    setCommandIndex(pastCommands.current.length);

    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="text-xs sm:text-sm font-mono space-y-1 text-slate-300">
            <p className="text-blue-400 font-semibold mb-1">Commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
              <div><span className="text-emerald-400 font-bold">projects</span> - View all projects</div>
              <div><span className="text-emerald-400 font-bold">project &lt;id&gt;</span> - View project details</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - View technical skills</div>
              <div><span className="text-emerald-400 font-bold">about</span> - About Jeevith</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Contact information</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear output</div>
              <div><span className="text-emerald-400 font-bold">exit</span> - Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="text-xs sm:text-sm font-mono space-y-2">
            <p className="text-blue-400 font-bold">Projects ({projects.length}):</p>
            <div className="space-y-1.5">
              {projects.map((p) => (
                <div key={p.id} className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-emerald-400 font-bold">{p.title}</span>
                    <span className="text-xs text-slate-400 font-mono">id: <code className="text-blue-300">{p.id}</code></span>
                  </div>
                  <p className="text-slate-300 text-xs mt-1">{p.tagline}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-xs mt-2">
              Tip: Type <span className="text-cyan-300">project {projects[0]?.id || 'nexus-ai-orchestrator'}</span> for architectural details.
            </p>
          </div>
        );
        break;

      case 'project':
        if (!args[0]) {
          outputNode = <span className="text-amber-400">Usage: project &lt;project-id&gt; (e.g. project {projects[0]?.id})</span>;
        } else {
          const target = projects.find(p => p.id.toLowerCase() === args[0].toLowerCase());
          if (!target) {
            outputNode = <span className="text-rose-400">Error: Project with ID &apos;{args[0]}&apos; not found. Type &apos;projects&apos; to view all valid IDs.</span>;
          } else {
            outputNode = (
              <div className="p-3 bg-[#0a1428] border border-cyan-500/30 rounded-lg space-y-2 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-cyan-300 font-bold text-base">{target.title}</h4>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs border border-cyan-500/30">
                    {target.category}
                  </span>
                </div>
                <p className="text-slate-300">{target.description}</p>
                <div className="text-slate-400 text-xs pt-1 border-t border-slate-800">
                  <span className="text-emerald-400 font-bold">Architecture: </span>
                  {target.architectureDetails}
                </div>
                <div className="text-xs text-cyan-400">
                  <span className="text-slate-400">Key Metrics: </span>
                  {target.metrics}
                </div>
              </div>
            );
          }
        }
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <p className="text-cyan-400 font-bold">CORE ARSENAL & PROFICIENCY MATRIX:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skills.map((cat) => (
                <div key={cat.title} className="p-2.5 rounded bg-slate-900/90 border border-cyan-500/20">
                  <p className="text-emerald-400 font-bold mb-1.5">{cat.title}</p>
                  <div className="space-y-1">
                    {cat.skills.map((s) => (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <span className="text-slate-300">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">{s.level}%</span>
                          <span className="text-slate-500 text-[10px]">[{s.experience}]</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm text-slate-300">
            <p className="text-cyan-400 font-bold">DEVELOPER PROFILE // JEEVITH</p>
            <p>
              Full-Stack Software Engineer with 4+ years of hands-on experience designing, developing, and scaling web applications, microservices, and AI-enabled software.
            </p>
            <p className="text-slate-400">
              Specialized in TypeScript, Next.js 15, Node.js/Express, Python, PostgreSQL, and Cloud Native DevOps (Docker, CI/CD).
            </p>
            <div className="pt-2 text-emerald-400 text-xs">
              LOCATION: Remote / Global Available • FOCUS: High-Scale Systems & Intelligent Products
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm text-slate-300">
            <p className="text-cyan-400 font-bold">TRANSMISSION FREQUENCY:</p>
            <p>Email: <span className="text-emerald-400">jeevith.dev@portfolio.local</span></p>
            <p>GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com</a></p>
            <button
              onClick={() => {
                onClose();
                onNavigateToContact();
              }}
              className="mt-2 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 rounded text-xs transition-colors"
            >
              🚀 Click to Open Graphical Contact Form
            </button>
          </div>
        );
        break;

      case 'sudo':
        if (args[0] === 'hire') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
          outputNode = (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded text-emerald-300 font-mono text-xs sm:text-sm space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                OFFER ACCEPTED // PERMISSION GRANTED!
              </p>
              <p>
                Let us build groundbreaking software together! Contact transmission channels are open.
              </p>
            </div>
          );
        } else {
          outputNode = <span className="text-rose-400">sudo: permission denied for command: {args.join(' ')}</span>;
        }
        break;

      case 'matrix':
        setMatrixMode((prev) => !prev);
        outputNode = <span className="text-emerald-400">Matrix visual mode toggled: {!matrixMode ? 'ACTIVE' : 'DISABLED'}</span>;
        break;

      case 'date':
      case 'time':
        outputNode = <span className="text-cyan-300 font-mono">{new Date().toString()}</span>;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInput('');
        return;

      default:
        outputNode = (
          <span className="text-rose-400">
            command not found: <code className="text-slate-200">{rawCmd}</code>. Type <code className="text-cyan-300 font-bold">help</code> to inspect available CLI commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: rawCmd,
        output: outputNode,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.current.length > 0 && commandIndex > 0) {
        const nextIdx = commandIndex - 1;
        setCommandIndex(nextIdx);
        setInput(pastCommands.current[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex < pastCommands.current.length - 1) {
        const nextIdx = commandIndex + 1;
        setCommandIndex(nextIdx);
        setInput(pastCommands.current[nextIdx] || '');
      } else {
        setCommandIndex(pastCommands.current.length);
        setInput('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full bg-[#060b17] border border-blue-600/50 rounded-2xl shadow-[0_0_50px_rgba(29,78,216,0.3)] flex flex-col overflow-hidden transition-all duration-300 relative ${
          isMaximized ? 'h-[95vh] max-w-[98vw]' : 'h-[650px] max-w-4xl'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a1228] border-b border-blue-600/40">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-xs sm:text-sm font-bold text-slate-200">
              jeevith@system-terminal: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-blue-400 hover:bg-blue-600/10 transition-colors"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm ${matrixMode ? 'bg-[#03120b] text-emerald-400' : 'bg-[#060b17]'}`}>
          {history.map((entry, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-blue-300 font-semibold">{entry.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{entry.timestamp}</span>
              </div>
              <div className="pl-4 py-1">{entry.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 p-3 sm:p-4 bg-[#0a1228] border-t border-blue-600/40"
        >
          <span className="text-emerald-400 font-mono font-bold text-sm">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'projects' or 'sudo hire'..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-blue-300 placeholder-slate-600 focus:ring-0"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-300 font-mono text-xs flex items-center gap-1 transition-all"
          >
            <span>RUN</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
