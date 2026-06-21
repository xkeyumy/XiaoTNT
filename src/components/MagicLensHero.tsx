"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const BASE_RADIUS = 150;
const FEATHER = 35;
const GLOW_EXTRA = 25;

export default function MagicLensHero() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [isActive, setIsActive] = useState(false);
  const topLayerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -9999, y: -9999 });

  const updatePos = useCallback((clientX: number, clientY: number) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      posRef.current = { x: clientX, y: clientY };
      setPos({ x: clientX, y: clientY });
      if (!isActive) setIsActive(true);
    });
  }, [isActive]);

  const handleInactive = useCallback(() => {
    setIsActive(false);
    setPos({ x: -9999, y: -9999 });
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) =>
      updatePos(e.clientX, e.clientY);

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      updatePos(t.clientX, t.clientY);
    };

    const onTouchEnd = () => handleInactive();
    const onMouseLeave = () => handleInactive();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [updatePos, handleInactive]);

  const getLocalCoords = useCallback(() => {
    if (!topLayerRef.current) return { x: -9999, y: -9999 };
    const rect = topLayerRef.current.getBoundingClientRect();
    return { x: pos.x - rect.left, y: pos.y - rect.top };
  }, [pos]);

  const local = getLocalCoords();
  const radius = BASE_RADIUS;
  const innerEdge = radius - FEATHER;

  const maskStyle: React.CSSProperties = isActive
    ? {
        WebkitMaskImage: `radial-gradient(circle ${radius}px at ${local.x}px ${local.y}px, transparent ${innerEdge}px, black ${radius}px)`,
        maskImage: `radial-gradient(circle ${radius}px at ${local.x}px ${local.y}px, transparent ${innerEdge}px, black ${radius}px)`,
      }
    : { WebkitMaskImage: "none", maskImage: "none" };

  const titleVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const subVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden select-none px-4"
    >
      {/* ── Bottom layer: English ──────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[1]">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center font-bold tracking-tight leading-[1.1] gradient-text-reverse"
          style={{ fontSize: "clamp(1.75rem, 5.5vw, 5.5rem)" }}
        >
          Welcome to
          <br />
          XiaoTNT&apos;s Home Page
        </motion.h1>
      </div>

      {/* ── Top layer: Chinese with CSS mask ───────── */}
      <div
        ref={topLayerRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-[2]"
        style={maskStyle}
      >
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center font-bold tracking-tight leading-[1.1] gradient-text"
          style={{ fontSize: "clamp(1.75rem, 5.5vw, 5.5rem)" }}
        >
          欢迎来到
          <br />
          肖宜欣的个人主页
        </motion.h1>
      </div>

      {/* ── Glow ring at mask edge ─────────────────── */}
      {isActive && (
        <div
          className="absolute z-[3] pointer-events-none"
          style={{
            width: (radius + GLOW_EXTRA) * 2,
            height: (radius + GLOW_EXTRA) * 2,
            left: pos.x - radius - GLOW_EXTRA,
            top: pos.y - radius - GLOW_EXTRA,
            borderRadius: "50%",
            background: `radial-gradient(circle ${radius}px at center, transparent ${radius - 6}px, rgba(118,146,255,0.18) ${radius}px, transparent ${radius + GLOW_EXTRA}px)`,
            filter: "blur(3px)",
            transform: "translate3d(0,0,0)",
          }}
        />
      )}

      {/* ── Scroll hint ────────────────────────────── */}
      <motion.div
        variants={subVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-dusk-blue/50 text-xs sm:text-sm tracking-[0.2em] uppercase">
          向下滚动探索
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-dusk-blue/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-cornflower/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
