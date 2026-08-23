/*
  exportService.js
  Erzeugt aus den gespeicherten Antworten ein strukturiertes Export-JSON
  und loest den Datei-Download im Browser aus (Blob + <a download>).

  Das Export-Objekt enthaelt laut Anforderung:
    - schemaVersion
    - language (Sprache der letzten Bearbeitung)
    - profile (Metadaten: Name, optional Geburtsjahr)
    - savedAt (Zeitstempel der letzten Speicherung)
    - exportedAt (Zeitstempel des Exports)
    - answers (nach Abschnitten und Fragen strukturiert)
*/

import { SCHEMA_VERSION } from "../data/questionnaireDefinition.js";

export function buildExport(profile, answersData) {
  return {
    schemaVersion: SCHEMA_VERSION,
    language: answersData.language || "de",
    profile: {
      id: profile.id,
      name: profile.name,
      birthYear: profile.birthYear || null,
    },
    savedAt: answersData.updatedAt || null,
    exportedAt: new Date().toISOString(),
    answers: answersData.answers || {},
  };
}

// Loest den Download der JSON-Datei aus.
export function downloadJson(profile, answersData) {
  const payload = buildExport(profile, answersData);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const safeName = (profile.name || "profil").replace(/[^a-z0-9_-]+/gi, "_").toLowerCase();
  const date = new Date().toISOString().slice(0, 10);

  const a = document.createElement("a");
  a.href = url;
  a.download = `anamnese_${safeName}_${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
