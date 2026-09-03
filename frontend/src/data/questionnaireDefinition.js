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
        // Zwei-Stufen-Auswahl: erst Koerperbereich, dann konkrete Beschwerde.
        // Vorteil: die Werte sind bereits uebersetzt, es muss kein Freitext
        // aus einer Fremdsprache uebersetzt werden.
        {
          id: "bodyRegion",
          type: "select",
          required: true,
          options: ["head", "torso", "internal", "limbs", "skin", "psyche", "general"],
        },
        {
          id: "complaintDetail",
          type: "dependentSelect",
          dependsOn: "bodyRegion",
          optionsBy: {
            head: ["headache", "dizziness", "earPain", "eyeProblem", "toothPain", "sinus"],
            torso: ["chestPain", "backPain", "breathing", "palpitations"],
            internal: ["abdominalPain", "nausea", "diarrhea", "constipation", "urination", "heartburn"],
            limbs: ["kneePain", "shoulderPain", "elbowPain", "hipPain", "anklePain", "swelling"],
            skin: ["rash", "itching", "wound", "moleChange"],
            psyche: ["sleepProblem", "anxiety", "lowMood", "stress"],
            general: ["fever", "fatigue", "weightLoss", "appetite"],
          },
        },
        { id: "since", type: "text" },
        { id: "painLevel", type: "number", min: 0, max: 10 },
        // Auffangfeld fuer seltene Faelle (bewusst als Freitext belassen).
        { id: "complaintOther", type: "textarea" },
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
        // Die haeufigsten Allergien als Mehrfachauswahl. Damit wird ein grosser
        // Teil der Faelle ohne uebersetzungsbeduerftigen Freitext abgedeckt.
        {
          id: "commonAllergies",
          type: "checkbox",
          options: [
            "pollen", "houseDust", "animalHair", "insectVenom", "penicillin",
            "otherDrugs", "nuts", "lactose", "gluten", "contrastAgent",
          ],
        },
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

// Fachrichtungen. Umgesetzt ist ausschliesslich die Allgemeinmedizin;
// die weiteren Eintraege sind angedeutet, um die Erweiterbarkeit zu zeigen.
export const SPECIALTIES = [
  { id: "generalPractice", available: true },
  { id: "internalMedicine", available: false },
  { id: "orthopedics", available: false },
];

export const TOTAL_SECTIONS = questionnaireDefinition.sections.length;
