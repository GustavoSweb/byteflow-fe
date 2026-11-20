"use client";

import { useTranslations } from "next-intl";
import { MAILTO } from "@/shared/config/contact";
import { Button, Eyebrow, LogoSymbol } from "@/shared/ui";
import { Magnetic, Reveal, SplitReveal } from "@/shared/motion/primitives";

export default function CtaBannerSection() {
  const t = useTranslations("HomePage.CtaBanner");

  return (
    <section id="contact" className="bg-surface py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] bg-ink rounded-panel p-12 md:p-24 flex flex-col items-center gap-10 text-center relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-primary/25 blur-[100px] pointer-events-none" />
        <LogoSymbol size={240} mono className="absolute -right-10 -bottom-12 text-white/[0.04] pointer-events-none" />

        <div className="flex flex-col items-center gap-6 max-w-[700px] relative z-10">
          <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
          <SplitReveal as="h2" className="font-display text-[clamp(32px,6vw,56px)] font-bold text-white tracking-[-0.03em] leading-[1.05]">
            {t("title")}
          </SplitReveal>
          <Reveal as="p" delay={0.2} className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 font-medium">{t("subtitle")}</Reveal>
        </div>

        <span data-flow-end="" className="relative z-10 inline-block rounded-full">
          <Magnetic>
          <Button href={MAILTO} size="lg" className="relative z-10 transition-transform hover:scale-105">
          {t("cta")}
        </Button>
          </Magnetic>
        </span>
      </div>
    </section>
  );
}
