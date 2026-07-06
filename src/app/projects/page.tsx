import React from "react";
import Link from "next/link";
import { PROJECTS as projects } from "@/data/portfolio";

export default function ProjectsPage() {

  return (
    <div
      style={{
        background: "#000000",
        color: "#F2F0EC",
        minHeight: "100vh",
        paddingBottom: "10vh",
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
    >
      <div style={{ height: 120 }} />

      <main className="px-6 md:px-8 max-w-[1600px] mx-auto">
        <div style={{ marginBottom: 80 }}>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: "clamp(48px, 8vw, 120px)",
              lineHeight: 1,
              fontWeight: 400,
              margin: 0,
            }}
          >
            Projetos Pessoais
          </h1>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 14,
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            .projetos
          </div>
        </div>

        <div className="flex flex-col gap-12 border-t border-white/15 pt-8 mb-32">
          {projects.map((proj, i) => (
            <a
              key={i}
              href={proj.live || proj.github || "#"}
              target="_blank"
              rel="noreferrer"
              className="group block border-b border-white/10 pb-8 hover:border-white/40 transition-colors"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-4 mb-4">
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif), serif",
                    fontSize: "clamp(36px, 5vw, 64px)",
                    fontWeight: 400,
                    margin: 0,
                    lineHeight: 1,
                  }}
                  className="group-hover:text-white transition-colors"
                >
                  {proj.name}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono), monospace",
                    fontSize: 24,
                    opacity: 0.5,
                  }}
                  className="group-hover:opacity-100 transition-opacity"
                >
                  ↗
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                <div
                  className="shrink-0"
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono), monospace",
                    fontSize: 16,
                    opacity: 0.5,
                  }}
                >
                  {proj.year}
                </div>
                <div style={{ maxWidth: 700 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: 18,
                      lineHeight: 1.6,
                      opacity: 0.8,
                      margin: 0,
                    }}
                  >
                    {proj.desc}
                  </p>
                  {proj.details && (
                    <p
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        fontSize: 15,
                        lineHeight: 1.6,
                        opacity: 0.6,
                        marginTop: 12,
                        marginBottom: 0,
                      }}
                    >
                      {proj.details}
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>

        <section>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 14,
              opacity: 0.5,
              marginBottom: 40,
            }}
          >
            .stack
          </div>
          <h2
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.2,
              fontWeight: 400,
              maxWidth: 900,
              margin: 0,
            }}
          >
            Back-end. Front-end. Databases. APIs RESTful. Clean Code. CI/CD.
            Agile. AI Integration.
          </h2>
          
          <div style={{ marginTop: 60 }}>
            <Link 
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                border: "1px solid rgba(238, 79, 47, 1)", // ACCENT color
                padding: "16px 28px",
                color: "rgba(238, 79, 47, 1)",
                textDecoration: "none",
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 14,
                transition: "all 0.3s ease"
              }}
              className="hover:bg-[rgba(238,79,47,0.1)]"
            >
              me contrate ↗
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
