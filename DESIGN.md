# Body Clock design system

Body Clock is a personal publication: expressive purple, a distinctive masthead,
serif reading text, and a quiet, narrow editorial layout. This system formalizes
that existing direction. It deliberately uses Astro and native HTML without a UI dependency.

## Sources and discovery

- [Components](design-system/COMPONENTS.md)
- [Layouts](design-system/LAYOUTS.md)
- [Patterns](design-system/PATTERNS.md)
- [Token definitions](src/styles/tokens.css) and [token usage](design-system/TOKENS.md)
- [Global typography and prose](src/styles/global.css)
- [Native control styles](src/styles/controls.css)
- Live examples: `/design-system`, implemented in [the reference page](src/pages/design-system.astro)

## Required rules

Use semantic color roles, not palette values, in components. Both system light and
dark preferences are supported automatically. Use text-muted rather than reducing
text opacity. Use on-accent only with accent backgrounds. Control borders and focus
rings have separate roles from decorative separators.

Use the shared spacing scale for gaps and insets. The shell owns page width and
outer gutters; components own internal padding; consumers own spacing between
components. The 640px breakpoint switches from sidebar to mobile navigation.
CSS variables cannot be used in media conditions, so this literal is repeated there.

Alien Block is reserved for the masthead; Recursive is for headings and actions;
Georgia is for reading; the monospace stack is for code. Use the heading scale
in semantic order, one h1 per page. Feed titles are compact h2 headings, not body text.

Buttons perform actions; links navigate. Primary buttons identify the principal
action in a region, usually form submission; secondary buttons open optional actions such as subscription. Provide
visible labels, native disabled states, and visible keyboard focus. Interactive
controls and tags use a 44px minimum target. Inline prose links retain inline sizing.
Do not nest interactive elements or replace native controls with clickable containers.
Use prose for rendered editorial content; do not apply it to navigation or forms.

New consumers must use documented APIs and classes. Do not override component
internals with local CSS; add a justified shared option and update its contract
when a new need appears. No arbitrary class/style escape hatch is supported by Button.

## Composition and ownership

The shell composes the existing Header, Sidebar, Footer and SubscribeModal. These
remain application components; this initial catalog covers shared controls, prose,
and the shell, not the subscription interaction algorithm or third-party comments.
Application scripts continue to own event handling, API calls, errors and form state.
The subscription overlay's existing focus-trapping and focus-return limitations are
outside this presentation system; it is not offered as a reusable dialog primitive.

## Brand assets

The favicon uses an outlined Alien Block “BC” monogram. The default social card
uses only the Body Clock wordmark, centered on a pale lavender canvas. Both use
the light theme's background (`#faf5ff`) and text (`#6d28d9`) colors. These static
assets deliberately keep the same colors across themes and social platforms.

[SVG favicon](public/favicon.svg) and [SVG social card](public/og-image.svg) are the
source assets. Lettering is stored as paths so rendering does not depend on fonts
installed on the visitor's device or social crawler. The font's
[OFL license](public/licenses/alien-block.txt) is included.
Run `npm run brand:generate` after editing either SVG to regenerate the multi-size
ICO and 1200×630 PNG. If the brand palette changes, update both SVG fills alongside
the token definitions. BaseHead uses the PNG for default Open Graph and Twitter
previews; explicit article hero images continue to override the default.

## Verification and maintenance

Run `npm run design:check` for contract paths, source snapshots and generated indexes.
After reviewing a changed component against its contract, refresh that contract's
snapshot with `node scripts/design-system/check-contract.mjs --update-sources-hash <contract>`.
Run `npm run design:index` after changing contract metadata or eligibility.
Run `npm run build` for Astro compilation and prerendering. See [README](README.md)
for local development. Inspect `/design-system`, blog and article pages at narrow and
wide widths, in both system themes, with keyboard navigation and reduced motion when
performing browser verification. Build and structural checks do not prove visual layout.
