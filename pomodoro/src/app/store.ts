import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mode = "pomodoro" | "short" | "long";
export type Theme = "light" | "dark";

export type Task = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

export type Settings = {
  pomodoro: number;
  short: number;
  long: number;
};

const DEFAULT_SETTINGS: Settings = { pomodoro: 25, short: 5, long: 15 };
const durationFor = (mode: Mode, settings: Settings) => settings[mode] * 60;
const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

type State = {
  mode: Mode;
  running: boolean;
  remaining: number;
  total: number;

  endAt: number | null;
  theme: Theme;
  settings: Settings;

  tasks: Task[];
  completedPomodoros: number;
  lastCompletedAt: number | null;
  sessionMessage: string | null;

  setTheme: (theme: "light" | "dark") => void;

  setMode: (mode: Mode) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  dismissSessionMessage: () => void;
  tick: () => void;
  start: () => void;
  pause: () => void;
  reset: () => void;

  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
};

const validMinutes = (value: number, fallback: number) =>
  Number.isFinite(value) ? Math.min(180, Math.max(1, Math.round(value))) : fallback;

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      mode: "pomodoro",
      running: false,
      total: durationFor("pomodoro", DEFAULT_SETTINGS),
      remaining: durationFor("pomodoro", DEFAULT_SETTINGS),
      endAt: null,

      theme: "dark",

      settings: DEFAULT_SETTINGS,

      tasks: [],
      completedPomodoros: 0,
      lastCompletedAt: null,
      sessionMessage: null,

      setTheme: (theme) => set({ theme }),

      setMode: (mode) => {
        const s = get().settings;

        const total =
          mode === "pomodoro"
            ? s.pomodoro * 60
            : mode === "short"
            ? s.short * 60
            : s.long * 60;

        set({ mode, total, remaining: total, running: false, endAt: null, sessionMessage: null });
      },

      updateSettings: (next) => {
        const current = get().settings;
        const settings: Settings = {
          pomodoro: validMinutes(next.pomodoro ?? current.pomodoro, current.pomodoro),
          short: validMinutes(next.short ?? current.short, current.short),
          long: validMinutes(next.long ?? current.long, current.long),
        };
        const { mode } = get();
        const total = durationFor(mode, settings);
        set({ settings, total, remaining: total, running: false, endAt: null });
      },

      dismissSessionMessage: () => set({ sessionMessage: null }),

      tick: () => {
        const { running, endAt, mode, settings, completedPomodoros, lastCompletedAt } = get();
        if (!running || endAt === null) return;
        const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
        if (remaining > 0) {
          set({ remaining });
          return;
        }
        const completed = mode === "pomodoro";
        const nextMode: Mode = completed
          ? (completedPomodoros + 1) % 4 === 0 ? "long" : "short"
          : "pomodoro";
        const total = durationFor(nextMode, settings);
        set({
          mode: nextMode,
          total,
          remaining: total,
          running: false,
          endAt: null,
          completedPomodoros: completed ? completedPomodoros + 1 : completedPomodoros,
          lastCompletedAt: completed ? Date.now() : lastCompletedAt,
          sessionMessage: completed
            ? `${nextMode === "long" ? "Four sessions complete — time for a long break." : "Pomodoro complete — time for a short break."}`
            : "Break complete — ready to focus?",
        });
      },

      start: () => {
        const { remaining } = get();
        if (remaining > 0) set({ running: true, endAt: Date.now() + remaining * 1000, sessionMessage: null });
      },

      pause: () => {
        const { endAt, running } = get();
        if (!running || endAt === null) return;
        const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
        set({ running: false, endAt: null, remaining });
      },

      reset: () => {
        const { mode } = get();
        const total = durationFor(mode, get().settings);
        set({ total, remaining: total, running: false, endAt: null, sessionMessage: null });
      },

      addTask: (text) => {
        const normalized = text.trim().replace(/\s+/g, " ");
        if (!normalized || normalized.length > 200) return;
        set((state) => ({
          tasks: [...state.tasks, { id: makeId(), text: normalized, done: false, createdAt: Date.now() }],
        }));
      },

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
    }),
    {
      name: "pomodoro-app",
      version: 1,
      migrate: (persisted, version) => {
        if (version === 0) {
          const old = persisted as Partial<State>;
          return {
            ...old,
            settings: { ...DEFAULT_SETTINGS, ...old.settings },
            tasks: (old.tasks ?? []).map((task) => ({ ...task, createdAt: task.createdAt ?? Date.now() })),
            completedPomodoros: old.completedPomodoros ?? 0,
            lastCompletedAt: old.lastCompletedAt ?? null,
            endAt: old.endAt ?? null,
            sessionMessage: null,
          };
        }
        return persisted as State;
      },
      merge: (persisted, current) => {
        const state = { ...current, ...(persisted as Partial<State>) };
        if (state.running && state.endAt === null) state.endAt = Date.now() + state.remaining * 1000;
        return state;
      },
    }
  )
);
