const parser = require("./podcastParser");

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

const podcasts = [];

/**
 * Subscribes to a podcast by importing the data from the given feed URL.
 * The import itself is asynchronous, so a callback function is needed for subsequent actions.
 *
 * @param {String} url The feed URL of the podcast to subscribe to.
 * @param {Function} callback Callback function to be called after the import is complete.
 */
function subscribe(url, callback) {
  parser.parseFeed(url, (feed) => {
    podcasts.push(convert(url, feed));
    if (callback) callback();
  });
}

/**
 * Converts the feed data imported from a URL into data objects (Podcast, Episode, EpisodeAudio)
 * suitable for this web application.
 *
 * @param {String} url The feed URL of the podcast from which it was imported.
 * @param {Object} feed Feed object according to https://www.npmjs.com/package/podcast-feed-parser#default
 */
function convert(url, feed) {
  const podcast = new Podcast(
    feed.title || "Kein Titel",
    feed.description || "",
    feed.author || "",
    feed.owner?.name || "",
    feed.owner?.email || "",
    feed.image?.url || "",
    url,
    feed.categories || [],
    feed.lastBuildDate ? new Date(feed.lastBuildDate) : new Date()
  );

  // Episoden hinzufügen
  if (Array.isArray(feed.items)) {
    feed.items.forEach((item) => {
      const audio =
        item.enclosures?.map(
          (enc) => new EpisodeAudio(enc.url, enc.length, enc.type)
        ) || [];

      const episode = new Episode(
        item.title || "Keine Episode",
        item.description || "",
        item.duration || 0, // Dauer in ms, je nach Feed
        item.pubDate ? new Date(item.pubDate) : new Date(),
        audio[0] || null // meistens nur ein Audio-File
      );

      podcast.addEpisode(episode);
    });
  }

  return podcast;
}

module.exports = {
  podcasts,
  subscribe,
};
