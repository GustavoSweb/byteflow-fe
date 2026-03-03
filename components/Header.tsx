"use client";

import { useState } from "react";
import "./Header.css";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="logo">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo-icon"
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
          <span className="logo-name">Upreach</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="contact-btn mobile-contact">
            Contact us
          </a>
        </nav>

        <a href="#contact" className="contact-btn desktop-contact">
          Contact us
        </a>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`bar ${menuOpen ? "bar-open-1" : ""}`} />
          <span className={`bar ${menuOpen ? "bar-open-2" : ""}`} />
          <span className={`bar ${menuOpen ? "bar-open-3" : ""}`} />
        </button>
      </div>
    </header>
  );
}
