/*
  ProgressIndicator.jsx
  Zeigt den Bearbeitungsfortschritt: Text ("Abschnitt X von Y") + Fortschrittsbalken.
*/
import React from "react";

export function ProgressIndicator({ current, total, t }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="progress" aria-label={t("questionnaire.progress", { current, total })}>
      <div className="progress__meta">
        <span>{t("questionnaire.progress", { current, total })}</span>
        <span>{percent}%</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
