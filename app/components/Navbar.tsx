"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["About", "Agents", "Projects", "Architecture", "Contact"];

  return (
    <>
      {/* FLOATING NAVBAR */}
      <nav className="fixed left-1/2 -translate-x-1/2 z-50 
                      w-[96%] sm:w-[94%] max-w-6xl mt-4">
        <div
          className="relative rounded-2xl sm:rounded-3xl 
                     border border-white/10 
                     bg-black/70 backdrop-blur-xl 
                     shadow-[0_0_60px_rgba(99,102,241,0.15)]"
        >
          {/* ACTIVE GLOW LINE */}
          <div className="absolute inset-x-6 -top-px h-px 
                          bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

          {/* NAV CONTENT */}
          <div className="flex items-center justify-between 
                          px-4 sm:px-6 py-3 sm:py-5">

            {/* BRAND */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 
                           rounded-full 
                           bg-indigo-500/15 
                           border border-indigo-500/40 
                           grid place-items-center 
                           text-indigo-300 text-xs font-semibold
                           group-hover:border-indigo-500/80 transition-colors"
              >
                AI
              </div>

              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-100 group-hover:text-indigo-300 transition-colors">
                  AMNA AFTAB
                </div>
                <div className="hidden sm:block text-[9px] tracking-[0.25em] text-zinc-500">
                  AGENTIC AI & MERN STACK DEVELOPER
                </div>
              </div>
            </Link>

            {/* DESKTOP LINKS & BLACK RGB BUTTON */}
            <div className="hidden lg:flex items-center gap-10 text-sm">
              {links.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative text-zinc-400 hover:text-zinc-100 transition group font-medium"
                >
                  {item}
                  <span
                    className="absolute -bottom-2 left-1/2 w-0 h-0.5 
                               bg-indigo-500 rounded-full 
                               group-hover:w-full
                               transition-all duration-300 transform -translate-x-1/2"
                  />
                </Link>
              ))}

              {/* BLACK BUTTON WITH RGB BORDER GLOW */}
              <a
                href="https://my-resume-amna.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center gap-2 px-8 py-3 bg-black  border border-white/10 overflow-hidden active:scale-95 transition-all duration-300 shadow-2xl"
              >
                {/* RGB Border Animation (Hover Only) */}
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-green-500 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                
                <span className="relative z-10 flex items-center gap-2 font-bold text-white text-sm tracking-widest uppercase">
                  Explore CV 
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-green-400" />
                </span>

                {/* Bottom RGB Line */}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-green-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-full border border-white/10 grid place-items-center text-zinc-300"
            >
              <div className="space-y-1.5">
                <span className={`block h-[2px] bg-current transition-all ${open ? 'w-6 translate-y-2 rotate-45' : 'w-5'}`}></span>
                <span className={`block w-6 h-[2px] bg-current transition-all ${open ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-[2px] bg-current transition-all ${open ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE PANEL */}
      <div
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-xl transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className={`absolute inset-x-0 bottom-0 rounded-t-[3rem] border-t border-white/10 bg-[#050509] px-6 py-12 transition-transform duration-500 ${open ? "translate-y-0" : "translate-y-full"}`}>
          <div className="flex flex-col items-center gap-8 text-lg font-medium">
            {links.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-zinc-300 hover:text-indigo-400 transition-colors uppercase tracking-widest">
                {item}
              </Link>
            ))}

            {/* BLACK RGB BUTTON (Mobile) */}
            <a
              href="https://my-resume-amna.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 w-full flex items-center justify-center gap-3 px-6 py-5 font-black text-white  bg-black border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] text-xl tracking-wider uppercase"
            >
              Explore CV <ArrowUpRight className="text-red-500" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;