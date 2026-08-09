# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Answered by the existing codebase: plain static HTML/CSS/JS, no build step, no framework. Self-hosted fonts and images, no external CDNs. Deployed to Vercel as a static site (`vercel.json` sets `cleanUrls` plus long-cache headers for `/fonts` and `/images`). Multi-page work continues in this stack — one `.html` file per route, shared `styles.css` and `script.js`.

## Users

**Athletes** — in-season, injured, or leaving the game. Facing identity loss, pressure, and decisions about what comes after competition.

**Young people** — students and early-career, under pressure and expectation, working out who they are and where they are headed. Their **parents and guardians** are a secondary audience who often initiate contact on their behalf.

**Businesses** — founders and small teams at a crossroads, needing to change direction without losing momentum.

The shared situation across all three is a *turning point*: the visitor arrives already knowing something has to change, and does not yet know what. They are not comparison-shopping a category; they are deciding whether to talk to one specific person.

## Product Purpose

A single-practitioner practice offering two linked services:

1. **Life and professional counseling** for athletes and young people — mental performance, identity beyond the sport, pressure, transitions.
2. **Management consulting** for athletes and businesses — career, brand and transition planning; business strategy, operations and growth; decision support.

The site's job is to make a stranger at a turning point trust one person enough to book the free first conversation. Success is a booked consult, not a page view.

## Positioning

One practitioner covers both the inner game and the outer one. Most providers do one or the other: a therapist who cannot advise on a career move, or a consultant with no standing to discuss identity or pressure. Pivot's claim is that these are the same problem for the same person, and it does not split them across two providers.

The governing idea, and the source of the name: **a pivot keeps one foot planted while the other changes direction** — forward motion without losing footing. Slogan: *Find your pivot.*

## Operating Context

- Sessions run in person and online.
- First consult is free, with a stated one-business-day response.
- Contact today is asynchronous: the site's form opens the visitor's own email client via `mailto:`; nothing is stored server-side. There is no booking system, CRM, payment, or login.
- The visitor is frequently arriving in a difficult moment, often on a phone, often after a private search. Discretion matters more than volume.
- For the young-person audience, the person filling in the form is often a parent, not the client.

## Capabilities and Constraints

- Static site, no server, no database, no auth. Any form submission is `mailto:` unless the user later wires a form service or serverless endpoint.
- No external CDNs; fonts and images are self-hosted and committed to the repo.
- Confidentiality is a hard product constraint: the site must never imply it stores or transmits what a visitor types.
- Route set (confirmed): Home, Who I Help, Counseling, Consulting, Approach, About, Contact — seven routes, with the two services split into dedicated pages.
- **Undecided / not yet supplied:** practitioner's name, credentials, licensure, headshot, and personal bio; real contact email and phone; service pricing; geographic service area; legal or professional disclosures a counseling practice may require in its jurisdiction.

## Brand Commitments

- Legal name **Pivot Business Solutions LLC**; short form **Pivot**.
- Slogan **"Find your pivot."**
- The **pivot** concept — one foot planted, the other turning — is the durable idea behind the name and survives any visual rework.
- Voice is **first person singular**. One practitioner speaking directly to one person. Plain, direct, non-clinical; no hype, no jargon, no motivational-poster register.
- Confidential, judgement-free, and practical are stated commitments, not decoration.

## Evidence on Hand

**Real:** the service description and the two-service structure; the free-first-consult offer; the one-business-day response commitment; in-person and online delivery.

**Placeholder — must not be published as fact.** The user has confirmed these stay in the design as *clearly marked* placeholders, with a replacement checklist at handoff:

- Stats: `12+` years, `300+` clients (`100%` confidential is a real commitment, not a statistic).
- Testimonials attributed to "Marcus T.", "Denise R.", "Andre & Co." — invented.
- Email `hello@pivotbusinesssolutions.com`, phone `(555) 012-3456` — invented.
- Photography in `/images` is stock (Unsplash), not the practice's own.

**Absent, and not to be fabricated:** practitioner name, credentials, licence numbers, years in practice, client counts, case studies, press, certifications, association memberships, pricing.

## Product Principles

1. **One turning point, two services.** Every route makes it obvious that the counseling and the consulting are the same practitioner solving the same moment from two sides.
2. **A person, not a firm.** The visitor is deciding whether to trust an individual. First-person voice, direct address, no corporate distance.
3. **Never invent credibility.** Placeholder proof is labelled as placeholder. The site earns trust through specificity and method, not through numbers nobody can verify.
4. **The free conversation is the only conversion.** Every page ends with a path to it; nothing else competes for the primary action.
5. **Discretion over volume.** A visitor in a hard moment, often on a phone, must never feel marketed at, tracked, or exposed.

## Accessibility & Inclusion

No jurisdiction-specific standard has been established. Product-driven requirements: the site is used by people under stress and by minors' guardians, so it must stay fully keyboard operable, respect `prefers-reduced-motion`, hold legible contrast at small sizes, and remain completely usable on a phone in one hand.
