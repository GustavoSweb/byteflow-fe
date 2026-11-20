"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { LogoSymbol, SectionHeader } from "@/shared/ui";
import { Reveal } from "@/shared/motion/primitives";

const OTHERS_KEYS = ["generic", "vanity", "slow", "minimal", "outdated"];
const BYTEFLOW_KEYS = ["custom", "kpis", "support", "tools", "longTerm"];

export default function PricingSection() {
  const t = useTranslations("HomePage.Pricing");

  return (
    <section className="py-24 md:py-32 px-6 md:px-[60px] flex justify-center bg-ink">
      <div className="w-full max-w-[1200px] flex flex-col gap-[51px]">
        {/* Header */}
        <SectionHeader tone="dark" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        {/* Cards */}
        <Reveal stagger={0.15} y={40} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
          {/* Typical development */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-[20px] font-semibold text-white text-center">{t("othersTitle")}</h3>
            <div className="bg-ink-2/40 border border-white/10 rounded-card py-8 px-6 flex flex-col gap-5">
              {OTHERS_KEYS.map((key, index) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="flex-none w-[22px] h-[22px] rounded-full border border-white/20 flex items-center justify-center">
                    <X size={12} className="text-white/50" />
                  </div>
                  <span className="text-[15px] font-medium text-white/70">
                    {t(`others.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ByteFlow */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-2">
              <LogoSymbol />
              <h3 className="font-display text-[20px] font-semibold text-white">{t("upreachTitle")}</h3>
            </div>
            <div
              className="rounded-card py-8 px-6 flex flex-col gap-5 relative border border-primary/30 overflow-hidden"
              style={{
                background:
                  "linear-gradient(204deg, var(--color-primary-dark) 0%, var(--color-ink) 46%, var(--color-ink) 100%)",
              }}
            >
              {BYTEFLOW_KEYS.map((key, index) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="flex-none w-[22px] h-[22px] rounded-full border border-primary/60 flex items-center justify-center">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span className="text-[15px] font-medium text-white/80">
                    {t(`upreach.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
