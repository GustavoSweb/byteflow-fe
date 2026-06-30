"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play, TrendingUp, Star } from "lucide-react";

import bgGrid from "./assets/images/bg-grid.png";
import bgMask from "./assets/images/bg-mask.svg";
import videoThumb from "./assets/images/video-thumb.png";

const STAT_KEYS = ["successRate", "campaignsLaunched", "revenueGenerated"];

export default function WhyChooseUs() {
  const t = useTranslations("HomePage.WhyChooseUs");

  return (
    <section className="relative w-full overflow-hidden bg-[#002329] px-6 py-[100px] md:px-[60px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[982px] opacity-[0.12]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url('${bgMask}')`,
            maskImage: `url('${bgMask}')`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <Image src={bgGrid} alt="" fill className="object-cover" priority />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 md:gap-[72px]">
        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.44px] text-white leading-tight">
            {t("title")}
          </h2>
          <p className="max-w-[500px] text-[14px] md:text-[14.9px] leading-[1.6] md:leading-[1.72] text-[rgba(255,255,255,0.75)]">
            {t("subtitle")}
          </p>
        </div>

        {/* ── Video card ── */}
        <div className="relative w-full max-w-[840px] px-4 md:px-0">
          {/* Card with border */}
          <div className="overflow-hidden rounded-[24px] md:rounded-[40px] bg-[rgba(255,255,255,0.12)] p-2 md:p-[10px]">
            <div className="relative h-[200px] sm:h-[260px] overflow-hidden rounded-[18px] md:rounded-[32px] md:h-[432px]">
              <Image
                src={videoThumb}
                alt="Team meeting — inside our process"
                fill
                className="object-cover object-center"
              />

              {/* Play button overlay */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 md:gap-2 rounded-full bg-[#50c878] px-4 md:px-6 py-2 md:py-3 text-[14px] md:text-[16.7px] font-medium text-[#0d0d0d] transition-opacity hover:opacity-90 whitespace-nowrap"
                >
                  <Play size={16} fill="currentColor" className="md:w-5 md:h-5" />
                  {t("cta")}
                </button>
              </div>
            </div>
          </div>

          {/* Growth-Driven badge (top-right) */}
          <div className="absolute -right-2 -top-4 md:right-[52px] md:top-[42px] flex flex-col items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl bg-[rgba(255,255,255,0.2)] p-3 md:p-4 backdrop-blur-[8px] z-20 scale-75 md:scale-100">
            <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.12)] text-white">
              <TrendingUp size={18} className="md:w-6 md:h-6" />
            </div>
            <div className="text-center">
              <p className="whitespace-nowrap text-[15px] md:text-[17px] font-semibold text-white">
                {t("growthDriven.title")}
              </p>
              <p className="whitespace-nowrap text-[12px] md:text-[14.6px] text-[rgba(255,255,255,0.75)]">
                {t("growthDriven.subtitle")}
              </p>
            </div>
          </div>

          {/* 10+ Years badge (bottom-left) */}
          <div className="absolute -bottom-4 -left-2 md:bottom-[92px] md:left-[52px] flex items-center gap-2 md:gap-3 rounded-[12px] md:rounded-[14px] bg-[rgba(255,255,255,0.2)] px-3 md:px-4 py-3 md:py-[15px] backdrop-blur-[8px] z-20 scale-75 md:scale-100 origin-bottom-left">
            <Star size={20} className="text-[#50c878] md:w-5 md:h-5" fill="#50c878" />
            <span className="whitespace-nowrap text-[13px] md:text-[14.6px] text-white">
              {t("experience")}
            </span>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="flex flex-wrap items-center justify-center gap-y-10 md:gap-0 w-full">
          {STAT_KEYS.map((key, i) => (
            <div
              key={key}
              className={`flex flex-col items-center gap-1 px-6 w-1/2 md:w-[232px] ${
                i < STAT_KEYS.length - 1 ? "md:border-r md:border-[rgba(255,255,255,0.15)]" : ""
              }`}
            >
              <span className="text-[28px] md:text-[clamp(28px,4vw,36px)] font-bold text-white">
                {t(`stats.${key}.value`)}
              </span>
              <span className="text-[14px] md:text-[16px] text-[rgba(255,255,255,0.75)] text-center">
                {t(`stats.${key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
