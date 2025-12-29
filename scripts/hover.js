console.log("Hover Portrait: hover.js v2.2 — Static Bottom-Left Edition loaded");

let hoverWrapper = null;
let hoverElement = null;
let autoFadeTimeout = null;
let hoverGrace = false;

const MARGIN = 20;

// ---------------------------------------------------------
// Clamp to screen
// ---------------------------------------------------------
function clampToScreen(x, y, width, height) {
  const maxX = window.innerWidth - width;
  const maxY = window.innerHeight - height;

  return {
    x: Math.min(Math.max(0, x), Math.max(0, maxX)),
    y: Math.min(Math.max(0, y), Math.max(0, maxY))
  };
}

// ---------------------------------------------------------
// Fade logic
// ---------------------------------------------------------
function startAutoFadeTimer() {
  if (autoFadeTimeout) clearTimeout(autoFadeTimeout);

  autoFadeTimeout = setTimeout(() => {
    fadeOut();
  }, 7000);
}

function fadeIn() {
  if (!hoverElement) return;
  hoverElement.style.opacity = "0.85";
}

function fadeOut() {
  if (!hoverElement) return;
  hoverElement.style.opacity = "0";
}

// ---------------------------------------------------------
// Create wrapper + portrait
// ---------------------------------------------------------
function createHoverWrapper() {
  if (hoverWrapper && hoverElement) return hoverWrapper;

  hoverWrapper = document.createElement("div");
  hoverWrapper.id = "hover-wrapper";

  hoverElement = document.createElement("div");
  hoverElement.id = "hover-portrait";
  hoverElement.style.opacity = "0";
  hoverElement.style.transition = "opacity 0.25s ease";

  hoverWrapper.appendChild(hoverElement);
  document.body.appendChild(hoverWrapper);

  return hoverWrapper;
}

// ---------------------------------------------------------
// Dynamic Clamp (Best Practice)
// ---------------------------------------------------------
function applyDynamicClamp(media) {
  const naturalW = media.naturalWidth || media.videoWidth;
  const naturalH = media.naturalHeight || media.videoHeight;

  if (!naturalW || !naturalH) return;

  const maxW = window.innerWidth * 0.30;
  const maxH = window.innerHeight * 0.30;

  const scale = Math.min(maxW / naturalW, maxH / naturalH, 1);

  hoverElement.style.width = naturalW * scale + "px";
  hoverElement.style.height = naturalH * scale + "px";
}

// ---------------------------------------------------------
// Main display logic
// ---------------------------------------------------------
async function showHoverPortrait(token) {
  let path =
    token.actor?.getFlag("hover-portrait", "img") ||
    token.document.getFlag("hover-portrait", "img") ||
    token.actor?.img ||
    token.document.texture?.src ||
    token.document.texture?.original ||
    "icons/svg/mystery-man.svg";

  hoverGrace = true;
  setTimeout(() => (hoverGrace = false), 5000);

  const wrapper = createHoverWrapper();

  hoverElement.innerHTML = "";

  const style = game.settings.get("hover-portrait", "borderStyle");
  hoverElement.className = "";
  hoverElement.classList.add("hover-portrait-" + style);

  let media;
  const isVideo = /\.(mp4|webm|ogg|m4v)$/i.test(path);

  if (isVideo) {
    media = document.createElement("video");
    media.src = path;
    media.autoplay = true;
    media.loop = true;
    media.muted = true;
    media.playsInline = true;

    media.onloadeddata = () => {
      applyDynamicClamp(media);
      fadeIn();
      startAutoFadeTimer();
    };
  } else {
    media = document.createElement("img");
    media.src = path;

    media.onload = () => {
      applyDynamicClamp(media);
      fadeIn();
      startAutoFadeTimer();
    };
  }

  media.style.pointerEvents = "none";
  hoverElement.appendChild(media);

  // Always bottom-left
  requestAnimationFrame(() => {
    const h = wrapper.offsetHeight;
    const bottomLeft = clampToScreen(
      MARGIN,
      window.innerHeight - h - MARGIN,
      wrapper.offsetWidth,
      wrapper.offsetHeight
    );
    wrapper.style.left = bottomLeft.x + "px";
    wrapper.style.top = bottomLeft.y + "px";
  });
}

// ---------------------------------------------------------
// Hide portrait
// ---------------------------------------------------------
function hideHoverPortrait() {
  if (!hoverElement) return;
  if (hoverGrace) return;
  fadeOut();
}

// ---------------------------------------------------------
// Hook: Show/hide portrait on token hover
// ---------------------------------------------------------
Hooks.on("hoverToken", (token, hovered) => {
  if (hovered) {
    showHoverPortrait(token);
  } else {
    hideHoverPortrait();
  }
});