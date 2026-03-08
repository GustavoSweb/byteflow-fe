"use client";

export default function BenefitsSection() {
  return (
    <section className="bg-white px-[60px] py-[152px] relative flex items-center justify-center overflow-hidden w-full md:px-[20px] md:py-[100px]">
      {/* Blurred background element */}
      <div className="absolute bottom-[-59px] left-1/2 -translate-x-1/2 w-[581px] h-[118px] bg-[#5cf28e] blur-[37.5px] opacity-30 rounded-full z-0 pointer-events-none md:w-[300px]" />
      
      <div className="max-w-[1200px] w-full flex flex-col items-center justify-center relative z-[1]">
        <h2 className="max-w-[1000px] text-center text-black/70 text-[40px] font-bold leading-[1.32] tracking-[-0.44px] m-0 lg:text-[32px] md:text-[24px]">
          At Upreach, we deliver real results through{" "}
          <span className="text-primary-dark">high-converting marketing strategies</span> designed to
          scale your business, attract the right audience, and{" "}
          <span className="text-primary-dark">maximize ROI with precision.</span>
        </h2>
      </div>
    </section>
  );
}
