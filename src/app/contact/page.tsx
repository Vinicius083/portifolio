import React from "react";

export default function ContactPage() {
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
            Contato
          </h1>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 14,
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            .vamos conversar
          </div>
        </div>

        <section className="flex flex-col md:flex-row gap-16 md:gap-32 border-t border-white/15 pt-16">
          <div className="flex-1">
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                fontSize: "clamp(32px, 5vw, 64px)",
                lineHeight: 1.1,
                fontWeight: 400,
                marginBottom: 24,
              }}
            >
              Pronto para construir sistemas que funcionam em produção?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-space-grotesk), sans-serif",
                fontSize: 20,
                lineHeight: 1.6,
                opacity: 0.8,
                maxWidth: 600,
              }}
            >
              Estou sempre aberto a discutir novos projetos, oportunidades de equipe ou simplesmente trocar ideias sobre arquitetura de software e tecnologia.
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-12">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  fontSize: 12,
                  opacity: 0.5,
                  marginBottom: 12,
                }}
              >
                .localização
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: 22,
                  opacity: 0.9,
                }}
              >
                João Pessoa, PB, Brasil
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  fontSize: 12,
                  opacity: 0.5,
                  marginBottom: 12,
                }}
              >
                .redes e links
              </div>
              <ul className="flex flex-col gap-6" style={{ padding: 0, margin: 0, listStyle: "none" }}>
                <li>
                  <a
                    href="mailto:contato@exemplo.com"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: 22,
                      color: "rgba(238, 79, 47, 1)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(238, 79, 47, 0.3)",
                      paddingBottom: 4,
                    }}
                    className="hover:border-[rgba(238,79,47,1)] transition-colors"
                  >
                    email me ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Vinicius083"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: 22,
                      color: "#F2F0EC",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(242, 240, 236, 0.3)",
                      paddingBottom: 4,
                    }}
                    className="hover:border-[#F2F0EC] transition-colors"
                  >
                    github ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: 22,
                      color: "#F2F0EC",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(242, 240, 236, 0.3)",
                      paddingBottom: 4,
                    }}
                    className="hover:border-[#F2F0EC] transition-colors"
                  >
                    linkedin ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
