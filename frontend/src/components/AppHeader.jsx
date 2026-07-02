import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function AppHeader() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <header className="no-print sticky top-0 z-30 border-b border-[#D1DBD7] bg-[#F5F7F6]/90 backdrop-blur-md">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        <button
          data-testid="header-home-button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 group"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4A7C6B] text-white">
            <Activity size={20} strokeWidth={1.75} />
          </span>
          <span className="font-heading font-bold text-[#1C2522] tracking-tight group-hover:text-[#4A7C6B] transition-colors">
            {t("appName")}
          </span>
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
