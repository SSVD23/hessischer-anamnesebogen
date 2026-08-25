/*
  SummaryPage.jsx
  Zusammenfassungsseite: zeigt alle Antworten des aktiven Profils gruppiert an (SummaryView),
  bietet Sprung zurueck in einzelne Abschnitte sowie Druck-/PDF-Ausgabe und JSON-Export.
  Enthaelt eine druckoptimierte Kopfzeile (nur im Druck sichtbar, .print-title).
*/
import React, { useState } from "react";
import { SummaryView } from "../components/SummaryView.jsx";
import { ExportActions } from "../components/ExportActions.jsx";
import { ShareDialog } from "../components/ShareDialog.jsx";

export function SummaryPage({ t, language, profile, answersData, onEditSection, onBack }) {
  const [shareOpen, setShareOpen] = useState(false);
  const savedAt = answersData.updatedAt
    ? new Date(answersData.updatedAt).toLocaleString(language === "de" ? "de-DE" : "en-GB")
    : "—";

  return (
    <div className="page">
      {/* Nur im Druck sichtbar */}
      <div className="print-title">
        <h1>{t("summary.title")}</h1>
        <p>
          {t("summary.profileInfo")}: {profile.name}
          {profile.birthYear ? ` (${profile.birthYear})` : ""}
        </p>
      </div>

      <h1 className="no-print">{t("summary.title")}</h1>
      <p className="no-print">{t("summary.subtitle")}</p>

      <div className="card">
        <div className="summary-row">
          <dt>{t("summary.profileInfo")}</dt>
          <dd>
            {profile.name}
            {profile.birthYear ? ` (${profile.birthYear})` : ""}
          </dd>
        </div>
        <div className="summary-row">
          <dt>{t("summary.lastSaved")}</dt>
          <dd>{savedAt}</dd>
        </div>
      </div>

      <SummaryView answers={answersData.answers || {}} onEditSection={onEditSection} t={t} />

      <ExportActions profile={profile} answersData={answersData} t={t} />

      <button
        type="button"
        className="btn btn--ghost btn--block no-print"
        style={{ marginTop: "0.75rem" }}
        onClick={() => setShareOpen(true)}
      >
        {t("share.button")}
      </button>

      <button type="button" className="btn btn--ghost btn--block no-print" style={{ marginTop: "0.75rem" }} onClick={onBack}>
        {t("summary.backToEdit")}
      </button>

      <div className="notice no-print" style={{ marginTop: "1.25rem" }}>
        {t("ui.disclaimerShort")}
      </div>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} t={t} />
    </div>
  );
}
