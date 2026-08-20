import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import type { ILink } from "../../types/links.interface";
import { FooterLink } from "../FooterLink";
import styles from "./Footer.module.css";

const navLinkKeys = [
  { key: "home", href: "#inicio" },
  { key: "services", href: "#servicios" },
  { key: "projects", href: "#proyectos" },
  { key: "about", href: "#us" },
] as const;

const socials: Array<ILink> = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" },
];

const serviceKeys = ["web", "mobile", "consulting", "support"] as const;

// Same "smoke" as the navbar, for brand consistency
function Wisp() {
  return (
    <svg
      className={styles.wispSvg}
      viewBox="0 0 60 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,8 C8,2 12,11 20,5 C28,-1 32,11 40,5 C48,-1 52,9 60,4"
        fill="none"
        stroke="#c9b8d4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Vapor line crossing the top border */}
      <div className={styles.topLine} />

      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.brandSection}>
          <div className={styles.brandWrapper}>
            <img src={logo} alt="Wakefulness Soft" className={styles.brandLogo} />
            <span className={styles.brandName}>
              Wakefulness<span className={styles.brandAccent}> Soft</span>
            </span>
          </div>
          <p className={styles.brandDescription}>
            {t('footer.brandDescription')}
          </p>
          <div className={styles.socialLinks}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={styles.socialLink}
            >
              {s.label}
              <span className={styles.wispWrapper}>
                <Wisp />
              </span>
            </a>
          ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className={styles.sectionTitle}>{t('footer.sections.navigation')}</h3>
          <ul className={styles.navList}>
            {navLinkKeys.map((link) => (
              <FooterLink
                key={link.href}
                label={t(`navbar.links.${link.key}`)}
                href={link.href}
              />
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className={styles.sectionTitle}>{t('footer.sections.services')}</h3>
          <ul className={styles.servicesList}>
            {serviceKeys.map((key) => (
              <li key={key} className={styles.servicesItem}>
                {t(`footer.services.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className={styles.sectionTitle}>{t('footer.sections.contact')}</h3>
          <ul className={styles.contactList}>
            <li>hello@wakefulnesssoft.com</li>
            <li>+52 33 0000 0000</li>
            <li>{t('footer.contactInfo.location')}</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <span className={styles.bottomCopyright}>
            {t('footer.bottom.copyright', { year })}
          </span>
          <span className={styles.bottomMadeWith}>
            {t('footer.bottom.madeWith')}
          </span>
        </div>
      </div>
    </footer>
  );
}