/*
  QuestionField.jsx
  Generische, wiederverwendbare Frage-Komponente.
  Rendert je nach field.type das passende Eingabeelement:
  text, textarea, number, date, select (Dropdown), checkbox (Mehrfachauswahl).
  Labels/Optionen werden ueber den Translator (t) aus translations.js geladen.
  Barrierefreiheit: <label htmlFor>, aria-invalid, fieldset/legend fuer Checkbox-Gruppen.
*/
import React from "react";

export function QuestionField({ field, value, error, onChange, t }) {
  const fieldId = `q-${field.id}`;
  const label = t(`questions.${field.id}.label`);
  const help = t(`questions.${field.id}.help`);
  const hasHelp = help !== `questions.${field.id}.help`; // Schluessel unaufgeloest => kein Hilfetext
  const inputClass = error ? "input has-error" : "input";

  // Checkbox-Gruppe (Mehrfachauswahl) -> eigenes fieldset mit legend
  if (field.type === "checkbox") {
    const selected = Array.isArray(value) ? value : [];
    const toggle = (opt) =>
      onChange(selected.includes(opt) ? selected.filter((o) => o !== opt) : [...selected, opt]);

    return (
      <div className="field">
        <fieldset className="fieldset">
          <legend>
            {label}
            {field.required && <span className="req"> *</span>}
          </legend>
          {field.options.map((opt) => (
            <label key={opt} className="check-option" htmlFor={`${fieldId}-${opt}`}>
              <input
                id={`${fieldId}-${opt}`}
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              <span>{t(`questions.${field.id}.options.${opt}`)}</span>
            </label>
          ))}
        </fieldset>
        {error && (
          <p id={`err-${field.id}`} className="error-msg" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  // Einzelnes beschriftetes Eingabeelement
  return (
    <div className="field">
      <label htmlFor={fieldId}>
        {label}
        {field.required && <span className="req"> *</span>}
      </label>

      {field.type === "textarea" && (
        <textarea
          id={fieldId}
          className={error ? "textarea has-error" : "textarea"}
          value={value ?? ""}
          aria-invalid={!!error}
          aria-describedby={error ? `err-${field.id}` : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "select" && (
        <select
          id={fieldId}
          className={error ? "select has-error" : "select"}
          value={value ?? ""}
          aria-invalid={!!error}
          aria-describedby={error ? `err-${field.id}` : undefined}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">—</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {t(`questions.${field.id}.options.${opt}`)}
            </option>
          ))}
        </select>
      )}

      {(field.type === "text" || field.type === "number" || field.type === "date") && (
        <input
          id={fieldId}
          className={inputClass}
          type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
          inputMode={field.type === "number" ? "numeric" : undefined}
          min={field.min}
          max={field.max}
          value={value ?? ""}
          aria-invalid={!!error}
          aria-describedby={error ? `err-${field.id}` : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {hasHelp && <p className="help">{help}</p>}
      {error && <p id={`err-${field.id}`} className="error-msg" role="alert">{error}</p>}
    </div>
  );
}
