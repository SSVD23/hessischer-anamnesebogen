/*
  App.jsx
  Zentrale Komponente und einziger relevanter Zustandshalter der Anwendung.
  Verantwortlich fuer:
    - Seiten-Navigation (welcome / profile / questionnaire / summary)
    - Sprache (inkl. Textrichtung fuer RTL-Sprachen wie Arabisch)
    - Profile (laden, anlegen, auswaehlen, umbenennen, loeschen, alles loeschen)
    - Antworten des aktiven Profils inkl. automatischem Speichern (Autosave)
  Fachlogik ist in die Services ausgelagert; die Seiten sind ueberwiegend darstellend.
*/
import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as storage from "./services/storageService.js";
import { makeTranslator, getDirection } from "./services/translationService.js";
import { LanguageSwitcher } from "./components/LanguageSwitcher.jsx";
import { WelcomePage } from "./pages/WelcomePage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";
import { QuestionnairePage } from "./pages/QuestionnairePage.jsx";
import { SummaryPage } from "./pages/SummaryPage.jsx";

// Kleine ID-Hilfe (ausreichend eindeutig fuer einen lokalen Prototyp).
const newId = () => `p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export default function App() {
  const [language, setLanguage] = useState(() => storage.loadLanguage());
  const [profiles, setProfiles] = useState(() => storage.loadProfiles());
  const [activeProfileId, setActiveProfileId] = useState(() => storage.loadActiveProfileId());
  const [page, setPage] = useState("welcome"); // welcome | profile | questionnaire | summary
  const [currentSection, setCurrentSection] = useState(0);
  const [answersData, setAnswersData] = useState({ answers: {}, language: "de", updatedAt: null });

  // An die aktuelle Sprache gebundene Translator-Funktion.
  const t = useMemo(() => makeTranslator(language), [language]);

  const activeProfile = useMemo(
    () => profiles.find((p) => p.id === activeProfileId) || null,
    [profiles, activeProfileId]
  );

  // Sprache persistieren + Textrichtung (LTR/RTL) am <html>-Element setzen.
  useEffect(() => {
    storage.saveLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = getDirection(language);
  }, [language]);

  // Antworten des aktiven Profils laden, sobald sich die Auswahl aendert.
  useEffect(() => {
    if (activeProfileId) {
      setAnswersData(storage.loadAnswers(activeProfileId));
    } else {
      setAnswersData({ answers: {}, language, updatedAt: null });
    }
    // language bewusst nicht als Dependency: nur bei Profilwechsel neu laden
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfileId]);

  // --- Profil-Aktionen ---
  const createProfile = useCallback((name, birthYear) => {
    const profile = { id: newId(), name, birthYear: birthYear || "", createdAt: new Date().toISOString() };
    setProfiles((prev) => {
      const next = [...prev, profile];
      storage.saveProfiles(next);
      return next;
    });
    setActiveProfileId(profile.id);
    storage.saveActiveProfileId(profile.id);
  }, []);

  const selectProfile = useCallback((id) => {
    setActiveProfileId(id);
    storage.saveActiveProfileId(id);
    setCurrentSection(0);
  }, []);

  const renameProfile = useCallback((id, name) => {
    setProfiles((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, name } : p));
      storage.saveProfiles(next);
      return next;
    });
  }, []);

  const deleteProfile = useCallback(
    (id) => {
      const remaining = storage.deleteProfile(id);
      setProfiles(remaining);
      if (activeProfileId === id) setActiveProfileId(null);
    },
    [activeProfileId]
  );

  const clearAll = useCallback(() => {
    storage.clearAllData();
    setProfiles([]);
    setActiveProfileId(null);
    setAnswersData({ answers: {}, language, updatedAt: null });
    setPage("welcome");
  }, [language]);

  // --- Antworten aendern + automatisch speichern (Autosave) ---
  const handleAnswerChange = useCallback(
    (sectionId, fieldId, value) => {
      if (!activeProfileId) return;
      setAnswersData((prev) => {
        const nextAnswers = {
          ...prev.answers,
          [sectionId]: { ...(prev.answers[sectionId] || {}), [fieldId]: value },
        };
        const next = { answers: nextAnswers, language, updatedAt: new Date().toISOString() };
        storage.saveAnswers(activeProfileId, next); // sofortige Persistenz
        return next;
      });
    },
    [activeProfileId, language]
  );

  // Sprung aus der Zusammenfassung zurueck in einen bestimmten Abschnitt.
  const editSection = useCallback((index) => {
    setCurrentSection(index);
    setPage("questionnaire");
  }, []);

  // --- Seitenauswahl ---
  let content;
  if (page === "welcome") {
    content = <WelcomePage t={t} onStart={() => setPage("profile")} />;
  } else if (page === "profile") {
    content = (
      <ProfilePage
        t={t}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onCreateProfile={createProfile}
        onSelectProfile={selectProfile}
        onRenameProfile={renameProfile}
        onDeleteProfile={deleteProfile}
        onClearAll={clearAll}
        onContinue={() => {
          setCurrentSection(0);
          setPage("questionnaire");
        }}
      />
    );
  } else if (page === "questionnaire" && activeProfile) {
    content = (
      <QuestionnairePage
        t={t}
        profileName={activeProfile.name}
        answers={answersData.answers}
        currentSection={currentSection}
        onAnswerChange={handleAnswerChange}
        onSectionChange={setCurrentSection}
        onExit={() => setPage("profile")}
        onFinish={() => setPage("summary")}
      />
    );
  } else if (page === "summary" && activeProfile) {
    content = (
      <SummaryPage
        t={t}
        language={language}
        profile={activeProfile}
        answersData={answersData}
        onEditSection={editSection}
        onBack={() => setPage("questionnaire")}
      />
    );
  } else {
    // Fallback, falls kein aktives Profil vorhanden ist.
    content = <ProfilePage
      t={t}
      profiles={profiles}
      activeProfileId={activeProfileId}
      onCreateProfile={createProfile}
      onSelectProfile={selectProfile}
      onRenameProfile={renameProfile}
      onDeleteProfile={deleteProfile}
      onClearAll={clearAll}
      onContinue={() => { setCurrentSection(0); setPage("questionnaire"); }}
    />;
  }

  return (
    <div className="app-shell">
      <header className="app-header no-print">
        <div className="app-header__inner">
          <button type="button" className="brand" onClick={() => setPage("welcome")}>
            <span className="brand__mark" aria-hidden="true">✚</span>
            {t("app.title")}
          </button>
          <LanguageSwitcher language={language} onChange={setLanguage} t={t} />
        </div>
      </header>

      {content}

      <footer className="app-footer no-print">
        <small>{t("ui.disclaimerShort")}</small>
      </footer>
    </div>
  );
}
