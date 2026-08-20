import { CircleDashed } from "lucide-react";

import s from "./HeroSection.module.css";

export const HeroSection = () => {
  return (
    <section id="top" className={s.section}>
      <div className={s.eyebrow}>
        <CircleDashed />
        <span>Your success is our goal</span>
      </div>
      <div className={s.container}>
        <div className={s.content}>
          <h1 className={s.title}>
            We turn bold ideas into
            <span className={s.highlight}>software that wakes up</span>
            <span style={{ display: "block" }}>your business.</span>
          </h1>

          <p className={s.slogan}>
            Designing your dream is our most cherished task
          </p>

          <div className={s.actions}>
            <a href="#contact" className={`${s.link} ${s.linQuote}`}>
              Request a Quote
            </a>
            <a href="#projects" className={`${s.link} ${s.linkReview}`}>
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
