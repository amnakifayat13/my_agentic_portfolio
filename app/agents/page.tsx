"use client";

import React, { useState, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Cpu, Zap, Search, 
  Terminal, Activity, ArrowRight, 
  BrainCircuit, ShieldCheck, LucideProps,
  Database, Workflow, Layers, Award,
  Scale, Coins, Gauge, MessagesSquare,
  ChevronLeft, ChevronRight, Share2, Globe
} from 'lucide-react';

// --- TYPES ---
interface AgentModule {
  name: string;
  role: string;
  desc: string;
  icon: ReactElement<LucideProps>;
}

interface OrbitalRingProps {
  radius: number;
  duration: number;
  delay: number;
  color: string;
  rotationDirection?: number;
}

interface ArchitectureNode {
  id: string;
  title: string;
  tech: string;
  desc: string;
  icon: ReactElement<LucideProps>;
  color: string;
}

// --- DATA ---
const agentModules: AgentModule[] = [
  { 
    name: "Advanced Reasoning", 
    role: "OpenAI SDK", 
    desc: "Orchestrating complex multi-step reasoning chains using OpenAI Agents SDK with deep focus on logical consistency and task decomposition.", 
    icon: <BrainCircuit className="text-purple-400" /> 
  },
  { 
    name: "Multi-Agent Collab", 
    role: "Negotiation", 
    desc: "Developing agent-to-agent negotiation protocols and collaborative workflows where specialized agents solve problems through structured dialogue.", 
    icon: <MessagesSquare className="text-cyan-400" /> 
  },
  { 
    name: "Tool Orchestration", 
    role: "Action Execution", 
    desc: "Precision handling of tool actions and autonomous execution scripts, ensuring agents interact safely and accurately with external APIs.", 
    icon: <Zap className="text-yellow-500" /> 
  },
  { 
    name: "Performance Guard", 
    role: "Latency & Cost", 
    desc: "Optimizing token usage for cost-efficiency, managing latency rates, and implementing 'Degrade Mode' for resilient system stability.", 
    icon: <Gauge className="text-emerald-500" /> 
  }
];

const architectureNodes: ArchitectureNode[] = [
  {
    id: "orchestration",
    title: "Orchestration Layer",
    tech: "OpenAI Agents SDK",
    desc: "Designing multi-step reasoning loops and custom handoff protocols that govern complex task execution and state management.",
    icon: <Cpu className="text-purple-400" />,
    color: "#a855f7"
  },
  {
    id: "negotiation",
    title: "Agent Collaboration",
    tech: "Negotiation Logic",
    desc: "Building inter-agent dialogue protocols and negotiation frameworks to resolve conflicts and optimize task distribution in swarms.",
    icon: <MessagesSquare className="text-cyan-400" />,
    color: "#22d3ee"
  },
  {
    id: "reliability",
    title: "System Resilience",
    tech: "Degrade Mode",
    desc: "Implementing automated fallback protocols and 'Degrade Mode' logic to ensure system uptime and operational safety during model failures.",
    icon: <ShieldCheck className="text-emerald-400" />,
    color: "#10b981"
  },
  {
    id: "efficiency",
    title: "Metric Optimization",
    tech: "Latency & Cost",
    desc: "Optimizing production metrics through prompt compression, intelligent caching, and token management to minimize latency and overhead.",
    icon: <Gauge className="text-blue-400" />,
    color: "#3b82f6"
  }
];

// --- COMPONENTS ---

