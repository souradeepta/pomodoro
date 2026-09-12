import { useEffect } from "react";
import { useStore } from "./app/store";
import { Timer } from "./components/Timer";
import { Modes } from "./components/Modes";
import { Controls } from "./components/Controls";
import { Tasks } from "./components/Tasks";
import { ThemeToggle } from "./components/ThemeToggle";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { ShortcutsHelp } from "./components/ShortcutsHelp";



export default function App() {
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useKeyboardShortcuts();

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo">Pomofocus</div>
        <ThemeToggle />
      </div>

      <Modes />
      <Timer />
      <Controls />
      <Tasks />

      {/* 👇 ADD THIS */}
      <ShortcutsHelp />
    </div>
  );
}