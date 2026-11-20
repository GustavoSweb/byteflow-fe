import { useLocale } from "next-intl";
import { routing } from "./routing";

/** Prefixo de URL do idioma atual ("" para o idioma padrão, "/en" para inglês). */
export const localePrefix = (locale: string) => (locale === routing.defaultLocale ? "" : `/${locale}`);

/**
 * Links que funcionam tanto na home quanto em páginas internas:
 * `home("services")` → "/#services" (pt-BR) ou "/en#services" (en);
 * `to("/projetos/futcustom")` → "/projetos/futcustom" ou "/en/projetos/futcustom".
 */
export function useLocalePaths() {
  const prefix = localePrefix(useLocale());
  return {
    home: (hash?: string) => `${prefix || "/"}${hash ? `#${hash}` : ""}`,
    to: (path: string) => `${prefix}${path}`,
  };
}
