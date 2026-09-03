/*
  ProfilePage.jsx
  Profilverwaltung: erstellen, auswaehlen, umbenennen, loeschen.
  Ausserdem "Gefahrenzone" zum vollstaendigen Loeschen aller lokalen Daten.
  Loesch-Aktionen werden ueber den wiederverwendbaren ConfirmDialog bestaetigt.
*/
import React, { useState } from "react";
import { SPECIALTIES } from "../data/questionnaireDefinition.js";
import { ProfileSelector } from "../components/ProfileSelector.jsx";
import { ConfirmDialog } from "../components/ConfirmDialog.jsx";

export function ProfilePage({
  t,
  profiles,
  activeProfileId,
  onCreateProfile,
  onSelectProfile,
  onRenameProfile,
  onDeleteProfile,
  onClearAll,
  onContinue,
}) {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [insurer, setInsurer] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null); // Profil, das geloescht werden soll
  const [clearAllOpen, setClearAllOpen] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateProfile(name.trim(), birthYear.trim(), insuranceNumber.trim(), insurer.trim());
    setName("");
    setInsuranceNumber("");
    setInsurer("");
    setBirthYear("");
  };

  const handleRename = (profile) => {
    // eslint-disable-next-line no-alert
    const next = window.prompt(t("profile.renamePrompt"), profile.name);
    if (next && next.trim()) onRenameProfile(profile.id, next.trim());
  };

  return (
    <div className="page">
      <h1>{t("profile.title")}</h1>
      <p>{t("profile.subtitle")}</p>

      {/* Profil erstellen */}
      <form className="card" onSubmit={handleCreate}>
        <div className="field">
          <label htmlFor="new-profile-name">{t("profile.newNameLabel")}</label>
          <input
            id="new-profile-name"
            className="input"
            value={name}
            placeholder={t("profile.namePlaceholder")}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="new-profile-year">{t("profile.birthYearLabel")}</label>
          <input
            id="new-profile-year"
            className="input"
            type="number"
            value={birthYear}
            placeholder={t("profile.birthYearPlaceholder")}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>
        {/* Nummer der elektronischen Gesundheitskarte: ein Name ist nicht eindeutig,
            die Versichertennummer dagegen schon. Wird nur lokal gespeichert. */}
        <div className="field">
          <label htmlFor="new-profile-insno">{t("profile.insuranceNumberLabel")}</label>
          <input
            id="new-profile-insno"
            className="input"
            type="text"
            value={insuranceNumber}
            placeholder={t("profile.insuranceNumberPlaceholder")}
            onChange={(e) => setInsuranceNumber(e.target.value)}
          />
          <p className="field-help">{t("profile.insuranceNumberHelp")}</p>
        </div>
        <div className="field">
          <label htmlFor="new-profile-insurer">{t("profile.insurerLabel")}</label>
          <input
            id="new-profile-insurer"
            className="input"
            type="text"
            value={insurer}
            placeholder={t("profile.insurerPlaceholder")}
            onChange={(e) => setInsurer(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--primary btn--block" disabled={!name.trim()}>
          {t("profile.create")}
        </button>
      </form>

      {/* Fachrichtung des Bogens.
          Umgesetzt ist ausschliesslich die Allgemeinmedizin; die weiteren
          Eintraege sind deaktiviert und zeigen lediglich, dass die
          datengetriebene Struktur eine Erweiterung erlaubt. */}
      <div className="card">
        <div className="field" style={{ marginBottom: 0 }}>
          <label htmlFor="specialty-select">{t("profile.specialtyLabel")}</label>
          <select id="specialty-select" className="input" defaultValue="generalPractice">
            {SPECIALTIES.map((sp) => (
              <option key={sp.id} value={sp.id} disabled={!sp.available}>
                {t(`profile.specialties.${sp.id}`)}
                {!sp.available ? ` (${t("profile.specialtySoon")})` : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Profil-Liste */}
      <ProfileSelector
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelect={onSelectProfile}
        onRename={handleRename}
        onRequestDelete={setPendingDelete}
        t={t}
      />

      {activeProfileId && (
        <button type="button" className="btn btn--primary btn--block" onClick={onContinue}>
          {t("profile.continue")}
        </button>
      )}

      {/* Gefahrenzone: alle Daten loeschen */}
      {profiles.length > 0 && (
        <div className="card" style={{ marginTop: "1.5rem", borderColor: "rgba(225,82,65,0.35)" }}>
          <h3>{t("profile.dangerTitle")}</h3>
          <p>{t("profile.dangerText")}</p>
          <button type="button" className="btn btn--danger btn--block" onClick={() => setClearAllOpen(true)}>
            {t("profile.clearAll")}
          </button>
        </div>
      )}

      {/* Sicherheitsabfrage: einzelnes Profil loeschen */}
      <ConfirmDialog
        open={!!pendingDelete}
        title={t("profile.deleteConfirmTitle")}
        text={t("profile.deleteConfirmText")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          onDeleteProfile(pendingDelete.id);
          setPendingDelete(null);
        }}
      />

      {/* Sicherheitsabfrage: alle Daten loeschen */}
      <ConfirmDialog
        open={clearAllOpen}
        title={t("profile.clearAllConfirmTitle")}
        text={t("profile.clearAllConfirmText")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        onCancel={() => setClearAllOpen(false)}
        onConfirm={() => {
          onClearAll();
          setClearAllOpen(false);
        }}
      />
    </div>
  );
}
