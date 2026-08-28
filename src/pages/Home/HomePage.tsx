import CtaSection from "../../components/CtaSection/CtaSection";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ProcessSection } from "../../components/ProcessSection/ProcessSection";
import ProjectsSection from "../../components/ProjectsSection/ProjectsSection";
import { TestimonialSection } from "../../components/TestimonialSection/TestimonialSection";
import { WhySection } from "../../components/WhySection/WhySection";
import AboutSection from "../About/About";

export const HomePage = () => {
  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      <HeroSection />
      {/* <ServicesSection /> */}
      <AboutSection />
      <WhySection />
      <ProcessSection />
      <ProjectsSection />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
};
