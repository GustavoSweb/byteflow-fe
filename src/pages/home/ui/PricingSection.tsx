"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";

const OTHERS_KEYS = ["generic", "vanity", "slow", "minimal", "outdated"];
const UPREACH_KEYS = ["custom", "kpis", "support", "tools", "longTerm"];

export default function PricingSection() {
  const t = useTranslations("HomePage.Pricing");

  return (
    <section className="py-[99px] px-[60px] flex justify-center bg-[#002329]">
      <div className="w-full max-w-[1200px] flex flex-col gap-[51px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center text-white">
          <h2 className="text-[clamp(32px,5vw,41.4px)] font-bold tracking-tight leading-[1.28]">
            {t("title")}
          </h2>
          <p className="text-[16.7px] leading-[1.5] font-medium text-white/80">{t("subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
          {/* Others Agencies */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[20px] font-semibold text-white text-center">{t("othersTitle")}</h3>
            <div className="bg-[#002329] border border-white/10 rounded-[24px] py-8 px-6 flex flex-col gap-5">
              {OTHERS_KEYS.map((key, index) => (
                <div key={index} className="flex items-center gap-2">
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

          {/* Upreach */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-2">
              {/* Upreach logo icon */}
              <div className="w-[22px] h-[22px] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M11 2L14 8H20L15.5 12.5L17.5 19L11 15.5L4.5 19L6.5 12.5L2 8H8L11 2Z"
                    fill="#50c878"
                  />
                </svg>
              </div>
              <h3 className="text-[20px] font-semibold text-white">{t("upreachTitle")}</h3>
            </div>
            <div
              className="rounded-[24px] py-8 px-6 flex flex-col gap-5 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(204deg, rgb(51, 130, 77) 0%, rgb(0, 35, 41) 46%, rgb(0, 35, 41) 100%)",
              }}
            >
              {UPREACH_KEYS.map((key, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-none w-[22px] h-[22px] rounded-full border border-[#50c878]/60 flex items-center justify-center">
                    <Check size={12} className="text-[#50c878]" />
                  </div>
                  <span className="text-[15px] font-medium text-white/80">
                    {t(`upreach.${key}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
