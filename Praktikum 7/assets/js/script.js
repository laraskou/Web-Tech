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
