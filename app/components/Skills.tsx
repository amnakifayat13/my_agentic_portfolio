"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Code2, 
  Layers, 
  Database, 
  Cpu, 
  Terminal, 
  Box, 
  Zap, 
  Globe, 
  Wind, 
  Triangle, 
  Cloud, 
  Server,
  Sparkles,
  Mail // Formspree ke liye Mail icon add kiya
} from 'lucide-react';

const skills = [
  { name: "TypeScript", desc: "A superset of JavaScript that adds static typing for robust application development.", icon: <Code2 className="text-blue-400" /> },
  { name: "JavaScript", desc: "The versatile language of the web, powering interactive and dynamic user experiences.", icon: <Code2 className="text-yellow-400" /> },
  { name: "Next.js", desc: "The React framework for production, optimizing performance and SEO out of the box.", icon: <Layers className="text-white" /> },
  { name: "MongoDB", desc: "NoSQL database for modern applications, offering high scalability and flexible data models.", icon: <Database className="text-green-500" /> },
  { name: "OpenAI Agents SDK", desc: "Integrating powerful AI models like GPT-4 to build intelligent and autonomous solutions.", icon: <Cpu className="text-emerald-400" /> },
  { name: "Python", desc: "The go-to language for AI, data science, and efficient backend automation scripts.", icon: <Terminal className="text-blue-500" /> },
  { name: "Qdrant", desc: "High-performance vector database, essential for building RAG and AI search engines.", icon: <Box className="text-orange-500" /> },
  { name: "Neon DB", desc: "Serverless Postgres database with autoscaling and instant branching capabilities.", icon: <Zap className="text-cyan-400" /> },
  { name: "HTML", desc: "The backbone of web content, structured for semantic meaning and accessibility.", icon: <Globe className="text-orange-600" /> },
  { name: "CSS", desc: "Styling the web with modern techniques like Grid, Flexbox, and advanced animations.", icon: <Wind className="text-blue-300" /> },
  { name: "Formspree", desc: "Powerful form solution to receive submissions directly to email without a backend.", icon: <Mail className="text-red-400" /> }, // Naya skill yahan add kiya
  { name: "Spekit Plus", desc: "Advanced tools for digital adoption and enhancing productivity in specialized workflows.", icon: <Sparkles className="text-purple-400" /> },
  { name: "Vercel", desc: "Cloud platform for static sites and Serverless Functions, optimized for Next.js.", icon: <Triangle className="text-white" /> },
  { name: "Google Cloud", desc: "Robust suite of cloud computing services for hosting and scaling global apps.", icon: <Cloud className="text-blue-400" /> },
  { name: "Railway", desc: "Modern infrastructure platform that simplifies deployment and environment management.", icon: <Server className="text-pink-500" /> },
];

const SkillsSection = () => {
  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center ">
        <h2 className="text-4xl md:text-5xl font-semibold mb-28">My Tech Stack</h2>
        
        {/* --- Orbit Section --- */}
        <div className="relative h-[300px] flex items-center justify-center mb-28">
          {/* Central Icon */}
          <div className="z-10 bg-gray-900 p-5 rounded-full border border-gray-700 shadow-2xl">
            <Github size={48} />
          </div>

          {/* Orbit Rings */}
          <div className="absolute border border-gray-800 rounded-full w-[250px] h-[250px]" />
          <div className="absolute border border-gray-800 rounded-full w-[450px] h-[450px]" />

          {/* Floating Icons with Motion */}
          {[ 
            { icon: <Code2 size={20} className="text-blue-400"/>, pos: "top-10 left-1/4", delay: 0 },
            { icon: <Layers size={20} className="text-white"/>, pos: "top-20 right-1/4", delay: 1 },
            { icon: <Cpu size={20} className="text-emerald-400"/>, pos: "bottom-10 left-1/3", delay: 2 },
            { icon: <Triangle size={20} className="text-white"/>, pos: "bottom-20 right-1/3", delay: 1.5 }
          ].map((item, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: item.delay }}
              className={`absolute ${item.pos} bg-gray-900 p-3 rounded-full border border-gray-800 shadow-lg`}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        {/* --- Description Text --- */}
        <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed mb-16 ">
          I specialize in building full-stack applications with a focus on <strong>AI integrations</strong> and 
          <strong> scalable cloud infrastructure</strong>. Using industry-leading tools, I transform 
          complex ideas into seamless digital experiences.
        </p>

        {/* --- Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-800 rounded-2xl overflow-hidden">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="p-8 border-[0.5px] border-gray-800 hover:bg-gray-900/30 transition-colors text-left group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <span className="font-medium text-gray-200">{skill.name}</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;