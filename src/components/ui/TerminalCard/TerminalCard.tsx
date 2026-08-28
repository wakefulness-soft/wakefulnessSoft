import s from './TerminalCard.module.css'

// export const TerminalCard = (project: Project, refIndex: number) => {
export const TerminalCard = () => {
  const status : "live" | "wip" = "wip";
  const name: string = 'Temporal name';
  const desc: string = 'Temporal desc'
  const stack: string[] = ['test 1', 'test 2', 'test 3'];
  const href: string = 'google.com';

  return (
    <div
      className={s.card}
    >
      <div className={s.cardBar}>
        <span className={s.dot} />
        <span className={s.dot} />
        <span className={s.dot} />
        {/* <span className={s.cardFilename}>{project.filename}</span> */}
        <span className={s.cardFilename}>filename</span>
      </div>
      <div className={s.cardBody}>
        <div className={s.statusLine}>
          {/* <span
            className={`${s.statusDot}${project.status === "wip" ? ` ${s.wip}` : ""}`}
          />
          {project.status === "live" ? "en producción" : "en desarrollo"} */}
          <span
            className={`${s.statusDot}${status === "wip" ? ` ${s.wip}` : ""}`}
          />
          en desarrollo
        </div>
        <h3 className={s.projectName}>{name}</h3>
        <p className={s.desc}>{desc}</p>
        <div className={s.stack}>
          {stack.map((tech) => (
            <span key={tech} className={s.tag}>
              {tech}
            </span>
          ))}
        </div>
        <a href={href} className={s.link}>
          {">"} ver proyecto <span className={s.linkArrow}>↗</span>
        </a>
      </div>
    </div>
  );
};
