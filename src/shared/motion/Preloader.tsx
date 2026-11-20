"use client";

import { useRef } from "react";
import { LOGO_BOTTOM_PATH, LOGO_STEM_PATH, LOGO_TOP_PATH } from "@/shared/ui/Logo";
import { gsap, useGSAP } from "./gsap";
import { EASE, INTRO_DONE_EVENT } from "./tokens";

const COLS = 6;
const ROWS = 4;
const SEEN_KEY = "bf-intro";

/**
 * Abertura da 1ª visita: o "B" se monta em blocos, o byte lima pinga, quica e voa até o
 * logo do header enquanto a tela se abre em blocos. Só aparece quando o script inicial
 * marcou <html class="intro"> (1ª visita na sessão, sem reduced-motion). Clique ou tecla pula.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const html = document.documentElement;
      const el = root.current;
      if (!el || !html.classList.contains("intro") || !contextSafe) return;

      const finish = () => {
        html.classList.remove("intro");
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
      };
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      };

      const q = gsap.utils.selector(el);
      const byte = q("[data-pre-byte]")[0] as HTMLElement;
      const tl = gsap.timeline({ defaults: { ease: EASE.byte }, onComplete: finish });

      tl.from(q("[data-pre-stem]"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.4, ease: EASE.pixel })
        .from(q("[data-pre-top]"), { x: -10, autoAlpha: 0, duration: 0.35 }, "-=0.05")
        .from(q("[data-pre-bottom]"), { x: -10, autoAlpha: 0, duration: 0.35 }, "-=0.22")
        .from(byte, { scale: 0, duration: 0.3, ease: "back.out(3)" }, "-=0.1")
        .to(byte, { y: -18, duration: 0.16, ease: "power2.out" })
        .to(byte, { y: 0, duration: 0.3, ease: "bounce.out" })
        .from(q("[data-pre-label]"), { text: { value: "" }, duration: 0.5, ease: "none" }, 0.25)
        .addLabel("open")
        .add(release, "open")
        .to(q("[data-pre-logo], [data-pre-label]"), { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: "power2.in" }, "open")
        .to(
          q("[data-pre-block]"),
          {
            scaleY: 0,
            transformOrigin: "50% 0%",
            duration: 0.45,
            ease: EASE.flowInOut,
            stagger: { each: 0.025, from: "random" },
          },
          "open+=0.05",
        );

      // O byte voa até o byte do logo no header
      // ritmo final: logo montado em ~0,8s, página liberada em ~1,7s
      tl.timeScale(1.4);

      tl.add(() => {
        const target = document.querySelector("header [data-logo-byte]");
        if (!target) return;
        const from = byte.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        gsap.to(byte, {
          x: `+=${to.left + to.width / 2 - (from.left + from.width / 2)}`,
          y: `+=${to.top + to.height / 2 - (from.top + from.height / 2)}`,
          scale: to.width / from.width,
          duration: 0.6,
          ease: EASE.flowInOut,
          onComplete: () => {
            gsap.to(byte, { autoAlpha: 0, duration: 0.15 });
          },
        });
      }, "open");

      const skip = contextSafe(() => {
        release();
        tl.progress(1);
      });
      window.addEventListener("keydown", skip, { once: true });
      el.addEventListener("click", skip, { once: true });
      return () => window.removeEventListener("keydown", skip);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader fixed inset-0 z-[3000] items-center justify-center" aria-hidden="true">
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <span key={i} data-pre-block="" className="block bg-ink outline outline-1 outline-ink" />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-32 w-32">
          <svg data-pre-logo="" viewBox="0 0 32 32" className="absolute inset-0 h-full w-full overflow-visible">
            <path data-pre-stem="" d={LOGO_STEM_PATH} fill="var(--color-primary)" />
            <path data-pre-top="" d={LOGO_TOP_PATH} fill="var(--color-primary)" />
            <path data-pre-bottom="" d={LOGO_BOTTOM_PATH} fill="var(--color-primary)" />
          </svg>
          {/* byte: centro (27.5, 23.25) e raio 3.25 na grade 32 → 128px */}
          <span
            data-pre-byte=""
            className="absolute block rounded-full bg-accent"
            style={{ width: 26, height: 26, left: 110 - 13, top: 93 - 13 }}
          />
        </div>
        <span data-pre-label="" className="font-mono text-[13px] text-white/55">
          byteflow.init()
        </span>
      </div>
    </div>
  );
}
