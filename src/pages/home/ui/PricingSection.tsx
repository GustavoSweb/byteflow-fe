"use client";

import { Check, X } from "lucide-react";

const OTHERS = [
  "Generic, one-size-fits-all strategies",
  "Focus on vanity metrics (likes, shares)",
  "Slow response times and poor communication",
  "Minimal post-launch support or guidance",
  "Use outdated marketing techniques",
];

const UPREACH = [
  "Custom strategies tailored to your business goals",
  "Focus on real KPIs like leads, conversions, and ROI",
  "Transparent communication and dedicated support",
  "Use the latest tools and data-driven marketing tactics",
  "Provide long-term support and optimization",
];

export default function PricingSection() {
  return (
    <section className="bg-white py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-[52px]">
        <div className="flex flex-col items-center gap-[15px] text-center">
          <h2 className="text-[clamp(32px,5vw,41.4px)] font-bold text-[#0d0d0d] tracking-tight leading-[1.28]">
            Why Upreach Stands Out
          </h2>
          <p className="text-[16.7px] leading-[1.5] text-[#0d0d0d]/70 font-medium">
            Here&apos;s how Upreach delivers more value, clarity, and results compared to typical service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px] w-full">
          {/* Others */}
          <div className="bg-[#f5f5f5] rounded-[32px] p-8 md:p-12 flex flex-col gap-8">
            <h3 className="text-[24px] font-bold text-[#0d0d0d]">Other Agencies</h3>
            <div className="flex flex-col gap-5">
              {OTHERS.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-none w-6 h-6 rounded-full bg-[#ff4d4d]/10 flex items-center justify-center">
                    <X size={14} className="text-[#ff4d4d]" />
                  </div>
                  <span className="text-[16px] text-[#0d0d0d]/70 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upreach */}
          <div className="bg-[#0d0d0d] rounded-[32px] p-8 md:p-12 flex flex-col gap-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#50c878]/10 blur-[100px] -mr-32 -mt-32" />
            <div className="flex items-center justify-between">
              <h3 className="text-[24px] font-bold">Upreach</h3>
              <div className="bg-[#50c878] text-[#0d0d0d] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Our Agency
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {UPREACH.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-none w-6 h-6 rounded-full bg-[#50c878] flex items-center justify-center">
                    <Check size={14} className="text-[#0d0d0d]" />
                  </div>
                  <span className="text-[16px] text-white/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
