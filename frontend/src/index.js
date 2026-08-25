import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker registrieren -> App wird "installierbar" und offline nutzbar (PWA-artig).
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL || ""}/service-worker.js`;
    navigator.serviceWorker.register(swUrl).catch(() => {
      // Registrierung fehlgeschlagen -> App funktioniert trotzdem (nur ohne Offline-Cache).
    });
  });
}
