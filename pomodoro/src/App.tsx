import { useTimer } from "./hooks/useTimer";
import { Modes } from "./components/Modes";
import { Timer } from "./components/Timer";
import { Controls } from "./components/Controls";
import { Tasks } from "./components/Tasks";

export default function App() {
  useTimer();

  return (
    <div className="app">
      <Modes />
      <Timer />
      <Controls />
      <Tasks />
    </div>
  );
}