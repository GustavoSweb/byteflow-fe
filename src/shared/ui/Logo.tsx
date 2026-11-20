import { cn } from "./cn";

/*
 * Símbolo ByteFlow — um "B" construído com blocos (bytes): uma haste e dois módulos
 * arredondados, com um byte lima "saindo" do módulo inferior (o fluxo).
 * Grade de 32×32. As formas são geradas como paths para funcionar também no
 * favicon e nas imagens geradas com next/og.
 */

const roundedRect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}` +
  `H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;

export const LOGO_VIEWBOX = "0 0 32 32";

/** Partes do "B" (usadas separadamente na animação do preloader) */
export const LOGO_STEM_PATH = roundedRect(3, 3, 7, 26, 3.5);
export const LOGO_TOP_PATH = roundedRect(12, 3, 12, 11.5, 5.75);
export const LOGO_BOTTOM_PATH = roundedRect(12, 17.5, 12, 11.5, 5.75);

/** Corpo do "B": haste + módulo superior + módulo inferior */
export const LOGO_BODY_PATH = LOGO_STEM_PATH + LOGO_TOP_PATH + LOGO_BOTTOM_PATH;

/** O byte em movimento */
export const LOGO_BYTE_PATH = circle(27.5, 23.25, 3.25);

export const BRAND_COLORS = {
  ink: "#002329",
  primary: "#50C878",
  accent: "#D4F534",
} as const;

interface LogoSymbolProps {
  size?: number;
  /** `true` = símbolo inteiro em `currentColor` (marca d'água, uso monocromático) */
  mono?: boolean;
  className?: string;
}

/** Símbolo oficial da ByteFlow. Colorido por padrão; `mono` usa `currentColor`. */
export const LogoSymbol = ({ size = 24, mono = false, className }: LogoSymbolProps) => (
  <svg
    width={size}
    height={size}
    viewBox={LOGO_VIEWBOX}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={cn("shrink-0", className)}
  >
    <path d={LOGO_BODY_PATH} fill={mono ? "currentColor" : "var(--color-primary)"} />
    <path d={LOGO_BYTE_PATH} fill={mono ? "currentColor" : "var(--color-accent)"} data-logo-byte="" />
  </svg>
);

interface LogoProps {
  /** `light` = para fundos escuros; `dark` = para fundos claros */
  variant?: "light" | "dark";
  href?: string;
  className?: string;
}

export const Logo = ({ variant = "light", href = "/", className }: LogoProps) => (
  <a href={href} aria-label="ByteFlow" className={cn("flex items-center gap-2.5 no-underline shrink-0", className)}>
    <LogoSymbol />
    <span
      className={cn(
        "font-display font-bold text-[20px] md:text-[22px] tracking-[-0.02em] leading-none",
        variant === "light" ? "text-white" : "text-ink",
      )}
    >
      ByteFlow
    </span>
  </a>
);
