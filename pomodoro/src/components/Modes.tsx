import { useStore } from "../app/store";
import type { Mode } from "../app/store";

export function Modes() {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);

  const modes: Mode[] = ["pomodoro", "short", "long"];

  return (
    <div className="modes">
      {modes.map((m) => (
        <button
          key={m}
          className={mode === m ? "active" : ""}
          onClick={() => setMode(m)}
        >
          {m}
        </button>
      ))}
    </div>
  );
}