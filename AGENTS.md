# Trade Entry — AI Instructions

Instructions for AI assistants working on this repository.

## Project overview

**Trade Entry** is a CFP Energy web app for entering commodity trades. Users fill a trade form; the app auto-generates monthly commitment legs from tenor dates and quantity rules, then submits to Airtable.

| Aspect | Detail |
| --- | --- |
| Client | Angular 19 SPA in `frontend/` |
| Deployment | GitHub Pages via `npm run build-github` (base-href: `https://timeoutguy.github.io/trade-entry/`) |
| Auth | Optional Microsoft Entra ID (MSAL) — disabled by default |
| Data | Airtable submission — stubbed; logs payload when not configured |
| Backend | None yet — monorepo has frontend only |

## Repository structure

```
trade-entry/
├── AGENTS.md              # This file
├── frontend/              # Angular app — run all npm commands here
│   ├── src/app/
│   │   ├── core/          # Services, models, guards, config
│   │   ├── features/      # Feature pages and components
│   │   │   ├── trade-entry/
│   │   │   └── auth/
│   │   └── shared/        # Utils, validators, adapters
│   ├── src/design-system/ # CFP tokens, Material theme, Tailwind theme
│   ├── src/environments/  # Runtime config (do not commit real values)
│   └── docs/              # Human docs (design system)
└── .git/
```

Do not move frontend files back to repo root. Do not add `backend/` unless explicitly requested.

## Architecture and conventions

### Stack

- Angular 19 (standalone components only — no NgModules)
- Angular Material + Tailwind CSS 4
- RxJS 7, Angular signals
- MSAL Angular (`@azure/msal-angular`) for optional auth
- Karma + Jasmine for unit tests

### Folder layout

| Folder | Purpose |
| --- | --- |
| `core/services/` | Singleton services (`providedIn: 'root'`) |
| `core/models/` | Domain types, enums, default factories |
| `core/guards/` | Route guards |
| `core/config/` | App-wide config (e.g. MSAL providers) |
| `features/<name>/` | Page components, feature-specific components, form builders |
| `shared/utils/` | Pure utility functions |
| `shared/validators/` | Custom reactive form validators |
| `shared/adapters/` | Angular adapters (e.g. date) |

### Patterns to follow

- **Components:** Standalone, `templateUrl` for templates, `imports` array for deps
- **Pages:** Named `*.page.ts` (e.g. `trade-entry.page.ts`)
- **Forms:** `ReactiveFormsModule`; form group setup in `*.builder.ts`; validators in `shared/validators/`
- **State:** `signal()` for local UI state; RxJS `Observable` only for async flows (e.g. submit)
- **Services:** `@Injectable({ providedIn: 'root' })`, `private readonly` constructor deps
- **Routing:** Lazy `loadComponent` imports; `authGuard` on main route (`app.routes.ts`)
- **Dates:** UK locale (`en-GB`), `IsoDateAdapter`, helpers in `shared/utils/date.utils.ts` — use these; do not add date libraries
- **Naming:** kebab-case files, PascalCase classes, match existing suffixes (`.service.ts`, `.builder.ts`, `.page.ts`)

### Auth behavior

Auth is opt-in via `environment.auth.enabled`:

- **Disabled (default):** `authGuard` passes; `AuthService.isAuthenticated()` returns `true`; MSAL providers optional
- **Enabled:** MSAL redirect flow; routes `/redirect` and `/login-failed` handle auth callbacks

### Environment config

Copy `frontend/src/environments/environment.example.ts` to `environment.ts` and `environment.prod.ts`. Never commit real credentials.

```typescript
// Config shape (see environment.interface.ts)
environment.auth      // MSAL clientId, authority, redirect URIs, scopes
environment.airtable  // baseId, apiKey, tableName, enabled flag
```

## Domain model

### Trade form (`TradeFormValue`)

Key fields: `tradeDate`, `contractRef`, `trader`, `tradeLocation`, `tenorStart`, `tenorEnd`, `client`, `direction`, `quantityMode`, `quantity`, `deliveryUnit`, `quality`, `tolerance`, `toleranceOption`, `incoterm`, `incotermLocations`, `index`, `price`, `premiumCurrency`, `paymentType`, `paymentDays`, `paymentTrigger`, `modeOfTransport`, `broker`, `specs`, `comment`.

