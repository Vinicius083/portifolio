"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const ACCENT = "#EE4F2F";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollPct((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          background: isMenuOpen ? "transparent" : "rgba(7,6,10,0.55)",
          backdropFilter: isMenuOpen ? "none" : "blur(8px) saturate(160%)",
          WebkitBackdropFilter: isMenuOpen
            ? "none"
            : "blur(8px) saturate(160%)",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        <div className="flex flex-row items-center justify-between px-6 py-4 md:px-8 md:py-[26px]">
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: 22,
              letterSpacing: "0.01em",
              position: "relative",
              zIndex: 510,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Vinícius Almeida
          </Link>

          <div
            className="hidden md:flex items-center gap-9 justify-center text-[13px] font-light"
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
            }}
          >
            <Link
              href="/experiences"
              style={{ color: "rgba(242,240,236,0.5)", textDecoration: "none" }}
            >
              trabalhos
            </Link>
            <Link
              href="/about"
              style={{ color: "rgba(242,240,236,0.5)", textDecoration: "none" }}
            >
              sobre
            </Link>
            <Link
              href="/projects"
              style={{ color: "rgba(242,240,236,0.5)", textDecoration: "none" }}
            >
              projetos
            </Link>
            <Link
              href="/contact"
              style={{ color: ACCENT, textDecoration: "none" }}
            >
              me contrate
            </Link>
          </div>

          <button
            className="md:hidden flex items-center gap-3 text-[14px] font-light cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              position: "relative",
              zIndex: 510,
              background: "none",
              border: "none",
              color: "inherit",
            }}
          >
            <span>{isMenuOpen ? "close" : "menu"}</span>
            {isMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            ) : (
              <div className="flex flex-col gap-[6px]">
                <div
                  style={{
                    width: 20,
                    height: 1,
                    backgroundColor: "currentColor",
                  }}
                />
                <div
                  style={{
                    width: 20,
                    height: 1,
                    backgroundColor: "currentColor",
                  }}
                />
              </div>
            )}
          </button>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.14)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${scrollPct}%`,
              background: ACCENT,
              transition: "width 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[495] flex flex-col items-end pt-32 px-8 bg-black/60 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
        }}
      >
        <div
          className="flex flex-col items-end gap-10 text-[26px] font-light"
          style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
        >
          <Link
            href="/experiences"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "rgba(242,240,236,0.8)", textDecoration: "none" }}
          >
            trabalhos
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "rgba(242,240,236,0.8)", textDecoration: "none" }}
          >
            sobre
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "rgba(242,240,236,0.8)", textDecoration: "none" }}
          >
            projetos
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: ACCENT, textDecoration: "none" }}
          >
            me contrate
          </Link>
        </div>
      </div>
    </>
  );
}
