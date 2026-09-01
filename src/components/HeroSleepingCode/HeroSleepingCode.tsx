import { ArrowUpRight, MoonStar, Sparkles } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import s from "./HeroSleepingCode.module.css";

export const HeroSleepingCode = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateGlow = () => {
      frame = 0;
      const section = sectionRef.current;
      const brand = brandRef.current;
      if (!section || !brand) return;

      const bounds = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height, 1)));
      brand.style.setProperty("--scroll-glow", String(progress));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateGlow);
    };

    updateGlow();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const tiltCard = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cardRef.current?.style.setProperty("--rotate-x", `${y * -12}deg`);
    cardRef.current?.style.setProperty("--rotate-y", `${x * 12}deg`);
    cardRef.current?.style.setProperty("--light-x", `${(x + 0.5) * 100}%`);
    cardRef.current?.style.setProperty("--light-y", `${(y + 0.5) * 100}%`);
  };

  const setDayMode = (active: boolean) => {
    sectionRef.current?.classList.toggle(s.dayMode, active);
    if (!active) {
      cardRef.current?.style.setProperty("--rotate-x", "0deg");
      cardRef.current?.style.setProperty("--rotate-y", "0deg");
    }
  };

  return (
    <section
      id="sleeping-code-hero"
      ref={sectionRef}
      className={s.section}
      aria-labelledby="sleeping-code-title"
    >
      <div className={s.sunrise} aria-hidden="true" />
      <div className={s.orbit} aria-hidden="true"><i /></div>

      <div className={s.inner}>
        <p ref={brandRef} className={s.stickyBrand}>Wakefulness Soft®</p>

        <div className={s.heading}>
          <p className={s.conceptLabel}>
            <span>03</span> {t("heroConcepts.sleepingCode.label")}
          </p>
          <h2 id="sleeping-code-title" className={s.title}>
            {t("heroConcepts.sleepingCode.titleLine1")}
            <em>{t("heroConcepts.sleepingCode.titleAccent")}</em>
          </h2>
          <p className={s.description}>{t("heroConcepts.sleepingCode.description")}</p>
        </div>

        <div className={s.stage}>
          <div className={s.nightNote}>
            <MoonStar size={16} aria-hidden="true" />
            <span>{t("heroConcepts.sleepingCode.night")}</span>
          </div>

          <article
            ref={cardRef}
            className={s.codeCard}
            onPointerMove={tiltCard}
            onPointerEnter={() => setDayMode(true)}
            onPointerLeave={() => setDayMode(false)}
            onFocus={() => setDayMode(true)}
            onBlur={() => setDayMode(false)}
            tabIndex={0}
            aria-label={t("heroConcepts.sleepingCode.cardLabel")}
          >
            <div className={s.cardShine} aria-hidden="true" />
            <div className={s.windowBar}>
              <span className={s.dots}><i /><i /><i /></span>
              <span>awake.ts</span>
              <span className={s.live}><i /> LIVE</span>
            </div>
            <pre className={s.code}>
              <span><b>type</b> Project = &#123;</span>{"\n"}
              <span>  idea: <i>BoldIdea</i>;</span>{"\n"}
              <span>  shortcuts: <strong>false</strong>;</span>{"\n"}
              <span>&#125;;</span>{"\n\n"}
              <span><b>export async function</b> <mark>wake</mark>(project: Project) &#123;</span>{"\n"}
              <span>  <b>const</b> product = <b>await</b> craft(project, &#123;</span>{"\n"}
              <span>    architecture: <i>&quot;clean&quot;</i>,</span>{"\n"}
              <span>    performance: <i>&quot;by-design&quot;</i>,</span>{"\n"}
              <span>  &#125;);</span>{"\n\n"}
              <span>  <b>return</b> ship(product).beforeMorning();</span>{"\n"}
              <span>&#125;</span>
            </pre>
            <div className={s.cardFooter}>
              <span>Ln 12, Col 1</span>
              <span>TypeScript · UTF-8</span>
            </div>
          </article>

          <div className={s.dayNote}>
            <Sparkles size={16} aria-hidden="true" />
            <span>{t("heroConcepts.sleepingCode.day")}</span>
          </div>
        </div>

        <a className={s.action} href="#projects">
          {t("heroConcepts.common.exploreWork")}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
