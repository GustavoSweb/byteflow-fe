"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { useLocalePaths } from "@/shared/config/i18n/paths";
import { SectionHeader, Tag } from "@/shared/ui";
import { Reveal } from "@/shared/motion/primitives";
import { PROJECTS } from "./data/projects";

const linkClass =
  "inline-flex items-center gap-1 text-[14.5px] font-semibold text-primary-dark hover:text-ink transition-colors";

export default function LeadCapture() {
  const t = useTranslations("HomePage.LeadCapture");
  const paths = useLocalePaths();
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    loop: false,
  });

  return (
    <section id="work" className="bg-surface py-24 md:py-32 flex flex-col items-center">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        className="px-6 md:px-[60px] mb-[52px]"
      />

      <div
        className="relative w-full max-w-[1200px]"
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
        <div ref={emblaRef} className="overflow-hidden">
          <Reveal stagger x={80} y={0} className="flex gap-[18px] px-6 md:px-[60px] pb-4">
            {PROJECTS.map((project) => {
              const title = t(`projects.${project.key}.title`);
              const caseHref = paths.to(`/projetos/${project.slug}`);
              return (
                <article key={project.key} className="flex-none w-[300px] sm:w-[344px] flex flex-col gap-[19px]">
                  <a href={caseHref} data-cursor-label={`${t("viewCase")} →`} aria-label={`${t("viewCase")}: ${title}`} className="relative block h-[325px] w-full rounded-card overflow-hidden group bg-surface-2">
                    <Image
                      src={project.image}
                      alt={title}
                      fill
                      sizes="344px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2 items-center">
                      {(t.raw(`projects.${project.key}.badges`) as string[]).map((badge) => (
                        <div
                          key={badge}
                          className="backdrop-blur-[4px] bg-ink/40 border border-white/20 rounded-full px-5 py-[6px] font-mono text-white text-[13px] whitespace-nowrap"
                        >
                          {badge}
                        </div>
                      ))}
                    </div>
                  </a>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[21px] font-semibold text-fg leading-[1.4]">
                      <a href={caseHref} className="hover:text-primary-dark transition-colors">
                        {title}
                      </a>
                    </h3>
                    <p className="text-[15.1px] leading-[1.5] text-fg/70 font-medium">
                      {t(`projects.${project.key}.description`)}
                    </p>
                    <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-4 pt-1">
                        <a href={caseHref} className={linkClass}>
                          {t("viewCase")} <ArrowRight size={16} />
                        </a>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            {t("visitSite")} <ArrowUpRight size={16} />
                          </a>
                        )}
                        {project.repo && (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            <Code2 size={16} /> {t("viewCode")}
                          </a>
                        )}
                      </div>
                  </div>
                </article>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
