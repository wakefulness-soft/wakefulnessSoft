import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EyebrowComponent } from "../ui/EyebrowComponent/EyebrowComponent";
import { HeadlineComponent } from "../ui/HeadlineComponent/HeadlineComponent";
import s from "./ProjectSection.module.css";

interface ProjectConcept {
  id: string;
  filename: string;
  name: string;
  nameAccent?: string;
  featured?: boolean;
}

const PROJECTS: ProjectConcept[] = [
  {
    id: "nebula",
    filename: "nebula-platform.concept",
    name: "Nebula",
    nameAccent: "Platform",
    featured: true,
  },
  { id: "phantom-api", filename: "phantom-api.concept", name: "Phantom API" },
  { id: "drift-ui", filename: "drift-ui.concept", name: "Drift UI" },
  { id: "hollow-cli", filename: "hollow-cli.concept", name: "Hollow CLI" },
];

type ProjectCardProps = {
  project: ProjectConcept;
  refIndex: number;
  setRef: (index: number, element: HTMLElement | null) => void;
};

const ProjectDetails = ({ project }: { project: ProjectConcept }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={s.statusLine}>
        <span className={s.statusDot} aria-hidden="true" />
        {t("projects.status.concept")}
      </div>
      <h3 className={project.featured ? s.featuredName : s.projectName}>
        {project.name}{" "}
        {project.nameAccent && <em>{project.nameAccent}</em>}
      </h3>
      <dl className={s.projectDetails}>
        <div>
          <dt>{t("projects.labels.type")}</dt>
          <dd>{t(`projects.items.${project.id}.type`)}</dd>
        </div>
        <div>
          <dt>{t("projects.labels.objective")}</dt>
          <dd>{t(`projects.items.${project.id}.objective`)}</dd>
        </div>
        <div>
          <dt>{t("projects.labels.direction")}</dt>
          <dd>{t(`projects.items.${project.id}.direction`)}</dd>
        </div>
        <div>
          <dt>{t("projects.labels.capability")}</dt>
          <dd>{t(`projects.items.${project.id}.capability`)}</dd>
        </div>
      </dl>
      <a
        href="#contact"
        className={`${s.link} ${project.featured ? s.featuredLink : ""}`}
      >
        {t("projects.actions.discuss")} <span className={s.linkArrow}>→</span>
      </a>
    </>
  );
};

const ProjectCard = ({ project, refIndex, setRef }: ProjectCardProps) => {
  const { t } = useTranslation();

  return (
    <article
    ref={(element) => setRef(refIndex, element)}
    className={`${s.card} ${project.featured ? `${s.featured} ${s.cardFeatured}` : ""}`}
  >
    <div className={project.featured ? s.featuredContent : s.cardContent}>
      <div className={s.cardBar}>
        <span className={s.dot} aria-hidden="true" />
        <span className={s.dot} aria-hidden="true" />
        <span className={s.dot} aria-hidden="true" />
        <span className={s.cardFilename}>{project.filename}</span>
      </div>
      <div className={project.featured ? s.featuredBody : s.cardBody}>
        <ProjectDetails project={project} />
      </div>
    </div>

    {project.featured && (
      <div className={s.featuredPreview}>
        <div className={s.previewOrb} aria-hidden="true" />
        <svg className={s.previewGraphic} width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <ellipse cx="60" cy="52" rx="30" ry="26" fill="var(--color-primary)" opacity="0.2" />
          <ellipse cx="60" cy="52" rx="30" ry="26" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="7" ry="7.5" fill="var(--color-void)" />
          <ellipse cx="70" cy="50" rx="7" ry="7.5" fill="var(--color-void)" />
          <path d="M54,61 L60,56 L66,61 Z" fill="var(--color-void)" opacity="0.5" />
          <rect x="47" y="68" width="9" height="8" rx="2" fill="var(--color-primary)" opacity="0.3" />
          <rect x="57.5" y="68" width="9" height="8" rx="2" fill="var(--color-primary)" opacity="0.3" />
          <rect x="68" y="68" width="9" height="8" rx="2" fill="var(--color-primary)" opacity="0.3" />
          <path d="M60,26 C56,16 64,10 60,0" stroke="var(--color-ghost)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
        <span className={s.previewLabel}>{t("projects.actions.conceptPreview")}</span>
      </div>
    )}
    </article>
  );
};

export default function ProjectSection() {
  const { t } = useTranslation();
  const cardsRef = useRef<(HTMLElement | null)[]>(Array(PROJECTS.length).fill(null));

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      cardsRef.current.forEach((element) => element?.classList.add(s.visible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    cardsRef.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const setCardRef = (index: number, element: HTMLElement | null) => {
    cardsRef.current[index] = element;
  };

  return (
    <section id="projects" className={s.section}>
      <div className={s.inner}>
        <EyebrowComponent text={t("projects.eyebrow")} />
        <div className={s.header}>
          <HeadlineComponent title={t("projects.headline")} />
          <p className={s.headerSub}>{t("projects.sub")}</p>
        </div>

        <p className={s.verificationNote}>{t("projects.verificationNote")}</p>

        <div className={s.grid}>
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              refIndex={index}
              setRef={setCardRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
