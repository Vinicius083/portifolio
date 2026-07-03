"use client";

import React, { useState, useEffect } from "react";

const ACCENT = "oklch(68% 0.19 38)";

export default function CustomCursor() {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [hoverBig, setHoverBig] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("a, button")) {
        setHoverBig(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("a, button")) {
        setHoverBig(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <style>{`
        ::selection { background: ${ACCENT}; color: #07060a; }
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
        @media (pointer: coarse) {
          * { cursor: auto !important; }
          .vinicius-cursor-dot, .vinicius-cursor-ring { display: none !important; }
        }
      `}</style>

      <div
        className="vinicius-cursor-dot"
        style={{
          position: "fixed",
          left: cursor.x,
          top: cursor.y,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#F2F0EC",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "opacity 0.2s ease",
        }}
      />
      <div
        className="vinicius-cursor-ring"
        style={{
          position: "fixed",
          left: cursor.x,
          top: cursor.y,
          width: hoverBig ? 54 : 30,
          height: hoverBig ? 54 : 30,
          borderRadius: "50%",
          border: `1px solid ${hoverBig ? ACCENT : "rgba(255,255,255,0.4)"}`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease",
        }}
      />
    </>
  );
}
