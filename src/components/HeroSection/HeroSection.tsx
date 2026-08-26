import { useTranslation } from "react-i18next";
import s from './HeroSection.module.css';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="top" className={s.section}>
        <div className={s.container}>
            <div className={s.content}>
                <h1 className={s.title}>
                    {t('hero.titleLine1')}
                    <span className={s.highlight}>
                        {t('hero.titleHighlight')}
                    </span>
                    <span style={{display: 'block'}}>{t('hero.titleLine3')}</span>
                </h1>

                <p className={s.slogan}>
                    {t('hero.slogan')}
                </p>

                <div className={s.actions}>
                    <a
                        href="#contact"
                        className={`${s.link} ${s.linQuote}`}
                    >
                        {t('hero.actions.requestQuote')}
                    </a>
                    <a
                        href="#projects"
                        className={`${s.link} ${s.linkReview}`}
                    >
                        {t('hero.actions.viewOurWork')}
                    </a>
                </div>
            </div>
        </div>
    </section>
  );
}
