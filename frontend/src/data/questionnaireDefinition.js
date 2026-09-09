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
        // Haeufige Dauermedikationen als Mehrfachauswahl, aus dem gleichen
        // Grund wie bei commonAllergies: deckt den Grossteil der Faelle ab,
        // ohne dass Freitext uebersetzt werden muss.
        {
          id: "commonMedications",
          type: "checkbox",
          options: [
            "bloodPressure", "painRelief", "bloodThinner", "diabetesMed", "cholesterol",
            "thyroidHormone", "antidepressant", "contraceptive", "asthmaInhaler", "sedative",
          ],
        },
        { id: "medicationList", type: "textarea" },
      ],
    },
    {
      id: "allergien",
      fields: [
        { id: "hasAllergies", type: "select", options: ["yes", "no", "unknown"] },
        // Die haeufigsten Allergien als Mehrfachauswahl. Damit wird ein grosser
        // Teil der Faelle ohne uebersetzungsbeduerftigen Freitext abgedeckt.
        // Auswahl an den Kategorien der Studie zur Gesundheit Erwachsener in
        // Deutschland (DEGS1) ausgerichtet. Laktose- und Glutenunvertraeglichkeit
        // sind bewusst nicht enthalten: Es handelt sich um Intoleranzen bzw. eine
        // Autoimmunerkrankung und nicht um Allergien. Sie koennen weiterhin im
        // Freitextfeld "Unvertraeglichkeiten" angegeben werden.
        {
          id: "commonAllergies",
          type: "checkbox",
          options: [
            "pollen", "houseDust", "animalHair", "insectVenom", "penicillin",
            "otherDrugs", "nuts", "contrastAgent", "neurodermitis", "urticaria",
            "contactEczema",
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

// Krankenkassen zur Auswahl (feste Schreibweise verhindert Duplikate/Tippfehler
// wie "TK" vs. "Techniker" vs. "techniker krankenkasse"). "other" blendet ein
// Freitextfeld fuer nicht gelistete Kassen ein. Die Markennamen selbst werden
// nicht uebersetzt (Eigennamen); nur "private" und "other" sind sprachabhaengig,
// siehe translations.js unter profile.insurers.
export const INSURERS = [
  { id: "aok", label: "AOK" },
  { id: "tk", label: "TK" },
  { id: "barmer", label: "Barmer" },
  { id: "dak", label: "DAK-Gesundheit" },
  { id: "ikk", label: "IKK" },
  { id: "bkk", label: "BKK" },
  { id: "knappschaft", label: "Knappschaft" },
  { id: "private", label: "Privat versichert" },
  { id: "other", label: "" },
];
