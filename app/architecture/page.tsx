"use client";

import React, { useState, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Database, Workflow, Cloud, 
  Zap, ShieldCheck, Activity, Terminal,
  ChevronRight, Share2, Globe, LucideProps,
  MessagesSquare, Gauge, Coins, Scale
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  title: string;
  tech: string;
  desc: string;
  icon: ReactElement<LucideProps>;
  color: string;
}

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

const NeuralArchitecture: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans overflow-hidden">
      
      {/* --- Floating Background Particles --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -1000],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute w-px h-10 bg-gradient-to-t from-transparent via-white/20 to-transparent"
            style={{ left: `${Math.random() * 100}%`, top: '100%' }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <header className="mb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.6em] mb-4 mt-8"
          >
            <Activity size={14} className="animate-pulse" /> Agentic Architecture Blueprint
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 italic uppercase">
            Autonomous <br /> <span className="text-gray-700 font-light not-italic tracking-normal">Architectures</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- Left Side: Animated Nodes --- */}
          <div className="lg:col-span-5 space-y-4">
            {architectureNodes.map((node, i) => (
              <motion.div
                key={node.id}
                onMouseEnter={() => setActiveNode(i)}
                className={`relative p-6 rounded-3xl border transition-all duration-500 cursor-pointer group ${
                  activeNode === i 
                  ? 'bg-white/[0.05] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
                  : 'bg-transparent border-white/5 opacity-50 grayscale hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl bg-black border border-white/10 group-hover:scale-110 transition-transform`}>
                    {node.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{node.title}</h3>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{node.tech}</p>
                  </div>
                  <ChevronRight className={`ml-auto transition-transform ${activeNode === i ? 'rotate-90 text-emerald-400' : 'text-gray-700'}`} />
                </div>
                
                <AnimatePresence mode="wait">
                  {activeNode === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <p className="text-xs text-gray-400 leading-relaxed italic">{node.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* --- Right Side: Visual Flow Diagram (Shifted Upwards) --- */}
          <div className="lg:col-span-7 relative h-[450px] flex items-start justify-center mt-[-100px]">
            
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Outer Dashed Rotating Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72 rounded-full border border-dashed border-white/10"
              />
              
              <svg className="absolute w-[360px] h-[360px] overflow-visible pointer-events-none">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <motion.circle
                  cx="180" cy="180" r="110"
                  fill="none"
                  stroke={architectureNodes[activeNode].color}
                  strokeWidth="2"
                  strokeDasharray="10 20"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  filter="url(#glow)"
                />
              </svg>

              {/* Central Icon Box */}
              <div className="relative z-10 p-10 bg-[#080808] rounded-full border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
                <motion.div 
                  key={activeNode}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative z-10"
                >
                  {React.cloneElement(architectureNodes[activeNode].icon, { size: 50 } as LucideProps)}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent" />
              </div>

              {/* Decorative Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                  className="absolute rounded-full border border-white/5"
                  style={{ 
                    width: 250 + i * 40, 
                    height: 250 + i * 40,
                  }}
                >
                  <div className="w-1 h-1 bg-white/10 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Technical Bar --- */}
        <footer className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
            <Terminal size={18} className="text-gray-500" />
            <div className="text-[10px] font-mono text-gray-400">
              <span className="text-emerald-500">ENGINE_LOG:</span> AGENT_NEGOTIATION_SUCCESSFUL // LATENCY: 240ms
            </div>
          </div>
          
          <div className="flex gap-8 opacity-30 text-gray-400">
            <Coins size={18} />
            <Scale size={18} />
            <Zap size={18} />
          </div>
        </footer>

      </div>
    </div>
  );
};

export default NeuralArchitecture;