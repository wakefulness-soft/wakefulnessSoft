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
    name: "Elena Rodríguez",
    extraData: "CTO, TechFlow Remote",
    comment: "Contratar a Wakefulness Soft fue la mejor decisión. Entendieron que nuestra plataforma SaaS necesitaba una arquitectura sólida desde el minuto uno. El código es tan limpio que hasta mi equipo de mantenimiento lo ama. Es raro encontrar un equipo que valore la calidad tanto como la velocidad.",
    score: 5
  },
  {
    name: "Miguel Ángel Torres",
    extraData: "Lead Developer, API Systems",
    comment: "La API Phantom que desarrollaron para nosotros es increíblemente rápida y estable. La implementación de rate limiting y la caché inteligente superaron nuestras expectativas. Definitivamente, son especialistas en construir fundamentos fuertes, tal como prometen.",
    score: 5
  },
  {
    name: "Sofía Méndez",
    extraData: "Product Manager, DesignHub",
    comment: "Lo que más valoro es su enfoque en 'artesanía sobre atajos'. No solo entregaron el sistema de componentes Drift UI, sino que lo hicieron accesible y sin dependencias innecesarias. Se nota que les importa el producto final tanto como nosotros.",
    score: 5
  },
  {
    name: "Carlos Vega",
    extraData: "Founder, StartupLatam",
    comment: "Tuvimos una colaboración fluida desde la fase de requisitos hasta el despliegue. Su herramienta Hollow CLI nos ahorró horas de automatización. Es refrescante trabajar con desarrolladores que priorizan la ejecución predecible y no solo prometen cosas.",
    score: 4
  },
  {
    name: "Ana Belén Cruz",
    extraData: "Senior Architect, CloudNine",
    comment: "La atención al detalle en cada commit es impresionante. Entendieron perfectamente nuestra necesidad de escalabilidad y performance desde el día uno. Si buscas un equipo que trate tu proyecto como si fuera el suyo propio, este es el lugar.",
    score: 5
  }
];


export const TestimonialSection = () => {
  const renderCard = (slide: ITestimonials, i: number) => (
    <article className={s.card} key={i}>
      <header className={s.cardBar}>
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        {/* <span className={s.cardFilename}>{project.filename}</span> */}
        <span className={s.cardFilename}>filename</span>
      </header>
      <div className={s.cardBody}>
        <h3 className={s.projectName}>{slide.name}</h3>
        <p className={s.desc}>{slide.comment}</p>
        <div className={s.stack}>
          {Array.from({ length: slide.score }).map((_, i) => (
            <Flame key={i} />
          ))}
        </div>
      </div>
    </article>
  );

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
            {slides.map((item, i) => renderCard(item, i))}
          </div>
        </div>
      </div>
    </section>
  );
};
