# CFP Energy Design System

Enterprise design tokens and styling guidelines for the trade-entry platform.

## Design principles

- Professional and trustworthy
- Data-driven and analytical
- Modern enterprise SaaS
- Clean and minimal
- Geometric and structured
- Clarity over decoration

## Token locations

| Asset | Path |
| --- | --- |
| CSS design tokens | `src/design-system/tokens.css` |
| Tailwind theme | `src/design-system/tailwind-theme.css` |
| Material palettes | `src/design-system/palettes.scss` |
| Material theme | `src/design-system/material-theme.scss` |
| Material components | `src/design-system/material-components.scss` |

## Color tokens

### Primary

| Token | Value | Usage |
| --- | --- | --- |
| `--cfp-dark-blue` | `#002178` | Navigation, headings, primary text, chart primary |
| `--cfp-aqua` | `#3CF0FF` | Primary actions, focus rings, chart secondary |

### Neutral

| Token | Value | Usage |
| --- | --- | --- |
| `--cfp-white` | `#FFFFFF` | Cards, inputs, elevated surfaces |
| `--cfp-off-white` | `#FBF7F4` | Page background, muted containers |

### Secondary

| Token | Value | Usage |
| --- | --- | --- |
| `--cfp-blue` | `#006AFF` | Links, informational accents |
| `--cfp-green` | `#00D773` | Positive indicators |
| `--cfp-mid-green` | `#00875A` | Success states |
| `--cfp-yellow` | `#FFCD19` | Warnings |
| `--cfp-orange` | `#FF8708` | Highlights, tertiary chart series |

## Typography

- **Font:** Poppins (400 body, 500–600 headings)
- **Scale:** `--cfp-text-xs` through `--cfp-text-4xl`
- **Headings:** semibold, dark blue, tight tracking
- **Body:** regular, `--cfp-text-secondary` or `--cfp-text-muted` for supporting copy

### Tailwind equivalents

- Page title: `text-3xl font-semibold text-cfp-text`
- Section label: `cfp-section-title` or `text-sm font-semibold uppercase tracking-wide text-cfp-text-secondary`
- Body: `text-sm text-cfp-text-muted`

## Spacing

8px base grid via `--cfp-space-*` and Tailwind spacing scale (`p-2` = 8px, `p-4` = 16px).

- Card padding: `24px` (`p-6` / `--cfp-space-3`)
- Section gaps: `32px` (`gap-8` / `--cfp-space-4`)
- Form field grid gap: `16px` (`gap-4`)

## Layout

- Max content width: `80rem` (`max-w-7xl`)
- Medium-density Material (`density: 0`)
- Generous whitespace around cards and data blocks
- Subtle dot pattern on page shells via `.cfp-pattern-bg`

## Component guidelines

### Angular Material

- Use Material for all interactive controls (buttons, fields, selects, datepicker, cards, tables)
- Border radius: `8px` globally via theme overrides
- Shadows: `--cfp-shadow-sm|md|lg` only — no gradients or glass effects

### Buttons

- **Primary action:** `mat-raised-button color="primary"` → aqua fill, dark blue label
- **Secondary:** `mat-stroked-button`
- **Destructive:** use error palette sparingly

### Form fields

- Full width in grids: `class="w-full"`
- Table cells: `subscriptSizing="dynamic"`
- Focus outline: aqua (configured in theme)

### Cards

- Prefer `mat-card` for form sections and data panels
- Optional `.cfp-card` for Tailwind-only surfaces
- Title: semibold dark blue; avoid decorative headers

### Data visualization

```css
--cfp-chart-primary: #002178;
--cfp-chart-secondary: #3CF0FF;
```

Use `.cfp-chart-swatch--primary` / `--secondary` for legends. Add secondary palette colors only when a third+ series is required.

### Icons

- Material Symbols Outlined (`material-symbols-outlined`)
- Consistent stroke, simple geometric forms
- Default size: `20px`–`24px`

## Tailwind usage

Use Tailwind for layout, spacing, and page structure. Use Material for components.

```html
<div class="cfp-page cfp-pattern-bg">
  <header class="cfp-nav px-6 py-4">...</header>
  <main class="mx-auto max-w-7xl space-y-8 p-8">
    <mat-card>...</mat-card>
  </main>
</div>
```

## Avoid

- Gradients, glassmorphism, neumorphism
- Heavy shadows or animation
- Non-brand colors for primary UI
- Mixing Roboto with Poppins
