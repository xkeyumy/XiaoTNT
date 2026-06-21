"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  shapes: "hexagon" | "circles" | "grid" | "waves" | "triangle" | "dots";
}

const PROJECTS: Project[] = [
  {
    title: "Neural Canvas",
    desc: "基于 AI 的创意绘画平台，融合生成式对抗网络与实时渲染",
    tags: ["AI", "WebGL", "Creative"],
    gradient: "linear-gradient(135deg, #1B2CC1 0%, #7692FF 60%, #ABD2FA 100%)",
    shapes: "hexagon",
  },
  {
    title: "DataVerse",
    desc: "沉浸式三维数据可视化引擎，将复杂数据集转化为可交互的空间体验",
    tags: ["3D", "Data Viz", "React"],
    gradient: "linear-gradient(135deg, #3D518C 0%, #1B2CC1 100%)",
    shapes: "circles",
  },
  {
    title: "Quantum UI",
    desc: "下一代设计系统，探索量子计算美学与人机交互的边界",
    tags: ["Design System", "Figma", "CSS"],
    gradient: "linear-gradient(135deg, #7692FF 0%, #3D518C 100%)",
    shapes: "grid",
  },
  {
    title: "Echo Protocol",
    desc: "去中心化音频协作协议，让全球音乐人实时共创",
    tags: ["Web3", "Audio", "P2P"],
    gradient: "linear-gradient(135deg, #ABD2FA 0%, #7692FF 100%)",
    shapes: "waves",
  },
  {
    title: "Phantom OS",
    desc: "概念操作系统界面设计，探索空间计算与手势交互的未来",
    tags: ["UI/UX", "Concept", "Spatial"],
    gradient: "linear-gradient(135deg, #091540 0%, #1B2CC1 50%, #3D518C 100%)",
    shapes: "triangle",
  },
  {
    title: "Synapse Link",
    desc: "脑机接口可视化工具，将神经信号转化为直观的数据映射",
    tags: ["BCI", "Visualization", "Real-time"],
    gradient: "linear-gradient(135deg, #1B2CC1 0%, #ABD2FA 100%)",
    shapes: "dots",
  },
];

function ShapeSVG({ type }: { type: Project["shapes"] }) {
  const stroke = "rgba(171, 210, 250, 0.25)";
  const fill = "rgba(118, 146, 255, 0.08)";

  switch (type) {
    case "hexagon":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <polygon
            points="100,15 175,55 175,135 100,175 25,135 25,55"
            fill={fill}
            stroke={stroke}
            strokeWidth="1"
          />
          <polygon
            points="100,45 150,70 150,120 100,145 50,120 50,70"
            fill="none"
            stroke={stroke}
            strokeWidth="0.5"
          />
        </svg>
      );
    case "circles":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <circle cx="100" cy="100" r="70" fill={fill} stroke={stroke} strokeWidth="1" />
          <circle cx="100" cy="100" r="45" fill="none" stroke={stroke} strokeWidth="0.5" />
          <circle cx="100" cy="100" r="20" fill="none" stroke={stroke} strokeWidth="0.5" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              <line x1={40 * i + 20} y1="20" x2={40 * i + 20} y2="180" stroke={stroke} strokeWidth="0.5" />
              <line x1="20" y1={40 * i + 20} x2="180" y2={40 * i + 20} stroke={stroke} strokeWidth="0.5" />
            </g>
          ))}
          <rect x="60" y="60" width="80" height="80" fill={fill} stroke={stroke} strokeWidth="1" rx="4" />
        </svg>
      );
    case "waves":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {[60, 85, 110, 135].map((y, i) => (
            <path
              key={i}
              d={`M 20 ${y} Q 60 ${y - 15 + i * 3} 100 ${y} Q 140 ${y + 15 - i * 3} 180 ${y}`}
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              opacity={0.3 + i * 0.15}
            />
          ))}
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <polygon points="100,25 175,160 25,160" fill={fill} stroke={stroke} strokeWidth="1" />
          <polygon points="100,55 145,140 55,140" fill="none" stroke={stroke} strokeWidth="0.5" />
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {Array.from({ length: 25 }).map((_, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            return (
              <circle
                key={i}
                cx={40 * col + 30}
                cy={40 * row + 30}
                r={3 + Math.sin(i * 1.2) * 2}
                fill={stroke}
                opacity={0.3 + Math.sin(i * 0.8) * 0.3}
              />
            );
          })}
        </svg>
      );
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-5">
            我的数字影像
          </h2>
          <p className="text-dusk-blue/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            每一个项目都是一次对未知领域的探索与创造
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="portfolio-card group"
            >
              {/* Gradient placeholder with geometric shapes */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ background: project.gradient }}
              >
                <ShapeSVG type={project.shapes} />
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Card info */}
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-icy-blue mb-2">
                  {project.title}
                </h3>
                <p className="text-cornflower/50 text-xs sm:text-sm leading-relaxed mb-4">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-full
                        text-cornflower/50 bg-cornflower/[0.06] border border-cornflower/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
