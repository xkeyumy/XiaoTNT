"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "enter" | "chinese" | "sweep" | "english";

export default function HeroSection() {
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("chinese"), 200),
      setTimeout(() => setPhase("sweep"), 2800),
      setTimeout(() => setPhase("english"), 4600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const showChinese = phase === "enter" || phase === "chinese" || phase === "sweep";
  const showSweep = phase === "sweep";

  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <AnimatePresence mode="wait">
        {showChinese ? (
          <motion.div
            key="zh"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative text-center"
          >
            <h1 className="hero-title gradient-text">
              欢迎来到肖宜欣的个人主页
            </h1>

            {/* Light sweep beam */}
            {showSweep && (
              <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden>
                <motion.div
                  className="absolute top-[-30%] bottom-[-30%] w-48"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(171,210,250,0.15) 25%, rgba(255,255,255,0.45) 50%, rgba(171,210,250,0.15) 75%, transparent 100%)",
                    filter: "blur(18px)",
                  }}
                  initial={{ left: "-15%" }}
                  animate={{ left: "115%" }}
                  transition={{
                    duration: 1.6,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="en"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center"
          >
            <h1 className="hero-title gradient-text-reverse">
              Welcome to
              <br />
              XiaoTNT&apos;s Home Page
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 text-dusk-blue/60 text-sm sm:text-base tracking-[0.2em] uppercase"
            >
              Developer · Creator · Dreamer
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-dusk-blue/40 text-xs tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" as const }}
          className="w-[1px] h-8 bg-gradient-to-b from-cornflower/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
