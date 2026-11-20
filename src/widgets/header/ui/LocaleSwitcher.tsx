"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { routing } from "@/shared/config/i18n/routing";
import { cn } from "@/shared/ui";

const LABELS: Record<string, { short: string; name: string }> = {
  "pt-BR": { short: "PT", name: "Português" },
  en: { short: "EN", name: "English" },
};

/** Remove o prefixo de idioma do caminho atual ("/en/projetos/x" → "/projetos/x"). */
function stripLocale(pathname: string) {
  for (const locale of routing.locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname || "/";
}

interface LocaleSwitcherProps {
  className?: string;
}

/**
 * Alterna entre PT e EN mantendo a página atual. O link sempre leva o prefixo explícito
 * (/pt-BR/... ou /en/...): o middleware do next-intl grava o cookie do idioma escolhido e,
 * no caso do idioma padrão, redireciona para a URL sem prefixo.
 */
export const LocaleSwitcher = ({ className }: LocaleSwitcherProps) => {
  const t = useTranslations("Header");
  const locale = useLocale();
  const rest = stripLocale(usePathname());

  return (
    <nav
      aria-label={t("language")}
      className={cn("flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] p-1", className)}
    >
      <Globe size={15} className="ml-1.5 mr-0.5 text-white/50" aria-hidden="true" />
      {routing.locales.map((target) => {
        const active = target === locale;
        const href = `/${target}${rest === "/" ? "" : rest}`;
        return (
          <a
            key={target}
            href={href}
            hrefLang={target}
            lang={target}
            aria-current={active ? "true" : undefined}
            aria-label={LABELS[target]?.name ?? target}
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[12px] leading-none transition-colors",
              active ? "bg-primary text-fg" : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            {LABELS[target]?.short ?? target.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
};
