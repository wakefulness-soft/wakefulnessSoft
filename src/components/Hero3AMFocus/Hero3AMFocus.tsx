import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import s from "./Hero3AMFocus.module.css";

export const Hero3AMFocus = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const trackSpotlight = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    sectionRef.current?.style.setProperty(
      "--cursor-x",
      `${event.clientX - bounds.left}px`,
    );
    sectionRef.current?.style.setProperty(
      "--cursor-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  const setTracking = (tracking: boolean) => {
    sectionRef.current?.classList.toggle(s.tracking, tracking);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className={s.section}
      onPointerMove={trackSpotlight}
      onPointerEnter={() => setTracking(true)}
      onPointerLeave={() => setTracking(false)}
      aria-labelledby="focus-hero-title"
    >
      <div className={s.grid} aria-hidden="true" />
      <div className={s.ambientGlow} aria-hidden="true" />

      <div className={s.reveals} aria-hidden="true">
        <pre className={s.codeLeft}>
          <span>// 03:07 — the noise is gone</span>{"\n"}
          <b>const</b> perspective = await think.deeply();{"\n"}
          <b>return</b> perspective.withoutShortcuts();
        </pre>

        <pre className={s.codeRight}>
          <span>// architecture / nebula-platform</span>{"\n"}
          idea → prototype → product{"\n"}
          tests ✓ &nbsp; performance ✓ &nbsp; craft ✓
        </pre>

        <div className={s.diagram}>
          <span className={s.node}>idea</span>
          <i />
          <span className={s.node}>clarity</span>
          <i />
          <span className={`${s.node} ${s.nodeAccent}`}>awake</span>
        </div>

        <p className={s.hiddenPhrase}>Craftsmanship over shortcuts.</p>
      </div>

      <div className={s.content}>
        <div className={s.topline}>
          <p className={s.conceptLabel}>
            <span>01</span> {t("heroConcepts.focus.label")}
          </p>
          <p className={s.time}>03:00 AM · GDL</p>
        </div>

        <div className={s.copy}>
          <p className={s.eyebrow}>{t("heroConcepts.focus.eyebrow")}</p>
          <h1 id="focus-hero-title" className={s.title}>
            {t("heroConcepts.focus.titleLine1")}
            <em>{t("heroConcepts.focus.titleAccent")}</em>
            {t("heroConcepts.focus.titleLine2")}
          </h1>
          <p className={s.description}>{t("heroConcepts.focus.description")}</p>

          <div className={s.actions}>
            <a className={s.primaryAction} href="#contact">
              {t("heroConcepts.common.startProject")}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className={s.secondaryAction} href="#projects">
              {t("heroConcepts.common.exploreWork")}
            </a>
          </div>
        </div>

        <div className={s.discoveryHint}>
          <MousePointer2 size={16} aria-hidden="true" />
          <span>{t("heroConcepts.focus.hint")}</span>
        </div>

        <nav className={s.variantNav} aria-label={t("heroConcepts.common.compareLabel")}>
          <a href="#top" aria-current="page">01</a>
          <a href="#espresso-hero">02</a>
          <a href="#sleeping-code-hero">03</a>
          <a href="#terminal-hero">04</a>
        </nav>
      </div>
    </section>
  );
};
