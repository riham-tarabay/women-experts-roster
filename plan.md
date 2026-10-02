# Women Experts Roster — Permanent Portfolio Website Plan

## Product scope

A publicly shareable bilingual English/Arabic portfolio demonstration for the LLWB Women Experts Roster concept. It will use synthetic data only, clearly state that it is not an LLWB production system, and provide a persistent public site identity with working directory, submission, and reviewer experiences.

## Implementation approach

- Use a small Node.js HTTP server with no unnecessary runtime dependencies.
- Serve a responsive single-page application from `public/` with client-side route states for `/`, `/submit`, and `/admin`.
- Expose JSON endpoints under `/api/` for approved search, profile submission, reviewer queue, moderation decisions, and health.
- Keep the portfolio demo data in the server process intentionally, with synthetic records and an explicit reset/demo notice; production-hardening notes explain the required database/authentication work.
- Add a Dockerfile and managed Webdev deployment configuration for the server listening on `PORT` (default 3000).
- Include `public/manus-routes.json` with all user-facing routes.

## Project structure

- `server.js`: HTTP server, API routes, synthetic demo store, static-file serving.
- `public/index.html`: semantic application shell and page sections.
- `public/app.js`: directory search, language/RTL switching, submission form, reviewer queue, and API interactions.
- `public/styles.css`: responsive deep-green, warm-orange, light-sage visual system with accessible focus states.
- `public/manus-routes.json`: managed route manifest.
- `Dockerfile`: production container entrypoint.
- `app.config.ts`: durable project logo metadata when an asset is available.

## Design direction

- **Design movement:** Editorial civic-tech / modern institutional design.
- **Core principles:** trustworthy, calm, human-centered, bilingual by default, transparent about scope.
- **Color philosophy:** deep green communicates public-service trust; warm orange creates an energetic action cue; sage backgrounds make dense information feel approachable.
- **Layout paradigm:** editorial split panels and flowing sections rather than a generic centered dashboard; search and review actions sit in clearly framed work areas.
- **Signature elements:** a compact “WR” wordmark badge, orange action markers, and subtle leaf-like line motifs made with CSS.
- **Interaction philosophy:** visible state changes, plain-language feedback, fast search, and clear workflow transitions from submission to review to approved discovery.
- **Animation:** short, restrained fade/slide transitions for cards and notices; respect `prefers-reduced-motion`.
- **Typography:** system sans stack for reliable multilingual Arabic/Latin rendering; oversized editorial display headings with compact labels and readable body text.
- **Brand essence:** a practical, transparent demonstration of how women’s expertise can become easier to discover for better public decisions. Personality: credible, warm, precise.
- **Brand voice:** direct and civic-minded. Example lines: “Find expertise for better public decisions.” and “Review first. Publish with care.”
- **Wordmark/mark:** a green rounded square containing “WR” with a small orange dot indicating the approval workflow.
- **Signature brand color:** deep civic green `#173f35`.

## Required behavior

- Public directory shows only approved synthetic profiles.
- Keyword search works across profile name, headline, and biography.
- Language switcher changes visible copy and direction between English and Arabic.
- Submission form requires bilingual fields and explicit consent; submitted profiles are not public until approved.
- Reviewer queue can approve or reject submissions; unauthorized moderation is rejected by the API.
- Navigation exposes directory, submit, reviewer, and technical overview areas on desktop and mobile.
- Technical overview and production-hardening notes clearly distinguish this portfolio demo from a production LLWB platform.
