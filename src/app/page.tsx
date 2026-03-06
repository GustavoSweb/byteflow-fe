import { Header } from "@/widgets/header";
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { Services } from "@/widgets/services";
import { Comparison } from "@/widgets/comparison";
import { Work } from "@/widgets/work";
import { Testimonials } from "@/widgets/testimonials";
import { FAQ } from "@/widgets/faq";
import { CTA } from "@/widgets/cta";
import { Footer } from "@/widgets/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Comparison />
      <Work />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
