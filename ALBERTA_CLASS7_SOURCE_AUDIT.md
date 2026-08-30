# Alberta Class 7 Learner's Licence Source & Legal Audit

**Audit Retrieval Date:** August 2026  
**Jurisdiction:** Province of Alberta, Canada  
**Authoritative Regulatory Body:** Government of Alberta (Ministry of Transportation and Economic Corridors / Service Alberta)

---

## 1. Source Hierarchy & Precedence

1. **Primary Authority (Binding Official Rules):**
   - *Driver's Guide: Cars and light trucks* (Government of Alberta official publication)
   - *Alberta.ca — Driver knowledge tests* (`https://www.alberta.ca/driver-knowledge-tests`)
   - *Alberta.ca — Get a Class 7 learner's licence* (`https://www.alberta.ca/get-a-class-7-learners-licence`)
   - *Traffic Safety Act* (RSA 2000, c T-6) and *Operator Licensing and Vehicle Control Regulation* (Alta Reg 320/2002)

2. **Historical Official Supporting Material:**
   - Registry Agent training manuals and testing interface specifications (used only for workflow validation where still consistent with current statutes).

3. **Third-Party Sources (Non-Authoritative):**
   - Commercial driving schools and web practice tests are strictly restricted to UI/UX comparative benchmarking and are **never** used to establish traffic laws or scoring logic.

---

## 2. Authoritative Examination Specifications

| Parameter | Official Alberta Rule | NEXORA DR TEST Implementation | Validation Status |
| :--- | :--- | :--- | :--- |
| **Question Count** | 30 multiple-choice questions | Exactly 30 randomized questions per exam | Validated / Alberta.ca |
| **Passing Score** | 25 correct answers (83.33%) | 25 / 30 required to pass | Validated / Alberta.ca |
| **Exam Duration** | No official time limit at registries | **Real Exam**: No timer<br>**Timed Challenge**: Optional 15/20/30m | Validated / Alberta.ca |
| **Attempt Limit** | Once per calendar day at registries | Unlimited practice; state stored locally | Educational practice |
| **Languages** | 25 languages including Arabic | English + Modern Standard Arabic (RTL) | Validated / Alberta.ca |
| **Audio Assistance** | Available for candidates requiring narration | Web Speech API speech synthesis option | Validated / Alberta.ca |
| **Question Skipping**| Candidates can skip questions and return | Full skip & review mechanism | Validated |
| **Answer Feedback** | No instant answers on official exam | Real Exam hides answers until finish | Validated |

---

## 3. Mathematical Completion & Termination Rules

1. **Failure Threshold**:
   - Because only 30 questions exist, achieving **6 incorrect answers** mathematically limits the maximum achievable score to 24/30 (failing score).
   - In NEXORA DR TEST, this is handled via **NEXORA Derived Early-Completion Logic** (clearly documented as simulation logic, not proprietary registry software claims).

2. **Passing Threshold**:
   - Reaching **25 correct answers** guarantees a passing score regardless of remaining questions.

---

## 4. Key Alberta Class 7 Laws & Traffic Regulations

### A. Class 7 GDL Restrictions
- **Age**: Minimum 14 years of age.
- **Accompanying Driver**: Must be accompanied by a fully licensed non-probationary Class 5 driver who is at least 18 years old, seated in the front passenger seat.
- **Sobriety**: Zero tolerance for blood alcohol concentration (0.00% BAC) and zero drug concentration.
- **Nighttime Driving Curfew**: Driving is strictly prohibited between **12:00 AM (midnight) and 5:00 AM**.
- **Demerit Points**: Suspended upon accumulating **8 demerit points** (vs. 15 for full Class 5).
- **Seat Belts**: Maximum passenger count cannot exceed functional seat belts.

### B. Speed Limits
- **Urban default**: 50 km/h unless posted otherwise.
- **Rural primary highways**: 100 km/h unless posted otherwise.
- **Rural secondary / gravel roads**: 80 km/h unless posted otherwise.
- **School Zones**: 30 km/h during statutory hours (8:00–9:30 AM, 11:30 AM–1:30 PM, 3:00–4:30 PM on school days; or municipal standardized hours 7:30 AM–9:00 PM in Calgary/Edmonton). Passing any moving vehicle inside a school zone during active hours is prohibited.
- **Playground Zones**: 30 km/h every day from 8:30 AM to one hour after sunset (or municipal 7:30 AM–9:00 PM). Passing prohibited during active hours.
- **Emergency & Roadside Vehicles**: Must slow to **60 km/h** (or posted limit if lower) when passing stopped emergency vehicles, tow trucks, and maintenance equipment with flashing lights in the adjacent lane.

### C. Parking Regulations
- Parallel parking distance: Tires within **50 cm (500 mm)** of the curb.
- Prohibited parking zones:
  - Within **5 metres** of a fire hydrant, marked crosswalk, stop sign, or yield sign.
  - Within **1.5 metres** of a private driveway or public alley entrance.
- **Hill Parking Wheel Orientations**:
  - **Uphill with curb**: Wheels turned **LEFT (away from curb)** and vehicle gently rolled back to touch curb.
  - **Uphill without curb**: Wheels turned **RIGHT (toward edge/shoulder)**.
  - **Downhill with curb**: Wheels turned **RIGHT (toward curb)**.
  - **Downhill without curb**: Wheels turned **RIGHT (toward edge/shoulder)**.
  - Parking brake must always be firmly engaged and transmission in Park (or reverse for manual).

### D. Intersections & Right-of-Way
- **Uncontrolled Intersections**: The driver on the left must yield the right-of-way to the driver on their right.
- **Four-Way Stops**: First vehicle to come to a complete stop proceeds first. If two arrive simultaneously, the driver on the left yields to the driver on their right.
- **Left Turns**: Drivers turning left must yield to oncoming through traffic and pedestrians.
- **Traffic Circles / Roundabouts**: Vehicles entering must yield to traffic already circulating. Right lane is for turning right or continuing straight (first or second exit only). Left/inner lane is for continuing straight, turning left, or completing a U-turn.
