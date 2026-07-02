import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CheckCircle2, Printer, Download, Send, Trash2, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAnamnesis } from "@/context/AnamnesisContext";
import { AppHeader } from "@/components/AppHeader";
import { PrototypeNotice } from "@/components/PrototypeNotice";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SECTIONS } from "@/data/schema";
import { formatAnswer } from "@/lib/formatAnswer";

export default function Summary() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { data, reset } = useAnamnesis();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const notFilled = t("review.notFilled");
  const p = data.profile;

  const generatedOn = new Date(data.completedAt || Date.now()).toLocaleString(
    lang === "de" ? "de-DE" : "en-GB"
  );

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const payload = {
      document: t("summary.documentTitle"),
      generatedOn: data.completedAt,
      language: lang,
      profile: p,
      answers: data.answers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `anamnesis_${p.lastName || "profile"}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareMock = () => toast.success(t("summary.shareMockToast"));

  const handleReset = () => {
    reset();
    setConfirmOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <AppHeader />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 print-container"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4A7C6B]/10 text-[#4A7C6B]">
            <CheckCircle2 size={36} strokeWidth={1.75} />
          </span>
          <h1 className="mt-5 font-heading text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C2522]">
            {t("summary.title")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#4A5D56] max-w-md">
            {t("summary.thankYou")}
          </p>
        </div>

        {/* Actions */}
        <div className="no-print mt-8 grid gap-3 sm:grid-cols-2">
          <button
            data-testid="print-button"
            onClick={handlePrint}
            className="h-14 rounded-2xl bg-[#4A7C6B] hover:bg-[#3A6355] text-white font-medium text-base transition-colors flex items-center justify-center gap-2"
          >
            <Printer size={20} /> {t("summary.printButton")}
          </button>
          <button
            data-testid="download-button"
            onClick={handleDownload}
            className="h-14 rounded-2xl bg-[#E8ECEB] hover:bg-[#D1DBD7] text-[#1C2522] font-medium text-base transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} /> {t("summary.downloadButton")}
          </button>
        </div>

        <div className="no-print mt-4 rounded-2xl border border-[#D1DBD7] bg-white p-5 shadow-[0_4px_24px_rgba(28,37,34,0.03)]">
          <h2 className="font-heading text-base font-semibold text-[#1C2522]">
            {t("summary.shareTitle")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-[#4A5D56]">{t("summary.shareText")}</p>
          <button
            data-testid="share-mock-button"
            onClick={handleShareMock}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#4A7C6B] px-4 py-2 text-sm font-medium text-[#4A7C6B] hover:bg-[#4A7C6B]/5 transition-colors"
          >
            <Send size={16} /> {t("summary.shareMock")}
          </button>
        </div>

        {/* Printable summary document */}
        <div className="mt-8" data-testid="summary-document">
          <div className="hidden print:block mb-4">
            <h2 className="font-heading text-xl font-bold text-[#1C2522]">{t("summary.documentTitle")}</h2>
            <p className="text-sm text-[#4A5D56]">{t("summary.generatedOn")}: {generatedOn}</p>
          </div>

          <SummaryCard icon={UserCircle} title={t("review.profileHeading")}>
            <Row label={t("profile.relationLabel")} value={t(`profile.relations.${p.relation}`)} />
            <Row label={t("profile.firstName")} value={p.firstName || notFilled} empty={!p.firstName} />
            <Row label={t("profile.lastName")} value={p.lastName || notFilled} empty={!p.lastName} />
            <Row label={t("profile.dateOfBirth")} value={p.dateOfBirth || notFilled} empty={!p.dateOfBirth} />
          </SummaryCard>

          <div className="space-y-4 mt-4">
            {SECTIONS.map((section) => {
              const answers = data.answers[section.id] || {};
              const Icon = Icons[section.icon] || Icons.FileText;
              return (
                <SummaryCard key={section.id} icon={Icon} title={t(`sections.${section.id}.title`)}>
                  {section.fields.map((field) => {
                    const { text, empty } = formatAnswer(field, answers[field.name], t, notFilled);
                    return <Row key={field.name} label={t(`fields.${field.name}.label`)} value={text} empty={empty} />;
                  })}
                </SummaryCard>
              );
            })}
          </div>
        </div>

        <PrototypeNotice className="mt-8" />

        <button
          data-testid="start-over-button"
          onClick={() => setConfirmOpen(true)}
          className="no-print mt-6 inline-flex items-center justify-center gap-2 w-full h-12 rounded-2xl text-[#E15241] font-medium text-base hover:bg-[#E15241]/5 transition-colors"
        >
          <Trash2 size={18} /> {t("summary.startOver")}
        </button>
      </motion.main>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent data-testid="confirm-delete-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("summary.confirmDeleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("summary.confirmDeleteText")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="confirm-delete-cancel">
              {t("summary.confirmDeleteCancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              data-testid="confirm-delete-confirm"
              onClick={handleReset}
              className="bg-[#E15241] hover:bg-[#c8412f]"
            >
              {t("summary.confirmDeleteConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SummaryCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-3xl border border-[#D1DBD7] bg-white p-6 shadow-[0_4px_24px_rgba(28,37,34,0.04)] print:shadow-none print:border-[#D1DBD7]">
      <div className="flex items-center gap-2.5 mb-4">
        <Icon size={20} className="text-[#4A7C6B]" strokeWidth={1.75} />
        <h2 className="font-heading text-lg font-semibold text-[#1C2522]">{title}</h2>
      </div>
      <dl className="space-y-2.5">{children}</dl>
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
