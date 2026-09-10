import React from "react";
import Link from "next/link";

export default function AboutPage() {
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
        <div style={{ marginBottom: 60 }}>
          <h1
            style={{
              fontFamily: "var(--font-instrument-serif), serif",
              fontSize: "clamp(48px, 8vw, 120px)",
              lineHeight: 1,
              fontWeight: 400,
              margin: 0,
            }}
          >
            Sobre Mim
          </h1>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 14,
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            .desenvolvedor full stack
          </div>
        </div>

        <section style={{ marginBottom: 80, maxWidth: 800 }}>
          <p
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: 22,
              lineHeight: 1.6,
              opacity: 0.9,
              marginBottom: 24,
            }}
          >
            Desenvolvedor Full Stack com experiência em ambientes reais de
            produção, no back-end e no front-end. Minha trajetória passou por um
            sistema geoespacial para a Polícia Militar da Paraíba, uma
            plataforma de gestão de estágios entre instituições de ensino e
            saúde, um CRM corporativo com chatbot e IA, e projetos freelance
            conduzidos sozinho.
          </p>
          <p
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: 22,
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            O fio condutor não é uma stack específica, é a capacidade de entrar
            em código que não escrevi, entender rápido como funciona e evoluir
            sistemas legados, projetos herdados no meio do caminho e ferramentas
            novas. JavaScript, TypeScript e PHP são o foco principal; Python e
            Django, a stack secundária.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/15 pt-16">
          {/* Formação Acadêmica */}
          <section>
            <div
              style={{
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 12,
                opacity: 0.5,
                marginBottom: 32,
              }}
            >
              .formação acadêmica
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontSize: 32,
                  fontWeight: 400,
                  marginBottom: 8,
                }}
              >
                Análise e Desenvolvimento de Sistemas
              </h3>
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  fontSize: 14,
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                UNIPÊ (Centro Universitário de João Pessoa) | Fevereiro 2024 –
                Dezembro 2025
              </div>
              <p
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: 16,
                  lineHeight: 1.6,
                  opacity: 0.8,
                }}
              >
                Tecnólogo em Análise e Desenvolvimento de Sistemas. Alguns
                projetos acadêmicos chegaram a clientes reais, como o sistema
                geoespacial avaliado pela PM-PB.
              </p>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif), serif",
                  fontSize: 32,
                  fontWeight: 400,
                  marginBottom: 8,
                }}
              >
                Mentoria Full-stack
              </h3>
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  fontSize: 14,
                  opacity: 0.7,
                  marginBottom: 12,
                }}
              >
                Mentoria particular | Desde Novembro 2024
              </div>
              <p
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: 16,
                  lineHeight: 1.6,
                  opacity: 0.8,
                }}
              >
                Mentoria criada por um professor da faculdade, que considerava o
                conteúdo do curso superficial. Cobre padrões de projeto,
                arquitetura de software, system design, Redis, RabbitMQ, filas,
                escolas arquiteturais e soft skills técnicas.
              </p>
            </div>
          </section>

          {/* Habilidades Comportamentais & Idiomas */}
          <section>
            <div
              style={{
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: 12,
                opacity: 0.5,
                marginBottom: 32,
              }}
            >
              .soft skills & idiomas
            </div>

            <div style={{ marginBottom: 48 }}>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <li style={{ fontSize: 16, opacity: 0.8, lineHeight: 1.6 }}>
                  <strong style={{ color: "white" }}>Comunicação:</strong> Clara
                  e objetiva, tanto com equipes técnicas quanto com clientes.
                </li>
                <li style={{ fontSize: 16, opacity: 0.8, lineHeight: 1.6 }}>
                  <strong style={{ color: "white" }}>Liderança Técnica:</strong>{" "}
                  Adquirida na prática durante a atuação como squad leader.
                </li>
                <li style={{ fontSize: 16, opacity: 0.8, lineHeight: 1.6 }}>
                  <strong style={{ color: "white" }}>
                    Resolução de Problemas:
                  </strong>{" "}
                  Senso analítico forte, principalmente no troubleshooting de
                  bugs e entendimento de sistemas complexos.
                </li>
                <li style={{ fontSize: 16, opacity: 0.8, lineHeight: 1.6 }}>
                  <strong style={{ color: "white" }}>
                    Trabalho em Equipe:
                  </strong>{" "}
                  Forte espírito colaborativo em ambientes ágeis e remotos.
                </li>
                <li style={{ fontSize: 16, opacity: 0.8, lineHeight: 1.6 }}>
                  <strong style={{ color: "white" }}>Proatividade:</strong>{" "}
                  Busca constante por antecipar problemas, propor soluções e
                  adotar novas tecnologias.
                </li>
              </ul>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-ibm-plex-mono), monospace",
                  fontSize: 12,
                  opacity: 0.5,
                  marginBottom: 20,
                }}
              >
                .idiomas
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <li style={{ fontSize: 16, opacity: 0.8 }}>
                  <strong style={{ color: "white" }}>Português:</strong> Nativo
                </li>
                <li style={{ fontSize: 16, opacity: 0.8 }}>
                  <strong style={{ color: "white" }}>Inglês:</strong>{" "}
                  Intermediário (Leitura técnica avançada e comunicação em
                  evolução)
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
