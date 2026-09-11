export type Project = {
  id: string;
  year: string;
  category: string;
  name: string;
  bg: string;
  fg: string;
  desc: string;
  tech: string[];
  github?: string;
  live?: string;
  shotLabel: string;
  image?: string;
  details?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "card0",
    year: "2026",
    category: "Landing Page",
    name: "Ambiance",
    bg: "oklch(0.4219 0.109 45.4)",
    fg: "#F2F0EC",
    desc: "Landing page para a Ambiance, escritório focado em design de interiores de alto padrão. Apresenta o portfólio de residências, serviços de consultoria e metodologia de projetos exclusivos com foco em animações fluidas.",
    tech: ["React", "TypeScript", "GSAP"],
    github: "",
    live: "https://www.aambiance.com.br",
    shotLabel: "hero section da landing page de interiores",
    image: "/projetos/ambiance-print.png",
  },
  {
    id: "card1",
    year: "2026",
    category: "Dashboard IoT",
    name: "Smart Lumen",
    bg: "oklch(52% 0.16 260)",
    fg: "#F5F6FF",
    desc: "Ideatown Energisa - Painel IoT para monitorar a saúde e o desempenho de redes de distribuição de energia elétrica: tensão, corrente e alertas em tempo real, com análises preditivas e mapa geográfico de sensores.",
    tech: ["React", "IoT", "Leaflet", "Alertas em tempo real"],
    github: "https://github.com/Vinicius083/Smart-Lumen",
    live: "https://smart-lumen.vercel.app",
    shotLabel: "dashboard de monitoramento em tempo real",
    image: "/projetos/smart-lumen.png",
  },
  {
    id: "card2",
    year: "2026",
    category: "Portifólio Institucional",
    name: "Portifólio Institucional",
    bg: "oklch(80% 0.045 95)",
    fg: "#1A1712",
    desc: "Além de de programador, também sou fotografo. Este portfólio institucional apresenta meus projetos, experiências profissionais e trabalhos de fotografia.",
    tech: [
      "NextJS",
      "Tailwind CSS",
      "TypeScript",
      "Claude Design",
      "React Bits",
    ],
    github: "https://github.com/Vinicius083/vinicius-fotografia",
    live: "https://fotografia.viniciusalmeida.cc",
    shotLabel: "portfolio institucional de fotografia",
    image: "/projetos/fotografia.png",
  },
];

export type Job = {
  id: string;
  period: string;
  location: string;
  role: string;
  company: string;
  desc: string;
  photo: string;
  link?: string;
  details?: string;
  bullets?: string[];
};

export const JOBS: Job[] = [
  {
    id: "job0",
    period: "Setembro 2025 - Atual",
    location: "Remoto (Portugal)",
    role: "Desenvolvedor Full Stack",
    company: "Meets Tecnologia",
    desc: "CRM corporativo e central de atendimento com chatbot e IA integrada. Atuação full stack com PHP (Zend e Laravel), React no front-end e NestJS no back-end.",
    photo: "/projetos/meets.png",
    link: "https://meets.com.br/pt-br",
    details:
      "Refatorei o módulo de agenda legado (PHP/Zend) para React + NestJS, com lembretes automáticos via WhatsApp e integração com Google Calendar — hoje em uso ativo pelos clientes. Desenvolvi integrações com ERPs (Bexio, SSPlus) e Google Cloud, com contato técnico direto com equipes parceiras. Contribuí na Antonnia, assistente de IA para atendimento via WhatsApp, e criei a API pública da central de atendimento para integrações de parceiros externos.",
    bullets: [
      "Refatoração do módulo de agenda legado (PHP/Zend) para React + NestJS, com lembretes via WhatsApp e Google Calendar.",
      "Integrações com ERPs (Bexio, SSPlus) e Google Cloud, em contato direto com equipes parceiras.",
      "Contribuição na Antonnia, assistente de IA para atendimento via WhatsApp.",
      "Criação da API pública da central de atendimento para parceiros externos.",
    ],
  },
  {
    id: "job1",
    period: "Novembro 2025 - Atual",
    location: "Freelancer / Remoto",
    role: "Desenvolvedor Full Stack (Freelancer)",
    company: "B-Pet",
    desc: "Plataforma de gestão para petshops. Assumi o projeto sozinho no meio da primeira fase, após a saída do desenvolvedor anterior, incluindo o deploy manual em produção via SSH.",
    photo: "/projetos/bpet.png",
    link: "https://www.b-pet.app.br",
    details:
      "Refatorei a lógica de cadastro (usuário → endereço → perfil → plano), que era desnecessariamente complexa e gerava cadastros incompletos e erros — a refatoração reduziu esses erros. Respondi sozinho a dois incidentes de segurança (ataques de mineração de criptomoeda) no servidor de produção.",
    bullets: [
      "Projeto assumido sozinho no meio da primeira fase, com deploy manual em produção via SSH.",
      "Refatoração da lógica de cadastro (usuário → endereço → perfil → plano), reduzindo cadastros incompletos e erros.",
      "Resposta a dois incidentes de segurança (mineração de criptomoeda) no servidor de produção.",
    ],
  },
  {
    id: "job2",
    period: "Março 2025 - Julho 2025",
    location: "Remoto",
    role: "Squad Leader (Back-end)",
    company: "UBTech Office",
    desc: "Sistema de gestão de estágios e contrapartidas entre instituições de ensino e unidades de saúde. Entrei no meio do projeto, com o backend praticamente inexistente, e decidi reconstruí-lo do zero — depois, também o frontend.",
    photo: "/projetos/esppb.png",
    details:
      "Introduzi Git Flow e gestão de tarefas via Jira/Trello, inexistentes na equipe até então. Liderei as sprints de um time de 6 a 7 desenvolvedores — orientação, code review e acompanhamento de tasks — enquanto também desenvolvia. Entreguei o projeto no prazo acordado, com o cliente (ESP-PB) satisfeito; saí ao entrar na Meets e o projeto seguiu depois disso.",
    bullets: [
      "Reconstrução do back-end (e depois do frontend) a partir de uma base praticamente inexistente.",
      "Introdução de Git Flow e gestão de tarefas via Jira/Trello no time.",
      "Liderança das sprints de um time de 6 a 7 desenvolvedores, com code review e mentoria, sem deixar de desenvolver.",
      "Entrega no prazo acordado, com o cliente satisfeito.",
    ],
  },
  {
    id: "job3",
    period: "Setembro 2024 - Fevereiro 2025",
    location: "Remoto",
    role: "Desenvolvedor de Software",
    company: "UBTech Office",
    desc: "Sistema geoespacial para a Polícia Militar da Paraíba (projeto confidencial). Funcionalidades de geoprocessamento e visualização de dados espaciais.",
    photo: "/projetos/pmpb.png",
    details:
      "Resolvi a configuração da biblioteca GDAL via Docker — meu primeiro contato com Docker — depois de venv e Anaconda falharem. Desenvolvi a feature de heatmap para visualização de dados no mapa. O projeto foi avaliado pela PM-PB como um dos favoritos do semestre, com garantia de implementação real para monitoramento em grandes eventos.",
    bullets: [
      "Configuração da biblioteca GDAL via Docker (primeiro contato com Docker), após venv e Anaconda falharem.",
      "Desenvolvimento da feature de heatmap para visualização de dados no mapa.",
      "Projeto apontado pela PM-PB como um dos favoritos do semestre, com garantia de implementação real.",
    ],
  },
];
