"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { PROJECTS, JOBS } from "@/data/portfolio";

const ACCENT = "oklch(68% 0.19 38)";

type AnimPhase = "in" | "out" | null;

function revealStyle(
  revealed: Record<string, boolean>,
  id: string,
  translateY = 28,
): CSSProperties {
  const on = !!revealed[id];
  return {
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : `translateY(${translateY}px)`,
    transition:
      "opacity 0.9s cubic-bezier(.16,.8,.24,1), transform 0.9s cubic-bezier(.16,.8,.24,1)",
  };
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [hoverBig, setHoverBig] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [cardProgress, setCardProgress] = useState<Record<string, number>>({});
  const [photoProgress, setPhotoProgress] = useState(0);
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);
  const [animatingJob, setAnimatingJob] = useState<string | null>(null);
  const [animPhase, setAnimPhase] = useState<AnimPhase>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;

      const vh = window.innerHeight;
      const tracks = rootRef.current
        ? rootRef.current.querySelectorAll("[data-project-track]")
        : [];
      const nextCardProgress: Record<string, number> = {};
      tracks.forEach((el) => {
        const id = el.getAttribute("data-project-track");
        if (!id) return;
        const rect = el.getBoundingClientRect();
        const p = (vh - rect.top) / vh;
        nextCardProgress[id] = Math.max(0, Math.min(1, p));
      });

      let nextPhotoProgress = 0;
      const photoEl = rootRef.current
        ? rootRef.current.querySelector("[data-photo-track]")
        : null;
      if (photoEl) {
        const r = photoEl.getBoundingClientRect();
        const start = vh * 0.9;
        const end = vh * 0.35;
        const p = (start - r.top) / (start - end);
        nextPhotoProgress = Math.max(0, Math.min(1, p));
      }

      setScrollPct(pct);
      setCardProgress(nextCardProgress);
      setPhotoProgress(nextPhotoProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-reveal-id");
          if (!id) return;
          setRevealed((s) => (s[id] ? s : { ...s, [id]: true }));
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    root.querySelectorAll("[data-reveal-id]").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  const handleOver = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest && target.closest("a,button")) setHoverBig(true);
  }, []);

  const handleOut = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest && target.closest("a,button")) setHoverBig(false);
  }, []);

  const handleJobEnter = useCallback((id: string) => {
    setHoveredJob(id);
    setAnimatingJob(id);
    setAnimPhase("in");
  }, []);

  const handleJobLeave = useCallback((id: string) => {
    setHoveredJob((current) => {
      if (current !== id) return current;
      setAnimPhase("out");
      return null;
    });
  }, []);

  const handleJobImageAnimEnd = useCallback(
    (id: string) => {
      if (animatingJob === id && animPhase === "out") {
        setAnimatingJob(null);
        setAnimPhase(null);
      }
    },
    [animatingJob, animPhase],
  );

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseOver={handleOver}
      onMouseOut={handleOut}
      className="vinicius-cursor-area"
      style={{
        background: "#000000ff",
        color: "#F2F0EC",
        fontFamily: "var(--font-space-grotesk), sans-serif",
        minHeight: "100vh",
        cursor: "none",
        position: "relative",
      }}
    >
      <style>{`
        .vinicius-cursor-area ::selection { background: ${ACCENT}; color: #07060a; }
        @media (pointer: fine) {
          .vinicius-cursor-area, .vinicius-cursor-area * { cursor: none !important; }
        }
        @media (pointer: coarse) {
          .vinicius-cursor-area { cursor: auto !important; }
          .vinicius-cursor-dot, .vinicius-cursor-ring { display: none; }
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
          transition:
            "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
        }}
      />

      {/* vertical grid guides */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.19) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 12.5%)",
          opacity: 0.5,
        }}
      />

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
          <div
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: 22,
              letterSpacing: "0.01em",
              position: "relative",
              zIndex: 510,
            }}
          >
            Vinícius Almeida
          </div>

          <div
            className="hidden md:flex items-center gap-9 justify-center text-[13px] font-light"
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
            }}
          >
            <a
              href="#trabalhos"
              style={{ color: "rgba(242,240,236,0.5)", textDecoration: "none" }}
            >
              trabalhos
            </a>
            <a
              href="#sobre"
              style={{ color: "rgba(242,240,236,0.5)", textDecoration: "none" }}
            >
              sobre
            </a>
            <a
              href="#projetos"
              style={{ color: "rgba(242,240,236,0.5)", textDecoration: "none" }}
            >
              projetos
            </a>
            <a
              href="#contato"
              style={{ color: ACCENT, textDecoration: "none" }}
            >
              me contrate
            </a>
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
          <a
            href="#trabalhos"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "rgba(242,240,236,0.8)", textDecoration: "none" }}
          >
            trabalhos
          </a>
          <a
            href="#sobre"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "rgba(242,240,236,0.8)", textDecoration: "none" }}
          >
            sobre
          </a>
          <a
            href="#projetos"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "rgba(242,240,236,0.8)", textDecoration: "none" }}
          >
            projetos
          </a>
          <a
            href="#contato"
            onClick={() => setIsMenuOpen(false)}
            className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: ACCENT, textDecoration: "none" }}
          >
            me contrate
          </a>
        </div>
      </div>
      <div style={{ height: 81 }} />

      {/* HERO */}
      <header
        className="px-6 pb-12 pt-6 md:px-8 md:pb-20 md:pt-5"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          className="mb-12 md:mb-[120px] ml-0 md:-ml-[250px]"
          style={{
            ...revealStyle(revealed, "heroTag"),
            fontFamily: "var(--font-ibm-plex-mono), monospace",
            fontSize: 13,
            fontWeight: 300,
            color: "rgba(242, 240, 236, 0.85)",
            letterSpacing: "0.02em",
          }}
          data-reveal-id="heroTag"
        >
          Desenvolvimento full stack para times que não podem se dar ao luxo de
          produtos quebrados.
        </div>

        <h1
          data-reveal-id="heroHeadline"
          style={{
            ...revealStyle(revealed, "heroHeadline"),
            fontFamily: "var(--font-instrument-serif), serif",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "clamp(38px, 5.4vw, 76px)",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            margin: "0 0 64px",
            maxWidth: 1180,
          }}
        >
          Eu construo sistemas de software que transformam requisitos complexos
          em produtos que realmente funcionam em produção.
        </h1>

        <div
          data-reveal-id="stackLabel"
          style={{
            ...revealStyle(revealed, "stackLabel"),
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 12,
              fontWeight: 300,
              color: "rgba(242,240,236,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            .stack
          </span>
          <span
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }}
          />
        </div>
        <div
          data-reveal-id="stackList"
          style={{
            ...revealStyle(revealed, "stackList"),
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(18px, 1.6vw, 22px)",
            fontWeight: 500,
            color: "rgba(242,240,236,0.55)",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          Back-end. Front-end. Bancos de dados. APIs RESTful. Clean Code. CI/CD.
          Ágil. Integração com IA.
        </div>
      </header>

      {/* PROJECTS — sticky stacked cards */}
      <section
        id="projetos"
        className="px-6 md:px-8"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div
          data-reveal-id="projLabel"
          style={{
            ...revealStyle(revealed, "projLabel"),
            display: "flex",
            alignItems: "center",
            gap: 16,
            maxWidth: 1400,
            margin: "0 auto 8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 12,
              fontWeight: 300,
              color: "rgba(242,240,236,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            .projetos selecionados
          </span>
          <span
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }}
          />
        </div>

        <div
          style={{ maxWidth: 1400, margin: "0 auto", paddingBottom: "10vh" }}
        >
          {PROJECTS.map((proj, i) => {
            const wrapperStyle: CSSProperties = {
              position: "sticky",
              top: `calc(10vh + ${i * 45}px)`,
              zIndex: 10 + i,
              paddingTop: "28px",
              paddingBottom: "28px",
            };

            const cardReveal = revealStyle(revealed, proj.id, 40);

            return (
              <div
                key={proj.id}
                data-project-track={proj.id}
                style={wrapperStyle}
              >
                <div
                  data-reveal-id={proj.id}
                  className="p-6 md:px-11 md:pt-10 md:pb-0"
                  style={{
                    ...cardReveal,
                    width: "100%",
                    background: proj.bg,
                    color: proj.fg,
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    minHeight: "84vh",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow:
                      "0 -20px 40px rgba(0,0,0,0.3), 0 40px 90px rgba(0,0,0,0.55)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      fontFamily: "var(--font-ibm-plex-mono), monospace",
                      fontSize: 14,
                      fontWeight: 300,
                      paddingBottom: 18,
                      borderBottom: "1px solid currentColor",
                      opacity: 0.9,
                    }}
                  >
                    <span>{proj.year}</span>
                    <span>{proj.category}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginTop: 28,
                      gap: 24,
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-instrument-serif), serif",
                        fontWeight: 400,
                        fontSize: "clamp(38px, 6vw, 88px)",
                        lineHeight: 1,
                        margin: 0,
                      }}
                    >
                      {proj.name}
                    </h2>
                    <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          border: "1px solid currentColor",
                          color: "inherit",
                          textDecoration: "none",
                          fontFamily: "var(--font-ibm-plex-mono), monospace",
                          fontSize: 13,
                          padding: "12px 20px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        código ↗
                      </a>
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            border: "1px solid currentColor",
                            color: "inherit",
                            textDecoration: "none",
                            fontFamily: "var(--font-ibm-plex-mono), monospace",
                            fontSize: 13,
                            padding: "12px 20px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          ver live →
                        </a>
                      )}
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: 17,
                      lineHeight: 1.6,
                      maxWidth: 640,
                      margin: "28px 0 20px",
                      opacity: 0.92,
                    }}
                  >
                    {proj.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginBottom: 28,
                    }}
                  >
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono), monospace",
                          fontSize: 12,
                          border: "1px solid currentColor",
                          opacity: 0.75,
                          padding: "6px 12px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minHeight: 220,
                      backgroundImage:
                        "repeating-linear-gradient(135deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 14px)",
                      opacity: 0.14,
                      borderTop: "1px solid currentColor",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono), monospace",
                      fontSize: 11,
                      opacity: 0.55,
                      padding: "10px 0 20px",
                    }}
                  >
                    {"// captura de tela: "}
                    {proj.shotLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="sobre"
        className="px-6 py-20 md:px-8 md:pt-[140px] md:pb-[100px]"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-[80px] items-start">
          <div>
            <div
              data-reveal-id="aboutLabel"
              style={{
                ...revealStyle(revealed, "aboutLabel"),
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 44,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  fontSize: 12,
                  fontWeight: 300,
                  color: "rgba(242,240,236,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                .sobre
              </span>
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
            </div>

            <p
              data-reveal-id="aboutBio"
              style={{
                ...revealStyle(revealed, "aboutBio"),
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: "clamp(19px, 1.8vw, 24px)",
                lineHeight: 1.6,
                color: "#F2F0EC",
                margin: "0 0 40px",
              }}
            >
              Desenvolvedor Full Stack com experiência prática em ambientes
              reais de desenvolvimento de software, atuando tanto no back-end
              quanto no front-end. Minha trajetória é marcada por evolução
              constante, aprendizado contínuo e participação ativa em projetos
              com impacto direto em usuários e clientes.
            </p>

            <blockquote
              data-reveal-id="philosophy"
              style={{
                ...revealStyle(revealed, "philosophy"),
                fontFamily: "var(--font-instrument-serif), serif",
                fontStyle: "italic",
                fontSize: "clamp(24px, 2.6vw, 34px)",
                lineHeight: 1.35,
                color: ACCENT,
                margin: "0 0 40px",
                paddingLeft: 24,
                borderLeft: `2px solid ${ACCENT}`,
              }}
            >
              &ldquo;Valorizo o desenvolvimento contínuo e a construção de
              soluções com impacto real.&rdquo;
            </blockquote>

            <p
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: 16,
                lineHeight: 1.7,
                color: "rgba(242,240,236,0.6)",
                maxWidth: 560,
              }}
            >
              Meu perfil combina base técnica sólida, experiência prática em
              produção e maturidade profissional para atuar em ambientes
              desafiadores — da análise de requisitos até a implementação e
              manutenção.
            </p>
          </div>

          <div
            data-photo-track="1"
            style={{
              opacity: photoProgress,
              transform: `translateY(${-(1 - photoProgress) * 70}px) scale(${0.88 + photoProgress * 0.12})`,
              clipPath: `inset(${(1 - photoProgress) * 8}% ${(1 - photoProgress) * 8}% ${(1 - photoProgress) * 8}% ${(1 - photoProgress) * 8}%)`,
              willChange: "transform, opacity, clip-path",
              width: "100%",
              aspectRatio: "4 / 5",
              position: "relative",
            }}
          >
            <Image
              src="/myPicture.webp"
              alt="Foto de Vinícius Almeida"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* EXPERIENCE / JOBS */}
      <section
        id="trabalhos"
        className="px-6 pb-20 md:px-8 md:pb-[140px]"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          data-reveal-id="jobsLabel"
          style={{
            ...revealStyle(revealed, "jobsLabel"),
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 44,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 12,
              fontWeight: 300,
              color: "rgba(242,240,236,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            .trajetória
          </span>
          <span
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }}
          />
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          {JOBS.map((job) => {
            const isHovered = hoveredJob === job.id;
            const isAnimating = animatingJob === job.id;
            const animName = isAnimating
              ? animPhase === "in"
                ? "jobImgSlideIn"
                : "jobImgSlideOut"
              : "none";
            return (
              <div
                key={job.id}
                data-reveal-id={job.id}
                className="flex items-center justify-between gap-4 md:gap-6 py-6 md:py-9 border-b border-white/15 cursor-pointer relative"
                style={{
                  ...revealStyle(revealed, job.id, 24),
                }}
              >
                <div
                  onMouseEnter={() => handleJobEnter(job.id)}
                  onMouseLeave={() => handleJobLeave(job.id)}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono), monospace",
                      fontSize: 12,
                      color: "rgba(242,240,236,0.4)",
                      marginBottom: 10,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {job.period} — {job.location}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(22px, 3vw, 34px)",
                      margin: "0 0 6px",
                      color: isHovered ? "#FFFFFF" : "rgba(242,240,236,0.5)",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {job.role}
                  </h3>
                  <div
                    style={{
                      fontFamily: "var(--font-instrument-serif), serif",
                      fontSize: 30,
                      color: ACCENT,
                      marginBottom: 10,
                    }}
                  >
                    {job.company}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "rgba(242,240,236,0.6)",
                      margin: 0,
                      maxWidth: 640,
                    }}
                  >
                    {job.desc}
                  </p>

                  {isAnimating && (
                    <div
                      onAnimationEnd={() => handleJobImageAnimEnd(job.id)}
                      className="hidden md:block"
                      style={{
                        position: "absolute",
                        left: "85%",
                        top: "50%",
                        width: 220,
                        height: 140,
                        animation: `${animName} 0.45s cubic-bezier(.16,.8,.24,1) forwards`,
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      <Image
                        src={job.photo}
                        alt={`Projeto na ${job.company}`}
                        fill
                        sizes="220px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontSize: 30,
                    lineHeight: 1,
                    color: isHovered ? "#FFFFFF" : "rgba(242,240,236,0.4)",
                    transition: "color 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  {isHovered ? "→" : "↗"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section
        id="contato"
        className="px-6 py-20 md:px-8 md:pt-[140px] md:pb-[90px]"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          data-reveal-id="contactLabel"
          style={{
            ...revealStyle(revealed, "contactLabel"),
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 44,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 12,
              fontWeight: 300,
              color: "rgba(242,240,236,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            .contato
          </span>
          <span
            style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }}
          />
        </div>
        <h2
          data-reveal-id="contactHeadline"
          style={{
            ...revealStyle(revealed, "contactHeadline"),
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(28px, 3.6vw, 52px)",
            lineHeight: 1.28,
            color: "#FFFFFF",
            margin: "0 0 56px",
            maxWidth: 1250,
          }}
        >
          Desenvolvimento back-end e front-end. APIs RESTful e integrações.
          Arquitetura limpa e manutenção de sistemas. Suporte a produtos em
          produção.
        </h2>
        <a
          href="mailto:contato@viniciusalmeida.dev"
          style={{
            display: "inline-block",
            border: "1px solid rgba(255,255,255,0.3)",
            color: ACCENT,
            textDecoration: "none",
            fontFamily: "var(--font-ibm-plex-mono), monospace",
            fontSize: 14,
            padding: "18px 40px",
          }}
        >
          me contrate ↗
        </a>
      </section>

      {/* FOOTER */}
      <footer
        data-reveal-id="footer"
        className="flex flex-col sm:flex-row justify-between items-center px-6 py-8 md:px-8 md:py-8 gap-5 border-t border-white/15"
        style={{
          ...revealStyle(revealed, "footer"),
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
          <a
            href="#trabalhos"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            trabalhos
          </a>
          <a href="#sobre" style={{ color: "inherit", textDecoration: "none" }}>
            sobre
          </a>
          <a
            href="#projetos"
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
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
            linkedin
          </a>
        </div>
      </footer>
    </div>
  );
}
