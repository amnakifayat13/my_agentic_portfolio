"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // 👈 query params

interface ProjectItem {
  id: number;
  title: string;
  url: string;
  image: string;
}

interface AgentResponse {
  type: "text" | "projects" | "error";
  message?: string;
  items?: ProjectItem[];
}

interface Response {
  user: string;
  agent: AgentResponse;
}

const AgentPage: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const searchParams = useSearchParams(); // 👈 get query params

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [responses]);

  // 🎙️ INIT VOICE
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      await handleVoiceSend(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // 🎤 START VOICE
  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  // 🔧 HELPER: extract category from user message
  const detectCategory = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("ai")) return "ai";
    if (lower.includes("react")) return "react";
    if (lower.includes("streamlit")) return "streamlit";
    return "all";
  };

  // 🎙️ VOICE SEND
  const handleVoiceSend = async (spokenText: string) => {
    setLoading(true);

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetch(`${BASE_URL}/voice-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: spokenText }),
      });

      const data: {
        reply: string;
        action?: string;
      } = await res.json();

      // 🧭 ROUTE PROJECTS
      
      if (data.action === "ROUTE_PROJECTS") {
        const category = detectCategory(spokenText);
        const projRes = await fetch(
          `${BASE_URL}/projects?category=${category}`
        );
        const projects: ProjectItem[] = await projRes.json();

        setResponses((prev) => [
          ...prev,
          {
            user: spokenText,
            agent: { type: "projects", items: projects },
          },
        ]);
      } else {
        setResponses((prev) => [
          ...prev,
          {
            user: spokenText,
            agent: { type: "text", message: data.reply },
          },
        ]);
      }
    } catch (e) {
      setResponses((prev) => [
        ...prev,
        {
          user: spokenText,
          agent: { type: "error", message: "Voice agent error." },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 💬 TEXT SEND
  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetch(
        `${BASE_URL}/agent-run?user_input=${encodeURIComponent(
          userInput
        )}`
      );

      const data: { agent_response?: AgentResponse } = await res.json();

      // 🧭 ROUTE PROJECTS (text input)
      if (
        data.agent_response?.type === "projects" ||
        /projects|portfolio|work/i.test(userInput)
      ) {
        const category = detectCategory(userInput);
        const projRes = await fetch(
          `${BASE_URL}/projects?category=${category}`
        );
        const projects: ProjectItem[] = await projRes.json();

        setResponses((prev) => [
          ...prev,
          {
            user: userInput,
            agent: { type: "projects", items: projects },
          },
        ]);
      } else {
        setResponses((prev) => [
          ...prev,
          {
            user: userInput,
            agent: data.agent_response || {
              type: "text",
              message: "No response",
            },
          },
        ]);
      }

      setUserInput("");
    } catch (err) {
      setResponses((prev) => [
        ...prev,
        {
          user: userInput,
          agent: { type: "error", message: "Error connecting to agent." },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ HERO SECTION ROUTE: fetch all projects if query param ?show=all
  useEffect(() => {
    const showAll = searchParams?.get("show");
    if (showAll === "all") {
      const fetchAllProjects = async () => {
        setLoading(true);
        try {
          // ✅ fetch all projects without filtering by category
          const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
          const projRes = await fetch(`${BASE_URL}/projects`);
          const projects: ProjectItem[] = await projRes.json();
          setResponses([
            {
              user: "Hero Section",
              agent: { type: "projects", items: projects },
            },
          ]);
        } catch (err) {
          setResponses([
            {
              user: "Hero Section",
              agent: { type: "error", message: "Failed to load projects." },
            },
          ]);
        } finally {
          setLoading(false);
        }
      };

      fetchAllProjects();
    }
  }, [searchParams?.toString()]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 mt-12">
        Amna's Concierge Agent
      </h1>

      {/* Chat */}
      <div className="w-full max-w-3xl flex flex-col gap-4 bg-[#111] p-6 rounded-2xl mb-6 overflow-y-auto h-[60vh]">
        {responses.length === 0 && <p className="text-gray-400">...</p>}

        {responses.map((r, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-blue-400 font-bold">You:</span>
            <p className="bg-gray-800 p-2 rounded">{r.user}</p>

            <span className="text-green-400 font-bold">Agent:</span>

            {r.agent.type === "text" || r.agent.type === "error" ? (
              <p className="bg-gray-700 p-2 rounded">{r.agent.message}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                {r.agent.items?.map((proj) => (
                  <a
                    key={proj.id}
                    href={proj.url}
                    target="_blank"
                    className="bg-[#222] rounded-lg overflow-hidden"
                  >
                    <img
                      src={proj.image}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-2">
                      <h3 className="font-bold">{proj.title}</h3>
                      <p className="text-blue-400 text-xs">Open Project</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex gap-2 w-full max-w-3xl">
        <input
          className="flex-1 p-3 rounded-lg bg-[#222]"
          placeholder="Ask something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* 🎤 MIC */}
        <button
          onClick={startListening}
          className={`px-4 rounded-lg font-bold ${
            listening ? "bg-red-600" : "bg-gray-700"
          }`}
        >
          🎤
        </button>

        <button
          onClick={handleSend}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AgentPage;
