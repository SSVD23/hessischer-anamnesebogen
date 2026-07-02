// Data-driven anamnesis schema. Each section renders one questionnaire step.
// Field types: text, number, textarea, radio, select, checkboxes, slider.
// Labels/options are resolved via i18n keys: fields.<name>.label / .options.<value>
export const SECTIONS = [
  {
    id: "personalBasics",
    icon: "User",
    fields: [
      { name: "gender", type: "radio", options: ["female", "male", "diverse", "unspecified"] },
      { name: "height", type: "number" },
      { name: "weight", type: "number" },
      {
        name: "bloodType",
        type: "select",
        options: ["unknown", "A+", "A-", "B+", "B-", "AB+", "AB-", "0+", "0-"],
      },
      { name: "occupation", type: "text" },
    ],
  },
  {
    id: "currentComplaints",
    icon: "Stethoscope",
    fields: [
      { name: "mainComplaint", type: "textarea", required: true },
      { name: "since", type: "text" },
      { name: "painLevel", type: "slider", min: 0, max: 10 },
      { name: "additionalSymptoms", type: "textarea" },
    ],
  },
  {
    id: "allergies",
    icon: "TriangleAlert",
    fields: [
      { name: "hasAllergies", type: "radio", options: ["yes", "no", "unknown"] },
      { name: "allergyDetails", type: "textarea", showIf: { field: "hasAllergies", equals: "yes" } },
    ],
  },
  {
    id: "medication",
    icon: "Pill",
    fields: [
      { name: "takesMedication", type: "radio", options: ["yes", "no"] },
      { name: "medicationDetails", type: "textarea", showIf: { field: "takesMedication", equals: "yes" } },
    ],
  },
  {
    id: "previousIllnesses",
    icon: "HeartPulse",
    fields: [
      {
        name: "illnessConditions",
        type: "checkboxes",
        options: [
          "diabetes", "hypertension", "asthma", "heartDisease", "cancer",
          "thyroid", "kidneyDisease", "liverDisease", "mentalHealth",
        ],
      },
      { name: "otherIllnesses", type: "textarea" },
    ],
  },
  {
    id: "previousOperations",
    icon: "Scissors",
    fields: [
      { name: "hasOperations", type: "radio", options: ["yes", "no"] },
      { name: "operationDetails", type: "textarea", showIf: { field: "hasOperations", equals: "yes" } },
    ],
  },
  {
    id: "familyHistory",
    icon: "Users",
    fields: [
      {
        name: "familyConditions",
        type: "checkboxes",
        options: ["diabetes", "hypertension", "heartDisease", "cancer", "stroke", "mentalHealth"],
      },
      { name: "familyNotes", type: "textarea" },
    ],
  },
  {
    id: "lifestyle",
    icon: "Leaf",
    fields: [
      { name: "smoking", type: "radio", options: ["never", "former", "occasionally", "regularly"] },
      { name: "alcohol", type: "radio", options: ["never", "occasionally", "weekly", "daily"] },
      { name: "exercise", type: "radio", options: ["none", "rarely", "weekly", "daily"] },
      { name: "dietNotes", type: "textarea" },
    ],
  },
];
