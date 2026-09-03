/*
  SummaryPage.jsx
  Zusammenfassungsseite: zeigt alle Antworten des aktiven Profils gruppiert an (SummaryView),
  bietet Sprung zurueck in einzelne Abschnitte sowie Druck-/PDF-Ausgabe und JSON-Export.
  Enthaelt eine druckoptimierte Kopfzeile (nur im Druck sichtbar, .print-title).
*/
import React, { useState } from "react";
import { SummaryView } from "../components/SummaryView.jsx";
import { ExportActions } from "../components/ExportActions.jsx";
import { QrDialog } from "../components/QrDialog.jsx";
import { DonationDialog } from "../components/DonationDialog.jsx";

export function SummaryPage({ t, language, profile, answersData, onEditSection, onBack, onHandover }) {
  const [qrOpen, setQrOpen] = useState(false);
  const [donationOpen, setDonationOpen] = useState(false);
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

      {/* Uebergabe an die Praxis per QR-Code (keine Netzwerkuebertragung). */}
      <button
        type="button"
        className="btn btn--primary btn--block no-print"
        style={{ marginTop: "0.75rem" }}
        onClick={() => setQrOpen(true)}
      >
        {t("qr.title")}
      </button>

      {/* Anonymisierte Datenspende - im Prototyp nur konzeptionell. */}
      <button
        type="button"
        className="btn btn--ghost btn--block no-print"
        style={{ marginTop: "0.75rem" }}
        onClick={() => setDonationOpen(true)}
      >
        {t("donation.button")}
      </button>

      <button type="button" className="btn btn--ghost btn--block no-print" style={{ marginTop: "0.75rem" }} onClick={onBack}>
        {t("summary.backToEdit")}
      </button>

      <div className="notice no-print" style={{ marginTop: "1.25rem" }}>
        {t("ui.disclaimerShort")}
      </div>

      <QrDialog
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        profile={profile}
        answersData={answersData}
        t={t}
        onHandover={onHandover}
      />
      <DonationDialog
        open={donationOpen}
        onClose={() => setDonationOpen(false)}
        profile={profile}
        answersData={answersData}
        t={t}
      />
    </div>
  );
}
