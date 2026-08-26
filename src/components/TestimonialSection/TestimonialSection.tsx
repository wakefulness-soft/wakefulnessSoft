import { useTranslation } from "react-i18next";
import s from "./TestimonialSection.module.css";
import type { ITestimonials } from "./../../types/testimonial.interface";
import { TestimonialCarousel } from "../ui/TestimonialCard/TestimonialCard";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";

export const TestimonialSection = () => {
  const { t } = useTranslation();

  // Mapea la lista traducida directamente desde el archivo de traducción
  const slides = t("testimonials.slides", { returnObjects: true }) as ITestimonials[];

  return (
    <section id="testimonial" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.hero}>
            <EyebrowComponent text={t("testimonials.eyebrow")} />
            <HeadlineComponent title={t("testimonials.headline")} />
            <p className={s.body}>
              {t("testimonials.sub")}
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