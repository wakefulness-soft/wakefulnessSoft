import { ArrowRight, Coffee, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import s from "./HeroEspresso.module.css";

const RUN_DURATION = 5600;

export const HeroEspresso = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => setProgress(100));
      return () => window.cancelAnimationFrame(frame);
    }

    let frame = 0;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const nextProgress = Math.min(100, ((now - startedAt) / RUN_DURATION) * 100);
      setProgress(nextProgress);
      if (nextProgress < 100) frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [run]);

  const stageIndex = useMemo(() => {
    if (progress < 25) return 0;
    if (progress < 52) return 1;
    if (progress < 82) return 2;
    return 3;
  }, [progress]);

  const isComplete = progress >= 100;
  const progressStyle = { "--fill": `${progress}%` } as CSSProperties;

  const replay = () => {
    setProgress(0);
    setRun((current) => current + 1);
  };

  return (
    <section
      id="espresso-hero"
      className={s.section}
      aria-labelledby="espresso-hero-title"
    >
      <div className={s.noise} aria-hidden="true" />
      <div className={s.steam} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className={s.inner}>
        <div className={s.headerRow}>
          <p className={s.conceptLabel}>
            <span>02</span> {t("heroConcepts.espresso.label")}
          </p>
          <button className={s.replay} type="button" onClick={replay}>
            <RotateCcw size={14} aria-hidden="true" />
            {t("heroConcepts.espresso.replay")}
          </button>
        </div>

        <div className={s.layout}>
          <div className={s.copy}>
            <p className={s.eyebrow}>
              <Coffee size={15} aria-hidden="true" />
              {t("heroConcepts.espresso.eyebrow")}
            </p>
            <h2 id="espresso-hero-title" className={s.title}>
              {t("heroConcepts.espresso.titleLine1")}
              <em>{t("heroConcepts.espresso.titleAccent")}</em>
            </h2>
            <p className={s.description}>{t("heroConcepts.espresso.description")}</p>
          </div>

          <div className={s.extractionCard}>
            <div className={s.cardTopline}>
              <span>brew_pipeline.sh</span>
              <span>{String(Math.round(progress)).padStart(2, "0")}%</span>
            </div>

            <div className={s.statusArea} aria-live="polite">
              <span className={s.prompt}>&gt;</span>
              <p>{t(`heroConcepts.espresso.stages.${stageIndex}`)}</p>
              <span className={s.cursor} aria-hidden="true" />
            </div>

            <div className={s.progressSlot}>
              {isComplete ? (
                <a className={s.transformedBar} href="#contact">
                  {t("heroConcepts.common.startProject")}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              ) : (
                <div
                  className={s.progressTrack}
                  style={progressStyle}
                  role="progressbar"
                  aria-label={t("heroConcepts.espresso.progressLabel")}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                >
                  <div className={s.progressFill} />
                </div>
              )}
            </div>

            <ol className={s.steps}>
              {[0, 1, 2, 3].map((step) => (
                <li
                  key={step}
                  className={step <= stageIndex ? s.stepActive : undefined}
                >
                  <span>{String(step + 1).padStart(2, "0")}</span>
                  {t(`heroConcepts.espresso.stepLabels.${step}`)}
                </li>
              ))}
            </ol>

            <p className={s.waitingNote}>{t("heroConcepts.espresso.waiting")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
