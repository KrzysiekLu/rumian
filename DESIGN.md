---
name: Modern Architectural Real Estate
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#6d5b4a'
  on-secondary: '#ffffff'
  secondary-container: '#f4dbc5'
  on-secondary-container: '#715f4e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2f'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#f7dec8'
  secondary-fixed-dim: '#dac2ad'
  on-secondary-fixed: '#25190c'
  on-secondary-fixed-variant: '#544434'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.025em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a refined, approachable, and authoritative modern real estate presence. Rejecting high-gloss luxury clichés and aggressive sales tropes, the aesthetic is rooted in warm minimalism and architectural poise. The visual tone is composed, transparent, and trustworthy—mirroring an experienced advisor who leads with integrity and market fluency.

The system relies on generous spatial margins, understated linear clarity, and balanced, contemporary geometry. Crisp structure and quiet warm-neutral surfaces allow property imagery and critical data to claim primacy while maintaining a grounded, human touch.

## Colors

The palette grounds the interface in deep architectural authority balanced by soft natural warmth:

- **Primary (`#0F172A`)**: Deep Slate Navy. Used for core brand identity, high-contrast headline typography, primary interactive actions, and foundational structural markers.
- **Secondary (`#94806D`)**: Warm Architectural Stone. A muted, tactile sand tone reserved for focal highlights, badge backgrounds, premium accenting, and key contextual indicators without aggressive saturation.
- **Tertiary (`#334155`)**: Slate Blue Gray. Supports secondary content hierarchy, metadata labels, structural lines, and muted interactive states.
- **Neutral Canvas (`#F8FAFC`)**: Soft Warm Slate Neutral. Defines the primary canvas surface, paired with `#FFFFFF` for elevated foreground cards and `#E2E8F0` for subtle boundaries.

### Functional Roles
- **Canvas Base**: `#F8FAFC`
- **Surface Elevation (Cards, Panels)**: `#FFFFFF`
- **Subtle Surface Container**: `#F1F5F9`
- **Border Crisp Lines**: `#E2E8F0` (standard) and `#CBD5E1` (active/focus)
- **Text Primary**: `#0F172A`
- **Text Muted / Metadata**: `#64748B`

## Typography

The typographic system pairs Plus Jakarta Sans for structural headings and user actions with Inter for sustained body reading. This creates a human, contemporary balance devoid of decorative serif mannerisms.

- **Headlines & Display**: Plus Jakarta Sans delivers structural warmth and clean geometric balance. Subtle negative tracking on titles tighter than 24px delivers editorial density without compromising readability.
- **Body & Data**: Inter provides uncompromised legibility for property specs, valuation numbers, neighborhood descriptions, and legal disclosures.
- **Labels & Microcopy**: Compact Plus Jakarta Sans variants maintain geometric sharpness on filters, badges, buttons, and tabular specs.

## Layout & Spacing

The layout is built upon a 12-column responsive fluid grid pinned to an intentional maximum container width of `1280px` for balanced desktop viewing.

### Breakpoints & Behavior
- **Mobile (< 768px)**: 4-column flow. Outer margin `1rem` (`margin-sm`), gutter `1rem` (`gutter-sm`). Components stack vertically, property grids transition to a single column or swipeable rails.
- **Tablet (768px – 1023px)**: 8-column flow. Outer margin `1.5rem` (`margin`), gutter `1.5rem` (`gutter`). Property cards display in 2-column arrays.
- **Desktop (≥ 1024px)**: 12-column system. Outer margin `3rem` (`margin-lg`), gutter `2rem` (`gutter-lg`). Enables multi-pane split layouts (e.g., interactive map alongside listing listings).

Spacing rhythm enforces consistent air around listings and copy blocks: cards use `space-lg` inner padding, metadata chips rely on `space-xs` and `space-sm` gaps, and section intervals use `space-xl` to maintain clean visual breathing room.

## Elevation & Depth

