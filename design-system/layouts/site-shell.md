---
sourcesHash: 4c183c94f71fc632c22b8a15b7f594b3fb2c832f541d610d926207eed7d37a77
id: site-shell
description: Arrange a publication page with a shared masthead, responsive navigation, reading column and footer.
status: discoverable
sources:
  - src/layouts/DaringLayout.astro
  - src/components/Header.astro
  - src/components/Sidebar.astro
  - src/components/Footer.astro
  - src/styles/tokens.css
---
# Site shell

## When to use

- Present a full Body Clock page that shares the site navigation and subscription entry point.

## When not to use

- Render an embedded fragment or email; use a standalone composition instead.

## Public API

Import `src/layouts/DaringLayout.astro`. Pass optional `title` and `description`
for page metadata and put page content in the default slot. Omitted metadata uses
site defaults. Article pages additionally pass `type="article"`, publication and
modification Dates, tags, optional image metadata and schema; ordinary pages use
`type="website"` (default). The shell delegates metadata generation to BaseHead.

```astro
<DaringLayout title="About">
  <h1>About</h1>
  <div class="prose"><p>Page content.</p></div>
</DaringLayout>
```

## Composition

The shell owns the masthead, navigation, footer, subscription overlay and single
main landmark. Consumers supply a single h1 and semantic page content; do not nest
another shell or main landmark. Use [Prose](../components/prose.md) for editorial
content and native page sections for the reference gallery.

The shell owns centered maximum width, outer gutter, sidebar width, column gap and
bottom padding. Children own internal composition, but must fit the available width.
At 640px and below the sidebar is replaced by wrapping horizontal navigation.
Above that breakpoint the sidebar precedes main content. The footer follows main
content and is pushed down when the page is short. No fixed main height is permitted.

## Accessibility

The shell provides a skip link to the focusable main landmark and named navigation.
Header/sidebar indicate the active navigation link with aria-current. Consumers
own their heading hierarchy and content labels. The subscription overlay remains
an application-owned interaction, not a reusable modal contract; see the ownership
boundary in [DESIGN.md](../../DESIGN.md).
