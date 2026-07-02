import { Info } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function PrototypeNotice({ className = "" }) {
  const { t } = useLanguage();
  return (
    <div
      data-testid="prototype-notice"
      className={`flex items-start gap-3 rounded-2xl border border-[#D1DBD7] bg-[#E8ECEB]/60 px-4 py-3 ${className}`}
    >
      <Info size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#4A7C6B]" />
      <p className="text-sm leading-relaxed text-[#4A5D56]">{t("disclaimer")}</p>
    </div>
  );
}
