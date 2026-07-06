"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [revealed, setRevealed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="flex flex-col sm:flex-row justify-between items-center px-6 py-8 md:px-8 md:py-8 gap-5 border-t border-white/15 bg-black text-[#F2F0EC]"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.9s cubic-bezier(.16,.8,.24,1), transform 0.9s cubic-bezier(.16,.8,.24,1)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-instrument-serif), serif",
          fontSize: 20,
        }}
      >
        Vinícius Almeida
      </div>
      <div
        style={{
          display: "flex",
          gap: 28,
          fontFamily: "var(--font-ibm-plex-mono), monospace",
          fontSize: 12,
          color: "rgba(242,240,236,0.5)",
          flexWrap: "wrap",
        }}
      >
        <a href="/experiences" style={{ color: "inherit", textDecoration: "none" }}>
          trabalhos
        </a>
        <a href="/about" style={{ color: "inherit", textDecoration: "none" }}>
          sobre
        </a>
        <a href="/projects" style={{ color: "inherit", textDecoration: "none" }}>
          projetos
        </a>
        <a
          href="https://github.com/Vinicius083"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          github
        </a>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
          linkedin
        </a>
      </div>
    </footer>
  );
}
