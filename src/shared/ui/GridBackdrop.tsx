import { useId } from "react";
import { cn } from "./cn";

interface GridBackdropProps {
  className?: string;
  /**
   * Camada extra, mais brilhante, revelada por uma "lanterna" na posição do cursor.
   * A posição vem das variáveis CSS `--mx`/`--my` definidas por um ancestral.
   */
  interactive?: boolean;
}

const FADE = "radial-gradient(ellipse 70% 60% at 50% 35%, black 0%, transparent 75%)";
const SPOT = "radial-gradient(220px circle at var(--mx, -999px) var(--my, -999px), black 0%, transparent 100%)";

function GridPattern({ id, line, dot, radius }: { id: string; line: number; dot: number; radius: number }) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="white" strokeOpacity={line} strokeWidth="1" />
          <circle cx="0" cy="0" r={radius} fill="var(--color-primary)" fillOpacity={dot} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Fundo decorativo em SVG para seções escuras: grade de linhas finas com pontos nos
 * cruzamentos, esmaecendo nas bordas. Substitui o antigo bg-grid.png + bg-mask.svg.
 */
export const GridBackdrop = ({ className, interactive = false }: GridBackdropProps) => {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="absolute inset-0" style={{ maskImage: FADE, WebkitMaskImage: FADE }}>
        <GridPattern id={`grid-${id}`} line={0.07} dot={0.45} radius={1.4} />
      </div>
      {interactive && (
        <div className="absolute inset-0" style={{ maskImage: SPOT, WebkitMaskImage: SPOT }}>
          <GridPattern id={`grid-hot-${id}`} line={0.22} dot={1} radius={2} />
        </div>
      )}
    </div>
  );
};
