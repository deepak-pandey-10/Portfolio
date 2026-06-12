import AboutModelViewer from "./AboutModelViewer";
import { X, Brain, Code2, Database, Orbit, Terminal } from "lucide-react";

export default function AboutPanel({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-dark/85 p-4 md:p-6 backdrop-blur-md">
      {/* Close Button Row (above the card) */}
      <div className="flex w-[90%] max-w-7xl justify-end mb-3">
        <button
          onClick={onClose}
          aria-label="Close panel"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-amber-500/30 bg-space-dark/95 text-space-secondary shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400 active:scale-95 cursor-pointer"
        >
          <X size={20} className="transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>

      {/* Card Wrapper */}
      <div className="relative flex flex-col md:flex-row h-[78vh] w-[90%] max-w-7xl overflow-hidden rounded-3xl border border-amber-500/20 bg-space-dark/60 shadow-[0_0_40px_rgba(245,158,11,0.15)] backdrop-blur-xl">
        
        {/* Left Side (3D Model) */}
        <div className="flex h-[35%] md:h-full md:w-1/2 items-center justify-center bg-gradient-to-br from-[#020206] to-[#120a02] border-b md:border-b-0 md:border-r border-amber-500/10 relative overflow-hidden">
          {/* Subtle cosmic energy background glow for the model */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,rgba(217,119,6,0.05)_60%,transparent_100%)] pointer-events-none" />
          <AboutModelViewer />
        </div>

        {/* Right Side (About Me Text) */}
        <div className="flex-1 h-[65%] md:h-full overflow-y-auto p-6 md:p-12 text-white bg-space-dark/30 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent flex flex-col justify-between gap-8">
          
          <div>
            {/* Sci-fi header line */}
            <span className="font-mono text-amber-500/50 text-[10px] md:text-xs tracking-[0.25em] uppercase mb-2 block animate-pulse select-none">
              // CORE ENTITY LOG LOADED
            </span>

            {/* Glowing gold gradient name */}
            <h1 className="mb-2 text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)] select-all">
              Deepak Pandey
            </h1>

            {/* Header Badges */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              <span className="inline-flex items-center rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-inset ring-amber-500/20 uppercase tracking-widest">
                AI Engineering Student
              </span>
              <span className="inline-flex items-center rounded-lg bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300 ring-1 ring-inset ring-white/10 uppercase tracking-widest">
                Full Stack Developer
              </span>
            </div>

            {/* Grid of details cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "B.Tech AI",
                  desc: "Designing intelligent cognitive solutions",
                  icon: Brain,
                },
                {
                  title: "React & Next.js",
                  desc: "Creating modern, responsive user interfaces",
                  icon: Code2,
                },
                {
                  title: "Backend Development",
                  desc: "Building scalable APIs & services",
                  icon: Database,
                },
                {
                  title: "3D Web Experiences",
                  desc: "Crafting immersive space visuals",
                  icon: Orbit,
                },
              ].map((card, i) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={i}
                    className="group flex gap-4 p-4 rounded-2xl border border-amber-500/10 bg-amber-500/[0.01] transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-500/[0.05] hover:-translate-y-0.5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/25 group-hover:text-amber-300 transition-colors duration-300">
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-semibold text-white tracking-wide">
                        {card.title}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Futuristic Terminal representing "Problem Solver" */}
          <div className="rounded-2xl border border-amber-500/15 bg-black/40 p-4 font-mono text-[11px] md:text-xs leading-relaxed text-amber-400/80 shadow-inner">
            <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-amber-500/10 select-none">
              <Terminal size={14} className="text-amber-500" />
              <span className="text-zinc-400 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">
                cognitive_core.exe
              </span>
              <div className="ml-auto flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500/50"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500/30"></span>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="text-amber-500">&gt;</span>
                <span className="text-zinc-300 font-bold uppercase tracking-wider text-[10px] md:text-xs">
                  Problem Solver Status:
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] md:text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  OPTIMAL
                </span>
              </p>
              <p className="flex gap-2">
                <span className="text-amber-500/50">&gt;</span>
                <span className="text-zinc-400">Loading algorithmic dataset metrics...</span>
              </p>
              <p className="flex gap-2 text-zinc-200">
                <span className="text-amber-500">&gt;</span>
                <span>180+ LeetCode problems successfully resolved.</span>
              </p>
              <p className="flex gap-2 text-zinc-400">
                <span className="text-amber-500/50">&gt;</span>
                <span>Ready for complex and scalable real-world implementations.</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}