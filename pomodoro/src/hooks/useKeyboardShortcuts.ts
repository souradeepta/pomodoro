import { useEffect } from "react";
import { useStore } from "../app/store";

/** Global shortcuts intentionally ignore editable controls and key repeats. */
export function useKeyboardShortcuts() {
  const start = useStore((state) => state.start);
  const pause = useStore((state) => state.pause);
  const setMode = useStore((state) => state.setMode);
  const getState = useStore.getState;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || (target instanceof HTMLElement && target.isContentEditable)) return;

      if (event.code === "Space") {
        event.preventDefault();
        if (getState().running) pause(); else start();
        return;
      }
      if (event.key === "1") setMode("pomodoro");
      if (event.key === "2") setMode("short");
      if (event.key === "3") setMode("long");
      if (event.key.toLowerCase() === "t") document.getElementById("task-input")?.focus();
      if (event.key.toLowerCase() === "s") document.dispatchEvent(new Event("toggle-settings"));
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [getState, pause, setMode, start]);
}
