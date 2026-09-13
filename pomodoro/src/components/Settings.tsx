import { useState } from "react";
import type { FormEvent } from "react";
import { useStore } from "../app/store";
import type { Settings as SettingsShape } from "../app/store";

type Props = { onClose: () => void };

export function Settings({ onClose }: Props) {
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);
  const [values, setValues] = useState<SettingsShape>(settings);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSettings(values);
    onClose();
  };

  return (
    <div className="modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modalBox" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div className="modalHeader"><h2 id="settings-title">Timer settings</h2><button type="button" className="iconButton" onClick={onClose} aria-label="Close settings">×</button></div>
        <form onSubmit={submit}>
          <p className="modalHint">Changing a duration resets the current session.</p>
          <label>Focus <input type="number" min="1" max="180" value={values.pomodoro} onChange={(e) => setValues({ ...values, pomodoro: Number(e.target.value) })} /> <span>minutes</span></label>
          <label>Short break <input type="number" min="1" max="180" value={values.short} onChange={(e) => setValues({ ...values, short: Number(e.target.value) })} /> <span>minutes</span></label>
          <label>Long break <input type="number" min="1" max="180" value={values.long} onChange={(e) => setValues({ ...values, long: Number(e.target.value) })} /> <span>minutes</span></label>
          <div className="modalActions"><button type="button" onClick={onClose}>Cancel</button><button type="submit" className="primaryButton">Save settings</button></div>
        </form>
      </section>
    </div>
  );
}
