import { useTranslation } from "react-i18next";
import styles from './LanguageSwitcher.module.css';

const LANGS = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
] as const;

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.language.startsWith("es") ? "es" : "en";

  return (
    <div
      className={styles.switcher}
      role="group"
      aria-label={t('languageSwitcher.label')}
    >
      {/* Wisp decorativo, mismo motivo del navbar */}
      <svg
        className={styles.wisp}
        viewBox="0 0 40 60"
        aria-hidden="true"
      >
        <path
          className={styles.wispPath}
          d="M20,58 C14,48 26,44 20,34 C14,24 26,20 20,10"
          fill="none"
          stroke="#c9b8d4"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <div className={styles.track}>
        <span
          className={styles.indicator}
          style={{
            transform: current === "es" ? "translateX(0%)" : "translateX(100%)",
          }}
        />
        {LANGS.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`${styles.option} ${current === lang.code ? styles.active : ""}`}
            aria-pressed={current === lang.code}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}