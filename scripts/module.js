// ------------------------------------------------------------
// Hover Portrait — module.js (final corrected version)
// ------------------------------------------------------------

console.log("Hover Portrait: module.js loaded");

// ------------------------------------------------------------
// Register module settings
// ------------------------------------------------------------
Hooks.once("init", () => {
  console.log("Hover Portrait: registering settings");

  // Border style selector
  game.settings.register("hover-portrait", "borderStyle", {
    name: "Hover Portrait Border Style",
    hint: "Choose the border style for the hover portrait window.",
    scope: "client",
    config: true,
    type: String,
    choices: {
      "none": "None",
      "default": "Default",
      "fantasy": "Fantasy (Arcane Glow)",
      "fire": "Fire (Ember Flame)",
      "nature": "Nature (Druidic Green)",
      "necromancer": "Necromancer (Blood Red)",
      "steel": "Steel (Warrior Frame)",
      "gold": "Gold (Wizard Trim)",
      "moon": "Moonlight (Silver Glow)",
      "dragon": "Dragon (Scaled Border)"
    },
    default: "fantasy"
  });

  // Pinned state (hidden)
  game.settings.register("hover-portrait", "pinned", {
    name: "Pinned Hover Portrait",
    hint: "Whether the hover portrait is pinned in place.",
    scope: "client",
    config: false,
    type: Boolean,
    default: false
  });
});

// ------------------------------------------------------------
// Utility: Clamp any path to the module directory
// ------------------------------------------------------------
function clampToPortraits(path) {
  const base = "modules/hover-portrait/assets/portraits";
  path = path.replace(/\\/g, "/");
  if (!path.startsWith(base)) return base;
  return path;
}

// ------------------------------------------------------------
// TOKEN INHERITANCE: New tokens automatically inherit portrait
// ------------------------------------------------------------
Hooks.on("preCreateToken", (document) => {
  const actor = game.actors.get(document.actorId);
  if (!actor) return;

  const saved = actor.getFlag("hover-portrait", "img");
  if (saved) {
    document.updateSource({
      "flags.hover-portrait.img": saved
    });
  }
});

// ------------------------------------------------------------
// Custom sandboxed portrait picker with auto folder categories
// ------------------------------------------------------------
async function openHoverPortraitPicker(token) {
  const baseDir = "modules/hover-portrait/assets/portraits";

  let rootBrowse;
  try {
    rootBrowse = await foundry.applications.apps.FilePicker.implementation.browse(
      "data",
      clampToPortraits(baseDir)
    );
  } catch (err) {
    console.error("Hover Portrait: Failed to browse root directory", err);
    ui.notifications.error("Hover Portrait: Could not read portraits directory.");
    return;
  }

  const subfolders = rootBrowse.dirs ?? [];

  let categoryButtons = `
    <div class="hover-portrait-categories" style="margin-bottom: 10px;">
      <button class="hp-cat-btn" data-folder="" style="margin-right:5px;">All</button>
  `;

  for (const folder of subfolders) {
    const name = folder.replace(baseDir + "/", "");
    categoryButtons += `
      <button class="hp-cat-btn" data-folder="${name}" style="margin-right:5px;">
        ${name}
      </button>
    `;
  }

  categoryButtons += `</div>`;

  let grid = `<div id="hover-portrait-grid" style="
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
    max-height: 400px;
    overflow-y: auto;
  "></div>`;

  const d = new Dialog({
    title: "Select Hover Portrait",
    content: categoryButtons + grid,
    buttons: { cancel: { label: "Cancel" } },

    render: (html) => {
      const gridEl = html.find("#hover-portrait-grid");

      async function loadFolder(folderName) {
        const path = folderName ? `${baseDir}/${folderName}` : baseDir;

        let browse;
        try {
          browse = await foundry.applications.apps.FilePicker.implementation.browse(
            "data",
            clampToPortraits(path),
            {
              extensions: [".png", ".jpg", ".jpeg", ".webp", ".gif", ".webm", ".mp4", ".ogg", ".m4v"]
            }
          );
        } catch (err) {
          console.error("Hover Portrait: Failed to browse folder", err);
          return;
        }

        const files = browse.files ?? [];
        gridEl.empty();

        for (const file of files) {
          const ext = file.split(".").pop().toLowerCase();
          const isVideo = ["webm", "mp4", "ogg", "m4v"].includes(ext);

          const cell = $(`
            <div class="hover-portrait-choice" data-path="${file}"
                 style="cursor:pointer; border:1px solid #555; padding:2px;">
              ${
                isVideo
                  ? `<video src="${file}" style="width:100%; height:100%; object-fit:cover;" muted></video>`
                  : `<img src="${file}" style="width:100%; height:100%; object-fit:cover;"/>`
              }
            </div>
          `);

          cell.on("click", async () => {
            await token.actor.setFlag("hover-portrait", "img", file);
            await token.document.setFlag("hover-portrait", "img", file);

            ui.notifications.info("Hover Portrait updated.");
            d.close();
          });

          gridEl.append(cell);
        }
      }

      loadFolder("");

      html.find(".hp-cat-btn").on("click", function () {
        loadFolder(this.dataset.folder);
      });
    }
  });

  d.render(true);
}

// ------------------------------------------------------------
// Add Hover Portrait button to Token HUD
// ------------------------------------------------------------
Hooks.on("renderTokenHUD", (hud, html, tokenData) => {
  const token = canvas.tokens.get(tokenData._id);
  if (!token) return;

  const jq = $(html);

  const btn = $(`
    <div class="control-icon hover-portrait-btn" title="Set Hover Portrait">
      <i class="fa-solid fa-image"></i>
    </div>
  `);

  let target =
    jq.find(".col.left")[0] ||
    jq.find(".left")[0] ||
    jq.find(".left-col")[0] ||
    jq.find(".left-controls")[0] ||
    jq.find(".control-column.left")[0] ||
    jq.find(".hud-column.left")[0];

  if (!target) {
    console.warn("Hover Portrait: No left HUD column found, appending to root HUD");
    target = html;
  }

  $(target).append(btn);

  btn.on("click", async () => {
    openHoverPortraitPicker(token);
  });
});