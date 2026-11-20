"use client";

import type { ReactNode } from "react";
import { Reveal, SplitReveal } from "@/shared/motion/primitives";
import { cn } from "./cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** `light` = fundo claro (texto escuro); `dark` = fundo escuro (texto claro) */
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}

export const Eyebrow = ({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) => (
  <span
    data-flow-node=""
    className={cn(
      "font-mono text-[12.5px] uppercase tracking-[0.14em]",
      tone === "light" ? "text-primary-dark" : "text-primary",
    )}
  >
    {"// "}
    {children}
  </span>
);

export const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className,
}: SectionHeaderProps) => (
  <div
    className={cn(
      "flex flex-col gap-4",
      align === "center" ? "items-center text-center max-w-[680px] mx-auto" : "items-start text-left",
      className,
    )}
  >
    {eyebrow && (
      <Reveal as="span" y={10}>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
    )}
    <SplitReveal
      as="h2"
      className={cn(
        "font-display font-bold text-[clamp(30px,4.5vw,44px)] tracking-[-0.02em] leading-[1.15]",
        tone === "light" ? "text-fg" : "text-white",
      )}
    >
      {title}
    </SplitReveal>
    {subtitle && (
      <Reveal
        as="p"
        delay={0.15}
        className={cn(
          "text-[16.5px] leading-[1.6] font-medium",
          tone === "light" ? "text-fg/70" : "text-white/75",
        )}
      >
        {subtitle}
      </Reveal>
    )}
  </div>
);
