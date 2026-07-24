import s from './WhySection.module.css'

interface IPillar {
  displayId: string;
  title: string;
  content: string;
}

const PILLARS: IPillar[] = [
  {
    displayId: '01',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque odio nesciunt quia expedita doloremque magnam facilis tenetur dolorem architecto explicabo.'
  },
  {
    displayId: '02',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum consequuntur enim quae consectetur, nisi dolore?'
  },
  {
    displayId: '03',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro distinctio ea culpa cum dolorem blanditiis laborum quis?'
  },
  {
    displayId: '04',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim doloribus iste dolores nihil nostrum dolore et ex fugiat ducimus?'
  },
  {
    displayId: '05',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit minus alias aut vel recusandae.'
  },
  {
    displayId: '06',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus vel facere sed perferendis mollitia aliquam nostrum!'
  },
]

export const WhySection = () => {
  return (
    <section
      id="why"
      className={s.section}
    >
      {/* <div className="mx-auto max-w-6xl px-4 sm:px-6"> */}
      <div className={s.container}>
        {/* <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"> */}
        <div className={s.content}>
          {/* <div className="lg:sticky lg:top-28 lg:self-start"> */}
          <div className={s.hero}>
            {/* <span className="text-sm font-medium text-accent"> */}
            <span className={s.eyebrow}>
              Why Wakefulness
            </span>
            {/* <h2 className="mt-2 mb-6 text-balance text-3xl text-snow font-semibold tracking-tight sm:text-4xl lg:text-5xl"> */}
            <h2 className={s.headline}>
              The great <em>choice</em> to design your system from scratch
            </h2>
            <p className={s.body}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur ipsum maxime magnam</p>
            <a
              href="#contact"
              // className="text-balance border border-border text-snow px-4 py-2 rounded-xl transition-colors hover:bg-hover"
              className={s.contactLink}
            >
              Start a conversation
            </a>
          </div>
          {/* TODO: Add responsive design */}
          {/* <div className="grid overflow-hidden border-2 border-border rounded-2xl gap-px sm:grid-cols-2"> */}
          <div className={s.pillarsContainer}>
            {
              PILLARS.map((item, idx) => (
                // <div key={idx} className="h-full p-6 bg-secondary font-normal transition-colors hover:bg-hover2">
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
