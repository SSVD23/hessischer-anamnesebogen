# Digitale Anamnese – Hessischer Anamnesebogen

Mehrsprachige, offline-fähige Web-App für einen digitalen Anamnesebogen in der Allgemeinmedizin. Bachelorarbeits-Prototyp – **kein Medizinprodukt**.

## Über das Projekt

Patient:innen füllen ihre (oder die eines Familienmitglieds) Anamnese vor dem Praxisbesuch bequem auf dem eigenen Smartphone aus. Alle Angaben bleiben ausschließlich auf dem Gerät gespeichert; es gibt keine zentrale Datenhaltung und keine automatische Netzwerkübertragung.

## Funktionen

- **7 Sprachen** (Deutsch, Englisch, Arabisch, Türkisch, Hindi, Französisch, Spanisch), Arabisch mit RTL-Unterstützung
- **Mehrere Profile** (z. B. für Familienmitglieder), jeweils mit getrennt gespeicherten Antworten
- **8 Themenabschnitte**: Stammdaten, Beschwerden, Vorerkrankungen, Medikamente, Allergien, Operationen, Lebensstil, Sonstiges
- **Autosave & Wiederherstellung** über `localStorage`
- **Barrierefreiheit**: Validierungsfehler werden per `aria-live` vorgelesen, Fokus springt automatisch zum ersten Fehlerfeld
- **Zusammenfassung** mit Sprung zurück zu jedem Abschnitt
- **Übergabe an die Praxis per QR-Code** – der Datensatz verlässt das Gerät nicht über das Netzwerk, sondern wird direkt vom Display abgescannt
- **Freiwillige, anonymisierte Datenspende** an ein Datenintegrationszentrum (Konzept-Platzhalter, überträgt aktuell keine Daten)

## Architektur

```
frontend/   React-App (Create React App + craco), Vanilla CSS, keine UI-Bibliothek
  src/components/   wiederverwendbare UI-Komponenten
  src/pages/        Welcome, ProfilePage, QuestionnairePage, SummaryPage
  src/services/     Storage, Übersetzung, Validierung, Export, QR-Code
  src/data/         Fragebogen-Definition (questionnaireDefinition.js) & Übersetzungen (translations.js)
backend/    FastAPI-Grundgerüst (aktuell ungenutzt – die App speichert ausschließlich lokal)
memory/     Produktanforderungen (PRD.md) und Projektstand
test_reports/  Protokolle vergangener Testing-Iterationen
```

Persistenz erfolgt ausschließlich über `window.localStorage` (keine Datenbank, kein Server-Roundtrip für die eigentliche Anwendungslogik).

## Erste Schritte

```bash
cd frontend
npm install
npm start
```

Die App läuft anschließend unter [http://localhost:3000](http://localhost:3000).

## Datenschutz

Alle Angaben verbleiben ausschließlich auf dem Gerät der Nutzerin/des Nutzers. Die Übergabe an eine Praxis erfolgt optional und lokal per QR-Code; die Datenspende ist im Prototyp rein konzeptionell und überträgt keine tatsächlichen Daten.

## Status

Bachelorarbeits-Prototyp. Details zum aktuellen Funktionsumfang und offenen Punkten siehe [`memory/PRD.md`](memory/PRD.md).
