export const CONTACT = {
  founder: "Gustavo Rodrigues",
  email: "gustavodasilvama10@gmail.com",
  github: "https://github.com/GustavoSweb",
  linkedin: "https://www.linkedin.com/in/gustavo-rodrigues-5a7551252/",
  portfolio: "https://portifolio-fe-six.vercel.app/pt-BR",
} as const;

export const MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Projeto ByteFlow")}`;
