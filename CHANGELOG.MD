# Changelog
All notable changes to Hover Portrait will be documented in this file.  
The format follows **Keep a Changelog**,  
and this project adheres to **Semantic Versioning**.

---

## [2.3.2] – 02‑01‑2026
### Fixed
- Resolved a second race condition where the portrait could still spawn off‑screen during rapid hover events.
- Corrected measurement timing by ensuring the wrapper becomes visible **before** calculating width/height.
- Prevented zero‑height/zero‑width measurement errors caused by fade-out transitions.
- Eliminated rare drift caused by cached images loading before the wrapper was unhidden.

### Improved
- Strengthened bottom‑left anchoring logic for guaranteed stability under rapid hover spam.
- Unified visibility + measurement flow across all media types (images + videos).
- Cleaned up `positionBottomLeft()` for clarity and future maintainability.

### Added
- Full v2.3.2 compatibility across all scripts.
- Final stability patch ensuring the portrait never jumps off‑screen.

---

## [2.3.1] – 02‑01‑2026
### Fixed
- Resolved a race condition where the portrait window could spawn off‑screen until the user hovered again.
- Corrected bottom‑left anchoring by moving positioning logic into the media load callback.
- Eliminated drift caused by `position: absolute` by switching the wrapper to `position: fixed`.
- Ensured wrapper height/width are measured only after the portrait is fully rendered.
- Updated FilePicker API usage in `filepicker.js` to the modern v13+ interface.

### Improved
- Hardened viewport clamping to prevent negative or invalid positions.
- Cleaned up internal structure for consistency across all scripts.
- Improved modal cleanup logic in the custom picker (even though it is not currently active).
- Polished CSS for stability and future‑proofing.

### Added
- Version headers to all scripts for clarity.
- Full v2.3.1 compatibility across `hover.js`, `module.js`, `filepicker.js`, and `styles.css`.

---

## [2.3.0] – 01‑01‑2026
### Fixed
- Resolved a major invisible‑overlay bug where the portrait wrapper continued blocking UI elements after fade‑out.
- Corrected pointer‑event handling to ensure no dead zones remain on the screen.
- Wrapper now fully hides using the new `.hidden` class and `display: none` after fade‑out.

### Improved
- Updated fade logic for smoother transitions and proper cleanup.
- Strengthened bottom‑left static placement logic for consistent behavior across resolutions.
- Improved internal structure to support future ApplicationV2 picker integration.

### Added
- New `.hidden` CSS state for wrapper and portrait to ensure proper UI cleanup.
- Safety timeout to guarantee wrapper removal even if fade‑out is interrupted.

---

## [1.0.1] – 26‑12‑2025
### Added
- Initial public release of Hover Portrait.
- Custom sandboxed portrait picker with:
  - Auto‑discovered portrait folders  
  - Category buttons  
  - Grid layout with image/video previews  
  - One‑click assignment to actor + token flags  
- Hover portrait display system with:
  - Border style selector  
  - Pinned portrait support  
  - Video support (`webm`, `mp4`, `ogg`, `m4v`)  
  - Token inheritance: new tokens automatically inherit actor portrait  
- Full Foundry v13 compatibility.
- Clean, isolated CSS with no UI collisions.

### Changed
- Updated FilePicker calls to the v13+ namespace.
- Removed all resizing logic for stability and predictability.

### Fixed
- HUD button injection logic improved for compatibility across systems.
- Eliminated deprecated API warnings related to FilePicker.

---

## [Unreleased]
### Planned
- ApplicationV2‑based picker UI (animated, reactive, future‑proof).
- Search bar for portraits.
- Breadcrumb navigation.
- Drag‑and‑drop portrait assignment.
- Recent portraits quick‑select row.
- Additional border themes.