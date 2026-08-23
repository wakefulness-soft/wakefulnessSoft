import { EyebrowComponent } from '../ui/EyebrowComponent/EyebrowComponent';
import { HeadlineComponent } from '../ui/HeadlineComponent/HeadlineComponent';
import s from './WhySection.module.css'

interface IPillar {
  displayId: string;
  title: string;
  content: string;
}

const PILLARS: IPillar[] = [
  {
    displayId: '01',
    title: 'Craftsmanship Over Shortcuts',
    content: "We don't chase quick fixes. Every feature is designed to be maintainable, scalable, and built with long-term quality in mind."
  },
  {
    displayId: '02',
    title: 'Fresh Perspective',
    content: "The quietest hours often produce the clearest thinking. We approach problems with curiosity and thoughtful engineering rather than rushing toward the first solution."
  },
  {
    displayId: '03',
    title: 'Strong Foundations',
    content: "Like a good espresso, great software starts with quality ingredients. Clean architecture, maintainable code, and scalable design are the foundation of everything we build."
  },
  {
    displayId: '04',
    title: 'Performance by Design',
    content: "Fast software creates better experiences. From database queries to frontend interactions, performance is considered from day one."
  },
  {
    displayId: '05',
    title: 'Quality in Every Commit',
    content: "Every release reflects our standards. We test, review, refine, and polish because details matter."
  },
  {
    displayId: '06',
    title: 'Reliable Delivery',
    content: "Ideas only matter when they become reality. We focus on predictable execution, consistent progress, and delivering software you can confidently rely on."
  },
];

const PILLARS2: IPillar[] = [
  {
    displayId: '01',
    title: 'Craftsmanship Over Shortcuts',
    content: 'We build clean, maintainable software designed to last—not just quick fixes.'
  },
  {
    displayId: '02',
    title: 'Fresh Perspective',
    content: 'We solve problems with curiosity, thoughtful engineering, and a fresh point of view.'
  },
  {
    displayId: '03',
    title: 'Strong Foundations',
    content: 'Clean architecture and scalable design are the foundation of every solution we build.'
  },
  {
    displayId: '04',
    title: 'Performance by Design',
    content: 'Performance is built in from day one, creating fast and reliable user experiences.'
  },
  {
    displayId: '05',
    title: 'Quality in Every Commit',
    content: 'Every release is carefully reviewed, refined, and polished to meet our standards.'
  },
  {
    displayId: '06',
    title: 'Reliable Delivery',
    content: 'We deliver predictable progress with software your business can depend on.'
  },
];

export const WhySection = () => {
  return (
    <section
      id="why"
      className={s.section}
    >
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.hero}>
            <EyebrowComponent text='Why Wakefulness'/>
            <HeadlineComponent title='Where great software stays awake.' />
            <p className={s.body}>We believe the best ideas don't appear because it's late at night — they appear because someone cares enough to keep refining them.</p>
            <p className={s.body}>Every project we build is treated like a product we'd proudly sign our names to, combining technical excellence with thoughtful collaboration from the first conversation to the final deployment.</p>
            <a
              href="#contact"
              className={s.contactLink}
            >
              Start a conversation
            </a>
          </div>
          <div className={s.pillarsContainer}>
            {
              PILLARS.map((item, idx) => (
                <div key={idx} className={s.pillarItem}>
                  <span className={s.pillarNumber}>{item.displayId}</span>
                  <h3 className={s.pillarTitle}>{item.title}</h3>
                  <p className={s.pillarContent}>{item.content}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
