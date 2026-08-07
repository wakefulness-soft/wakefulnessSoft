import { Flame } from "lucide-react";
import s from "./TestimonialSection.module.css";

interface ITestimonials {
  name: string;
  extraData?: string;
  comment: string;
  score: number;
}

const slides: ITestimonials[] = [
  {
    name: "Lorem ipsum",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos iste excepturi velit eligendi et?",
    score: 3,
    extraData: "Lorem, ipsum",
  },
  {
    name: "Lorem ipsum",
    extraData: "Lorem, ipsum",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos iste excepturi velit eligendi et?",
    score: 4,
  },
  {
    name: "Lorem ipsum",
    extraData: "Lorem, ipsum",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos iste excepturi velit eligendi et?",
    score: 5,
  },
  {
    name: "Lorem ipsum",
    extraData: "Lorem, ipsum",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos iste excepturi velit eligendi et?",
    score: 1,
  },
  {
    name: "Lorem ipsum",
    extraData: "Lorem, ipsum",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos iste excepturi velit eligendi et?",
    score: 5,
  },
  {
    name: "Lorem ipsum",
    extraData: "Lorem, ipsum",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos iste excepturi velit eligendi et?",
    score: 3,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonial" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.hero}>
            <span className={s.eyebrow}>Testimonial</span>
            <h2 className={s.headline}>
              What they <em>say</em>.
            </h2>
            <p className={s.body}>
              Our work speaks even when we are not present.
            </p>
          </div>
        </div>
        <div className={s.carousel}>
          <div className={s.testimonials}>
            {slides.map((item, idx) => (
              <article className={s.testimonialCard} key={idx}>
                <header className={s.cardHeader}>
                  <span>
                    <h3>{item.name}</h3>
                  </span>
                  {item.extraData && <span>{item.extraData}</span>}
                </header>
                <main className={s.cardBody}>
                  <div className={s.score}>
                    {Array.from({ length: item.score }).map((n) => (
                      <Flame />
                    ))}
                  </div>
                  <p className={s.testimonial}>{item.comment}</p>
                </main>
                <footer className={s.cardFooter}>foo</footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
