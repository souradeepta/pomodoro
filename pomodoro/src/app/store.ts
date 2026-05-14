import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mode = "pomodoro" | "short" | "long";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type State = {
  mode: Mode;
  running: boolean;
  remaining: number;
  total: number;

  settings: {
    pomodoro: number;
    short: number;
    long: number;
  };

  tasks: Task[];

  setMode: (mode: Mode) => void;
  tick: () => void;
  start: () => void;
  pause: () => void;
  reset: () => void;

  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      mode: "pomodoro",
      running: false,
      total: 1500,
      remaining: 1500,

      settings: {
        pomodoro: 25,
        short: 5,
        long: 15,
      },

      tasks: [],

      setMode: (mode) => {
        const s = get().settings;
        const total =
          mode === "pomodoro"
            ? s.pomodoro * 60
            : mode === "short"
            ? s.short * 60
            : s.long * 60;

        set({ mode, total, remaining: total, running: false });
      },

      tick: () => {
        const { remaining, mode, setMode } = get();

        if (remaining <= 1) {
          if (mode === "pomodoro") setMode("short");
          else setMode("pomodoro");
          return;
        }

        set({ remaining: remaining - 1 });
      },

      start: () => set({ running: true }),
      pause: () => set({ running: false }),
      reset: () => {
        const { setMode, mode } = get();
        setMode(mode);
      },

      addTask: (text) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), text, done: false },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
    }),
    {
      name: "pomodoro-app",
    }
  )
);