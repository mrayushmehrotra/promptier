<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## API Status
- **`fetch`**: Experimental (use `experimentalFetch`).
- **Middleware**: Deprecated; use `proxy` instead.
- **Images**: `images.domains` is deprecated; use `images.remotePatterns`.
- **Font**: `next/font` is stable; use the latest API.
- **Routing**: File conventions changed (e.g., `middleware.ts` -> `proxy/route.ts`).
- **API Routes**: Stable.
- **WebSockets**: Stable.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:design-system -->
# Design System — Carbon ("Productive Clarity")

This app uses IBM's **Carbon Design System** adapted for an AI prompt gallery. Every UI you write MUST follow these rules. Do not invent colours, fonts, or radius values outside this spec.

## Philosophy
Clean, systematic, accessible. Built for data-dense interfaces. Every element earns its place — no decorative noise.

## Font
- **Family**: `IBM Plex Sans` only — load from Google Fonts `?family=IBM+Plex+Sans:wght@300;400;600`
- **Icons**: `Material Symbols Outlined` — load from Google Fonts
- **Weight hierarchy** (never change size alone): Light 300 · Regular 400 · SemiBold 600
- **Scale**: body 14 px · labels 12 px · headings 20–32 px
- **Grid**: 2 px rhythm for type; 8 px grid for spacing

## Color Tokens
All values are used as Tailwind custom-color class names (e.g. `bg-primary`, `text-on-surface`).

| Token | Value | Use |
|---|---|---|
| `primary` | `#0f62fe` | Buttons, links, active states, focus rings |
| `on-primary` | `#ffffff` | Text/icons on primary bg |
| `primary-container` | `#d0e2ff` | Tinted container (e.g. Midjourney badge) |
| `primary-fixed` | `#d0e2ff` | Fixed primary surface |
| `primary-fixed-dim` | `#78a9ff` | Dim variant / inverse-primary |
| `on-primary-fixed` | `#001d6c` | Text on primary-fixed |
| `on-primary-fixed-variant` | `#0043ce` | Hover state for primary buttons |
| `on-primary-container` | `#161616` | Text on primary-container |
| `secondary` | `#6f6f6f` | Secondary text, meta labels |
| `on-secondary` | `#ffffff` | Text on secondary bg |
| `secondary-container` | `#e0e0e0` | Secondary chip/badge backgrounds |
| `secondary-fixed` | `#e0e0e0` | e.g. Stable Diffusion badge |
| `secondary-fixed-dim` | `#c6c6c6` | Dim secondary |
| `on-secondary-container` | `#525252` | Text on secondary containers |
| `on-secondary-fixed` | `#161616` | Text on secondary-fixed |
| `on-secondary-fixed-variant` | `#525252` | Variant text on secondary-fixed |
| `tertiary` | `#198038` | Success, positive states |
| `on-tertiary` | `#ffffff` | Text on tertiary |
| `tertiary-container` | `#a7f0ba` | Success chip bg (e.g. DALL-E badge, "Success" status) |
| `on-tertiary-container` | `#044317` | Text on tertiary-container |
| `tertiary-fixed` | `#a7f0ba` | Fixed tertiary surface |
| `tertiary-fixed-dim` | `#42be65` | Dim tertiary |
| `on-tertiary-fixed` | `#022d0d` | Text on tertiary-fixed |
| `on-tertiary-fixed-variant` | `#044317` | Variant on tertiary-fixed |
| `error` | `#da1e28` | Destructive actions, validation errors |
| `on-error` | `#ffffff` | Text on error |
| `error-container` | `#fff1f1` | Error bg surfaces |
| `on-error-container` | `#750e13` | Text on error-container |
| `background` | `#ffffff` | Page background |
| `on-background` | `#161616` | Primary text on background |
| `surface` | `#ffffff` | Card / panel surface |
| `surface-bright` | `#ffffff` | Brightest surface level |
| `surface-dim` | `#e0e0e0` | Dimmed surface |
| `surface-variant` | `#f4f4f4` | Subtle variant surface |
| `surface-container-lowest` | `#ffffff` | Lowest container level |
| `surface-container-low` | `#f4f4f4` | Card backgrounds, inputs |
| `surface-container` | `#f4f4f4` | Default container |
| `surface-container-high` | `#e0e0e0` | Elevated container |
| `surface-container-highest` | `#c6c6c6` | Highest container (avatars, heavy bg) |
| `surface-tint` | `#0f62fe` | Tint overlay color |
| `on-surface` | `#161616` | Primary text on surfaces |
| `on-surface-variant` | `#525252` | Secondary text on surfaces |
| `outline` | `#8d8d8d` | Borders (inputs, dividers) |
| `outline-variant` | `#e0e0e0` | Subtle borders (card hover borders, separators) |
| `inverse-surface` | `#393939` | Dark tooltip / snackbar bg |
| `inverse-on-surface` | `#f4f4f4` | Text on inverse-surface |
| `inverse-primary` | `#78a9ff` | Primary on dark surfaces |

## Border Radius Tokens
| Token | Value | Use |
|---|---|---|
| `DEFAULT` / `rounded` | `2px` | Cards, buttons (nearly square — Carbon style) |
| `rounded-lg` | `4px` | Slightly softer elements |
| `rounded-xl` | `8px` | Modals, popovers |
| `rounded-full` | `12px` | Avatar chips only |

