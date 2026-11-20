import type { ReactNode } from "react";
import { cn } from "./cn";

interface TagProps {
  children: ReactNode;
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}

/** Chip de tecnologia/stack — tipografia mono. Renderiza <li>; use dentro de <ul>. */
export const Tag = ({ children, tone = "light", size = "sm", className }: TagProps) => (
  <li
    className={cn(
      "rounded-full border font-mono",
      size === "sm" ? "px-3 py-1 text-[12px]" : "px-4 py-[6px] text-[13px]",
      tone === "light" ? "border-fg/10 bg-surface-2 text-fg/75" : "border-white/15 bg-white/[0.06] text-white/80",
      className,
    )}
  >
    {children}
  </li>
);
