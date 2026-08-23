/*
  translations.js
  Zentrale Uebersetzungsstruktur fuer die Internationalisierung.
  Aufbau: translations[sprachcode][schluessel...] mit verschachtelten Objekten.
  - de und en sind VOLLSTAENDIG uebersetzt (inkl. aller Fragenlabels und Optionen).
  - ar, tr, hi, fr, es enthalten exemplarisch die Kerntexte
    (App-/Willkommenstexte, Abschnittsueberschriften, Navigation, Warnhinweise).
  Fehlende Schluessel werden im translationService automatisch auf en -> de zurueckgefuehrt.

  Neue Sprache hinzufuegen = neuen Sprachcode-Block ergaenzen. Kein UI-Code noetig.
*/

export const translations = {
  // ---------------------------------------------------------------- Deutsch
  de: {
    app: { title: "Digitale Anamnese", tagline: "Vorbereitung vor dem Arztbesuch" },
    ui: {
      language: "Sprache",
      autosaved: "Automatisch gespeichert",
      disclaimerShort:
        "Prototyp einer Bachelorarbeit – kein Medizinprodukt, kein Ersatz für ärztliche Beratung.",
    },
    common: {
      back: "Zurück",
      next: "Weiter",
      save: "Speichern",
      cancel: "Abbrechen",
      confirm: "Bestätigen",
      delete: "Löschen",
      edit: "Bearbeiten",
      yes: "Ja",
      no: "Nein",
      start: "Starten",
    },
    welcome: {
      badge: "Prototyp",
      title: "Digitaler Anamnesebogen",
      subtitle:
        "Erfassen Sie Ihre wichtigsten Gesundheitsangaben in Ruhe auf Ihrem eigenen Gerät – bevor Sie in die Praxis kommen.",
      disclaimerTitle: "Wichtiger Hinweis",
      disclaimerPoints: [
        "Dies ist ein Prototyp im Rahmen einer Bachelorarbeit und kein Medizinprodukt.",
        "Er ersetzt keine ärztliche Beratung oder Diagnose.",
        "Ihre Daten werden ausschließlich lokal auf diesem Gerät gespeichert.",
        "Es erfolgt keine automatische Übertragung an eine Arztpraxis oder Dritte.",
      ],
      start: "Zu den Profilen",
    },
    profile: {
      title: "Profile verwalten",
      subtitle:
        "Legen Sie ein Profil an – z. B. für sich selbst, ein Kind oder ein Familienmitglied. Jedes Profil wird getrennt gespeichert.",
      newNameLabel: "Name des Profils",
      namePlaceholder: "z. B. Anna oder Kind (Max)",
      birthYearLabel: "Geburtsjahr (optional)",
      birthYearPlaceholder: "z. B. 1990",
      create: "Profil erstellen",
      noProfiles: "Noch keine Profile vorhanden. Legen Sie oben ein Profil an.",
      select: "Auswählen",
      selected: "Ausgewählt",
      rename: "Umbenennen",
      renamePrompt: "Neuer Name für das Profil:",
      delete: "Löschen",
      deleteConfirmTitle: "Profil löschen?",
      deleteConfirmText:
        "Das Profil und alle zugehörigen Antworten werden unwiderruflich von diesem Gerät entfernt.",
      continue: "Anamnese starten / fortsetzen",
      dangerTitle: "Alle Daten löschen",
      dangerText: "Entfernt sämtliche Profile und Antworten von diesem Gerät.",
      clearAll: "Alle lokalen Daten löschen",
      clearAllConfirmTitle: "Wirklich alle Daten löschen?",
      clearAllConfirmText:
        "Alle Profile und alle Antworten werden unwiderruflich aus dem lokalen Speicher entfernt.",
    },
    questionnaire: {
      progress: "Abschnitt {current} von {total}",
      toSummary: "Zur Zusammenfassung",
      editingFor: "Profil",
    },
    summary: {
      title: "Zusammenfassung",
      subtitle: "Bitte prüfen Sie Ihre Angaben. Über „Bearbeiten“ gelangen Sie zurück zum Abschnitt.",
      empty: "Keine Angabe",
      edit: "Bearbeiten",
      profileInfo: "Profil",
      lastSaved: "Zuletzt gespeichert",
      backToEdit: "Zurück zur Bearbeitung",
    },
    export: {
      print: "Drucken / als PDF speichern",
      json: "Als JSON exportieren",
    },
    validation: {
      required: "Dieses Feld ist ein Pflichtfeld.",
      invalidNumber: "Bitte eine gültige Zahl eingeben.",
      invalidDate: "Bitte ein gültiges Datum eingeben.",
    },
    sections: {
      stammdaten: "Stammdaten",
      beschwerden: "Aktuelle Beschwerden",
      vorerkrankungen: "Vorerkrankungen",
      medikamente: "Medikamente",
      allergien: "Allergien / Unverträglichkeiten",
      operationen: "Frühere Operationen / Eingriffe",
      lebensstil: "Vegetative Anamnese / Lebensstil",
      sonstiges: "Sonstige Angaben",
    },
    questions: {
      firstName: { label: "Vorname" },
      lastName: { label: "Nachname" },
      birthDate: { label: "Geburtsdatum" },
      gender: {
        label: "Geschlecht",
        options: { female: "Weiblich", male: "Männlich", diverse: "Divers", unspecified: "Keine Angabe" },
      },
      height: { label: "Körpergröße (cm)" },
      weight: { label: "Gewicht (kg)" },

      mainComplaint: { label: "Hauptbeschwerde", help: "Was führt Sie heute in die Praxis?" },
      since: { label: "Seit wann bestehen die Beschwerden?" },
      painLevel: { label: "Schmerzstärke (0-10)" },
      symptoms: { label: "Weitere Symptome" },

      chronicConditions: {
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
      otherIllnesses: { label: "Weitere Erkrankungen" },

      takesMedication: {
        label: "Nehmen Sie regelmäßig Medikamente ein?",
        options: { yes: "Ja", no: "Nein" },
      },
      medicationList: { label: "Welche Medikamente und Dosierung?" },

      hasAllergies: {
        label: "Sind Allergien bekannt?",
        options: { yes: "Ja", no: "Nein", unknown: "Nicht sicher" },
      },
      allergyList: { label: "Welche Allergien / Unverträglichkeiten?" },

      hasOperations: {
        label: "Wurden Sie schon operiert?",
        options: { yes: "Ja", no: "Nein" },
      },
      operationList: { label: "Welche Operationen und wann?" },

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
      sleep: { label: "Schlaf (Stunden / Qualität)" },
      diet: { label: "Ernährung" },

      additionalNotes: { label: "Weitere Anmerkungen (Freitext)" },
    },
  },

  // ---------------------------------------------------------------- English
  en: {
    app: { title: "Digital Anamnesis", tagline: "Preparation before the visit" },
    ui: {
      language: "Language",
      autosaved: "Saved automatically",
      disclaimerShort:
        "Bachelor thesis prototype – not a medical device, not a substitute for medical advice.",
    },
    common: {
      back: "Back",
      next: "Next",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      yes: "Yes",
      no: "No",
      start: "Start",
    },
    welcome: {
      badge: "Prototype",
      title: "Digital Anamnesis Form",
      subtitle:
        "Record your key health information calmly on your own device — before you arrive at the practice.",
      disclaimerTitle: "Important notice",
      disclaimerPoints: [
        "This is a bachelor thesis prototype and not a medical device.",
        "It does not replace medical advice or diagnosis.",
        "Your data is stored only locally on this device.",
        "No automatic transmission to a practice or third parties takes place.",
      ],
      start: "Go to profiles",
    },
    profile: {
      title: "Manage profiles",
      subtitle:
        "Create a profile — e.g. for yourself, a child or a family member. Each profile is stored separately.",
      newNameLabel: "Profile name",
      namePlaceholder: "e.g. Anna or Child (Max)",
      birthYearLabel: "Year of birth (optional)",
      birthYearPlaceholder: "e.g. 1990",
      create: "Create profile",
      noProfiles: "No profiles yet. Create one above.",
      select: "Select",
      selected: "Selected",
      rename: "Rename",
      renamePrompt: "New name for the profile:",
      delete: "Delete",
      deleteConfirmTitle: "Delete profile?",
      deleteConfirmText:
        "The profile and all its answers will be permanently removed from this device.",
      continue: "Start / continue anamnesis",
      dangerTitle: "Delete all data",
      dangerText: "Removes all profiles and answers from this device.",
      clearAll: "Delete all local data",
      clearAllConfirmTitle: "Really delete all data?",
      clearAllConfirmText:
        "All profiles and all answers will be permanently removed from local storage.",
    },
    questionnaire: {
      progress: "Section {current} of {total}",
      toSummary: "Go to summary",
      editingFor: "Profile",
    },
    summary: {
      title: "Summary",
      subtitle: "Please review your entries. Use “Edit” to jump back to a section.",
      empty: "Not provided",
      edit: "Edit",
      profileInfo: "Profile",
      lastSaved: "Last saved",
      backToEdit: "Back to editing",
    },
    export: {
      print: "Print / save as PDF",
      json: "Export as JSON",
    },
    validation: {
      required: "This field is required.",
      invalidNumber: "Please enter a valid number.",
      invalidDate: "Please enter a valid date.",
    },
    sections: {
      stammdaten: "Personal data",
      beschwerden: "Current complaints",
      vorerkrankungen: "Previous illnesses",
      medikamente: "Medication",
      allergien: "Allergies / intolerances",
      operationen: "Previous operations",
      lebensstil: "Lifestyle / vegetative history",
      sonstiges: "Other information",
    },
    questions: {
      firstName: { label: "First name" },
      lastName: { label: "Last name" },
      birthDate: { label: "Date of birth" },
      gender: {
        label: "Sex",
        options: { female: "Female", male: "Male", diverse: "Diverse", unspecified: "Prefer not to say" },
      },
      height: { label: "Height (cm)" },
      weight: { label: "Weight (kg)" },

      mainComplaint: { label: "Main complaint", help: "What brings you in today?" },
      since: { label: "Since when?" },
      painLevel: { label: "Pain level (0-10)" },
      symptoms: { label: "Additional symptoms" },

      chronicConditions: {
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
      otherIllnesses: { label: "Other conditions" },

      takesMedication: {
        label: "Do you take medication regularly?",
        options: { yes: "Yes", no: "No" },
      },
      medicationList: { label: "Which medication and dosage?" },

      hasAllergies: {
        label: "Are any allergies known?",
        options: { yes: "Yes", no: "No", unknown: "Not sure" },
      },
      allergyList: { label: "Which allergies / intolerances?" },

      hasOperations: {
        label: "Have you had any operations?",
        options: { yes: "Yes", no: "No" },
      },
      operationList: { label: "Which operations and when?" },

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
      sleep: { label: "Sleep (hours / quality)" },
      diet: { label: "Diet" },

      additionalNotes: { label: "Additional notes (free text)" },
    },
  },

  // ------------------------------------------------- Kerntexte: Arabisch (RTL)
  ar: {
    app: { title: "سجل التاريخ المرضي الرقمي", tagline: "التحضير قبل زيارة الطبيب" },
    ui: {
      language: "اللغة",
      autosaved: "تم الحفظ تلقائياً",
      disclaimerShort: "نموذج أولي لأطروحة بكالوريوس – ليس جهازاً طبياً ولا بديلاً عن الاستشارة الطبية.",
    },
    common: { back: "رجوع", next: "التالي", start: "ابدأ", cancel: "إلغاء", confirm: "تأكيد", delete: "حذف", edit: "تعديل", yes: "نعم", no: "لا", save: "حفظ" },
    welcome: {
      badge: "نموذج أولي",
      title: "استمارة التاريخ المرضي الرقمية",
      subtitle: "سجّل معلوماتك الصحية بهدوء على جهازك قبل الحضور إلى العيادة.",
      disclaimerTitle: "ملاحظة هامة",
      disclaimerPoints: [
        "هذا نموذج أولي ضمن أطروحة بكالوريوس وليس جهازاً طبياً.",
        "لا يغني عن الاستشارة أو التشخيص الطبي.",
        "تُخزَّن بياناتك محلياً على هذا الجهاز فقط.",
        "لا يتم إرسال أي بيانات تلقائياً إلى العيادة أو أطراف أخرى.",
      ],
      start: "إلى الملفات الشخصية",
    },
    questionnaire: { progress: "القسم {current} من {total}", toSummary: "إلى الملخص", editingFor: "الملف" },
    sections: {
      stammdaten: "البيانات الشخصية",
      beschwerden: "الشكاوى الحالية",
      vorerkrankungen: "الأمراض السابقة",
      medikamente: "الأدوية",
      allergien: "الحساسية",
      operationen: "العمليات السابقة",
      lebensstil: "نمط الحياة",
      sonstiges: "معلومات أخرى",
    },
  },

  // ------------------------------------------------- Kerntexte: Tuerkisch
  tr: {
    app: { title: "Dijital Anamnez", tagline: "Muayeneden önce hazırlık" },
    ui: {
      language: "Dil",
      autosaved: "Otomatik kaydedildi",
      disclaimerShort: "Bir bitirme tezi prototipi – tıbbi cihaz değildir, tıbbi tavsiye yerine geçmez.",
    },
    common: { back: "Geri", next: "İleri", start: "Başla", cancel: "İptal", confirm: "Onayla", delete: "Sil", edit: "Düzenle", yes: "Evet", no: "Hayır", save: "Kaydet" },
    welcome: {
      badge: "Prototip",
      title: "Dijital Anamnez Formu",
      subtitle: "Sağlık bilgilerinizi muayeneye gelmeden önce kendi cihazınızda sakin bir şekilde kaydedin.",
      disclaimerTitle: "Önemli not",
      disclaimerPoints: [
        "Bu, bir bitirme tezi kapsamında bir prototiptir ve tıbbi cihaz değildir.",
        "Tıbbi tavsiye veya teşhisin yerini almaz.",
        "Verileriniz yalnızca bu cihazda yerel olarak saklanır.",
        "Muayenehaneye veya üçüncü taraflara otomatik veri aktarımı yapılmaz.",
      ],
      start: "Profillere git",
    },
    questionnaire: { progress: "Bölüm {current} / {total}", toSummary: "Özete git", editingFor: "Profil" },
    sections: {
      stammdaten: "Kişisel bilgiler",
      beschwerden: "Güncel şikayetler",
      vorerkrankungen: "Geçmiş hastalıklar",
      medikamente: "İlaçlar",
      allergien: "Alerjiler",
      operationen: "Geçmiş ameliyatlar",
      lebensstil: "Yaşam tarzı",
      sonstiges: "Diğer bilgiler",
    },
  },

  // ------------------------------------------------- Kerntexte: Hindi
  hi: {
    app: { title: "डिजिटल एनामनेसिस", tagline: "डॉक्टर के पास जाने से पहले तैयारी" },
    ui: {
      language: "भाषा",
      autosaved: "स्वतः सहेजा गया",
      disclaimerShort: "एक स्नातक थीसिस प्रोटोटाइप – यह चिकित्सा उपकरण नहीं है और चिकित्सकीय सलाह का विकल्प नहीं है।",
    },
    common: { back: "पीछे", next: "आगे", start: "शुरू करें", cancel: "रद्द करें", confirm: "पुष्टि करें", delete: "हटाएँ", edit: "संपादित करें", yes: "हाँ", no: "नहीं", save: "सहेजें" },
    welcome: {
      badge: "प्रोटोटाइप",
      title: "डिजिटल एनामनेसिस फॉर्म",
      subtitle: "क्लिनिक आने से पहले अपने डिवाइस पर आराम से अपनी स्वास्थ्य जानकारी दर्ज करें।",
      disclaimerTitle: "महत्वपूर्ण सूचना",
      disclaimerPoints: [
        "यह एक स्नातक थीसिस प्रोटोटाइप है, चिकित्सा उपकरण नहीं।",
        "यह चिकित्सकीय सलाह या निदान का विकल्प नहीं है।",
        "आपका डेटा केवल इसी डिवाइस पर स्थानीय रूप से संग्रहीत होता है।",
        "किसी क्लिनिक या तीसरे पक्ष को स्वतः कोई डेटा नहीं भेजा जाता।",
      ],
      start: "प्रोफ़ाइल पर जाएँ",
    },
    questionnaire: { progress: "अनुभाग {current} / {total}", toSummary: "सारांश पर जाएँ", editingFor: "प्रोफ़ाइल" },
    sections: {
      stammdaten: "व्यक्तिगत जानकारी",
      beschwerden: "वर्तमान शिकायतें",
      vorerkrankungen: "पिछली बीमारियाँ",
      medikamente: "दवाइयाँ",
      allergien: "एलर्जी",
      operationen: "पिछले ऑपरेशन",
      lebensstil: "जीवनशैली",
      sonstiges: "अन्य जानकारी",
    },
  },

  // ------------------------------------------------- Kerntexte: Franzoesisch
  fr: {
    app: { title: "Anamnèse numérique", tagline: "Préparation avant la consultation" },
    ui: {
      language: "Langue",
      autosaved: "Enregistré automatiquement",
      disclaimerShort: "Prototype de mémoire de licence – pas un dispositif médical, ne remplace pas un avis médical.",
    },
    common: { back: "Retour", next: "Suivant", start: "Commencer", cancel: "Annuler", confirm: "Confirmer", delete: "Supprimer", edit: "Modifier", yes: "Oui", no: "Non", save: "Enregistrer" },
    welcome: {
      badge: "Prototype",
      title: "Formulaire d'anamnèse numérique",
      subtitle: "Saisissez calmement vos informations de santé sur votre appareil avant de venir au cabinet.",
      disclaimerTitle: "Note importante",
      disclaimerPoints: [
        "Ceci est un prototype de mémoire de licence et non un dispositif médical.",
        "Il ne remplace pas un avis médical ou un diagnostic.",
        "Vos données sont stockées uniquement localement sur cet appareil.",
        "Aucune transmission automatique vers un cabinet ou des tiers n'a lieu.",
      ],
      start: "Aller aux profils",
    },
    questionnaire: { progress: "Section {current} sur {total}", toSummary: "Voir le résumé", editingFor: "Profil" },
    sections: {
      stammdaten: "Données personnelles",
      beschwerden: "Plaintes actuelles",
      vorerkrankungen: "Antécédents médicaux",
      medikamente: "Médicaments",
      allergien: "Allergies",
      operationen: "Opérations antérieures",
      lebensstil: "Mode de vie",
      sonstiges: "Autres informations",
    },
  },

  // ------------------------------------------------- Kerntexte: Spanisch
  es: {
    app: { title: "Anamnesis digital", tagline: "Preparación antes de la consulta" },
    ui: {
      language: "Idioma",
      autosaved: "Guardado automáticamente",
      disclaimerShort: "Prototipo de tesis de grado – no es un producto sanitario ni sustituye el consejo médico.",
    },
    common: { back: "Atrás", next: "Siguiente", start: "Empezar", cancel: "Cancelar", confirm: "Confirmar", delete: "Eliminar", edit: "Editar", yes: "Sí", no: "No", save: "Guardar" },
    welcome: {
      badge: "Prototipo",
      title: "Formulario de anamnesis digital",
      subtitle: "Registre con calma su información de salud en su propio dispositivo antes de acudir a la consulta.",
      disclaimerTitle: "Aviso importante",
      disclaimerPoints: [
        "Este es un prototipo de tesis de grado y no un producto sanitario.",
        "No sustituye el consejo médico ni el diagnóstico.",
        "Sus datos se almacenan únicamente de forma local en este dispositivo.",
        "No se realiza ninguna transmisión automática a una consulta o a terceros.",
      ],
      start: "Ir a los perfiles",
    },
    questionnaire: { progress: "Sección {current} de {total}", toSummary: "Ver resumen", editingFor: "Perfil" },
    sections: {
      stammdaten: "Datos personales",
      beschwerden: "Molestias actuales",
      vorerkrankungen: "Enfermedades previas",
      medikamente: "Medicación",
      allergien: "Alergias",
      operationen: "Operaciones previas",
      lebensstil: "Estilo de vida",
      sonstiges: "Otra información",
    },
  },
};

// Liste der verfuegbaren Sprachen (Code + native Bezeichnung + Textrichtung).
export const availableLanguages = [
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "en", label: "English", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "tr", label: "Türkçe", dir: "ltr" },
  { code: "hi", label: "हिन्दी", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
];