### Enums (const arrays in `trade.models.ts`)

| Constant | Values |
| --- | --- |
| `TRADERS` | Maxime Florentin, Sidoine Pate |
| `TRADE_LOCATIONS` | France, Switzerland |
| `DIRECTIONS` | Buy, Sell |
| `DELIVERY_UNITS` | T, m3 |
| `TOLERANCE_OPTIONS` | Buyer, Seller |
| `PREMIUM_CURRENCIES` | USD, EUR |
| `MODES_OF_TRANSPORT` | Truck, Truck/Barge, Barge, ISO Tank |
| `QuantityMode` | `total` \| `perMonth` |

### Monthly commitments

`MonthlyCommitment` extends `TradeFormValue` with:

- `legNumber` — `{contractRef}{YYMM}{tradeLocation}` (e.g. `ABC2506France`)
- `commitmentMonth` — ISO date string for the leg month
- `monthIndex` — 1-based index within generated set

### Business logic (`TradeCalculationService`)

1. **Month counting:** `enumerateCalendarMonths(tenorStart, tenorEnd)` — inclusive calendar months
2. **Quantity split:**
   - `perMonth` — same quantity repeated per month
   - `total` — floor-divide across months; remainder added to last month
3. **Override:** User can override suggested month count; effective months = slice of tenor range
4. **Generation:** `generateMonthlyCommitments(trade, monthCount)` produces one `MonthlyCommitment` per month

### Airtable (`AirtableService`)

Stub implementation. When `airtable.enabled` is false, logs payload to console and returns success. Real REST API not wired — do not implement unless explicitly requested.

## Development workflow

All commands run from `frontend/`:

```bash
cd frontend
npm install
npm start              # ng serve → http://localhost:4200
npm test               # Karma unit tests
npm run build          # Production build → dist/
npm run build-github   # GitHub Pages build with correct base-href
```

### First-time setup

```bash
cd frontend
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.example.ts src/environments/environment.prod.ts
```

Edit `environment.ts` for local dev. For `environment.prod.ts`, set `production: true` and production redirect URIs.

MSAL setup: register SPA in Microsoft Entra admin center; add redirect URI `http://localhost:4200/redirect`; set `auth.enabled: true` and `auth.clientId`.

See [frontend/README.md](frontend/README.md) for more detail.

## UI and design system

Follow the CFP Energy design system. Full token tables and component guidelines:

**[frontend/docs/design-system.md](frontend/docs/design-system.md)**

Quick rules:

- **Material** for interactive controls (buttons, fields, selects, datepicker, cards, tables)
- **Tailwind** for layout, spacing, page structure
- **Tokens:** `--cfp-*` CSS vars and `cfp-*` Tailwind classes — no off-brand colors
- **Page shell:** `.cfp-page`, `.cfp-pattern-bg`, `max-w-7xl` content width
- **Typography:** Poppins only — no Roboto mixing
- **Avoid:** Gradients, glassmorphism, heavy shadows, decorative animation

Token files live in `frontend/src/design-system/` (`tokens.css`, `tailwind-theme.css`, `palettes.scss`, `material-theme.scss`, `material-components.scss`).

## AI guardrails

### Do

- Keep changes scoped to the requested feature
- Match existing naming and folder placement
- Reuse validators (`shared/validators/trade.validators.ts`) and date utils before adding new ones
- Use `createDefaultTradeFormValue()` and `buildTradeForm()` patterns for form changes
- Link to `frontend/docs/design-system.md` for styling — do not duplicate token docs
- Run commands from `frontend/` directory

### Don't

- Add NgModules, NgRx, or alternative UI frameworks
- Commit `environment.ts`, `environment.prod.ts`, or secrets
- Wire Airtable REST API unless explicitly requested
- Move frontend files to repo root or restructure monorepo unprompted
- Add backend scaffolding unprompted
- Add date/time libraries — use `date.utils.ts` and `IsoDateAdapter`
- Add tests unless asked or covering non-trivial new logic

### Tests

Karma + Jasmine. Existing specs: `*.spec.ts` alongside source. Match their style. Only add tests when requested or when logic is complex enough to warrant coverage (e.g. calculation edge cases).
