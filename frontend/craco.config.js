/*
  craco.config.js

  CRACO (Create React App Configuration Override) erlaubt es, die von
  react-scripts gekapselte Webpack-Konfiguration anzupassen, ohne das Projekt
  per "eject" dauerhaft aufzubrechen.

  Im Prototyp werden genau drei Anpassungen vorgenommen:
    1. Pfad-Alias "@" für den Ordner src/, damit Importe nicht über lange
       relative Pfade (../../..) laufen müssen.
    2. ESLint bleibt aktiviert; die Regeln stehen ausschließlich in
       .eslintrc.json ("root": true), sodass Konfigurationen in übergeordneten
       Ordnern ignoriert werden.
    3. watchOptions: Ordner, die sich während der Entwicklung nicht ändern,
       werden von der Dateiüberwachung ausgenommen. Das reduziert die
       CPU-Last beim Hot Reload spürbar.
*/
const path = require("path");

module.exports = {
  eslint: {
    enable: true,
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/build/**",
          "**/public/**",
        ],
      };
      return webpackConfig;
    },
  },
};
