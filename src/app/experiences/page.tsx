import React from "react";
import Link from "next/link";

export default function ExperiencesPage() {
  const experiences = [
    {
      role: "Desenvolvedor Full Stack Júnior",
      company: "Meets Tecnologia",
      location: "Remoto",
      period: "Atual",
      desc: "Empresa especializada em soluções de CRM e centrais de atendimento com integração de chatbot e IA.",
      link: "https://meets.com.br/pt-br",
      bullets: [
        "Atuação em um ambiente 100% remoto, colaborando com equipes de desenvolvimento, QA e suporte.",
        "Manutenção de sistemas legados, correção de bugs críticos e evolução de funcionalidades de produção.",
        "Desenvolvimento focado em PHP (Zend Framework) no back e front (CRM), React (JS/TS) no front-end, e NestJS no back-end.",
        "Destaque recente: Desenvolvimento e troubleshooting do módulo de 'Coexistência WhatsApp' para a plataforma CRM, envolvendo roteamento de back-end complexo e tokens da Meta Graph API."
      ]
    },
    {
      role: "Desenvolvedor Full Stack (Freelancer)",
      company: "BPet System",
      location: "Remoto",
      period: "Novembro 2025 – Atual",
      desc: "Plataforma de gestão para petshops (controle de clientes, empresas e fornecedores).",
      link: "https://www.b-pet.app.br",
      bullets: [
        "Desenvolvimento focado no back-end utilizando NestJS, criando APIs, regras de negócio e integrações.",
        "Contribuições no front-end com Next.js, consolidando a atuação Full Stack e lidando com requisitos reais de negócio."
      ]
    },
    {
      role: "Estagiário & Squad Leader (Back-end)",
      company: "Fábrica de Software UBTech Office",
      location: "João Pessoa, PB",
      period: "2024",
      desc: "Atuação em projetos reais voltados ao setor público:",
      bullets: [
        "Escola de Saúde Pública da Paraíba (ESP-PB): Sistema com regras de negócio complexas para gestão de vagas de estágio. Atuação com Django REST Framework, React, Docker e PostgreSQL. Exerci o papel de Squad Leader do time de back-end, orientando colegas, revisando código, conduzindo decisões técnicas e participando de reuniões com clientes.",
        "Polícia Militar da Paraíba (Projeto Sigiloso): Desenvolvimento de funcionalidades de geoprocessamento e visualização de dados espaciais utilizando Django Template, GDAL e Leaflet."
      ]
    }
  ];

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
            Trajetória
          </h1>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 14,
              opacity: 0.5,
              marginTop: 20,
            }}
          >
            .experiência profissional
          </div>
        </div>

        <div className="flex flex-col gap-16">
          {experiences.map((exp, i) => (
            <section
              key={i}
              className="border-t border-white/15 pt-8 flex flex-col md:flex-row gap-8 md:gap-16"
            >
              <div className="md:w-1/3 shrink-0">
                <div
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono), monospace",
                    fontSize: 14,
                    opacity: 0.5,
                    marginBottom: 16,
                  }}
                >
                  {exp.period} | {exp.location}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif), serif",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    marginBottom: 12,
                  }}
                >
                  {exp.company}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono), monospace",
                    fontSize: 14,
                    color: "rgba(238, 79, 47, 0.9)", // ACCENT color for the role
                  }}
                >
                  {exp.role}
                </div>
              </div>

              <div className="md:w-2/3">
                <p
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontSize: 20,
                    lineHeight: 1.6,
                    opacity: 0.9,
                    marginBottom: 24,
                  }}
                >
                  {exp.desc}
                </p>
                <ul
                  className="flex flex-col gap-4"
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    marginBottom: 32,
                  }}
                >
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        fontSize: 16,
                        lineHeight: 1.6,
                        opacity: 0.7,
                        position: "relative",
                        paddingLeft: 24,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 8,
                          width: 6,
                          height: 6,
                          background: "currentColor",
                          borderRadius: "50%",
                        }}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {exp.link ? (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:bg-white/5 hover:border-white/30 transition-all duration-300"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "12px 24px",
                      color: "rgba(255,255,255,0.9)",
                      textDecoration: "none",
                      fontFamily: "var(--font-ibm-plex-mono), monospace",
                      fontSize: 14,
                    }}
                  >
                    ver site ↗
                  </a>
                ) : (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "12px 24px",
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-ibm-plex-mono), monospace",
                      fontSize: 14,
                      cursor: "not-allowed",
                    }}
                  >
                    em progresso
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
