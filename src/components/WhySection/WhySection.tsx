import { useTranslation } from 'react-i18next';
import { EyebrowComponent } from '../ui/EyebrowComponent/EyebrowComponent';
import { HeadlineComponent } from '../ui/HeadlineComponent/HeadlineComponent';
import s from './WhySection.module.css';

interface IPillar {
  displayId: string;
  title: string;
  content: string;
}

export const WhySection = () => {
  const { t } = useTranslation();

  // Obtenemos el arreglo de pilares traducido
  const pillars = t('whySection.pillars', { returnObjects: true }) as IPillar[];

  return (
    <section id="why" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.hero}>
            <EyebrowComponent text={t('whySection.eyebrow')} />
            <HeadlineComponent title={t('whySection.headline')} />
            <p className={s.body}>{t('whySection.paragraph1')}</p>
            <p className={s.body}>{t('whySection.paragraph2')}</p>
            <a href="#contact" className={s.contactLink}>
              {t('whySection.contactLink')}
            </a>
          </div>
          <div className={s.pillarsContainer}>
            {Array.isArray(pillars) &&
              pillars.map((item, idx) => (
                <div key={idx} className={s.pillarItem}>
                  <span className={s.pillarNumber}>{item.displayId}</span>
                  <h3 className={s.pillarTitle}>{item.title}</h3>
                  <p className={s.pillarContent}>{item.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};