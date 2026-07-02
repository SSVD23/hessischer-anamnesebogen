// Central translation dictionary. Add a new language by adding a top-level key.
export const translations = {
  de: {
    appName: "Digitale Anamnese",
    appTagline: "Ihre Krankengeschichte, vorbereitet vor dem Arztbesuch",
    languageName: "Deutsch",

    nav: {
      back: "Zurück",
      next: "Weiter",
      start: "Anamnese starten",
      continue: "Fortsetzen",
      edit: "Bearbeiten",
      toReview: "Zur Übersicht",
      finish: "Abschließen",
    },

    landing: {
      badge: "Prototyp",
      title: "Digitale Anamnese für die Hausarztpraxis",
      subtitle:
        "Erfassen Sie Ihre wichtigsten Gesundheitsinformationen in Ruhe – auf Ihrem eigenen Gerät, bevor Sie in die Praxis kommen.",
      privacyTitle: "Ihre Daten bleiben bei Ihnen",
      privacyText:
        "Alle Angaben werden ausschließlich lokal in diesem Browser gespeichert. Es werden keine Daten an einen Server gesendet.",
      feature1Title: "Offline & lokal",
      feature1Text: "Funktioniert ohne Internet, Speicherung nur auf diesem Gerät.",
      feature2Title: "Schritt für Schritt",
      feature2Text: "Klar strukturierte Fragen in verständlicher Sprache.",
      feature3Title: "Jederzeit fortsetzen",
      feature3Text: "Ihre Eingaben werden automatisch zwischengespeichert.",
      startButton: "Neue Anamnese starten",
      continueButton: "Gespeicherte Anamnese fortsetzen",
    },

    disclaimer:
      "Dies ist ein Prototyp für Demonstrationszwecke und ersetzt keine ärztliche Beratung oder Diagnose.",

    profile: {
      title: "Profil anlegen",
      subtitle: "Für wen wird diese Anamnese ausgefüllt?",
      relationLabel: "Beziehung",
      relations: {
        self: "Für mich selbst",
        child: "Für mein Kind",
        parent: "Für einen Elternteil",
        other: "Für eine andere Person",
      },
      firstName: "Vorname",
      lastName: "Nachname",
      dateOfBirth: "Geburtsdatum",
      firstNamePlaceholder: "z. B. Anna",
      lastNamePlaceholder: "z. B. Müller",
      required: "Bitte ausfüllen",
      note: "Es wird zunächst ein Profil unterstützt. Weitere Familienprofile sind in einer späteren Version geplant.",
    },

    progress: "Abschnitt {current} von {total}",

    sections: {
      personalBasics: {
        title: "Persönliche Angaben",
        description: "Grundlegende Informationen zu Ihrer Person.",
      },
      currentComplaints: {
        title: "Aktuelle Beschwerden",
        description: "Was führt Sie heute in die Praxis?",
      },
      allergies: {
        title: "Allergien",
        description: "Bekannte Allergien und Unverträglichkeiten.",
      },
      medication: {
        title: "Medikamente",
        description: "Medikamente, die Sie regelmäßig einnehmen.",
      },
      previousIllnesses: {
        title: "Vorerkrankungen",
        description: "Bestehende oder frühere Erkrankungen.",
      },
      previousOperations: {
        title: "Frühere Operationen",
        description: "Operationen und Eingriffe in der Vergangenheit.",
      },
      familyHistory: {
        title: "Familienanamnese",
        description: "Erkrankungen, die in der Familie vorkommen.",
      },
      lifestyle: {
        title: "Lebensstil & Gewohnheiten",
        description: "Angaben zu Ihrem Alltag und Ihren Gewohnheiten.",
      },
    },

    fields: {
      gender: {
        label: "Geschlecht",
        options: { female: "Weiblich", male: "Männlich", diverse: "Divers", unspecified: "Keine Angabe" },
      },
      height: { label: "Körpergröße (cm)", placeholder: "z. B. 175" },
      weight: { label: "Gewicht (kg)", placeholder: "z. B. 70" },
      bloodType: {
        label: "Blutgruppe",
        options: {
          unknown: "Unbekannt",
          "A+": "A+", "A-": "A−", "B+": "B+", "B-": "B−",
          "AB+": "AB+", "AB-": "AB−", "0+": "0+", "0-": "0−",
        },
      },
      occupation: { label: "Beruf", placeholder: "z. B. Lehrerin" },

      mainComplaint: {
        label: "Hauptbeschwerde",
        placeholder: "Beschreiben Sie kurz, was Sie beschäftigt …",
      },
      since: { label: "Seit wann bestehen die Beschwerden?", placeholder: "z. B. seit 3 Tagen" },
      painLevel: { label: "Schmerzstärke (0 = keine, 10 = stärkste)" },
      additionalSymptoms: {
        label: "Weitere Symptome",
        placeholder: "z. B. Fieber, Übelkeit, Müdigkeit …",
      },

      hasAllergies: {
        label: "Sind Allergien bekannt?",
        options: { yes: "Ja", no: "Nein", unknown: "Nicht sicher" },
      },
      allergyDetails: {
        label: "Welche Allergien?",
        placeholder: "z. B. Penicillin, Pollen, Nüsse …",
      },

      takesMedication: {
        label: "Nehmen Sie regelmäßig Medikamente ein?",
        options: { yes: "Ja", no: "Nein" },
      },
      medicationDetails: {
        label: "Welche Medikamente und Dosierung?",
        placeholder: "z. B. Ramipril 5 mg, morgens …",
      },

      illnessConditions: {
        label: "Bestehende oder frühere Erkrankungen",
        options: {
          diabetes: "Diabetes",
          hypertension: "Bluthochdruck",
          asthma: "Asthma",
          heartDisease: "Herzerkrankung",
          cancer: "Krebserkrankung",
          thyroid: "Schilddrüse",
          kidneyDisease: "Nierenerkrankung",
          liverDisease: "Lebererkrankung",
          mentalHealth: "Psychische Erkrankung",
        },
      },
      otherIllnesses: {
        label: "Weitere Erkrankungen",
        placeholder: "Weitere relevante Erkrankungen …",
      },

      hasOperations: {
        label: "Wurden Sie schon einmal operiert?",
        options: { yes: "Ja", no: "Nein" },
      },
      operationDetails: {
        label: "Welche Operationen und wann?",
        placeholder: "z. B. Blinddarm-OP 2015 …",
      },

      familyConditions: {
        label: "Erkrankungen in der Familie",
        options: {
          diabetes: "Diabetes",
          hypertension: "Bluthochdruck",
          heartDisease: "Herzerkrankung",
          cancer: "Krebserkrankung",
          stroke: "Schlaganfall",
          mentalHealth: "Psychische Erkrankung",
        },
      },
      familyNotes: {
        label: "Weitere Anmerkungen zur Familie",
        placeholder: "z. B. Vater: Herzinfarkt mit 60 …",
      },

      smoking: {
        label: "Rauchen",
        options: { never: "Nie", former: "Früher", occasionally: "Gelegentlich", regularly: "Regelmäßig" },
      },
      alcohol: {
        label: "Alkohol",
        options: { never: "Nie", occasionally: "Gelegentlich", weekly: "Wöchentlich", daily: "Täglich" },
      },
      exercise: {
        label: "Körperliche Aktivität",
        options: { none: "Keine", rarely: "Selten", weekly: "Wöchentlich", daily: "Täglich" },
      },
      dietNotes: {
        label: "Ernährung & sonstige Anmerkungen",
        placeholder: "z. B. vegetarisch, wenig Zucker …",
      },
    },

    review: {
      title: "Übersicht Ihrer Angaben",
      subtitle: "Bitte prüfen Sie Ihre Eingaben, bevor Sie abschließen.",
      notFilled: "Keine Angabe",
      profileHeading: "Profil",
      submit: "Anamnese abschließen",
    },

    summary: {
      title: "Anamnese abgeschlossen",
      thankYou:
        "Vielen Dank. Ihre Angaben wurden auf diesem Gerät gespeichert und können in der Praxis besprochen werden.",
      shareTitle: "Mit der Praxis teilen",
      shareText:
        "In dieser Prototyp-Version können Sie die Zusammenfassung ausdrucken oder als Datei speichern. Ein echter Versand an die Praxis ist ein Konzept für spätere Versionen.",
      printButton: "Drucken / als PDF speichern",
      downloadButton: "Als JSON herunterladen",
      shareMock: "An Praxis senden (Demo)",
      shareMockToast: "Demo: In einer echten Version würde die Zusammenfassung an Ihre Praxis übermittelt.",
      startOver: "Neue Anamnese beginnen (Daten löschen)",
      confirmDeleteTitle: "Alle Daten löschen?",
      confirmDeleteText:
        "Dadurch werden alle lokal gespeicherten Angaben unwiderruflich von diesem Gerät entfernt.",
      confirmDeleteCancel: "Abbrechen",
      confirmDeleteConfirm: "Löschen",
      documentTitle: "Anamnese-Zusammenfassung",
      generatedOn: "Erstellt am",
    },

    common: {
      yes: "Ja",
      no: "Nein",
      autosaved: "Automatisch gespeichert",
    },
  },

  en: {
    appName: "Digital Anamnesis",
    appTagline: "Your medical history, prepared before the visit",
    languageName: "English",

    nav: {
      back: "Back",
      next: "Next",
      start: "Start anamnesis",
      continue: "Continue",
      edit: "Edit",
      toReview: "Review",
      finish: "Finish",
    },

    landing: {
      badge: "Prototype",
      title: "Digital Anamnesis for General Practice",
      subtitle:
        "Record your key health information calmly — on your own device, before you arrive at the practice.",
      privacyTitle: "Your data stays with you",
      privacyText:
        "All entries are stored only locally in this browser. No data is sent to any server.",
      feature1Title: "Offline & local",
      feature1Text: "Works without internet, stored only on this device.",
      feature2Title: "Step by step",
      feature2Text: "Clearly structured questions in plain language.",
      feature3Title: "Continue anytime",
      feature3Text: "Your entries are saved automatically.",
      startButton: "Start new anamnesis",
      continueButton: "Continue saved anamnesis",
    },

    disclaimer:
      "This is a prototype for demonstration purposes and does not replace medical advice or diagnosis.",

    profile: {
      title: "Create profile",
      subtitle: "Who is this anamnesis for?",
      relationLabel: "Relationship",
      relations: {
        self: "For myself",
        child: "For my child",
        parent: "For a parent",
        other: "For someone else",
      },
      firstName: "First name",
      lastName: "Last name",
      dateOfBirth: "Date of birth",
      firstNamePlaceholder: "e.g. Anna",
      lastNamePlaceholder: "e.g. Miller",
      required: "Please fill in",
      note: "One profile is supported for now. Additional family profiles are planned for a later version.",
    },

    progress: "Section {current} of {total}",

    sections: {
      personalBasics: { title: "Personal basics", description: "Basic information about you." },
      currentComplaints: { title: "Current complaints", description: "What brings you in today?" },
      allergies: { title: "Allergies", description: "Known allergies and intolerances." },
      medication: { title: "Medication", description: "Medication you take regularly." },
      previousIllnesses: { title: "Previous illnesses", description: "Existing or past conditions." },
      previousOperations: { title: "Previous operations", description: "Past surgeries and procedures." },
      familyHistory: { title: "Family history", description: "Conditions that run in the family." },
      lifestyle: { title: "Lifestyle & habits", description: "Details about your daily life and habits." },
    },

    fields: {
      gender: {
        label: "Sex",
        options: { female: "Female", male: "Male", diverse: "Diverse", unspecified: "Prefer not to say" },
      },
      height: { label: "Height (cm)", placeholder: "e.g. 175" },
      weight: { label: "Weight (kg)", placeholder: "e.g. 70" },
      bloodType: {
        label: "Blood type",
        options: {
          unknown: "Unknown",
          "A+": "A+", "A-": "A−", "B+": "B+", "B-": "B−",
          "AB+": "AB+", "AB-": "AB−", "0+": "0+", "0-": "0−",
        },
      },
      occupation: { label: "Occupation", placeholder: "e.g. Teacher" },

      mainComplaint: { label: "Main complaint", placeholder: "Briefly describe what is bothering you …" },
      since: { label: "Since when?", placeholder: "e.g. for 3 days" },
      painLevel: { label: "Pain level (0 = none, 10 = worst)" },
      additionalSymptoms: { label: "Additional symptoms", placeholder: "e.g. fever, nausea, fatigue …" },

      hasAllergies: {
        label: "Are any allergies known?",
        options: { yes: "Yes", no: "No", unknown: "Not sure" },
      },
      allergyDetails: { label: "Which allergies?", placeholder: "e.g. penicillin, pollen, nuts …" },

      takesMedication: {
        label: "Do you take medication regularly?",
        options: { yes: "Yes", no: "No" },
      },
      medicationDetails: { label: "Which medication and dosage?", placeholder: "e.g. Ramipril 5 mg, mornings …" },

      illnessConditions: {
        label: "Existing or past conditions",
        options: {
          diabetes: "Diabetes",
          hypertension: "High blood pressure",
          asthma: "Asthma",
          heartDisease: "Heart disease",
          cancer: "Cancer",
          thyroid: "Thyroid",
          kidneyDisease: "Kidney disease",
          liverDisease: "Liver disease",
          mentalHealth: "Mental health",
        },
      },
      otherIllnesses: { label: "Other conditions", placeholder: "Other relevant conditions …" },

      hasOperations: {
        label: "Have you had any operations?",
        options: { yes: "Yes", no: "No" },
      },
      operationDetails: { label: "Which operations and when?", placeholder: "e.g. appendix surgery 2015 …" },

      familyConditions: {
        label: "Conditions in the family",
        options: {
          diabetes: "Diabetes",
          hypertension: "High blood pressure",
          heartDisease: "Heart disease",
          cancer: "Cancer",
          stroke: "Stroke",
          mentalHealth: "Mental health",
        },
      },
      familyNotes: { label: "Additional family notes", placeholder: "e.g. father: heart attack at 60 …" },

      smoking: {
        label: "Smoking",
        options: { never: "Never", former: "Former", occasionally: "Occasionally", regularly: "Regularly" },
      },
      alcohol: {
        label: "Alcohol",
        options: { never: "Never", occasionally: "Occasionally", weekly: "Weekly", daily: "Daily" },
      },
      exercise: {
        label: "Physical activity",
        options: { none: "None", rarely: "Rarely", weekly: "Weekly", daily: "Daily" },
      },
      dietNotes: { label: "Diet & other notes", placeholder: "e.g. vegetarian, low sugar …" },
    },

    review: {
      title: "Review your entries",
      subtitle: "Please check your answers before finishing.",
      notFilled: "Not provided",
      profileHeading: "Profile",
      submit: "Finish anamnesis",
    },

    summary: {
      title: "Anamnesis complete",
      thankYou:
        "Thank you. Your entries have been saved on this device and can be discussed at the practice.",
      shareTitle: "Share with the practice",
      shareText:
        "In this prototype you can print the summary or save it as a file. Real transmission to the practice is a concept for later versions.",
      printButton: "Print / save as PDF",
      downloadButton: "Download as JSON",
      shareMock: "Send to practice (demo)",
      shareMockToast: "Demo: in a real version the summary would be sent to your practice.",
      startOver: "Start new anamnesis (delete data)",
      confirmDeleteTitle: "Delete all data?",
      confirmDeleteText:
        "This will permanently remove all locally stored entries from this device.",
      confirmDeleteCancel: "Cancel",
      confirmDeleteConfirm: "Delete",
      documentTitle: "Anamnesis summary",
      generatedOn: "Generated on",
    },

    common: {
      yes: "Yes",
      no: "No",
      autosaved: "Saved automatically",
    },
  },
};
