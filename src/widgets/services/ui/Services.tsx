"use client";

import { 
  Megaphone, 
  Briefcase, 
  UserPlus, 
  Target, 
  PenTool, 
  TrendingUp 
} from "lucide-react";

const SERVICES = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Maximize online visibility with paid ads, social media, and strategic SEO to drive targeted traffic and higher conversions.",
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    description:
      "Enhance business strategy, optimize core processes, and leverage real-time analytics for sustainable growth.",
  },
  {
    icon: UserPlus,
    title: "Lead Generation",
    description:
      "Optimize advanced funnels, automate processes, and boost customer conversions to generate leads.",
  },
  {
    icon: Target,
    title: "Brand Strategy",
    description:
      "Building a powerful, data-driven brand identity that resonates, inspires, and drives long-term success.",
  },
  {
    icon: PenTool,
    title: "Content Writing",
    description:
      "Crafting compelling, SEO-optimized content that boosts engagement, authority, and conversions.",
  },
  {
    icon: TrendingUp,
    title: "Strategic Planning",
    description:
      "Generate high-quality leads through targeted campaigns and optimized funnels for maximum conversions.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col items-center gap-[52px]">
        <div className="flex flex-col items-center gap-[15px] text-center max-w-[600px]">
          <h2 className="text-[clamp(32px,5vw,41.9px)] font-bold text-[#0d0d0d] tracking-tight leading-[1.25]">
            What we offer
          </h2>
          <p className="text-[16.6px] leading-[1.5] text-[#0d0d0d]/70 font-medium">
            Comprehensive solutions for business success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26.66px] w-full">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="bg-[#f5f5f5] rounded-[20px] p-[24px_20px] flex flex-col items-start gap-[19px] transition-transform hover:scale-[1.02]"
            >
              <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-[0px_4px_50px_0px_rgba(0,0,0,0.03)]">
                <service.icon size={24} className="text-[#0d0d0d]" />
              </div>
              <div className="flex flex-col gap-[11.4px]">
                <h3 className="text-[20.6px] font-medium text-[#0d0d0d] leading-[1.5]">
                  {service.title}
                </h3>
                <p className="text-[15.3px] leading-[1.46] text-[#0d0d0d]/70 font-medium max-w-[310px]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
