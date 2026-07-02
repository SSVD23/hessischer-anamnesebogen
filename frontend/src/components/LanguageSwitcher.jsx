import { useLanguage, AVAILABLE_LANGUAGES } from "@/i18n/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div
      data-testid="language-switcher"
      className="inline-flex items-center rounded-full border border-[#D1DBD7] bg-white p-1"
    >
      {AVAILABLE_LANGUAGES.map((l) => (
        <button
          key={l.code}
          data-testid={`lang-btn-${l.code}`}
          onClick={() => setLang(l.code)}
          className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors ${
            lang === l.code ? "bg-[#4A7C6B] text-white" : "text-[#4A5D56] hover:bg-[#E8ECEB]"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
