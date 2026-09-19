import { useTranslation } from "react-i18next";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";
import s from "./CapabilitiesSection.module.css";

const CAPABILITIES = ["frontend", "experience", "delivery"] as const;

export const CapabilitiesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="capabilities" className={s.section}>
      <div className={s.inner}>
        <div className={s.header}>
          <EyebrowComponent text={t("capabilities.eyebrow")} />
          <HeadlineComponent title={t("capabilities.headline")} />
          <p>{t("capabilities.intro")}</p>
        </div>

        <div className={s.panel}>
          <div className={s.panelBar} aria-hidden="true">
            <span /><span /><span />
            <code>verified_capabilities.md</code>
          </div>
          <div className={s.grid}>
            {CAPABILITIES.map((key, index) => (
              <article className={s.item} key={key}>
                <span className={s.prompt}>0{index + 1} / verified here</span>
                <h3>{t(`capabilities.items.${key}.title`)}</h3>
                <p>{t(`capabilities.items.${key}.description`)}</p>
                <ul>
                  {(t(`capabilities.items.${key}.details`, { returnObjects: true }) as string[]).map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <p className={s.disclosure}>{t("capabilities.disclosure")}</p>
      </div>
    </section>
  );
};
