export const initScript = `
  (function () {
    try {
      const root = document.documentElement;
      const savedTheme = localStorage.getItem("theme") ?? "system";
      const savedSound = localStorage.getItem("sound") ?? "true";

      root.classList.remove(
        "theme-light",
        "theme-dark",
        "theme-system",
        "sound-true",
        "sound-false"
      );

      root.classList.add("theme-" + savedTheme);
      root.classList.add("sound-" + savedSound);

      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme === "dark" || (savedTheme === "system" && systemDark)) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } catch (e) {}
  })();
`;
