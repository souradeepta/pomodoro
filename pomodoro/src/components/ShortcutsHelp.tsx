export function ShortcutsHelp() {
  return (
    <details className="shortcutsCard">
      <summary>Keyboard shortcuts</summary>
      <div className="shortcutsList">
        <div className="shortcutRow"><span className="shortcutKey">Space</span><span className="shortcutAction">Start or pause timer</span></div>
        <div className="shortcutRow"><span className="shortcutKey">1 / 2 / 3</span><span className="shortcutAction">Switch focus / break mode</span></div>
        <div className="shortcutRow"><span className="shortcutKey">T</span><span className="shortcutAction">Focus task input</span></div>
        <div className="shortcutRow"><span className="shortcutKey">S</span><span className="shortcutAction">Open settings</span></div>
      </div>
    </details>
  );
}
