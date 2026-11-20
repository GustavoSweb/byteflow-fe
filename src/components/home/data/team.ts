import { CONTACT } from "@/shared/config/contact";

export interface TeamLink {
  /** chave de tradução em HomePage.About.links */
  key: "portfolio" | "github" | "linkedin" | "workana";
  href: string;
}

export interface TeamMember {
  key: "gustavo" | "edson";
  name: string;
  photo: string;
  /** posição do recorte da foto (object-position) */
  photoPosition: string;
  /** zoom opcional da foto, ancorado em `photoOrigin` (transform-origin) */
  photoZoom?: number;
  photoOrigin?: string;
  skills: string[];
  links: TeamLink[];
  /** selo opcional, ex.: avaliação em plataforma */
  rating?: { value: number; count: number; platform: string };
}

export const TEAM: TeamMember[] = [
  {
    key: "gustavo",
    name: CONTACT.founder,
    photo: "/team/gustavo.png",
    // foto vertical com o Gustavo na borda direita: o corte pega cabeça, ombro e o monitor
    photoPosition: "center 26%",
    skills: ["TypeScript", "React", "Next.js", "Vue / Nuxt", "Node.js", "Prisma", "PostgreSQL", "Docker", "Kubernetes", "AWS"],
    links: [
      { key: "portfolio", href: CONTACT.portfolio },
      { key: "github", href: CONTACT.github },
      { key: "linkedin", href: CONTACT.linkedin },
    ],
  },
  {
    key: "edson",
    name: "Edson Luis",
    photo: "/team/edson.webp",
    photoPosition: "center 22%",
    skills: ["React", "Next.js", "Node.js", "WordPress", "Elementor", "Adobe Premiere", "Photoshop", "Illustrator", "Motion Graphics"],
    links: [{ key: "workana", href: "https://www.workana.com/freelancer/0ba3fc7d730d4e14bc56ad053a605c5e" }],
    rating: { value: 4.87, count: 17, platform: "Workana" },
  },
];
