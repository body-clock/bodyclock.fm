# Tokens

[CSS definitions](../src/styles/tokens.css) are the value source of truth, including
theme overrides. All tokens are CSS custom properties; use `var(--name)`.

| Family | Type and intended use |
| --- | --- |
| `--purple-*` | Base colors; reserved for semantic definitions. |
| `--color-bg`, `--color-surface` | Canvas and inset backgrounds. |
| `--color-text`, `--color-text-muted` | Main text and secondary text on canvas/surface. |
| `--color-accent`, `--color-on-accent` | Action background and its foreground. |
| `--color-border`, `--border-color` | Decorative separators, not control boundaries. |
| `--color-control-border` | Visible input and secondary button boundaries. |
| `--color-focus` | Keyboard focus outlines. |
| `--color-backdrop` | Translucent overlay scrim. |
| `--font-display`, `--font-heading`, `--font-body`, `--font-mono` | Font stacks for masthead, headings/actions, reading and code. |
| `--text-xs` through `--text-lg` | Lengths for metadata, labels, controls and reading text. |
| `--text-h1`, `--text-h2`, `--text-h3` | Fluid heading sizes, descending in hierarchy. |
| `--leading-tight`, `--leading-normal`, `--leading-relaxed` | Unitless line heights for headings, controls and reading. |
| `--space-*` | Length scale: number times 0.25rem; use for padding, gaps and margins. |
| `--content-width` | Reading measure limit. |
| `--layout-width`, `--sidebar-width` | Shell and desktop navigation widths. |
| `--gutter`, `--gutter-mobile` | Shell insets; gutter switches at 640px. |
| `--border-width`, `--border` | Thin separator width and complete border shorthand. |
| `--border-radius`, `--radius-pill` | Control corners and tag shape. |
| `--touch-target-min` | Minimum standalone interactive target height. |
| `--duration-fast` | Brief decorative state transition; reduced motion overrides it. |

Theme roles remain stable: do not hardcode light colors in consumers. Shared token
changes affect all uses and require reviewing both themes. Component-local dimensions
(such as the subscription panel width) are not public tokens.
