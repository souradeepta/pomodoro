import { useStore } from "../app/store";
import type { Mode } from "../app/store";

export function Modes() {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);

  const modes: Mode[] = ["pomodoro", "short", "long"];

  return (
    <div className="modes" role="group" aria-label="Timer mode">
      {modes.map((m) => (
        <button
          key={m}
          type="button"
          className={mode === m ? "active" : ""}
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
        >
          {m === "pomodoro" ? "Focus" : m === "short" ? "Short break" : "Long break"}
        </button>
      ))}
    </div>
  );
}
