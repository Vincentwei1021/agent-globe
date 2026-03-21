# TASK: Design Upgrade — Agent Globe (全球Agent点亮)

## Objective
Transform from dark space theme to a **premium, polished dark-mode-first experience** using shadcn/ui. Think: GitHub Universe meets Stripe's dark landing pages. This site is ALREADY dark-themed — so the focus is on refinement, not a complete color overhaul.

## ⚠️ CRITICAL: Preserve All Functionality
- 3D Globe rendering (globe.gl / react-globe.gl + three.js)
  - Agent points with color-by-age system (cyan→blue→purple→amber→red)
  - Tooltip on hover
  - Responsive sizing
  - DO NOT MODIFY GlobeView.tsx logic — only update wrapper/container styling if needed
- RegisterForm: agent registration with geolocation
- AgentList: scrollable agent list with hover highlight
- StatsBar: total agents, cities, countries counts
- localStorage-based data persistence
- FeedbackWidget, AdSense, SEO metadata, JSON-LD (WebApp + FAQ)
- Blog pages (2 posts + listing), Privacy, Terms
- Color legend for globe points

## Step 1: Install Dependencies

```bash
npx shadcn@latest init --defaults
npx shadcn@latest add button card badge input label separator
npm install next-themes lucide-react
npx shadcn@latest add sonner
```

When shadcn asks for base color, choose Neutral. The dark theme will be customized.

## Step 2: Design System

### Brand: Cyan/Teal (space-tech)
- Brand: oklch(0.75 0.15 195) — bright cyan-teal
- Brand muted: brand / 12%
- This is a DARK-FIRST site

### Color Palette (oklch)
Dark mode (DEFAULT):
- Background: deep space oklch(0.12 0.02 260) — slightly blue-tinted black
- Foreground: off-white oklch(0.95 0 0)
- Cards: oklch(0.16 0.015 260) with subtle border oklch(1 0 0 / 8%)
- Muted: oklch(0.22 0.01 260)
- Muted-foreground: oklch(0.60 0 0)
- Primary/brand: cyan oklch(0.75 0.15 195)

Light mode (optional, secondary):
- Background: clean white
- Cards: white with subtle border
- Brand: darker cyan for contrast

### Typography
- Keep Plus Jakarta Sans headings + Inter body
- Stats: large numbers, bold
- Agent names: medium weight

## Step 3: Component Redesign

### layout.tsx
- ThemeProvider (defaultTheme="dark" since this is a space theme)
- Toaster
- Keep AdSense exactly as-is
- Dark mode support with light as alternate

### Header
- Sticky, backdrop-blur, border-b (subtle, transparent-ish)
- Logo: "🌍 Agent Globe" — text-brand font-heading
- Nav: Blog + ThemeToggle
- Transparent feel to not compete with globe

### Hero (in page.tsx)
- Stagger fade-up: stats badge → h1 → subtitle
- "Light Up the World with AI Agents" → "AI Agents" in brand cyan
- Stats badge: brand-muted bg, brand text
- Clean, spacious

### StatsBar
- Use Card components for stat boxes
- Brand color numbers
- Grid: 3 columns
- Hover: subtle glow effect

### Globe Section
- DO NOT TOUCH GlobeView.tsx internals
- Container: clean padding, maybe a subtle brand-tinted border card
- Color legend: use Badge components, brand-consistent colors

### RegisterForm
- Use shadcn Card as wrapper
- Use shadcn Input + Label for form fields
- Use shadcn Button for submit
- Brand color submit button
- Clean form layout
- Keep all geolocation + registration logic

### AgentList
- Use Card as wrapper
- Each agent: subtle border-b or card-in-card
- Hover: brand-muted bg
- Agent type badge: use shadcn Badge
- Clean scrollable area

### About section
- Good typography
- Brand color for emphasis text
- Scroll-triggered fade-in

### Blog pages
- Update Header/Footer styling
- Brand color links

### Footer
- Minimal, border-t with subtle opacity
- Brand color on hover

### FeedbackWidget
- Brand cyan button
- Card modal

## Step 4: Dark Mode
- Default dark (as it's a space theme)
- Light mode as secondary option
- Globe should look good in both (globe itself doesn't change)
- Cards, forms, all readable in both

## Step 5: Animations
- Hero: stagger fade-up
- Stats: count-up animation or fade-in with stagger
- Globe container: fade-in when loaded
- Register form: subtle entrance
- Agent list items: stagger on load
- Cards hover: shadow + brand glow
- Scroll-triggered sections: HowTo, About, FAQ

## Step 6: Build
```bash
npm run build
```
Must build cleanly.

## Important Notes
- THREE.js and globe.gl are heavy — do NOT add framer-motion or other heavy libs
- GlobeView.tsx uses dynamic import with ssr:false — KEEP THIS
- The globe is the hero of this site — don't let UI chrome compete with it
