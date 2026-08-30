# NEXORA DR TEST — Quality Assurance & Testing Report

**Date of QA Signoff:** August 2026  
**Test Suite Status:** 100% PASSED (0 Failures, 0 Regressions)

---

## 1. Automated Examination Engine Verification

| Test Case | Description | Iterations / Scope | Result |
| :--- | :--- | :--- | :--- |
| **TC-01: Question Pool Integrity** | Bank size >= 250 with strictly unique IDs | 306 Questions | **PASSED** |
| **TC-02: Answer Shuffling Key Integrity** | Shuffling preserves exact \`correctAnswer\` mapping | 1,000 Iterations | **PASSED** |
| **TC-03: Exam Generation Uniqueness** | 30 unique questions per exam without duplicates | 10,000 Simulated Exams | **PASSED** |
| **TC-04: Pass / Fail Threshold Logic** | 25/30 = PASS, 24/30 = FAIL | Boundary Values | **PASSED** |
| **TC-05: Early Completion Triggers** | Stops on 25 correct (Pass) and stops on 6 incorrect (Fail) | Boundary Values | **PASSED** |
| **TC-06: Category Breakdown Summation** | Category percentages and counts sum to 30 | Random Sample | **PASSED** |
| **TC-07: Asset Existence Audit** | All 34 SVG signs on disk and 12 scenario images verified on disk | 100% Asset Paths | **PASSED** |
| **TC-08: Arabic Bank 1-to-1 Mapping** | 306 Arabic questions match English IDs and answer choices | 306 Questions | **PASSED** |

---

## 2. Timer & Mode Verification

- **Real Exam Simulation**: Verified that **no countdown clock** is rendered or active during the examination session, aligning with official Alberta registry conditions.
- **Skipped Questions**: Skipped questions cycle back before completion.
- **Passing / Failing Stops**: Stops upon reaching 25 correct answers (passing score reached) or 6 incorrect answers (passing mathematically impossible).
- **Timed Challenge Mode**: Verified countdown timer ticks accurately, emits 5-minute and 1-minute visual warnings, and automatically submits on 00:00.
- **Practice Mode**: Verified immediate answer validation (green for correct, red for wrong) with instant display of the Alberta Driver's Guide explanation.
- **Smart Adaptive Review**: Verified that questions are weighted heavily (~70%) toward categories with user accuracy < 75%.
- **Road Sign Challenge**: Verified that questions test essential regulatory, warning, and information signs.

---

## 3. Responsive & Viewport Compatibility Audit

| Device Profile | Viewport Dimensions | Layout Integrity | Touch Target Check | Result |
| :--- | :--- | :--- | :--- | :--- |
| **iPhone SE / Small Mobile** | 375px &times; 667px | No horizontal overflow | Min 52px height | **PASSED** |
| **iPhone 15 / 16 / 17 Pro Class** | 390px &times; 844px | Clean answer cards, sticky header | Min 52px height | **PASSED** |
| **Modern Android (Pixel / Galaxy)** | 412px &times; 915px | High-contrast text, clear SVGs | Min 52px height | **PASSED** |
| **iPad / Tablet Portrait** | 768px &times; 1024px | Spacious grid, centered card | Accessible touch | **PASSED** |
| **Tablet Landscape / Laptop** | 1024px &times; 768px | Dual-column results breakdown | Accessible touch | **PASSED** |
| **Desktop High-Resolution** | 1920px &times; 1080px | Max 1200px container, centered luxury UI | Full keyboard nav | **PASSED** |

---

## 4. Accessibility & Localization (RTL) Audit

- **Semantic HTML**: Semantic landmark elements (\`<header>\`, \`<main>\`, \`<section>\`, \`<nav>\`, \`<footer>\`) used throughout.
- **Keyboard Navigation**: Exam answers accessible via keys **1, 2, 3, 4** and **A, B, C, D**; Next/Previous via arrow keys; full tab indexing.
- **Speech Synthesis Audio**: "Read Question" button provides browser SpeechSynthesis audio assistance in English (\`en-CA\`) and Arabic (\`ar-SA\`).
- **Modern Standard Arabic & True RTL**: Layout completely mirrors in Arabic mode with \`dir="rtl"\`, right-aligned cards, flipped sweeps, and \`IBM Plex Sans Arabic\` typography.
- **Alt-Text Coverage**: 100% of visual scenario questions and vector signs have descriptive, non-spoiler alt-text.
