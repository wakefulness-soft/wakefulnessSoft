import s from "./TestimonialSection.module.css";
import type { ITestimonials } from "./../../types/testimonial.interface";
import { TestimonialCarousel } from "../ui/TestimonialCard/TestimonialCard";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";

const slides: ITestimonials[] = [
  {
    name: "Elena Rodríguez",
    date: "2026-08-19",
    content:
      "Hiring Wakefulness Soft was the best decision. They understood our SaaS needed solid architecture. Clean code that maintenance teams love.",
  },
  {
    name: "Miguel Ángel Torres",
    date: "2026-08-21",
    content:
      "The Phantom API is incredibly fast and stable. Rate limiting and smart cache exceeded expectations. Specialists in building strong foundations.",
  },
  {
    name: "Sofía Méndez",
    date: "2026-08-23",
    content:
      "We value their craftsmanship over shortcuts. They delivered the Drift UI component system, accessible and without unnecessary dependencies.",
  },
  {
    name: "Carlos Vega",
    date: "2026-08-25",
    content:
      "Smooth collaboration from requirements to deployment. Hollow CLI saved hours of automation. Developers prioritizing predictable execution are refreshing.",
  },
  {
    name: "Ana Belén Cruz",
    date: "2026-08-27",
    content:
      "Attention to detail in every commit is impressive. They understood our scalability and performance needs from day one.",
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonial" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.hero}>
            <EyebrowComponent text="Testimonial"/>
            <HeadlineComponent title="What they say."/>
            <p className={s.body}>
              Our work speaks even when we are not present.
            </p>
          </div>
        </div>
        <div className={s.carousel}>
          <div className={s.testimonials}>
            <TestimonialCarousel testimonials={slides} />
          </div>
        </div>
      </div>
    </section>
  );
};
