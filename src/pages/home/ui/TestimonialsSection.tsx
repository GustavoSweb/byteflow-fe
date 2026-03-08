"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const TESTIMONIAL_KEYS = ["jacob", "ethan", "nathan", "daniel", "mitchell", "lucas"];

export default function TestimonialsSection() {
  const t = useTranslations("HomePage.Testimonials");

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
          {TESTIMONIAL_KEYS.map((key, index) => (
            <div
              key={index}
              className="bg-[#f5f5f5] rounded-[24px] p-8 flex flex-col gap-6"
            >
              <p className="text-[16px] leading-[1.6] text-[#0d0d0d]/80 font-medium italic">
                &ldquo;{t(`testimonials.${key}.text`)}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image
                    src={`https://i.pravatar.cc/150?u=${key}`}
                    alt={t(`testimonials.${key}.name`)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[16px] font-bold text-[#0d0d0d]">
                    {t(`testimonials.${key}.name`)}
                  </h4>
                  <p className="text-[14px] text-[#0d0d0d]/60 font-medium">
                    {t(`testimonials.${key}.role`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
