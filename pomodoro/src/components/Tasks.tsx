import { useState } from "react";
import type { FormEvent } from "react";
import { useStore } from "../app/store";

export function Tasks() {
  const tasks = useStore((s) => s.tasks);
  const addTask = useStore((s) => s.addTask);
  const toggleTask = useStore((s) => s.toggleTask);
  const removeTask = useStore((s) => s.removeTask);
  const [text, setText] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim()) { addTask(text); setText(""); }
  };
  const completed = tasks.filter((task) => task.done).length;

  return (
    <section className="tasks" aria-labelledby="tasks-heading">
      <div className="sectionHeading">
        <h2 id="tasks-heading">Tasks</h2>
        <span className="taskCount" aria-label={`${completed} of ${tasks.length} tasks complete`}>{completed}/{tasks.length}</span>
      </div>
      <form className="taskForm" onSubmit={submit}>
        <label className="srOnly" htmlFor="task-input">New task</label>
        <input id="task-input" value={text} maxLength={200} placeholder="What needs your focus?" onChange={(event) => setText(event.target.value)} />
        <button type="submit" disabled={!text.trim()}>Add task</button>
      </form>
      {tasks.length === 0 ? <p className="emptyState">No tasks yet. Add one to get started.</p> : (
        <ul className="taskList">
          {tasks.map((task) => (
            <li key={task.id} className={`task${task.done ? " isDone" : ""}`}>
              <label className="taskLabel">
                <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                <span>{task.text}</span>
              </label>
              <button type="button" className="iconButton" onClick={() => removeTask(task.id)} aria-label={`Delete ${task.text}`}>×</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
