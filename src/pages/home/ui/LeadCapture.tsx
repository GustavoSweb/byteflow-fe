"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import project1 from "../assets/images/project-1.jpg";
import project2 from "../assets/images/project-2.jpg";
import project3 from "../assets/images/project-3.jpg";
import project4 from "../assets/images/project-4.jpg";

const PROJECTS = [
  { image: project1, key: "growth360" },
  { image: project2, key: "pureglow" },
  { image: project3, key: "urbanfit" },
  { image: project4, key: "chronolux" },
];

export default function LeadCapture() {
  const t = useTranslations("HomePage.LeadCapture");
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: false,
  });

  return (
    <section className="bg-white py-24 flex flex-col items-center">
      <div className="flex flex-col items-center gap-[15px] text-center px-6 md:px-[60px] mb-[52px] max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(32px,5vw,41.1px)] font-bold text-[#0d0d0d] tracking-tight leading-[1.28]">
          {t("title")}
        </h2>
        <p className="text-[16.7px] leading-[1.5] text-[#0d0d0d]/70 font-medium">{t("subtitle")}</p>
      </div>

      <div
        className="relative max-w-[1200px]"
        style={
          {
            "--gradient-size": "120px",
            maskImage:
              "linear-gradient(to right, transparent 0%, black var(--gradient-size), black calc(100% - var(--gradient-size)), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black var(--gradient-size), black calc(100% - var(--gradient-size)), transparent 100%)",
          } as React.CSSProperties
        }
      >
        <div ref={emblaRef} className="overflow-hidden ">
          <div className="flex gap-[18px] px-6 md:px-[60px] pb-4">
            {PROJECTS.map((project, index) => (
              <div key={index} className="flex-none w-[344px] flex flex-col gap-[19px]">
                <div className="relative h-[325px] w-full rounded-[24px] overflow-hidden group">
                  <Image
                    src={project.image}
                    alt={t(`projects.${project.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2 items-center">
                    {t
                      .raw(`projects.${project.key}.badges`)
                      .map((badge: string, bIndex: number) => (
                        <div
                          key={bIndex}
                          className="backdrop-blur-[4px] bg-[#0d0d0d]/20 border border-white/20 rounded-full px-6 py-[6px] text-white text-[14.4px] font-medium whitespace-nowrap shadow-sm"
                        >
                          {badge}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[20.8px] font-medium text-[#0d0d0d] leading-[1.48]">
                    {t(`projects.${project.key}.title`)}
                  </h3>
                  <p className="text-[15.1px] leading-[1.48] text-[#0d0d0d]/70 font-medium max-w-[310px]">
                    {t(`projects.${project.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
