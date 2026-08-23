/*
  ExportActions.jsx
  Aktionsleiste der Zusammenfassung: Druck-/PDF-Ausgabe (window.print) und JSON-Export.
  Der eigentliche Export wird an den exportService delegiert.
*/
import React from "react";
import { downloadJson } from "../services/exportService.js";

export function ExportActions({ profile, answersData, t }) {
  const handlePrint = () => window.print();
  const handleExport = () => downloadJson(profile, answersData);

  return (
    <div className="btn-row no-print" style={{ flexWrap: "wrap" }}>
      <button type="button" className="btn btn--primary" onClick={handlePrint}>
        {t("export.print")}
      </button>
      <button type="button" className="btn btn--secondary" onClick={handleExport}>
        {t("export.json")}
      </button>
    </div>
  );
}
