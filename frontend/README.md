# Frontend – Digitale Anamnese

React-Anwendung für den digitalen Anamnesebogen. Projektüberblick siehe [Haupt-README](../README.md).

## Verfügbare Skripte

- `npm start` – Entwicklungsserver unter [http://localhost:3000](http://localhost:3000)
- `npm run build` – Produktionsbuild im Ordner `build/`
- `npm test` – Testrunner im interaktiven Watch-Modus

## Struktur

- `src/components/` – wiederverwendbare UI-Komponenten (Dialoge, Fragefelder, Sprachumschalter, ...)
- `src/pages/` – Seiten der App (Welcome, ProfilePage, QuestionnairePage, SummaryPage)
- `src/services/` – Storage-, Übersetzungs-, Validierungs-, Export- und QR-Code-Logik
- `src/data/` – Fragebogen-Definition (`questionnaireDefinition.js`) und Übersetzungen (`translations.js`)
- `src/styles/` – Vanilla CSS (`global.css`)

Gebaut mit [Create React App](https://github.com/facebook/create-react-app) über [craco](https://craco.js.org/), bewusst framework-neutral gehalten (reines React + Vanilla CSS, relative Imports) und 1:1 in ein Vite-Projekt portierbar.
