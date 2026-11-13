---
sourcesHash: 7a7fddf6adfe11e334614d00efa287ea2da6bf9b6cae644a04f7d11cc9dd8752
id: tag
description: Navigate to the archive for a named writing topic with a consistent linked tag.
status: discoverable
sources:
  - src/components/Tag.astro
  - src/styles/controls.css
---
# Tag

## When to use

- Link a blog post topic to its tag archive.

## When not to use

- Toggle a filter without navigation; use a native form control.
- Show a status or arbitrary badge; use plain text instead.

## Public API

Import `src/components/Tag.astro` and pass a nonempty `tag` string without a leading
hash: `<Tag tag="development" />`. The component owns the hash prefix and encodes
the tag in `/tags/…`. The caller ensures that the archive exists. No variants or
styling overrides are supported. Use `.tag-list` on a containing div for wrapping
groups; the consumer owns its position relative to other metadata.

## Behaviour and states

A native anchor navigates on activation. Hover and focus states use semantic colors.
Long labels wrap within the container; tags have a 44px minimum target height.

## Accessibility

Visible topic text names the destination. Do not nest other controls inside the tag.
The caller supplies surrounding context such as a post heading.
