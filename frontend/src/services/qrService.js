/*
  qrService.js
  Erzeugt aus dem Übergabe-Datensatz einen QR-Code als Data-URL.

  Konzept der Übergabe an die Praxis:
  Der Datensatz verlässt das Gerät NICHT über das Netzwerk. Er wird als
  QR-Code auf dem Display angezeigt und in der Praxis abgescannt
  (Sender und Empfänger arbeiten unmittelbar auf einer Ebene, es ist kein
  Zwischendienst und keine zentrale Datensammlung beteiligt).

  Der Code wird bei Bedarf jederzeit neu erzeugt; eine Speicherung ist nicht
  erforderlich. Lediglich ein kurzes Übergabeprotokoll (Zeitstempel und
  Empfänger) wird lokal vorgehalten, damit nachvollziehbar bleibt, wann
  welcher Datensatz wem gezeigt wurde.
*/

import QRCode from "qrcode";

// Maximale Nutzlast eines QR-Codes bei mittlerer Fehlerkorrektur (Version 40).
// Darüber hinaus lässt sich der Code nicht mehr zuverlässig erzeugen bzw. scannen.
export const QR_PAYLOAD_LIMIT = 2200;

/**
 * Erzeugt den QR-Code zu einem Datensatz.
 * @param {object} payload  Der zu übergebende Datensatz (wird als JSON kodiert).
 * @returns {Promise<{dataUrl: string, size: number}>}
 */
export async function buildQrCode(payload) {
  const json = JSON.stringify(payload);

  if (json.length > QR_PAYLOAD_LIMIT) {
    const error = new Error("payload-too-large");
    error.code = "payload-too-large";
    error.size = json.length;
    throw error;
  }

  const dataUrl = await QRCode.toDataURL(json, {
    errorCorrectionLevel: "M",
    margin: 2,
    width: 320,
    color: { dark: "#1F3A34", light: "#FFFFFF" },
  });

  return { dataUrl, size: json.length };
}
