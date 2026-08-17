import {
  useEffect,
  useState,
  createContext,
  type PropsWithChildren,
} from "react";

interface ThemeContextProps {
  // state
  isLight: boolean;

  // mehtod
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isLight, setIsLight] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light";
  });

  const getTeme = (isLight: boolean) => (isLight ? "light" : "dark");

  useEffect(() => {
    const theme = getTeme(isLight);
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [isLight]);

  const handleToggleTheme = () => {
    setIsLight((prev) => !prev);
  };

  return (
    <ThemeContext
      value={{
        isLight: isLight,
        toggleTheme: handleToggleTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
};
