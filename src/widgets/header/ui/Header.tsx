"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Logo } from "@/shared/ui";
import { useLocalePaths } from "@/shared/config/i18n/paths";
import { Magnetic, useMotion } from "@/shared/motion";
import { gsap, ScrollTrigger, useGSAP } from "@/shared/motion/gsap";
import { LocaleSwitcher } from "./LocaleSwitcher";

const navLinks = [{ key: "services" }, { key: "work" }, { key: "about" }, { key: "faq" }] as const;

type NavKey = (typeof navLinks)[number]["key"];

export const Header = () => {
  const t = useTranslations("Header");
  const paths = useLocalePaths();
  const { reduced } = useMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<NavKey | null>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Partial<Record<NavKey, HTMLAnchorElement | null>>>({});
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  /* Esconde ao rolar para baixo, reaparece ao subir */
  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header || reduced) return;
      let hidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const shouldHide = !menuOpenRef.current && self.scroll() > 160 && self.direction === 1;
          if (shouldHide === hidden) return;
          hidden = shouldHide;
          gsap.to(header, { yPercent: hidden ? -100 : 0, duration: 0.45, ease: "power3.out", overwrite: true });
        },
      });
    },
    { dependencies: [reduced], revertOnUpdate: true },
  );

  /* Seção visível → link ativo */
  useEffect(() => {
    const sections = navLinks
      .map(({ key }) => document.getElementById(key))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id as NavKey);
        else if (window.scrollY < window.innerHeight * 0.6) setActive(null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Posição da pílula sob o link ativo (desktop) */
  useEffect(() => {
    const update = () => {
      const link = active ? linkRefs.current[active] : null;
      const nav = navRef.current;
      if (!link || !nav || window.innerWidth < 1100) return setPill(null);
      const l = link.getBoundingClientRect();
      const n = nav.getBoundingClientRect();
      setPill({ left: l.left - n.left, width: l.width });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 bg-ink/90 backdrop-blur-md border-b border-white/10 px-6 md:px-[60px] py-[12px] w-full box-border z-[1000]"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Logo href={paths.home()} />

        <nav
          ref={navRef}
          className={`
          flex items-center
          absolute top-full left-0 right-0 bg-ink flex-col items-start gap-0 overflow-hidden transition-all duration-300 px-6 z-[100]
          lg:relative lg:inset-auto lg:bg-transparent lg:flex-row lg:items-center lg:gap-[12px] lg:px-0 lg:max-h-none lg:py-0 lg:overflow-visible
          ${menuOpen ? "max-h-[400px] py-[16px] pb-[24px] gap-[20px]" : "max-h-0 py-0"}
        `}
        >
          {/* pílula que desliza até a seção ativa */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 hidden h-[34px] -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.08] transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block"
            style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
          />
          {navLinks.map((link) => (
            <a
              key={link.key}
              ref={(el) => {
                linkRefs.current[link.key] = el;
              }}
              href={paths.home(link.key)}
              onClick={() => setMenuOpen(false)}
              aria-current={active === link.key ? "location" : undefined}
              className={`relative text-[14px] font-normal leading-[25.6px] no-underline whitespace-nowrap transition-colors duration-200 hover:text-white lg:px-4 lg:py-1 ${
                active === link.key ? "text-white" : "text-white/75"
              }`}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
          <Button href={paths.home("contact")} className="lg:hidden mt-[4px]" onClick={() => setMenuOpen(false)}>
            {t("cta")}
          </Button>
        </nav>

        <div className="flex shrink-0 items-center gap-3 lg:gap-4">
          <LocaleSwitcher />

          <div className="hidden lg:block">
            <Magnetic strength={0.25}>
              <Button href={paths.home("contact")}>{t("cta")}</Button>
            </Magnetic>
          </div>

          <button
            className="flex lg:hidden flex-col gap-[5px] bg-none border-none cursor-pointer p-[4px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("menu")}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-[24px] h-[2px] bg-white/75 rounded-sm transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block w-[24px] h-[2px] bg-white/75 rounded-sm transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[24px] h-[2px] bg-white/75 rounded-sm transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
