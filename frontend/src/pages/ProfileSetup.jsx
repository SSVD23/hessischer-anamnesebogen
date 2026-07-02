import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAnamnesis } from "@/context/AnamnesisContext";
import { AppHeader } from "@/components/AppHeader";

const RELATIONS = ["self", "child", "parent", "other"];
const inputBase =
  "w-full min-h-[56px] rounded-xl border border-[#D1DBD7] bg-[#F5F7F6] px-4 text-base text-[#1C2522] placeholder:text-[#4A5D56]/50 focus:border-[#4A7C6B] focus:outline-none focus:ring-1 focus:ring-[#4A7C6B] transition-shadow";

export default function ProfileSetup() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data, setProfile } = useAnamnesis();
  const profile = data.profile;
  const [errors, setErrors] = useState({});

  const update = (key, val) => setProfile({ [key]: val });

  const handleNext = () => {
    const errs = {};
    if (!profile.firstName?.trim()) errs.firstName = t("profile.required");
    if (!profile.dateOfBirth) errs.dateOfBirth = t("profile.required");
    setErrors(errs);
    if (Object.keys(errs).length === 0) navigate("/questionnaire");
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12"
      >
        <button
          data-testid="back-button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#4A5D56] hover:text-[#4A7C6B] transition-colors"
        >
          <ArrowLeft size={16} /> {t("nav.back")}
        </button>

        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C2522]">
          {t("profile.title")}
        </h1>
        <p className="mt-2 text-base text-[#4A5D56]">{t("profile.subtitle")}</p>

        <div className="mt-8 rounded-3xl border border-[#D1DBD7] bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(28,37,34,0.04)] space-y-6">
          <div className="space-y-2.5">
            <label className="block text-base font-semibold text-[#1C2522]">
              {t("profile.relationLabel")}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {RELATIONS.map((r) => {
                const active = profile.relation === r;
                return (
                  <button
                    key={r}
                    type="button"
                    data-testid={`relation-${r}`}
                    onClick={() => update("relation", r)}
                    className={`min-h-[52px] rounded-xl border px-3 text-sm sm:text-base font-medium transition-colors ${
                      active
                        ? "border-[#4A7C6B] bg-[#4A7C6B]/10 text-[#1C2522]"
                        : "border-[#D1DBD7] bg-white text-[#4A5D56] hover:border-[#4A7C6B]/50"
                    }`}
                  >
                    {t(`profile.relations.${r}`)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="block text-base font-semibold text-[#1C2522]">
              {t("profile.firstName")} <span className="text-[#E15241]">*</span>
            </label>
            <input
              data-testid="profile-first-name"
              value={profile.firstName}
              placeholder={t("profile.firstNamePlaceholder")}
              onChange={(e) => update("firstName", e.target.value)}
              className={inputBase}
            />
            {errors.firstName && (
              <p data-testid="error-first-name" className="text-sm font-medium text-[#E15241]">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <label className="block text-base font-semibold text-[#1C2522]">
              {t("profile.lastName")}
            </label>
            <input
              data-testid="profile-last-name"
              value={profile.lastName}
              placeholder={t("profile.lastNamePlaceholder")}
              onChange={(e) => update("lastName", e.target.value)}
              className={inputBase}
            />
          </div>

          <div className="space-y-2.5">
            <label className="block text-base font-semibold text-[#1C2522]">
              {t("profile.dateOfBirth")} <span className="text-[#E15241]">*</span>
            </label>
            <input
              data-testid="profile-dob"
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => update("dateOfBirth", e.target.value)}
              className={inputBase}
            />
            {errors.dateOfBirth && (
              <p data-testid="error-dob" className="text-sm font-medium text-[#E15241]">
                {errors.dateOfBirth}
              </p>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#4A5D56] opacity-80">{t("profile.note")}</p>

        <button
          data-testid="profile-next-button"
          onClick={handleNext}
          className="mt-8 h-14 w-full rounded-2xl bg-[#4A7C6B] hover:bg-[#3A6355] text-white font-medium text-lg transition-colors flex items-center justify-center gap-2"
        >
          {t("nav.next")}
          <ArrowRight size={20} />
        </button>
      </motion.main>
    </div>
  );
}
