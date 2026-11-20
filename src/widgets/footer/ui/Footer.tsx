"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT } from "@/shared/config/contact";
import { Logo } from "@/shared/ui";
import { useLocalePaths } from "@/shared/config/i18n/paths";

const SECTION_LINKS = [
  { key: "services" },
  { key: "work" },
  { key: "about" },
] as const;

const SOCIAL_LINKS = [
  { key: "github", href: CONTACT.github },
  { key: "linkedin", href: CONTACT.linkedin },
  { key: "portfolio", href: CONTACT.portfolio },
] as const;

export const Footer = () => {
  const t = useTranslations("Footer");
  const paths = useLocalePaths();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-ink px-6 pt-24 pb-8 md:px-[60px] flex justify-center border-t border-white/10">
      <div className="w-full max-w-[1200px] flex flex-col gap-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-6 flex flex-col gap-10">
            <Logo href={paths.home()} className="w-fit" />

            <div className="flex flex-col gap-6 max-w-[450px]">
              <div className="flex flex-col gap-3">
                <h4 className="font-display text-[18px] font-bold text-white">{t("contactTitle")}</h4>
                <p className="text-[15px] leading-[1.6] text-white/60 font-medium">{t("contactText")}</p>
              </div>

              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] py-1 pl-1 pr-6 text-[15px] text-white transition-colors hover:bg-white/[0.12]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-fg">
                  <Mail size={18} />
                </span>
                {CONTACT.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <h5 className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">{t("sectionsTitle")}</h5>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {SECTION_LINKS.map(({ key }) => (
                  <li key={key}>
                    <a href={paths.home(key)} className="text-[15px] text-white/50 font-medium hover:text-white transition-colors">
                      {t(`links.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">{t("infoTitle")}</h5>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li>
                  <a href={paths.home("faq")} className="text-[15px] text-white/50 font-medium hover:text-white transition-colors">
                    {t("links.faq")}
                  </a>
                </li>
                <li>
                  <a href={paths.home("contact")} className="text-[15px] text-white/50 font-medium hover:text-white transition-colors">
                    {t("links.contact")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h5 className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">{t("socialTitle")}</h5>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {SOCIAL_LINKS.map(({ key, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[15px] text-white/50 font-medium hover:text-white transition-colors"
                    >
                      {t(`links.${key}`)} <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-white/30 font-medium">{t("copyright", { year })}</p>
          <p className="text-[14px] text-white/30 font-medium">
            {t("builtBy")}{" "}
            <a href={CONTACT.portfolio} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              {CONTACT.founder}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
