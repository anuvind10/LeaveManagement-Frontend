import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggle: () => void;
}

const isTheme = (value: string | null): value is Theme => {
  return value === "light" || value === "dark";
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    //Get the user on page load from localStorage
    const storedTheme = localStorage.getItem("theme");
    return isTheme(storedTheme) ? storedTheme : "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
