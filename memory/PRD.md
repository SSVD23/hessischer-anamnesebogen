# PRD — Digital Anamnesis Web App (Bachelor Thesis Prototype)

## Original Problem Statement
Prototype of a multilingual, offline-capable anamnesis (medical history) web app for general practice. Patients use their own device (BYOD, mobile-first) before a doctor visit to collect structured medical history. Focus: usability, clarity, trust, concept validation — not production readiness. German-first + English, privacy/local-first, open-source friendly, easy to extend.

## User Choices (locked)
- Storage: Browser localStorage only, fully offline, **no backend**
- Export: Print/PDF **and** downloadable JSON
- Palette: Soft clinical teal (#4A7C6B) + neutral grays
- Scope v1: Single profile (architecture extensible to multi-profile)
- i18n: Full German + English for all 8 sections

## Architecture
- React 19 + react-router-dom v7, Tailwind, framer-motion, lucide-react, sonner. No backend, no DB.
- i18n: `LanguageContext` + dictionary in `i18n/translations.js` (add a language = add a top-level key).
- State: `AnamnesisContext` (profile, answers, currentStep, completedAt) persisted via `useLocalStorage` hook (autosave).
- Data-driven `data/schema.js` defines 8 sections & field configs; `FormField.jsx` renders all field types generically.
- Pages: Landing → ProfileSetup → Questionnaire (8 steps) → Review → Summary.

## User Persona
Patient (any adult) filling their own or a family member's history before a GP appointment on a phone/tablet.

## Implemented (2026-06)
- Landing with privacy card, feature highlights, prototype disclaimer, start/continue.
- DE/EN language switcher, persisted.
- Profile creation with validation (first name + DOB required), relationship selector.
- 8-section multi-step questionnaire: text/number/textarea/select/radio-cards/checkbox-cards/slider, progress bar, autosave, conditional fields, required-field validation.
- Review page (edit-per-section) and Summary page (Print/PDF, JSON download, mock share toast, start-over with confirm + data wipe).
- Verified: 100% frontend E2E (testing agent iteration_1), no bugs.

## Backlog (P1/P2)
- P1: Multiple family profiles + profile switcher; edit existing profile for follow-up visits.
- P1: Reusable history / prefill for follow-up visits.
- P2: Real "share with doctor" flow; voluntary anonymized data-donation concept placeholder.
- P2: Accessibility polish (aria-checked on custom radio/checkbox cards); shadcn calendar for DOB.
- P2: PWA/service worker for true offline install.

## Next Tasks
- Gather professor feedback, then prioritize multi-profile support (highest thesis value).
