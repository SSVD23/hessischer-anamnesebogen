import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowLeft, Pencil, CheckCircle2, UserCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAnamnesis } from "@/context/AnamnesisContext";
import { AppHeader } from "@/components/AppHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import { SECTIONS } from "@/data/schema";
import { formatAnswer } from "@/lib/formatAnswer";

export default function Review() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data, setCurrentStep, markComplete } = useAnamnesis();
  const notFilled = t("review.notFilled");

  const editSection = (index) => {
    setCurrentStep(index);
    navigate("/questionnaire");
  };

  const submit = () => {
    markComplete();
    navigate("/summary");
  };

  const p = data.profile;

  return (
    <div className="min-h-screen pb-28">
      <AppHeader />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12"
      >
        <button
          data-testid="back-button"
          onClick={() => navigate("/questionnaire")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#4A5D56] hover:text-[#4A7C6B] transition-colors"
        >
          <ArrowLeft size={16} /> {t("nav.back")}
        </button>

        <h1 className="font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C2522]">
          {t("review.title")}
        </h1>
        <p className="mt-2 text-base text-[#4A5D56]">{t("review.subtitle")}</p>

        {/* Profile card */}
        <div className="mt-8 rounded-3xl border border-[#D1DBD7] bg-white p-6 shadow-[0_4px_24px_rgba(28,37,34,0.04)]">
          <div className="flex items-center gap-2.5 mb-4">
            <UserCircle size={22} className="text-[#4A7C6B]" strokeWidth={1.75} />
            <h2 className="font-heading text-lg font-semibold text-[#1C2522]">
              {t("review.profileHeading")}
            </h2>
          </div>
          <dl className="space-y-2.5">
            <Row label={t("profile.relationLabel")} value={t(`profile.relations.${p.relation}`)} />
            <Row label={t("profile.firstName")} value={p.firstName || notFilled} empty={!p.firstName} />
            <Row label={t("profile.lastName")} value={p.lastName || notFilled} empty={!p.lastName} />
            <Row label={t("profile.dateOfBirth")} value={p.dateOfBirth || notFilled} empty={!p.dateOfBirth} />
          </dl>
        </div>

        {/* Section cards */}
        <div className="mt-4 space-y-4" data-testid="review-sections">
          {SECTIONS.map((section, index) => {
            const answers = data.answers[section.id] || {};
            const SectionIcon = Icons[section.icon] || Icons.FileText;
            return (
              <div
                key={section.id}
                data-testid={`review-section-${section.id}`}
                className="rounded-3xl border border-[#D1DBD7] bg-white p-6 shadow-[0_4px_24px_rgba(28,37,34,0.04)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <SectionIcon size={20} className="text-[#4A7C6B]" strokeWidth={1.75} />
                    <h2 className="font-heading text-lg font-semibold text-[#1C2522]">
                      {t(`sections.${section.id}.title`)}
                    </h2>
                  </div>
                  <button
                    data-testid={`edit-section-${section.id}`}
                    onClick={() => editSection(index)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#D1DBD7] px-3 py-1.5 text-sm font-medium text-[#4A7C6B] hover:bg-[#E8ECEB] transition-colors"
                  >
                    <Pencil size={14} /> {t("nav.edit")}
                  </button>
                </div>
                <dl className="space-y-2.5">
                  {section.fields.map((field) => {
                    const { text, empty } = formatAnswer(field, answers[field.name], t, notFilled);
                    return (
                      <Row key={field.name} label={t(`fields.${field.name}.label`)} value={text} empty={empty} />
                    );
                  })}
                </dl>
              </div>
            );
          })}
        </div>

        <PrototypeNotice className="mt-6" />
      </motion.main>

      <div className="no-print fixed bottom-0 inset-x-0 z-20 border-t border-[#D1DBD7] bg-[#F5F7F6]/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-3">
          <button
            data-testid="submit-button"
            onClick={submit}
            className="h-14 w-full rounded-2xl bg-[#4A7C6B] hover:bg-[#3A6355] text-white font-medium text-lg transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={20} /> {t("review.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, empty }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4 border-b border-[#E8ECEB] pb-2.5 last:border-0 last:pb-0">
      <dt className="text-sm text-[#4A5D56] sm:w-1/2 shrink-0">{label}</dt>
      <dd className={`text-base font-medium sm:text-right ${empty ? "text-[#4A5D56]/50 italic" : "text-[#1C2522]"}`}>
        {value}
      </dd>
    </div>
  );
}
