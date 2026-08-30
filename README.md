# NEXORA DR TEST — Alberta Class 7 Learner Exam Platform

> **NEXORA DR TEST** is a luxury, mobile-first web application designed to prepare learners for the **Alberta Class 7 Learner's Licence Knowledge Test** with commercial precision, realistic examinations, and authoritative traffic-law fidelity based on the official Alberta Driver's Guide.

---

## 1. Product Overview

NEXORA DR TEST delivers an educational experience built on the official *Driver's Guide to Operation, Safety and Licensing: Cars and Light Trucks* published by the Government of Alberta.

### Core Pillars
- **Authoritative Real Exam Simulation**: 30 questions, 25 to pass (83.33%), **no countdown timer** (matching official Alberta registry reality), stops upon reaching 25 correct answers or when achieving 25 is mathematically impossible (6 wrong), with end-of-test grading and mistake review.
- **Visual Question Engine**: 34 handcrafted vector SVG traffic signs alongside 12 high-resolution 3D elevated driver-education diagrams generated via the Nano Banana scenario engine with programmatic vehicle marker overlays (`Vehicle A`, `Vehicle B`, `Vehicle C`).
- **Comprehensive Question Bank**: 306 validated original practice questions across 51 categories with 100% explanation coverage.
- **Bilingual & True RTL**: Complete English and Modern Standard Arabic (`dir="rtl"`) support with `IBM Plex Sans Arabic` and `Cormorant Garamond` typography.
- **Privacy-First & Offline Ready**: 100% client-side `localStorage` tracking, zero database required, zero telemetry tracking, and PWA offline support.

---

## 2. Examination & Training Modes

1. **Real Exam Simulation**:
   - 30 randomized questions generated with balanced topic weighting.
   - 25 correct answers required to pass.
   - No countdown timer (matches official registry testing).
   - No mid-test answers revealed until completion.
   - Stops upon reaching 25 correct answers or 6 incorrect responses.
2. **Practice by Category**:
   - Immediate answer validation with green/red states.
   - Instant explanation and Alberta Driver's Guide topic reference.
3. **Timed Challenge**:
   - Dedicated speed-training mode with configurable 15, 20, or 30-minute countdown timers.
   - Visual alerts at 5 minutes and 1 minute; auto-submits on 00:00.
4. **Smart Adaptive Review**:
   - Dynamically analyzes `localStorage` performance and generates tests weighted (~70%) toward categories where accuracy is below 75%.
5. **Road Sign Challenge**:
   - Practice essential Alberta regulatory, warning, and information signs with high-contrast vector illustrations.
6. **Concise Study Guide**:
   - High-yield summary cards covering Class 7 GDL restrictions, hill parking wheel orientations, speed limits, right-of-way, and school bus laws.

---

## 3. Technology Architecture

```text
nexora_dr_test/
├── index.html                           # Semantic HTML5 SPA entry point
├── manifest.json                        # PWA manifest
├── sw.js                                # Offline Service Worker cache
├── vercel.json                          # Vercel deployment configuration
├── css/
│   ├── nexora-tokens.css                # Official NEXORA color tokens & typography
│   ├── base.css                         # Layout grid, resets, ambient radial glows
│   ├── components.css                   # Buttons, mode cards, modals, lightbox
│   ├── exam.css                         # Focused exam viewport & answer cards
│   ├── results.css                      # Score ring dial, category breakdown, mistake review
│   └── responsive.css                   # Mobile breakpoints & RTL Arabic mirroring
├── js/
│   ├── config.js                        # Centralized Alberta regulatory rules (albertaConfig)
│   ├── question-engine.js               # Weighted question selection & answer shuffling
│   ├── exam-engine.js                   # Master session state machine
│   ├── timer.js                         # Independent countdown timer (Timed Mode only)
│   ├── progress.js                      # Local performance analytics & readiness algorithm
│   ├── speech.js                        # SpeechSynthesis Web Audio "Read Question" helper
│   ├── localization.js                  # English & Arabic RTL manager
│   └── app.js                           # UI orchestration & view transitions
├── data/
│   ├── questions-en.js                  # 306 validated English questions
│   └── questions-ar.js                  # 306 Modern Standard Arabic questions
├── assets/
│   ├── brand/                           # Official NEXORA logos
│   ├── signs/                           # 34 handcrafted vector SVG road signs
│   └── questions/                       # 12 Nano Banana 3D scenario diagrams
└── tests/
    ├── exam-engine.test.js              # 10,000 randomized exam runs verification suite
    └── question-validator.js            # Automated bank validation & audit script
```

---

## 4. Quality Assurance & Verification

To execute the automated test suites:
```bash
# Run question bank schema and integrity audit
node tests/question-validator.js

# Run 10,000 simulated exam runs & scoring boundary test
node tests/exam-engine.test.js
```

---

## 5. Documentation & Audit Manifests

- **Design System Discovery**: [`NEXORA_DESIGN_SYSTEM_DISCOVERY.md`](./NEXORA_DESIGN_SYSTEM_DISCOVERY.md)
- **Alberta Legal & Source Audit**: [`ALBERTA_CLASS7_SOURCE_AUDIT.md`](./ALBERTA_CLASS7_SOURCE_AUDIT.md)
- **Question Bank Quality Audit**: [`QUESTION_BANK_AUDIT.md`](./QUESTION_BANK_AUDIT.md)
- **Nano Banana Visual Manifest**: [`NANO_BANANA_VISUAL_MANIFEST.md`](./NANO_BANANA_VISUAL_MANIFEST.md)
- **Quality Assurance Report**: [`QA_REPORT.md`](./QA_REPORT.md)
- **Deployment Verification Report**: [`DEPLOYMENT_REPORT.md`](./DEPLOYMENT_REPORT.md)

---

## 6. Disclaimer

*NEXORA DR TEST is an independent educational practice tool and is not affiliated with, endorsed by, or operated by the Government of Alberta. Always consult the current Alberta Driver's Guide and Alberta.ca for official licensing requirements.*
