import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.png";
import { NavbarLink } from '../NavbarLink.tsx';
import styles from './Navbar.module.css';

const linkKeys = [
  { key: "home", href: "#top" },
  { key: "services", href: "#servicios" },
  { key: "projects", href: "#proyectos" },
  { key: "about", href: "#us" },
  { key: "contact", href: "#contacto" },
] as const;

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      >
        {/* Ambient vapor thread */}
        <svg
          className={styles.steamSvg}
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className={styles.steamPath}
            d="M-20,20 C20,5 40,35 80,20 C120,5 140,35 180,20 C220,5 240,35 280,20 C320,5 340,35 380,20 C400,12 410,20 420,20"
            fill="none"
            stroke="#c9b8d4"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        {/* Logo */}
        <a href="#top" className={styles.logoLink}>
          <img
            src={logo}
            alt="Wakefulness Soft"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>
            Wakefulness<span className={styles.logoTextAccent}> Soft</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className={styles.desktopLinks}>
          {linkKeys.map((link) => (
            <NavbarLink
              key={link.href}
              label={t(`navbar.links.${link.key}`)}
              href={link.href}
            />
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contacto"
          className={styles.ctaButton}>
        >
          {t('navbar.cta')}
        </a>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? t('navbar.menu.close') : t('navbar.menu.open')}
          aria-expanded={open}
          className={styles.mobileButton}
        >
          <svg className={styles.mobileIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Floating mobile menu */}
      <div className={`${styles.mobileMenu} ${open ? styles.open : ""}`}>
        <ul className={styles.mobileMenuList}>
          {linkKeys.map((link) => (
            <li key={link.href} className={styles.mobileMenuItem}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={styles.mobileLink}
              >
                {t(`navbar.links.${link.key}`)}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className={styles.mobileCta}
            >
              {t('navbar.cta')}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}