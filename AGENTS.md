# AGENTS.md

## Project intent
This repo is for Tether, a dignity-first support-matching app. The product should feel calm, private, elegant, and human-centered.

## Priorities
1. Preserve emotional clarity and simplicity.
2. Favor polish over feature sprawl.
3. Keep the demo flow smooth and believable.
4. Build mobile-first.
5. Avoid unnecessary dependencies and backend complexity.

## Design rules
- No social-media styling.
- No gamification.
- No loud or childish UI.
- Prefer muted gradients, rounded cards, strong spacing, and refined typography.
- UX copy should be respectful, understated, and emotionally intelligent.

## Product rules
- Tether is not therapy, crisis response, or an AI companion.
- Do not write copy that implies diagnosis or treatment.
- Keep support requests dignity-preserving and low-pressure.
- Favor small, realistic support interactions.

## Code rules
- Use Next.js + TypeScript + Tailwind.
- Keep components modular and readable.
- Prefer simple patterns over clever abstractions.
- Use mock data unless a lightweight persistence layer is clearly helpful.
- Optimize for demo reliability.

## Demo-critical flow
The most important journey is:
user asks for support -> support card is generated -> matching supporter sees request -> support interaction is accepted

Protect this flow above all else.