const OrbitalRing: React.FC<OrbitalRingProps> = ({ radius, duration, delay, color, rotationDirection = 1 }) => (
  <motion.div
    animate={{ rotate: 360 * rotationDirection }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    className="absolute border border-white/[0.05] rounded-full flex items-center justify-center"
    style={{ width: radius * 2, height: radius * 2 }}
  >
    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}`, transform: `translateY(-${radius}px)` }} />
  </motion.div>
);

const NeuralArchitectureView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeNode, setActiveNode] = useState<number>(0);
  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans overflow-hidden">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase"
        >
          <ChevronLeft size={16}  className='mt-10'/> Back to Interface
        </button>
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20">
          <div className="flex items-center gap-3 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-6">
            <Activity size={14} className="animate-pulse" /> Agentic Architecture Blueprint
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-[0.8] mb-8 uppercase">
            Neural <span className="text-gray-700 font-light not-italic tracking-normal">Logic</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            {architectureNodes.map((node, i) => (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(i)}
                className={`relative p-6 rounded-3xl border transition-all duration-500 cursor-pointer group ${activeNode === i ? 'bg-white/[0.05] border-white/20' : 'bg-transparent border-white/5 opacity-50'}`}
              >
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-black border border-white/10">{node.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{node.title}</h3>
                    <p className="text-[10px] font-mono text-gray-500 uppercase">{node.tech}</p>
                  </div>
                </div>
                {activeNode === i && <p className="text-xs text-gray-400 mt-4 italic">{node.desc}</p>}
              </div>
            ))}
          </div>
          <div className="lg:col-span-7 relative flex items-center justify-center">
             <div className="relative p-20 bg-[#080808] rounded-full border border-white/10 shadow-2xl">
                {React.cloneElement(architectureNodes[activeNode].icon, { size: 80 } as LucideProps)}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentsPage: React.FC = () => {
  const [view, setView] = useState<'main' | 'stack'>('main');

  if (view === 'stack') return <NeuralArchitectureView onBack={() => setView('main')} />;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto border border-white/10 rounded-[2.5rem] bg-[#050505] overflow-hidden relative shadow-2xl">
        
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-white/10">
          <div className="p-12 md:p-20 border-r border-white/10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
              <Award size={16} /> National AI Champion • OpenAI Agent Architect
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-[0.8] mb-8 uppercase">
            Neural <span className="text-gray-700 font-light not-italic tracking-normal">Logic</span>
          </h1>
            <p className="text-gray-400 text-sm max-w-md mb-12 leading-relaxed">
              I specialize in **Production-Grade Agentic Systems**. Using the OpenAI Agents SDK, I build ecosystems that prioritize high-reasoning accuracy and strict performance optimization.
            </p>

            <div className="flex flex-wrap gap-4">
               <button 
                onClick={() => setView('stack')}
                className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold hover:bg-emerald-400 transition-all flex items-center gap-2"
               >
                 View Agent Stack <ArrowRight size={14} />
               </button>
               <div className="px-4 py-3 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono flex items-center gap-2">
                  <Activity size={12} className="text-emerald-500" /> RESILIENCE: DEGRADE MODE ACTIVE
               </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center bg-[#030303] overflow-hidden py-24 min-h-[550px]">
             <div className="relative w-64 h-64 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-600/10 blur-[80px] rounded-full" />
                <Cpu size={50} className="text-emerald-400 opacity-90" />
             </div>
             <OrbitalRing radius={140} duration={12} delay={0} color="#a855f7" />
             <OrbitalRing radius={170} duration={18} delay={1} color="#10b981" rotationDirection={-1} />
             <OrbitalRing radius={200} duration={25} delay={2} color="#22d3ee" />
          </div>
        </section>

        <section className="p-12 md:p-20 border-b border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Core Agent Competencies</h2>
                <p className="text-gray-500 text-sm">Deploying agentic frameworks that solve enterprise challenges through collaboration, negotiation, and reasoning.</p>
            </div>
            <div className="flex gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2"><Gauge size={14} className="text-emerald-500" /> Latency Optimized</div>
                <div className="flex items-center gap-2"><Coins size={14} className="text-yellow-500" /> Cost Efficient</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {agentModules.map((module, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 transition-all">
                <div className="mb-6 p-4 bg-black border border-white/10 rounded-2xl inline-block">{module.icon}</div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">{module.name}</h3>
                <h4 className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest mb-3">{module.role}</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed font-light">{module.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="p-8 flex flex-col md:flex-row justify-between items-center bg-black/50 border-t border-white/5 opacity-60">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
             <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">Agentic Engine Online: Reasoning_v2.5_Stable</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-gray-500">Amna Aftab &bull; Innovista National Champion</p>
        </footer>
      </div>
    </div>
  );
};

export default AgentsPage;