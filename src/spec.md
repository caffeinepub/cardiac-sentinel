# Specification

## Summary
**Goal:** Convert the existing Cardiac Sentinel web UI into a mobile-first, installable PWA experience that feels app-like on phones.

**Planned changes:**
- Update the Landing, Patient Dashboard, Control Room Dashboard, and Alert Detail screens to be fully responsive on common phone widths with touch-friendly sizing and spacing.
- Add an installable PWA setup (web app manifest, metadata in the HTML head, and app icons) so the app can be added to a phone home screen and launched in standalone mode.
- Implement mobile-native navigation with a bottom navigation on small screens for authenticated users, while keeping existing header navigation for larger screens and preserving role-aware nav options.
- Add an unauthenticated in-app “Install” help surface that explains (in English) how to use “Add to Home Screen” on iPhone (Safari) and Android (Chrome), without claiming App Store/Play Store availability.

**User-visible outcome:** On a phone, Cardiac Sentinel’s main pages work without horizontal scrolling, controls are easier to tap, navigation is accessible via a bottom bar, and users can install the app to their home screen with clear in-app instructions.
