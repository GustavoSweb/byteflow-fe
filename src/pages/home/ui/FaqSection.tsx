"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How does your marketing approach stand out from competitors?",
    answer: "We focus on data-driven strategies and real KPIs rather than vanity metrics. Our approach is tailored to your specific business goals and audience, ensuring maximum ROI.",
  },
  {
    question: "What makes your lead generation strategies effective?",
    answer: "Our lead generation combines advanced funnel optimization with targeted content marketing, ensuring that we not only attract traffic but convert it into high-quality leads.",
  },
  {
    question: "How do you accurately measure the success of a campaign?",
    answer: "We use a variety of analytics tools to track conversions, cost per lead, and overall revenue growth. You'll receive transparent reports that show exactly how your investment is performing.",
  },
  {
    question: "How can I easily get started with your services today?",
    answer: "Simply fill out our contact form or book a consultation call. We'll discuss your goals and create a custom plan to help your business scale confidently.",
  },
  {
    question: "What platforms do you specialize in for digital marketing?",
    answer: "We specialize in a wide range of platforms including Google Ads, Meta Ads (Facebook/Instagram), LinkedIn, and various SEO tools to ensure your brand is visible where your customers are.",
  },
  {
    question: "Do you offer tailored solutions for different industries?",
    answer: "Yes, we have experience working with diverse industries from Tech and Real Estate to Fitness and Fashion. We adapt our strategies to meet the unique challenges of your sector.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-[52px]">
        <div className="flex flex-col items-center gap-[15px] text-center">
          <h2 className="text-[clamp(32px,5vw,41.1px)] font-bold text-[#0d0d0d] tracking-tight leading-[1.28]">
            Your questions, answered.
          </h2>
          <p className="text-[16.7px] leading-[1.5] text-[#0d0d0d]/70 font-medium">
            Find quick answers to common queries about our services, process, and how we can help you achieve your goals.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-[800px] mx-auto">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-[#f5f5f5] rounded-[20px] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <span className="text-[18px] font-bold text-[#0d0d0d]">
                  {faq.question}
                </span>
                <div className={`w-6 h-6 rounded-full border border-[#0d0d0d]/10 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDown size={16} className="text-[#0d0d0d]" />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[200px] p-6 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-[16px] leading-[1.6] text-[#0d0d0d]/70 font-medium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
