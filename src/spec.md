# Specification

## Summary
**Goal:** Build the Cardiac Sentinel companion web app with a patient dashboard for monitoring/sending SOS and a medical control room dashboard for receiving and managing alerts, backed by persistent canister data and Internet Identity authentication.

**Planned changes:**
- Create a landing page that describes Cardiac Sentinel and links to Patient and Medical Control Room sections as distinct routes.
- Add Internet Identity sign-in and a persisted user profile (display name, age, known condition notes, emergency contacts, free-text address/location).
- Implement backend models/APIs for user profiles, simulated heart-rate readings (with timestamps/status), and emergency alerts (manual/automatic, severity, status, timestamps) with proper access control.
- Build the Patient dashboard: monitoring active/inactive status, recent readings list, alert history, and a manual SOS button that creates an alert immediately.
- Add a watch-sensor simulation UI: start/stop generation of periodic readings, configure abnormal thresholds, and auto-create alerts when abnormal readings occur.
- Build the Medical Control Room dashboard: polling alert queue (newest first), alert detail view (patient profile + triggering reading context), and status updates (New/Acknowledged/Dispatched/Resolved).
- Add a lightweight allowlist-based authorization for control room APIs and UI, including a bootstrapping method callable by an authorized principal.
- Apply a cohesive medical-safety visual theme (avoid blue/purple as primary colors) and make SOS actions visually distinct and accessible.
- Add and render generated static brand/illustration images from `frontend/public/assets/generated` (logo + at least one illustration).

**User-visible outcome:** Users can sign in, set up their profile, view simulated heart monitoring readings, trigger a manual SOS, and see alert history; authorized control-room users can view a refreshed queue of all incoming alerts, inspect patient/reading details, and update alert statuses.
