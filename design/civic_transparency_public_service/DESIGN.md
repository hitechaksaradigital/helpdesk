---
name: Civic Transparency & Public Service
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#42493c'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#72796b'
  outline-variant: '#c2c9b8'
  surface-tint: '#386a1e'
  primary: '#36671c'
  on-primary: '#ffffff'
  primary-container: '#4e8133'
  on-primary-container: '#f8ffed'
  inverse-primary: '#9dd67d'
  secondary: '#4c662e'
  on-secondary: '#ffffff'
  secondary-container: '#cbeaa4'
  on-secondary-container: '#506a32'
  tertiary: '#9d3b3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#bd5353'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8f396'
  primary-fixed-dim: '#9dd67d'
  on-primary-fixed: '#082100'
  on-primary-fixed-variant: '#215105'
  secondary-fixed: '#ceeda7'
  secondary-fixed-dim: '#b2d08d'
  on-secondary-fixed: '#0f2000'
  on-secondary-fixed-variant: '#354e19'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b1'
  on-tertiary-fixed: '#410007'
  on-tertiary-fixed-variant: '#81262a'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: 3.5rem
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system is architected for regional public complaint and grievance resolution (Layanan Aspirasi dan Pengaduan Online Rakyat). The platform bridges citizens and civic administrators, requiring an atmosphere of institutional trustworthiness, responsiveness, and radical clarity.

The aesthetic follows **Modern Civic Corporate** with clean structural lines, deliberate whitespace, and warm organic cues. Unlike clinical administrative tools, this system replaces bureaucratic opacity with a reassuring, high-legibility interface. Visual elements project dignity, accessibility, and modern government efficiency while maintaining strict WCAG AA/AAA compliance for citizen inclusivity across diverse socio-technical contexts.

## Colors

The color palette grounds the civic experience in reassurance, authority, and structured visibility:

- **Primary Green (`#689D4B`)**: Serves as the primary operational hue, driving main calls-to-action, key navigation markers, and verified civic confirmations.
- **Secondary Sage (`#91AE6E`)**: Softens institutional presence, utilized for secondary controls, supporting indicators, category filters, and neutral badge backgrounds.
- **Tertiary / Warning Coral (`#D96868`)**: Handles destructive actions, urgent attention items, rejection statuses, and SLA escalations with high legibility.
- **Neutral Surface Canvas (`#F2F2F2`)**: The global page backdrop, providing soft contrast behind elevated white content cards.
- **Deep Slate Text (`#1E293B` & `#334155`)**: Anchors all typographic information to maintain high reading contrast without the harshness of pure black.
- **Surface Pure White (`#FFFFFF`)**: Reserved for structural containers, active input surfaces, modal dialogues, and data cards.

### Semantic Status Palette
- **Baru (New)**: Slate Blue Tint (`#3B82F6` text, `#EFF6FF` background)
- **Diverifikasi (Verified)**: Amber Warmth (`#D97706` text, `#FFFBEB` background)
- **Diproses (In-Progress)**: Primary Sage Accent (`#689D4B` text, `#F0FDF4` background)
- **Selesai (Resolved)**: Deep Evergreen (`#15803D` text, `#DCFCE7` background)
- **Ditolak (Rejected)**: Warning Coral (`#D96868` text, `#FEF2F2` background)

## Typography

The typographic hierarchy implements **Plus Jakarta Sans** for display, structural headings, and navigation labels, lending approachable modernity and legibility to civic communications. For transactional, procedural, and evidentiary narrative content, **Inter** is deployed to ensure optimal optical balance at small body sizes.

- Numerical IDs (such as complaint tracking tickets `#LAPOR-2024-XXXX`) utilize tabular figures via `tnum` font features to ensure uniform vertical alignment in tables and tracking cards.
- Line heights in body copy remain generous (`1.5rem` on base body) to support readability across civic users reading on varying quality mobile displays.

## Layout & Spacing

The layout is structured around an adaptive 12-column grid anchored by a maximum content container width of `1280px`. 

- **Desktop (>= 1024px)**: 12-column grid with `1.5rem` gutters and `2rem` page margins. Administrative layouts utilize a persistent left navigation rail (`280px`) alongside a fluid dashboard container.
- **Tablet (768px - 1023px)**: 8-column layout with `1.5rem` gutters and `1.5rem` margins. Side panels collapse into top-level contextual drawers.
- **Mobile (< 768px)**: 4-column layout with `1rem` gutters and `1rem` canvas margins. Forms reflow into single vertical stacks, with sticky bottom action drawers for submission tasks.
- Spacing rhythm adheres strictly to an 8px scale base (`0.5rem`), reserving `space-xs` (4px) solely for interior badge margins and icon-to-label gaps.

