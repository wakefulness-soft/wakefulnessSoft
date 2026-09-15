
import { ArrowRight, Code2, Compass, Smartphone, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";
import s from "./ServicesSection.module.css";

const SERVICES = [
  { key: "web", icon: Code2 },
  { key: "mobile", icon: Smartphone },
  { key: "consulting", icon: Compass },
  { key: "support", icon: Wrench },
] as const;

export const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <div>
            <EyebrowComponent text={t("services.eyebrow")} />
            <HeadlineComponent title={t("services.headline")} />
          </div>
          <p className={s.intro}>{t("services.intro")}</p>
        </div>

        <div className={s.grid}>
          {SERVICES.map(({ key, icon: Icon }, index) => (
            <article className={s.card} key={key}>
              <div className={s.cardTop}>
                <span className={s.number}>0{index + 1}</span>
                <Icon aria-hidden="true" />
              </div>
              <h3>{t(`services.items.${key}.name`)}</h3>
              <p className={s.description}>{t(`services.items.${key}.description`)}</p>
              <dl className={s.details}>
                {/* <div>
                  <dt>{t("services.needLabel")}</dt>
                  <dd>{t(`services.items.${key}.need`)}</dd>
                </div> */}
                <div>
                  <dt>{t("services.benefitLabel")}</dt>
                  <dd>{t(`services.items.${key}.benefit`)}</dd>
                </div>
              </dl>
              <a href="#contact" className={s.link}>
                {t("services.action")}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {/* <p className={s.scopeNote}>{t("services.scopeNote")}</p> */}
      </div>
    </section>
  );
};
