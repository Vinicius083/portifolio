import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { translations, Language } from '@/data/translations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface MobileViewProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function MobileView({ language, setLanguage }: MobileViewProps) {
  const t = translations[language];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('section');
    
    sections.forEach((section: any) => {
      // Entrance animation for windows
      gsap.fromTo(section, 
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.8,
          transformOrigin: 'top center',
          filter: 'brightness(0) invert(1) blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'brightness(1) invert(0) blur(0px)',
          duration: 0.6,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            end: 'bottom 8%',
            toggleActions: 'play reverse play reverse',
          }
        }
      );
    });

    // Background parallax
    gsap.to('.fixed img', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Stagger animation for project cards
    gsap.from('#projects .btn-bevel', {
      opacity: 0,
      y: 40,
      scale: 0.9,
      stagger: 0.15,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 80%',
      }
    });

    // Stagger animation for skill bars
    gsap.from('#skills .border-outline-variant', {
      opacity: 0,
      x: -30,
      stagger: 0.1,
      duration: 0.4,
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 85%',
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-surface-container-lowest text-on-surface min-h-screen overflow-x-hidden pb-taskbar-height snap-grid font-terminal-md text-sm md:text-base relative">
      {/* Global CRT Overlay */}
      <div className="crt-overlay pointer-events-none fixed inset-0 z-[9999]"></div>
      
      {/* Background space image */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-20" src="/background.png" alt="Space" />
      </div>

      {/* Top Navigation (MISSION_CONTROL_v1.0) */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-2 bg-blue-700 font-label-caps tracking-tighter uppercase h-8 border-b-2 border-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_0_0_rgba(0,0,0,1)] text-white">
        <div className="text-sm font-black text-white italic flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" width={24} height={24} />
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex gap-2 items-center mr-2 text-[10px] font-bold bg-black/30 px-2 py-0.5 rounded border border-white/20">
            <button onClick={() => setLanguage('pt')} className={`transition-colors cursor-pointer ${language === 'pt' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}>PT</button>
            <span className="text-white/20">|</span>
            <button onClick={() => setLanguage('en')} className={`transition-colors cursor-pointer ${language === 'en' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}>EN</button>
          </div>
          <button className="w-6 h-6 bg-surface-container btn-bevel flex items-center justify-center hover:bg-surface-bright"><span className="material-symbols-outlined text-[14px]">minimize</span></button>
          <button className="w-6 h-6 bg-surface-container btn-bevel flex items-center justify-center hover:bg-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-12 px-4 pb-20 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Hero Section */}
        <section className="relative mt-4" id="hero">
          <div className="bg-surface-container window-bevel rounded-DEFAULT overflow-hidden shadow-2xl">
            <div className="window-title-bg h-6 flex justify-between items-center px-1 border-b border-black">
              <span className="font-window-title text-window-title text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">C:\SYS\INITIALIZE.BAT</span>
              <div className="flex gap-1">
                <button className="w-4 h-4 bg-surface-container btn-bevel flex items-center justify-center text-black text-[10px] font-bold">_</button>
                <button className="w-4 h-4 bg-surface-container btn-bevel flex items-center justify-center text-black text-[10px] font-bold hover:bg-red-500">X</button>
              </div>
            </div>
            <div className="p-6 bg-black min-h-[300px] flex flex-col justify-center relative overflow-hidden text-center">
              <h1 className="font-display-header text-3xl text-primary mb-4 drop-shadow-[0_0_10px_rgba(180,197,255,0.8)]">VINÍCIUS ALMEIDA</h1>
              <p className="text-secondary mb-6 blinking-cursor text-xs">{t.hero.subtitle}</p>
              <div className="flex flex-col gap-4 mt-4">
                <a href="#projects" className="bg-surface btn-bevel px-4 py-2 text-primary font-label-caps uppercase hover:text-white transition-colors shadow-[0_0_15px_rgba(0,83,225,0.5)] text-center">
                  {t.hero.btnPortfolio}
                </a>
                <a href="#contact" className="bg-surface btn-bevel px-4 py-2 text-secondary font-label-caps uppercase hover:text-white transition-colors text-center">
                  {t.hero.btnContact}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Window */}
        <section id="bio">
          <div className="bg-surface-container window-bevel rounded-DEFAULT overflow-hidden shadow-xl">
            <div className="window-title-bg h-6 flex justify-between items-center px-1 border-b border-black">
              <span className="font-window-title text-window-title text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">BIO_ENCRYPTED.EXE</span>
              <div className="flex gap-1">
                <button className="w-4 h-4 bg-surface-container btn-bevel flex items-center justify-center text-black text-[10px] font-bold hover:bg-red-500">X</button>
              </div>
            </div>
            <div className="p-4 bg-surface-container-lowest flex flex-col gap-6">
              <div className="w-full border-2 border-outline-variant p-2 bg-black">
                <img className="w-full aspect-square object-cover opacity-80 mix-blend-luminosity" src="/myPicture.webp" alt="Profile" />
                <div className="mt-2 text-center text-on-surface-variant text-sm font-label-caps">ID: V.ALMEIDA_77</div>
              </div>
              <div className="text-on-surface space-y-4 text-sm leading-relaxed">
                <p className="text-secondary blinking-cursor">&gt; DECRYPTING DATA STREAM...</p>
                <p>{t.bio.p1}</p>
                <div className="mt-4 p-4 border border-outline-variant bg-surface-dim">
                  <ul className="space-y-2 text-on-surface-variant">
                    <li><span className="text-primary-fixed">{t.bio.spec.toUpperCase()}</span> {t.bio.specValue.toUpperCase()}</li>
                    <li><span className="text-primary-fixed">{t.bio.location.toUpperCase()}</span> {t.bio.locationValue.toUpperCase()}</li>
                    <li><span className="text-primary-fixed">{t.bio.status.toUpperCase()}</span> {t.bio.statusValue.toUpperCase()}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Window */}
        <section id="skills">
          <div className="bg-surface-container window-bevel rounded-DEFAULT overflow-hidden shadow-xl">
            <div className="window-title-bg h-6 flex justify-between items-center px-1 border-b border-black">
              <span className="font-window-title text-window-title text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">CORE_SYSTEM_SPECS.SYS</span>
            </div>
            <div className="p-4 bg-surface-container-lowest grid grid-cols-1 gap-4">
              {[
                { name: 'NEXT.JS / REACT', icon: 'code', val: '95%', ver: 'FRONTEND', color: 'primary-fixed' },
                { name: 'NESTJS', icon: 'dns', val: '85%', ver: 'BACKEND', color: 'primary-fixed' },
                { name: 'PHP / ZEND', icon: 'code', val: '65%', ver: 'BACKEND', color: 'primary-fixed' },
                { name: 'PYTHON / DJANGO', icon: 'code', val: '65%', ver: 'BACKEND', color: 'primary-fixed' },
                { name: 'POSTGRESQL / MYSQL', icon: 'database', val: '80%', ver: 'DATABASE', color: 'secondary-fixed' },
                { name: 'DOCKER / GIT', icon: 'cloud', val: '85%', ver: 'DEVOPS / VCS', color: 'secondary-fixed' },
              ].map(skill => (
                <div key={skill.name} className="border border-outline-variant bg-surface p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 bg-black border border-${skill.color} flex items-center justify-center text-${skill.color}`}>
                      <span className="material-symbols-outlined text-sm">{skill.icon}</span>
                    </div>
                    <div className={`font-label-caps text-${skill.color}`}>{skill.name}</div>
                  </div>
                  <div className="w-full bg-black terminal-input h-2">
                    <div className={`bg-${skill.color} h-full`} style={{ width: skill.val }}></div>
                  </div>
                  <div className="text-right text-xs mt-1 text-on-surface-variant">{skill.ver} [{skill.val}]</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Archive */}
        <section id="projects">
          <div className="bg-surface-container window-bevel rounded-DEFAULT overflow-hidden shadow-xl">
            <div className="window-title-bg h-6 flex justify-between items-center px-1 border-b border-black">
              <span className="font-window-title text-window-title text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">PROJECT_VAULT.DIR</span>
            </div>
            <div className="p-4 bg-surface-container-lowest flex flex-col gap-6">
              {[
                { title: 'Meets Tecnologia', type: 'CRM', color: 'primary', img: '/projetos/meets.png', desc: t.projects.proj1desc, link: 'https://meets.com.br/pt-br' },
                { title: 'BPet System', type: 'SAAS', color: 'secondary', img: '/projetos/bpet.png', desc: t.projects.proj2desc, link: 'https://www.b-pet.app.br' },
                { title: 'ESP-PB', type: 'GOV', color: 'tertiary', img: '/projetos/esppb.png', desc: t.projects.proj3desc, link: t.projects.inProgress },
                { title: 'PM-PB', type: 'GOV', color: 'tertiary', img: '/projetos/pmpb.png', desc: t.projects.proj4desc, link: t.projects.inProgress },
                { title: 'Sentinela Elétrica', type: 'IOT', color: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEfRL3dKTLEPHLQOxClkM4vqE827PoNOl-P2KmaQDAAKcalGOO9G5kca9bTe5FPDNR8HfF4s0nzZyRmD3D8u6xUQyikBCM3qrrNb0TPKJ2-trwEE5_qkK1MY8f83plYIKIF5o-CBq7vpP8U98XcjbuMouPCK3uDGVtQEunXlyw-T_sknLWDdMLEnWb-n9XyxWR5m8zXFfMJQs4GQ05oQ4glg1aMSYCBQisW6j0EB4-iDScyEfAQMa6V9e07PLkXvvtDolzx-QcdTVR', desc: t.projects.proj5desc, link: 'https://smart-lumen.vercel.app' },
                { title: 'Dialoga', type: 'FORUM', color: 'secondary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAByM7v6r6qRB6lXLYjpozMCIFtw2hUkpF-k0BG39RX89rN8aKGRfsBqJevptAmh7jb5aHUe8zkbD61HT6iBuF11zUvTwowDOA5JtwASUTXDBAJpWh5AMmNUJ06sZKPJkduQBcqqJqHNqbpBOiYJXVZTg8LUcDhmwXVsxT5F4a-QQjiPMfbCQL6js8l7vt6h0kBF8VakGjMTul_6TvQ9hLnlwqfFxjEHo2mqVug2Lh5qVlu6VAhQTu8oN7BwdxYjYDqJ-T4Jukra7ij', desc: t.projects.proj6desc, link: 'https://github.com/Vinicius083/Forum-project' },
                { title: 'DueCheck', type: 'SAUDE', color: 'tertiary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPNKRoWbfSDeS0QGtf1Vblaf74rY0qIN1e-B4eTArve7SWUoYXA0DpFTIEmwG5TypJWxAnmvGphCyszNBYm3icYkvaXweWoUYH235TnRxC1wOM7DBYOeTryztnHpgDgx2Ch5T3cCNEiOQHObw-Jq51xNbAp1xupfgnZkkzMHSjxFt70mkOvk5wlE1q1VpiJZnn3PYkTWI3VLmK4CHtFxghTl9g8etYa7CHkGc5tTO4MMWUASiSWnT9zBAkfeWP_FBi5OCJsOspN0Y', desc: t.projects.proj7desc, link: 'https://github.com/Vinicius083/duecheck-project' }
              ].map(proj => (
                <div key={proj.title} className="w-full bg-surface border-2 border-outline-variant flex flex-col btn-bevel">
                  <div className="h-40 border-b-2 border-outline-variant relative overflow-hidden bg-black">
                    <img className="w-full h-full object-cover opacity-60" src={proj.img} alt={proj.title} />
                    <div className={`absolute top-2 left-2 bg-black/80 px-2 py-1 text-xs border border-${proj.color}-fixed text-${proj.color}-fixed`}>{proj.type}</div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className={`font-display-header text-xl text-${proj.color} mb-2`}>{proj.title}</h3>
                    <p className="text-sm text-on-surface-variant flex-1 mb-4">{proj.desc}</p>
                    <div className="flex justify-between items-center mt-auto border-t border-outline-variant pt-4">
                      <span className="text-[10px] text-outline truncate max-w-[120px]">{proj.link}</span>
                      <button onClick={() => window.open(proj.link !== t.projects.inProgress ? proj.link : '#', '_blank')} className={`bg-${proj.color}-container text-on-${proj.color}-container px-4 py-1 btn-bevel text-xs`}>OPEN</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media Window */}
        <section id="social">
          <div className="bg-surface-container window-bevel rounded-DEFAULT overflow-hidden shadow-xl">
            <div className="window-title-bg h-6 flex justify-between items-center px-1 border-b border-black">
              <span className="font-window-title text-window-title text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">SOCIAL_NETWORK.CONNECT</span>
            </div>
            <div className="p-4 bg-white flex flex-col gap-4 text-black">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#1877f2] p-0.5">
                  <img src="/myPicture.webp" alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">Vinícius Almeida</h2>
                  <p className="text-gray-500 text-xs">{t.social.role}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <a href="https://github.com/Vinicius083" target="_blank" className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <img src="/social/github.svg" width={18} height={18} alt="GitHub" />
                  <span className="font-bold text-[10px]">GITHUB</span>
                </a>
                <a href="https://www.linkedin.com/in/viniciusalmeidabe/" target="_blank" className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <img src="/social/linkedin.svg" width={18} height={18} alt="LinkedIn" />
                  <span className="font-bold text-[10px]">LINKEDIN</span>
                </a>
                <a href="https://www.instagram.com/viniciuss._a/" target="_blank" className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <img src="/social/instagram.svg" width={18} height={18} alt="Instagram" />
                  <span className="font-bold text-[10px]">INSTAGRAM</span>
                </a>
                <a href="https://discord.com/users/394810430771429377" target="_blank" className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <img src="/social/discord.svg" width={18} height={18} alt="Discord" />
                  <span className="font-bold text-[10px]">DISCORD</span>
                </a>
              </div>
              
              <div className="bg-[#1877f2] text-white text-center py-2 rounded font-bold text-xs shadow-md">
                CONNECT_GLOBAL_NODE
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact">
          <div className="bg-surface-container window-bevel rounded-DEFAULT overflow-hidden shadow-xl">
            <div className="window-title-bg h-6 flex justify-between items-center px-1 border-b border-black">
              <span className="font-window-title text-window-title text-white drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">COMM_UPLINK.NET</span>
            </div>
            <div className="p-4 bg-black border-[4px] border-surface-container-lowest">
              <div className="text-secondary mb-6 border-b border-secondary-fixed/30 pb-2 text-xs">
                &gt; {language === 'en' ? 'ESTABLISHING SECURE CONNECTION...' : 'ESTABELECENDO CONEXÃO SEGURA...'}<br/>
                &gt; {language === 'en' ? 'CONNECTION ESTABLISHED.' : 'CONEXÃO ESTABELECIDA.'}<br/>
                &gt; {language === 'en' ? 'ENTER MESSAGE BELOW:' : 'DIGITE A MENSAGEM ABAIXO:'}
              </div>
              <form className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-primary-fixed text-xs mb-1">ID [NAME]:</label>
                  <input className="bg-black terminal-input text-secondary focus:outline-none p-2 text-xs" placeholder="Enter identification..." type="text" />
                </div>
                <div className="flex flex-col">
                  <label className="text-primary-fixed text-xs mb-1">ROUTING [EMAIL]:</label>
                  <input className="bg-black terminal-input text-secondary focus:outline-none p-2 text-xs" placeholder="Enter routing address..." type="email" />
                </div>
                <div className="flex flex-col">
                  <label className="text-primary-fixed text-xs mb-1">PAYLOAD [MESSAGE]:</label>
                  <textarea className="bg-black terminal-input text-secondary focus:outline-none p-2 text-xs resize-none" placeholder="Transmit data..." rows={4}></textarea>
                </div>
                <div className="pt-2 flex justify-end">
                  <button className="bg-black border border-secondary-fixed text-secondary-fixed px-6 py-2 blinking-cursor shadow-[0_0_10px_rgba(116,255,106,0.2)] text-xs w-full" type="button">
                    {language === 'en' ? 'TRANSMIT' : 'TRANSMITIR'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Taskbar (Mobile/Global) */}
      <div className="fixed bottom-0 left-0 w-full z-[9999] flex items-center bg-gray-300 h-10 px-0 border-t-2 border-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.5),0_-4px_10px_rgba(0,83,225,0.3)] uppercase text-black">
        <div className="h-full flex items-center px-2 bg-gradient-to-r from-green-600 to-green-400 rounded-r-full shadow-[inset_2px_2px_0_rgba(255,255,255,0.5)] border-r-2 border-black mr-2 text-white font-black italic text-xs">
          <span className="material-symbols-outlined text-[14px] mr-1">rocket_launch</span>
          START
        </div>
        <div className="flex h-full flex-1 overflow-x-auto no-scrollbar items-center justify-around">
          <a href="#hero" className="p-2"><img src="/terminal.svg" width={20} height={20} alt="Hero" /></a>
          <a href="#bio" className="p-2"><img src="/internet.svg" width={20} height={20} alt="Bio" /></a>
          <a href="#projects" className="p-2"><img src="/file.svg" width={20} height={20} alt="Projects" /></a>
          <a href="#social" className="p-2"><img src="/social/social.svg" width={20} height={20} alt="Social" /></a>
          <a href="#contact" className="p-2"><img src="/chat.svg" width={20} height={20} alt="Contact" /></a>
        </div>
      </div>
    </div>
  );
}
