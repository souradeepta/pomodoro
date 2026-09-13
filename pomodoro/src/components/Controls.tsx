import { useStore } from "../app/store";

export function Controls() {
  const running = useStore((s) => s.running);
  const start = useStore((s) => s.start);
  const pause = useStore((s) => s.pause);
  const reset = useStore((s) => s.reset);

  return (
    <div className="controls" aria-label="Timer controls">
      <button type="button" onClick={start} disabled={running}>
        Start
      </button>
      <button type="button" onClick={pause} disabled={!running}>
        Pause
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
