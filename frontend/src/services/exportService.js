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

export function buildExport(profile, answersData, options = {}) {
  return {
    schemaVersion: SCHEMA_VERSION,
    language: answersData.language || "de",
    // Fachrichtung des verwendeten Bogens (umgesetzt: Allgemeinmedizin).
    specialty: options.specialty || "generalPractice",
    profile: {
      id: profile.id,
      name: profile.name,
      birthYear: profile.birthYear || null,
      // Nummer der elektronischen Gesundheitskarte: eindeutige Zuordnung,
      // da ein Name allein nicht eindeutig ist.
      insuranceNumber: profile.insuranceNumber || null,
      insurer: profile.insurer || null,
    },
    // Empfaenger der Uebergabe (wem wurde der Datensatz gezeigt/uebergeben).
    recipient: options.recipient || null,
    savedAt: answersData.updatedAt || null,
    exportedAt: new Date().toISOString(),
    answers: answersData.answers || {},
  };
}

/*
  Anonymisierter Datensatz fuer eine freiwillige Datenspende an ein
  Datenintegrationszentrum (DIZ).

  Bewusst NICHT enthalten: Name, Vorname, exaktes Geburtsdatum,
  Versichertennummer, Krankenkasse und alle Freitextfelder (diese koennten
  unbeabsichtigt Rueckschluesse auf die Person zulassen).
  Enthalten sind ausschliesslich Geburtsjahr, Postleitzahl-Ebene und die
  strukturierten Auswahlwerte.

  Hinweis: Die Uebertragung ist im Prototyp nur konzeptionell vorgesehen
  (per TLS an einen fest hinterlegten Endpunkt) und wird nicht ausgefuehrt.
*/
export const DONATION_ENDPOINT = "https://diz.example-university.de/api/v1/anamnesis";

const FREETEXT_FIELDS = [
  "firstName", "lastName", "birthDate", "complaintOther", "otherIllnesses",
  "medicationList", "allergyList", "operationList", "diet", "sleep", "additionalNotes",
];

export function buildDonation(profile, answersData, options = {}) {
  const source = answersData.answers || {};
  const answers = {};

  Object.keys(source).forEach((sectionId) => {
    const fields = {};
    Object.keys(source[sectionId] || {}).forEach((fieldId) => {
      if (FREETEXT_FIELDS.includes(fieldId)) return; // Freitext wird nicht gespendet
      fields[fieldId] = source[sectionId][fieldId];
    });
    if (Object.keys(fields).length > 0) answers[sectionId] = fields;
  });

  return {
    schemaVersion: SCHEMA_VERSION,
    type: "anonymous-donation",
    specialty: options.specialty || "generalPractice",
    // Nur grobe, nicht personenbeziehbare Merkmale:
    birthYear: profile.birthYear || null,
    postalArea: options.postalArea || null,
    submittedAt: new Date().toISOString(),
    answers,
  };
}

// Loest den Download der JSON-Datei aus.
//
// Auf Ruecksprache mit dem Erstpruefer deaktiviert: Der lokale Datei-Export
// ist fuer die Datenschutz-Argumentation der Arbeit nicht relevant und
// hinterlaesst zudem eine unverschluesselte Kopie der Anamnesedaten im
// Downloads-Ordner des Geraets. Funktion bleibt auskommentiert erhalten,
// `buildExport` selbst wird weiterhin von der QR-Uebergabe verwendet.
//
// export function downloadJson(profile, answersData) {
//   const payload = buildExport(profile, answersData);
//   const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
//   const url = URL.createObjectURL(blob);
//
//   const safeName = (profile.name || "profil").replace(/[^a-z0-9_-]+/gi, "_").toLowerCase();
//   const date = new Date().toISOString().slice(0, 10);
//
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `anamnese_${safeName}_${date}.json`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }
