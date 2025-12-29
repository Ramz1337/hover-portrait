# Changelog
All notable changes to **Hover Portrait** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to **Semantic Versioning**.

---

## [1.0.1] - 2025-01-01
### Added
- Initial public release of **Hover Portrait**.
- Custom sandboxed portrait picker with:
  - Auto-discovered portrait folders
  - Category buttons
  - Grid layout with image/video previews
  - One-click assignment to actor + token flags
- Hover portrait display system with:
  - Border style selector
  - Pinned portrait support
  - Video support (`webm`, `mp4`, `ogg`, `m4v`)
- Token inheritance: new tokens automatically inherit actor portrait.
- Full Foundry v13 compatibility.
- Clean, isolated CSS with no UI collisions.

### Changed
- Updated FilePicker calls to the v13+ namespace:
  `foundry.applications.apps.FilePicker.implementation`
- Removed all resizing logic for stability and predictability.

### Fixed
- HUD button injection logic improved for compatibility across systems.
- Eliminated deprecated API warnings related to FilePicker.

---

## [Unreleased]
### Planned
- ApplicationV2-based picker UI (animated, reactive, future-proof)
- Search bar for portraits
- Breadcrumb navigation
- Drag-and-drop portrait assignment
- Recent portraits quick-select row
- Additional border themes

---
