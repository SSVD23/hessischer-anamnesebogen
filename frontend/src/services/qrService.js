/*
  qrService.js
  Erzeugt aus dem Uebergabe-Datensatz einen QR-Code als Data-URL.

  Konzept der Uebergabe an die Praxis:
  Der Datensatz verlaesst das Geraet NICHT ueber das Netzwerk. Er wird als
  QR-Code auf dem Display angezeigt und in der Praxis abgescannt
  (Sender und Empfaenger arbeiten unmittelbar auf einer Ebene, es ist kein
  Zwischendienst und keine zentrale Datensammlung beteiligt).

  Der Code wird bei Bedarf jederzeit neu erzeugt; eine Speicherung ist nicht
  erforderlich. Lediglich ein kurzes Uebergabeprotokoll (Zeitstempel und
  Empfaenger) wird lokal vorgehalten, damit nachvollziehbar bleibt, wann
  welcher Datensatz wem gezeigt wurde.
*/

import QRCode from "qrcode";

// Maximale Nutzlast eines QR-Codes bei mittlerer Fehlerkorrektur (Version 40).
// Darueber hinaus laesst sich der Code nicht mehr zuverlaessig erzeugen bzw. scannen.
export const QR_PAYLOAD_LIMIT = 2200;

/**
 * Erzeugt den QR-Code zu einem Datensatz.
 * @param {object} payload  Der zu uebergebende Datensatz (wird als JSON kodiert).
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
