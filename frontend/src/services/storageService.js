/*
  storageService.js
  Kapselt saemtliche Zugriffe auf window.localStorage (Web Storage API).
  Kein anderer Teil der App spricht localStorage direkt an -> zentrale, testbare Persistenzschicht.

  Speicherstruktur:
    anamnesis_profiles          -> Array von Profil-Metadaten [{ id, name, birthYear, createdAt }]
    anamnesis_active_profile    -> id des zuletzt gewaehlten Profils
    anamnesis_language          -> zuletzt gewaehlter Sprachcode
    anamnesis_answers_<id>      -> { answers, language, updatedAt } je Profil (getrennt gespeichert)
*/

const PROFILES_KEY = "anamnesis_profiles";
const ACTIVE_KEY = "anamnesis_active_profile";
const LANGUAGE_KEY = "anamnesis_language";
// Uebergabeprotokoll je Profil: wann wurde welcher Datensatz wem gezeigt.
const HANDOVER_PREFIX = "anamnesis_handover_";
const ANSWERS_PREFIX = "anamnesis_answers_";

// --- interne Helfer ---
function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Speicher voll / nicht verfuegbar -> im Prototyp still ignorieren
  }
}

// --- Profile ---
export function loadProfiles() {
  return read(PROFILES_KEY, []);
}

export function saveProfiles(profiles) {
  write(PROFILES_KEY, profiles);
}

// --- Aktives Profil ---
export function loadActiveProfileId() {
  return read(ACTIVE_KEY, null);
}

export function saveActiveProfileId(id) {
  write(ACTIVE_KEY, id);
}

// --- Sprache ---
export function loadLanguage() {
  return read(LANGUAGE_KEY, "de");
}

export function saveLanguage(lang) {
  write(LANGUAGE_KEY, lang);
}

// --- Antworten (pro Profil getrennt) ---
export function loadAnswers(profileId) {
  return read(ANSWERS_PREFIX + profileId, { answers: {}, language: "de", updatedAt: null });
}

export function saveAnswers(profileId, data) {
  write(ANSWERS_PREFIX + profileId, data);
}

// Loescht ein Profil UND dessen Antworten.
export function deleteProfile(profileId) {
  const remaining = loadProfiles().filter((p) => p.id !== profileId);
  saveProfiles(remaining);
  try {
    window.localStorage.removeItem(ANSWERS_PREFIX + profileId);
    window.localStorage.removeItem(HANDOVER_PREFIX + profileId);
  } catch (e) {}
  if (loadActiveProfileId() === profileId) saveActiveProfileId(null);
  return remaining;
}

/*
  Uebergabeprotokoll.
  Der QR-Code selbst wird bewusst NICHT gespeichert - er wird bei Bedarf neu
  erzeugt. Festgehalten wird nur, wann ein Datensatz welchem Empfaenger
  gezeigt wurde. Das macht spaetere Rueckfragen nachvollziehbar
  ("welche Fassung habe ich Dr. X wann uebergeben?").
*/
export function loadHandovers(profileId) {
  return read(HANDOVER_PREFIX + profileId, []);
}

export function appendHandover(profileId, entry) {
  const list = loadHandovers(profileId);
  // Nur die letzten 20 Eintraege vorhalten (Datensparsamkeit).
  const next = [...list, entry].slice(-20);
  write(HANDOVER_PREFIX + profileId, next);
  return next;
}

// Loescht ALLE lokal gespeicherten Daten der App (Profile + Antworten + Auswahl).
export function clearAllData() {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (
        key === PROFILES_KEY ||
        key === ACTIVE_KEY ||
        (key && key.startsWith(ANSWERS_PREFIX)) ||
        (key && key.startsWith(HANDOVER_PREFIX))
      ) {
        keys.push(key);
      }
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch (e) {}
}
