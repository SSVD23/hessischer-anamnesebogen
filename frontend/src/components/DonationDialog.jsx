/*
  DonationDialog.jsx
  Freiwillige, anonymisierte Datenspende an ein Datenintegrationszentrum (DIZ).

  WICHTIG: Diese Funktion ist im Prototyp bewusst nur KONZEPTIONELL umgesetzt.
  Es wird nichts uebertragen. Der Dialog zeigt transparent,
    - welcher Datensatz uebergeben wuerde,
    - welche Angaben zuvor entfernt werden,
    - ueber welchen Weg die Uebertragung erfolgen wuerde
      (TLS-gesicherte Verbindung an einen fest hinterlegten Endpunkt).

  Zweck der Spende: Aus vielen anonymen Datensaetzen laesst sich ein zeitnahes
  regionales Lagebild ableiten (z. B. Haeufung von Infekten oder Allergien).
*/
import React, { useState, useEffect } from "react";
import { buildDonation, DONATION_ENDPOINT } from "../services/exportService.js";

export function DonationDialog({ open, onClose, profile, answersData, t }) {
  const [postalArea, setPostalArea] = useState("");
  const [showPayload, setShowPayload] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const payload = buildDonation(profile, answersData, { postalArea: postalArea || null });

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="donation-title">{t("donation.title")}</h2>
        <p className="field-help">{t("donation.intro")}</p>

        <div className="notice" style={{ marginBottom: "0.75rem" }}>
          <strong>{t("donation.removedTitle")}</strong>
          <ul style={{ margin: "0.4rem 0 0 1rem" }}>
            <li>{t("donation.removedName")}</li>
            <li>{t("donation.removedBirthDate")}</li>
            <li>{t("donation.removedInsurance")}</li>
            <li>{t("donation.removedFreetext")}</li>
          </ul>
        </div>

        <div className="field">
          <label htmlFor="donation-postal">{t("donation.postalLabel")}</label>
          <input
            id="donation-postal"
            className="input"
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={postalArea}
            placeholder={t("donation.postalPlaceholder")}
            onChange={(e) => setPostalArea(e.target.value.replace(/\D/g, ""))}
          />
          <p className="field-help">{t("donation.postalHelp")}</p>
        </div>

        <button
          type="button"
          className="btn btn--ghost btn--block"
          onClick={() => setShowPayload((v) => !v)}
        >
          {showPayload ? t("donation.hidePayload") : t("donation.showPayload")}
        </button>

        {showPayload && (
          <pre className="payload-preview" aria-label={t("donation.showPayload")}>
            {JSON.stringify(payload, null, 2)}
          </pre>
        )}

        <div className="notice" style={{ marginTop: "0.75rem" }}>
          <strong>{t("donation.conceptTitle")}</strong>
          <p style={{ margin: "0.4rem 0 0" }}>
            {t("donation.conceptText")}
          </p>
          <p style={{ margin: "0.4rem 0 0" }}>
            <code>POST {DONATION_ENDPOINT}</code>
          </p>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            {t("common.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
