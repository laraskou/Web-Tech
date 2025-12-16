const http = require("http");
const db = require("../models/persistence");

// erzeugt HTML seite
function renderHTML() {
  let html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8">
      <title>Podcasts</title>
    </head>
    <body>
      <h1>Podcasts</h1>
  `;

  db.podcasts.forEach((podcast) => {
    html += `
      <div style="margin-bottom: 2rem;">
        <h2>${podcast.titel}</h2>
        <p>${podcast.beschreibung}</p>
        ${
          podcast.bildUrl
            ? `<img src="${podcast.bildUrl}" alt="${podcast.titel}" width="200">`
            : ""
        }
        <h3>Episoden:</h3>
        <ul>
          ${podcast.episoden.map((ep) => `<li>${ep.titel}</li>`).join("")}
        </ul>
      </div>
    `;
  });

  html += `
    </body>
    </html>
  `;
  return html;
}

// HTTP-Server erstellen
const server = http.createServer((req, res) => {
  const html = renderHTML();
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

// Test-Podcasts importieren
db.subscribe("https://feeds.megaphone.fm/FSI1483080183", () => {
  db.subscribe("https://workingdraft.de/feed/", () => {
    console.log("Podcasts importiert.");
    console.log(
      db.podcasts.map((p) => ({ titel: p.titel, episoden: p.episoden.length }))
    );

    // Server starten
    server.listen(8844, () => {
      console.log("Server läuft unter http://localhost:8844");
    });
  });
});
