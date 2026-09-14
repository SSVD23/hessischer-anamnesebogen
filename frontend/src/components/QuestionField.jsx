/*
  QuestionField.jsx
  Generische, wiederverwendbare Frage-Komponente.
  Rendert je nach field.type das passende Eingabeelement:
  text, textarea, number, date, select (Dropdown), checkbox (Mehrfachauswahl).
  Labels/Optionen werden über den Translator (t) aus translations.js geladen.
  Barrierefreiheit: <label htmlFor>, aria-invalid, fieldset/legend für Checkbox-Gruppen.
*/
import React from "react";

export function QuestionField({ field, value, error, onChange, t, sectionAnswers = {} }) {
  const fieldId = `q-${field.id}`;
  const label = t(`questions.${field.id}.label`);
  const help = t(`questions.${field.id}.help`);
  const hasHelp = help !== `questions.${field.id}.help`; // Schlüssel unaufgelöst => kein Hilfetext
  const inputClass = error ? "input has-error" : "input";

  // Abhängiges Auswahlfeld: die Optionen ergeben sich aus der Antwort eines
  // vorgelagerten Feldes (z. B. Körperbereich -> konkrete Beschwerde).
  // Dadurch bleibt die Eingabe eine übersetzte Auswahl statt Freitext.
  if (field.type === "dependentSelect") {
    const parentValue = sectionAnswers[field.dependsOn];
    const options = (parentValue && field.optionsBy[parentValue]) || [];
    const disabled = options.length === 0;

    return (
      <div className="field">
        <label htmlFor={fieldId}>
          {label}
          {field.required && <span className="req"> *</span>}
        </label>
        {hasHelp && <p className="field-help">{help}</p>}
        <select
          id={fieldId}
          className={inputClass}
          value={value || ""}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `err-${field.id}` : undefined}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{t("common.pleaseSelect")}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {t(`questions.${field.id}.options.${opt}`)}
            </option>
          ))}
        </select>
        {error && (
          <p id={`err-${field.id}`} className="error-msg" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  // Wiederholbare Gruppe (z. B. mehrere Operationen mit je einer Jahreszahl).
  // Wert ist ein Array von Objekten, ein Eintrag pro itemFields-Zeile.
  if (field.type === "repeatableGroup") {
    const items = Array.isArray(value) && value.length > 0 ? value : [{}];

    const updateItem = (index, itemFieldId, itemValue) => {
      const next = items.map((item, i) =>
        i === index ? { ...item, [itemFieldId]: itemValue } : item
      );
      onChange(next);
    };
    const addItem = () => onChange([...items, {}]);
    const removeItem = (index) => {
      const next = items.filter((_, i) => i !== index);
      onChange(next.length > 0 ? next : [{}]);
    };

    return (
      <div className="field">
        <fieldset className="fieldset">
          <legend>
            {label}
            {field.required && <span className="req"> *</span>}
          </legend>
          {items.map((item, index) => (
            <div className="repeatable-row" key={index}>
              {field.itemFields.map((itemField) => (
                <input
                  key={itemField.id}
                  id={`${fieldId}-${index}-${itemField.id}`}
                  className="input"
                  type={itemField.type === "number" ? "number" : "text"}
                  inputMode={itemField.type === "number" ? "numeric" : undefined}
                  min={itemField.min}
                  max={itemField.max}
                  placeholder={t(`questions.${field.id}.itemFields.${itemField.id}`)}
                  aria-label={t(`questions.${field.id}.itemFields.${itemField.id}`)}
                  value={item[itemField.id] ?? ""}
                  onChange={(e) => updateItem(index, itemField.id, e.target.value)}
                />
              ))}
              {items.length > 1 && (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => removeItem(index)}
                  aria-label={t("common.removeEntry")}
                >
                  {t("common.removeEntry")}
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn--ghost" onClick={addItem}>
            {t("common.addEntry")}
          </button>
        </fieldset>
        {hasHelp && <p className="field-help">{help}</p>}
        {error && (
          <p id={`err-${field.id}`} className="error-msg" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

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