Visual hierarchy combines low-contrast outlines with soft, architectural ambient shadows. Rather than relying on stark, heavy dropped shadows, layers feel physically resting on soft stone surfaces.

### Surface Tiers
- **Tier 0 (Canvas)**: `#F8FAFC` base page background.
- **Tier 1 (Surface Containers & Cards)**: `#FFFFFF` paired with a 1px boundary of `#E2E8F0` and an ambient diffuse shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Tier 2 (Interactive Floating & Hover States)**: Lifted cards and dropdowns introduce slightly deeper diffusion: `0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`.
- **Tier 3 (Modals & Overlays)**: Dialog surfaces carry crisp `#E2E8F0` framing backed by `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

All borders are 1px solids; contrast is achieved by balancing crisp boundary tones against soft ambient falloff.

## Shapes

The design system utilizes soft, controlled corner geometry (`roundedness: 1`). This yields a modern architectural profile that feels approachable without slipping into overly playful or bubbly motifs.

- **Standard Inputs, Badges, Buttons**: `0.25rem` (4px).
- **Cards, Image Frames, Modals (`rounded-lg`)**: `0.5rem` (8px).
- **Hero Image Masks & Large Modules (`rounded-xl`)**: `0.75rem` (12px).
- **Pills**: Exclusively reserved for status chips (e.g., "Active", "Pending", "Under Contract").

## Components

### Buttons
- **Primary**: Solid `#0F172A` background, `#FFFFFF` text, `0.25rem` border radius. Hover shifts to `#1E293B` with subtle elevation.
- **Secondary**: Crisp 1px `#E2E8F0` border, `#FFFFFF` background, `#0F172A` text. Hover shifts background to `#F8FAFC` and border to `#CBD5E1`.
- **Accent**: Solid `#94806D` background with `#FFFFFF` text, reserved for high-intent conversions (e.g., "Schedule Private Tour"). Hover shifts to `#7E6C5B`.
- **Heights**: Primary actions are 44px on desktop (48px mobile touch targets) with horizontal padding of `space-md` (`1rem`).

### Listing & Property Cards
- Built on `#FFFFFF` base with 1px `#E2E8F0` stroke and `0.5rem` radius.
- Imagery anchors the top edge with unrounded inner corners or framed within an internal padding shell. Aspect ratio fixed at 16:10 or 4:3.
- Metadata (Beds, Baths, SqFt) structured using horizontal lists separated by muted vertical line tokens (`#CBD5E1`).
- Price displayed using `headline-md` in `#0F172A`, paired with location markers in `body-sm` (`#64748B`).

### Chips & Filter Badges
- Filter toggles use `rounded-md` (4px) with `#FFFFFF` background, 1px `#E2E8F0` border, and `body-sm` text. Active state fills with `#0F172A` and white text.
- Status badges ("Just Listed", "Pending") utilize a subtle pill shape (`rounded-full`), padded `0.25rem 0.75rem`, employing warm stone background `#F1EFEB` with deep `#574A3E` text.

### Form Inputs & Search Fields
- Single-line inputs and dropdowns use a 44px container, `#FFFFFF` fill, 1px `#E2E8F0` boundary, and `body-md` typography.
- Focus state switches border to `#0F172A` with an ambient 2px slate outline (`rgba(15, 23, 42, 0.08)`). No colored focus glows.
- Comprehensive search bars feature segment dividers separating location, property type, and price range within a unified white pill or soft container.

### Checkboxes & Radio Controls
- Square 18px checkboxes with 3px subtle radius. Unchecked border `#CBD5E1`; checked state transitions to `#0F172A` fill with a sharp white checkmark.
- Radio buttons maintain the same slate border with a centered `#0F172A` dot upon selection.

### Agent Bio & Direct Contact Module
- Anchored card combining a professional square-cut headshot (soft `0.5rem` radius), broker license verification label in `label-sm`, and rapid communication CTAs (Call, Email, Book).
- Styled with warm neutral `#F8FAFC` backing and subtle stone accent highlights to reinforce human approachability alongside formal license credentials.