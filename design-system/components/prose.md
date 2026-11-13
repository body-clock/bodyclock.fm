---
sourcesHash: 4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945
id: prose
description: Present long-form editorial content with a readable measure and consistent heading and paragraph rhythm.
status: discoverable
sources:
  - src/styles/global.css
---
# Prose

## When to use

- Render an article or informational page containing paragraphs and headings.

## When not to use

- Arrange application controls, navigation or post summaries; use their own layout.

## Public API

Wrap rendered Markdown or semantic HTML in `<div class="prose">…</div>`. Global
styles supply heading hierarchy, lists, links, code and blockquotes. Prose adds
reading width, paragraph spacing and section spacing. The caller owns the page h1,
heading order and space outside the wrapper. No density variants are supported.

## Behaviour and states

Text wraps, including long unbroken strings. Images scale to available width and
code blocks scroll horizontally. Content remains in source order at all widths.

## Accessibility

Use semantic headings, lists and quotations, meaningful link labels and image alt
text. Prose only supplies presentation; it does not repair document semantics.
