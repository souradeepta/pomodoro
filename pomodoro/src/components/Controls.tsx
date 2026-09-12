import { useStore } from "../app/store";

export function Controls() {
  const start = useStore((s) => s.start);
  const pause = useStore((s) => s.pause);
  const reset = useStore((s) => s.reset);

  return (
    <div className="controls">
      <button type="button" onClick={start}>
        Start
      </button>
      <button type="button" onClick={pause}>
        Pause
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}