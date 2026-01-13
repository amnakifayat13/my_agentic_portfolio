
"use client"
import React, { useEffect, useState } from 'react';
import { ExternalLink, Globe } from 'lucide-react';

/* 🔹 Project type (TypeScript fix) */
type Project = {
  id: number;
  title: string;
  url: string;
  image: string;
};

const ProjectTimeline: React.FC = () => {

  /* 🔹 Typed state */
  const [projectData, setProjectData] = useState<Project[]>([]);

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    console.log("BASE_URL =", BASE_URL);
    fetch(`${BASE_URL}/projects`)
      .then(res => res.json())
      .then((data: Project[]) => setProjectData(data))
      .catch(err => console.error("Failed to load projects:", err));
  }, []);

  return (
    <section className="bg-black text-white py-20 px-4 min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="px-4 py-1 rounded-full border border-gray-700 text-xs text-gray-400 uppercase tracking-widest bg-gray-900/50">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            My Creative Works & <br /> AI Projects
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">

          {/* Vertical Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent hidden md:block" />
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-cyan-500 to-purple-500 blur-sm top-1/4 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {projectData.map((project, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={project.id}
                  className={`flex flex-col md:flex-row items-center w-full mb-16 ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />

                  {/* Project Card */}
                  <div className="w-full md:w-1/2 px-4 md:px-10 relative">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-2xl border border-gray-800 bg-gray-900/40 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 group max-w-md"
                    >
                      <div className="flex gap-4 items-center">

                        {/* Image */}
                        <div className="relative overflow-hidden rounded-xl w-32 md:w-40 aspect-[21/9] flex-shrink-0">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ExternalLink className="text-white w-4 h-4" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col overflow-hidden">
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-3.5 h-3.5 text-blue-400" />
                            <h3 className="font-semibold text-sm md:text-base group-hover:text-blue-400 transition-colors truncate">
                              {project.title}
                            </h3>
                          </div>
                          <p className="text-gray-500 text-[10px] truncate italic">
                            {project.url}
                          </p>
                        </div>
                      </div>

                      {/* Connection Line (Desktop) */}
                      <div
                        className={`hidden md:block absolute top-1/2 w-10 h-[1px] bg-gray-700 ${
                          isLeft ? '-right-10' : '-left-10'
                        }`}
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectTimeline;
