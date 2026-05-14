import { useStore } from "../app/store";
import { formatTime } from "../utils/formatTime";

export function Timer() {
  const { remaining, total } = useStore();

  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  const progress = remaining / total;

  return (
    <div className="timerWrap">
      <svg width="300" height="300">
        <circle
          r={radius}
          cx="150"
          cy="150"
          className="bgCircle"
        />
        <circle
          r={radius}
          cx="150"
          cy="150"
          className="progressCircle"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference * (1 - progress),
          }}
        />
      </svg>

      <div className="timeText">
        {formatTime(remaining)}
      </div>
    </div>
  );
}