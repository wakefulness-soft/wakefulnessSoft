import { use } from "react";

import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

import s from "./ThemeSwitcher.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

export const ThemeSwitcher = () => {
  const { isLight, toggleTheme } = use(ThemeContext);
  const { t } = useTranslation();
  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <div className={`${s.foatingComponent}`}>
      <div className={`${s.toggle} ${isLight ? s.light : s.dark}`}>
        <input
          type="checkbox"
          id="theme-toggle"
          checked={isLight}
          onChange={handleThemeChange}
          aria-label={t(isLight ? "themeSwitcher.toDark" : "themeSwitcher.toLight")}
        />
        <div className={s.trackIcons}>
          <Sun className={s.sunIcon} aria-hidden="true" />
          <Moon className={s.moonIcon} aria-hidden="true" />
        </div>
        <label htmlFor="theme-toggle">
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
