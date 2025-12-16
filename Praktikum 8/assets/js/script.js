// funktion zur ermittlung der viewport breite
const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const viewportWidth = getViewportWidth();
console.log(`Die Viewport-Breite beträgt: ${viewportWidth} Pixel.`);

// bildschirmbreite ermitteln
const screenWidth = screen.width;

// prüfen, ob viewport < 30% der bildschirmbreite ist
if (viewportWidth < screenWidth * 0.3) {
  alert(
    `Warnung: Die Viewport-Breite (${viewportWidth}px) beträgt weniger als 30 % der Bildschirmbreite (${screenWidth}px).`
  );
}

// objekt podcast
class Podcast {
  constructor(
    titel,
    beschreibung,
    autor,
    besitzerName,
    besitzerEmail,
    bildUrl,
    feedUrl,
    kategorien,
    letztesUpdate
  ) {
    this.titel = titel;
    this.beschreibung = beschreibung;
    this.autor = autor;
    this.besitzerName = besitzerName;
    this.besitzerEmail = besitzerEmail;
    this.bildUrl = bildUrl;
    this.feedUrl = feedUrl;
    this.kategorien = kategorien;
    this.letztesUpdate = letztesUpdate;
    this.episoden = [];
  }

  addEpisode(episode) {
    this.episoden.push(episode);

    // sortierung - datum absteigend
    this.episoden.sort((a, b) => b.datum - a.datum);
  }
}

// objekt episode
class EpisodeAudio {
  constructor(url, groesse, typ) {
    this.url = url;
    this.groesse = groesse;
    this.typ = typ;
  }
}

class Episode {
  constructor(titel, beschreibung, dauer, datum, audio) {
    this.titel = titel;
    this.beschreibung = beschreibung;
    this.dauer = dauer;
    this.datum = datum;
    this.audio = audio;
  }

  getDauerInStundenUndMinuten() {
    const gesamtMinuten = Math.floor(this.dauer / 60000);
    const stunden = Math.floor(gesamtMinuten / 60);
    const minuten = gesamtMinuten % 60;

    if (stunden > 0) {
      return `${stunden}h ${minuten}min`;
    }
    return `${minuten}min`;
  }
}

// objekte erzeugen und ausgeben
// podcast 1
const podcast1 = new Podcast(
  "Working Draft",
  "Wöchentlicher Podcast über Webentwicklung",
  "Working Draft Team",
  "Peter Müller",
  "kontakt@workingdraft.de",
  "https://example.com/wd-logo.png",
  "https://example.com/wd-feed.xml",
  ["Web", "JavaScript", "Frontend"],
  new Date()
);

podcast1.addEpisode(
  new Episode(
    "Revision 677: Local AI",
    "Diskussion über lokale KI-Modelle",
    5940000, // 1h 39min
    new Date("2025-02-10T10:00:00"),
    new EpisodeAudio("https://example.com/ep677.mp3", 52000000, "audio/mpeg")
  )
);

podcast1.addEpisode(
  new Episode(
    "Revision 676: Local First",
    "Offline-first Anwendungen",
    6840000, // 1h 54min
    new Date("2025-02-03T10:00:00"),
    new EpisodeAudio("https://example.com/ep676.mp3", 60000000, "audio/mpeg")
  )
);

// podcast 2
const podcast2 = new Podcast(
  "Syntax",
  "Entwicklergeschichten aus der Praxis",
  "Syntax Team",
  "Max Mustermann",
  "mail@syntax.fm",
  "https://example.com/syntax-logo.png",
  "https://example.com/syntax-feed.xml",
  ["Tech", "Programming"],
  new Date()
);

podcast2.addEpisode(
  new Episode(
    "#936 Realtime LED Wall With React + Websockets",
    "Interaktive LED Wall mit React",
    4200000, // 70min
    new Date("2025-01-20T18:00:00"),
    new EpisodeAudio(
      "https://example.com/syntax936.mp3",
      48000000,
      "audio/mpeg"
    )
  )
);

podcast2.addEpisode(
  new Episode(
    "#935 CJ Made A Sega Game in 2025",
    "Retro-Games im modernen Umfeld",
    2820000, // 47min
    new Date("2025-01-13T18:00:00"),
    new EpisodeAudio(
      "https://example.com/syntax935.mp3",
      35000000,
      "audio/mpeg"
    )
  )
);

// neue podcasts sammeln
const podcasts = [podcast1, podcast2];

// ausgabe konsole
for (const podcast of podcasts) {
  console.log(`${podcast.titel}:`);

  for (const episode of podcast.episoden) {
    console.log(` ${episode.titel} (${episode.getDauerInStundenUndMinuten()})`);
  }
}
