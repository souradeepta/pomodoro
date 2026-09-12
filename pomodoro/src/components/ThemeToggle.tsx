import { useStore } from "../app/store";

export function ThemeToggle() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);

  return (
    <button
      className="themeToggle"
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}