"use client";

import React, { useEffect, useRef, useState } from "react";

const RAZAO_SOCIAL: string = "67.151.500 JOSE VINICIUS ALMEIDA RODRIGUES";
const CNPJ: string = "67.151.500/0001-03";
const MUNICIPIO_UF: string = "João Pessoa/PB";

const LEGAL_LINE = [RAZAO_SOCIAL, CNPJ && `CNPJ ${CNPJ}`, MUNICIPIO_UF]
  .filter(Boolean)
  .join(" · ");

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
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="flex flex-col px-6 py-8 md:px-8 md:py-8 gap-5 border-t border-white/15 bg-black text-[#F2F0EC]"
      style={{
        opacity: revealed ? 1 : 0,
        // Sem translateY aqui: um transform "para baixo" no rodapé (último
        // elemento da página) inflava a altura rolável em 28px e deixava um
        // espaço fantasma no fim do scroll. O fade sozinho já basta.
        transition: "opacity 0.9s cubic-bezier(.16,.8,.24,1)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
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
          <a
            href="/experiences"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            trabalhos
          </a>
          <a href="/about" style={{ color: "inherit", textDecoration: "none" }}>
            sobre
          </a>
          <a
            href="/projects"
            style={{ color: "inherit", textDecoration: "none" }}
          >
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
          <a
            href="https://www.linkedin.com/in/viniciusalmeidabe/"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            linkedin
          </a>
        </div>
      </div>

      {LEGAL_LINE && (
        <div
          className="text-center sm:text-left"
          style={{
            fontFamily: "var(--font-ibm-plex-mono), monospace",
            fontSize: 11,
            color: "rgba(242,240,236,0.3)",
            letterSpacing: "0.02em",
          }}
        >
          {LEGAL_LINE}
        </div>
      )}
    </footer>
  );
}
