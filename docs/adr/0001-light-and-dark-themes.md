# ADR-0001: Light and dark themes (override §1 / §10 dark-only)

- **Status:** Accepted
- **Date:** 2026-05-10
- **Decided by:** lead-dev (delegated authority via project owner)

## Context

`AGENTS.md` §1 declares "Theming: dark only" and §10 reinforces it
("don't write `dark:` Tailwind variants — the dark palette is the
only palette"). That language was inherited verbatim from the
upstream `siege-x-guide` project where the in-game reference (R6
Siege operator pages on ubisoft.com) is dark.

Marvel Rivals' visual reference is the opposite. The official
in-game hero roster screen and `marvelrivals.com` both use a
**light** periwinkle / icy-blue gradient backdrop with dark hero
cards, signal-yellow active state, and angular chevron motifs.
Shipping a dark-only UI here would diverge from the design
directive in §11 ("the project leans into the hero-card /
comic-panel aesthetic of the game itself").

The §11 hard bans (no Inter / Roboto / Arial / Space Grotesk
primary, no purple-blue-on-white gradients, no `slate-900` /
`indigo-600` / `#3B82F6` shipped as-is, no centered-hero +
3-col-features SaaS layouts, no stock `shadow-md` / `rounded-lg`
everywhere) all still apply unchanged.

## Decision

Both light and dark themes are supported. **Light is the
default** (matches the game's reference material). Dark is reached
via the existing `useAppearance` composable, which writes a
`class="dark"` toggle on `<html>` and persists the choice in
`localStorage`.

Tailwind's `dark:` variant is therefore in use. Every visual that
defines a color, border, or background ships both states.

## Consequences

- §1 "Theming: dark only" and §10 "don't write `dark:` variants"
  are superseded by this ADR. The two AGENTS.md sections have been
  edited in the same change to point here; no other §10 rules
  change (still no `@apply`, still inline utilities, still
  `clsx` + `tailwind-merge` for conditionals, etc.).
- `qa-tester` and `code-reviewer` already require both themes to be
  verified — those agents are unchanged.
- Theme tokens live in `src/style.css` as Tailwind v4 `@theme`
  custom properties, with light values at the root and dark
  overrides under `.dark`.
- Adding more themes (e.g. high-contrast, a Vanguard / Duelist /
  Strategist accent palette) is **out of scope** for this ADR.
  Treat any further theme work as a new ADR.

## Alternatives considered

1. **Keep dark-only, invert the screenshot.** Would meet §10 as
   written. Rejected because it diverges visibly from the in-game
   reference and undercuts the §11 "hero-card / comic-panel
   aesthetic of the game itself" directive.
2. **Light-only.** Rejected because dark mode is a baseline UX
   expectation in 2026, the `useAppearance` composable already
   exists in the inherited skeleton, and the qa/review agents
   already require both-theme verification.
3. **Auto-detect via `prefers-color-scheme` only, no toggle.**
   Rejected because the game's reference is unambiguously light;
   readers landing in a dark-OS browser should still see the
   reference look first.
