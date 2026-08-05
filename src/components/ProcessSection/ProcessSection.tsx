import s from "./ProcessSection.module.css";
import React, { useEffect, useState } from "react";
import { Flame, Layers, Map, ScanEye, Sparkles, Zap } from "lucide-react";

interface ICoffeToSystemStep {
  stepName: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Record<number, ICoffeToSystemStep> = {
  1: {
    stepName: "Selecting the beans",
    description:
      "Gathering requirements and understanding project goals to choose the right technologies and approach.",
    icon: <Map />,
  },
  2: {
    stepName: "Grinding the coffee",
    description:
      "Breaking down the project into modules, services, or components for structured development.",
    icon: <Layers />,
  },
  3: {
    stepName: "Heating the water",
    description:
      "Setting up the development environment, databases, and infrastructure needed to run the system.",
    icon: <Flame />,
  },
  4: {
    stepName: "Brewing the coffee",
    description:
      "Writing and integrating the actual code, connecting components, and implementing logic.",
    icon: <Zap />,
  },
  5: {
    stepName: "Filtering the brew",
    description:
      "Code review, refactoring, and removing technical debt or inefficiencies.",
    icon: <ScanEye />,
  },
  6: {
    stepName: "Adding milk and sugar",
    description:
      "Polishing the user interface, adding final features, and optimizing performance before deployment.",
    icon: <Sparkles />,
  },
};

const getStepCard = (key: number): React.ReactNode => {
  const step = steps[key];
  return (
    <div className={s.stepCard}>
      <div className={s.stepIcon}>{step.icon}</div>
      <span className={s.stepTitle}>{step.stepName}</span>
      <p className={s.stepDesc}>{step.description}</p>
    </div>
  );
};

export const ProcessSection = () => {
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState<React.ReactNode>();

  useEffect(() => {
    setCurrentStep(getStepCard(step));
  }, [step]);
  1;

  const handleChangeStep = (stepId: number) => {
    setStep(stepId);
  };

  return (
    <section id="process" className={s.section}>
      <div className={s.container}>
        <div className={s.hero}>
          <span className={s.eyebrow}>How we work</span>
          <h2 className={s.headline}>
            Your bedtime, our <em>check-in</em>.
          </h2>
          <p className={s.body}>
            Just like in the perfect extraction process, we work calmly,
            eliminating noise to achieve the best result.
          </p>
        </div>
        <div className={s.body}>
          <div className={s.timelineContainer}>
            <div className={s.stepsTimeLine}>
              <ol>
                {Object.keys(steps).map((stepNumber) => (
                  <li key={stepNumber}>
                    {/* Botón interactivo para accesibilidad de teclado */}
                    <button
                      type="button"
                      className={s.timelineStep}
                      onMouseEnter={() => handleChangeStep(+stepNumber)}
                      aria-label={`Ir al paso ${stepNumber}: ${steps[+stepNumber].stepName}`}
                    >
                      <div
                        className={`${s.timelineStepIcon} ${+stepNumber <= step ? s.timelineStepIconVisited : ""}`}
                      >
                        <span>{steps[+stepNumber].icon}</span>
                      </div>

                      {/* Identificación del paso agrupada semánticamente */}
                      <p>
                        <span className={s.timelineStepNumber}>
                          {stepNumber.toString().padStart(2, "0")}
                        </span>
                        <span className={s.timelineStepName}>
                          {steps[+stepNumber].stepName}
                        </span>
                      </p>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.stepCardsContainer}>{currentStep}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
