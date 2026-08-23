/*
  SummaryView.jsx
  Reine Darstellung der Zusammenfassung: alle Antworten nach Abschnitten gruppiert.
  Formatiert die gespeicherten Werte lesbar (Optionen -> Uebersetzung, Arrays -> Liste).
  Enthaelt pro Abschnitt einen "Bearbeiten"-Button (im Druck ausgeblendet).
*/
import React from "react";
import { questionnaireDefinition } from "../data/questionnaireDefinition.js";

// Wandelt einen gespeicherten Rohwert in einen lesbaren, lokalisierten String um.
function formatValue(field, value, t, emptyLabel) {
  const empty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
  if (empty) return { text: emptyLabel, isEmpty: true };

  if (field.type === "select") {
    return { text: t(`questions.${field.id}.options.${value}`), isEmpty: false };
  }
  if (field.type === "checkbox") {
    return {
      text: value.map((v) => t(`questions.${field.id}.options.${v}`)).join(", "),
      isEmpty: false,
    };
  }
  return { text: String(value), isEmpty: false };
}

export function SummaryView({ answers, onEditSection, t }) {
  return (
    <div>
      {questionnaireDefinition.sections.map((section, index) => {
        const sectionAnswers = answers[section.id] || {};
        return (
          <div key={section.id} className="card">
            <div className="summary-section__head">
              <h3>{t(`sections.${section.id}`)}</h3>
              {onEditSection && (
                <button
                  type="button"
                  className="icon-btn no-print"
                  onClick={() => onEditSection(index)}
                >
                  {t("summary.edit")}
                </button>
              )}
            </div>
            <dl>
              {section.fields.map((field) => {
                const { text, isEmpty } = formatValue(field, sectionAnswers[field.id], t, t("summary.empty"));
                return (
                  <div key={field.id} className="summary-row">
                    <dt>{t(`questions.${field.id}.label`)}</dt>
                    <dd className={isEmpty ? "empty" : ""}>{text}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
