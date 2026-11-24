import { ThemeState } from "./theme.slice";

export const applyThemeClass = (targetTheme: ThemeState["mode"]) => {
  const root = document.documentElement;

  // Disable animations and transitions
  root.classList.add("disable-transitions");

  root.classList.remove("light", "dark");

  root.classList.remove("theme-light", "theme-dark", "theme-system");

  root.classList.add(`theme-${targetTheme}`);

  if (targetTheme === "system") {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    root.classList.add(systemDark ? "dark" : "light");
  } else {
    root.classList.add(targetTheme);
  }

  // Re-enable animations and transitions
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove("disable-transitions");
    });
  });
};
