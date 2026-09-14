# Quality, Observability, Deployment, and ADRs

## Testing and acceptance

Unit tests cover validation, state transitions, approved-only filtering, and role policy. Integration tests run the API against PostgreSQL. Playwright tests cover registration, submission, reviewer approval, rejection visibility, search filters, mobile layout, and Arabic RTL rendering. No acceptance claim should be made until these tests run in CI.

## Evaluation methodology

The key evaluation is workflow correctness rather than model quality: (1) required-field validation, (2) no unapproved public leakage, (3) reviewer authorization, (4) deterministic state transitions, (5) search/filter correctness, (6) bilingual content and RTL layout, and (7) audit completeness. Each scenario is represented as a repeatable fixture and acceptance test.

## Observability

Log structured request events with request ID, route, status, duration, actor role, and error class. Never log passwords, tokens, private contact fields, or full submitted biographies. Track API latency, 4xx/5xx rates, registration failures, moderation throughput, and database health. Alerts should be based on error rate, latency, and failed backups—not on sensitive payloads.

## Deployment

The intended non-production deployment is Dockerized API and web services with managed PostgreSQL on AWS. Use environment variables or a secrets manager, TLS termination, restricted security groups, automated database backups, health checks, and a rollback procedure. A real handover must include DNS, backup restoration, account ownership, and staff training; none of those are claimed as completed by this portfolio repository.

## ADR-001: PostgreSQL

Relational storage supports controlled categories, moderation history, audit events, and predictable filtering.

## ADR-002: API-enforced authorization

Authorization is centralized in the NestJS API because UI-only controls are bypassable.

## ADR-003: Separate public DTOs

Public and administrative response shapes are intentionally different to reduce accidental disclosure.

## ADR-004: No mandatory AI in the MVP

The roster's core value is safe directory workflow. AI categorization may be considered later, but it must not introduce privacy or publication risk into the initial delivery.
