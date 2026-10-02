# Women Experts Roster

A permanent bilingual English/Arabic portfolio demonstration prepared by Riham Tarabay for the LLWB Women Experts Roster assignment.

## What is included

The site includes a public approved-only directory, keyword search, bilingual/RTL switching, a bilingual submission form with consent capture, a reviewer queue with approve/reject decisions, and a technical overview explaining the architecture and production hardening path.

All records are synthetic portfolio data. This is not an LLWB production system and must not be presented as a previous LLWB deployment.

## Run locally

```bash
npm start
```

The server listens on `PORT` or `3000` and serves `/`, `/submit`, `/admin`, `/overview`, and `/api/health`.

## Production hardening

Before using the workflow with real people, replace the in-memory store with managed persistence, add secure authentication and sessions, rate limiting, CSRF protection, email verification, accessibility and browser tests, dependency scanning, backups, rollback procedures, and a documented staff handover.
