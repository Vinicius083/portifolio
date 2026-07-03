export type Project = {
  id: string;
  year: string;
  category: string;
  name: string;
  bg: string;
  fg: string;
  desc: string;
  tech: string[];
  github: string;
  live: string;
  shotLabel: string;
};

export const PROJECTS: Project[] = [
  {
    id: "card0",
    year: "2024",
    category: "Dashboard IoT",
    name: "Smart Lumen",
    bg: "oklch(52% 0.16 260)",
    fg: "#F5F6FF",
    desc: "Painel IoT para monitorar a saúde e o desempenho de redes de distribuição de energia elétrica: tensão, corrente e alertas em tempo real, com análises preditivas e mapa geográfico de sensores.",
    tech: ["React", "Node.js", "IoT", "Leaflet", "Alertas em tempo real"],
    github: "https://github.com/Vinicius083/Smart-Lumen",
    live: "https://smart-lumen.vercel.app",
    shotLabel: "dashboard de monitoramento em tempo real",
  },
  {
    id: "card1",
    year: "2025",
    category: "Gestão de Consultas",
    name: "DueCheck",
    bg: "oklch(80% 0.045 95)",
    fg: "#1A1712",
    desc: "Aplicação para gerenciar consultas e usuários de forma eficiente. Backend em Node.js e TypeScript com Prisma sobre PostgreSQL, suportando operações CRUD completas.",
    tech: ["Node.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/Vinicius083/duecheck-project",
    live: "",
    shotLabel: "tela de gerenciamento de consultas",
  },
  {
    id: "card2",
    year: "2025",
    category: "E-commerce",
    name: "BookCommerce",
    bg: "oklch(28% 0.05 150)",
    fg: "#F2F0EC",
    desc: "Plataforma de e-commerce para venda de livros. Backend em Node.js e TypeScript com Prisma e PostgreSQL, cobrindo CRUD de usuários, livros e vendas.",
    tech: ["Node.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/douglasmeneses/book-commerce",
    live: "",
    shotLabel: "catálogo e carrinho de compras",
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
};

export const JOBS: Job[] = [
  {
    id: "job0",
    period: "Atual",
    location: "Remoto",
    role: "Desenvolvedor Full Stack Júnior",
    company: "Meets Tecnologia",
    desc: "CRM e centrais de atendimento com chatbot e IA. Manutenção de sistemas legados, PHP (Zend) e React no front, NestJS no back. Destaque: módulo de Coexistência WhatsApp com Meta Graph API.",
    photo: "/projetos/meets.png",
    link: "https://meets.com.br/pt-br",
  },
  {
    id: "job1",
    period: "Nov 2025 – Atual",
    location: "Freelancer",
    role: "Desenvolvedor Full Stack",
    company: "BPet System",
    desc: "Plataforma de gestão para petshops. Back-end em NestJS (APIs e regras de negócio) e contribuições em Next.js no front-end.",
    photo: "/projetos/bpet.png",
    link: "https://www.b-pet.app.br",
  },
  {
    id: "job2",
    period: "Fábrica de Software",
    location: "UBTech",
    role: "Estagiário & Squad Leader (Back-end)",
    company: "UBTech Office",
    desc: "ESP-PB: gestão de estágios com Django REST Framework, React, Docker e PostgreSQL — Squad Leader do back-end. PM-PB: geoprocessamento com Django, GDAL e Leaflet.",
    photo: "/projetos/esppb.png",
  },
];
