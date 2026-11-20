"use client";

import { useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useMotion } from "@/shared/motion";
import { gsap, SplitText, useGSAP } from "@/shared/motion/gsap";

/**
 * Frase de impacto com leitura guiada: as palavras começam apagadas e acendem uma a uma
 * conforme a rolagem; as palavras-chave (<hl> na tradução) ganham um marca-texto lima
 * que se desenha quando a leitura chega nelas. Sem JS/reduced-motion: frase completa e marcada.
 */
export default function BenefitsSection() {
  const t = useTranslations("HomePage.Benefits");
  const heading = useRef<HTMLHeadingElement>(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      const el = heading.current;
      if (!el || reduced) return;

      SplitText.create(el, {
        type: "words",
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: true },
            },
          );
        },
      });

      el.querySelectorAll("mark").forEach((mark) => {
        gsap.fromTo(
          mark,
          { backgroundSize: "0% 38%" },
          {
            backgroundSize: "100% 38%",
            ease: "none",
            scrollTrigger: { trigger: mark, start: "top 68%", end: "top 52%", scrub: true },
          },
        );
      });
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section className="bg-surface px-6 py-24 md:px-[60px] md:py-[152px] relative flex items-center justify-center overflow-hidden w-full">
      <div className="absolute bottom-[-59px] left-1/2 -translate-x-1/2 w-[300px] md:w-[581px] h-[118px] bg-primary blur-[37.5px] opacity-30 rounded-full z-0 pointer-events-none" />

      <div className="max-w-[1200px] w-full flex flex-col items-center justify-center relative z-[1]">
        <h2
          ref={heading}
          className="max-w-[1000px] text-center text-fg font-display text-[clamp(24px,4.5vw,40px)] font-semibold leading-[1.3] tracking-[-0.02em] m-0"
        >
          {t.rich("title", {
            hl: (chunks: ReactNode) => (
              <mark
                className="bg-transparent bg-no-repeat text-[inherit] [background-image:linear-gradient(var(--color-accent),var(--color-accent))] [background-position:0_88%] [background-size:100%_38%] [box-decoration-break:clone]"
              >
                {chunks}
              </mark>
            ),
          })}
        </h2>
      </div>
    </section>
  );
}
