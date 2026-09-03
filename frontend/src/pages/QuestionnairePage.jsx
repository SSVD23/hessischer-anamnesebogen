/*
  QuestionnairePage.jsx
  Mehrseitiger Anamnesebogen: zeigt jeweils einen Abschnitt an, erzeugt die Felder
  datengetrieben aus questionnaireDefinition und rendert sie ueber QuestionField.
  - Fortschrittsanzeige ueber ProgressIndicator
  - Vor/Zurueck ueber SectionNavigation
  - Validierung des aktuellen Abschnitts vor dem Weiterblaettern (validationService)
  Das automatische Speichern erfolgt zentral in App (onAnswerChange) -> effizient pro Eingabe.
*/
import React, { useState } from "react";
import { questionnaireDefinition, TOTAL_SECTIONS } from "../data/questionnaireDefinition.js";
import { validateSection, hasErrors } from "../services/validationService.js";
import { QuestionField } from "../components/QuestionField.jsx";
import { ProgressIndicator } from "../components/ProgressIndicator.jsx";
import { SectionNavigation } from "../components/SectionNavigation.jsx";

export function QuestionnairePage({
  t,
  profileName,
  answers,
  currentSection,
  onAnswerChange,
  onSectionChange,
  onExit,
  onFinish,
  returnToSummary = false,
  onReturnToSummary,
}) {
  const [errors, setErrors] = useState({});
  const [announce, setAnnounce] = useState("");

  const section = questionnaireDefinition.sections[currentSection];
  const sectionAnswers = answers[section.id] || {};
  const isFirst = currentSection === 0;
  const isLast = currentSection === TOTAL_SECTIONS - 1;

  const goNext = () => {
    // Aktuellen Abschnitt validieren, bevor weitergeblaettert wird.
    const sectionErrors = validateSection(section, sectionAnswers, t);
    if (hasErrors(sectionErrors)) {
      setErrors(sectionErrors);
      const count = Object.keys(sectionErrors).length;
      setAnnounce(t("a11y.errorSummary", { count }));
      // Fokus auf das erste fehlerhafte Feld setzen (Tastatur- und Screenreader-Bedienung).
      const firstId = Object.keys(sectionErrors)[0];
      const firstField = section.fields.find((f) => f.id === firstId);
      const domId =
        firstField && firstField.type === "checkbox"
          ? `q-${firstId}-${firstField.options[0]}`
          : `q-${firstId}`;
      requestAnimationFrame(() => {
        const el = document.getElementById(domId);
        if (el) el.focus();
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors({});
    setAnnounce("");
    // Wurde dieser Abschnitt aus der Zusammenfassung heraus geoeffnet,
    // springt die Anwendung direkt dorthin zurueck (kein erneuter Durchlauf).
    if (returnToSummary && onReturnToSummary) {
      onReturnToSummary();
      return;
    }
    if (isLast) {
      onFinish();
    } else {
      onSectionChange(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setErrors({});
    if (isFirst) {
      onExit();
    } else {
      onSectionChange(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="page">
      <ProgressIndicator current={currentSection + 1} total={TOTAL_SECTIONS} t={t} />

      {/* Unsichtbare Live-Region: Screenreader liest Validierungsfehler vor. */}
      <div className="sr-only" role="alert" aria-live="assertive">
        {announce}
      </div>

      <p className="section-desc" style={{ marginBottom: "0.5rem" }}>
        <strong>{t("questionnaire.editingFor")}:</strong> {profileName}
      </p>
      <h2>{t(`sections.${section.id}`)}</h2>

      <div className="card">
        {section.fields.map((field) => (
          <QuestionField
            key={field.id}
            field={field}
            value={sectionAnswers[field.id]}
            error={errors[field.id]}
            sectionAnswers={sectionAnswers}
            onChange={(value) => onAnswerChange(section.id, field.id, value)}
            t={t}
          />
        ))}
      </div>

      <p className="autosave-hint no-print">✓ {t("ui.autosaved")}</p>

      <SectionNavigation
        isFirst={isFirst}
        isLast={isLast || returnToSummary}
        onBack={goBack}
        onNext={goNext}
        t={t}
      />
    </div>
  );
}
