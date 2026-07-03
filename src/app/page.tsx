"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "./dark-space.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import emailjs from "@emailjs/browser";
import BorderGlow from "../components/BorderGlow";
import Galaxy from "../components/Galaxy";
import Lanyard from "../components/Lanyard";
import MagicBento from '../components/MagicBento';

const SpaceGame = dynamic(() => import("./components/SpaceGame"), {
  ssr: false,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [typedText, setTypedText] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useGSAP(
    () => {
      // Scroll animations for sections
      const sections = gsap.utils.toArray(".animate-section");
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none", // Play once
            },
          },
        );
      });
    },
    { scope: mainRef },
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      await emailjs.send(
        "service_8pric3c",
        "template_ysg00dj",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        "Y0_YhIcOJxz9-OOwO",
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        if (currentScrollY < 50) {
          setShowNav(true);
        } else if (currentScrollY > lastScrollY) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;
    let isDeleting = false;
    let textIdx = 0;

    const texts = ["Desenvolvedor Full Stack", "Full Stack Developer"];

    const type = () => {
      const currentText = texts[textIdx];

      if (isDeleting) {
        setTypedText(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % texts.length;
        speed = 500;
      }

      timeout = setTimeout(type, speed);
    };

    timeout = setTimeout(type, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={mainRef}
      className="dark-space-wrapper selection:bg-primary selection:text-background-dark"
    >
      <nav
        className={`fixed w-[95%] left-1/2 -translate-x-1/2 rounded-2xl z-50 glass-panel py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${showNav ? "top-4 opacity-100" : "-top-24 opacity-0"}`}
      >
        <a
          className="font-display text-xl font-bold tracking-wider text-white neon-text"
          href="#"
        >
          <span>
            <img src="/logo.svg" alt="" height={40} width={40} />
          </span>
        </a>
        <div className="hidden md:flex space-x-8">
          <a
            className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
            href="#sobre"
          >
            SOBRE
          </a>
          <a
            className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
            href="#arsenal"
          >
            ARSENAL
          </a>
          <a
            className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
            href="#missoes"
          >
            MISSÕES
          </a>
          <a
            className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
            href="#contato"
          >
            CONTATO
          </a>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full glass-panel border-b border-primary/20 flex flex-col p-6 space-y-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <a
              className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
              href="#sobre"
              onClick={() => setIsMenuOpen(false)}
            >
              SOBRE
            </a>
            <a
              className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
              href="#arsenal"
              onClick={() => setIsMenuOpen(false)}
            >
              ARSENAL
            </a>
            <a
              className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
              href="#missoes"
              onClick={() => setIsMenuOpen(false)}
            >
              MISSÕES
            </a>
            <a
              className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
              href="#contato"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTATO
            </a>
          </div>
        )}
      </nav>
      <section
        className={`min-h-screen relative flex flex-col md:flex-row items-center justify-center px-6 md:px-12 pb-12 md:pb-20 overflow-hidden animate-section transition-all duration-700 ease-in-out ${isGameActive ? "pt-28 md:pt-36" : "pt-20"}`}
      >
        <div className="absolute inset-0 z-0">
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>
        <div
          className={`z-10 flex flex-col space-y-6 transition-all duration-700 ease-in-out w-full ${isGameActive ? "md:w-1/2 items-start text-left md:pr-8" : "md:w-full items-center text-center max-w-4xl"}`}
        >
          <div className="inline-block px-3 py-1 rounded-full glass-panel border border-primary/30 text-primary text-xs font-bold tracking-widest mb-4">
            DISPONIVEL PARA PROJETOS
          </div>
          <h1
            className={`font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight ${!isGameActive ? "md:whitespace-nowrap" : ""}`}
          >
            VINÍCIUS{isGameActive ? <br /> : " "}ALMEIDA
          </h1>
          <h2
            className={`text-xl md:text-3xl text-primary font-bold tracking-wide h-10 flex items-center ${isGameActive ? "justify-start" : "justify-center"}`}
          >
            {typedText}
            <span className="w-[2px] h-6 md:h-8 bg-primary ml-1 animate-pulse"></span>
          </h2>
          <p
            className={`text-gray-400 max-w-md mt-4 ${isGameActive ? "" : "mx-auto"}`}
          >
            Transformando café e ideias complexas em soluções digitais robustas
            através da galáxia do código.
          </p>
          <div
            className={`mt-8 flex flex-wrap gap-4 ${isGameActive ? "" : "justify-center"}`}
          >
            <a
              className="px-8 py-4 bg-transparent border-2 border-primary text-primary font-bold tracking-wider uppercase rounded hover:bg-primary hover:text-background-dark transition-all duration-300 neon-border group flex items-center gap-2"
              href="#missoes"
            >
              Ver Projetos
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                code
              </span>
            </a>
            <a
              className="px-8 py-4 bg-primary/10 border-2 border-secondary text-secondary font-bold tracking-wider uppercase rounded hover:bg-secondary hover:text-white transition-all duration-300 neon-border-secondary group flex items-center gap-2"
              href="#contato"
            >
              Entrar em Contato
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                mail
              </span>
            </a>
            <button
              onClick={() => setIsGameActive(!isGameActive)}
              className={`hidden md:flex px-8 py-4 bg-transparent border-2 text-white font-bold tracking-wider uppercase rounded transition-all duration-300 group items-center gap-2 ${isGameActive ? "border-red-500 hover:bg-red-500" : "border-gray-500 hover:bg-gray-500"}`}
            >
              {isGameActive ? "Ocultar Simulador" : "Ativar Simulador"}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                sports_esports
              </span>
            </button>
          </div>
        </div>

        <div
          className={`relative z-10 transition-all duration-700 ease-in-out overflow-hidden flex-shrink-0 ${isGameActive ? "w-full md:w-1/2 opacity-100 max-w-2xl mt-10 md:mt-0" : "w-0 opacity-0 h-0 md:h-auto"}`}
        >
          <div className="w-full h-[512px] md:h-[819px] relative glass-panel rounded-xl flex flex-col min-w-[320px]">
            <div className="bg-black/50 p-2 border-b border-primary/20 flex justify-between items-center rounded-t-xl">
              <span className="text-xs text-primary font-display tracking-widest">
                SIMULADOR_DEFESA_V1.0
              </span>
              <div className="flex gap-2">
                <div
                  onClick={() => setIsGameActive(false)}
                  className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 cursor-pointer transition-colors"
                  title="Fechar"
                ></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
            </div>
            <div
              className="flex-1 relative overflow-hidden"
              id="game-container"
            >
              <SpaceGame />
            </div>
          </div>
        </div>
      </section>

      <section
        // AQUI: 'py-32' controla o espaçamento vertical entre o hero e esta seção.
        // Se quiser menor, use 'py-20'. Se quiser maior, use 'py-40' ou volte para 'py-80'.
        className="py-32 relative px-6 md:px-12 animate-section overflow-hidden"
        id="sobre"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative min-h-[400px] flex items-center justify-center">
            {/* Este wrapper faz com que no mobile o canvas ocupe apenas a altura do bloco (400px)
                para não bloquear a rolagem do usuário, mas no desktop ganhe tela cheia (100vw/100vh). */}
            <div className="relative w-full h-[400px] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[100vw] md:h-[100vh] z-0">
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                transparent={true}
                frontImage="/myPicture.webp"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 relative z-10 pointer-events-none">
            {/* O wrapper de texto tem z-10 (fica na frente) e os elementos filhos voltam a ter interatividade */}
            <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-6 flex items-center gap-3 pointer-events-auto">
              <span className="material-symbols-outlined text-primary">
                person_outline
              </span>
              Sobre Mim
            </h2>
            <div className="pointer-events-auto">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="183 100 50"
                backgroundColor="#120F17"
                borderRadius={12}
                glowRadius={40}
                glowIntensity={1.0}
                coneSpread={25}
                animated={true}
                colors={["#00f3ff", "#ff00ff", "#c299ff"]}
                className="w-full"
              >
                <div className="p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                  <p className="text-gray-300 leading-relaxed mb-4 relative z-10 text-lg">
                    Desenvolvedor Full Stack com experiência prática em
                    ambientes reais de produção, atuando em back-end e
                    front-end. Residindo em João Pessoa, PB.
                  </p>
                  <p className="text-gray-400 leading-relaxed relative z-10">
                    Meu perfil combina base técnica sólida, maturidade
                    profissional e evolução constante — da análise de requisitos
                    à implementação e manutenção, sempre buscando impacto real
                    nas soluções que construo.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <div className="bg-black/40 p-4 rounded-lg border border-white/5 flex-1 text-center">
                      <span className="block text-primary font-display text-2xl font-bold">
                        2+
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        Anos de Experiência
                      </span>
                    </div>
                    <div className="bg-black/40 p-4 rounded-lg border border-white/5 flex-1 text-center">
                      <span className="block text-secondary font-display text-2xl font-bold">
                        ADS
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        UNIPÊ – 2025
                      </span>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-32 relative px-6 md:px-12 bg-black/40 border-y border-white/5 animate-section"
        id="arsenal"
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold inline-flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary">
              memory
            </span>
            Stacks - Tecnologias
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Tecnologias dominadas para a construção de sistemas.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] aspect-square flex items-center justify-center">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-background-dark border-2 border-primary shadow-[0_0_30px_rgba(0,243,255,0.4)] z-10 flex items-center justify-center relative">
              <span className="text-white font-display font-bold text-xs md:text-base">
                CORE
              </span>
              <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
            </div>
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-700 animate-[spin_30s_linear_infinite]">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass-panel rounded-full flex items-center justify-center text-primary border-primary/50"
                style={{ animation: "spin 30s linear infinite reverse" }}
              >
                <span className="font-bold text-[10px] md:text-xs">Re</span>
              </div>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass-panel rounded-full flex items-center justify-center text-green-400 border-green-400/50"
                style={{ animation: "spin 30s linear infinite reverse" }}
              >
                <span className="font-bold text-[10px] md:text-xs">No</span>
              </div>
              <div
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass-panel rounded-full flex items-center justify-center text-yellow-400 border-yellow-400/50"
                style={{ animation: "spin 30s linear infinite reverse" }}
              >
                <span className="font-bold text-[10px] md:text-xs">Py</span>
              </div>
              <div
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass-panel rounded-full flex items-center justify-center text-blue-400 border-blue-400/50"
                style={{ animation: "spin 30s linear infinite reverse" }}
              >
                <span className="font-bold text-[10px] md:text-xs">Dk</span>
              </div>
            </div>
            <div className="absolute inset-10 md:inset-12 rounded-full border border-dashed border-gray-700 animate-[spin_20s_linear_infinite_reverse]">
              <div
                className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 glass-panel rounded-full flex items-center justify-center text-red-500 border-red-500/50"
                style={{ animation: "spin 20s linear infinite" }}
              >
                <span className="font-bold text-[8px] md:text-[10px]">Ne</span>
              </div>
              <div
                className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-8 h-8 md:w-10 md:h-10 glass-panel rounded-full flex items-center justify-center text-purple-400 border-purple-400/50"
                style={{ animation: "spin 20s linear infinite" }}
              >
                <span className="font-bold text-[8px] md:text-[10px]">Ph</span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md glass-panel p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
              <span className="text-xs text-gray-500 font-display tracking-widest">
                NÍVEIS DE CONHECIMENTO
              </span>
              <span className="material-symbols-outlined text-primary text-sm">
                bar_chart
              </span>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">
                    Front-end (React, Next.js, TS, Tailwind)
                  </span>
                  <span className="text-primary font-mono">90%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary shadow-[0_0_10px_#00f3ff]"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">
                    Back-end (Node, NestJS, PHP/Zend)
                  </span>
                  <span className="text-secondary font-mono">85%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary shadow-[0_0_10px_#ff00ff]"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">
                    Database (PostgreSQL, MySQL, MongoDB)
                  </span>
                  <span className="text-primary font-mono">80%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary opacity-80"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">
                    DevOps (Docker, Git Flow, Vercel)
                  </span>
                  <span className="text-secondary font-mono">75%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary opacity-80"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Python (Django, DRF)</span>
                  <span className="text-primary font-mono">70%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary opacity-60"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-32 relative px-6 md:px-12 animate-section"
        id="missoes"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-16 text-center flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-primary">
              explore
            </span>
            Log de Missões
          </h2>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/3 relative pl-8">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-gray-800"></div>
              <div className="space-y-12">
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-background-dark border-2 border-primary z-10 shadow-[0_0_10px_#00f3ff]"></div>
                  <h3 className="text-lg text-white font-display font-bold">
                    Meets Tecnologia
                  </h3>
                  <p className="text-sm text-primary mb-2">
                    Dev Full Stack Júnior • Atual
                  </p>
                  <p className="text-xs text-gray-400">
                    CRM e centrais de atendimento com chatbot e IA. PHP/Zend,
                    React, NestJS. Destaque: módulo &quot;Coexistência
                    WhatsApp&quot; com Meta Graph API.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-background-dark border-2 border-secondary z-10 shadow-[0_0_10px_#ff00ff]"></div>
                  <h3 className="text-lg text-white font-display font-bold">
                    B-Pet
                  </h3>
                  <p className="text-sm text-secondary mb-2">
                    Freelancer Full Stack • Nov 2025 – Atual
                  </p>
                  <p className="text-xs text-gray-400">
                    Gestão para petshops. Back-end com NestJS, front-end com
                    Next.js. APIs e regras de negócio do zero.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-background-dark border-2 border-gray-500 z-10"></div>
                  <h3 className="text-lg text-white font-display font-bold">
                    Fábrica UBTech Office
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    Estagiário &amp; Squad Leader Back-end
                  </p>
                  <p className="text-xs text-gray-500">
                    Projetos públicos: ESP-PB (Django, React, Docker) e PM-PB
                    (geoprocessamento). Liderança técnica do time de back.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <MagicBento />
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-32 relative px-6 md:px-12 bg-black/60 animate-section"
        id="contato"
      >
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel rounded-2xl border border-gray-700 p-1 overflow-hidden relative">
            <div className="bg-gray-900/80 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-xs font-mono text-gray-500">
                TERMINAL_COMUNICACAO.exe
              </span>
            </div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2">
                <h2 className="font-display text-2xl text-white font-bold mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary animate-pulse">
                    radar
                  </span>
                  Estabelecer Contato
                </h2>
                <p className="text-sm text-gray-400 mb-8">
                  Sinais de fumaça digitais aceitos. Preencha o formulário ou
                  use os canais diretos abaixo.
                </p>
                <div className="space-y-4">
                  <a
                    className="flex items-center gap-4 text-gray-300 hover:text-primary transition-colors group p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                    href="https://github.com/Vinicius083"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:shadow-[0_0_10px_#00f3ff] transition-shadow">
                      <span className="material-symbols-outlined">code</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold">GitHub</span>
                      <span className="text-xs text-gray-500">
                        /Vinicius083
                      </span>
                    </div>
                  </a>
                  <a
                    className="flex items-center gap-4 text-gray-300 hover:text-secondary transition-colors group p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                    href="https://www.linkedin.com/in/viniciusalmeidabe/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:shadow-[0_0_10px_#ff00ff] transition-shadow">
                      <span className="material-symbols-outlined">work</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold">LinkedIn</span>
                      <span className="text-xs text-gray-500">
                        /in/viniciusalmeidabe
                      </span>
                    </div>
                  </a>
                  <a
                    className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                    href="mailto:contato@exemplo.com"
                  >
                    <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:shadow-[0_0_10px_#ffffff] transition-shadow">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <span className="block text-sm font-bold">Email</span>
                      <span className="text-xs text-gray-500">
                        Enviar transmissão
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <form className="space-y-4" onSubmit={sendEmail}>
                  <div>
                    <label className="block text-xs text-gray-500 font-mono mb-1">
                      IDENTIFICAÇÃO
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                      placeholder="Seu nome"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-mono mb-1">
                      FREQUÊNCIA (EMAIL)
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm"
                      placeholder="seu@email.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 font-mono mb-1">
                      MENSAGEM_CRIPTOGRAFADA
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-mono text-sm resize-none"
                      placeholder="Digite sua mensagem..."
                      rows={4}
                    ></textarea>
                  </div>
                  <button
                    disabled={status === "loading"}
                    className={`w-full py-3 border font-display font-bold tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      status === "success"
                        ? "bg-green-500/10 border-green-500 text-green-500"
                        : status === "error"
                          ? "bg-red-500/10 border-red-500 text-red-500"
                          : "bg-primary/10 border-primary text-primary hover:bg-primary hover:text-black"
                    }`}
                    type="submit"
                  >
                    {status === "loading"
                      ? "Transmitindo..."
                      : status === "success"
                        ? "Transmissão Concluída!"
                        : status === "error"
                          ? "Erro na Transmissão"
                          : "Transmitir"}
                    <span className="material-symbols-outlined text-sm">
                      {status === "success"
                        ? "check_circle"
                        : status === "error"
                          ? "error"
                          : "send"}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="text-center mt-12 text-gray-600 font-mono text-xs flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-gray-700 text-lg">
              settings_power
            </span>
            &gt; Transmissão encerrada. Aguardando contato. _
          </div>
        </div>
      </section>

      <footer className="py-6 text-center border-t border-white/5 text-gray-600 text-xs font-mono">
        © 2026 Vinícius Almeida. Todos os sistemas operacionais.
      </footer>
    </div>
  );
}
