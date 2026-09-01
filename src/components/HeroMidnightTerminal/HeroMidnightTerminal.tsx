import { ArrowRight, CornerDownLeft, RotateCcw, Terminal } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import s from "./HeroMidnightTerminal.module.css";

type TerminalStatus = "idle" | "typing" | "running" | "success";

const DEMO_COMMAND = "run --project";

export const HeroMidnightTerminal = () => {
  const { t } = useTranslation();
  const [intro, setIntro] = useState("");
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState<TerminalStatus>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const introText = t("heroConcepts.terminal.prompt");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setIntro(introText));
      return () => window.cancelAnimationFrame(frame);
    }

    let character = 0;
    const interval = window.setInterval(() => {
      character += 1;
      setIntro(introText.slice(0, character));
      if (character >= introText.length) window.clearInterval(interval);
    }, 52);

    return () => window.clearInterval(interval);
  }, [introText]);

  useEffect(() => {
    if (status !== "typing") return;

    let character = 0;
    const interval = window.setInterval(() => {
      character += 1;
      setCommand(DEMO_COMMAND.slice(0, character));
      if (character >= DEMO_COMMAND.length) {
        window.clearInterval(interval);
        setStatus("running");
      }
    }, 65);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== "running") return;
    const timeout = window.setTimeout(() => setStatus("success"), 1750);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const execute = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;
    if (!command.trim()) setCommand(DEMO_COMMAND);
    setStatus("running");
  };

  const simulateCommand = () => {
    if (status !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCommand(DEMO_COMMAND);
      setStatus("running");
      return;
    }
    setCommand("");
    setStatus("typing");
  };

  const reset = () => {
    setCommand("");
    setStatus("idle");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const isBusy = status === "typing" || status === "running";

  return (
    <section
      id="terminal-hero"
      className={s.section}
      aria-labelledby="terminal-hero-title"
    >
      <div className={s.scanlines} aria-hidden="true" />
      <div className={s.glow} aria-hidden="true" />

      <div className={s.inner}>
        <div className={s.heading}>
          <p className={s.conceptLabel}>
            <span>04</span> {t("heroConcepts.terminal.label")}
          </p>
          <h2 id="terminal-hero-title" className={s.title}>
            {t("heroConcepts.terminal.titleLine1")}
            <em>{t("heroConcepts.terminal.titleAccent")}</em>
          </h2>
          <p className={s.description}>{t("heroConcepts.terminal.description")}</p>
        </div>

        <div className={`${s.terminalStage} ${status === "success" ? s.complete : ""}`}>
          <div className={s.terminalWindow}>
            <div className={s.windowBar}>
              <span className={s.windowDots}><i /><i /><i /></span>
              <span className={s.windowTitle}>
                <Terminal size={14} aria-hidden="true" /> wakefulness — zsh
              </span>
              <span className={s.secure}>● secure</span>
            </div>

            <div className={s.terminalBody} onClick={() => inputRef.current?.focus()}>
              <p className={s.systemLine}>Wakefulness OS v3.0.0 · GDL · 02:14:07</p>
              <p className={s.introLine}>
                <span>{intro}</span>
                {intro.length < introText.length && <i className={s.blockCursor} />}
              </p>

              <form className={s.commandForm} onSubmit={execute}>
                <label htmlFor="hero-command">wakefulness@studio:~$</label>
                <input
                  ref={inputRef}
                  id="hero-command"
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  placeholder={DEMO_COMMAND}
                  autoComplete="off"
                  spellCheck={false}
                  disabled={status !== "idle"}
                  aria-label={t("heroConcepts.terminal.inputLabel")}
                />
                {status === "idle" && <i className={s.caret} aria-hidden="true" />}
                <button type="submit" aria-label={t("heroConcepts.terminal.executeLabel")}>
                  <CornerDownLeft size={16} aria-hidden="true" />
                </button>
              </form>

              {(status === "running" || status === "success") && (
                <div className={s.output} aria-live="polite">
                  <p><span>›</span> {t("heroConcepts.terminal.building")}</p>
                  <p><span>›</span> {t("heroConcepts.terminal.checking")}</p>
                  <p className={status === "success" ? s.successLine : s.pendingLine}>
                    <span>{status === "success" ? "✓" : "◌"}</span>{" "}
                    {status === "success"
                      ? t("heroConcepts.terminal.success")
                      : t("heroConcepts.terminal.compiling")}
                  </p>
                </div>
              )}
            </div>

            {status === "idle" && (
              <button className={s.demoButton} type="button" onClick={simulateCommand}>
                <span>{t("heroConcepts.terminal.demo")}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
            {isBusy && <div className={s.loadingBar} aria-hidden="true"><i /></div>}
          </div>

          <div className={s.reveal} aria-hidden={status !== "success"}>
            <p>{t("heroConcepts.terminal.revealEyebrow")}</p>
            <h3>{t("heroConcepts.terminal.revealTitle")}</h3>
            <div>
              <a href="#projects">
                {t("heroConcepts.common.exploreWork")}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <button type="button" onClick={reset}>
                <RotateCcw size={14} aria-hidden="true" />
                {t("heroConcepts.terminal.reset")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
