/*
  SectionNavigation.jsx
  Vor-/Zurueck-Navigation zwischen den Abschnitten des Anamnesebogens.
  Im letzten Abschnitt wird aus "Weiter" -> "Zur Zusammenfassung".
*/
import React from "react";

export function SectionNavigation({ isFirst, isLast, onBack, onNext, t }) {
  return (
    <div className="btn-row no-print">
      <button type="button" className="btn btn--secondary" onClick={onBack}>
        {t("common.back")}
      </button>
      <button type="button" className="btn btn--primary" onClick={onNext}>
        {isLast ? t("questionnaire.toSummary") : t("common.next")}
      </button>
    </div>
  );
}
