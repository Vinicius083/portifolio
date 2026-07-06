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
    year: "2025",
    category: "Gestão de Consultas",
    name: "DueCheck",
    bg: "oklch(80% 0.045 95)",
    fg: "#1A1712",
    desc: "Aplicação para gerenciar consultas com scrapping de dados usando puppeteer e usuários de forma eficiente. Backend em Node.js e TypeScript com Prisma sobre PostgreSQL, suportando operações CRUD completas.",
    tech: ["Node.js", "Puppeteer", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/Vinicius083/duecheck-project",
    live: "",
    shotLabel: "tela de gerenciamento de consultas",
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
};

export const JOBS: Job[] = [
  {
    id: "job0",
    period: "Setembro 2025 - Atual",
    location: "Remoto",
    role: "Desenvolvedor Full Stack",
    company: "Meets Tecnologia",
    desc: "CRM e Central de atendimento com chatbot e IA. Manutenção de sistemas legados, PHP (Zend e Laravel), React no front, NestJS no back. Criação de novos módulos e funcionalidades.",
    photo: "/projetos/meets.png",
    link: "https://meets.com.br/pt-br",
    details:
      "Atuação em um ambiente 100% remoto, colaborando com equipes de desenvolvimento, QA e suporte. Manutenção de sistemas legados, correção de bugs críticos e evolução de funcionalidades de produção. Desenvolvimento focado em PHP (Zend Framework) no back e front (CRM), React (JS/TS) no front-end, e NestJS no back-end. Destaque recente: Desenvolvimento e troubleshooting do módulo de 'Coexistência WhatsApp' para a plataforma CRM, envolvendo roteamento de back-end complexo e tokens da Meta Graph API.",
  },
  {
    id: "job1",
    period: "Novembro 2025 - Atual",
    location: "Freelancer",
    role: "Desenvolvedor Full Stack",
    company: "B-Pet",
    desc: "Plataforma de gestão para petshops. Back-end em NestJS (APIs e regras de negócio) e Next.js no front-end. Atuando também no deploy dos ambientes.",
    photo: "/projetos/bpet.png",
    link: "https://www.b-pet.app.br",
    details:
      "Desenvolvimento focado no back-end utilizando NestJS, criando APIs, regras de negócio e integrações. Contribuições no front-end com Next.js, consolidando a atuação Full Stack e lidando com requisitos reais de negócio.",
  },
  {
    id: "job2",
    period: "Julho 2024 - Junho 2025",
    location: "Remoto",
    role: "Squad Leader (Back-end)",
    company: "UBTech Office",
    desc: "ESP-PB: gestão de estágios com Django REST Framework, React, Docker e PostgreSQL — Squad Leader do back-end.",
    photo: "/projetos/esppb.png",
    details:
      "Escola de Saúde Pública da Paraíba (ESP-PB): Sistema com regras de negócio complexas para gestão de vagas de estágio. Atuação com Django REST Framework, React, Docker e PostgreSQL. Exerci o papel de Squad Leader do time de back-end, orientando colegas, revisando código, conduzindo decisões técnicas e participando de reuniões com clientes.",
  },
  {
    id: "job3",
    period: "Julho 2024 - Junho 2025",
    location: "Remoto",
    role: "Estagiário",
    company: "UBTech Office",
    desc: "PM-PB: geoprocessamento com Django, GDAL e Leaflet.",
    photo: "/projetos/pmpb.png",
    details:
      "Polícia Militar da Paraíba (Projeto Sigiloso): Desenvolvimento de funcionalidades de geoprocessamento e visualização de dados espaciais utilizando Django Template, GDAL e Leaflet.",
  },
];
