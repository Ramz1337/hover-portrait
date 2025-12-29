// ------------------------------------------------------------
// Hover Portrait — filepicker.js (Modular Custom Modal)
// Foundry v13 build 351 compatible
// ------------------------------------------------------------

console.log("Hover Portrait: filepicker.js loaded");

const HP_BASE = "modules/hover-portrait/assets/portraits";
let hpCurrentPath = HP_BASE;
let hpSelectedPath = null;

// ------------------------------------------------------------
// Utility: Safe browse wrapper (Foundry v13 API)
// ------------------------------------------------------------
async function hpBrowse(path) {
  const FilePickerImpl = foundry.applications.apps.FilePicker.implementation;

  let target = path || HP_BASE;
  if (!target.startsWith(HP_BASE)) target = HP_BASE;

  const result = await FilePickerImpl.browse("data", target);
  return {
    target: result.target,
    dirs: result.dirs || [],
    files: result.files || []
  };
}

// ------------------------------------------------------------
// Close modal
// ------------------------------------------------------------
function closeHoverPortraitModal() {
  const existing = document.getElementById("hoverportrait-filepicker");
  if (existing) existing.remove();
  hpSelectedPath = null;
}

// ------------------------------------------------------------
// Breadcrumb builder
// ------------------------------------------------------------
function hpBuildBreadcrumbs(path) {
  const parts = path.replace(HP_BASE, "").split("/").filter(Boolean);
  const crumbs = [];

  let accum = HP_BASE;
  crumbs.push({ label: "portraits", path: HP_BASE });

  for (const part of parts) {
    accum += "/" + part;
    crumbs.push({ label: part, path: accum });
  }

  return crumbs;
}

// ------------------------------------------------------------
// Render modal
// ------------------------------------------------------------
async function renderHoverPortraitModal(token) {
  closeHoverPortraitModal();

  const { target, dirs, files } = await hpBrowse(hpCurrentPath);
  hpCurrentPath = target;

  const overlay = document.createElement("div");
  overlay.id = "hoverportrait-filepicker";

  const modal = document.createElement("div");
  modal.className = "hp-modal";

  // Header
  const header = document.createElement("div");
  header.className = "hp-header";

  const title = document.createElement("h2");
  title.textContent = "Select Hover Portrait";

  const closeBtn = document.createElement("div");
  closeBtn.className = "hp-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => closeHoverPortraitModal());

  header.appendChild(title);
  header.appendChild(closeBtn);

  // Path bar
  const pathbar = document.createElement("div");
  pathbar.className = "hp-pathbar";

  const crumbs = hpBuildBreadcrumbs(hpCurrentPath);
  crumbs.forEach((c) => {
    const crumb = document.createElement("div");
    crumb.className = "hp-breadcrumb";
    crumb.textContent = c.label;
    crumb.addEventListener("click", async () => {
      hpCurrentPath = c.path;
      await renderHoverPortraitModal(token);
    });
    pathbar.appendChild(crumb);
  });

  // Grid
  const grid = document.createElement("div");
  grid.className = "hp-grid";

  // Directories
  dirs.forEach((dirPath) => {
    if (!dirPath.startsWith(HP_BASE)) return;

    const name = dirPath.split("/").filter(Boolean).pop();

    const item = document.createElement("div");
    item.className = "hp-item hp-folder";

    const icon = document.createElement("span");
    icon.textContent = "📁";

    const label = document.createElement("span");
    label.textContent = name;

    item.appendChild(icon);
    item.appendChild(label);

    item.addEventListener("click", async () => {
      hpCurrentPath = dirPath;
      await renderHoverPortraitModal(token);
    });

    grid.appendChild(item);
  });

  // Files
  const fileRegex = /\.(png|jpg|jpeg|webp|gif|svg|mp4|webm|ogg|m4v)$/i;

  files
    .filter((f) => fileRegex.test(f))
    .forEach((filePath) => {
      const name = filePath.split("/").filter(Boolean).pop();

      const item = document.createElement("div");
      item.className = "hp-item hp-file";

      const img = document.createElement("img");
      img.src = filePath;

      const label = document.createElement("span");
      label.textContent = name;

      item.appendChild(img);
      item.appendChild(label);

      item.addEventListener("click", () => {
        hpSelectedPath = filePath;

        grid.querySelectorAll(".hp-item").forEach((el) => {
          el.classList.remove("hp-selected");
        });

        item.classList.add("hp-selected");
      });

      grid.appendChild(item);
    });

  // Footer
  const footer = document.createElement("div");
  footer.className = "hp-footer";

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "hp-btn cancel";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => closeHoverPortraitModal());

  const selectBtn = document.createElement("button");
  selectBtn.className = "hp-btn select";
  selectBtn.textContent = "Select";

  selectBtn.addEventListener("click", async () => {
    if (!hpSelectedPath) return;

    await token.document.setFlag("hover-portrait", "img", hpSelectedPath);
    await token.actor.setFlag("hover-portrait", "img", hpSelectedPath);

    ui.notifications.info("Hover portrait updated.");
    closeHoverPortraitModal();
  });

  footer.appendChild(cancelBtn);
  footer.appendChild(selectBtn);

  // Assemble modal
  modal.appendChild(header);
  modal.appendChild(pathbar);
  modal.appendChild(grid);
  modal.appendChild(footer);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// ------------------------------------------------------------
// Public entry point
// ------------------------------------------------------------
function openHoverPortraitModal(token) {
  hpCurrentPath = HP_BASE;
  hpSelectedPath = null;
  renderHoverPortraitModal(token);
}