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
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-5"
          >
            关于我
          </h2>
          <p className="text-dusk-blue/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            一个在代码与像素之间游走的数字匠人，致力于将技术美学融入每一个项目
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="glass-card rounded-2xl p-7 sm:p-8 group"
            >
              <div className="text-3xl mb-5 text-cornflower/40 group-hover:text-cornflower/70 transition-colors duration-500">
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-icy-blue mb-3">
                {card.title}
              </h3>
              <p className="text-cornflower/55 text-sm leading-[1.8]">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extra bio block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="glass-card rounded-2xl p-8 sm:p-10 mt-8"
        >
          <p className="text-cornflower/60 text-sm sm:text-base leading-[2] text-center max-w-3xl mx-auto">
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