## Elevation
- **Level 1**: `box-shadow: 0 2px 6px rgba(0,0,0,0.10)` — cards on hover
- **Level 2**: `box-shadow: 0 4px 12px rgba(0,0,0,0.12)` — modals, dropdowns
- Prefer `border-bottom: 1px solid #e0e0e0` (`border-b border-outline-variant`) for section separation over shadows
- Prefer gray background shifts (`bg-surface-container-low`) over shadows for layering

## Spacing
- **8 px grid strictly** — use multiples of 8 (8, 16, 24, 32, 40, 48)
- 2 px sub-grid for typography rhythm only
- Standard padding: 16 px (cards) · 24 px (page sections) · 32 px (main canvas)

## Components

### Buttons
| Variant | Style |
|---|---|
| Primary | `bg-primary text-on-primary`, no border-radius (2px), hover `brightness-110` or `bg-on-primary-fixed-variant` |
| Secondary / Outlined | `border border-outline-variant hover:bg-surface-container-low` |
| Ghost | Text only, `text-primary hover:underline` |
| Min touch target | 48 px height |

### Inputs
- Bottom-border style: `border-b border-outline bg-surface-container-low h-10 px-3 focus:border-primary focus:ring-0`
- Height: 40 px (h-10)
- Search: include `material-symbols-outlined` search icon, absolute-positioned left
- Scrollbar: 4 px width, `#e0e0e0` thumb, transparent track

### Cards
- Background: `bg-surface-container-low`
- Border-radius: `rounded` (2 px) — flat Carbon look, no large radius
- Padding: `p-4` (16 px)
- Hover: `hover:shadow-lg hover:border-outline-variant` with `border border-transparent` default
- No ornamental borders by default

### Navigation — Top Bar (h-12)
```
bg-white border-b border-gray-200
fixed top-0 left-0 right-0 z-50
flex justify-between items-center px-4
font IBM Plex Sans text-sm tracking-tight
```
- Active nav link: `text-primary border-b-2 border-primary pb-1`
- Inactive: `text-gray-600 hover:text-gray-900 transition-colors`

### Navigation — Sidebar (w-64)
```
bg-gray-50 border-r border-gray-200
fixed left-0 top-12 bottom-0
hidden lg:flex flex-col py-4
```
- Active item: `bg-white text-primary border-l-4 border-primary`
- Inactive item: `text-gray-600 hover:bg-gray-100 transition-all`
- Icon + label pattern: `material-symbols-outlined mr-3` with `text-xs font-medium`

### Navigation — Mobile Bottom Bar (h-16)
```
md:hidden fixed bottom-0 left-0 right-0
bg-white border-t border-gray-200 z-50
flex justify-around items-center
```
- Active: `text-primary` with `FILL=1` icon variation
- Inactive: `text-gray-500`

### Badges / Model Tags
| Model | Classes |
|---|---|
| Midjourney | `bg-primary-fixed text-on-primary-fixed-variant` |
| DALL-E | `bg-tertiary-container text-on-tertiary-container` |
| Stable Diffusion | `bg-secondary-fixed text-on-secondary-fixed-variant` |
| Success status | `bg-tertiary-container text-on-tertiary-container` |
- Common badge style: `px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider`

### Data Tables
- Zebra striping: `bg-f4f4f4` alternating rows
- Use `border-b border-outline-variant` between rows

### Masonry Grid
```css
.masonry-grid { column-count: 1; column-gap: 1rem; }
@media (min-width: 768px) { column-count: 2; }
@media (min-width: 1280px) { column-count: 3; }
@media (min-width: 1536px) { column-count: 4; }
.masonry-item { break-inside: avoid; margin-bottom: 1rem; }
```

### Image Hover Interaction (Gallery cards)
- Default: `grayscale-[20%]`
- Hover: `grayscale-0 transition-all`

## Page Routes & Screens (from Stitch designs)
| Route | Screen | Description |
|---|---|---|
| `/` or `/explore` | Exploration Gallery | Masonry grid of prompt+image cards, sidebar filters |
| `/explore` (variant) | Exploration Gallery 2 | Alternative layout / sort view |
| `/create` or `/editor` | Prompt Editor | Split-panel: left textarea + params, right generation history |
| `/leaderboard` | Monthly Leaderboard | Ranked list of top prompts / users by month |
| `/studio` | My Prompt Studio 1 | Personal prompt management dashboard |
| `/studio/collections` | My Prompt Studio 2 | Collections / saved sets view |
| `/posts/[id]` | Image Detail View | Full image + full prompt + comments + metadata |
| `/upload` | Upload Artwork | Form to upload image + enter prompt + tags + model |

## Rules — Never Violate
1. **Font**: IBM Plex Sans only. No fallback to system-ui or sans-serif stacks in headers.
2. **Colors**: Use semantic tokens above. Never use raw Tailwind gray-xxx or blue-xxx in new components — always map to the token.
3. **Radius**: Near-square (2px) for all interactive elements. `rounded-full` for avatars only.
4. **Spacing**: 8px grid. No arbitrary values like `p-3.5`.
5. **Icons**: Material Symbols Outlined only. Set `font-variation-settings: 'FILL' 0, 'wght' 400` by default. Use `FILL 1` for active/selected states.
6. **No decorative elements**: No gratuitous gradients, drop shadows, or ornamental borders. Everything is functional.
7. **WCAG AA**: All text must meet minimum contrast. Use `on-surface` (#161616) on `surface` (#ffffff) as baseline.
8. **Dark mode**: Tailwind `darkMode: 'class'` is configured. Mirror all bg/text colors with `dark:` variants where present in the HTML samples.
<!-- END:design-system -->
