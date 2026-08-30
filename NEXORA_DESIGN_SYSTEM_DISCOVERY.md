# NEXORA Design System Discovery & Forensic Audit

## 1. Projects Inspected
During the Phase 0 discovery, the following local projects and directories were analyzed:
- `C:\Users\mcreg\Desktop\NEXORA Codex Lab\benchmark-1\brand-system` (Authoritative Brand Source)
- `C:\Users\mcreg\Desktop\NEXORA Drive` (Next.js 15, Tailwind, Automotive Intelligence Application)
- `C:\Users\mcreg\Desktop\NEXORA Codex Lab\nexora-flagship-antigravity` (Next.js Flagship Corporate Platform)
- `C:\Users\mcreg\Desktop\Nexora Clinic` (Healthcare Enterprise Brand Suite)
- `C:\Users\mcreg\Desktop\NEXORA WMS` (Warehouse Operations Enterprise Platform)
- `C:\Users\mcreg\Desktop\NEXORA work\Bluemoon_construction` (Commercial Architecture System)

## 2. Strongest Authoritative Source
The most authoritative source for foundational brand guidelines is **`NEXORA Codex Lab\benchmark-1\brand-system\00_NEXORA_MASTER_PROMPT.txt`** alongside the live implementation tokens in **`NEXORA Drive\src\app\globals.css`** and **`nexora-flagship-antigravity\src\app\globals.css`**.

## 3. Brand Identity & Color Tokens
The color palette represents a luxury, executive, dark-room aesthetic:

| Token Name | Hex / CSS Value | Semantic Role |
| :--- | :--- | :--- |
| `--color-nx-black` | `#080808` | Primary background canvas (70–80% of composition) |
| `--color-nx-near` | `#111111` | Secondary elevated surface / cards |
| `--color-nx-elevated` | `#1a1a1a` | High-elevation panels, active cards, dropdowns |
| `--color-nx-gold` | `#C49A10` | Signature primary gold accent (1–2 key focal points) |
| `--color-nx-gold-hover` | `#E5B830` | Hover state for gold interactive elements |
| `--color-nx-amber` | `#6B4F08` | Deep amber tertiary / shadow accent |
| `--color-nx-ivory` | `#F2EDE4` | Primary text (warm cream, strictly never cold pure `#FFF`) |
| `--color-nx-muted` | `#ADA89F` | Secondary text (refined warm grey) |
| `--color-nx-dark-muted` | `#5C5852` | Tertiary labels, disabled states, subtle metadata |
| `--color-nx-gold-arabic` | `#D4AF37` | Dedicated Arabic headline gold accent |
| `--color-nx-gold-surface` | `rgba(196, 154, 16, 0.06)` | Subtle gold container tint / glass fill |
| `--color-nx-gold-border` | `rgba(196, 154, 16, 0.14)` | Fine gold outline / accent borders |
| `--color-card-border` | `rgba(255, 255, 255, 0.05)` | Default structural panel border |

## 4. Typography System
- **Headlines / Display**: `Cormorant Garamond`, light weight (`300`), tracking `-0.025em`, line-height `0.92–1.05`. Key words may use italic gold emphasis.
- **Body / Interface**: `DM Sans`, weights `300` (light default) and `400` (emphasis), tracking normal, clean readability.
- **Eyebrows / Codes / Badges**: `Space Mono` / monospace, `9–11px`, UPPERCASE, letter-spacing `0.20em` to `0.35em`.
- **Arabic Display**: `IBM Plex Sans Arabic`, weight `700`.
- **Arabic Body**: `Noto Naskh Arabic` / `IBM Plex Sans Arabic`, weight `400`.

## 5. Border & Radius Rules
- **Border Thickness**: Strictly `0.5px` (rendered via fine subpixel borders / `0.5px solid ...`). Never bulky `2px` or heavy strokes.
- **Border Radii**: Minimal, architectural precision (`2px` to `6px` for cards and badges; fully rounded pills only for small status indicators).

## 6. Motion & Animation Language
- **Philosophy**: Structural, slow, cinematic, and invisible when done right (`0.4s` to `0.8s` cubic-bezier easing).
- **CTA Sweep**: Underline sweep animation (`.cta-sweep::after`) transitioning `width: 0 -> 100%` on hover.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`.

## 7. Logo & Brand Assets
- Official primary logo: `Brand/logo-primary.png` and vector mark.
- Dark mode rendering: `mix-blend-mode: lighten`.
- Subtitle convention: `NEXORA DR TEST — Alberta Class 7 Learner Prep`.
