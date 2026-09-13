# Pomofocus production specification

Status: implemented baseline (v1)  
Last reviewed: 2026-09-12

## Product goal

Pomofocus is a local-first Pomodoro timer for focused work. A user can start a
focus session, track a small list of tasks, and adjust session lengths without
an account or network dependency.

## Functional requirements

### Timer

- The default modes are Focus (25 minutes), Short break (5 minutes), and Long
  break (15 minutes).
- Start, pause, and reset controls are available by pointer and keyboard.
- Switching modes resets the current mode and pauses the timer.
- A completed Focus session increments the completed-session count and moves to
  Short break. Every fourth completed Focus session moves to Long break. A
  completed break moves back to Focus. The next session is stopped and requires
  explicit user confirmation to start.
- Remaining time is derived from an epoch deadline while running. Reloading or
  returning to a background tab must not add or lose elapsed time.
- Session completion is announced in a status region and the document title
  reflects the current mode and running state.

### Tasks

- Users can add a task with Enter or the Add task button, mark it complete, and
  delete it.
- Blank tasks are rejected; whitespace is normalized; task text is limited to
  200 characters.
- Tasks and completion state survive reloads in the browser's local storage.

### Settings and theme

- Focus, Short break, and Long break durations are editable from Settings.
- Durations are whole minutes from 1 to 180. Saving resets and pauses the
  current session so a duration change cannot silently alter elapsed work.
- Light/dark theme preference persists locally.

## Accessibility and interaction

- The timer has an accessible name and a polite live time display.
- All controls have explicit labels, keyboard focus styles, and disabled states.
- Task completion uses native checkboxes; deletion has a task-specific label.
- Global shortcuts are ignored while typing in editable controls and do not
  trigger repeatedly when a key is held: Space (start/pause), 1/2/3 (mode), T
  (task input), and S (settings).
- Reduced-motion preferences are respected.

## Data and privacy

The app stores only timer preferences, tasks, and lightweight session metadata
under the `pomodoro-app` local-storage key. No analytics, authentication, or
task content leaves the device. The persisted schema is versioned and migrates
the initial release shape.

## Quality gates and release criteria

- `npm run build` must pass TypeScript compilation and Vite production bundling.
- `npm run lint` must pass with no errors.
- Manual smoke test: load, add/complete/delete task, start/pause/reset, switch
  modes, save settings, toggle theme, use every listed shortcut, reload while
  running, and verify the responsive layout at mobile width.
- A future release should add unit tests around deadline math, persistence
  migration, and timer completion; browser-level tests should cover keyboard
  and screen-reader behavior.
