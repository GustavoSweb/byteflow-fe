"use client";

import { useTranslations } from "next-intl";

export default function BenefitsSection() {
  const t = useTranslations("HomePage.Benefits");

  return (
    <section className="bg-white px-6 py-24 md:px-[60px] md:py-[152px] relative flex items-center justify-center overflow-hidden w-full">
      <div className="absolute bottom-[-59px] left-1/2 -translate-x-1/2 w-[300px] md:w-[581px] h-[118px] bg-[#5cf28e] blur-[37.5px] opacity-30 rounded-full z-0 pointer-events-none" />
      
      <div className="max-w-[1200px] w-full flex flex-col items-center justify-center relative z-[1]">
        <h2 className="max-w-[1000px] text-center text-black/70 text-[clamp(24px,5vw,40px)] font-bold leading-[1.32] tracking-[-0.44px] m-0">
          {t("title")}
        </h2>
      </div>
    </section>
  );
}
