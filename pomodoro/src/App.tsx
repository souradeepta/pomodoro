import { useEffect, useState } from "react";
import { useStore } from "./app/store";
import { Timer } from "./components/Timer";
import { Modes } from "./components/Modes";
import { Controls } from "./components/Controls";
import { Tasks } from "./components/Tasks";
import { ThemeToggle } from "./components/ThemeToggle";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useTimer } from "./hooks/useTimer";
import { ShortcutsHelp } from "./components/ShortcutsHelp";
import { Settings } from "./components/Settings";



export default function App() {
  const theme = useStore((s) => s.theme);
  const mode = useStore((s) => s.mode);
  const running = useStore((s) => s.running);
  const sessionMessage = useStore((s) => s.sessionMessage);
  const completedPomodoros = useStore((s) => s.completedPomodoros);
  const dismissSessionMessage = useStore((s) => s.dismissSessionMessage);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.title = `${running ? "▶ " : ""}${mode === "pomodoro" ? "Focus" : mode === "short" ? "Short break" : "Long break"} · Pomofocus`;
  }, [mode, running]);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    document.addEventListener("toggle-settings", openSettings);
    return () => document.removeEventListener("toggle-settings", openSettings);
  }, []);

  useKeyboardShortcuts();
  useTimer();

  return (
    <main className="app">
      <div className="topbar">
        <div className="logo" aria-label="Pomofocus home">Pomofocus</div>
        <div className="topbarActions">
          <span className="sessionCount" title="Completed focus sessions">{completedPomodoros} sessions</span>
          <button type="button" className="settingsButton" onClick={() => setSettingsOpen(true)}>Settings</button>
          <ThemeToggle />
        </div>
      </div>

      {sessionMessage && <div className="sessionMessage" role="status">{sessionMessage}<button type="button" onClick={dismissSessionMessage} aria-label="Dismiss message">×</button></div>}

      <Modes />
      <Timer />
      <Controls />
      <Tasks />

      <ShortcutsHelp />
      {settingsOpen && <Settings onClose={() => setSettingsOpen(false)} />}
    </main>
  );
}
