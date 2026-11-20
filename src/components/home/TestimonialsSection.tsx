"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, SectionHeader } from "@/shared/ui";

const TESTIMONIAL_KEYS = ["jacob", "ethan", "nathan", "daniel", "mitchell", "lucas"];

export default function TestimonialsSection() {
  const t = useTranslations("HomePage.Testimonials");

  return (
    <section className="bg-surface py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-[52px]">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
          {TESTIMONIAL_KEYS.map((key, index) => (
            <Card key={key} className="p-8 flex flex-col gap-6">
              <p className="text-[16px] leading-[1.6] text-fg/80 font-medium italic">
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
                  <h4 className="text-[16px] font-bold text-fg">
                    {t(`testimonials.${key}.name`)}
                  </h4>
                  <p className="text-[14px] text-fg/60 font-medium">
                    {t(`testimonials.${key}.role`)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
