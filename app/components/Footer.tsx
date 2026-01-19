"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Identity */}
          <div className="text-center md:text-left">
            <div className="text-sm font-medium text-zinc-200 tracking-wide">
              Amna Aftab
            </div>
            <p className="text-xs text-zinc-400 mt-1">
               Agentic AI & MERN Stack Developer
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <a href="https://github.com/amnakifayat13/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-100 transition">GitHub</a>
            <a href="https://www.linkedin.com/in/amna-aftab-kifayat-81a5822b7/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-100 transition">LinkedIn</a>
            {/* Email ki jagah Twitter add kar diya gaya hai */}
            <a href="https://x.com/AmnaAftab1305" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-100 transition">
              Twitter
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Amna Aftab · Static-first · Agentic AI Systems
        </div>

      </div>
    </footer>
  );
};

export default Footer;