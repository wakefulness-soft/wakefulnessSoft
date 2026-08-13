import { useEffect, useRef } from "react";
import s from "./ProjectSection.module.css";  
/* ─── tipos ─── */
interface Project {
  id:          string;
  filename:    string;
  name:        string;
  nameAccent?: string;
  desc:        string;
  stack:       string[];
  href:        string;
  status:      "live" | "wip";
  featured?:   boolean;
}

/* ─── datos  de los proyectos al chile no se que poner ─── */
const PROJECTS: Project[] = [
  {
    /* ─── Aqui podemos poner el proyecto mas laborioso que hemos echo ─── */
    id:         "nebula",
    filename:   "nebula-platform.tsx",
    name:       "Nebula",
    nameAccent: "Platform",
    desc:       "Plataforma SaaS para gestión de equipos remotos con dashboards en tiempo real, control de permisos y analítica integrada. Diseñada para sobrevivir a la madrugada del lunes.",
    stack:      ["React", "Node.js", "PostgreSQL", "WebSockets", "Docker"],
    href:       "#",
    status:     "live",
    featured:   true,
  },
  {
    id:       "phantom-api",
    filename: "phantom-api.go",
    name:     "Phantom API",
    desc:     "REST API de alta disponibilidad con autenticación JWT, rate limiting y caché inteligente. Levanta en frío en menos de 200 ms.",
    stack:    ["Go", "Redis", "PostgreSQL"],
    href:     "#",
    status:   "live",
  },
  {
    id:       "drift-ui",
    filename: "drift-ui.tsx",
    name:     "Drift UI",
    desc:     "Sistema de componentes oscuros para React. Sin dependencias de runtime, 100% accesible.",
    stack:    ["React", "TypeScript", "CSS Modules"],
    href:     "#",
    status:   "wip",
  },
  {
    id:       "hollow-cli",
    filename: "hollow.sh",
    name:     "Hollow CLI",
    desc:     "Herramienta de línea de comandos para automatizar deploys y auditar dependencias en monorepos.",
    stack:    ["Bash", "Node.js", "YAML"],
    href:     "#",
    status:   "live",
  },
];

/* ─── componente principal ─── */
export default function ProjectSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>(
    Array(PROJECTS.length).fill(null)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(s.visible);
        });
      },
      { threshold: 0.12 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const featured  = PROJECTS.filter((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  /* ── card featured (inline) ── */
  const renderFeatured = (project: Project, refIndex: number) => (
    <div
      key={project.id}
      ref={(el) => { cardsRef.current[refIndex] = el; }}
      className={`${s.card} ${s.featured} ${s.cardFeatured}`}
    >
      {/* panel izquierdo */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1.4 }}>
        <div className={s.cardBar}>
          <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
          <span className={s.cardFilename}>{project.filename}</span>
        </div>
        <div className={s.featuredBody}>
          <div className={s.statusLine}>
            <span className={`${s.statusDot}${project.status === "wip" ? ` ${s.wip}` : ""}`} />
            {project.status === "live" ? "en producción" : "en desarrollo"}
          </div>
          <h3 className={s.featuredName}>
            {project.name}{" "}
            {project.nameAccent && <em>{project.nameAccent}</em>}
          </h3>
          <p className={s.desc}>{project.desc}</p>
          <div className={s.stack}>
            {project.stack.map((tech) => (
              <span key={tech} className={s.tag}>{tech}</span>
            ))}
          </div>
          <a href={project.href} className={`${s.link} ${s.featuredLink}`}>
            {">"} ver proyecto <span className={s.linkArrow}>↗</span>
          </a>
        </div>
      </div>

      {/* panel derecho — preview atmosférico */}
      <div className={s.featuredPreview}>
        <div className={s.previewOrb} />
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
          aria-hidden="true" style={{ position: "relative", zIndex: 1, opacity: 0.5 }}>
          <ellipse cx="60" cy="52" rx="30" ry="26" fill="var(--color-primary)" opacity="0.2" />
          <ellipse cx="60" cy="52" rx="30" ry="26" stroke="var(--color-primary)"
            strokeWidth="1.5" fill="none" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="7" ry="7.5" fill="var(--color-void)" />
          <ellipse cx="70" cy="50" rx="7" ry="7.5" fill="var(--color-void)" />
          <path d="M54,61 L60,56 L66,61 Z" fill="var(--color-void)" opacity="0.5" />
          <rect x="47"   y="68" width="9" height="8" rx="2" fill="var(--color-primary)" opacity="0.3" />
          <rect x="57.5" y="68" width="9" height="8" rx="2" fill="var(--color-primary)" opacity="0.3" />
          <rect x="68"   y="68" width="9" height="8" rx="2" fill="var(--color-primary)" opacity="0.3" />
          <path d="M60,26 C56,16 64,10 60,0" stroke="var(--color-ghost)"
            strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M48,23 C44,13 50,7 46,0" stroke="var(--color-ghost)"
            strokeWidth="1" strokeLinecap="round" opacity="0.35" />
          <path d="M72,23 C76,13 70,7 74,0" stroke="var(--color-ghost)"
            strokeWidth="1" strokeLinecap="round" opacity="0.35" />
        </svg>
        <span className={s.previewLabel}
          style={{ position: "absolute", bottom: "1.2rem", fontSize: "0.65rem" }}>
          {"// preview disponible pronto"}
        </span>
      </div>
    </div>
  );

  /* ── card normal (inline) ── */
  const renderCard = (project: Project, refIndex: number) => (
    <div
      key={project.id}
      ref={(el) => { cardsRef.current[refIndex] = el; }}
      className={s.card}
    >
      <div className={s.cardBar}>
        <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
        <span className={s.cardFilename}>{project.filename}</span>
      </div>
      <div className={s.cardBody}>
        <div className={s.statusLine}>
          <span className={`${s.statusDot}${project.status === "wip" ? ` ${s.wip}` : ""}`} />
          {project.status === "live" ? "en producción" : "en desarrollo"}
        </div>
        <h3 className={s.projectName}>{project.name}</h3>
        <p className={s.desc}>{project.desc}</p>
        <div className={s.stack}>
          {project.stack.map((tech) => (
            <span key={tech} className={s.tag}>{tech}</span>
          ))}
        </div>
        <a href={project.href} className={s.link}>
          {">"} ver proyecto <span className={s.linkArrow}>↗</span>
        </a>
      </div>
    </div>
  );

  return (
    <section id="proyectos" className={s.section}>
      <div className={s.inner}>

        <span className={s.eyebrow}>Projects</span>
        <div className={s.header}>
          <h2 className={s.headline}>
            What we've<br />
            <em>built.</em>
          </h2>
          <p className={s.headerSub}>
            Each project started from scratch at the witching hour.
            Here are the ones that made it through.
          </p>
        </div>

        <div className={s.grid}>
          {featured.map((project, i) => renderFeatured(project, i))}
          {secondary.map((project, i) => renderCard(project, featured.length + i))}
        </div>

      </div>
    </section>
  );
}