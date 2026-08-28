import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import s from "./CtaSection.module.css";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";

/* ─── tipos ─── */
type Status = "idle" | "sending" | "sent" | "error";

interface FormData {
  name:    string;
  email:   string;
  service: string;
  message: string;
}

const INITIAL: FormData = {
  name:    "",
  email:   "",
  service: "",
  message: "",
};

/* ─── SVG skull decorativo ─── */
const SkullSVG = () => (
  <svg
    width="80" height="80"
    viewBox="0 0 80 80"
    fill="none"
    aria-hidden="true"
  >
    {/* vapor */}
    <path d="M40,18 C36,8 44,2 40,-6"
      stroke="var(--color-ghost)" strokeWidth="1.5"
      strokeLinecap="round" opacity="0.5" />
    <path d="M30,15 C26,5 32,-1 28,-9"
      stroke="var(--color-ghost)" strokeWidth="1"
      strokeLinecap="round" opacity="0.3" />
    <path d="M50,15 C54,5 48,-1 52,-9"
      stroke="var(--color-ghost)" strokeWidth="1"
      strokeLinecap="round" opacity="0.3" />
    {/* cabeza */}
    <ellipse cx="40" cy="42" rx="24" ry="22"
      fill="var(--color-ghost)" opacity="0.12" />
    <ellipse cx="40" cy="42" rx="24" ry="22"
      stroke="var(--color-ghost)" strokeWidth="1.5"
      fill="none" opacity="0.4" />
    {/* mandíbula */}
    <rect x="26" y="57" width="28" height="12" rx="5"
      fill="var(--color-ghost)" opacity="0.1"
      stroke="var(--color-ghost)" strokeWidth="1.5" />
    {/* ojos */}
    <ellipse cx="32" cy="40" rx="6" ry="6.5"
      fill="var(--color-void)" stroke="var(--color-ghost)"
      strokeWidth="1" opacity="0.7" />
    <ellipse cx="48" cy="40" rx="6" ry="6.5"
      fill="var(--color-void)" stroke="var(--color-ghost)"
      strokeWidth="1" opacity="0.7" />
    {/* nariz */}
    <path d="M37,51 L40,47 L43,51 Z"
      fill="var(--color-ghost)" opacity="0.3" />
    {/* dientes */}
    <rect x="28" y="59" width="6" height="7" rx="1.5"
      fill="var(--color-void)" />
    <rect x="36.5" y="59" width="6" height="7" rx="1.5"
      fill="var(--color-void)" />
    <rect x="45" y="59" width="6" height="7" rx="1.5"
      fill="var(--color-void)" />
    {/* chispas */}
    <circle cx="68" cy="30" r="1.5" fill="var(--color-ghost)" opacity="0.4" />
    <circle cx="14" cy="52" r="1.5" fill="var(--color-ghost)" opacity="0.3" />
    <circle cx="62" cy="62" r="1"   fill="var(--color-ghost)" opacity="0.25" />
  </svg>
);

/* ─── componente principal ─── */
export default function CtaSection() {
  const { t } = useTranslation();
  const [form, setForm]     = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");

  const services = [
    { key: "webDev", label: t("cta.services.webDev") },
    { key: "mobileApp", label: t("cta.services.mobileApp") },
    { key: "consulting", label: t("cta.services.consulting") },
    { key: "maintenance", label: t("cta.services.maintenance") },
    { key: "other", label: t("cta.services.other") },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    if (!formRef.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        }
      )
      .then(
        () => {
          alert('Message sent successfully!');
          formRef.current?.reset();
        },
        (error) => {
          console.error('Failed to send email: ', error);
          alert('Something went wrong. Please try again.');
        }
      );

    setStatus("sending");

    // Simula envío — reemplaza con tu lógica real (fetch, emailjs, etc.)
    setTimeout(() => setStatus("sent"), 2000);
  };

  const btnLabel = () => {
    if (status === "sending")
      return <><span className={s.blink}>█</span> {t("cta.buttons.sending")}</>;
    if (status === "sent")
      return <>{t("cta.buttons.sent")}</>;
    return <>{t("cta.buttons.send")}</>;
  };

  const btnClass = [
    s.submitBtn,
    status === "sending" ? s.sending : "",
    status === "sent"    ? s.sent    : "",
  ].join(" ");

  return (
    <section id="contact" className={s.section}>
      {/* línea de vapor en el borde superior */}
      <div className={s.steamLine} />

      <div className={s.inner}>

        {/* ── panel izquierdo ── */}
        <div className={s.left}>
          <EyebrowComponent text={t("cta.eyebrow")} />

          <HeadlineComponent title={t("cta.headline")} />

          <p className={s.sub}>
            {t("cta.sub")}
          </p>

          <div className={s.skullWrap}>
            <SkullSVG />
          </div>

          <div className={s.directContact}>
            <span className={s.directLabel}>{t("cta.directLabel")}</span>
            <a href="mailto:hola@wakefulnesssoft.com" className={s.directItem}>
              <span className={s.directIcon}>✉</span>
              hola@wakefulnesssoft.com
            </a>
            <a href="https://github.com" target="_blank"
              rel="noreferrer" className={s.directItem}>
              <span className={s.directIcon}>⌥</span>
              github.com/wakefulnesssoft
            </a>
          </div>
        </div>

        {/* ── formulario ── */}
        <div className={s.formWrap}>
          <div className={s.formBar}>
            <span className={s.dot} />
            <span className={s.dot} />
            <span className={s.dot} />
            <span className={s.formTitle}>{t("cta.formTitle")}</span>
          </div>

          <form ref={formRef} className={s.formBody} onSubmit={handleSubmit}>

            {/* fila nombre + email */}
            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label} htmlFor="name">
                  <span>const</span> {t("cta.labels.name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={s.input}
                  placeholder={t("cta.placeholders.name")}
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === "sending" || status === "sent"}
                  autoComplete="name"
                  required
                />
              </div>

              <div className={s.field}>
                <label className={s.label} htmlFor="email">
                  <span>const</span> {t("cta.labels.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={s.input}
                  placeholder={t("cta.placeholders.email")}
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === "sending" || status === "sent"}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* servicio */}
            <div className={s.field}>
              <label className={s.label} htmlFor="service">
                <span>const</span> {t("cta.labels.service")}
              </label>
              <select
                id="service"
                name="service"
                className={s.select}
                value={form.service}
                onChange={handleChange}
                disabled={status === "sending" || status === "sent"}
              >
                <option value="" disabled>{t("cta.placeholders.selectService")}</option>
                {services.map((srv) => (
                  <option key={srv.key} value={srv.label}>{srv.label}</option>
                ))}
              </select>
            </div>

            {/* mensaje */}
            <div className={s.field}>
              <label className={s.label} htmlFor="message">
                <span>const</span> {t("cta.labels.message")}
              </label>
              <textarea
                id="message"
                name="message"
                className={s.textarea}
                placeholder={t("cta.placeholders.message")}
                value={form.message}
                onChange={handleChange}
                disabled={status === "sending" || status === "sent"}
                rows={6}
                required
              />
            </div>

            {/* botón */}
            <button
              type="submit"
              className={btnClass}
              aria-live="polite"
              disabled={
                status === "sending" ||
                status === "sent"
              }
            >
              {btnLabel()}
            </button>

            {status === "error" && (
              <p className={s.error} role="alert">
                {t("cta.error")}
              </p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
