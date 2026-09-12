export function ShortcutsHelp() {
  const shortcuts = [
    { key: "Space", action: "Start / Pause timer" },
    { key: "1", action: "Switch to Pomodoro" },
    { key: "2", action: "Switch to Short Break" },
    { key: "3", action: "Switch to Long Break" },
    { key: "T", action: "Focus task input" },
    { key: "R", action: "Open / Close Report" },
    { key: "S", action: "Open / Close Settings" },
    { key: "Ctrl + T", action: "Focus on task name" },
    { key: "Ctrl + I", action: "Increase task estimate" },
    { key: "Ctrl + D", action: "Decrease task estimate" },
    { key: "Ctrl + N", action: "Add note" },
    { key: "Ctrl + P", action: "Add project" },
  ];

  return (
    <div className="shortcutsCard">
      <h3>Keyboard Shortcuts</h3>

      <div className="shortcutsList">
        {shortcuts.map((s) => (
          <div key={s.key} className="shortcutRow">
            <span className="shortcutKey">{s.key}</span>
            <span className="shortcutAction">{s.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}