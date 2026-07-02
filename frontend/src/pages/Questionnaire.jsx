import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAnamnesis } from "@/context/AnamnesisContext";
import { AppHeader } from "@/components/AppHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { FormField } from "@/components/FormField";
import { SECTIONS } from "@/data/schema";

export default function Questionnaire() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data, setAnswer, setCurrentStep } = useAnamnesis();
  const [step, setStep] = useState(Math.min(data.currentStep || 0, SECTIONS.length - 1));
  const [errors, setErrors] = useState({});

  const section = SECTIONS[step];
  const total = SECTIONS.length;
  const sectionAnswers = data.answers[section.id] || {};

  useEffect(() => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, setCurrentStep]);

  const isVisible = (field) => {
    if (!field.showIf) return true;
    return sectionAnswers[field.showIf.field] === field.showIf.equals;
  };

  const validate = () => {
    const errs = {};
    section.fields.forEach((f) => {
      if (f.required && isVisible(f)) {
        const v = sectionAnswers[f.name];
        if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) {
          errs[f.name] = t("profile.required");
        }
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (!validate()) return;
    if (step < total - 1) setStep(step + 1);
    else navigate("/review");
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
    else navigate("/profile");
  };

  const SectionIcon = Icons[section.icon] || Icons.FileText;

  return (
    <div className="min-h-screen pb-28">
      <AppHeader />
      <div className="no-print sticky top-16 z-20 border-b border-[#D1DBD7] bg-[#F5F7F6]/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-3">
          <ProgressBar current={step + 1} total={total} />
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4A7C6B]/10 text-[#4A7C6B]">
                <SectionIcon size={24} strokeWidth={1.75} />
              </span>
              <div>
                <h1
                  data-testid="section-title"
                  className="font-heading text-2xl font-semibold tracking-tight text-[#1C2522]"
                >
                  {t(`sections.${section.id}.title`)}
                </h1>
              </div>
            </div>
            <p className="mt-2 text-base text-[#4A5D56]">{t(`sections.${section.id}.description`)}</p>

            <div className="mt-8 rounded-3xl border border-[#D1DBD7] bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(28,37,34,0.04)] space-y-7">
              {section.fields.filter(isVisible).map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  sectionId={section.id}
                  value={sectionAnswers[field.name]}
                  onChange={(val) => setAnswer(section.id, field.name, val)}
                  error={errors[field.name]}
                />
              ))}
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-sm text-[#4A5D56] opacity-70">
              <Check size={14} /> {t("common.autosaved")}
            </p>
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="no-print fixed bottom-0 inset-x-0 z-20 border-t border-[#D1DBD7] bg-[#F5F7F6]/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex gap-3">
          <button
            data-testid="back-button"
            onClick={goBack}
            className="h-14 flex-1 rounded-2xl bg-[#E8ECEB] hover:bg-[#D1DBD7] text-[#1C2522] font-medium text-base transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} /> {t("nav.back")}
          </button>
          <button
            data-testid="next-button"
            onClick={goNext}
            className="h-14 flex-[1.5] rounded-2xl bg-[#4A7C6B] hover:bg-[#3A6355] text-white font-medium text-base transition-colors flex items-center justify-center gap-2"
          >
            {step < total - 1 ? t("nav.next") : t("nav.toReview")}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
