"use client";

import { Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-8 px-6 md:px-[60px] flex justify-center border-t border-[#0d0d0d]/5">
      <div className="w-full max-w-[1200px] flex flex-col gap-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo & Newsletter */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <a href="/" className="flex items-center gap-2 no-underline">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[22px] h-[22px]"
              >
                <path
                  d="M22 9.253C22 8.241 21.179 7.42 20.167 7.42H14.546V1.833C14.546 0.821 13.725 0 12.713 0H9.236C8.223 0 7.426 0.833 7.179 1.815C6.518 4.454 4.447 6.531 1.815 7.195C0.833 7.443 0 8.241 0 9.253V12.747C0 13.759 0.821 14.58 1.833 14.58H7.402V20.167C7.402 21.179 8.223 22 9.236 22H12.713C13.725 22 14.523 21.166 14.772 20.185C15.443 17.545 17.542 15.468 20.185 14.804C21.167 14.557 22 13.759 22 12.747V9.253Z"
                  fill="#0d0d0d"
                />
              </svg>
              <span className="text-[#0d0d0d] font-bold text-[21px]">Upreach</span>
            </a>

            <div className="flex flex-col gap-6 max-w-[450px]">
              <div className="flex flex-col gap-3">
                <h4 className="text-[18px] font-bold text-[#0d0d0d]">Stay Connected & Informed</h4>
                <p className="text-[15px] leading-[1.6] text-[#0d0d0d]/60 font-medium">
                  Subscribe to our newsletter for the marketing insights, trends, & growth
                  strategies to scale your business.
                </p>
              </div>
              <form className="flex gap-2 p-1 bg-[#f5f5f5] rounded-full border border-[#0d0d0d]/5">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-none outline-none px-6 py-2 flex-1 text-[15px] text-[#0d0d0d] placeholder:text-[#0d0d0d]/30"
                />
                <button
                  type="submit"
                  className="bg-[#0d0d0d] text-white p-3 rounded-full hover:bg-[#0d0d0d]/80 transition-colors"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <h5 className="text-[16px] font-bold text-[#0d0d0d]">Sections</h5>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li>
                  <a
                    href="#services"
                    className="text-[15px] text-[#0d0d0d]/60 font-medium hover:text-[#0d0d0d] transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className="text-[15px] text-[#0d0d0d]/60 font-medium hover:text-[#0d0d0d] transition-colors"
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-[15px] text-[#0d0d0d]/60 font-medium hover:text-[#0d0d0d] transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h5 className="text-[16px] font-bold text-[#0d0d0d]">Information</h5>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                <li>
                  <a
                    href="#faq"
                    className="text-[15px] text-[#0d0d0d]/60 font-medium hover:text-[#0d0d0d] transition-colors"
                  >
                    FAQ&apos;s
                  </a>
                </li>
                <li>
                  <a
                    href="/404"
                    className="text-[15px] text-[#0d0d0d]/60 font-medium hover:text-[#0d0d0d] transition-colors"
                  >
                    404
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-[15px] text-[#0d0d0d]/60 font-medium hover:text-[#0d0d0d] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#0d0d0d]/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-[#0d0d0d]/40 font-medium">
            Copyright © 2024 – All Right Reserved
          </p>
          <p className="text-[14px] text-[#0d0d0d]/40 font-medium">Created by Khurram</p>
        </div>
      </div>
    </footer>
  );
};
