"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUp, CheckCircle2, TrendingUp } from "lucide-react";
import { BrowserFrame, Button, GridBackdrop, PhoneFrame, StackIcon, type StackName } from "@/shared/ui";
import { afterIntro, EASE, Magnetic, SCRAMBLE_CHARS, useMotion } from "@/shared/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/motion/gsap";

const STACK: StackName[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Docker",
  "PostgreSQL",
  "Vue.js",
  "Prisma",
  "Kubernetes",
  "Cloudflare",
];

function HeroMockup() {
  const t = useTranslations("HomePage.Hero");

  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[560px] sm:h-[400px] lg:h-[440px] [perspective:1200px]">
      <div data-tilt="" className="absolute inset-0 [transform-style:preserve-3d]">
        {/* janela de trás — FutCustom */}
        <div data-layer="" data-depth="0.4" data-hero-hide="" className="absolute left-0 top-0 w-[78%]">
          <BrowserFrame
            src="/projects/cases/futcustom-step01.png"
            url="futcustom.com"
            alt={t("mockup.futcustom")}
            className="opacity-70"
          />
        </div>

        {/* janela da frente — FutBuyNow (print "vivo") */}
        <div data-layer="" data-depth="0.8" data-live="" data-hero-hide="" className="absolute right-0 top-[22%] w-[84%]">
          <BrowserFrame
            src="/projects/cases/futbuynow-step01.png"
            url="futbuynow.com"
            alt={t("mockup.futbuynow")}
            priority
          />
        </div>

        {/* celular — São João Arcoverde */}
        <div data-layer="" data-depth="1.4" data-hero-hide="" className="absolute bottom-0 left-[4%] w-[96px] sm:w-[128px]">
          <div data-float="">
            <PhoneFrame src="/projects/cases/sao-joao-1.png" alt={t("mockup.saoJoao")} sizes="128px" />
          </div>
        </div>

        {/* selos */}
        <div data-layer="" data-depth="1.8" data-badge="" data-hero-hide="" className="absolute -top-3 right-2 sm:right-6">
          <div data-float="" className="flex items-center gap-2 rounded-chip bg-white/12 px-3 py-2 backdrop-blur-[8px]">
            <CheckCircle2 size={16} className="text-primary" />
            <span className="whitespace-nowrap text-[12.5px] text-white sm:text-[14px]">{t("successStories")}</span>
          </div>
        </div>

        <div data-layer="" data-depth="1.2" data-badge="" data-hero-hide="" className="absolute -bottom-4 right-0 sm:right-4">
          <div data-float="" className="flex items-center gap-3 rounded-2xl bg-white/12 p-3 backdrop-blur-[8px] sm:p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/12 text-primary sm:h-11 sm:w-11">
              <TrendingUp size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="whitespace-nowrap text-[11.5px] text-white sm:text-[14px]">{t("growthMission")}</span>
              <div className="flex items-center gap-1.5">
                <ArrowUp size={15} className="text-primary" />
                <span className="font-mono text-[15px] font-medium text-accent sm:text-[18px]">{t("metric")}</span>
                <span className="text-[11.5px] text-white/75 sm:text-[14px]">{t("roiBoost")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const t = useTranslations("HomePage.Hero");
  const section = useRef<HTMLElement>(null);
  const { reduced, finePointer } = useMotion();

  useGSAP(
    (_, contextSafe) => {
      const root = section.current;
      if (!root || reduced || !contextSafe) return;
      const q = gsap.utils.selector(root);

      /* ── Ticker da stack: loop contínuo que acelera e inclina com a velocidade do scroll ── */
      const track = q("[data-ticker]")[0];
      const skewer = q("[data-ticker-skew]")[0];
      const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
      const settle = gsap.to(loop, { timeScale: 1, duration: 0.8, ease: "power2.out", paused: true });
      const skewTo = gsap.quickTo(skewer, "skewX", { duration: 0.4, ease: "power3.out" });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const v = self.getVelocity();
          loop.timeScale(1 + Math.min(Math.abs(v) / 250, 6));
          settle.invalidate().restart();
          skewTo(gsap.utils.clamp(-12, 12, v / -150));
          gsap.delayedCall(0.15, () => skewTo(0));
        },
      });

      /* ── Entrada (espera o preloader, se houver) ── */
      const eyebrow = q("[data-hero-eyebrow]")[0];
      const eyebrowText = eyebrow?.textContent ?? "";
      const title = q("[data-hero-title]")[0];
      const titleText = title?.textContent ?? "";
      const layers = q("[data-layer]:not([data-badge])");
      const badges = q("[data-badge]");

      const intro = gsap.timeline({ paused: true, defaults: { ease: EASE.flow } });
      intro
        .set(eyebrow, { text: "", autoAlpha: 1 })
        .to(eyebrow, { text: { value: eyebrowText }, duration: 0.7, ease: "none" })
        .to(
          title,
          {
            duration: 1.3,
            scrambleText: { text: titleText, chars: SCRAMBLE_CHARS, revealDelay: 0.35, speed: 0.6 },
          },
          0,
        )
        .fromTo(
          q("[data-hero-fade]"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 },
          0.35,
        )
        .fromTo(
          layers,
          { autoAlpha: 0, y: 140, z: -220, rotationX: 22 },
          { autoAlpha: 1, y: 0, z: 0, rotationX: 0, duration: 1.4, stagger: 0.14 },
          0.2,
        )
        .fromTo(
          badges,
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.6, ease: EASE.byte, stagger: 0.15 },
          1.0,
        )
        .add(() => {
          // Print "vivo": a janela da FutBuyNow percorre a página lentamente
          const img = q("[data-live] img")[0];
          if (img) {
            gsap.set(img, { scale: 1.16, transformOrigin: "50% 0%" });
            gsap.to(img, { transformOrigin: "50% 100%", duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true });
          }
          // Flutuação suave do celular e dos selos
          q("[data-float]").forEach((el, i) => {
            gsap.to(el, { y: i % 2 ? 8 : -8, duration: 2.6 + i * 0.4, ease: "sine.inOut", repeat: -1, yoyo: true });
          });
        });

      const stopIntro = afterIntro(() => intro.play());

      /* ── Parallax em camadas + inclinação 3D + "lanterna" na grade (só com mouse) ── */
      let cleanupPointer = () => {};
      if (finePointer) {
        const tilt = q("[data-tilt]")[0];
        const tiltX = gsap.quickTo(tilt, "rotationY", { duration: 1, ease: "power3.out" });
        const tiltY = gsap.quickTo(tilt, "rotationX", { duration: 1, ease: "power3.out" });
        const movers = q("[data-layer]").map((el) => {
          const depth = Number(el.getAttribute("data-depth") ?? 1);
          return {
            depth,
            x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
          };
        });

        const onMove = contextSafe((e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          root.style.setProperty("--mx", `${e.clientX - r.left}px`);
          root.style.setProperty("--my", `${e.clientY - r.top}px`);
          if (intro.progress() < 1) return; // só depois da entrada, para não brigar com ela
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          tiltX(nx * 10);
          tiltY(ny * -8);
          movers.forEach((m) => {
            m.x(nx * 28 * m.depth);
            m.y(ny * 20 * m.depth);
          });
        });
        const onLeave = contextSafe(() => {
          root.style.setProperty("--mx", "-999px");
          root.style.setProperty("--my", "-999px");
          tiltX(0);
          tiltY(0);
          movers.forEach((m) => {
            m.x(0);
            m.y(0);
          });
        });
        root.addEventListener("pointermove", onMove);
        root.addEventListener("pointerleave", onLeave);
        cleanupPointer = () => {
          root.removeEventListener("pointermove", onMove);
          root.removeEventListener("pointerleave", onLeave);
        };
      }

      return () => {
        stopIntro();
        cleanupPointer();
      };
    },
    { scope: section, dependencies: [reduced, finePointer], revertOnUpdate: true },
  );

  return (
    <section
      ref={section}
      className="relative min-h-[calc(100vh-61px)] w-full overflow-hidden bg-ink flex items-center justify-center px-6 py-20 md:px-[60px] md:py-[120px]"
    >
      <GridBackdrop interactive />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[620px] rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-10 lg:w-[540px] lg:shrink-0">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-primary">
              <span data-hero-eyebrow="" data-hero-hide="">
                {"// "}
                {t("eyebrow")}
              </span>
              <span className="caret ml-0.5 text-accent" aria-hidden="true">
                ▍
              </span>
            </span>
            <h1
              data-hero-title=""
              aria-label={t("title")}
              className="font-display font-bold text-white leading-[1.05] tracking-[-0.03em] text-[clamp(40px,6vw,64px)]"
            >
              {t("title")}
            </h1>
            <p data-hero-fade="" data-hero-hide="" className="max-w-[500px] text-white/75 text-[16.5px] leading-[1.6]">
              {t("subtitle")}
            </p>
          </div>

          <div data-hero-fade="" data-hero-hide="" className="flex flex-wrap gap-3">
            <Magnetic>
              <Button href="#contact">{t("bookCall")}</Button>
            </Magnetic>
            <Magnetic>
              <Button href="#work" variant="ghost">
                {t("learnMore")}
              </Button>
            </Magnetic>
          </div>

          <div data-hero-fade="" data-hero-hide="" className="flex flex-col gap-3">
            <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/40">{t("stackLabel")}</span>
            <div className="relative h-[40px] w-full max-w-[460px] overflow-hidden">
              <div
                className="absolute inset-0 flex items-center"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                  maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
              >
                <div data-ticker-skew="">
                  <ul data-ticker="" className="m-0 flex w-max list-none items-center gap-10 p-0 pr-10 whitespace-nowrap text-white/55">
                    {[...STACK, ...STACK].map((tech, i) => (
                      <li
                        key={i}
                        className="flex shrink-0 items-center gap-2 transition-[color,transform] duration-300 hover:-translate-y-1 hover:text-white"
                        aria-hidden={i >= STACK.length}
                      >
                        <StackIcon name={tech} size={20} />
                        <span className="font-mono text-[13px]">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
