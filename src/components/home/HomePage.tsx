import type { FC } from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorksSection from "./HowItWorksSection";
import PricingSection from "./PricingSection";
import LeadCapture from "./LeadCapture";
import AboutSection from "./AboutSection";
import FaqSection from "./FaqSection";
import CtaBannerSection from "./CtaBannerSection";
import { FlowPath } from "@/shared/motion/FlowPath";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  return (
    <main className="relative">
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <WhyChooseUs />
      <LeadCapture />
      <PricingSection />
      <AboutSection />
      <FaqSection />
      <CtaBannerSection />
      <FlowPath />
    </main>
  );
};

export default HomePage;
