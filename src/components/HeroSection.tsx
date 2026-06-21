"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Phase = "chinese" | "sweep" | "english" | "fading";

export default function HeroSection() {
  const [phase, setPhase] = useState<Phase>("chinese");

  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];

    const cycle = () => {
      setPhase("chinese");
      ids.push(setTimeout(() => setPhase("sweep"), 2400));
      ids.push(setTimeout(() => setPhase("english"), 4000));
      ids.push(setTimeout(() => setPhase("fading"), 7800));
      ids.push(setTimeout(cycle, 9000));
    };

    cycle();
    return () => ids.forEach(clearTimeout);
  }, []);

  const showChinese = phase === "chinese" || phase === "sweep";
  const showSweep = phase === "sweep";
  const showEnglish = phase === "english" || phase === "fading";

  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="relative">
        {/* Chinese text — in flow, defines container size */}
        <div
          className="transition-opacity duration-700 ease-out"
          style={{ opacity: showChinese ? 1 : 0 }}
        >
          <h1 className="hero-title gradient-text text-center">
            <span className="relative inline-block">
              欢迎来到肖宜欣的个人主页
              {/* Light sweep — constrained to text width */}
              {showSweep && (
                <span
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  aria-hidden
                >
                  <motion.span
                    className="absolute top-[-40%] bottom-[-40%] w-36 block"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(171,210,250,0.2) 20%, rgba(255,255,255,0.55) 50%, rgba(171,210,250,0.2) 80%, transparent 100%)",
                      filter: "blur(14px)",
                    }}
                    initial={{ left: "-144px" }}
                    animate={{ left: "calc(100% + 24px)" }}
                    transition={{
                      duration: 1.4,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                  />
                </span>
              )}
            </span>
          </h1>
        </div>

        {/* English text — absolute overlay, cross-fades with Chinese */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out"
          style={{ opacity: showEnglish ? 1 : 0 }}
        >
          <h1 className="hero-title gradient-text-reverse text-center">
            Welcome to XiaoTNT&apos;s Home Page
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 10, duration: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-dusk-blue/35 text-xs tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          className="w-[1px] h-8 bg-gradient-to-b from-cornflower/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
