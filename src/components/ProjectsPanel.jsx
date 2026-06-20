import { ExternalLink, GitBranch, X, Rocket } from "lucide-react";
import ProjectModelViewer from "./ProjectModelViewer";

const projects = [
  {
    title: "RankGrow",
    subtitle: "SEO + AEO Platform",
    tech: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
    features: [
      "AI Recommendations",
      "Audit History",
      "Real-Time Analysis",
    ],
    color: "from-violet-400 to-fuchsia-500",
    glow: "rgba(168,85,247,0.4)",
    ring: "ring-violet-500/30",
    codeUrl: "https://github.com/deepak-pandey-10/RankGrow.git",
    hostedUrl: "https://rankgrow-2.onrender.com",
  },
  {
    title: "VelocityLife",
    subtitle: "Sports Booking Platform",
    tech: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
    features: [
      "Turf Booking",
      "Google Maps",
      "Authentication",
    ],
    color: "from-cyan-400 to-blue-500",
    glow: "rgba(34,211,238,0.4)",
    ring: "ring-cyan-500/30",
    codeUrl: "https://github.com/deepak-pandey-10/VelocityLife.git",
    hostedUrl: "https://velocitylife-6.onrender.com/",
  },
];

export default function ProjectsPanel({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-dark/85 p-4 md:p-6 backdrop-blur-md">

      {/* Close Button Row (above the card) */}
      <div className="flex w-[90%] max-w-7xl justify-end mb-3">
        <button
          onClick={onClose}
          aria-label="Close projects panel"
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
          <ProjectModelViewer />
        </div>

        {/* Right Side — Projects */}
        <div className="flex-1 h-[65%] md:h-full overflow-y-auto bg-space-dark/30 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent flex flex-col">

          {/* Header */}
          <div className="px-6 md:px-10 pt-8 pb-5 border-b border-amber-500/10 shrink-0">
            <span className="font-mono text-amber-500/50 text-[10px] tracking-[0.25em] uppercase animate-pulse select-none block mb-1">
              // BLACKHOLE ARCHIVE — PROJECT LOG
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
              My Projects
            </h2>
            <p className="text-zinc-400 text-sm mt-1">Systems pulled from concept into orbit.</p>
          </div>

          {/* Project card scroll area */}
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent">
            <div className="grid grid-cols-1 gap-5">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className={`group rounded-2xl border ${project.ring} bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-0.5`}
                  style={{
                    boxShadow: `0 0 24px ${project.glow}22`,
                  }}
                >
                  <div className="mb-4 flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${project.color} shadow-lg ring-2 ${project.ring} transition-all duration-300 group-hover:scale-105`}
                      style={{ boxShadow: `0 0 18px ${project.glow}` }}
                    >
                      <Rocket size={20} className="text-white" />
                    </div>

                    <div className="min-w-0">
                      <span
                        className={`inline-block mb-2 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${project.color} bg-clip-text text-transparent border ${project.ring}`}
                      >
                        Project
                      </span>

                      <h3 className="text-lg font-bold text-white">
                        {project.title}
                      </h3>

                      <p className="text-sm text-zinc-400">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                      Tech Stack
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                      Features
                    </h4>

                    <ul className="grid gap-1 sm:grid-cols-3">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-zinc-300"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} source code`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300"
                    >
                      <GitBranch size={15} />
                      Code
                    </a>

                    <a
                      href={project.hostedUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} live site`}
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 ${project.ring} bg-gradient-to-r ${project.color} bg-opacity-20 hover:scale-[1.02]`}
                    >
                      <ExternalLink size={15} />
                      Live
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer quote */}
          <div className="px-6 md:px-10 py-4 border-t border-amber-500/10 shrink-0">
            <p className="text-center font-mono text-[11px] text-amber-500/40 tracking-widest uppercase select-none">
              "Every project bends possibility into shape."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
