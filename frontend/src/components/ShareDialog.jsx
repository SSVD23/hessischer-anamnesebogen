/*
  ShareDialog.jsx
  Konzept-Platzhalter: simulierter Ablauf "Zusammenfassung an Praxis senden".
  WICHTIG: Es werden KEINE Daten uebertragen. Der Versand wird nur simuliert
  (setTimeout) und mit einer erzeugten Demo-Referenznummer bestaetigt.
  Dient in der Bachelorarbeit als Ausblick auf eine spaetere echte Anbindung.
*/
import React, { useState, useEffect } from "react";

// Statische Demo-Praxen (keine echten Empfaenger).
const DEMO_PRACTICES = [
  "Hausarztpraxis Dr. Müller",
  "Gemeinschaftspraxis Stadtmitte",
  "Praxis am Park",
];

export function ShareDialog({ open, onClose, t }) {
  const [practice, setPractice] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [reference, setReference] = useState("");

  // Beim Oeffnen zuruecksetzen.
  useEffect(() => {
    if (open) {
      setPractice("");
      setStatus("idle");
      setReference("");
    }
  }, [open]);

  // Schließen per Escape-Taste (Barrierefreiheit / Tastaturbedienung).
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const startSend = () => {
    setStatus("sending");
    // Simulierter Netzwerkvorgang – NUR Demo, keine echte Uebertragung.
    setTimeout(() => {
      setReference("DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase());
      setStatus("success");
    }, 1200);
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={t("share.title")}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{t("share.title")}</h3>

        {status !== "success" && (
          <>
            <p>{t("share.text")}</p>
            <div className="field">
              <label htmlFor="share-practice">{t("share.practiceLabel")}</label>
              <select
                id="share-practice"
                className="select"
                value={practice}
                onChange={(e) => setPractice(e.target.value)}
                autoFocus
              >
                <option value="">{t("share.practicePlaceholder")}</option>
                {DEMO_PRACTICES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="notice" style={{ marginBottom: "1rem" }}>
              {t("share.demoNote")}
            </div>
            <div className="btn-row">
              <button type="button" className="btn btn--secondary" onClick={onClose}>
                {t("common.cancel")}
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={startSend}
                disabled={!practice || status === "sending"}
              >
                {status === "sending" ? t("share.sending") : t("share.send")}
              </button>
            </div>
          </>
        )}

        {status === "success" && (
          <div role="status" aria-live="polite">
            <div className="share-success">
              <strong>{t("share.successTitle")}</strong>
              <p style={{ margin: "0.5rem 0 0" }}>{t("share.successText")}</p>
              <p style={{ margin: "0.5rem 0 0" }}>
                {t("share.refLabel")}: <code>{reference}</code>
              </p>
            </div>
            <div className="notice" style={{ margin: "1rem 0" }}>
              {t("share.demoNote")}
            </div>
            <button type="button" className="btn btn--primary btn--block" onClick={onClose}>
              {t("share.close")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
