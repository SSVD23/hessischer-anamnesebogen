# PRD — Digitale Anamnese (Bachelorarbeits-Prototyp)

## Original Problem Statement (v2 – Re-Architektur)
Mehrsprachige, PWA-artige React-App für einen digitalen Anamnesebogen in der Allgemeinmedizin. Bachelorarbeits-Prototyp, kein Medizinprodukt. Client-side only, Persistenz ausschließlich über window.localStorage. Vanilla CSS (kein Tailwind/UI-Framework). Feste Ordnerstruktur (components/data/services/pages/App.jsx) muss eingehalten werden (in der Arbeit erklärbar). Funktionaler React-Code mit Hooks, aussagekräftige Kommentare.

## Umgebungs-Hinweis
Plattform startet das Frontend über craco (nicht Vite) — der Build-Runner kann hier nicht auf Vite umgestellt werden (bräche die Live-Vorschau). Der Quellcode ist bewusst framework-neutral (relative Imports, reines React + Vanilla CSS) und 1:1 in ein `npm create vite@latest`-Projekt portierbar. Dokumentierte Architektur bleibt identisch.

## Architektur & Datenfluss
- `App.jsx`: zentraler Zustandshalter (Sprache, Profile, aktives Profil, aktueller Abschnitt, Antworten, Seite). Unidirektionaler Datenfluss über Props + Callbacks. Autosave bei jeder Antwortänderung.
- Seiten (`pages/`): WelcomePage, ProfilePage, QuestionnairePage, SummaryPage (überwiegend darstellend).
- Komponenten (`components/`): LanguageSwitcher, ProfileSelector, ProgressIndicator, QuestionField (generisch), SectionNavigation, SummaryView, ExportActions, ConfirmDialog.
- Services (`services/`): storageService (localStorage-Kapselung), translationService (t+Fallback de/en/…), validationService (Pflicht/Zahl/Datum), exportService (JSON-Blob-Download).
- Daten (`data/`): translations.js (7 Sprachen; de/en vollständig, ar/tr/hi/fr/es Kerntexte), questionnaireDefinition.js (8 Abschnitte, datengetrieben, SCHEMA_VERSION 1.0).
- Styling: `styles/global.css` — Vanilla CSS, Teal + Neutraltöne, mobile-first, Fokuszustände, `@media print`.

## localStorage-Schema
- `anamnesis_profiles`, `anamnesis_active_profile`, `anamnesis_language`, `anamnesis_answers_<profileId>` ({answers, language, updatedAt}).

## User Persona
Patient:in, füllt eigene oder Familien-Anamnese (Kind/Eltern) auf dem eigenen Smartphone vor dem Praxisbesuch aus. Optional Praxispersonal.

## Umgesetzt (2026-06)
- 7-sprachige i18n **vollständig** (alle Fragen-Labels + Optionen in de/en/ar/tr/hi/fr/es), Arabisch RTL, Sprache persistiert.
- Multi-Profil: erstellen/auswählen/umbenennen/löschen (Bestätigungsdialog, Escape schließt), pro Profil getrennte Antworten.
- 8-Abschnitt-Fragebogen, dynamisch generiert; Feldtypen text/textarea/select/checkbox(multi)/number/date; Fortschrittsanzeige; Pflichtfeld-Validierung.
- Barrierefreiheit: Validierungsfehler per aria-live (role=alert) vorgelesen, Fokus springt auf erstes Fehlerfeld, aria-invalid/aria-describedby, Escape schließt Dialoge, sichtbare Fokuszustände.
- „An Praxis senden (Demo)": simulierter Ablauf (ShareDialog) als Konzept-Platzhalter — überträgt KEINE Daten, erzeugt Demo-Referenznummer.
- PWA: Service Worker (public/service-worker.js, network-first HTML / cache-first Assets) + Manifest → installier- und offline-fähig.
- Autosave + Wiederherstellung; Zusammenfassung mit Sprung-zurück; Druck/PDF-CSS; JSON-Export; „Alle Daten löschen".
- Verifiziert: Testing-Agent iteration_2 (12/12) + iteration_3 (8/8 neue Features) = 100% PASS.

## Backlog (P1/P2)
- P1: Restliche Sprachen (ar/tr/hi/fr/es) für Fragenlabels vollständig übersetzen.
- P2: „Mit Praxis teilen“-Mock, freiwillige anonymisierte Datenspende (Konzept-Platzhalter).
- P2: Barrierefreiheit (aria-live bei Validierung), optionales Service-Worker-Offline-Caching.

## Nächste Schritte
- Professor-Feedback einholen; danach ggf. weitere Sprachen vervollständigen.
