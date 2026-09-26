/*
  WelcomePage.jsx
  Start-/Willkommensseite mit Kurzbeschreibung und deutlichem Haftungsausschluss.

  Erklärungskarte (Was ist eine E-Anamnese, Vorteile Datenschutz/Mehrsprachigkeit):
  Wird beim ersten Aufruf gezeigt und bewusst in einfacher Sprache gehalten, damit
  sie auch ohne technisches Vorwissen verständlich ist. Über die Checkbox
  "Beim nächsten Mal nicht mehr zeigen" lässt sie sich dauerhaft ausblenden
  (Flag in localStorage); Standardverhalten ist, sie bei jedem Aufruf erneut
  anzuzeigen, solange sie nicht bewusst ausgeblendet wurde.
*/
import React, { useState } from "react";

export function WelcomePage({ t, onStart, introDismissed = false, onDismissIntro }) {
  const points = t("welcome.disclaimerPoints");
  const introPoints = t("welcome.introPoints");
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleStart = () => {
    if (dontShowAgain && onDismissIntro) onDismissIntro();
    onStart();
  };

  return (
    <div className="page">
      <span className="badge">{t("welcome.badge")}</span>
      <h1>{t("welcome.title")}</h1>
      <p>{t("welcome.subtitle")}</p>

      {!introDismissed && (
        <div className="card">
          <h3>{t("welcome.introTitle")}</h3>
          <ul>
            {Array.isArray(introPoints) &&
              introPoints.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
          <label className="check-option" htmlFor="welcome-dont-show-again">
            <input
              id="welcome-dont-show-again"
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            <span>{t("welcome.introDismiss")}</span>
          </label>
        </div>
      )}

      <div className="card">
        <h3>{t("welcome.disclaimerTitle")}</h3>
        <div className="notice">
          <ul>
            {Array.isArray(points) &&
              points.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
        </div>
      </div>

      <button type="button" className="btn btn--primary btn--block" onClick={handleStart}>
        {t("welcome.start")}
      </button>
    </div>
  );
}
