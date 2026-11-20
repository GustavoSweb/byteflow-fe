"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { INTRO_DONE_EVENT } from "./tokens";

interface MotionState {
  /** usuário pediu menos movimento (prefers-reduced-motion) */
  reduced: boolean;
  /** dispositivo com mouse/trackpad preciso (cursor custom, magnetismo, tilt) */
  finePointer: boolean;
  lenis: Lenis | null;
}

const MotionContext = createContext<MotionState>({ reduced: true, finePointer: false, lenis: null });

export const useMotion = () => useContext(MotionContext);

const HEADER_OFFSET = 72;

/** Executa `fn` agora ou quando o preloader terminar (se ele estiver ativo). */
export function afterIntro(fn: () => void) {
  if (typeof document === "undefined") return () => {};
  if (!document.documentElement.classList.contains("intro")) {
    fn();
    return () => {};
  }
  window.addEventListener(INTRO_DONE_EVENT, fn, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, fn);
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MotionState>({ reduced: true, finePointer: false, lenis: null });

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ autoRaf: false, lerp: 0.11 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      root.classList.add("lenis");
      if (root.classList.contains("intro")) {
        lenis.stop();
        window.addEventListener(INTRO_DONE_EVENT, () => lenis?.start(), { once: true });
      }
    }

    // Âncoras ("/#services", "/en#work"...) com rolagem suave e offset do header fixo
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      if (lenis) lenis.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.2 });
      else target.scrollIntoView({ block: "start" });
    };
    document.addEventListener("click", onClick);

    // Hash na chegada (ex.: veio de uma página de case para "/#work")
    if (window.location.hash) {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (target) {
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(target, { offset: -HEADER_OFFSET, immediate: true });
          else target.scrollIntoView({ block: "start" });
        });
      }
    }

    if (reduced) root.classList.add("reduced");
    root.classList.add("motion-ready");
    setState({ reduced, finePointer, lenis });

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      root.classList.remove("lenis");
    };
  }, []);

  return <MotionContext.Provider value={state}>{children}</MotionContext.Provider>;
}
