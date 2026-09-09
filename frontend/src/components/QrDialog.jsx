/*
  QrDialog.jsx
  Uebergabe des Anamnesedatensatzes an eine Praxis mittels QR-Code.

  Ablauf:
    1. Empfaenger auswaehlen (wem wird der Code gezeigt).
    2. QR-Code wird erzeugt und auf dem Display angezeigt.
    3. Die Praxis scannt den Code direkt vom Bildschirm.

  Es findet KEINE Netzwerkuebertragung statt. Der Code wird nicht gespeichert,
  sondern bei Bedarf jederzeit neu erzeugt (jeder Aufruf traegt einen eigenen
  Zeitstempel). Lokal wird lediglich ein kurzes Uebergabeprotokoll gefuehrt.
*/
import React, { useState, useEffect, useCallback } from "react";
import { buildExport } from "../services/exportService.js";
import { buildQrCode } from "../services/qrService.js";
import { loadHandovers } from "../services/storageService.js";

const RECIPIENTS = ["practice", "specialist", "hospital", "other"];

export function QrDialog({ open, onClose, profile, answersData, t, onHandover }) {
  const [recipient, setRecipient] = useState("practice");
  // Freiwilliger Klarname zusaetzlich zur Kategorie (z. B. "Hausarztpraxis
  // Mueller"), damit im Verlauf nachvollziehbar bleibt, wem konkret ein
  // Datensatz gezeigt wurde - nicht nur, welcher Art von Stelle.
  const [recipientName, setRecipientName] = useState("");
  const [qr, setQr] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Escape schliesst den Dialog (Tastaturbedienung).
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Beim Schliessen zuruecksetzen, damit beim naechsten Oeffnen neu erzeugt wird.
  useEffect(() => {
    if (!open) {
      setQr(null);
      setError("");
      setShowHistory(false);
    }
  }, [open]);

  const generate = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const trimmedName = recipientName.trim();
      const payload = buildExport(profile, answersData, {
        recipient: trimmedName || recipient,
      });
      const result = await buildQrCode(payload);
      setQr(result);
      // Uebergabe protokollieren (Zeitstempel, Kategorie und optionaler Klarname).
      if (onHandover) {
        onHandover({ recipient, recipientName: trimmedName || null, at: payload.exportedAt });
      }
    } catch (err) {
      setError(err.code === "payload-too-large" ? t("qr.tooLarge") : t("qr.failed"));
      setQr(null);
    } finally {
      setBusy(false);
    }
  }, [profile, answersData, recipient, recipientName, onHandover, t]);

  const history = open ? loadHandovers(profile.id) : [];

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="qr-title">{t("qr.title")}</h2>
        <p className="field-help">{t("qr.intro")}</p>

        <div className="field">
          <label htmlFor="qr-recipient">{t("qr.recipientLabel")}</label>
          <select
            id="qr-recipient"
            className="input"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setQr(null); // Empfaenger geaendert -> Code neu erzeugen
            }}
          >
            {RECIPIENTS.map((r) => (
              <option key={r} value={r}>
                {t(`qr.recipients.${r}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="qr-recipient-name">{t("qr.recipientNameLabel")}</label>
          <input
            id="qr-recipient-name"
            className="input"
            type="text"
            value={recipientName}
            placeholder={t("qr.recipientNamePlaceholder")}
            onChange={(e) => {
              setRecipientName(e.target.value);
              setQr(null);
            }}
          />
          <p className="field-help">{t("qr.recipientNameHelp")}</p>
        </div>

        {qr && (
          <div className="qr-box">
            <img src={qr.dataUrl} alt={t("qr.imageAlt")} width="320" height="320" />
            <p className="field-help">{t("qr.showHint")}</p>
          </div>
        )}

        {error && (
          <p className="error-msg" role="alert">
            {error}
          </p>
        )}

        <div className="notice" style={{ marginTop: "0.75rem" }}>
          {t("qr.privacyNote")}
        </div>

        <button
          type="button"
          className="btn btn--ghost btn--block"
          style={{ marginTop: "0.75rem" }}
          onClick={() => setShowHistory((v) => !v)}
        >
          {showHistory ? t("qr.hideHistory") : t("qr.showHistory")}
        </button>

        {showHistory && (
          history.length === 0 ? (
            <p className="field-help">{t("qr.historyEmpty")}</p>
          ) : (
            <ul className="handover-history">
              {[...history].reverse().map((entry, i) => (
                <li key={i}>
                  <strong>{entry.recipientName || t(`qr.recipients.${entry.recipient}`)}</strong>
                  {" — "}
                  {new Date(entry.at).toLocaleString()}
                </li>
              ))}
            </ul>
          )
        )}

        <div className="modal-actions">
          <button type="button" className="btn btn--primary" onClick={generate} disabled={busy}>
            {qr ? t("qr.regenerate") : t("qr.generate")}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            {t("common.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
