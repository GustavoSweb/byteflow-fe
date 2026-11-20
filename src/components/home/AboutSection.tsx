"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight, Mail, Star } from "lucide-react";
import { CONTACT } from "@/shared/config/contact";
import { Button, Card, Eyebrow, Tag } from "@/shared/ui";
import { TEAM } from "./data/team";
import { Reveal, SplitReveal } from "@/shared/motion/primitives";

export default function AboutSection() {
  const t = useTranslations("HomePage.About");
  const locale = useLocale();

  return (
    <section id="about" className="bg-surface py-24 md:py-32 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex max-w-[640px] flex-col gap-4">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SplitReveal as="h2" className="font-display text-[clamp(30px,4.5vw,44px)] font-bold text-fg tracking-[-0.02em] leading-[1.15]">
              {t("title")}
            </SplitReveal>
            <p className="text-[16.5px] leading-[1.65] text-fg/70 font-medium">{t("intro")}</p>
          </div>
          <Button href={`mailto:${CONTACT.email}`} className="w-fit shrink-0">
            <Mail size={18} /> {t("links.email")}
          </Button>
        </div>

        <Reveal as="ul" stagger={0.15} y={60} className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
          {TEAM.map((member) => (
            <li key={member.key}>
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative h-[340px] w-full bg-ink">
                  <Image
                    src={member.photo}
                    alt={t(`members.${member.key}.photoAlt`)}
                    fill
                    sizes="(max-width: 768px) 90vw, 580px"
                    className="object-cover"
                    style={{ objectPosition: member.photoPosition }}
                  />
                  <div className="absolute left-4 bottom-4 flex max-w-[calc(100%-2rem)] flex-col rounded-2xl bg-ink/75 px-5 py-4 backdrop-blur-[8px]">
                    <p className="font-display text-[19px] font-semibold text-white">{member.name}</p>
                    <p className="font-mono text-[12.5px] text-primary">{t(`members.${member.key}.role`)}</p>
                  </div>
                  {member.rating && (
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1.5 backdrop-blur-[8px]">
                        <Star size={14} className="text-accent" fill="currentColor" />
                        <span className="font-mono text-[12.5px] text-white">
                          {member.rating.value.toLocaleString(locale, { minimumFractionDigits: 2 })}
                          <span className="text-white/60">
                            {" "}
                            · {t("ratingCount", { count: member.rating.count, platform: member.rating.platform })}
                          </span>
                        </span>
                      </div>
                    )}
                </div>

                <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                  <p className="m-0 text-[16px] leading-[1.65] text-fg/75 font-medium">{t(`members.${member.key}.bio`)}</p>

                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label={t("stackLabel")}>
                    {member.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3">
                    {member.links.map(({ key, href }) => (
                      <Button key={key} href={href} external variant="outline">
                        {t(`links.${key}`)} <ArrowUpRight size={16} />
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
