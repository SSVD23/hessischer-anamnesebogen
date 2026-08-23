/*
  validationService.js
  Einfache, wiederverwendbare Validierung der Formulareingaben.
  Gibt ein Objekt strukturierter Fehler zurueck: { <fieldId>: <lokalisierte Meldung> }.
  Die Fehlermeldungen werden ueber die uebergebene Translator-Funktion (t) lokalisiert,
  damit Meldungen in allen Sprachen erscheinen.
*/

function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

// Validiert alle Felder eines Abschnitts. section stammt aus questionnaireDefinition.
export function validateSection(section, sectionAnswers = {}, t) {
  const errors = {};

  section.fields.forEach((field) => {
    const value = sectionAnswers[field.id];

    // Pflichtfeld-Pruefung
    if (field.required && isEmpty(value)) {
      errors[field.id] = t("validation.required");
      return;
    }
    if (isEmpty(value)) return;

    // Zahlenformat
    if (field.type === "number") {
      const num = Number(value);
      if (Number.isNaN(num)) {
        errors[field.id] = t("validation.invalidNumber");
      }
    }

    // Datumsformat
    if (field.type === "date") {
      if (Number.isNaN(Date.parse(value))) {
        errors[field.id] = t("validation.invalidDate");
      }
    }
  });

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
