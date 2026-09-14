/*
  LanguageSwitcher.jsx
  Sprachumschaltung zur Laufzeit über ein <select>.
  Meldet die gewählte Sprache per onChange an die übergeordnete Komponente (App).
*/
import React from "react";
import { getAvailableLanguages } from "../services/translationService.js";

export function LanguageSwitcher({ language, onChange, t }) {
  const languages = getAvailableLanguages();

  return (
    <div className="lang-switch">
      <label htmlFor="lang-select" style={{ position: "absolute", left: "-9999px" }}>
        {t("ui.language")}
      </label>
      <select
        id="lang-select"
        value={language}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t("ui.language")}
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
