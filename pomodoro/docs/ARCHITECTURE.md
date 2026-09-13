# Architecture notes

The UI is composed of small React components and a single Zustand store. The
store is the source of truth for timer, task, theme, and settings state; its
persist middleware provides local-first storage.

Timer state uses `endAt` rather than decrementing a counter. `useTimer` polls
the store while running and the store calculates `ceil((endAt - now) / 1000)`.
This makes the result resilient to browser timer throttling and reloads. A
completion atomically records the session, changes mode, pauses, and exposes a
status message for the UI.

The app deliberately has no backend. This keeps task data private and avoids a
failure mode where the timer depends on network availability. If sync is added
later, it should be an explicit opt-in adapter around the store rather than a
direct network call from components.

## Developer workflow

Run commands from the `pomodoro/` directory:

```bash
npm install
npm run dev
npm run lint
npm run build
```

`npm run build` runs TypeScript project compilation before producing the Vite
bundle. There is no server-side configuration or environment-variable setup.

## Theme and night mode

`theme` is a persisted `"dark" | "light"` store value. The default is `dark`
(night mode), applied through `body[data-theme]` by `App`. The theme toggle is
the single UI writer for that setting, and CSS custom properties provide both
color schemes. Any new component must use these variables rather than hard-code
surface or text colors so it remains legible in night mode.
