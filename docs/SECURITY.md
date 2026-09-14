# Security and Privacy Notes

This portfolio implementation follows a least-privilege design. Public routes expose only approved, intentionally public profile fields. Private contact data is excluded from public DTOs. Moderation requires a reviewer or administrator role checked on the API, not only in the UI.

Required before real deployment: Argon2id password hashing, email verification, secure HttpOnly cookies, CSRF protection for cookie-authenticated mutations, rate limiting on registration and login, input validation, dependency scanning, encrypted backups, retention/deletion procedures, consent versioning, and an incident response contact.

Prompt injection is not relevant to the core directory workflow; no LLM is required for profile publication. If future AI-assisted categorization is added, it must be advisory-only, isolated from authorization decisions, and reviewed before publication.

Do not load real expert data into the portfolio environment. Use synthetic fixtures only.
