"use client";

import { useTranslations } from "next-intl";
import {
  Clapperboard,
  Cloud,
  Gauge,
  Globe,
  LayoutDashboard,
  LayoutTemplate,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import { Card, SectionHeader } from "@/shared/ui";
import { Reveal } from "@/shared/motion/primitives";

const SERVICES = [
  { icon: Globe, key: "web" },
  { icon: ShoppingCart, key: "ecommerce" },
  { icon: Smartphone, key: "mobile" },
  { icon: LayoutDashboard, key: "systems" },
  { icon: Gauge, key: "performance" },
  { icon: Cloud, key: "devops" },
  { icon: LayoutTemplate, key: "landing" },
  { icon: Clapperboard, key: "video" },
];

export default function HowItWorksSection() {
  const t = useTranslations("HomePage.HowItWorks");

  return (
    <section id="services" className="bg-surface py-24 md:py-32 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-[52px]">
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <Reveal stagger feel="byte" y={48} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {SERVICES.map((service) => (
            <Card
              key={service.key}
              className="p-[24px_20px] flex flex-col items-start gap-[19px] transition-transform hover:scale-[1.02]"
            >
              <div className="w-[52px] h-[52px] bg-ink rounded-full flex items-center justify-center text-primary">
                <service.icon size={24} strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-[11px]">
                <h3 className="text-[20.6px] font-semibold text-fg leading-[1.4]">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-[15.3px] leading-[1.5] text-fg/70 font-medium">
                  {t(`services.${service.key}.description`)}
                </p>
              </div>
            </Card>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
