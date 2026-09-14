# Women Experts Roster

A bilingual (English/Arabic) portfolio application for a searchable women experts directory with expert submission, moderation, role-aware administration, privacy-conscious public discovery, and responsive UX.

> **Status:** Core portfolio MVP implemented and verified with synthetic data. It has no real LLWB users, customer data, or production usage. It is not an LLWB system and must not be represented as one.

## Problem
A civil-society organization needs a safe way for experts to submit professional profiles, for authorized staff to review and approve them, and for the public to find approved experts by discipline, location, and language.

## Implemented MVP

- Next.js + React + TypeScript web application with English/Arabic locale switching and RTL support.
- Public approved-only directory with keyword search.
- Expert submission form with bilingual fields, category, languages, and consent version.
- Reviewer queue with approve/reject actions and rejection reason.
- NestJS + TypeScript API with DTO validation, public response shaping, and server-side reviewer-role checks.
- PostgreSQL/Prisma schema for users, categories, profiles, submissions, and audit events.
- Docker Compose development environment and GitHub Actions CI checks.
- Unit workflow tests covering submission visibility and reviewer authorization.
- PRD, RFC, security, quality, observability, deployment, and ADR documentation.

## Run locally

```bash
docker compose up --build
```

Web: `http://localhost:3000`  
Submit profile: `http://localhost:3000/submit`  
Reviewer queue: `http://localhost:3000/admin`  
API health: `http://localhost:4000/health`

The current demo API uses in-memory synthetic records so the workflow can run immediately. The included Prisma schema is the persistence contract for the next deployment slice. The reviewer UI uses a demo role header; production must replace it with real authentication and secure sessions.

## Verification

```bash
cd apps/api
npm run typecheck
npm test

cd ../web
npm run build
```

## Repository structure

```text
apps/web       Next.js public directory, submission form, and reviewer UI
apps/api       NestJS REST API, DTO validation, workflow service, and tests
packages/db    Prisma schema and relational data model
docs           PRD, RFC, security, quality, observability, deployment, ADRs
```

## LLWB consultancy evidence

This project demonstrates searchable-directory delivery, submission and approval workflows, administrative interfaces, responsive bilingual UX, privacy/security thinking, database design, testing, deployment planning, and documentation. It is a portfolio demonstration, not evidence of prior LLWB delivery.

## Production-hardening backlog

Before any real deployment: connect Prisma persistence, implement password hashing and secure session authentication, add rate limiting and CSRF protection, complete email verification, add Playwright browser tests and accessibility testing, configure AWS infrastructure and backups, run dependency/security scans, and complete staff handover procedures. No real expert data should be used in the portfolio instance.
