import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, WifiOff, ListChecks, Save, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAnamnesis } from "@/context/AnamnesisContext";
import { AppHeader } from "@/components/AppHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";

const features = [
  { icon: WifiOff, key: "feature1" },
  { icon: ListChecks, key: "feature2" },
  { icon: Save, key: "feature3" },
];

export default function Landing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { hasSavedData, reset } = useAnamnesis();

  const startNew = () => {
    reset();
    navigate("/profile");
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12"
      >
        <span className="inline-block rounded-full bg-[#E8ECEB] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4A7C6B]">
          {t("landing.badge")}
        </span>
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2522]">
          {t("landing.title")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#4A5D56]">{t("landing.subtitle")}</p>

        <div
          data-testid="privacy-card"
          className="mt-8 flex items-start gap-4 rounded-3xl border border-[#D1DBD7] bg-white p-6 shadow-[0_4px_24px_rgba(28,37,34,0.04)]"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4A7C6B]/10 text-[#4A7C6B]">
            <ShieldCheck size={22} strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-heading text-lg font-semibold text-[#1C2522]">
              {t("landing.privacyTitle")}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[#4A5D56]">{t("landing.privacyText")}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {features.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="rounded-2xl border border-[#D1DBD7] bg-white p-5 shadow-[0_4px_24px_rgba(28,37,34,0.03)]"
            >
              <Icon size={22} strokeWidth={1.75} className="text-[#4A7C6B]" />
              <h3 className="mt-3 font-heading text-base font-semibold text-[#1C2522]">
                {t(`landing.${key}Title`)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#4A5D56]">{t(`landing.${key}Text`)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {hasSavedData && (
            <button
              data-testid="continue-button"
              onClick={() => navigate("/profile")}
              className="h-14 w-full rounded-2xl bg-[#4A7C6B] hover:bg-[#3A6355] text-white font-medium text-lg transition-colors flex items-center justify-center gap-2"
            >
              {t("landing.continueButton")}
              <ArrowRight size={20} />
            </button>
          )}
          <button
            data-testid="start-button"
            onClick={startNew}
            className={`h-14 w-full rounded-2xl font-medium text-lg transition-colors flex items-center justify-center gap-2 ${
              hasSavedData
                ? "bg-[#E8ECEB] hover:bg-[#D1DBD7] text-[#1C2522]"
                : "bg-[#4A7C6B] hover:bg-[#3A6355] text-white"
            }`}
          >
            {t("landing.startButton")}
            {!hasSavedData && <ArrowRight size={20} />}
          </button>
        </div>

        <PrototypeNotice className="mt-8" />
      </motion.main>
    </div>
  );
}
