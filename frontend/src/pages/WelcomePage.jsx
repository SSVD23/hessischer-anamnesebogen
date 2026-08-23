/*
  WelcomePage.jsx
  Start-/Willkommensseite mit Kurzbeschreibung und deutlichem Haftungsausschluss.
  Enthaelt keinen eigenen Zustand; ruft onStart auf, um zur Profilverwaltung zu wechseln.
*/
import React from "react";

export function WelcomePage({ t, onStart }) {
  const points = t("welcome.disclaimerPoints");

  return (
    <div className="page">
      <span className="badge">{t("welcome.badge")}</span>
      <h1>{t("welcome.title")}</h1>
      <p>{t("welcome.subtitle")}</p>

      <div className="card">
        <h3>{t("welcome.disclaimerTitle")}</h3>
        <div className="notice">
          <ul>
            {Array.isArray(points) &&
              points.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
        </div>
      </div>

      <button type="button" className="btn btn--primary btn--block" onClick={onStart}>
        {t("welcome.start")}
      </button>
    </div>
  );
}
