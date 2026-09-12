import { useStore } from "../app/store";

export function Tasks() {
    const tasks = useStore((s) => s.tasks);
    const addTask = useStore((s) => s.addTask);
    const toggleTask = useStore((s) => s.toggleTask);

    return (
        <div className="tasks">
            <input
                id="task-input"
                placeholder="Add task..."
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTask((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                    }
                }}
            />

            {tasks.map((t) => (
                <div key={t.id} className="task">
                    <span
                        style={{
                            textDecoration: t.done ? "line-through" : "none",
                        }}
                    >
                        {t.text}
                    </span>

                    <button onClick={() => toggleTask(t.id)}>
                        ✓
                    </button>
                </div>
            ))}
        </div>
    );
}