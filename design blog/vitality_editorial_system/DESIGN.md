---
name: Vitality Editorial System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3f4a3c'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#6f7a6b'
  outline-variant: '#becab8'
  surface-tint: '#006e1c'
  primary: '#006e1c'
  on-primary: '#ffffff'
  primary-container: '#4baf4f'
  on-primary-container: '#003c0b'
  inverse-primary: '#77dc76'
  secondary: '#1b6d24'
  on-secondary: '#ffffff'
  secondary-container: '#a0f399'
  on-secondary-container: '#217128'
  tertiary: '#556158'
  on-tertiary: '#ffffff'
  tertiary-container: '#929e94'
  on-tertiary-container: '#2a352d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#93fa8f'
  primary-fixed-dim: '#77dc76'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005313'
  secondary-fixed: '#a3f69c'
  secondary-fixed-dim: '#88d982'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#d9e6da'
  tertiary-fixed-dim: '#bdcabe'
  on-tertiary-fixed: '#131e17'
  on-tertiary-fixed-variant: '#3e4a41'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

This design system is built on a foundation of **Premium Minimalism**, heavily influenced by modern editorial standards and Apple’s ethos of "clutter-free elegance." It is specifically tailored for a health and wellness audience that values clarity, professional authority, and a lightweight digital experience.

The visual narrative focuses on **breathability**. Generous whitespace is not merely an aesthetic choice but a functional one, reducing cognitive load for readers consuming long-form health content. The interface should feel "airy" and "quiet," allowing the typography and high-quality imagery to command attention. Every interaction should feel intentional, using smooth transitions and a disciplined color palette to evoke trust and a sense of well-being.

## Colors

The palette is derived directly from the organic greens of the brand's visual identity, anchored by a stark, high-contrast base.

- **Primary Green (#4BAF4F):** Used for primary brand moments and key accents.
- **Deep Forest (#2E7D32):** Reserved for high-priority Call-to-Actions (CTAs), active states, and links to ensure accessibility and professional weight.
- **Mint Tint (#E8F5E9):** A very light highlight color for card backgrounds, success states, or subtle section separation.
- **Charcoal Dark (#1A1A1A):** The primary color for typography. It provides the depth of black without the harshness, improving long-term reading comfort.
- **Pure White (#FFFFFF):** The exclusive background color to maintain a clinical, premium feel.
- **Soft Grey (#EEEEEE):** Used strictly for thin (1px) borders and dividers to structure content without creating visual noise.

## Typography

This design system utilizes **Inter** exclusively to achieve a modern, systematic look. The hierarchy is designed for an "editorial-first" experience.

- **Headlines:** Use tight letter spacing and bold weights to create a strong visual anchor.
- **Body Text:** Designed for readability. `body-lg` uses a generous 1.7 line-height, ensuring that health articles are easy to scan and digest. 
- **Labels:** Small caps are used for category tags (e.g., "NUTRITION", "FITNESS") to provide variety in the hierarchy without introducing new fonts.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain editorial control, transitioning to a flexible fluid model for mobile devices.

- **Grid System:** A 12-column grid is used for desktop. 
- **Vertical Rhythm:** A base unit of 8px dictates all padding and margins. Section gaps are intentionally large (80px+) to emphasize the "airy" brand feeling.
- **Content Width:** To ensure optimal reading speed, the main article text is constrained to a maximum width of 720px (centered), even if the container is wider.
- **Breakpoints:**
  - Mobile: < 768px (1-2 columns)
  - Tablet: 768px - 1024px (6 columns)
  - Desktop: 1025px+ (12 columns)

## Elevation & Depth

Depth is conveyed through **Low-Contrast Outlines** and **Ambient Shadows** rather than heavy gradients or traditional elevation stacks.

- **Shadows:** Use extremely diffused shadows with very low opacity: `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04)`. Shadows should feel like a soft glow rather than a physical drop.
- **Tiers:** 
  - **Level 0 (Flat):** Primary background.
  - **Level 1 (Subtle):** Cards and surfaces, defined by a 1px border in `#EEEEEE` or the ambient shadow mentioned above.
  - **Level 2 (Active):** Floating elements like dropdowns or navigation bars use a slightly stronger shadow and a backdrop-blur (10px) to simulate frosted glass.

## Shapes

The shape language is approachable yet disciplined. We use **Rounded (Level 2)** settings to strike a balance between friendly health-tech and professional publishing.

- **Standard Elements:** Buttons, inputs, and small components use 8px (0.5rem) corner radii.
- **Large Elements:** Content cards and feature images use 16px (1rem) radii to feel softer and more modern.
- **Pills:** Used exclusively for tags and category chips to differentiate them from functional buttons.

## Components

### Buttons
- **Primary:** Solid `Deep Forest (#2E7D32)` background with white text. 8px radius. On hover, transition to `Primary Green (#4BAF4F)` with a subtle lift.
- **Secondary:** Transparent background with a `Soft Grey (#EEEEEE)` border and `Charcoal (#1A1A1A)` text.

### Cards
- White background, 1px border in `#EEEEEE`.
- Use `headline-sm` for titles and `body-md` for excerpts.
- Images within cards should have a top-only 16px radius or be fully contained within a 16px radius card padding.

### Inputs
- Minimalist style: 1px light grey border, 8px radius.
- **Focus State:** Border changes to `Primary Green (#4BAF4F)` with a 2px outer "glow" in `Mint Tint (#E8F5E9)`.

### Chips & Tags
- Used for article categories. 
- Background: `Mint Tint (#E8F5E9)`; Text: `Deep Forest (#2E7D32)`. 
- Full pill radius.

### Icons
- Use Lucide or Heroicons with a `2px` stroke weight.
- Icons should always match the color of the adjacent text or use the `Deep Forest` green for interactive states.