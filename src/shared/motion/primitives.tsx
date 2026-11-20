"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, SplitText, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";
import { DURATION, EASE, STAGGER } from "./tokens";

/* ───────────────────────── Reveal ───────────────────────── */

type RevealProps<T extends ElementType> = {
  as?: T;
  /** anima os filhos diretos em sequência em vez do próprio elemento */
  stagger?: number | boolean;
  y?: number;
  x?: number;
  scale?: number;
  delay?: number;
  /** "byte" = encaixa com overshoot; "flow" = desliza */
  feel?: "byte" | "flow";
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/** Entrada ao rolar até o elemento. Sem JS ou com reduced-motion, o conteúdo aparece normalmente. */
export function Reveal<T extends ElementType = "div">({
  as,
  stagger,
  y = 28,
  x = 0,
  scale = 1,
  delay = 0,
  feel = "flow",
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const targets = stagger ? Array.from(el.children) : [el];
      // fromTo com valores finais explícitos: `from` lê o estado atual como destino e, se um
      // re-run pegar o elemento ainda oculto (ou no meio de uma transição CSS), ele "anima" de 0 para 0.
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y, x, scale },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          delay,
          duration: feel === "byte" ? DURATION.base : DURATION.slow,
          ease: feel === "byte" ? EASE.byte : EASE.flow,
          stagger: typeof stagger === "number" ? stagger : stagger ? STAGGER.base : 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}

/* ───────────────────────── SplitReveal ───────────────────────── */

type SplitRevealProps<T extends ElementType> = {
  as?: T;
  by?: "words" | "chars" | "lines";
  delay?: number;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/** Títulos que sobem palavra por palavra de dentro de uma "máscara". */
export function SplitReveal<T extends ElementType = "h2">({
  as,
  by = "words",
  delay = 0,
  children,
  ...rest
}: SplitRevealProps<T>) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      SplitText.create(el, {
        type: by === "chars" ? "words,chars" : by,
        mask: by === "chars" ? "words" : by,
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          const parts = by === "chars" ? self.chars : by === "lines" ? self.lines : self.words;
          return gsap.fromTo(
            parts,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: DURATION.slow,
              ease: EASE.flow,
              stagger: by === "chars" ? STAGGER.tight / 2 : STAGGER.tight,
              delay,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        },
      });
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}

/* ───────────────────────── Counter ───────────────────────── */

interface CounterProps {
  /** texto final, ex.: "25+", "10x", "5+" */
  value: string;
  className?: string;
  duration?: number;
}

/** Número que "roda" como odômetro até o valor final ao entrar na tela. */
export function Counter({ value, className, duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced || !match) return;
      const [, prefix, digits, suffix] = match;
      const target = Number(digits);
      const state = { n: 0 };
      gsap.to(state, {
        n: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onStart: () => {
          el.textContent = `${prefix}0${suffix}`;
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.n)}${suffix}`;
        },
      });
    },
    { dependencies: [reduced, value], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className={className} aria-label={value}>
      {value}
    </span>
  );
}

/* ───────────────────────── Magnetic ───────────────────────── */

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** O conteúdo é "atraído" pelo cursor (só em desktop, sem reduced-motion). */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced, finePointer } = useMotion();

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el || reduced || !finePointer || !contextSafe) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const onMove = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      const onLeave = contextSafe(() => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      });

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [reduced, finePointer], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}
