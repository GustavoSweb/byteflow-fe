"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function CtaBannerSection() {
  const t = useTranslations("HomePage.CtaBanner");

  return (
    <section className="bg-white py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] bg-[#0d0d0d] rounded-[40px] p-12 md:p-24 flex flex-col items-center gap-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#50c878]/5 blur-[120px] pointer-events-none" />
        
        <div className="flex flex-col gap-6 max-w-[700px] relative z-10">
          <h2 className="text-[clamp(32px,6vw,52px)] font-bold text-white tracking-tight leading-[1.1]">
            {t("title")}
          </h2>
          <p className="text-[18px] md:text-[20px] leading-[1.6] text-white/70 font-medium">
            {t("subtitle")}
          </p>
        </div>

        <Link
          href="/contact"
          className="bg-[#50c878] text-[#0d0d0d] px-10 py-5 rounded-full font-bold text-[18px] transition-transform hover:scale-105 relative z-10"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
