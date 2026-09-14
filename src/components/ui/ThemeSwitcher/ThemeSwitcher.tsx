import { use, useId } from "react";

import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import s from "./ThemeSwitcher.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

type ThemeSwitcherProps = {
  embedded?: boolean;
};

export const ThemeSwitcher = ({ embedded = false }: ThemeSwitcherProps) => {
  const { isLight, toggleTheme } = use(ThemeContext);
  const { t } = useTranslation();
  const inputId = useId();
  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <div className={`${s.foatingComponent} ${embedded ? s.embedded : ""}`}>
      <div className={`${s.toggle} ${isLight ? s.light : s.dark}`}>
        <input
          type="checkbox"
          id={inputId}
          checked={isLight}
          onChange={handleThemeChange}
          aria-label={t(isLight ? "themeSwitcher.toDark" : "themeSwitcher.toLight")}
        />
        <div className={s.trackIcons}>
          <Sun className={s.sunIcon} aria-hidden="true" />
          <Moon className={s.moonIcon} aria-hidden="true" />
        </div>
        <label htmlFor={inputId}>
          {isLight ? (
            <Sun className={s.toggleIcon} aria-hidden="true" />
          ) : (
            <Moon className={s.toggleIcon} aria-hidden="true" />
          )}
        </label>
      </div>
    </div>
  );
};
