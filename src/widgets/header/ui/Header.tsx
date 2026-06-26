"use client";

import { useState } from "react";

const navLinks = [
  { label: "Serviços", href: "#services" },
  { label: "Trabalhos", href: "#work" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Sobre", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-dark px-6 md:px-[60px] py-[12px] w-full box-border relative z-[1000]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-[8px] no-underline shrink-0">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[22px] h-[22px] shrink-0"
          >
            <g clipPath="url(#clip0_header)">
              <path
                d="M22 9.253C22 8.241 21.179 7.42 20.167 7.42H14.546V1.833C14.546 0.821 13.725 0 12.713 0H9.236C8.223 0 7.426 0.833 7.179 1.815C6.518 4.454 4.447 6.531 1.815 7.195C0.833 7.443 0 8.241 0 9.253V12.747C0 13.759 0.821 14.58 1.833 14.58H7.402V20.167C7.402 21.179 8.223 22 9.236 22H12.713C13.725 22 14.523 21.166 14.772 20.185C15.443 17.545 17.542 15.468 20.185 14.804C21.167 14.557 22 13.759 22 12.747V9.253Z"
                fill="white"
                fillOpacity="0.75"
              />
            </g>
            <defs>
              <clipPath id="clip0_header">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-white/75 font-bold text-[18px] md:text-[21px] leading-[1.46]">
            ByteFlow
          </span>
        </a>

        <nav
          className={`
          flex items-center
          absolute top-full left-0 right-0 bg-dark flex-col items-start gap-0 overflow-hidden transition-all duration-300 px-6 z-[100]
          lg:static lg:flex-row lg:items-center lg:gap-[44px] lg:px-0 lg:max-h-none lg:py-0 lg:overflow-visible
          ${menuOpen ? "max-h-[400px] py-[16px] pb-[24px] gap-[20px]" : "max-h-0 py-0"}
        `}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/75 text-[14px] font-normal leading-[25.6px] no-underline whitespace-nowrap transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="lg:hidden inline-flex items-center justify-center py-[9px] pb-[10px] px-[28px] rounded-full bg-primary text-[#0d0d0d] text-[17px] font-medium leading-[25.2px] no-underline whitespace-nowrap transition-colors duration-200 hover:bg-primary-hover mt-[4px]"
          >
            Fale Conosco
          </a>
        </nav>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center justify-center py-[9px] pb-[10px] px-[28px] rounded-full bg-primary text-[#0d0d0d] text-[17px] font-medium leading-[25.2px] no-underline whitespace-nowrap transition-colors duration-200 hover:bg-primary-hover shrink-0"
        >
          Fale Conosco
        </a>

        <button
          className="flex lg:hidden flex-col gap-[5px] bg-none border-none cursor-pointer p-[4px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
    </header>
  );
};
