"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/shared/ui";
import { Reveal } from "@/shared/motion/primitives";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"];

export default function FaqSection() {
  const t = useTranslations("HomePage.Faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface py-24 md:py-32 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-[52px]">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <Reveal stagger={0.06} y={24} className="flex flex-col gap-4 w-full max-w-[800px] mx-auto">
          {FAQ_KEYS.map((key, index) => (
            <div
              key={key}
              className="bg-surface-2 rounded-tile overflow-hidden transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <span className="font-display text-[18px] font-semibold text-fg">
                  {t(`questions.${key}.question`)}
                </span>
                <div className={`w-6 h-6 rounded-full border border-fg/10 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown size={16} className="text-fg" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[200px] p-6 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-[16px] leading-[1.6] text-fg/70 font-medium">
                  {t(`questions.${key}.answer`)}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