## Elevation & Depth

Visual hierarchy leverages **tonal layering and low-contrast perimeter borders** over heavy drop shadows to sustain an honest, clean civic presence.

- **Level 0 (Canvas Base)**: `#F2F2F2` background tone. Non-elevated, grounding all content.
- **Level 1 (Card & Content Surface)**: Solid `#FFFFFF` fills bounded by a crisp 1px border (`#E2E8F0`). Drop shadows are extremely subtle: `0px 1px 3px rgba(30, 41, 59, 0.04)`.
- **Level 2 (Hovered Records & Floating Controls)**: Solid `#FFFFFF` surface, 1px border (`#CBD5E1`), with ambient lift: `0px 4px 12px rgba(30, 41, 59, 0.06)`.
- **Level 3 (Modals, Citizen Detail Panels & Drawers)**: Pure `#FFFFFF` surface flanked by high-blur backdrops: `0px 12px 28px rgba(30, 41, 59, 0.10)`. Underlying pages receive a soft charcoal wash overlay (`rgba(15, 23, 42, 0.4)`).

## Shapes

The interface employs a balanced **Rounded (`2`)** geometry (`0.5rem` / `8px` default corner radius) to project approachable authority without childlike informality.

- **Standard Elements (Buttons, Inputs, Select Boxes)**: `0.5rem` border radius (`rounded-md`).
- **Cards, Filter Bars, Data Table Containers**: `1rem` border radius (`rounded-lg`).
- **Full Modals & Civic Hero Panels**: `1.5rem` border radius (`rounded-xl`).
- **Badges, Chips & Progress Pills**: Fully rounded pill shapes (`9999px`) to create clear visual contrast against rectangular form controls.

## Components

### Buttons
- **Primary**: Solid `#689D4B` background, `#FFFFFF` text, `0.5rem` radius, `0.75rem 1.5rem` padding. On hover, shifts to `#58853F`. On focus, displays a 2px outer ring offset in `#91AE6E`.
- **Secondary / Civic Outline**: `#FFFFFF` background, 1px border in `#CBD5E1`, text in `#334155`. On hover: `#F8FAFC` background and border color shifts to `#91AE6E`.
- **Destructive**: Solid `#D96868` background, `#FFFFFF` text. Used for rejecting claims, taking down reports, or cancellation.

### Status Badges & Chips
- Status badges feature rounded-full pills with `0.25rem 0.75rem` padding and uppercase `label-sm` Plus Jakarta Sans typography.
- Always combine a 6px status dot alongside the label text to prevent color-blindness misinterpretations.
- Interactive filter chips feature a soft `#FFFFFF` surface with `#E2E8F0` border; when active, they flip to `#689D4B` text and `#F0FDF4` fill with a subtle `#689D4B` ring.

### Input Fields & Selects
- Inputs sit on `#FFFFFF` backgrounds with a `1px` border of `#CBD5E1`, standard `0.5rem` rounding, and `0.75rem 1rem` interior padding.
- Focused state transitions the border to `#689D4B` accompanied by a `3px` translucent focus aura (`rgba(104, 157, 75, 0.2)`).
- Error states swap border and focus aura to `#D96868`.

### Civic Complaint Cards
- Cards feature an isolated `#FFFFFF` container with `1rem` radius, separated by 1px borders in `#E2E8F0`.
- Top header standardizes tracking ticket ID, timestamp, and status badge alignment.
- Citizen narrative utilizes `body-md` in `#334155` clamped to 3 lines on dashboard overviews, with metadata metrics (e.g., Wilayah, Instansi Terkait, Dukungan) pinned to the bottom border.

### Data Tables
- Header row renders on `#F8FAFC` with uppercase `label-sm` text in `#64748B`.
- Row cells alternate with clean horizontal `#F1F5F9` borders, featuring an active row hover effect in `#F8FAFC`.
- Integrated ticket ID columns present copy-to-clipboard icons on row focus.

### Timeline & Progress Stepper
- Sequential stages (Penerimaan -> Verifikasi -> Proses -> Tindak Lanjut -> Selesai) use a connected horizontal node timeline.
- Completed and active steps utilize `#689D4B` solid connectors and check badges; incomplete steps use muted dashed borders in `#CBD5E1`.