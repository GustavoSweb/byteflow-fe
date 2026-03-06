"use client";

import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Jacob Williams",
    role: "Tech CEO",
    text: "Their platform transformed how we approach campaigns. The intuitive tools and seamless integrations saved us a lot of time.",
  },
  {
    name: "Ethan Reynolds",
    role: "Café Owner",
    text: "Their marketing approach brought in more foot traffic and online orders. The data-driven insights made all the difference.",
  },
  {
    name: "Nathan Carter",
    role: "Fitness Founder",
    text: "Their system improved our client engagement and lead conversions. The easy-to-use tools streamlined our entire sales process.",
  },
  {
    name: "Daniel Foster",
    role: "Real Estate CEO",
    text: "They refined our brand’s digital presence and increased customer retention. The personalized strategies made a huge impact.",
  },
  {
    name: "Mitchell Apparel",
    role: "Fashion CEO",
    text: "Their platform enhanced project coordination and design workflow. The advanced tools helped us meet deadlines stress-free.",
  },
  {
    name: "Lucas Bennett",
    role: "Architect",
    text: "Working with them was a game-changer for our studio. Their attention to detail and creative vision exceeded our expectations.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24 px-6 md:px-[60px] flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-[52px]">
        <div className="flex flex-col items-center gap-[15px] text-center">
          <h2 className="text-[clamp(32px,5vw,41.1px)] font-bold text-[#0d0d0d] tracking-tight leading-[1.28]">
            What Our Clients Say
          </h2>
          <p className="text-[16.7px] leading-[1.5] text-[#0d0d0d]/70 font-medium">
            Our clients’ words reflect our commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#f5f5f5] rounded-[24px] p-8 flex flex-col gap-6"
            >
              <p className="text-[16px] leading-[1.6] text-[#0d0d0d]/80 font-medium italic italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                  <Image
                    src={`https://i.pravatar.cc/150?u=${testimonial.name}`}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[16px] font-bold text-[#0d0d0d]">
                    {testimonial.name}
                  </h4>
                  <p className="text-[14px] text-[#0d0d0d]/60 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
