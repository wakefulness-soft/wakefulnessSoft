import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";
import s from "./CtaSection.module.css";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

interface ProjectInquiry {
  name: string;
  email: string;
  service: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof ProjectInquiry, string>>;

const INITIAL: ProjectInquiry = {
  name: "",
  email: "",
  service: "",
  message: "",
};

const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const EMAIL_IS_CONFIGURED = Object.values(EMAIL_CONFIG).every(
  (value) => typeof value === "string" && value.trim().length > 0,
);

const SkullSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <path d="M40,18 C36,8 44,2 40,-6" stroke="var(--color-ghost)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <path d="M30,15 C26,5 32,-1 28,-9" stroke="var(--color-ghost)" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <path d="M50,15 C54,5 48,-1 52,-9" stroke="var(--color-ghost)" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <ellipse cx="40" cy="42" rx="24" ry="22" fill="var(--color-ghost)" opacity="0.12" />
    <ellipse cx="40" cy="42" rx="24" ry="22" stroke="var(--color-ghost)" strokeWidth="1.5" opacity="0.4" />
    <rect x="26" y="57" width="28" height="12" rx="5" fill="var(--color-ghost)" opacity="0.1" stroke="var(--color-ghost)" strokeWidth="1.5" />
    <ellipse cx="32" cy="40" rx="6" ry="6.5" fill="var(--color-void)" stroke="var(--color-ghost)" opacity="0.7" />
    <ellipse cx="48" cy="40" rx="6" ry="6.5" fill="var(--color-void)" stroke="var(--color-ghost)" opacity="0.7" />
    <path d="M37,51 L40,47 L43,51 Z" fill="var(--color-ghost)" opacity="0.3" />
    <rect x="28" y="59" width="6" height="7" rx="1.5" fill="var(--color-void)" />
    <rect x="36.5" y="59" width="6" height="7" rx="1.5" fill="var(--color-void)" />
    <rect x="45" y="59" width="6" height="7" rx="1.5" fill="var(--color-void)" />
  </svg>
);

export default function CtaSection() {
  const { t } = useTranslation();
  const [form, setForm] = useState<ProjectInquiry>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const services = ["webDev", "mobileApp", "consulting", "maintenance", "other"] as const;

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (form.name.trim().length < 2) nextErrors.name = t("cta.validation.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = t("cta.validation.email");
    }
    if (!form.service) nextErrors.service = t("cta.validation.service");
    if (form.message.trim().length < 20) nextErrors.message = t("cta.validation.message");

    return nextErrors;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const field = event.target.name as keyof ProjectInquiry;
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0] as keyof ProjectInquiry | undefined;
    if (firstInvalidField) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)
        ?.focus();
      return;
    }

    if (!EMAIL_IS_CONFIGURED) {
      setStatus("unavailable");
      return;
    }

    if (!formRef.current) return;
    setStatus("sending");

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        formRef.current,
        { publicKey: EMAIL_CONFIG.publicKey },
      );
      setForm(INITIAL);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const fieldError = (field: keyof ProjectInquiry) =>
    errors[field] ? (
      <p id={`${field}-error`} className={s.fieldError}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <section id="contact" className={s.section}>
      <div className={s.steamLine} aria-hidden="true" />

      <div className={s.inner}>
        <div className={s.left}>
          <EyebrowComponent text={t("cta.eyebrow")} />
          <HeadlineComponent title={t("cta.headline")} />
          <p className={s.sub}>{t("cta.sub")}</p>

          <div className={s.skullWrap}><SkullSVG /></div>

          <div className={s.directContact}>
            <span className={s.directLabel}>{t("cta.directLabel")}</span>
            <a href="mailto:wakefulnesssoft@gmail.com" className={s.directItem}>
              <span className={s.directIcon} aria-hidden="true">✉</span>
              wakefulnesssoft@gmail.com
            </a>
            <a
              href="https://github.com/wakefulness-soft"
              target="_blank"
              rel="noreferrer"
              className={s.directItem}
            >
              <span className={s.directIcon} aria-hidden="true">⌥</span>
              github.com/wakefulness-soft
            </a>
          </div>
        </div>

        <div className={s.formWrap}>
          <div className={s.formBar} aria-hidden="true">
            <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
            <span className={s.formTitle}>{t("cta.formTitle")}</span>
          </div>

          <form
            ref={formRef}
            className={s.formBody}
            onSubmit={handleSubmit}
            noValidate
            aria-busy={status === "sending"}
          >
            <p className={s.formIntro}>{t("cta.formIntro")}</p>

            <div className={s.row}>
              <div className={s.field}>
                <label className={s.label} htmlFor="name"><span>const</span> {t("cta.labels.name")}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={s.input}
                  placeholder={t("cta.placeholders.name")}
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  autoComplete="name"
                  maxLength={120}
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {fieldError("name")}
              </div>

              <div className={s.field}>
                <label className={s.label} htmlFor="email"><span>const</span> {t("cta.labels.email")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={s.input}
                  placeholder={t("cta.placeholders.email")}
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  autoComplete="email"
                  maxLength={254}
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {fieldError("email")}
              </div>
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="service"><span>const</span> {t("cta.labels.service")}</label>
              <select
                id="service"
                name="service"
                className={s.select}
                value={form.service}
                onChange={handleChange}
                disabled={status === "sending"}
                required
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
              >
                <option value="" disabled>{t("cta.placeholders.selectService")}</option>
                {services.map((service) => (
                  <option key={service} value={service}>{t(`cta.services.${service}`)}</option>
                ))}
              </select>
              {fieldError("service")}
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="message"><span>const</span> {t("cta.labels.message")}</label>
              <textarea
                id="message"
                name="message"
                className={s.textarea}
                placeholder={t("cta.placeholders.message")}
                value={form.message}
                onChange={handleChange}
                disabled={status === "sending"}
                rows={6}
                minLength={20}
                maxLength={3000}
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {fieldError("message")}
            </div>

            <button type="submit" className={s.submitBtn} disabled={status === "sending"}>
              {status === "sending" ? (
                <><span className={s.blink} aria-hidden="true">█</span> {t("cta.buttons.sending")}</>
              ) : t("cta.buttons.send")}
            </button>

            <div className={s.statusArea} aria-live="polite">
              {status === "sent" && <p className={s.success} role="status">{t("cta.status.sent")}</p>}
              {status === "error" && <p className={s.error} role="alert">{t("cta.status.error")}</p>}
              {status === "unavailable" && (
                <p className={s.error} role="alert">
                  {t("cta.status.unavailable")}{" "}
                  <a href="mailto:wakefulnesssoft@gmail.com">wakefulnesssoft@gmail.com</a>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
