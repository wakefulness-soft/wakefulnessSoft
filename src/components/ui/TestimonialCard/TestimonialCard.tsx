import { ChevronLeft, ChevronRight, User } from "lucide-react";
import s from "./TestimonialCard.module.css";
import type { ITestimonials } from "./../../../types/testimonial.interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type TestimonialCarouselProps = {
  testimonials: ITestimonials[];
};

type TestimonialCardProps = {
  testimonial: ITestimonials;
  moveNext: () => void;
  movePrev: () => void;
};

export const TestimonialCarousel = ({
  testimonials,
}: TestimonialCarouselProps) => {
  // TestimonialCarousel handles navigation
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentTestimonial = testimonials[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div>
      <TestimonialCard
        testimonial={currentTestimonial}
        moveNext={handleNext}
        movePrev={handlePrev}
      />
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  moveNext,
  movePrev,
}: TestimonialCardProps) => {
  const { t } = useTranslation();

  return (
    <article className={s.testimonialCard}>
      <figure className={s.cardFigure}>
        <div className={s.score}>
          <User className={s.scoreIcon} />
        </div>
      </figure>
      <div className={s.cardContent} aria-live="polite">
        <time>{testimonial.date}</time>

        <h3>{testimonial.name}</h3>

        <p>{testimonial.content}</p>
      </div>
      <div className={s.carouselActions}>
        <button type="button" onClick={movePrev} aria-label={t("testimonials.actions.previous")}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" onClick={moveNext} aria-label={t("testimonials.actions.next")}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};
