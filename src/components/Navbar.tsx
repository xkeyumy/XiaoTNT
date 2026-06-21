"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "首页", href: "#home" },
  { label: "关于我", href: "#about" },
  { label: "我的数字影像", href: "#portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          className="relative flex items-center justify-between px-5 sm:px-8 py-3.5 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(9, 21, 64, 0.65)"
              : "rgba(9, 21, 64, 0.25)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: `1px solid rgba(118, 146, 255, ${scrolled ? 0.15 : 0.08})`,
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 2px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Liquid highlight that follows mouse */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: scrolled ? 0.5 : 0.3,
              background: `radial-gradient(300px circle at ${mouseX}px 50%, rgba(118,146,255,0.1), transparent 60%)`,
            }}
          />

          {/* Logo */}
          <a
            href="#home"
            className="relative z-10 text-icy-blue font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            XiaoTNT
          </a>

          {/* Desktop nav */}
          <div className="relative z-10 hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  text-cornflower/60 hover:text-icy-blue hover:bg-white/[0.04]"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-10 sm:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-icy-blue rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-icy-blue rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-icy-blue rounded-full origin-center"
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="sm:hidden mt-2 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(9, 21, 64, 0.75)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(118, 146, 255, 0.1)",
              }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3.5 text-sm font-medium text-cornflower/70
                    hover:text-icy-blue hover:bg-white/[0.04] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
