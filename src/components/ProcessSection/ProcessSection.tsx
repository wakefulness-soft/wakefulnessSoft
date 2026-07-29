import s from "./ProcessSection.module.css"

interface ICoffeToSystemStep {
  step: string;
  description: string;
}

const steps: ICoffeToSystemStep[] = [
  {
    "step": "Selecting the beans",
    "description": "Gathering requirements and understanding project goals to choose the right technologies and approach."
  },
  {
    "step": "Grinding the coffee",
    "description": "Breaking down the project into modules, services, or components for structured development."
  },
  {
    "step": "Heating the water",
    "description": "Setting up the development environment, databases, and infrastructure needed to run the system."
  },
  {
    "step": "Brewing the coffee",
    "description": "Writing and integrating the actual code, connecting components, and implementing logic."
  },
  {
    "step": "Filtering the brew",
    "description": "Code review, refactoring, and removing technical debt or inefficiencies."
  },
  {
    "step": "Adding milk and sugar",
    "description": "Polishing the user interface, adding final features, and optimizing performance before deployment."
  }
];

export const ProcessSection = () => {
  return (
    <section
      id="process"
      // className="relative scroll-mt-24 border-y border-mypurple py-24 sm:py-32"
      className={s.section}
    >
      <div className={s.container}>
        <div className={s.hero}>
          <span className={s.eyebrow}>
            How we work
          </span>
          <h2 className={s.headline}>
            Your bedtime, our <em>check-in</em>.
          </h2>
          <p className={s.body}>Just like in the perfect extraction process, we work calmly, eliminating noise to achieve the best result.</p>
        </div>
        <div className={s.body}>
          {/* <div className="lg:sticky lg:top-28 lg:self-start"> */}
            <div className="grid grid-cols-2 gap-10">
              <div className={s.stepsTimeLine}>
                <div className="font-mono border rounded-4xl w-20 h-20">1</div>
                <div className="font-mono mt-2 border rounded-4xl w-20 h-20">2</div>
                <div className="font-mono mt-2 border rounded-4xl w-20 h-20">3</div>
                <div className="font-mono mt-2 border rounded-4xl w-20 h-20">4</div>
                <div className="font-mono mt-2 border rounded-4xl w-20 h-20">5</div>
                <div className="font-mono mt-2 border rounded-4xl w-20 h-20">6</div>
              </div>
              <div className={s.stepCardsContainer}>
                {
                  steps.map(step => (
                    <div className={s.stepCard}>
                      <span className={s.stepTitle}>{step.step}</span>
                      <p className={s.stepDesc}>{step.description}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </section>
  )
}
