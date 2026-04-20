import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
          {/* Hero Section */}
          <header id="home" className="relative min-h-screen flex items-center justify-center pt-24 px-6 md:px-12 overflow-hidden data-wave-bg">
              <div className="relative z-10 max-w-5xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 space-y-6">
                      <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Junior Full Stack Developer</p>
                      <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter leading-none">
                          Vinícius Almeida <br />
                          <span className="text-surface-container-highest">Desenvolvedor</span><br />
                          <span className="red-gradient-text">Full Stack Júnior</span>
                      </h1>
                      <p className="text-lg md:text-xl font-body leading-relaxed text-on-surface-variant max-w-2xl">
                          Desenvolvendo soluções escaláveis e integradas com paixão e tecnologia. A interseção entre lógica rígida e experiência fluida.
                      </p>
                      <div className="pt-8">
                          <button className="px-8 py-4 rounded-md ghost-border text-white hover:bg-surface-container-high hover:outline-[#FF0000] transition-all duration-300 font-label text-sm uppercase tracking-wider flex items-center gap-2 mx-auto md:mx-0">
                              Ver Currículo
                              <span className="material-symbols-outlined text-primary">arrow_forward</span>
                          </button>
                      </div>
                  </div>
              </div>
              {/* Decorative Glow */}
              <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
          </header>

          {/* About Me Section */}
          <section className="py-24 px-6 md:px-12 relative border-t border-white/5 bg-surface-container-low" id="about">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                  <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-full border-2 border-[#FF0000]/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
                      <div className="absolute inset-2 rounded-full border-2 border-[#FF0000]/50"></div>
                      <div className="absolute inset-4 rounded-full overflow-hidden bg-surface-container-high grayscale hover:grayscale-0 transition-all duration-700">
                          <img alt="Vinícius Almeida Portrait" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl4dY-IfbSwRkKqGMe4SHwC46NHN1SqpntK260Pn7Mv_oZi5DVWu_9T3YHlelymOjvNutMX0FgYZKRHaCvF_kGLw7rlharAgh-SCoFUbhm61yS4pJb8cGSdxGm3v49VB0763dBqIdUcMjqSqLhM4JXtca072YRu-rCl8_KCaAHYV8JEhsZ_2nN5Hcl8WDzOaKvd7PbrdlV4di-MVpGFnu_5r-S7eF2b88hDyr2F186SecwgEiAZoLTOAISSpNr2Gsm3MxborJuWOuS" />
                      </div>
                  </div>
                  <div className="flex-1 space-y-6 text-center md:text-left">
                      <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-white">
                          Sobre <span className="text-[#FF0000]">Mim</span>
                      </h2>
                      <p className="text-lg font-body leading-relaxed text-on-surface-variant">
                          Sou um desenvolvedor Full Stack apaixonado por arquitetar sistemas eficientes e criar interfaces intuitivas. Atualmente formado em Análise e Desenvolvimento na <strong className="text-white">UNIPÊ</strong>, busco constantemente unir a teoria acadêmica com as melhores práticas de mercado.
                      </p>
                      <p className="text-lg font-body leading-relaxed text-on-surface-variant">
                          Minha abordagem de desenvolvimento é focada na escalabilidade, manutenção e, acima de tudo, na experiência do usuário final. Acredito que o código não é apenas uma ferramenta de engenharia, mas um meio de comunicação com as pessoas.
                      </p>
                  </div>
              </div>
          </section>

          {/* Technical Skills Section */}
          <section className="py-24 px-6 md:px-12 relative border-t border-white/5" id="stack">
              <div className="max-w-6xl mx-auto space-y-16">
                  <div className="text-center space-y-4">
                      <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-white">
                          Technical <span className="text-[#FF0000]">Stack</span>
                      </h2>
                      <p className="font-label text-sm uppercase tracking-widest text-neutral-500">O arsenal do arquiteto</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {/* Stack Categories */}
                      <div className="glass-panel p-8 rounded-xl ghost-border hover-ghost-border transition-all duration-300">
                          <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center mb-6">
                              <span className="material-symbols-outlined text-[#FF0000]">code</span>
                          </div>
                          <h3 className="text-xl font-headline font-bold text-white mb-4">Lang/Frameworks</h3>
                          <ul className="space-y-3 font-body text-sm text-on-surface-variant">
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> TypeScript / JavaScript</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> React / Next.js</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Express / Nest.js</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> HTML5 / CSS3 / Tailwind</li>
                          </ul>
                      </div>
                      {/* Database */}
                      <div className="glass-panel p-8 rounded-xl ghost-border hover-ghost-border transition-all duration-300">
                          <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center mb-6">
                              <span className="material-symbols-outlined text-[#FF0000]">database</span>
                          </div>
                          <h3 className="text-xl font-headline font-bold text-white mb-4">Database & ORM</h3>
                          <ul className="space-y-3 font-body text-sm text-on-surface-variant">
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> PostgreSQL</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> MongoDB</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Prisma ORM</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Redis</li>
                          </ul>
                      </div>
                      {/* Tools */}
                      <div className="glass-panel p-8 rounded-xl ghost-border hover-ghost-border transition-all duration-300">
                          <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center mb-6">
                              <span className="material-symbols-outlined text-[#FF0000]">build</span>
                          </div>
                          <h3 className="text-xl font-headline font-bold text-white mb-4">Ferramentas</h3>
                          <ul className="space-y-3 font-body text-sm text-on-surface-variant">
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Git / GitHub</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Docker</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Vercel</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Figma</li>
                          </ul>
                      </div>
                      {/* Practices */}
                      <div className="glass-panel p-8 rounded-xl ghost-border hover-ghost-border transition-all duration-300">
                          <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center mb-6">
                              <span className="material-symbols-outlined text-[#FF0000]">architecture</span>
                          </div>
                          <h3 className="text-xl font-headline font-bold text-white mb-4">Práticas</h3>
                          <ul className="space-y-3 font-body text-sm text-on-surface-variant">
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Clean Code</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> SOLID Principles</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> Agile / Scrum</li>
                              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span> UI/UX Design</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </section>

          {/* Professional Journey Section */}
          <section className="py-24 px-6 md:px-12 relative border-t border-white/5 bg-surface-container-low" id="journey">
              <div className="max-w-4xl mx-auto space-y-16">
                  <div className="text-center space-y-4">
                      <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-white">
                          Professional <span className="text-[#FF0000]">Journey</span>
                      </h2>
                      <p className="font-label text-sm uppercase tracking-widest text-neutral-500">A evolução contínua</p>
                  </div>
                  <div className="relative border-l border-[#FF0000]/30 ml-4 md:ml-12 space-y-12">
                      {/* Meets Tecnologia */}
                      <div className="relative pl-8 md:pl-12">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FF0000] border-4 border-[#1b1b1b]"></div>
                          <div className="space-y-2">
                              <span className="font-label text-xs uppercase tracking-widest text-primary">Setembro 2025 - Presente</span>
                              <h3 className="text-2xl font-headline font-bold text-white">Desenvolvedor Full Stack Júnior</h3>
                              <h4 className="text-lg font-body text-neutral-400">Meets Tecnologia</h4>
                              <p className="text-on-surface-variant font-body leading-relaxed pt-2">
                                  Desenvolvimento e manutenção de aplicações web escaláveis. Colaboração em equipes ágeis, implementação de novas features focadas na experiência do usuário e otimização de performance no backend.
                              </p>
                          </div>
                      </div>
                      {/* UBTech Office */}
                      <div className="relative pl-8 md:pl-12">
                          <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-[#1b1b1b]"></div>
                          <div className="space-y-2">
                              <span className="font-label text-xs uppercase tracking-widest text-neutral-500">Setembro 2024 - Junho 2025</span>
                              <h3 className="text-2xl font-headline font-bold text-white">Estagiário de Desenvolvimento</h3>
                              <h4 className="text-lg font-body text-neutral-400">UBTech Office</h4>
                              <p className="text-on-surface-variant font-body leading-relaxed pt-2">
                                  Apoio no desenvolvimento de sistemas internos, criação de interfaces de usuário com React e rotinas de backend. Aprendizado intenso sobre o ciclo de vida do software corporativo.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Featured Projects Section */}
          <section className="py-24 px-6 md:px-12 relative border-t border-white/5" id="work">
              <div className="max-w-6xl mx-auto space-y-16">
                  <div className="text-center space-y-4">
                      <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-white">
                          Featured <span className="text-[#FF0000]">Projects</span>
                      </h2>
                      <p className="font-label text-sm uppercase tracking-widest text-neutral-500">A prova de conceito</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* BPet */}
                      <div className="glass-panel group rounded-xl overflow-hidden ghost-border hover-ghost-border transition-all duration-500 flex flex-col">
                          <div className="h-48 bg-surface-container relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent z-10"></div>
                              <img alt="BPet Project" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWSGL-vaJQS_NJlA23YRxIKwUNYZVu7aNMwzqTECG-3E00ttn_qxI-83jjKccA5NicAGbkdMDGV6KE5yShFOJfJ4DyG-NCcuh6vt4aOHPxsmn0rHWZsaOu0VEoH43aXau9QH9LraVc0iMlHV56CncDry5Qbke-nZiEszlD61P1XqD8zDEPbKUY2SLAyqLWbRN3B9NvnSTmiaQRbF5Z4sEPxEbPiFAiM7bykXDKFIlfnXGco_z_njWWhP5E8oQLRxnwk402Wfp_iZC7" />
                          </div>
                          <div className="p-8 flex-1 flex flex-col">
                              <h3 className="text-2xl font-headline font-bold text-white mb-2 group-hover:text-[#FF0000] transition-colors">BPet</h3>
                              <p className="text-sm font-body text-on-surface-variant mb-6 flex-1">
                                  Plataforma de gestão para clínicas veterinárias. Sistema completo com controle de prontuários, agendamentos e faturamento financeiro integrado.
                              </p>
                              <div className="flex flex-wrap gap-2 mt-auto">
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">Next.js</span>
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">Node.js</span>
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">PostgreSQL</span>
                              </div>
                          </div>
                      </div>
                      {/* ESP-PB */}
                      <div className="glass-panel group rounded-xl overflow-hidden ghost-border hover-ghost-border transition-all duration-500 flex flex-col">
                          <div className="h-48 bg-surface-container relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-[#131010] to-transparent z-10"></div>
                              <img alt="ESP-PB Project" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEBNu2ayzd7ONHHEVbQQTJXVIkFxcK-hhhzqZS_iLYL_FpNoqLHYInsaitmS4tYo6574HOJQPriEYWUcnGIoxw_HQUHovL5Wi8THmU0GcC0ER1A0NjEFyz_zXlLRcZuavA-goHPlXf0gh4IWhip5d_isvLhcxWMdTAqbHLgt_SHvMbEeEZW6gbJqnLUo6-kdEpwe86OvITKSxQtTCA2_hdEmPejMu-2Df5_jKhNhQYdgjvobtpHfNfdbFtW4-DdG_G1-Psjk5dBE0j" />
                          </div>
                          <div className="p-8 flex-1 flex flex-col">
                              <h3 className="text-2xl font-headline font-bold text-white mb-2 group-hover:text-[#FF0000] transition-colors">ESP-PB</h3>
                              <p className="text-sm font-body text-on-surface-variant mb-6 flex-1">
                                  Portal educacional para a Escola de Saúde Pública da Paraíba. Sistema de gestão de cursos, inscrições e certificação digital com alta disponibilidade.
                              </p>
                              <div className="flex flex-wrap gap-2 mt-auto">
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">React</span>
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">Express</span>
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">MongoDB</span>
                              </div>
                          </div>
                      </div>
                      {/* PM-PB */}
                      <div className="glass-panel group rounded-xl overflow-hidden ghost-border hover-ghost-border transition-all duration-500 flex flex-col">
                          <div className="h-48 bg-surface-container relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-[#131111] to-transparent z-10"></div>
                              <img alt="PM-PB Project" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYOIdYta8dVvU8X5e_xu0Box-IaHuxiMiwDTqh3AFQR7hMkK5oF1F5AmXjLntS5ljmFjGZrpYE_ZtNw3XTJTIQvQtjzri8cPMYIP0aBqS0mQ6DZLUl_AJoz05USvwKCig43zLajzoSUitUfsLXoJ1e7SqfLiZakUBUHL2ljA-sbTFsQ0JUtNeunH9TRSs8kh0TagmyHeBRDbQiNGh93kQ8p23YWJkTFSRwr8GSwNNIZY6gt0WRFIKBbBfeq7pKjUYSaDH1uXpq1KSK" />
                          </div>
                          <div className="p-8 flex-1 flex flex-col">
                              <h3 className="text-2xl font-headline font-bold text-white mb-2 group-hover:text-[#FF0000] transition-colors">PM-PB</h3>
                              <p className="text-sm font-body text-on-surface-variant mb-6 flex-1">
                                  Sistema administrativo para a Polícia Militar da Paraíba. Foco estrito em segurança, controle de acesso granular e auditoria de dados sensíveis.
                              </p>
                              <div className="flex flex-wrap gap-2 mt-auto">
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">TypeScript</span>
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">NestJS</span>
                                  <span className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-label text-neutral-300">Docker</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {/* Contact Section */}
          <section className="py-24 px-6 md:px-12 relative border-t border-white/5 data-wave-bg" id="contact">
              <div className="max-w-3xl mx-auto text-center space-y-12">
                  <div className="space-y-4">
                      <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-white">
                          Vamos <span className="text-[#FF0000]">Conversar.</span>
                      </h2>
                      <p className="text-lg font-body text-on-surface-variant">Pronto para construir o próximo projeto incrível? Entre em contato e vamos transformar sua ideia em realidade digital.</p>
                  </div>
                  <form className="space-y-6 text-left glass-panel p-8 md:p-12 rounded-2xl ghost-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <label className="font-label text-xs uppercase tracking-widest text-neutral-400" htmlFor="name">Nome</label>
                              <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-[#FF0000] transition-all font-body" id="name" placeholder="John Doe" type="text" />
                          </div>
                          <div className="space-y-2">
                              <label className="font-label text-xs uppercase tracking-widest text-neutral-400" htmlFor="email">Email</label>
                              <input className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-[#FF0000] transition-all font-body" id="email" placeholder="john@example.com" type="email" />
                          </div>
                      </div>
                      <div className="space-y-2">
                          <label className="font-label text-xs uppercase tracking-widest text-neutral-400" htmlFor="message">Mensagem</label>
                          <textarea className="w-full bg-surface-container-high border-none rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:ring-2 focus:ring-[#FF0000] transition-all font-body resize-none" id="message" placeholder="Olá, gostaria de falar sobre..." rows={4}></textarea>
                      </div>
                      <button className="w-full px-8 py-4 rounded-md red-gradient-bg text-white hover:opacity-90 transition-opacity font-label text-sm uppercase tracking-wider font-bold">
                          Enviar Mensagem
                      </button>
                  </form>
              </div>
          </section>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 bg-[#0e0e0e] border-t border-white/5">
          <div className="font-headline font-bold text-white uppercase text-xl">V.ALMEIDA</div>
          <div className="font-body text-[10px] uppercase tracking-[0.2em] text-neutral-500">© 2026 VINÍCIUS ALMEIDA</div>
          <div className="flex items-center gap-6 font-label text-xs uppercase tracking-widest text-neutral-600">
              <a className="hover:text-[#FF0000] transition-colors" href="#">GitHub</a>
              <a className="hover:text-[#FF0000] transition-colors" href="#">LinkedIn</a>
              <a className="hover:text-[#FF0000] transition-colors" href="#">Email</a>
          </div>
      </footer>
    </>
  );
}
