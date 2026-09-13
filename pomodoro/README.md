# Pomofocus

A private, local-first Pomodoro timer for focused work. It runs entirely in
the browser: no account, API, or task data leaves the device.

## Usage

- Choose Focus, Short break, or Long break, then press Start. Completing four
  Focus sessions schedules a Long break; other Focus sessions schedule a Short
  break.
- Pause or reset the active session at any time. A completed session stops so
  the next one always starts intentionally.
- Add tasks, check them off, or delete them from the task list. Tasks persist
  across reloads in this browser.
- Open **Settings** to set Focus, Short break, and Long break durations from
  1–180 minutes. Saving resets the active session.
- Pomofocus starts in **night mode** (dark theme). Use the Dark/Light button in
  the top bar to change it; the preference persists across reloads.

## Keyboard shortcuts

- `Space` — start or pause
- `1`, `2`, `3` — Focus, Short break, Long break
- `T` — focus the task input
- `S` — open settings

Shortcuts do not run while typing into a form control.

## Development

Run from this directory:

```bash
npm install
npm run dev
```

Vite prints the local development URL. To create and inspect a production
bundle:

```bash
npm run lint
npm run build
npm run preview
```

The project requires a current Node.js release compatible with Vite 8. Keep
changes type-safe and run both `npm run lint` and `npm run build` before a
release. The application state is stored under the `pomodoro-app` local-storage
key; clearing that key resets tasks, settings, theme, and session history.

## Product and engineering references

See [`docs/PRODUCTION_SPEC.md`](docs/PRODUCTION_SPEC.md) for the behavior
contract and release checklist, [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
for the implementation design, and [`../HANDOFF.md`](../HANDOFF.md) for the
current repository handoff state.
