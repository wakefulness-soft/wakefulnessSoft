import CtaSection from "../../components/CtaSection/CtaSection";
import { Hero3AMFocus } from "../../components/Hero3AMFocus/Hero3AMFocus";
import { HeroEspresso } from "../../components/HeroEspresso/HeroEspresso";
import { HeroMidnightTerminal } from "../../components/HeroMidnightTerminal/HeroMidnightTerminal";
import { HeroSleepingCode } from "../../components/HeroSleepingCode/HeroSleepingCode";
import { ProcessSection } from "../../components/ProcessSection/ProcessSection";
import ProjectsSection from "../../components/ProjectsSection/ProjectsSection";
import { TestimonialSection } from "../../components/TestimonialSection/TestimonialSection";
import { WhySection } from "../../components/WhySection/WhySection";
import AboutSection from "../About/About";

export const HomePage = () => {
  return (
    <main id="main-content" className="main-content" tabIndex={-1}>
      {/* <Hero3AMFocus />
      <HeroEspresso />
      <HeroSleepingCode /> */}
      <HeroMidnightTerminal />
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
