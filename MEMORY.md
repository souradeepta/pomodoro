# Project memory

Pomofocus is a local-first React Pomodoro timer whose application lives in
`pomodoro/`. It deliberately has no backend, authentication, analytics, or
environment-variable configuration.

The durable product rules are in `pomodoro/docs/PRODUCTION_SPEC.md`. Timer
state is deadline-based (`endAt`) rather than counter-based so elapsed time is
correct after throttling, backgrounding, or reloads. Browser local storage key
`pomodoro-app` holds the persisted state.

Night mode is a first-class supported feature: dark is the default theme,
the user can switch it from the top bar, and the choice persists. New visual
work must use the CSS theme variables in `pomodoro/src/index.css` so it works
in both dark and light themes.

Before handing off a change, run `npm run lint` and `npm run build` from
`pomodoro/`. Keep the handoff document and production specification aligned
when changing user-visible behavior.
