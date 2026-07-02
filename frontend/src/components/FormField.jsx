import { Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const inputBase =
  "w-full min-h-[56px] rounded-xl border border-[#D1DBD7] bg-[#F5F7F6] px-4 text-base text-[#1C2522] placeholder:text-[#4A5D56]/50 focus:border-[#4A7C6B] focus:outline-none focus:ring-1 focus:ring-[#4A7C6B] transition-shadow";

export function FormField({ field, sectionId, value, onChange, error }) {
  const { t } = useLanguage();
  const label = t(`fields.${field.name}.label`);
  const placeholder = t(`fields.${field.name}.placeholder`);
  const tid = `field-${field.name}`;

  const renderControl = () => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <input
            data-testid={`${tid}-input`}
            type={field.type}
            inputMode={field.type === "number" ? "numeric" : "text"}
            value={value ?? ""}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputBase}
          />
        );

      case "textarea":
        return (
          <textarea
            data-testid={`${tid}-textarea`}
            value={value ?? ""}
            placeholder={placeholder}
            rows={4}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[120px] rounded-xl border border-[#D1DBD7] bg-[#F5F7F6] p-4 text-base text-[#1C2522] placeholder:text-[#4A5D56]/50 focus:border-[#4A7C6B] focus:outline-none focus:ring-1 focus:ring-[#4A7C6B] transition-shadow resize-none"
          />
        );

      case "select":
        return (
          <select
            data-testid={`${tid}-select`}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBase} appearance-none cursor-pointer`}
          >
            <option value="" disabled>
              —
            </option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {t(`fields.${field.name}.options.${opt}`)}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="grid gap-2.5">
            {field.options.map((opt) => {
              const active = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  data-testid={`${tid}-option-${opt}`}
                  onClick={() => onChange(opt)}
                  className={`flex items-center justify-between min-h-[56px] rounded-xl border px-4 text-left text-base font-medium transition-colors ${
                    active
                      ? "border-[#4A7C6B] bg-[#4A7C6B]/10 text-[#1C2522]"
                      : "border-[#D1DBD7] bg-white text-[#4A5D56] hover:border-[#4A7C6B]/50"
                  }`}
                >
                  <span>{t(`fields.${field.name}.options.${opt}`)}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      active ? "border-[#4A7C6B] bg-[#4A7C6B]" : "border-[#D1DBD7]"
                    }`}
                  >
                    {active && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                </button>
              );
            })}
          </div>
        );

      case "checkboxes": {
        const arr = Array.isArray(value) ? value : [];
        const toggle = (opt) =>
          onChange(arr.includes(opt) ? arr.filter((o) => o !== opt) : [...arr, opt]);
        return (
          <div className="grid sm:grid-cols-2 gap-2.5">
            {field.options.map((opt) => {
              const active = arr.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  data-testid={`${tid}-option-${opt}`}
                  onClick={() => toggle(opt)}
                  className={`flex items-center gap-3 min-h-[52px] rounded-xl border px-4 text-left text-base font-medium transition-colors ${
                    active
                      ? "border-[#4A7C6B] bg-[#4A7C6B]/10 text-[#1C2522]"
                      : "border-[#D1DBD7] bg-white text-[#4A5D56] hover:border-[#4A7C6B]/50"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                      active ? "border-[#4A7C6B] bg-[#4A7C6B] text-white" : "border-[#D1DBD7]"
                    }`}
                  >
                    {active && <Check size={16} strokeWidth={3} />}
                  </span>
                  {t(`fields.${field.name}.options.${opt}`)}
                </button>
              );
            })}
          </div>
        );
      }

      case "slider": {
        const val = value ?? field.min ?? 0;
        return (
          <div className="pt-1">
            <div className="flex items-center gap-4">
              <input
                data-testid={`${tid}-slider`}
                type="range"
                min={field.min ?? 0}
                max={field.max ?? 10}
                value={val}
                onChange={(e) => onChange(Number(e.target.value))}
                className="anamnesis-slider flex-1"
              />
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4A7C6B] text-lg font-bold text-white">
                {val}
              </span>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div data-testid={`field-wrapper-${field.name}`} className="space-y-2.5">
      <label className="block text-base font-semibold text-[#1C2522]">
        {label}
        {field.required && <span className="text-[#E15241]"> *</span>}
      </label>
      {renderControl()}
      {error && (
        <p data-testid={`${tid}-error`} className="text-sm font-medium text-[#E15241]">
          {error}
        </p>
      )}
    </div>
  );
}
