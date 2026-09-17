import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import s from "./TestimonialCard.module.css";
import type { ITestimonials } from "./../../../types/testimonial.interface";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type TestimonialCarouselProps = {
  testimonials: ITestimonials[];
};

type TestimonialCardProps = {
  testimonial: ITestimonials;
};

export const TestimonialCarousel = ({
  testimonials,
}: TestimonialCarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { t } = useTranslation();

  const currentTestimonial = testimonials[currentIdx];
  const canNavigate = testimonials.length > 1;

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  if (!currentTestimonial) return null;

  return (
    <div className={s.carouselShell}>
      <div className={s.windowBar} aria-hidden="true">
        <span className={s.windowDots}>
          <span />
          <span />
          <span />
        </span>
        <span className={s.filename}>{t("testimonials.panelLabel")}</span>
        <span className={s.ready}>● ready</span>
      </div>

      <TestimonialCard testimonial={currentTestimonial} />

      <div className={s.carouselToolbar}>
        <span className={s.counter}>
          {t("testimonials.counter", {
            current: String(currentIdx + 1).padStart(2, "0"),
            total: String(testimonials.length).padStart(2, "0"),
          })}
        </span>
        <div className={s.carouselActions}>
          <button
            type="button"
            onClick={handlePrev}
            aria-label={t("testimonials.actions.previous")}
            disabled={!canNavigate}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label={t("testimonials.actions.next")}
            disabled={!canNavigate}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <article className={s.testimonialCard}>
      <Quote className={s.quoteIcon} aria-hidden="true" />
      <div className={s.cardContent} aria-live="polite" aria-atomic="true">
        <blockquote>
          <p>{testimonial.content}</p>
        </blockquote>
        <footer className={s.attribution}>
          <strong>{testimonial.name}</strong>
          {testimonial.date ? (
            <time dateTime={testimonial.date}>{testimonial.date}</time>
          ) : null}
        </footer>
      </div>
    </article>
  );
};
