import React from 'react';
import Image from 'next/image';

export default function MobileView() {
  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen overflow-x-hidden pb-taskbar-height snap-grid font-terminal-md text-sm md:text-base relative">
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
        <div className="flex gap-1">
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
              <p className="text-secondary mb-6 blinking-cursor text-xs">&gt; CREATIVE DEVELOPER _ SYSTEM ARCHITECT</p>
              <div className="flex flex-col gap-4 mt-4">
                <a href="#projects" className="bg-surface btn-bevel px-4 py-2 text-primary font-label-caps uppercase hover:text-white transition-colors shadow-[0_0_15px_rgba(0,83,225,0.5)] text-center">
                  [ EXECUTE_PORTFOLIO ]
                </a>
                <a href="#contact" className="bg-surface btn-bevel px-4 py-2 text-secondary font-label-caps uppercase hover:text-white transition-colors text-center">
                  [ INITIATE_COMMS ]
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
                <p>Desenvolvedor Full Stack com experiência prática em ambientes reais de desenvolvimento de software, atuando tanto no back-end quanto no front-end. Minha trajetória é marcada por evolução constante, aprendizado contínuo e participação ativa em projetos com impacto direto em usuários e clientes.</p>
                <div className="mt-4 p-4 border border-outline-variant bg-surface-dim">
                  <ul className="space-y-2 text-on-surface-variant">
                    <li><span className="text-primary-fixed">CLASS:</span> DEV FULL STACK</li>
                    <li><span className="text-primary-fixed">LOCALIDADE:</span> JOÃO PESSOA, PB</li>
                    <li><span className="text-primary-fixed">STATUS:</span> ATIVO</li>
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
                { title: 'Meets Tecnologia', type: 'CRM', color: 'primary', img: '/projetos/meets.png', desc: 'Desenvolvimento e manutenção do CRM (PHP Zend) e front-end React. Implementação Meta Graph API.', link: 'https://meets.com.br/pt-br' },
                { title: 'BPet System', type: 'SAAS', color: 'secondary', img: '/projetos/bpet.png', desc: 'Plataforma de gestão para petshops (NestJS e Next.js). Gerenciamento de clientes e negócios.', link: 'https://www.b-pet.app.br' },
                { title: 'ESP-PB', type: 'GOV', color: 'tertiary', img: '/projetos/esppb.png', desc: 'Sistema de gestão de vagas de estágio (Django REST, React). Regras de negócio complexas.', link: 'Em Progresso' },
                { title: 'PM-PB', type: 'GOV', color: 'tertiary', img: '/projetos/pmpb.png', desc: 'Projeto Sigiloso de geoprocessamento.', link: 'Em Progresso' },
                { title: 'Sentinela Elétrica', type: 'IOT', color: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEfRL3dKTLEPHLQOxClkM4vqE827PoNOl-P2KmaQDAAKcalGOO9G5kca9bTe5FPDNR8HfF4s0nzZyRmD3D8u6xUQyikBCM3qrrNb0TPKJ2-trwEE5_qkK1MY8f83plYIKIF5o-CBq7vpP8U98XcjbuMouPCK3uDGVtQEunXlyw-T_sknLWDdMLEnWb-n9XyxWR5m8zXFfMJQs4GQ05oQ4glg1aMSYCBQisW6j0EB4-iDScyEfAQMa6V9e07PLkXvvtDolzx-QcdTVR', desc: 'Dashboard IoT para monitoramento de redes de distribuição em tempo real.', link: 'https://smart-lumen.vercel.app' },
                { title: 'Dialoga', type: 'FORUM', color: 'secondary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAByM7v6r6qRB6lXLYjpozMCIFtw2hUkpF-k0BG39RX89rN8aKGRfsBqJevptAmh7jb5aHUe8zkbD61HT6iBuF11zUvTwowDOA5JtwASUTXDBAJpWh5AMmNUJ06sZKPJkduQBcqqJqHNqbpBOiYJXVZTg8LUcDhmwXVsxT5F4a-QQjiPMfbCQL6js8l7vt6h0kBF8VakGjMTul_6TvQ9hLnlwqfFxjEHo2mqVug2Lh5qVlu6VAhQTu8oN7BwdxYjYDqJ-T4Jukra7ij', desc: 'Plataforma interativa para conectar pessoas com interface fluida e intuitiva.', link: 'https://github.com/Vinicius083/Forum-project' },
                { title: 'DueCheck', type: 'SAUDE', color: 'tertiary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPNKRoWbfSDeS0QGtf1Vblaf74rY0qIN1e-B4eTArve7SWUoYXA0DpFTIEmwG5TypJWxAnmvGphCyszNBYm3icYkvaXweWoUYH235TnRxC1wOM7DBYOeTryztnHpgDgx2Ch5T3cCNEiOQHObw-Jq51xNbAp1xupfgnZkkzMHSjxFt70mkOvk5wlE1q1VpiJZnn3PYkTWI3VLmK4CHtFxghTl9g8etYa7CHkGc5tTO4MMWUASiSWnT9zBAkfeWP_FBi5OCJsOspN0Y', desc: 'Gerenciador de consultas médicas e pacientes robusto e escalável (Node/Prisma).', link: 'https://github.com/Vinicius083/duecheck-project' }
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
                      <button onClick={() => window.open(proj.link !== 'Em Progresso' ? proj.link : '#', '_blank')} className={`bg-${proj.color}-container text-on-${proj.color}-container px-4 py-1 btn-bevel text-xs`}>OPEN</button>
                    </div>
                  </div>
                </div>
              ))}
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
                &gt; ESTABLISHING SECURE CONNECTION...<br/>
                &gt; CONNECTION ESTABLISHED.<br/>
                &gt; ENTER MESSAGE BELOW:
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
                    TRANSMIT
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
          <a href="#contact" className="p-2"><img src="/chat.svg" width={20} height={20} alt="Contact" /></a>
        </div>
      </div>
    </div>
  );
}
