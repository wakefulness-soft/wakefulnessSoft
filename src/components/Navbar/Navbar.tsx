import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import logo64 from "../../assets/logo-64.png";
import logo128 from "../../assets/logo-128.png";
import styles from "./Navbar.module.css";

const linkKeys = [
  { key: "home", href: "#top" },
  { key: "about", href: "#us" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

const mobileMenuId = "primary-mobile-menu";

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 64rem)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const toggleButton = toggleRef.current;
    const focusTimer = window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggleButton?.focus();
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={styles.header}>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        aria-label={t("footer.sections.navigation")}
      >
        <svg className={styles.steamSvg} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
          <path
            className={styles.steamPath}
            d="M-20,20 C20,5 40,35 80,20 C120,5 140,35 180,20 C220,5 240,35 280,20 C320,5 340,35 380,20 C400,12 410,20 420,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        <a href="#top" className={styles.logoLink} onClick={closeMenu}>
          <img
            src={logo64}
            srcSet={`${logo64} 64w, ${logo128} 128w`}
            sizes="32px"
            alt=""
            width="32"
            height="32"
            decoding="async"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>
            Wakefulness<span className={styles.logoTextAccent}> Soft</span>
          </span>
        </a>

        <ul className={styles.desktopLinks}>
          {linkKeys.map((link) => (
            <li key={link.href}>
              <a className={styles.desktopLink} href={link.href}>
                {t(`navbar.links.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={styles.ctaButton}>{t("navbar.cta")}</a>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? t("navbar.menu.close") : t("navbar.menu.open")}
          aria-controls={mobileMenuId}
          aria-expanded={open}
          className={styles.mobileButton}
        >
          <svg className={styles.mobileIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className={styles.mobileLayer}>
          <button type="button" className={styles.backdrop} onClick={closeMenu} aria-label={t("navbar.menu.close")} />
          <div
            ref={menuRef}
            id={mobileMenuId}
            className={styles.mobilePanel}
            role="dialog"
            aria-modal="true"
            aria-label={t("footer.sections.navigation")}
          >
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Wakefulness Soft</span>
              <button type="button" className={styles.panelClose} onClick={closeMenu} aria-label={t("navbar.menu.close")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav aria-label={t("footer.sections.navigation")}>
              <ul className={styles.mobileMenuList}>
                {linkKeys.map((link, index) => (
                  <li key={link.href}>
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={closeMenu}
                      className={styles.mobileLink}
                    >
                      <span className={styles.mobileLinkNumber}>0{index + 1}</span>
                      {t(`navbar.links.${link.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a href="#contact" onClick={closeMenu} className={styles.mobileCta}>{t("navbar.cta")}</a>
          </div>
        </div>
      )}
    </header>
  );
}
