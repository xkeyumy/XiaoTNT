"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CIRCLE_RATIO = 0.3;
const FADE_EDGE = 0.85;

function circleRectOverlap(
  cx: number,
  cy: number,
  r: number,
  rect: DOMRect
): boolean {
  const closestX = Math.max(rect.left, Math.min(cx, rect.right));
  const closestY = Math.max(rect.top, Math.min(cy, rect.bottom));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy < r * r;
}

export default function LensEffect() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isOverTitle, setIsOverTitle] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const diameter = Math.max(viewport.w, viewport.h) * CIRCLE_RATIO;
  const radius = diameter / 2;

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: clientX, y: clientY });
        if (titleRef.current) {
          const rect = titleRef.current.getBoundingClientRect();
          setIsOverTitle(
            circleRectOverlap(clientX, clientY, radius, rect)
          );
        }
      });
    },
    [radius]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) =>
      handlePointerMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      handlePointerMove(t.clientX, t.clientY);
    };
    const onTouchEnd = () => setPos(null);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handlePointerMove]);

  const showEnglish = isOverTitle && pos !== null;

  return (
    <>
      <h1
        ref={titleRef}
        className="title-text select-none"
        aria-label="欢迎来到肖宜欣的个人主页"
      >
        <span
          className="title-layer"
          style={{ opacity: showEnglish ? 0 : 1 }}
        >
          欢迎来到肖宜欣的个人主页
        </span>
        <span
          className="title-layer title-english"
          style={{ opacity: showEnglish ? 1 : 0 }}
        >
          Welcome to XiaoTNT&apos;s Home Page
        </span>
      </h1>

      {pos && (
        <div
          className="lens-circle"
          style={{
            width: diameter,
            height: diameter,
            transform: `translate3d(${pos.x - radius}px, ${pos.y - radius}px, 0)`,
          }}
          aria-hidden
        />
      )}

      <style jsx>{`
        .title-text {
          position: relative;
          z-index: 10;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          text-align: center;
          max-width: 90vw;
          padding: 0 1rem;
          font-size: clamp(2rem, 7vw, 6rem);
          background: linear-gradient(
            135deg,
            var(--color-icy-blue) 0%,
            var(--color-cornflower) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .title-layer {
          display: block;
          position: absolute;
          inset: 0;
          transition: opacity 0.3s ease;
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .title-layer:first-child {
          position: relative;
        }
        .title-english {
          background: linear-gradient(
            135deg,
            var(--color-cornflower) 0%,
            var(--color-icy-blue) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .lens-circle {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 50;
          mix-blend-mode: difference;
          background: radial-gradient(
            circle at center,
            #ffffff 85%,
            transparent 100%
          );
          box-shadow: 0 0 80px 20px rgba(255, 255, 255, 0.08),
            0 0 160px 60px rgba(118, 146, 255, 0.05);
          will-change: transform;
        }
      `}</style>
    </>
  );
}
