import { useMemo } from "react";
import { useStore } from "../app/store";
import { formatTime } from "../utils/formatTime";

export function Timer() {
  const remaining = useStore((s) => s.remaining);
  const total = useStore((s) => s.total);

  const radius = 120;
  const circumference = useMemo(() => 2 * Math.PI * radius, []);

  const progress = total > 0 ? remaining / total : 0;
  const offset = circumference * (1 - progress);

  const formatted = formatTime(remaining);

  return (
    <div className="timerWrap" role="timer" aria-label={`Time remaining ${formatted}`}>
      <svg width="320" height="320" viewBox="0 0 320 320" aria-hidden="true">
        {/* Gradient definition */}
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          className="bgCircle"
        />

        {/* Progress circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          className="progressCircle"
          stroke="url(#timerGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Time display */}
      <div className="timeText" aria-live="polite">
        {formatted}
      </div>
    </div>
  );
}
