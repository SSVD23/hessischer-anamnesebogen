/*
  ConfirmDialog.jsx
  Kleiner, wiederverwendbarer Bestätigungsdialog (Sicherheitsabfrage) in Vanilla-Umsetzung.
  Wird für "Profil löschen" und "Alle Daten löschen" verwendet.
  Schließt bei Klick auf den Hintergrund oder "Abbrechen".
*/
import React, { useEffect } from "react";

export function ConfirmDialog({ open, title, text, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  // Schließen per Escape-Taste (Barrierefreiheit / Tastaturbedienung).
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="btn-row">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
