---
sourcesHash: 044f56a14771da3ebee261fd6a7c72ee66522ba75a86c742fbd185e1d35a48b9
id: button
description: Perform a native button action with primary principal-action or secondary optional-action emphasis.
status: discoverable
sources:
  - src/components/Button.astro
  - src/styles/controls.css
---
# Button

## When to use

- Invoke an action in the current page, including form submission or opening subscription.

## When not to use

- Navigate to another URL; use a native anchor instead.
- Represent a persistent on/off choice; use a native checkbox instead.

## Public API

Import `src/components/Button.astro`. Supply a visible text label in the default slot.
`variant="primary"` (default) is for the principal action in a region, usually form submission; `secondary` is for
optional actions such as opening the subscription form. Use `type="submit"` inside
forms; the default `button` deliberately does not submit. Native button attributes
are forwarded for `disabled`, `id`, `name`, `value`, ARIA and data hooks. Class and
style overrides are not supported. The component owns internal spacing and minimum
height; the consumer owns placement and action handlers.

```astro
<Button type="submit">Subscribe</Button>
<Button variant="secondary" data-subscribe>Subscribe</Button>
```

## Behaviour and states

Native activation and disabled behavior apply. Hover colors, keyboard focus and
reduced-motion styling come from the shared styles. For pending requests, the
consumer changes the label and sets disabled; the component does not own async state.
A long label may wrap and must not be given a fixed height.

## Accessibility

Native button semantics and keyboard activation are preserved. Consumers provide
a meaningful label and any controlled-region relationship. Never put links or
other controls inside the label. BaseHead must load global styles.
