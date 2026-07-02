import { useLanguage } from "@/i18n/LanguageContext";

export function ProgressBar({ current, total }) {
  const { t } = useLanguage();
  const pct = Math.round((current / total) * 100);
  return (
    <div data-testid="progress-bar" className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[#4A5D56]">
          {t("progress", { current, total })}
        </span>
        <span className="text-sm font-semibold text-[#4A7C6B]">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-[#E8ECEB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4A7C6B] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
