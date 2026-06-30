"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Smile, Heart, TrendingUp, ArrowUp } from "lucide-react";

import bgGrid from "./assets/images/bg-grid.png";
import bgMask from "./assets/images/bg-mask.svg";
import heroImage from "./assets/images/hero-image.png";
import logo1 from "./assets/images/logo-1.svg";
import logo2 from "./assets/images/logo-2.svg";

const BRAND_LOGOS = [logo1, logo2, logo1, logo2, logo1, logo2];

export default function HeroSection() {
  const t = useTranslations("HomePage.Hero");

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#002329] flex items-center justify-center px-6 py-24 md:px-[60px] md:py-[152px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-[60px] h-[696px] opacity-[0.12]"
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
          <Image src={bgGrid} alt="" fill className="object-cover object-top" priority />
        </div>
      </div>

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-10 lg:w-[588px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-semibold text-white leading-tight tracking-[-1.2px] text-[clamp(36px,5vw,57.4px)]">
              {t("title")}
            </h1>
            <p className="max-w-[500px] text-[rgba(255,255,255,0.75)] text-[16.5px] leading-[1.53]">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-24">
            <div className="flex flex-wrap gap-3">
              <Link
                href="#book"
                className="inline-flex items-center justify-center rounded-full bg-[#50c878] px-7 py-[10px] text-[17px] font-medium text-[#0d0d0d] transition-opacity hover:opacity-90"
              >
                {t("bookCall")}
              </Link>
              <button
                className="inline-flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.12)] px-7 py-[10px] text-[16.7px] font-normal text-white backdrop-blur-[4px] transition-colors hover:bg-[rgba(255,255,255,0.2)]"
                type="button"
              >
                {t("learnMore")}
              </button>
            </div>

            <div className="relative h-[55px] w-full max-w-[450px] overflow-hidden">
              <div
                className="absolute inset-0 flex items-center"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
              >
                <div className="flex animate-[ticker_12s_linear_infinite] items-center gap-12 whitespace-nowrap opacity-60">
                  {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
                    <div key={i} className="relative h-[23px] w-[100px] shrink-0">
                      <Image
                        src={logo}
                        alt={`Brand logo ${(i % BRAND_LOGOS.length) + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative shrink-0 mt-8 lg:mt-0">
          <div className="relative h-[350px] w-[280px] sm:h-[400px] sm:w-[320px] overflow-hidden rounded-3xl md:h-[512px] md:w-[404px]">
            <Image
              src={heroImage}
              alt="Business professional"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4 flex h-[40px] w-[40px] md:h-[55px] md:w-[55px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.12)] backdrop-blur-[8px] text-white">
            <Smile size={24} className="md:w-[30px] md:h-[30px]" />
          </div>

          <div className="absolute bottom-[120px] -left-2 md:bottom-[137px] md:-left-[60px] flex items-center gap-2 md:gap-3 rounded-[10px] md:rounded-[14px] bg-[rgba(255,255,255,0.12)] px-3 md:px-4 py-2 md:py-[15px] backdrop-blur-[8px] scale-90 md:scale-100">
            <Heart size={16} className="text-[#50c878] md:w-5 md:h-5" fill="#50c878" />
            <span className="whitespace-nowrap text-[12px] md:text-[14.6px] text-white">{t("successStories")}</span>
          </div>

          <div className="absolute -left-2 md:-left-[60px] bottom-4 md:bottom-6 flex items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl bg-[rgba(255,255,255,0.12)] p-3 md:p-4 backdrop-blur-[8px] scale-90 md:scale-100 origin-bottom-left">
            <div className="relative flex h-[32px] w-[32px] md:h-[44px] md:w-[44px] shrink-0 items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.12)] text-[#50c878]">
              <TrendingUp size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col gap-0.5 md:gap-1">
              <span className="whitespace-nowrap text-[11px] md:text-[14.9px] text-white">
                {t("growthMission")}
              </span>
              <div className="flex items-center gap-1.5">
                <ArrowUp size={14} className="text-[#50c878] md:w-[18px] md:h-[18px]" />
                <span className="text-[14px] md:text-[18px] font-semibold text-white">+65%</span>
                <span className="text-[11px] md:text-[15px] text-[rgba(255,255,255,0.75)]">{t("roiBoost")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
