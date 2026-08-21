import { ChevronLeft, ChevronRight, User } from "lucide-react";
import s from "./TestimonialCard.module.css";
import type { ITestimonials } from "./../../../types/testimonial.interface";
import { useState } from "react";

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
  return (
    <article className={s.testimonialCard}>
      <figure className={s.cardFigure}>
        <div className={s.score}>
          <User className={s.scoreIcon} />
        </div>
      </figure>
      <div className={s.cardContent}>
        <time>{testimonial.date}</time>

        <h2>{testimonial.name}</h2>

        <p>{testimonial.content}</p>
      </div>
      <div className={s.carouselActions}>
        <button onClick={movePrev}>
          <ChevronLeft />
        </button>
        <button onClick={moveNext}>
          <ChevronRight />
        </button>
      </div>
    </article>
  );
};
