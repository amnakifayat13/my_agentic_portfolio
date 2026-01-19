"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Linkedin, Twitter, Check, Copy } from 'lucide-react';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [status, setStatus] = useState("");
  const emailAddress = "hayatullahamna@gmail.com";
  const whatsappNumber = "923162391694"; 

  const handleContactAction = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    window.location.href = `mailto:${emailAddress}`;
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      project_idea: formData.get("message"), 
    };

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetch(`${BASE_URL}/lead-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit project idea");

      const data = await res.json();
      setRoadmap(data.roadmap);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
      setStatus("❌ Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0a0a0a] text-white py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Glow Effects - Made smaller on mobile */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent px-2">
            Get in Touch
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto px-4">
            Have a project in mind or want to discuss AI integrations? Let's connect and build something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* --- Left Side: Contact Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0d0d0d]/80 border border-gray-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-sm shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-400 ml-1">Full Name</label>
                  <input name="name" required type="text" placeholder="Amna Aftab" className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 text-sm md:text-base" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm text-gray-400 ml-1">Email Address</label>
                  <input name="email" required type="email" placeholder="amna@example.com" className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 text-sm md:text-base" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs sm:text-sm text-gray-400 ml-1">Project Idea / Message</label>
                <textarea name="message" required rows={4} placeholder="Describe your project idea..." className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-700 resize-none text-sm md:text-base" />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold py-3.5 sm:py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group active:scale-95">
                {loading ? "Submitting..." : "Send Project Idea"}
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>

            {roadmap && (
              <div className="mt-6 p-4 bg-gray-900/50 border border-gray-800 rounded-xl text-gray-200 overflow-x-auto">
                <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Tech Roadmap:</h4>
                <pre className="text-xs sm:text-sm whitespace-pre-wrap font-mono">{roadmap}</pre>
                <p className="mt-2 text-green-400 font-medium text-xs sm:text-sm">{status}</p>
              </div>
            )}
          </motion.div>

          {/* --- Right Side: Contact Cards & Social Links --- */}
          <div className="space-y-5 md:space-y-6">
            {/* Clickable Email Card */}
            <motion.div 
              onClick={handleContactAction}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-4 sm:p-6 bg-[#0d0d0d]/50 border border-gray-800 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition-all group cursor-pointer relative"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="p-3 sm:p-4 bg-blue-600/10 rounded-xl text-blue-500 group-hover:scale-105 transition-transform">
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-gray-400 text-xs sm:text-sm">Email Me</h4>
                  <p className="text-sm sm:text-lg font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                    {emailAddress}
                  </p>
                </div>
              </div>
              <div className="text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0">
                {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={18} />}
              </div>
              <AnimatePresence>
                {copied && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -45 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* WhatsApp Card */}
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="block">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-4 sm:p-6 bg-[#0d0d0d]/50 border border-gray-800 rounded-2xl flex items-center gap-4 sm:gap-5 hover:border-green-500/50 transition-all group cursor-pointer"
              >
                <div className="p-3 sm:p-4 bg-green-600/10 rounded-xl text-green-500 group-hover:scale-105 transition-transform">
                  <MessageSquare size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-gray-400 text-xs sm:text-sm">Let's Chat</h4>
                  <p className="text-sm sm:text-lg font-medium text-white group-hover:text-green-400 transition-colors">
                    Available on WhatsApp
                  </p>
                </div>
              </motion.div>
            </a>

            {/* Social Links - Fully Responsive Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              {[
                { icon: <Github />, label: "GitHub", href: "https://github.com/amnakifayat13/" },
                { icon: <Linkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/amna-aftab-kifayat-81a5822b7/" },
                { icon: <Twitter />, label: "Twitter", href: "https://x.com/AmnaAftab1305" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center justify-center p-4 sm:p-6 bg-[#0d0d0d]/50 border border-gray-800 rounded-2xl hover:bg-gray-800/50 transition-all group"
                >
                  <div className="mb-2 text-gray-300 group-hover:text-white transition-colors">
                    {React.cloneElement(social.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-tighter sm:tracking-normal">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;