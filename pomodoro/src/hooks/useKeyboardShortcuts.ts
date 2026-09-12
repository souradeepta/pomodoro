import { useEffect } from "react";
import { useStore } from "../app/store";

export function useKeyboardShortcuts() {
    const start = useStore((s) => s.start);
    const pause = useStore((s) => s.pause);
    const setMode = useStore((s) => s.setMode);

    // 🔥 always fresh state (important fix)
    const getState = useStore.getState;

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;

            // ignore typing in inputs
            if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
                return;
            }

            // =========================
            // SPACE (FIXED)
            // =========================
            if (e.code === "Space") {
                e.preventDefault();

                const { running } = getState(); // 🔥 always fresh

                if (running) {
                    pause();
                } else {
                    start();
                }

                return;
            }

            // =========================
            // MODE SWITCHING
            // =========================
            if (e.key === "1") setMode("pomodoro");
            if (e.key === "2") setMode("short");
            if (e.key === "3") setMode("long");

            // =========================
            // TASK FOCUS
            // =========================
            if (e.key.toLowerCase() === "t") {
                document.getElementById("task-input")?.focus();
            }

            // =========================
            // SETTINGS EVENT
            // =========================
            if (e.key.toLowerCase() === "s") {
                document.dispatchEvent(new Event("toggle-settings"));
            }

            // =========================
            // CTRL SHORTCUTS
            // =========================
            if (e.ctrlKey) {
                switch (e.key.toLowerCase()) {
                    case "t":
                        e.preventDefault();
                        document.getElementById("task-input")?.focus();
                        break;

                    case "i":
                        e.preventDefault();
                        console.log("Increase task estimate");
                        break;

                    case "d":
                        e.preventDefault();
                        console.log("Decrease task estimate");
                        break;

                    case "n":
                        e.preventDefault();
                        console.log("Add note");
                        break;

                    case "p":
                        e.preventDefault();
                        console.log("Add project");
                        break;
                }
            }

            // ✅ ADD IT HERE (VERY TOP OF LOGIC)
            if (e.repeat) return;

            // Space → Start/Pause
            if (e.code === "Space") {
                e.preventDefault();

                const { running } = getState();

                if (running) pause();
                else start();

                return;
            }
        };

        window.addEventListener("keydown", handler);

        return () => window.removeEventListener("keydown", handler);
    }, [start, pause, setMode]);
}