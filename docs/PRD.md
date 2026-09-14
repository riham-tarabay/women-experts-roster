# Product Requirements Document

## Objective
Provide a secure, bilingual online roster where women experts can submit profiles for review and authorized organization staff can approve, manage, and publish profiles.

## Users

| User | Need |
|---|---|
| Expert | Register, complete a profile, understand privacy choices, submit for review, and edit rejected submissions. |
| Public visitor | Search and filter approved experts on mobile and desktop without seeing private fields. |
| Reviewer | Review submissions, request changes, approve/reject, and record a reason. |
| Administrator | Manage users, categories, content, permissions, and audit records. |

## Functional requirements

1. Experts can register and submit a structured profile in English and/or Arabic.
2. The system validates required fields and records consent before submission.
3. Reviewers can approve, reject, or return a profile with a reason.
4. Only approved profiles are publicly searchable.
5. Visitors can filter by professional category, location, language, and keyword.
6. Administrators can manage categories, user roles, and publication status.
7. The system records security-sensitive actions in an audit log.
8. Staff can export a documented data-handling and moderation procedure.

## Non-functional requirements

- Responsive on current desktop and mobile browsers.
- Arabic RTL layout must be treated as a first-class interface, not a translated afterthought.
- Server-side authorization must protect every moderation action.
- Private contact information must never be returned by public endpoints.
- Automated unit, integration, and browser acceptance tests are required before handover.
- Deployment must be reproducible from Docker and documented for staff.

## Acceptance criteria

A reviewer can create a test account, submit a profile, approve it, and see it in public search; a rejected profile does not appear publicly; an unauthorized user cannot approve; Arabic content renders RTL; and audit records identify who changed publication state and when.
