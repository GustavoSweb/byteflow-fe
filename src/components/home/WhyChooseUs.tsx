"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Code2, PenTool, Rocket, Search } from "lucide-react";
import { GridBackdrop, SectionHeader } from "@/shared/ui";
import { Counter, Reveal } from "@/shared/motion/primitives";
import { useMotion } from "@/shared/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/motion/gsap";

const STAT_KEYS = ["experienceYears", "projectsDelivered", "fasterResponse"];

const STEPS = [
  { key: "discovery", icon: Search },
  { key: "design", icon: PenTool },
  { key: "build", icon: Code2 },
  { key: "deploy", icon: Rocket },
];

/* Tempos reais do sitemap da FutBuyNow (antes × depois da otimização) */
const RACE = { before: 30, after: 2.8 };

export default function WhyChooseUs() {
  const t = useTranslations("HomePage.WhyChooseUs");
  const locale = useLocale();
  const section = useRef<HTMLElement>(null);
  const { reduced } = useMotion();

  const fmt = (n: number) =>
    `${n.toLocaleString(locale, { minimumFractionDigits: n % 1 ? 1 : 0, maximumFractionDigits: 1 })}s`;

  useGSAP(
    () => {
      const root = section.current;
      if (!root || reduced) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      /* ── Processo: pipeline fixado com rolagem horizontal (desktop) ── */
      mm.add("(min-width: 1100px)", () => {
        const wrap = q("[data-process]")[0] as HTMLElement;
        const track = q("[data-process-track]")[0] as HTMLElement;
        const cards = q("[data-step]") as HTMLElement[];
        const fill = q("[data-process-fill]")[0];
        if (!wrap || !track) return;

        track.setAttribute("data-hscroll", "");
        const typed = new Set<number>();
        let current = -1;

        const typeLog = (i: number) => {
          if (typed.has(i)) return;
          typed.add(i);
          const lines = cards[i].querySelectorAll<HTMLElement>("[data-log-line]");
          const tl = gsap.timeline();
          lines.forEach((line) => {
            tl.to(line, { text: { value: line.dataset.text ?? "" }, duration: 0.45, ease: "none" });
          });
        };
        const activate = (i: number) => {
          if (i === current) return;
          current = i;
          cards.forEach((card, idx) => {
            card.toggleAttribute("data-active", idx === i);
            card.toggleAttribute("data-done", idx < i);
          });
          typeLog(i);
        };

        // logs começam vazios e são "digitados" quando a etapa fica ativa
        q("[data-log-line]").forEach((line) => gsap.set(line, { text: "" }));
        activate(0);

        const distance = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "center center",
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            pin: true,
            pinSpacing: true, // o pai é flex: sem isso o ScrollTrigger não reserva espaço e o conteúdo seguinte sobe por cima
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              activate(Math.min(cards.length - 1, Math.floor(self.progress * cards.length * 0.999)));
              if (fill) gsap.set(fill, { scaleX: self.progress });
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          track.removeAttribute("data-hscroll");
          cards.forEach((c) => {
            c.removeAttribute("data-active");
            c.removeAttribute("data-done");
          });
          q("[data-log-line]").forEach((line) => {
            line.textContent = line.dataset.text ?? "";
          });
        };
      });

      /* ── Corrida de barras: 30s × 2,8s ── */
      const race = q("[data-race]")[0];
      if (race) {
        const scale = 0.1; // 30s reais viram 3s de animação; 2,8s viram 0,28s
        const before = { v: 0 };
        const after = { v: 0 };
        const beforeLabel = q("[data-race-before-time]")[0];
        const afterLabel = q("[data-race-after-time]")[0];
        const badge = q("[data-race-badge]")[0];
        const tl = gsap.timeline({
          scrollTrigger: { trigger: race, start: "top 80%", once: true },
          defaults: { ease: "none" },
        });
        tl.fromTo(q("[data-race-before]"), { scaleX: 0 }, { scaleX: 1, duration: RACE.before * scale }, 0)
          .to(before, { v: RACE.before, duration: RACE.before * scale, onUpdate: () => (beforeLabel.textContent = fmt(Math.round(before.v * 10) / 10)) }, 0)
          .fromTo(q("[data-race-after]"), { scaleX: 0 }, { scaleX: 1, duration: RACE.after * scale * 2.2, ease: "power2.out" }, 0.25)
          .to(after, { v: RACE.after, duration: RACE.after * scale * 2.2, onUpdate: () => (afterLabel.textContent = fmt(Math.round(after.v * 10) / 10)) }, 0.25)
          .fromTo(badge, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2.5)" }, 0.95);
      }

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: section, dependencies: [reduced, locale], revertOnUpdate: true },
  );

  return (
    <section ref={section} className="relative w-full overflow-hidden bg-ink px-6 py-24 md:py-32 md:px-[60px]">
      <GridBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 md:gap-[72px]">
        <SectionHeader tone="dark" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} className="px-4" />

        {/* ── Processo: Descoberta → Design → Desenvolvimento → Deploy ── */}
        <div data-process="" className="w-full">
          <h3 className="sr-only">{t("process.title")}</h3>
          <Reveal
            as="ol"
            stagger
            feel="byte"
            y={48}
            data-process-track=""
            className="process-track relative m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* linha de fluxo ligando as etapas + preenchimento conforme o progresso */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[6%] right-[6%] top-[46px] hidden h-px bg-white/10 lg:block"
            >
              <span
                data-process-fill=""
                className="absolute inset-0 origin-left bg-gradient-to-r from-primary via-primary to-accent"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
            {STEPS.map(({ key, icon: Icon }, i) => (
              <li
                key={key}
                data-step=""
                className="process-step relative flex flex-col gap-4 rounded-card border border-white/10 bg-ink-2/70 p-6 backdrop-blur-[6px] transition-[border-color,background-color,box-shadow] duration-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-fg">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[12px] text-white/40">0{i + 1}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-display text-[19px] font-semibold text-white">{t(`process.steps.${key}.title`)}</p>
                  <p className="text-[14.5px] leading-[1.6] text-white/70">{t(`process.steps.${key}.description`)}</p>
                </div>
                <div className="mt-auto rounded-chip border border-white/[0.06] bg-ink/60 px-3 py-2.5 font-mono text-[11.5px] leading-[1.7]">
                  {(t.raw(`process.steps.${key}.log`) as string[]).map((line, idx) => (
                    <p
                      key={idx}
                      data-log-line=""
                      data-text={line}
                      className={`m-0 min-h-[1.7em] whitespace-pre ${idx === 0 ? "text-white/50" : "text-primary"}`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        {/* ── Números ── */}
        <div className="flex flex-wrap items-center justify-center gap-y-10 md:gap-0 w-full">
          {STAT_KEYS.map((key, i) => (
            <div
              key={key}
              className={`flex flex-col items-center gap-1 px-6 w-1/2 md:w-[232px] ${
                i < STAT_KEYS.length - 1 ? "md:border-r md:border-white/15" : ""
              }`}
            >
              <Counter value={t(`stats.${key}.value`)} className="font-display text-[28px] md:text-[clamp(28px,4vw,40px)] font-bold text-accent" />
              <span className="text-[14px] md:text-[16px] text-white/75 text-center">{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>

        {/* ── Corrida: o "10x" na prática ── */}
        <div data-race="" className="relative w-full max-w-[760px] rounded-card border border-white/10 bg-ink-2/60 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <p className="m-0 font-display text-[17px] font-semibold text-white">{t("race.title")}</p>
            <span className="font-mono text-[12px] text-white/40">{t("race.caption")}</span>
          </div>
          <div className="flex flex-col gap-4">
            {(["before", "after"] as const).map((k) => (
              <div key={k} className="grid grid-cols-[72px_1fr_64px] items-center gap-3 md:grid-cols-[88px_1fr_72px]">
                <span className="font-mono text-[12.5px] text-white/60">{t(`race.${k}`)}</span>
                <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    data-race-before={k === "before" ? "" : undefined}
                    data-race-after={k === "after" ? "" : undefined}
                    className={`absolute inset-y-0 left-0 origin-left rounded-full ${k === "before" ? "bg-white/30" : "bg-accent shadow-[0_0_16px_var(--color-accent)]"}`}
                    style={{ width: `${(RACE[k] / RACE.before) * 100}%` }}
                  />
                </div>
                <span
                  data-race-before-time={k === "before" ? "" : undefined}
                  data-race-after-time={k === "after" ? "" : undefined}
                  className={`text-right font-mono text-[14px] ${k === "after" ? "text-accent" : "text-white/70"}`}
                >
                  {fmt(RACE[k])}
                </span>
              </div>
            ))}
          </div>
          <span
            data-race-badge=""
            className="absolute -right-3 -top-3 rounded-full bg-accent px-3 py-1 font-mono text-[13px] font-medium text-ink shadow-[0_8px_24px_-6px_var(--color-accent)]"
          >
            10x
          </span>
        </div>
      </div>
    </section>
  );
}
