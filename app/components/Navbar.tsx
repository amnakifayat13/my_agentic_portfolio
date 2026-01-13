"use client";
import React, { useState } from "react";
import Link from "next/link"; // Next.js navigation ke liye

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = ["About", "Agents", "Projects", "Architecture", "Contact"];

  return (
    <>
      {/* FLOATING NAVBAR */}
      <nav className="fixed left-1/2 -translate-x-1/2 z-50 
                      w-[96%] sm:w-[94%] max-w-6xl">
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
                          px-4 sm:px-6 py-3 sm:py-4">

            {/* BRAND - Ab ye click hone par Home page (/) par redirect karega */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 
                           rounded-full 
                           bg-indigo-500/15 
                           border border-indigo-500/40 
                           grid place-items-center 
                           text-indigo-300 text-[10px] sm:text-xs font-semibold
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

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-10 text-sm">
              {links.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative text-zinc-400 hover:text-zinc-100 transition group"
                >
                  {item}
                  <span
                    className="absolute -bottom-2 left-1/2 w-10 h-0.5 
                               bg-indigo-500 rounded-full 
                               opacity-0 group-hover:opacity-100 
                               group-hover:scale-125 
                               transition transform -translate-x-1/2"
                  />
                </Link>
              ))}
            </div>

            {/* MOBILE / TABLET TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 
                         rounded-full 
                         border border-white/10 
                         grid place-items-center 
                         text-zinc-300 hover:text-white"
              aria-label="Toggle navigation"
            >
              <div className="space-y-1">
                <span className="block w-4 h-[2px] bg-current"></span>
                <span className="block w-6 h-[2px] bg-current"></span>
                <span className="block w-4 h-[2px] bg-current"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE / TABLET PANEL */}
      <div
        className={`fixed inset-0 z-40 
                    bg-black/70 backdrop-blur-xl 
                    transition-all duration-300
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-x-0 bottom-0 
                     rounded-t-3xl 
                     border-t border-white/10 
                     bg-[#050509] 
                     px-6 py-10"
        >
          <div className="mb-6 text-[10px] tracking-[0.35em] 
                          text-zinc-500 text-center">
            NAVIGATION
          </div>

          <div className="flex flex-col items-center gap-6 text-base sm:text-lg font-medium">
            {links.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-zinc-300 hover:text-indigo-400 transition"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;