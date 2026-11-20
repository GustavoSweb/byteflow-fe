import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://byteflow-fe.vercel.app"),
  title: "ByteFlow — Software sob medida",
  description: "ByteFlow — desenvolvimento de software sob medida: sites, e-commerces, apps e sistemas.",
  openGraph: {
    title: "ByteFlow — Software sob medida",
    description: "Sites, e-commerces, apps e sistemas com Next.js, React e Node.js — do design ao deploy.",
    siteName: "ByteFlow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca o <html> antes da 1ª pintura: habilita estados iniciais das animações e decide o preloader. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

/**
 * - `js-motion`: JS ativo → elementos marcados com `data-hero-hide` começam ocultos até a animação;
 * - `reduced`: prefers-reduced-motion → nada fica oculto e nada anima;
 * - `intro`: 1ª visita na sessão → mostra o preloader;
 * - segurança: se o JS de animação não subir em 4s, remove as classes e mostra tudo.
 */
const MOTION_BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js-motion');var r=false;try{r=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}if(r){d.classList.add('reduced')}else{try{if(!sessionStorage.getItem('bf-intro'))d.classList.add('intro')}catch(e){}}setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js-motion','intro')},4000)})();`;
