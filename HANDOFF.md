# Pomofocus handoff

## Repository state

- Branch: `main`
- Application root: `pomodoro/`
- Stack: React 19, TypeScript, Vite 8, Zustand
- Persistence: browser local storage (`pomodoro-app`); there is no backend or
  environment configuration.

## Current product baseline

The production baseline is implemented and specified in
[`pomodoro/docs/PRODUCTION_SPEC.md`](pomodoro/docs/PRODUCTION_SPEC.md).

- Deadline-based timing stays accurate through backgrounding and reloads.
- Focus, short-break, and long-break modes are available; every fourth Focus
  completion selects the long break.
- Tasks, settings, completed-session count, and theme persist locally.
- **Night mode is present and is the default.** The top-bar theme control
  switches between the persisted Dark and Light themes.
- Keyboard shortcuts are Space, 1/2/3, T, and S; they are ignored in editable
  controls.

## Validation and release workflow

From `pomodoro/`, run:

```bash
npm install
npm run lint
npm run build
```

For a final smoke test, check start/pause/reset, all modes, settings, task
add/complete/delete, Dark/Light switching, shortcuts, a reload during an active
timer, and a mobile-width layout. Build artifacts in `pomodoro/dist/` are
generated and are not source-of-truth files.

## Useful entry points

- `src/app/store.ts` — persisted domain state and timing rules
- `src/hooks/useTimer.ts` — timer polling lifecycle
- `src/App.tsx` — page composition, theme application, modal lifecycle
- `src/index.css` — responsive styling and both theme token sets
- `docs/ARCHITECTURE.md` — implementation constraints for contributors

## Resume

```bash
git clone git@github.com:souradeepta/pomodoro.git
cd pomodoro/pomodoro
npm install
npm run dev
```
