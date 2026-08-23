/*
  ProfileSelector.jsx
  Darstellung und Verwaltung der Profil-Liste:
  auswaehlen, umbenennen und loeschen. Das Erstellen liegt in der ProfilePage.
  Loeschen loest ueber onRequestDelete die Sicherheitsabfrage in der Seite aus.
*/
import React from "react";

export function ProfileSelector({ profiles, activeProfileId, onSelect, onRename, onRequestDelete, t }) {
  if (profiles.length === 0) {
    return <p className="notice">{t("profile.noProfiles")}</p>;
  }

  return (
    <ul className="profile-list">
      {profiles.map((p) => {
        const isActive = p.id === activeProfileId;
        return (
          <li key={p.id} className={isActive ? "profile-item is-active" : "profile-item"}>
            <div>
              <div className="profile-item__name">{p.name}</div>
              {p.birthYear && <div className="profile-item__meta">{p.birthYear}</div>}
            </div>
            <div className="profile-item__actions">
              <button
                type="button"
                className="icon-btn"
                onClick={() => onSelect(p.id)}
                aria-pressed={isActive}
              >
                {isActive ? t("profile.selected") : t("profile.select")}
              </button>
              <button type="button" className="icon-btn" onClick={() => onRename(p)}>
                {t("profile.rename")}
              </button>
              <button
                type="button"
                className="icon-btn icon-btn--danger"
                onClick={() => onRequestDelete(p)}
              >
                {t("profile.delete")}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
