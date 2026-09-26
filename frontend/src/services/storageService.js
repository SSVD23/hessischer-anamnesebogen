/*
  storageService.js
  Kapselt sämtliche Zugriffe auf window.localStorage (Web Storage API).
  Kein anderer Teil der App spricht localStorage direkt an -> zentrale, testbare Persistenzschicht.

  Speicherstruktur:
    anamnesis_profiles          -> Array von Profil-Metadaten [{ id, name, birthYear, insuranceNumber, insurer, createdAt }]
    anamnesis_active_profile    -> id des zuletzt gewählten Profils
    anamnesis_language          -> zuletzt gewählter Sprachcode
    anamnesis_answers_<id>      -> { answers, language, updatedAt } je Profil (getrennt gespeichert)
*/

const PROFILES_KEY = "anamnesis_profiles";
const ACTIVE_KEY = "anamnesis_active_profile";
const LANGUAGE_KEY = "anamnesis_language";
// Übergabeprotokoll je Profil: wann wurde welcher Datensatz wem gezeigt.
const HANDOVER_PREFIX = "anamnesis_handover_";
const ANSWERS_PREFIX = "anamnesis_answers_";
// Merkt sich, ob die Erklärungskarte auf der Startseite dauerhaft
// ausgeblendet werden soll ("Beim nächsten Mal nicht mehr zeigen").
const INTRO_DISMISSED_KEY = "anamnesis_intro_dismissed";

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
    // Speicher voll / nicht verfügbar -> im Prototyp still ignorieren
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

// --- Startseiten-Erklärung ---
export function loadIntroDismissed() {
  return read(INTRO_DISMISSED_KEY, false);
}

export function dismissIntro() {
  write(INTRO_DISMISSED_KEY, true);
}

// --- Antworten (pro Profil getrennt) ---
export function loadAnswers(profileId) {
  return read(ANSWERS_PREFIX + profileId, { answers: {}, language: "de", updatedAt: null });
}

export function saveAnswers(profileId, data) {
  write(ANSWERS_PREFIX + profileId, data);
}

// Löscht ein Profil UND dessen Antworten.
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
  Übergabeprotokoll.
  Der QR-Code selbst wird bewusst NICHT gespeichert - er wird bei Bedarf neu
  erzeugt. Festgehalten wird nur, wann ein Datensatz welchem Empfänger
  gezeigt wurde. Das macht spätere Rückfragen nachvollziehbar
  ("welche Fassung habe ich Dr. X wann übergeben?").
*/
export function loadHandovers(profileId) {
  return read(HANDOVER_PREFIX + profileId, []);
}

export function appendHandover(profileId, entry) {
  const list = loadHandovers(profileId);
  // Nur die letzten 20 Einträge vorhalten (Datensparsamkeit).
  const next = [...list, entry].slice(-20);
  write(HANDOVER_PREFIX + profileId, next);
  return next;
}

// Löscht ALLE lokal gespeicherten Daten der App (Profile + Antworten + Auswahl).
export function clearAllData() {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (
        key === PROFILES_KEY ||
        key === ACTIVE_KEY ||
        key === LANGUAGE_KEY ||
        key === INTRO_DISMISSED_KEY ||
        (key && key.startsWith(ANSWERS_PREFIX)) ||
        (key && key.startsWith(HANDOVER_PREFIX))
      ) {
        keys.push(key);
      }
    }
    keys.forEach((k) => window.localStorage.removeItem(k));
  } catch (e) {}
}
