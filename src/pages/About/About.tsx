import { useEffect, useRef } from "react";
import s from "./About.module.css";

/* ─── tipos ─── */
interface Line {
  cmd: string;
  desc: string;
}

interface Stat {
  number: string;
  label: string;
}

type SparkCoord = [number, number];

/* ─── datos ─── */
const LINES: Line[] = [
  { cmd: "init",         desc: "Custom software built to solve real-world problems" },
  { cmd: "quality",      desc: "Clean, reviewed, and well-documented code" },
  { cmd: "speed",        desc: "Fast delivery without compromising reliability" },
  { cmd: "transparency", desc: "Clear communication throughout every stage of the project" },
  { cmd: "innovation",   desc: "We adopt what makes sense, not just what's trending" },
];

const STATS: Stat[] = [
  { number: "5+",  label: "Years in production"   },
  { number: "40+", label: "Projects delivered" },
  { number: "∞",   label: "Cups of coffee"        },
];

const SPARKS: SparkCoord[] = [
  [80, 180], [240, 150], [100, 100], [210, 240], [155, 280],
];

/* ─── SVG decorativo de vapor ─── */
function VaporSVG(){
  return (
    <svg
      className={s.vapor}
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* orbe de fondo */}
      <ellipse className={s.orb} cx="160" cy="200" rx="120" ry="100"
        fill="url(#glow)" />

      {/* columnas de vapor */}
      <path className={s.s1}
        d="M120,300 C110,260 135,240 118,200 C101,160 128,145 115,110 C102,75 125,60 118,30"
        stroke="#c9b8d4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path className={s.s2}
        d="M160,320 C148,275 172,255 155,210 C138,165 168,148 152,100 C136,52 165,38 155,0"
        stroke="#e3d7d9" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path className={s.s3}
        d="M200,310 C214,270 190,250 205,208 C220,166 196,150 210,112 C224,74 200,58 212,22"
        stroke="#c9b8d4" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />

      {/* skull flotante */}
      <g className={s.s2} transform="translate(135, 55)">
        <ellipse cx="25" cy="20" rx="18" ry="16" fill="#c9b8d4" opacity="0.85" />
        <rect x="14" y="30" width="22" height="10" rx="4" fill="#c9b8d4" opacity="0.85" />
        <ellipse cx="19" cy="20" rx="5" ry="5.5" fill="#0b0a0d" />
        <ellipse cx="31" cy="20" rx="5" ry="5.5" fill="#0b0a0d" />
        <path d="M23,27 L25,24 L27,27 Z" fill="#0b0a0d" opacity="0.6" />
        <rect x="16"  y="32" width="5" height="5" rx="1" fill="#18151c" />
        <rect x="22.5" y="32" width="5" height="5" rx="1" fill="#18151c" />
        <rect x="29"  y="32" width="5" height="5" rx="1" fill="#18151c" />
      </g>

      {/* chispas */}
      {SPARKS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.8" fill="#c9b8d4" opacity="0.4" />
      ))}

      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#c9b8d4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c9b8d4" stopOpacity="0"    />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── componente principal ─── */
export default function About(){
  // +1 para la línea del cursor parpadeante al final
  const linesRef = useRef<(HTMLDivElement | null)[]>(
    Array(LINES.length + 1).fill(null)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.visible);
          }
        });
      },
      { threshold: 0.2 }
    );

    linesRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="us" className={s.section}>
      <div className={s.inner}>

        {/* ── hero ── */}
        <div className={s.hero}>
          <div>
            <span className={s.eyebrow}>Us</span>
            <h2 className={s.headline}>
              Code that<br />
              doesn't <em>sleep.</em>
            </h2>
            <p className={s.body}>
              Wakefulness Soft is a software development studio
              founded by developers who prefer the early hours and black coffee.
              We build digital products we would be proud to put our names behind —
              even if the commit was made at 3 am.
            </p>
          </div>

          <VaporSVG />
        </div>

        {/* ── terminal de valores ── */}
        <div className={s.terminal}>
          <div className={s.terminalBar}>
            <span className={s.dot} />
            <span className={s.dot} />
            <span className={s.dot} />
            <span className={s.terminalTitle}>wakefulness-soft — about.sh</span>
          </div>

          <div className={s.terminalBody}>
            {LINES.map((line, i) => (
              <div
                key={line.cmd}
                className={s.line}
                ref={(el: HTMLDivElement | null) => { linesRef.current[i] = el; }}
              >
                <span className={s.prompt}>{">"}</span>
                <span className={s.lineContent}>
                  <strong>{line.cmd}</strong>{"  "}
                  <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                    {"// "}{line.desc}
                  </span>
                </span>
                <span className={s.check}>✓</span>
              </div>
            ))}

            {/* cursor parpadeante al final */}
            <div
              className={s.line}
              ref={(el: HTMLDivElement | null) => { linesRef.current[LINES.length] = el; }}
            >
              <span className={s.prompt}>{">"}</span>
              <span className={s.lineContent}>
                <span className={s.cursor} />
              </span>
            </div>
          </div>
        </div>

        {/* ── stats ── */}
        <div className={s.stats}>
          {STATS.map((stat) => (
            <div key={stat.label} className={s.stat}>
              <span className={s.statNumber}>
                {stat.number.replace(/[+∞]/g, "")}
                {(stat.number.includes("+") || stat.number === "∞") && (
                  <span>{stat.number.includes("+") ? "+" : "∞"}</span>
                )}
              </span>
              <span className={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}