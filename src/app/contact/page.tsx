"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const FONT_SANS = "var(--font-space-grotesk), sans-serif";
const FONT_SERIF = "var(--font-instrument-serif), serif";
const FONT_MONO = "var(--font-ibm-plex-mono), monospace";

const GithubIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const socialLinks = [
  {
    name: "GitHub",
    username: "@Vinicius083",
    url: "https://github.com/Vinicius083",
    Icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    username: "@viniciusalmeida",
    url: "https://linkedin.com/in/",
    Icon: LinkedinIcon,
  },
  {
    name: "WhatsApp",
    username: "+55 (83) 99627-4938",
    url: "https://wa.me/5583996274938",
    Icon: WhatsAppIcon,
  },
  {
    name: "Email",
    username: "jvinicius7337@gmail.com",
    url: "mailto:jvinicius7337@gmail.com",
    Icon: MailIcon,
  },
];

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  background: "#0e0e0e",
  border: "1px solid #222",
  padding: "22px 20px",
  color: "#F2F0EC",
  outline: "none",
  fontFamily: FONT_SANS,
  fontSize: 15,
};

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setIsSending(true);
    setFeedback(null);
    emailjs
      .sendForm(
        "service_8pric3c",
        "template_ysg00dj",
        formRef.current,
        "Y0_YhIcOJxz9-OOwO",
      )
      .then(
        () => {
          setFeedback("Mensagem enviada com sucesso!");
          setIsSending(false);
          formRef.current?.reset();
        },
        (err) => {
          console.error(err);
          setFeedback("Erro ao enviar. Tente novamente.");
          setIsSending(false);
        },
      );
  };

  return (
    <div
      style={{
        background: "#000",
        color: "#F2F0EC",
        minHeight: "100vh",
        paddingBottom: "12vh",
        fontFamily: FONT_SANS,
      }}
    >
      <div style={{ height: 100 }} />

      <main style={{ maxWidth: 1600, margin: "0 auto", padding: "0 40px" }}>
        {/* ── Título ── */}
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(56px, 10vw, 140px)",
            lineHeight: 1,
            fontWeight: 400,
            margin: "0 0 32px",
            letterSpacing: "-0.02em",
          }}
        >
          Vamos conversar
        </h1>

        {/* ── Subtítulo ── */}
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "clamp(20px, 2.8vw, 38px)",
            lineHeight: 1.35,
            fontWeight: 400,
            opacity: 0.85,
            maxWidth: 820,
            margin: "0 0 72px",
          }}
        >
          Se o trabalho importa, a conversa começa aqui. Entre em contato para
          discutir um projeto, uma oportunidade ou só trocar uma ideia.
        </p>

        {/* ── Linha separadora ── */}
        <div style={{ borderTop: "1px solid #1c1c1c", marginBottom: 48 }} />

        {/* ── Layout: Form + Social ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[48px] items-start">
          {/* Form — ocupa o espaço disponível */}
          <div className="w-full lg:flex-1 lg:min-w-0">
            <form ref={formRef} onSubmit={sendEmail}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <input
                  type="text"
                  name="user_name"
                  placeholder="Nome"
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Seu email"
                  required
                  style={inputStyle}
                />
                <textarea
                  name="message"
                  placeholder="Mensagem"
                  required
                  rows={8}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                style={{
                  display: "block",
                  width: "100%",
                  background: "#fff",
                  color: "#000",
                  padding: "20px 24px",
                  marginTop: 2,
                  fontFamily: FONT_SANS,
                  fontSize: 15,
                  fontWeight: 500,
                  border: "none",
                  letterSpacing: "0.04em",
                  opacity: isSending ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {isSending ? "Enviando..." : "Submit"}
              </button>

              {feedback && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "12px 16px",
                    fontFamily: FONT_MONO,
                    fontSize: 13,
                    color: feedback.includes("sucesso") ? "#4ade80" : "#ef4444",
                    border: `1px solid ${feedback.includes("sucesso") ? "#4ade80" : "#ef4444"}`,
                  }}
                >
                  {feedback}
                </div>
              )}
            </form>
          </div>

          {/* Social links — coluna estreita à direita */}
          <div className="w-full lg:w-[300px] shrink-0">
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {socialLinks.map(({ name, username, url, Icon }, idx) => (
                <li key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "20px 16px",
                      border: "1px solid #1e1e1e",
                      textDecoration: "none",
                      color: "#F2F0EC",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "rgba(255,255,255,0.2)";
                      el.style.background = "rgba(255,255,255,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "#1e1e1e";
                      el.style.background = "transparent";
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        border: "1px solid #2a2a2a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {name}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT_MONO,
                          fontSize: 12,
                          opacity: 0.4,
                          marginTop: 3,
                        }}
                      >
                        {username}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
