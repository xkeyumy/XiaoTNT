"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  gradient: string;
  shape: "hexagon" | "circles" | "grid" | "waves" | "triangle" | "dots";
}

const PROJECTS: Project[] = [
  {
    title: "Neural Canvas",
    gradient: "linear-gradient(135deg, #1B2CC1 0%, #7692FF 60%, #ABD2FA 100%)",
    shape: "hexagon",
  },
  {
    title: "DataVerse",
    gradient: "linear-gradient(135deg, #3D518C 0%, #1B2CC1 100%)",
    shape: "circles",
  },
  {
    title: "Quantum UI",
    gradient: "linear-gradient(135deg, #7692FF 0%, #3D518C 100%)",
    shape: "grid",
  },
  {
    title: "Echo Protocol",
    gradient: "linear-gradient(135deg, #ABD2FA 0%, #7692FF 100%)",
    shape: "waves",
  },
  {
    title: "Phantom OS",
    gradient: "linear-gradient(135deg, #091540 0%, #1B2CC1 50%, #3D518C 100%)",
    shape: "triangle",
  },
  {
    title: "Synapse Link",
    gradient: "linear-gradient(135deg, #1B2CC1 0%, #ABD2FA 100%)",
    shape: "dots",
  },
];

function ShapeSVG({ type }: { type: Project["shape"] }) {
  const s = "rgba(171, 210, 250, 0.2)";
  const f = "rgba(118, 146, 255, 0.06)";

  switch (type) {
    case "hexagon":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700">
          <polygon points="100,15 175,55 175,135 100,175 25,135 25,55" fill={f} stroke={s} strokeWidth="0.8" />
          <polygon points="100,45 150,70 150,120 100,145 50,120 50,70" fill="none" stroke={s} strokeWidth="0.4" />
        </svg>
      );
    case "circles":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700">
          <circle cx="100" cy="100" r="70" fill={f} stroke={s} strokeWidth="0.8" />
          <circle cx="100" cy="100" r="45" fill="none" stroke={s} strokeWidth="0.4" />
          <circle cx="100" cy="100" r="20" fill="none" stroke={s} strokeWidth="0.4" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700">
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              <line x1={40 * i + 20} y1="20" x2={40 * i + 20} y2="180" stroke={s} strokeWidth="0.4" />
              <line x1="20" y1={40 * i + 20} x2="180" y2={40 * i + 20} stroke={s} strokeWidth="0.4" />
            </g>
          ))}
          <rect x="60" y="60" width="80" height="80" fill={f} stroke={s} strokeWidth="0.8" rx="4" />
        </svg>
      );
    case "waves":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700">
          {[60, 85, 110, 135].map((y, i) => (
            <path key={i} d={`M 20 ${y} Q 60 ${y - 15 + i * 3} 100 ${y} Q 140 ${y + 15 - i * 3} 180 ${y}`} fill="none" stroke={s} strokeWidth="0.8" opacity={0.3 + i * 0.15} />
          ))}
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700">
          <polygon points="100,25 175,160 25,160" fill={f} stroke={s} strokeWidth="0.8" />
          <polygon points="100,55 145,140 55,140" fill="none" stroke={s} strokeWidth="0.4" />
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-700">
          {Array.from({ length: 25 }).map((_, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            return (
              <circle key={i} cx={40 * col + 30} cy={40 * row + 30} r={3 + Math.sin(i * 1.2) * 2} fill={s} opacity={0.3 + Math.sin(i * 0.8) * 0.3} />
            );
          })}
        </svg>
      );
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-32 sm:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-20 sm:mb-28"
        >
          <h2
            className="hero-title gradient-text mb-8"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)" }}
          >
            我的数字影像
          </h2>
          <p className="text-dusk-blue/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
            还无内容
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="portfolio-card group"
            >
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ background: project.gradient }}
              >
                <ShapeSVG type={project.shape} />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 55%)",
                  }}
                />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-base sm:text-lg font-semibold text-icy-blue mb-3 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-cornflower/40 text-xs sm:text-sm leading-relaxed">
                  还无内容
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
