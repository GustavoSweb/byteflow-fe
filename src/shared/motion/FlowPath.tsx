"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";

/**
 * A "linha de fluxo" da página: um traço esmeralda que nasce no hero, corre pelas
 * margens laterais, cruza de um lado para o outro nas fronteiras entre seções (onde só
 * há respiro, nunca sobre texto) e termina no botão do CTA final.
 *
 * - A ponta acompanha o olhar do leitor (~62% da altura da tela) e o byte lima viaja nela.
 * - Ao passar pela altura de um rótulo `// seção` (`[data-flow-node]`), ele acende.
 * - Ao chegar ao `[data-flow-end]`, o botão recebe um pulso.
 * - Mobile: trilho reto na margem esquerda. Reduced-motion: não renderiza.
 */
export function FlowPath() {
  const { reduced } = useMotion();
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      const main = svg?.parentElement;
      if (!svg || !main || reduced) return;

      const ghost = svg.querySelector<SVGPathElement>("[data-flow-ghost]")!;
      const glow = svg.querySelector<SVGPathElement>("[data-flow-glow]")!;
      const line = svg.querySelector<SVGPathElement>("[data-flow-line]")!;
      const byte = svg.querySelector<SVGGElement>("[data-flow-byte]")!;

      let length = 0;
      let lut: { l: number; y: number }[] = [];
      let nodes: { el: Element; y: number; lit: boolean }[] = [];
      let endY = Infinity;
      let arrived = false;
      let mainTop = 0;

      const build = () => {
        const W = main.clientWidth;
        const H = main.scrollHeight;
        mainTop = main.getBoundingClientRect().top + window.scrollY;
        svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
        svg.style.width = `${W}px`;
        svg.style.height = `${H}px`;

        const yOf = (el: Element) => el.getBoundingClientRect().top + window.scrollY - mainTop;
        const sections = Array.from(main.querySelectorAll(":scope > section"));
        const endEl = main.querySelector("[data-flow-end]");
        if (sections.length < 2 || !endEl) return;

        const mobile = W < 768;
        const inner = Math.min(1200, W - (mobile ? 48 : 120));
        const gutter = (W - inner) / 2;
        const left = mobile ? 12 : Math.max(18, gutter / 2);
        const right = W - left;
        const swing = 70;

        const hero = sections[0].getBoundingClientRect();
        let x = left;
        let d = `M ${x} ${hero.bottom + window.scrollY - mainTop - 160}`;

        // cruza de lado em cada fronteira entre seções (zona de respiro)
        for (let i = 1; i < sections.length; i++) {
          const y = yOf(sections[i]);
          if (mobile) continue;
          const nx = x === left ? right : left;
          d += ` L ${x} ${y - swing} C ${x} ${y}, ${nx} ${y}, ${nx} ${y + swing}`;
          x = nx;
        }

        // pouso no botão final
        const end = endEl.getBoundingClientRect();
        const ey = end.top + window.scrollY - mainTop + end.height / 2;
        const tx = x === left ? end.left - main.getBoundingClientRect().left - 14 : end.right - main.getBoundingClientRect().left + 14;
        d += ` L ${x} ${ey - 140} C ${x} ${ey}, ${(x + tx) / 2} ${ey}, ${tx} ${ey}`;
        endY = ey;

        [ghost, glow, line].forEach((p) => p.setAttribute("d", d));
        length = line.getTotalLength();
        [glow, line].forEach((p) => {
          p.style.strokeDasharray = `${length}`;
        });

        // tabela comprimento → y (o traço sempre desce, então y é monotônico)
        lut = [];
        for (let l = 0; l <= length; l += 6) lut.push({ l, y: line.getPointAtLength(l).y });
        lut.push({ l: length, y: line.getPointAtLength(length).y });

        nodes = Array.from(main.querySelectorAll("[data-flow-node]")).map((el) => ({
          el,
          y: yOf(el) + 8,
          lit: el.classList.contains("flow-lit"),
        }));
        render();
      };

      const lengthAtY = (y: number) => {
        if (!lut.length) return 0;
        if (y <= lut[0].y) return 0;
        if (y >= lut[lut.length - 1].y) return length;
        let lo = 0;
        let hi = lut.length - 1;
        while (hi - lo > 1) {
          const mid = (lo + hi) >> 1;
          if (lut[mid].y < y) lo = mid;
          else hi = mid;
        }
        const a = lut[lo];
        const b = lut[hi];
        return a.l + ((y - a.y) / Math.max(1, b.y - a.y)) * (b.l - a.l);
      };

      const state = { tip: 0 };
      const render = () => {
        if (!length) return;
        const l = lengthAtY(state.tip);
        line.style.strokeDashoffset = `${length - l}`;
        glow.style.strokeDashoffset = `${length - l}`;
        const p = line.getPointAtLength(l);
        byte.setAttribute("transform", `translate(${p.x} ${p.y})`);
        byte.style.opacity = l > 2 ? "1" : "0";

        for (const n of nodes) {
          const lit = state.tip >= n.y;
          if (lit !== n.lit) {
            n.lit = lit;
            n.el.classList.toggle("flow-lit", lit);
          }
        }

        const done = state.tip >= endY - 1;
        if (done && !arrived) {
          arrived = true;
          const target = main.querySelector("[data-flow-end]");
          if (target) {
            gsap.fromTo(
              target,
              { boxShadow: "0 0 0 0 rgba(212,245,52,0.7)" },
              { boxShadow: "0 0 0 22px rgba(212,245,52,0)", duration: 1.1, ease: "power2.out" },
            );
          }
        } else if (!done && state.tip < endY - 200) {
          arrived = false;
        }
      };

      const tipTo = gsap.quickTo(state, "tip", { duration: 0.7, ease: "power3.out", onUpdate: render });
      const follow = () => tipTo(window.scrollY - mainTop + window.innerHeight * 0.62);

      build();
      state.tip = window.scrollY - mainTop + window.innerHeight * 0.62;
      render();

      const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: follow });

      // reconstrói quando o layout muda (imagens, fontes, pin do processo, resize)
      let raf = 0;
      const schedule = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          build();
          follow();
        });
      };
      const ro = new ResizeObserver(schedule);
      ro.observe(main);
      ScrollTrigger.addEventListener("refresh", schedule);

      return () => {
        st.kill();
        ro.disconnect();
        cancelAnimationFrame(raf);
        ScrollTrigger.removeEventListener("refresh", schedule);
        nodes.forEach((n) => n.el.classList.remove("flow-lit"));
      };
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );

  if (reduced) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-[5] overflow-visible"
      fill="none"
    >
      <defs>
        <filter id="flow-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <radialGradient id="flow-byte-glow">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* trajeto inteiro, quase invisível: sugere para onde o fluxo vai */}
      <path data-flow-ghost="" stroke="var(--color-primary)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 7" />
      <path data-flow-glow="" stroke="var(--color-primary)" strokeOpacity="0.35" strokeWidth="6" filter="url(#flow-blur)" />
      <path data-flow-line="" stroke="var(--color-primary)" strokeWidth="1.6" strokeLinecap="round" />
      <g data-flow-byte="" style={{ opacity: 0 }}>
        <circle r="18" fill="url(#flow-byte-glow)" />
        <circle r="5" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
