import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-shadow-restricted-names
import { X, BookOpen, Code2, Cpu, Globe, Infinity } from "lucide-react";
import JourneyModelViewer from "./JourneyModelViewer";

const milestones = [
  {
    year: "2021",
    title: "Completed Class X",
    desc: "Foundation laid — curiosity for technology sparked.",
    icon: BookOpen,
    color: "from-amber-400 to-amber-600",
    glow: "rgba(245,158,11,0.4)",
    ring: "ring-amber-500/30",
    dot: "bg-amber-400",
  },
  {
    year: "2023",
    title: "Completed Class XII",
    desc: "Science stream mastered. Eyes set on engineering.",
    icon: BookOpen,
    color: "from-orange-400 to-orange-600",
    glow: "rgba(251,146,60,0.4)",
    ring: "ring-orange-500/30",
    dot: "bg-orange-400",
  },
  {
    year: "2024",
    title: "Started B.Tech AI",
    desc: "Entered the world of Artificial Intelligence & machine cognition.",
    icon: Cpu,
    color: "from-violet-400 to-violet-600",
    glow: "rgba(167,139,250,0.4)",
    ring: "ring-violet-500/30",
    dot: "bg-violet-400",
  },
  {
    year: "2025",
    title: "Learned Full Stack Development",
    desc: "React, Next.js, Node, databases — built end-to-end systems.",
    icon: Code2,
    color: "from-cyan-400 to-cyan-600",
    glow: "rgba(34,211,238,0.4)",
    ring: "ring-cyan-500/30",
    dot: "bg-cyan-400",
  },
  {
    year: "2026",
    title: "Built RankGrow & VelocityLife",
    desc: "Shipped real products used by real people. Founder mindset unlocked.",
    icon: Globe,
    color: "from-emerald-400 to-emerald-600",
    glow: "rgba(52,211,153,0.4)",
    ring: "ring-emerald-500/30",
    dot: "bg-emerald-400",
  },
  {
    year: "Future",
    title: "AI + 3D Web Engineering",
    desc: "Merging intelligent systems with immersive spatial interfaces.",
    icon: Infinity,
    color: "from-pink-400 via-fuchsia-500 to-purple-600",
    glow: "rgba(232,121,249,0.45)",
    ring: "ring-fuchsia-500/30",
    dot: "bg-fuchsia-400",
    isFuture: true,
  },
];

export default function JourneyPanel({ onClose }) {
  const [visible, setVisible] = useState([]);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    // Stagger-reveal each milestone
    milestones.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisible((prev) => [...prev, i]);
      }, 200 + i * 180);
      timeoutRefs.current.push(t);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => timeoutRefs.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-dark/85 p-4 md:p-6 backdrop-blur-md">

      {/* Close Button Row (above the card) */}
      <div className="flex w-[90%] max-w-7xl justify-end mb-3">
        <button
          onClick={onClose}
          aria-label="Close journey panel"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-amber-500/30 bg-space-dark/95 text-space-secondary shadow-[0_0_15px_rgba(245,158,11,0.15)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400 active:scale-95 cursor-pointer"
        >
          <X size={20} className="transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>

      {/* Card Wrapper — mirrors AboutPanel */}
      <div className="relative flex flex-col md:flex-row h-[78vh] w-[90%] max-w-7xl overflow-hidden rounded-3xl border border-amber-500/20 bg-space-dark/60 shadow-[0_0_40px_rgba(245,158,11,0.15)] backdrop-blur-xl">

        {/* Left Side — 3D Model */}
        <div className="flex h-[35%] md:h-full md:w-1/2 items-center justify-center bg-gradient-to-br from-[#020206] to-[#120a02] border-b md:border-b-0 md:border-r border-amber-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,rgba(217,119,6,0.05)_60%,transparent_100%)] pointer-events-none" />
          <JourneyModelViewer />
        </div>

        {/* Right Side — Timeline */}
        <div className="flex-1 h-[65%] md:h-full overflow-y-auto bg-space-dark/30 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent flex flex-col">

          {/* Header */}
          <div className="px-6 md:px-10 pt-8 pb-5 border-b border-amber-500/10 shrink-0">
            <span className="font-mono text-amber-500/50 text-[10px] tracking-[0.25em] uppercase animate-pulse select-none block mb-1">
              // HALL OF KNOWLEDGE — ENTITY LOG
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
              My Journey
            </h2>
            <p className="text-zinc-400 text-sm mt-1">The path that shaped the engineer.</p>
          </div>

          {/* Timeline scroll area */}
          <div className="relative flex-1 overflow-y-auto px-6 md:px-10 py-8 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">

            {/* Vertical connecting line */}
            <div className="absolute left-[3.15rem] md:left-[4.15rem] top-8 bottom-8 w-px bg-gradient-to-b from-amber-500/40 via-fuchsia-500/20 to-transparent" />

            <div className="space-y-6">
              {milestones.map((m, i) => {
                const IconComp = m.icon;
                const isVisible = visible.includes(i);

                return (
                  <div
                    key={i}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-24px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                    className="relative flex gap-4 md:gap-6 group"
                  >
                    {/* Icon dot on the line */}
                    <div className="relative z-10 shrink-0 flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br ${m.color} shadow-lg ring-2 ${m.ring} transition-all duration-300 group-hover:scale-110`}
                        style={{ boxShadow: `0 0 18px ${m.glow}` }}
                      >
                        <IconComp size={18} className="text-white" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div
                      className={`flex-1 rounded-2xl border ${m.ring} bg-white/2 p-4 transition-all duration-300 group-hover:bg-white/5 group-hover:-translate-y-0.5 ${
                        m.isFuture ? "border-dashed" : ""
                      }`}
                      style={{ boxShadow: isVisible ? `0 0 24px ${m.glow}11` : "none" }}
                    >
                      {/* Year badge */}
                      <span
                        className={`inline-block mb-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-linear-to-r ${m.color} bg-clip-text text-transparent border ${m.ring}`}
                      >
                        {m.year}
                      </span>

                      <h3 className={`text-sm md:text-base font-bold text-white mb-1 ${m.isFuture ? "animate-pulse" : ""}`}>
                        {m.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>

                      {m.isFuture && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-ping" />
                          <span className="text-[10px] text-fuchsia-400/70 uppercase tracking-widest font-semibold">In progress…</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer quote */}
          <div className="px-6 md:px-10 py-4 border-t border-amber-500/10 shrink-0">
            <p className="text-center font-mono text-[11px] text-amber-500/40 tracking-widest uppercase select-none">
              "Every milestone is a star in the making."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}


