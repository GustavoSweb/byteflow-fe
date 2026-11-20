import type { StackName } from "@/shared/ui";

export interface ProjectShowcase {
  /** print principal exibido no topo da página do case */
  src: string;
  /** proporção largura/altura do print */
  aspect: string;
  /** domínio mostrado na barra do navegador */
  url?: string;
}

export interface Project {
  key: string;
  slug: string;
  image: string;
  tags: string[];
  /** ícones exibidos na página do case (subconjunto suportado por StackIcon) */
  stack: StackName[];
  url?: string;
  repo?: string;
  showcase: ProjectShowcase;
  /** telas de celular (projetos mobile) */
  screens?: string[];
}

export const PROJECTS: Project[] = [
  {
    key: "futbuynow",
    slug: "futbuynow",
    image: "/projects/project-futbuynow.png",
    tags: ["Next.js", "Node.js", "TypeScript", "Docker"],
    stack: ["Next.js", "React", "Node.js", "TypeScript", "Prisma", "Docker", "Stripe"],
    url: "https://www.futbuynow.com/",
    showcase: { src: "/projects/cases/futbuynow-step01.png", aspect: "1920/961", url: "futbuynow.com" },
  },
  {
    key: "futcustom",
    slug: "futcustom",
    image: "/projects/project-futcustom.png",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Docker"],
    url: "https://futcustom.com/",
    showcase: { src: "/projects/cases/futcustom-step01.png", aspect: "1920/961", url: "futcustom.com" },
  },
  {
    key: "teflyclass",
    slug: "teflyclass",
    image: "/projects/project-tefly-class.png",
    tags: ["Nuxt", "Vue", "Node.js"],
    stack: ["Vue.js", "Node.js"],
    repo: "https://github.com/GustavoSweb/TeflyClass",
    showcase: { src: "/projects/cases/teflyclass-step01.png", aspect: "1920/961", url: "teflyclass" },
  },
  {
    key: "saoJoao",
    slug: "sao-joao-arcoverde",
    image: "/projects/project-sao-joao.png",
    tags: ["React", "TypeScript"],
    stack: ["React", "TypeScript"],
    showcase: { src: "/projects/cases/sao-joao-1.png", aspect: "375/667" },
    screens: ["/projects/cases/sao-joao-1.png", "/projects/cases/sao-joao-2.png", "/projects/cases/sao-joao-3.png"],
  },
  {
    key: "ecommerceBook",
    slug: "ecommerce-book",
    image: "/projects/project-ecommerce-book.png",
    tags: ["Next.js", "Node.js"],
    stack: ["Next.js", "React", "Node.js"],
    showcase: { src: "/projects/cases/ecommerce-book-step01.png", aspect: "1920/961" },
  },
  {
    key: "frontendNews",
    slug: "frontend-news",
    image: "/projects/project-frontend-news.png",
    tags: ["Next.js", "TypeScript"],
    stack: ["Next.js", "React", "TypeScript"],
    showcase: { src: "/projects/project-frontend-news.png", aspect: "845/555" },
  },
  {
    key: "biomedicina",
    slug: "biomedicina-em-acao",
    image: "/projects/project-biomedicina.png",
    tags: ["React"],
    stack: ["React"],
    showcase: { src: "/projects/project-biomedicina.png", aspect: "715/742" },
  },
  {
    key: "startupDesign",
    slug: "startup-design",
    image: "/projects/project-startup.png",
    tags: ["Next.js", "TypeScript"],
    stack: ["Next.js", "React", "TypeScript", "Figma"],
    showcase: { src: "/projects/cases/startup-step01.png", aspect: "1920/961" },
  },
];

export const getProjectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
