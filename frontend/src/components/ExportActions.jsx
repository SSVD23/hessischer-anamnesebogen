/*
  ExportActions.jsx
  Aktionsleiste der Zusammenfassung: Druck-/PDF-Ausgabe (window.print) und JSON-Export.
  Der eigentliche Export wird an den exportService delegiert.

  Auf Ruecksprache mit dem Erstpruefer deaktiviert: Fuer die Datenschutz-
  Argumentation der Arbeit sind der lokale Datei-Export (JSON) und der
  Druck/PDF-Weg nicht relevant, da beide keinen Bezug zur eigentlichen
  Uebergabe (QR-Code) oder Datenspende haben. Der Code bleibt zur
  Nachvollziehbarkeit auskommentiert erhalten.
*/
import React from "react";
// import { downloadJson } from "../services/exportService.js";

export function ExportActions() {
  // const handlePrint = () => window.print();
  // const handleExport = () => downloadJson(profile, answersData);
  //
  // return (
  //   <div className="btn-row no-print" style={{ flexWrap: "wrap" }}>
  //     <button type="button" className="btn btn--primary" onClick={handlePrint}>
  //       {t("export.print")}
  //     </button>
  //     <button type="button" className="btn btn--secondary" onClick={handleExport}>
  //       {t("export.json")}
  //     </button>
  //   </div>
  // );
  return null;
}
