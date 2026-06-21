"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    title: "技术探索",
    desc: "热衷于探索前沿技术的边界。从 Web3D 到 AI 生成式设计，从空间计算到脑机接口，我始终相信技术是连接想象与现实的桥梁。",
    icon: "⟨/⟩",
  },
  {
    title: "数字影像",
    desc: "用代码构建视觉叙事。每一段交互、每一帧动画都是精心编排的数字诗篇，将冰冷的数据转化为有温度的用户体验。",
    icon: "◈",
  },
  {
    title: "设计哲学",
    desc: "极简而不简单。在深邃的暗色调中寻找光影的平衡，在克制的交互中传递丰富的情感。每一个像素都有其存在的意义。",
    icon: "◉",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 sm:py-40 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-20 sm:mb-28"
        >
          <h2 className="hero-title gradient-text mb-8" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)" }}>
            关于我
          </h2>
          <p className="text-dusk-blue/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
            一个在代码与像素之间游走的数字匠人，
            <br className="hidden sm:block" />
            致力于将技术美学融入每一个项目
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card rounded-2xl p-8 sm:p-10 group"
            >
              <div className="text-3xl mb-8 text-cornflower/30 group-hover:text-cornflower/60 transition-colors duration-600">
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-icy-blue mb-5 tracking-tight">
                {card.title}
              </h3>
              <p className="text-cornflower/45 text-sm leading-[1.75]">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass-card rounded-2xl p-10 sm:p-14 mt-10"
        >
          <p className="text-cornflower/50 text-sm sm:text-base leading-[1.9] text-center max-w-2xl mx-auto tracking-wide">
            我是肖宜欣（XiaoTNT），一名充满热情的全栈开发者与数字创作者。
            我相信优秀的产品源于对细节的极致追求和对用户体验的深刻理解。
            在我的作品集中，你将看到技术与艺术的交汇 ——
            每一个项目都是对可能性边界的一次探索。
            无论是沉浸式的三维交互，还是精密的数据可视化，
            我都力求在功能与美学之间找到完美的平衡点。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
