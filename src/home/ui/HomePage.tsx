import type { FC } from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
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
      <PricingSection />
      <LeadCapture />
      <TestimonialsSection />
      <FaqSection />
      <CtaBannerSection />
    </main>
  );
};
