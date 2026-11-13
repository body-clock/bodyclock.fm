---
sourcesHash: 4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945
id: text-input
description: Collect a single text or email value using a labeled native input and consistent form styling.
status: discoverable
sources:
  - src/styles/controls.css
---
# Text input

## When to use

- Collect single-line text, including an email address, in a form.

## When not to use

- Collect multiline text; use a textarea with a separately defined design.
- Select a boolean or option; use native selection controls.

## Public API

Use `<label class="field-label" for="email">Email address</label>` with
`<input class="input" id="email" name="email" type="email" autocomplete="email" required />`.
Use type text for general text and email for addresses. Native attributes own
values, required validation, autocomplete and disabled state; CSS does not add behavior.
Use `.field-help` for help/error text and reference its id with `aria-describedby`.
Use `aria-invalid="true"` only when the application has identified an error; supply
an accompanying textual explanation. Placeholder text is optional and is not a label.
The consumer owns field grouping, width constraints, validation and submission.

## Behaviour and states

The input fills its available width and can shrink inside flex containers. Styles
cover default, focus, disabled and explicitly invalid (dashed border) states.
Invalid state is never communicated only by color. Browser validation behavior
remains native. Minimum height is 44px and text is at least 1rem.

## Accessibility

Every input requires a unique id and associated visible label. Consumers own help
and error relationships and must not disable a field merely to communicate an error.
