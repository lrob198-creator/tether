# Tether

Tether is an AI-powered reciprocal care network that helps people ask for small forms of real human support before disconnection turns into crisis.

This MVP is designed for competition demos and early product storytelling. It is intentionally polished, emotionally intelligent, and lightweight to run.

## Product mission

Tether reduces the friction of asking for help and offering help by translating hard-to-express needs into simple, respectful support requests and matching them with people who have the right kind of capacity to respond.

Tether is intentionally not:

- a therapy app
- a crisis hotline
- a social network
- an AI companion

Its role is to strengthen human support, not replace it.

## Audience

The primary audience for this MVP is college students experiencing:

- overwhelm
- isolation
- emotional fatigue
- shutdown
- difficulty asking for help clearly

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- mobile-first responsive design
- mock data and local persistence

## Included pages

- `/` landing page
- `/auth` sign in and sign up entry
- `/dashboard` calm home surface with primary actions, recent requests, support given, support received, empty states, and trusted circle status
- `/need-support` multi-step low-friction request flow
- `/need-support/review` AI-generated support card review and edit screen
- `/offer-support` capacity-setting flow
- `/matches` supporter match results
- `/confirmation/requester` post-send requester confirmation
- `/confirmation/supporter` post-match supporter confirmation
- `/safety` safety resources and product boundary page

## Core demo journey

The seeded demo scenario in this app is:

1. A college student feels emotionally overwhelmed and low on energy.
2. They choose a low-friction request path and do not need to fully explain why.
3. Tether generates a respectful support card for a 15-minute grounding-style check-in by text.
4. A trusted connection with 20 minutes of capacity can see the request on the supporter side.
5. A small human support interaction becomes possible without overexplaining.

## Mock data layer

The mock implementation includes the following core entities:

- `User`
- `CircleConnection`
- `SupportRequest`
- `SupportCapacity`
- `Interaction`

Key files:

- [src/lib/types.ts](./src/lib/types.ts)
- [src/lib/sample-data.ts](./src/lib/sample-data.ts)
- [src/lib/support-card.ts](./src/lib/support-card.ts)
- [src/lib/matching.ts](./src/lib/matching.ts)
- [src/lib/demo-store.ts](./src/lib/demo-store.ts)

## Product behavior

### I need support

The request flow captures:

- energy level
- emotional state
- urgency
- support type needed
- preferred format
- explanation capacity

Tether then generates deterministic, dignity-preserving support-card text that is:

- respectful
- simple
- non-dramatic
- easy for another person to respond to

### I have capacity

The supporter flow captures:

- time available
- support types available
- format preference
- bandwidth level

### Matching

Matching logic is intentionally simple and readable. It scores for:

- support type alignment
- approximate time fit
- format compatibility
- urgency
- bandwidth fit

This keeps the MVP easy to explain during a demo while still feeling believable.

## Running locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Notes

- Local storage is used for mock persistence so the flow feels continuous across pages.
- The build script uses webpack explicitly for compatibility with this environment.
- Safety resources are easy to access because the product clearly separates peer support from crisis or medical care.
