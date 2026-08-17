import { use } from "react";

import { Moon, Sun } from "lucide-react";

import s from "./ThemeSwitcher.module.css";
import { ThemeContext } from "../../../context/ThemeContext";

export const ThemeSwitcher = () => {
  const { isLight, toggleTheme } = use(ThemeContext);
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
        />
        <div className={s.trackIcons}>
          <Sun className={s.sunIcon} />
          <Moon className={s.moonIcon} />
        </div>
        <label htmlFor="theme-toggle">
          {isLight ? (
            <Sun className={s.toggleIcon} />
          ) : (
            <Moon className={s.toggleIcon} />
          )}
        </label>
      </div>
    </div>
  );
};
