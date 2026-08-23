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
}) {
  const [errors, setErrors] = useState({});

  const section = questionnaireDefinition.sections[currentSection];
  const sectionAnswers = answers[section.id] || {};
  const isFirst = currentSection === 0;
  const isLast = currentSection === TOTAL_SECTIONS - 1;

  const goNext = () => {
    // Aktuellen Abschnitt validieren, bevor weitergeblaettert wird.
    const sectionErrors = validateSection(section, sectionAnswers, t);
    if (hasErrors(sectionErrors)) {
      setErrors(sectionErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setErrors({});
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
            onChange={(value) => onAnswerChange(section.id, field.id, value)}
            t={t}
          />
        ))}
      </div>

      <p className="autosave-hint no-print">✓ {t("ui.autosaved")}</p>

      <SectionNavigation isFirst={isFirst} isLast={isLast} onBack={goBack} onNext={goNext} t={t} />
    </div>
  );
}
