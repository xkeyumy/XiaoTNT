"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "首页", href: "#home" },
  { label: "关于我", href: "#about" },
  { label: "我的数字影像", href: "#portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-5">
        <div
          className="flex items-center justify-between px-6 sm:px-10 py-4 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(27, 44, 193, 0.55)"
              : "rgba(27, 44, 193, 0.2)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: `1px solid rgba(118, 146, 255, ${scrolled ? 0.18 : 0.08})`,
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 2px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <a
            href="#home"
            className="text-icy-blue font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            XiaoTNT
          </a>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  text-icy-blue/50 hover:text-icy-blue hover:bg-white/[0.06]"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="sm:hidden flex flex-col gap-1.5 p-2"
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
              transition={{ duration: 0.3 }}
              className="sm:hidden mt-3 rounded-2xl overflow-hidden"
              style={{
                background: "rgba(27, 44, 193, 0.65)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(118, 146, 255, 0.12)",
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
                  className="block px-8 py-4 text-sm font-medium text-icy-blue/60
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
