import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Code2, Lock } from "lucide-react";

import CtaBannerSection from "@/components/home/CtaBannerSection";
import { PROJECTS, getProjectBySlug } from "@/components/home/data/projects";
import { localePrefix } from "@/shared/config/i18n/paths";
import { routing } from "@/shared/config/i18n/routing";
import { BrowserFrame, Button, Eyebrow, GridBackdrop, PhoneFrame, StackIcon, Tag } from "@/shared/ui";

type Params = Promise<{ locale: string; slug: string }>;

interface CaseSection {
  label: string;
  text: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PROJECTS.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: "Cases" });
  const tp = await getTranslations({ locale, namespace: "HomePage.LeadCapture" });
  const title = tp(`projects.${project.key}.title`);

  return {
    title: t("metaTitle", { title }),
    description: t(`items.${project.key}.summary`),
    openGraph: { images: [project.showcase.src] },
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "Cases" });
  const tp = await getTranslations({ locale, namespace: "HomePage.LeadCapture" });
  const prefix = localePrefix(locale);

  const title = tp(`projects.${project.key}.title`);
  const badges = tp.raw(`projects.${project.key}.badges`) as string[];
  const sections = t.raw(`items.${project.key}.sections`) as CaseSection[];
  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);
  const isMobile = Boolean(project.screens?.length);

  return (
    <main>
      {/* ── Topo ── */}
      <section className="relative overflow-hidden bg-ink px-6 pt-16 pb-20 md:px-[60px] md:pt-20 md:pb-28">
        <GridBackdrop />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[620px] rounded-full bg-primary/15 blur-[120px]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-12">
          <a
            href={`${prefix || "/"}#work`}
            className="inline-flex w-fit items-center gap-2 font-mono text-[13px] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} /> {t("back")}
          </a>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
              <h1 className="font-display text-[clamp(40px,6vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                {title}
              </h1>
              <p className="max-w-[520px] text-[17px] leading-[1.6] text-white/75">{t(`items.${project.key}.summary`)}</p>

              <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label={t("stack")}>
                {project.tags.map((tag) => (
                  <Tag key={tag} tone="dark" size="md">
                    {tag}
                  </Tag>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.url && (
                  <Button href={project.url} external>
                    {t("visitSite")} <ArrowUpRight size={16} />
                  </Button>
                )}
                {project.repo && (
                  <Button href={project.repo} external variant="ghost">
                    <Code2 size={16} /> {t("viewCode")}
                  </Button>
                )}
                {!project.repo && project.url && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-white/45">
                    <Lock size={13} /> {t("privateRepo")}
                  </span>
                )}
              </div>
            </div>

            {isMobile ? (
              <div className="flex items-end justify-center gap-4">
                {project.screens!.map((src, i) => (
                  <PhoneFrame
                    key={src}
                    src={src}
                    alt={`${title} — ${i + 1}`}
                    sizes="200px"
                    priority={i === 0}
                    className={i === 1 ? "w-[34%] max-w-[200px] -translate-y-6" : "w-[30%] max-w-[180px]"}
                  />
                ))}
              </div>
            ) : (
              <BrowserFrame
                src={project.showcase.src}
                alt={title}
                url={project.showcase.url}
                aspect={project.showcase.aspect}
                sizes="(max-width: 1100px) 90vw, 640px"
                priority
                className="mx-auto w-full max-w-[640px]"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Destaques + stack ── */}
      <section className="border-b border-fg/10 bg-surface px-6 py-12 md:px-[60px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg/50">{t("highlights")}</span>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full bg-ink px-4 py-2 font-mono text-[13.5px] text-accent"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-fg/50">{t("stack")}</span>
            <ul className="m-0 flex list-none flex-wrap items-center gap-4 p-0 text-fg/70">
              {project.stack.map((name) => (
                <li key={name} className="flex items-center gap-2" title={name}>
                  <StackIcon name={name} size={22} />
                  <span className="font-mono text-[12.5px]">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Narrativa: Contexto → Stack & Decisões → Resultado ── */}
      <section className="bg-surface px-6 py-20 md:px-[60px] md:py-28">
        <ol className="m-0 mx-auto flex w-full max-w-[1000px] list-none flex-col gap-14 p-0">
          {sections.map((section, i) => (
            <li key={section.label} className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr] md:gap-12">
              <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
                <span className="font-mono text-[13px] text-primary-dark">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display text-[24px] font-semibold leading-tight text-fg">{section.label}</h2>
              </div>
              <p className="m-0 text-[17px] leading-[1.75] text-fg/75">{section.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Outros projetos ── */}
      <section className="bg-surface-2 px-6 py-20 md:px-[60px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10">
          <h2 className="font-display text-[clamp(26px,3.5vw,34px)] font-bold tracking-[-0.02em] text-fg">{t("moreTitle")}</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
            {others.map((other) => {
              const otherTitle = tp(`projects.${other.key}.title`);
              return (
                <li key={other.slug}>
                  <a href={`${prefix}/projetos/${other.slug}`} className="group flex flex-col gap-4">
                    <div className="relative h-[220px] overflow-hidden rounded-card bg-surface">
                      <Image
                        src={other.image}
                        alt={otherTitle}
                        fill
                        sizes="(max-width: 768px) 90vw, 380px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-[20px] font-semibold text-fg">{otherTitle}</h3>
                      <ArrowUpRight size={18} className="text-primary-dark transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBannerSection />
    </main>
  );
}
