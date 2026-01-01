Changelog
All notable changes to Hover Portrait will be documented in this file.
The format is based on Keep a Changelog,
and this project adheres to Semantic Versioning.

[2.3.0] - 01-01-2026
Fixed
• 	Resolved a major invisible-overlay bug where the portrait wrapper continued blocking UI elements after fade-out.
• 	Corrected pointer-event handling to ensure no dead zones remain on the screen.
• 	Wrapper now fully hides using the new  class and  after fade-out.
Improved
• 	Updated fade logic for smoother transitions and proper cleanup.
• 	Strengthened bottom-left static placement logic for consistent behavior across resolutions.
• 	Improved internal structure to support future ApplicationV2 picker integration.
Added
• 	New  CSS state for wrapper and portrait to ensure proper UI cleanup.
• 	Safety timeout to guarantee wrapper removal even if fade-out is interrupted.

[1.0.1] - 26-12-2025
Added
• 	Initial public release of Hover Portrait.
• 	Custom sandboxed portrait picker with:
• 	Auto-discovered portrait folders
• 	Category buttons
• 	Grid layout with image/video previews
• 	One-click assignment to actor + token flags
• 	Hover portrait display system with:
• 	Border style selector
• 	Pinned portrait support
• 	Video support (, , , )
• 	Token inheritance: new tokens automatically inherit actor portrait.
• 	Full Foundry v13 compatibility.
• 	Clean, isolated CSS with no UI collisions.
Changed
• 	Updated FilePicker calls to the v13+ namespace:

• 	Removed all resizing logic for stability and predictability.
Fixed
• 	HUD button injection logic improved for compatibility across systems.
• 	Eliminated deprecated API warnings related to FilePicker.

[Unreleased]
Planned
• 	ApplicationV2-based picker UI (animated, reactive, future-proof)
• 	Search bar for portraits
• 	Breadcrumb navigation
• 	Drag-and-drop portrait assignment
• 	Recent portraits quick-select row
• 	Additional border themes
