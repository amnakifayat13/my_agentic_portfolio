"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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

const AgentPageClient: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const searchParams = useSearchParams(); // ✅ now safe

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

  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  const detectCategory = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("ai")) return "ai";
    if (lower.includes("react")) return "react";
    if (lower.includes("streamlit")) return "streamlit";
    return "all";
  };

  const handleVoiceSend = async (spokenText: string) => {
    setLoading(true);
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetch(`${BASE_URL}/voice-agent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: spokenText }),
      });

      const data: { reply: string; action?: string } = await res.json();

      if (data.action === "ROUTE_PROJECTS") {
        const category = detectCategory(spokenText);
        const projRes = await fetch(
          `${BASE_URL}/projects?category=${category}`
        );
        const projects: ProjectItem[] = await projRes.json();

        setResponses((prev) => [
          ...prev,
          { user: spokenText, agent: { type: "projects", items: projects } },
        ]);
      } else {
        setResponses((prev) => [
          ...prev,
          { user: spokenText, agent: { type: "text", message: data.reply } },
        ]);
      }
    } catch {
      setResponses((prev) => [
        ...prev,
        { user: spokenText, agent: { type: "error", message: "Voice agent error." } },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetch(
        `${BASE_URL}/agent-run?user_input=${encodeURIComponent(userInput)}`
      );

      const data: { agent_response?: AgentResponse } = await res.json();

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
          { user: userInput, agent: { type: "projects", items: projects } },
        ]);
      } else {
        setResponses((prev) => [
          ...prev,
          {
            user: userInput,
            agent:
              data.agent_response || {
                type: "text",
                message: "No response",
              },
          },
        ]);
      }

      setUserInput("");
    } catch {
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

  // ✅ HERO ROUTE
  useEffect(() => {
    const showAll = searchParams.get("show");
    if (showAll === "all") {
      const fetchAllProjects = async () => {
        setLoading(true);
        try {
          const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
          const res = await fetch(`${BASE_URL}/projects`);
          const projects: ProjectItem[] = await res.json();

          setResponses([
            {
              user: "Hero Section",
              agent: { type: "projects", items: projects },
            },
          ]);
        } catch {
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
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center px-4 py-8">
      {/* UI SAME AS BEFORE */}
      {/* ... */}
    </div>
  );
};

export default AgentPageClient;
