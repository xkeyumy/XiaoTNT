"use client";

import { motion } from "framer-motion";

const CARDS = [
  { title: "技术探索", icon: "⟨/⟩" },
  { title: "数字影像", icon: "◈" },
  { title: "设计哲学", icon: "◉" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.18,
      ease: [0.22, 1, 0.36, 1] as const,
    },
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
          <h2
            className="hero-title gradient-text mb-8"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)" }}
          >
            关于我
          </h2>
          <p className="text-dusk-blue/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
            还无内容
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
              <div className="text-3xl mb-8 text-cornflower/30 group-hover:text-cornflower/60 transition-colors duration-500">
                {card.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-icy-blue mb-5 tracking-tight">
                {card.title}
              </h3>
              <p className="text-cornflower/45 text-sm leading-[1.75]">
                还无内容
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="glass-card rounded-2xl p-10 sm:p-14 mt-10"
        >
          <p className="text-cornflower/45 text-sm sm:text-base leading-[1.9] text-center max-w-2xl mx-auto tracking-wide">
            还无内容
          </p>
        </motion.div>
      </div>
    </section>
  );
}
