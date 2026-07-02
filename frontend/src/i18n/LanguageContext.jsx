import { createContext, useContext, useCallback } from "react";
import { translations } from "@/i18n/translations";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const LanguageContext = createContext(null);

export const AVAILABLE_LANGUAGES = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
];

function resolve(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useLocalStorage("anamnesis.lang", "de");

  const t = useCallback(
    (key, vars) => {
      const dict = translations[lang] || translations.de;
      let value = resolve(dict, key);
      if (value === undefined) value = resolve(translations.de, key);
      if (typeof value !== "string") return value !== undefined ? value : key;
      if (vars) {
        Object.keys(vars).forEach((k) => {
          value = value.replace(new RegExp(`{${k}}`, "g"), vars[k]);
        });
      }
      return value;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
