"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";

/**
 * O byte lima do logo seguindo o mouse (decorativo — o cursor nativo continua).
 * - sobre links/botões: vira um anel maior;
 * - sobre elementos com `data-cursor-label="..."`: vira uma pílula com o texto (ex.: "ver case →").
 * Só em desktop com mouse e sem reduced-motion.
 */
export function ByteCursor() {
  const { reduced, finePointer } = useMotion();
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const enabled = !reduced && finePointer;

  useGSAP(
    () => {
      const el = dot.current;
      const text = label.current;
      if (!enabled || !el || !text) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      let mode: "dot" | "link" | "label" = "dot";
      let visible = false;

      const setMode = (next: typeof mode, value = "") => {
        if (next === mode && (next !== "label" || text.textContent === value)) return;
        mode = next;
        if (next === "label") text.textContent = value;
        gsap.to(el, {
          width: next === "label" ? "auto" : next === "link" ? 44 : 12,
          height: next === "label" ? 34 : next === "link" ? 44 : 12,
          backgroundColor: next === "link" ? "rgba(212,245,52,0)" : "rgba(212,245,52,1)",
          borderColor: next === "link" ? "rgba(212,245,52,0.9)" : "rgba(212,245,52,0)",
          paddingLeft: next === "label" ? 14 : 0,
          paddingRight: next === "label" ? 14 : 0,
          duration: 0.3,
          ease: "back.out(1.6)",
        });
        gsap.to(text, { autoAlpha: next === "label" ? 1 : 0, duration: 0.2 });
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!visible) {
          visible = true;
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: 0.2 });
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const onOver = (e: PointerEvent) => {
        const target = e.target as Element | null;
        const labelled = target?.closest?.("[data-cursor-label]");
        if (labelled) return setMode("label", labelled.getAttribute("data-cursor-label") ?? "");
        if (target?.closest?.("a, button, [role='button'], summary, label")) return setMode("link");
        setMode("dot");
      };
      const onLeaveWindow = () => {
        visible = false;
        gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      };
      const onDown = () => gsap.to(el, { scale: 0.8, duration: 0.15 });
      const onUp = () => gsap.to(el, { scale: 1, duration: 0.3, ease: "back.out(2)" });

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeaveWindow);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
      };
    },
    { dependencies: [enabled], revertOnUpdate: true },
  );

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[2500] flex items-center justify-center rounded-full border-2 border-transparent bg-accent opacity-0"
      style={{ width: 12, height: 12, translate: "-50% -50%" }}
    >
      <span ref={label} className="whitespace-nowrap font-mono text-[12.5px] font-medium text-ink opacity-0" />
    </div>
  );
}
