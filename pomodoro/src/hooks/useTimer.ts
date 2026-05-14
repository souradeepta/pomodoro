import { useEffect } from "react";
import { useStore } from "../app/store";

export function useTimer() {
  const running = useStore((s) => s.running);
  const tick = useStore((s) => s.tick);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [running, tick]);
}