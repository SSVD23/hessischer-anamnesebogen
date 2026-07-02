// Formats a stored answer value into a human-readable string for a given field.
export function formatAnswer(field, value, t, notFilledLabel) {
  if (value === undefined || value === null || value === "") {
    return { text: notFilledLabel, empty: true };
  }
  switch (field.type) {
    case "radio":
    case "select":
      return { text: t(`fields.${field.name}.options.${value}`), empty: false };
    case "checkboxes": {
      if (!Array.isArray(value) || value.length === 0) return { text: notFilledLabel, empty: true };
      return {
        text: value.map((v) => t(`fields.${field.name}.options.${v}`)).join(", "),
        empty: false,
      };
    }
    case "slider":
      return { text: String(value), empty: false };
    default:
      return { text: String(value), empty: false };
  }
}
