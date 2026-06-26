import type { FC } from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorksSection from "./HowItWorksSection";
import PricingSection from "./PricingSection";
import LeadCapture from "./LeadCapture";
import TestimonialsSection from "./TestimonialsSection";
import FaqSection from "./FaqSection";
import CtaBannerSection from "./CtaBannerSection";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <WhyChooseUs />
      <LeadCapture />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBannerSection />
    </main>
  );
};
