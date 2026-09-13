import { useEffect } from "react";
import { useStore } from "../app/store";

export function useTimer() {
  const running = useStore((s) => s.running);
  const tick = useStore((s) => s.tick);

  useEffect(() => {
    if (!running) return;

    // The store derives remaining time from an epoch deadline, so this remains
    // accurate when a background tab throttles or pauses the interval.
    tick();
    const id = window.setInterval(tick, 250);
    return () => clearInterval(id);
  }, [running, tick]);
}
