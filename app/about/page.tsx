"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Code2, Layers, Database, Cpu, Terminal, 
  Box, Zap, Globe, Sparkles, Bot, BrainCircuit, 
  Workflow, ShieldCheck, ArrowUpRight, Radio, Award, Rocket,
  Linkedin 
} from 'lucide-react';

const skills = [
  { name: "TypeScript", icon: <Code2 size={18} className="text-blue-400" /> },
  { name: "OpenAI Agents SDK", icon: <Cpu size={18} className="text-emerald-400" /> },
  { name: "Speckit Plus", icon: <Sparkles size={18} className="text-purple-400" /> }, // Added here
  { name: "Next.js", icon: <Layers size={18} className="text-white" /> },
  { name: "Python", icon: <Terminal size={18} className="text-blue-500" /> },
  { name: "MongoDB", icon: <Database size={18} className="text-green-500" /> },
  { name: "Qdrant", icon: <Box size={18} className="text-orange-500" /> },
  { name: "Google Cloud", icon: <Globe size={18} className="text-blue-300" /> },
  { name: "Vercel", icon: <Zap size={18} className="text-white" /> },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans p-4 md:p-10 selection:bg-emerald-500/30">
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto border border-white/[0.08] rounded-[3rem] overflow-hidden bg-[#050505] shadow-[0_0_50px_rgba(0,0,0,1)]">
        
        {/* --- Top Hero Section --- */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 border-b border-white/[0.08]">
          
          {/* Left Content (7 Columns) */}
          <div className="lg:col-span-7 p-10 md:p-24 relative z-10 border-r border-white/[0.08]">
           <motion.div 
                         initial={{ opacity: 0, y: 10 }} 
                         animate={{ opacity: 1, y: 0 }} 
                         className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6"
                       >
                         <Award size={16} /> National AI Champion • GIAIC Senior Lead
                       </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-bold mb-10 tracking-tighter leading-none"
            >
              Amna <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 font-light italic">Aftab</span>
            </motion.h1>

            <p className="text-gray-400 text-lg max-w-xl mb-16 leading-relaxed font-light">
              A pioneering <span className="text-white font-medium">Agentic AI Developer</span> and winner of the <span className="text-emerald-400">"Women in AI"</span> title at Innovista's National Hackathon 2025. Currently serving as a Senior Student at GIAIC, I specialize in building autonomous neural architectures that bridge the gap between static code and self-evolving intelligence.
            </p>

            <div className="flex flex-wrap gap-10 border-t border-white/5 pt-12">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300">National Champion</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Women in AI - Innovista 2025</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shadow-inner">
                  <Rocket size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300">Startup Vision</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Founder of Next-Gen AI Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Globe Section (5 Columns) */}
          <div className="lg:col-span-5 relative bg-[#030303] flex items-center justify-center overflow-hidden min-h-[600px]">
            <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" 
                  style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative w-[450px] h-[450px] flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-emerald-500/30 blur-[2px]" 
              />
              
              <svg className="absolute inset-0 w-full h-full rotate-[-45deg]">
                <motion.circle 
                  cx="50%" cy="50%" r="48%" fill="none" stroke="url(#globe-grad)" 
                  strokeWidth="1" strokeDasharray="100 300" strokeLinecap="round"
                  animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="globe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative w-64 h-64 rounded-full bg-black border border-white/10 shadow-[0_0_80px_rgba(16,185,129,0.1)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="z-10 flex flex-col items-center"
                >
                  <Globe size={80} className="text-white/20 mb-4" />
                  <div className="text-[10px] font-mono text-emerald-500 tracking-[0.5em] uppercase text-center px-4">Innovating from Pakistan</div>
                </motion.div>
              </div>

              {/* --- PROMINENT SECTION: The Agentive Minds --- */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="absolute bottom-10 right-0 p-5 backdrop-blur-2xl bg-emerald-500/[0.03] border border-emerald-500/30 rounded-[1.5rem] flex items-center gap-4 max-w-[300px] shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(16,185,129,0.1)] z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Zap size={20} className="text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">The Agentive Minds</span>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <p className="text-[10px] text-gray-300 leading-tight mt-1 font-medium">
                    Our specialized team is ready to deliver production-grade Agentic AI solutions and expert technical services.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Skill Bar Section --- */}
        <section className="bg-white/[0.02] p-8 border-b border-white/[0.08] overflow-hidden">
          <div className="flex items-center gap-20 animate-infinite-scroll whitespace-nowrap">
            {[...skills, ...skills].map((skill, i) => (
              <div key={i} className="flex items-center gap-3 group opacity-40 hover:opacity-100 transition-opacity">
                {skill.icon}
                <span className="text-xs font-bold uppercase tracking-widest font-mono">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Bento Grid Features --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-white/[0.08]">
          <div className="p-16 md:p-24 hover:bg-white/[0.01] transition-all group">
            <div className="flex justify-between items-start mb-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-lg">
                <BrainCircuit size={28} />
              </div>
              <ArrowUpRight className="text-gray-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-4xl font-bold mb-6 italic tracking-tight">Academic & <br /> Leadership</h3>
            <p className="text-gray-500 leading-relaxed mb-12 max-w-sm">
              Currently spearheading AI education at <span className="text-white">GIAIC</span>. Guiding junior developers while mastering high-level concepts in Next.js, Python, and Large Language Models.
            </p>
            <div className="h-1 w-20 bg-emerald-500/40 rounded-full group-hover:w-40 transition-all duration-700" />
          </div>

          <div className="p-16 md:p-24 hover:bg-white/[0.01] transition-all group">
            <div className="flex justify-between items-start mb-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-lg">
                <Box size={28} />
              </div>
              <ArrowUpRight className="text-gray-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-4xl font-bold mb-6 italic tracking-tight">Full-Stack <br /> AI Engineering</h3>
            <p className="text-gray-500 leading-relaxed mb-12 max-w-sm">
              End-to-end development using <span className="text-white">Qdrant Vector DB</span>, <span className="text-white">Speckit Plus</span>, and <span className="text-white">Vercel</span>. Expert in crafting seamless AI workflows with <span className="text-white">OpenAI Agents SDK</span>.
            </p>
            <div className="h-1 w-20 bg-blue-500/40 rounded-full group-hover:w-40 transition-all duration-700" />
          </div>
        </section>

        {/* --- Footer Branding --- */}
        <footer className="p-12 text-center bg-[#030303] border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
            <p className="text-[10px] uppercase tracking-[0.6em]">Amna Aftab &bull; National AI Champion 2025</p>
            <div className="flex gap-6 items-center">
              <a href="https://github.com/amnakifayat13/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/amna-aftab-kifayat-81a5822b7/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
            <p className="text-[10px] uppercase tracking-[0.6em]">The Agentive Minds &bull; Active</p>
          </div>
        </footer>

      </div>
      
      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default About;