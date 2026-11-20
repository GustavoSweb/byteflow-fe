import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "light" | "dark";
  children: ReactNode;
}

export const Card = ({ tone = "light", className, children, ...rest }: CardProps) => (
  <div
    className={cn(
      "rounded-card",
      tone === "light" ? "bg-surface-2" : "bg-ink-2 border border-white/10",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);
