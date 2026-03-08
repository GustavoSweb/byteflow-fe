"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"];

export default function FaqSection() {
  const t = useTranslations("HomePage.Faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-[52px]">
        <div className="flex flex-col items-center gap-[15px] text-center">
          <h2 className="text-[clamp(32px,5vw,41.1px)] font-bold text-[#0d0d0d] tracking-tight leading-[1.28]">
            {t("title")}
          </h2>
          <p className="text-[16.7px] leading-[1.5] text-[#0d0d0d]/70 font-medium">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-[800px] mx-auto">
          {FAQ_KEYS.map((key, index) => (
            <div
              key={index}
              className="bg-[#f5f5f5] rounded-[20px] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <span className="text-[18px] font-bold text-[#0d0d0d]">
                  {t(`questions.${key}.question`)}
                </span>
                <div className={`w-6 h-6 rounded-full border border-[#0d0d0d]/10 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown size={16} className="text-[#0d0d0d]" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[200px] p-6 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-[16px] leading-[1.6] text-[#0d0d0d]/70 font-medium">
                  {t(`questions.${key}.answer`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
