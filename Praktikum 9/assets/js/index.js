document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleView");
  let isTileView = true;

  toggleButton.textContent = "Listenansicht";

  toggleButton.addEventListener("click", () => {
    if (isTileView) {
      showListView();
      toggleButton.textContent = "Kachelansicht";
    } else {
      showTileView();
      toggleButton.textContent = "Listenansicht";
    }
    isTileView = !isTileView;
  });

  showTileView();

  function showTileView() {
    const section = document.getElementById("abo");
    const items = section.querySelectorAll("li");

    const container = document.createElement("section");
    container.id = "abo";
    container.classList.add("tile-container");

    items.forEach((li) => {
      const article = document.createElement("article");
      article.classList.add("tile");

      const link = document.createElement("a");
      link.href = `podcast.html#${li.dataset.id}`;

      const img = document.createElement("img");
      img.src = li.dataset.img;
      img.alt = li.textContent;

      const span = document.createElement("span");
      span.textContent = li.querySelector("a").textContent.replace(":", "");

      link.append(img, span);
      article.appendChild(link);
      container.appendChild(article);
    });

    section.replaceWith(container);
  }

  function showListView() {
    const container = document.querySelector(".tile-container");
    const section = document.createElement("section");
    section.id = "abo";

    const ul = document.createElement("ul");

    container.querySelectorAll(".tile").forEach((tile) => {
      const li = document.createElement("li");

      const id = tile.querySelector("a").href.split("#")[1];
      const title = tile.querySelector("span").textContent;
      const count = tile.dataset.count || findCountFromId(id);
      const img = tile.querySelector("img").src;

      li.dataset.id = id;
      li.dataset.count = count;
      li.dataset.img = img;

      const link = document.createElement("a");
      link.href = `podcast.html#${id}`;
      link.textContent = `${title}:`;

      li.append(link, ` ${count}`);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    container.replaceWith(section);
  }

  function findCountFromId(id) {
    const map = {
      "gemischtes-hack": "313 Episoden",
      feelings: "150 Episoden",
      "joe-rogan": "2390 Episoden",
      "lanz-precht": "213 Episoden",
    };
    return map[id] || "";
  }
});
