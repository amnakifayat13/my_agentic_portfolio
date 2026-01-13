"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const router = useRouter();
  const recognitionRef = useRef<any>(null);

  /* =========================
     🔊 Text → Voice (Agent speaks)
     ========================= */
  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* =========================
     🎙️ INIT VOICE (SAME AS AGENT PAGE)
     ========================= */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = async (event: any) => {
      const userQuery = event.results[0][0].transcript;
      console.log("🎙 User said:", userQuery);
      await callAgent(userQuery);
    };

    recognition.onerror = (err: any) => {
      console.error("Mic error:", err);
    };

    recognitionRef.current = recognition;
  }, []);

  /* =========================
     🎤 START LISTENING
     ========================= */
  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    recognitionRef.current.start();
  };

  /* =========================
     🤖 Call Backend Agent
     ========================= */
  const callAgent = async (message: string) => {
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetch(`${BASE_URL}/voice-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // 🔀 Projects query → route only
      if (data?.action === "ROUTE_PROJECTS") {
        router.push("/agent_file?show=all");
        return;
      }

      // 🎙 Normal reply → speak
      if (data?.reply) {
        speak(data.reply);
      }
    } catch (error) {
      console.error("Voice Agent Error:", error);
    }
  };

  return (
    <section className="relative h-screen w-full bg-[#050505] text-white flex flex-col items-center overflow-hidden font-sans">
      
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="w-full max-w-7xl px-8 py-4 flex justify-between items-center z-50 mt-28">
        <div />
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center w-full px-4 -mt-10">
        <div className="relative flex items-center justify-center w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
          <div className="absolute inset-0 rounded-full border border-white/[0.05]" />

          <svg className="absolute inset-[-2px] w-[calc(100%+4px)] h-[calc(100%+4px)]">
            <motion.circle
              cx="50%"
              cy="50%"
              r="49.5%"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeDasharray="60 1000"
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="49.5%"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="100 1000"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="49.5%"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="150 1000"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity }}
            />
          </svg>

          <div className="absolute inset-0 z-20">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-[10%] left-[15%] p-3 bg-[#111] border border-blue-500/40 rounded-xl"
            >
              <Cpu size={20} className="text-blue-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-[20%] right-[1%] p-3 bg-[#111] border border-red-500/40 rounded-xl"
            >
              <Zap size={20} className="text-red-400" />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute bottom-[1%] left-[45%] p-3 bg-[#111] border border-green-500/40 rounded-xl"
            >
              <Shield size={20} className="text-green-400" />
            </motion.div>
          </div>

          <div className="relative z-30 text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-4">
              <span className="italic">Amna Aftab</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-400 to-blue-500">
                Agentic Portfolio
              </span>
            </h1>

            <p className="text-gray-400 text-xs md:text-sm max-w-md mb-8">
              Human-led agentic systems with real-time intelligence and visual control
            </p>

            {/* 🎤 SAME UI – UPDATED LOGIC */}
            <button
              onClick={startListening}
              className="px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
            >
              Speak with AI Assistant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
