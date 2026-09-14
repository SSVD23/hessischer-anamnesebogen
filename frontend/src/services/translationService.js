/*
  translationService.js
  Zentraler Zugriff auf die Übersetzungen.
  t(key, language, vars) löst einen Punkt-Pfad (z. B. "questions.gender.label") auf.
  Fallback-Reihenfolge: gewählte Sprache -> Englisch -> Deutsch -> Schlüssel selbst.
  So bleiben unvollständig übersetzte Sprachen (ar, tr, hi, fr, es) nutzbar.
*/

import { translations, availableLanguages } from "../data/translations.js";

// Punkt-Pfad in einem verschachtelten Objekt auflösen.
function resolve(obj, path) {
  return path.split(".").reduce((acc, part) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, part)) return acc[part];
    return undefined;
  }, obj);
}

export function t(key, language = "de", vars) {
  let value = resolve(translations[language], key);
  if (value === undefined) value = resolve(translations.en, key);
  if (value === undefined) value = resolve(translations.de, key);
  if (value === undefined) return key; // Notfall: Schlüssel sichtbar machen

  // Platzhalter {name} ersetzen (nur bei Strings).
  if (typeof value === "string" && vars) {
    Object.keys(vars).forEach((k) => {
      value = value.replace(new RegExp(`{${k}}`, "g"), vars[k]);
    });
  }
  return value;
}

// Erzeugt eine an eine Sprache gebundene t-Funktion (bequem für Komponenten).
export function makeTranslator(language) {
  return (key, vars) => t(key, language, vars);
}

export function getAvailableLanguages() {
  return availableLanguages;
}

export function getDirection(language) {
  const entry = availableLanguages.find((l) => l.code === language);
  return entry ? entry.dir : "ltr";
}
