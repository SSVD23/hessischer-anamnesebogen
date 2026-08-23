/*
  questionnaireDefinition.js
  Zentrale, datengetriebene Definition des Anamnesebogens.
  Die UI (QuestionnairePage / QuestionField) wird vollstaendig aus dieser Struktur erzeugt.

  Struktur:
    sections: [
      { id, fields: [ { id, type, required?, min?, max? } ] }
    ]
  - Labels/Optionen liegen NICHT hier, sondern in translations.js
    (Schluessel: questions.<fieldId>.label bzw. questions.<fieldId>.options.<wert>,
     Abschnittstitel: sections.<sectionId>).
  - Unterstuetzte Feldtypen: text, textarea, select, checkbox (Mehrfachauswahl), number, date.

  Neue Frage/Abschnitt hinzufuegen = hier ergaenzen + Uebersetzungsschluessel anlegen.
*/

export const SCHEMA_VERSION = "1.0";

export const questionnaireDefinition = {
  sections: [
    {
      id: "stammdaten",
      fields: [
        { id: "firstName", type: "text" },
        { id: "lastName", type: "text" },
        { id: "birthDate", type: "date" },
        { id: "gender", type: "select", options: ["female", "male", "diverse", "unspecified"] },
        { id: "height", type: "number", min: 0, max: 250 },
        { id: "weight", type: "number", min: 0, max: 400 },
      ],
    },
    {
      id: "beschwerden",
      fields: [
        { id: "mainComplaint", type: "textarea", required: true },
        { id: "since", type: "text" },
        { id: "painLevel", type: "number", min: 0, max: 10 },
        { id: "symptoms", type: "textarea" },
      ],
    },
    {
      id: "vorerkrankungen",
      fields: [
        {
          id: "chronicConditions",
          type: "checkbox",
          options: [
            "diabetes", "hypertension", "asthma", "heartDisease", "cancer",
            "thyroid", "kidneyDisease", "liverDisease", "mentalHealth",
          ],
        },
        { id: "otherIllnesses", type: "textarea" },
      ],
    },
    {
      id: "medikamente",
      fields: [
        { id: "takesMedication", type: "select", options: ["yes", "no"] },
        { id: "medicationList", type: "textarea" },
      ],
    },
    {
      id: "allergien",
      fields: [
        { id: "hasAllergies", type: "select", options: ["yes", "no", "unknown"] },
        { id: "allergyList", type: "textarea" },
      ],
    },
    {
      id: "operationen",
      fields: [
        { id: "hasOperations", type: "select", options: ["yes", "no"] },
        { id: "operationList", type: "textarea" },
      ],
    },
    {
      id: "lebensstil",
      fields: [
        { id: "smoking", type: "select", options: ["never", "former", "occasionally", "regularly"] },
        { id: "alcohol", type: "select", options: ["never", "occasionally", "weekly", "daily"] },
        { id: "exercise", type: "select", options: ["none", "rarely", "weekly", "daily"] },
        { id: "sleep", type: "text" },
        { id: "diet", type: "textarea" },
      ],
    },
    {
      id: "sonstiges",
      fields: [{ id: "additionalNotes", type: "textarea" }],
    },
  ],
};

export const TOTAL_SECTIONS = questionnaireDefinition.sections.length;
