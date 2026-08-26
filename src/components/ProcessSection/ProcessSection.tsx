import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Flame, Layers, Map, ScanEye, Sparkles, Zap } from "lucide-react";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";
import s from "./ProcessSection.module.css";

interface IStepConfig {
  icon: React.ReactNode;
}

const STEP_ICONS: Record<number, IStepConfig> = {
  1: { icon: <Map /> },
  2: { icon: <Layers /> },
  3: { icon: <Flame /> },
  4: { icon: <Zap /> },
  5: { icon: <ScanEye /> },
  6: { icon: <Sparkles /> },
};

export const ProcessSection = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);

  const stepKeys = Object.keys(STEP_ICONS).map(Number);

  // Obtener los datos traducidos del paso seleccionado actualmente
  const currentStepData = {
    stepName: t(`processSection.steps.${activeStep}.stepName`),
    description: t(`processSection.steps.${activeStep}.description`),
    icon: STEP_ICONS[activeStep].icon,
  };

  return (
    <section id="process" className={s.section}>
      <div className={s.container}>
        <div className={s.hero}>
          <EyebrowComponent text={t("processSection.eyebrow")} />
          <HeadlineComponent title={t("processSection.headline")} />
          <p className={s.body}>{t("processSection.body")}</p>
        </div>

        <div className={s.body}>
          <div className={s.timelineContainer}>
            <div className={s.stepsTimeLine}>
              <ol>
                {stepKeys.map((stepNumber) => {
                  const stepName = t(`processSection.steps.${stepNumber}.stepName`);

                  return (
                    <li key={stepNumber}>
                      <button
                        type="button"
                        className={s.timelineStep}
                        onMouseEnter={() => setActiveStep(stepNumber)}
                        onClick={() => setActiveStep(stepNumber)}
                        aria-label={t("processSection.ariaLabel", {
                          stepNumber,
                          stepName,
                        })}
                      >
                        <div
                          className={`${s.timelineStepIcon} ${
                            stepNumber <= activeStep ? s.timelineStepIconVisited : ""
                          }`}
                        >
                          <span>{STEP_ICONS[stepNumber].icon}</span>
                        </div>

                        <p>
                          <span className={s.timelineStepNumber}>
                            {stepNumber.toString().padStart(2, "0")}
                          </span>
                          <span className={s.timelineStepName}>{stepName}</span>
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Tarjeta del paso seleccionado */}
            <div className={s.stepCardsContainer}>
              <div className={s.stepCard}>
                <div className={s.stepIcon}>{currentStepData.icon}</div>
                <span className={s.stepTitle}>{currentStepData.stepName}</span>
                <p className={s.stepDesc}>{currentStepData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};