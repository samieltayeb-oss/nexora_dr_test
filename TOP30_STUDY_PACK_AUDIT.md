# NEXORA DR TEST — Top 30 High-Priority Study Pack Audit

**Release Version:** V1.1  
**Audit Date:** August 2026  
**Personalization Subject:** Ahmed Sami Suliman (Age 17 • Alberta Class 7)  
**Authority:** Government of Alberta *Driver's Guide to Operation, Safety and Licensing: Cars and Light Trucks*

---

## 1. Selection Methodology & Positioning

The **Top 30 Study Pack** is a fixed, curated educational collection derived from the validated 306-question production bank. It represents core high-priority knowledge areas that every learner driver must master before attempting the official knowledge test.

> **Positioning Notice:** This study pack represents high-priority practice questions covering foundational Alberta driving rules. It does not claim statistical knowledge of confidential live examination algorithms or leaked questions.

### Selection Criteria
1. **Critical Safety & Life Protection**: Uncontrolled right-of-way, school bus flashing red lights, emergency vehicle slowdowns, railway crossings, pedestrian crosswalks.
2. **Definitive Numerical Requirements**: Specific legal distances (5m fire hydrant, 50cm parallel curb, 20m school bus, 5m–15m railway, 30m turn signal), and default speed limits (50 km/h urban, 100 km/h highway, 30 km/h school zone).
3. **Class 7 GDL Statutory Restrictions**: Age 14 minimum, accompanied driver requirements, midnight–5:00 AM driving curfew, 0.00% BAC zero alcohol/drug tolerance, 8-demerit suspension limit.
4. **Visual Scenario Clarity**: Right-of-way at uncontrolled intersections, 4-way stops, left turns on green, multi-lane roundabouts, uphill parking with curbs, and winter black ice.

---

## 2. Topic & Category Distribution (30 Questions)

| Category Group | Target | Actual Count | Selected Question IDs |
| :--- | :--- | :--- | :--- |
| **Signs & Signals** | 4 | **4** | \`SIGN-001\`, \`SIGN-002\`, \`SIGN-004\`, \`SIGN-015\` |
| **Right-of-Way & Intersections** | 5 | **5** | \`ROW-001\`, \`ROW-004\`, \`TURN-002\`, \`INT-001\`, \`INT-002\` |
| **Speed Limits & Zones** | 3 | **3** | \`SPD-001\`, \`SPD-002\`, \`SPD-004\` |
| **Parking Regulations** | 3 | **3** | \`PARK-003\`, \`PRK-001\`, \`PRK-004\` |
| **Lane Use & Turning** | 3 | **3** | \`RND-001\`, \`TRN-001\`, \`MRK-001\` |
| **Special Road Situations** | 3 | **3** | \`BUS-001\`, \`EMERG-001\`, \`RAIL-001\` |
| **Defensive Driving** | 2 | **2** | \`DEF-001\`, \`DEF-004\` |
| **Class 7 GDL Licensing** | 3 | **3** | \`GDL-001\`, \`GDL-003\`, \`GDL-005\` |
| **Driver Safety & Laws** | 2 | **2** | \`GDL-004\`, \`DEM-001\` |
| **Winter & Hazards** | 2 | **2** | \`WINT-001\`, \`WIN-001\` |
| **TOTAL** | **30** | **30** | **100% Curated & Verified** |

---

## 3. Visual Question Inventory (13 Visual Questions)

| Question ID | Concept | Visual Type | Asset Path |
| :--- | :--- | :--- | :--- |
| \`SIGN-001\` | Stop Sign | Vector SVG | \`/assets/signs/stop.svg\` |
| \`SIGN-002\` | Yield Sign | Vector SVG | \`/assets/signs/yield.svg\` |
| \`SIGN-004\` | School Zone Sign | Vector SVG | \`/assets/signs/school-zone.svg\` |
| \`SIGN-015\` | Do Not Enter Sign | Vector SVG | \`/assets/signs/do-not-enter.svg\` |
| \`ROW-001\` | Uncontrolled Intersection | 3D Scenario | \`/assets/questions/intersections/q_uncontrolled_row_01.jpg\` |
| \`ROW-004\` | Four-Way Stop | 3D Scenario | \`/assets/questions/intersections/q_four_way_stop_02.jpg\` |
| \`TURN-002\` | Left Turn on Green | 3D Scenario | \`/assets/questions/intersections/q_left_turn_green_03.jpg\` |
| \`PARK-003\` | Uphill Parking with Curb | 3D Scenario | \`/assets/questions/parking/q_uphill_curb_parking_05.jpg\` |
| \`RND-001\` | Roundabout Lanes | 3D Scenario | \`/assets/questions/roundabouts/q_roundabout_lanes_04.jpg\` |
| \`BUS-001\` | School Bus Red Lights | 3D Scenario | \`/assets/questions/school-bus/q_school_bus_red_lights_09.jpg\` |
| \`EMERG-001\` | Passing Emergency Vehicles | 3D Scenario | \`/assets/questions/emergency/q_emergency_vehicle_60kmh_10.jpg\` |
| \`RAIL-001\` | Railway Crossing Distance | 3D Scenario | \`/assets/questions/railway/q_railway_crossing_signal_16.jpg\` |
| \`WINT-001\` | Black Ice on Bridges | 3D Scenario | \`/assets/questions/winter/q_winter_black_ice_bridge_13.jpg\` |

---

## 4. Production PDF Artifacts

| Document Title | Language | Filename | Page Count | File Size | Generation Method |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Top 30 Alberta Class 7 Study Questions** | English (\`en\`) | \`downloads/nexora-dr-test-top-30-en.pdf\` | 21 Pages | ~9.5 MB | Edge Chromium Headless |
| **أهم 30 سؤالاً للمراجعة لاختبار Class 7 في ألبرتا** | Arabic (\`ar\`) | \`downloads/nexora-dr-test-top-30-ar.pdf\` | 21 Pages | ~9.4 MB | Edge Chromium Headless (RTL) |

### Design System Compliance
- **Page 1**: Luxury Cover with official NEXORA branding, product title, personalization badge for Ahmed Sami Suliman (Age 17), and August 2026 verification metadata.
- **Page 2**: Instructions, examination format (30 questions, 25 to pass), and educational disclaimer.
- **Pages 3–20**: Questions 01 to 30 formatted with questions, options, highlighted answers, detailed legal explanations, study tips, and source citations.
- **Page 21**: Ahmed's Quick Reference summary cheat-sheet table and passing score goal reminder.

---

## 5. Automated Validation Results
- \`tests/top30-validator.test.js\`: **11 Passed, 0 Failed**
- \`tests/question-validator.js\`: **306 Questions Validated, 0 Errors**
- \`tests/exam-engine.test.js\`: **15 Passed, 0 Failed**
