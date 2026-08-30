# Nano Banana Visual Question Manifest & Audit

This document records the visual driving scenarios generated via the Nano Banana image-generation engine, detailing prompt construction, asset routing, associated question coupling, and quality validation.

---

## 1. Visual Generation Standards & Protocol

- **Perspective**: Elevated 3D isometric or high-angle diagrammatic driver-education perspectives.
- **Geometrical Integrity**: Canadian right-hand traffic conventions, realistic Alberta lane geometries and road markings.
- **Text Decoupling**: Crucial textual annotations, lane letters (`Vehicle A`, `Vehicle B`, `Vehicle C`), and directional arrows are rendered programmatically via HTML/SVG overlays to guarantee exact typography, accessibility, and zero AI text hallucinations.
- **Alt-Text Governance**: Every visual asset is paired with non-spoiler alt-text for screen readers that accurately describes vehicle orientations without revealing the correct answer.

---

## 2. Visual Scenario Records

### Scenario 01: Uncontrolled 4-Way Intersection
- **Question ID**: `ROW-001`
- **Category**: `Right-of-Way & Intersections`
- **Purpose**: Test right-of-way rules at an uncontrolled intersection when two vehicles arrive simultaneously.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education illustration of a four-way uncontrolled residential intersection in Alberta Canada. Clear daylight, dry asphalt pavement, Canadian right-hand traffic. A blue sedan (approaching from south travelling north) and a red compact SUV (approaching from east travelling west) arrive at the intersection line at the exact same time. No stop signs, yield signs, traffic lights or pedestrians. Clean minimal residential houses in background. No baked-in text letters or labels. High contrast, sharp road geometry.`
- **Generated Asset**: `/assets/questions/intersections/q_uncontrolled_row_01.jpg`
- **Programmatic Overlays**: `Vehicle A` (Blue sedan / South), `Vehicle B` (Red SUV / East)
- **Alt-Text**: `Two vehicles arriving at an uncontrolled four-way intersection simultaneously: a blue sedan from the south and a red SUV from the east.`
- **Visual QA**: Passed (clean road surface, clear perspective, right-hand traffic).
- **Road-Law QA**: Passed (Alberta Rule: Vehicle on the left yields to vehicle on the right; Blue car yields to Red SUV).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 02: Four-Way Stop Intersection
- **Question ID**: `ROW-004`
- **Category**: `Stop Signs & Priority`
- **Purpose**: Test sequential arrival right-of-way at an all-way stop.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education illustration of a four-way stop intersection in Alberta Canada. Red octagonal stop signs visible at all 4 corner posts. A blue sedan stopped at the south stop line, already completely stopped. A silver sedan approaching the west stop line 10 meters away still in motion. Clear daylight, dry pavement, Canadian right-hand traffic. Crisp road geometry, no baked-in letters or text labels. Neutral realistic lighting.`
- **Generated Asset**: `/assets/questions/intersections/q_four_way_stop_02.jpg`
- **Programmatic Overlays**: `Vehicle A` (Blue sedan stopped first), `Vehicle B` (Silver sedan approaching)
- **Alt-Text**: `A four-way stop intersection with a blue sedan completely stopped at the south line and a silver sedan approaching from the west.`
- **Visual QA**: Passed (stop signs at all posts, clear vehicle positions).
- **Road-Law QA**: Passed (Alberta Rule: First vehicle to come to a complete stop proceeds first).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 03: Left Turn Across Oncoming Traffic
- **Question ID**: `TURN-002`
- **Category**: `Turning & Signals`
- **Purpose**: Test left-turn right-of-way at a green light.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education diagram of a signalized 4-way intersection in Alberta Canada with solid green traffic lights in both north-south directions. A blue sedan in the foreground south approach is in the left-turn lane waiting with front wheels straight. An oncoming yellow hatchback from the north approach is proceeding straight through the intersection. Clear daylight, dry road, Canadian right-hand traffic, high contrast, clean road markings with turn arrows. No baked-in text labels.`
- **Generated Asset**: `/assets/questions/intersections/q_left_turn_green_03.jpg`
- **Programmatic Overlays**: `Vehicle A` (Turning left), `Vehicle B` (Going straight)
- **Alt-Text**: `An intersection with green traffic signals showing a blue car in the left turn lane and an oncoming yellow car travelling straight.`
- **Visual QA**: Passed (green signals visible, clear lane markings).
- **Road-Law QA**: Passed (Alberta Rule: Turning vehicle must yield to oncoming traffic going straight).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 04: Multi-Lane Roundabout Lane Selection
- **Question ID**: `RND-001`
- **Category**: `Traffic Circles & Roundabouts`
- **Purpose**: Test lane positioning when entering and exiting a multi-lane roundabout.
- **Nano Banana Prompt**: `Clean elevated high-angle 3D driver-education diagram of a modern two-lane roundabout in Alberta Canada. Clear yield lines and lane arrows at the south entrance. A white sedan in the right lane preparing to turn right at the first exit. A blue sedan in the inner left lane circulating counter-clockwise towards the third exit. Beautiful clean pavement markings, circular center island with low grass, Canadian right-hand traffic. No baked-in text labels or letters. Crisp educational visual.`
- **Generated Asset**: `/assets/questions/roundabouts/q_roundabout_lanes_04.jpg`
- **Programmatic Overlays**: `Lane A` (Right/Outer), `Lane B` (Left/Inner)
- **Alt-Text**: `Two-lane roundabout showing entrance lanes, lane arrow markings, and vehicles navigating the roundabout.`
- **Visual QA**: Passed (counter-clockwise flow, clean lane dividers).
- **Road-Law QA**: Passed (Alberta Rule: Right lane for first/second exit; Left lane for second/third exit or U-turn).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 05: Uphill Parking with a Curb
- **Question ID**: `PARK-003`
- **Category**: `Parking & Hills`
- **Purpose**: Test front wheel angle when parking facing uphill with a curb.
- **Nano Banana Prompt**: `Clean 3D educational illustration of a modern passenger car parked facing uphill on a city street incline next to a raised concrete sidewalk curb in Alberta. The front wheels are clearly and prominently turned to the left away from the curb, so the rear of the front tire rests gently against the curb. Clear daylight, clean perspective showing wheel angle and curb clearly. No baked-in text letters. Educational diagram style.`
- **Generated Asset**: `/assets/questions/parking/q_uphill_curb_parking_05.jpg`
- **Alt-Text**: `A passenger car parked facing uphill alongside a concrete sidewalk curb on a residential street.`
- **Visual QA**: Passed (clear wheel angle to left, curb clearly rendered).
- **Road-Law QA**: Passed (Alberta Rule: Uphill with curb = turn wheels LEFT away from curb).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 06: School Bus Flashing Alternating Red Lights
- **Question ID**: `BUS-001`
- **Category**: `School Buses & Special Vehicles`
- **Purpose**: Test stopping obligations for approaching and following traffic on an undivided road.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education diagram of a two-lane undivided rural road in Alberta Canada. A yellow North American school bus is stopped in the right lane with alternating red lights flashing on its roof and side stop sign arm extended. An approaching red car from behind the bus has stopped 20 metres away. An oncoming blue sedan from the opposite direction has also stopped 20 metres in front of the bus. Clear daylight, dry pavement, Canadian right-hand traffic. High visual clarity, no baked-in text labels.`
- **Generated Asset**: `/assets/questions/school-bus/q_school_bus_red_lights_09.jpg`
- **Alt-Text**: `A yellow school bus stopped on a two-lane road with flashing red overhead lights and extended stop arm, with cars stopped in both directions.`
- **Visual QA**: Passed (two-way undivided road, flashing red lights, both cars stopped at safe distance).
- **Road-Law QA**: Passed (Alberta Rule: Traffic in BOTH directions must stop at least 20 metres from bus on undivided road).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 07: Stopped Emergency Vehicle on Multi-Lane Highway
- **Question ID**: `EMERG-001`
- **Category**: `Emergency Vehicles & Roadside Safety`
- **Purpose**: Test Alberta's 60 km/h and move-over regulation when passing emergency/roadside vehicles.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education illustration of a multi-lane divided highway in Alberta Canada. On the far right paved shoulder, a police vehicle is stopped with flashing red and blue emergency rooftop lights. In the adjacent right lane, a silver sedan is slowing down and signalling to move over into the left passing lane. Clear daylight, wide open Canadian prairie highway backdrop, dry pavement, Canadian right-hand traffic, no baked-in text letters. High educational clarity.`
- **Generated Asset**: `/assets/questions/emergency/q_emergency_vehicle_60kmh_10.jpg`
- **Alt-Text**: `An emergency vehicle stopped on the highway shoulder with flashing lights, and an approaching car slowing down and moving over.`
- **Visual QA**: Passed (shoulder emergency vehicle, lane change and slow down context).
- **Road-Law QA**: Passed (Alberta Rule: Slow to 60 km/h or posted speed if lower, move over if safe).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 08: Pedestrian at Marked Crosswalk
- **Question ID**: `PED-001`
- **Category**: `Pedestrians & Cyclists`
- **Purpose**: Test yielding obligations at marked mid-block crosswalks.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education illustration of a marked mid-block pedestrian crosswalk across a two-lane city street in Alberta Canada. A pedestrian has stepped off the curb onto the zebra-striped crosswalk. An approaching blue sedan is fully stopped behind the white stop line to yield right-of-way. Clean daylight, dry pavement, Canadian right-hand traffic, clearly visible crosswalk markings. No baked-in text letters. High clarity educational diagram.`
- **Generated Asset**: `/assets/questions/pedestrians/q_pedestrian_crosswalk_yield_11.jpg`
- **Alt-Text**: `A marked pedestrian crosswalk on a city street with a pedestrian in the crosswalk and approaching cars stopped.`
- **Visual QA**: Passed (crosswalk zebra stripes, pedestrian position, stopped vehicle).
- **Road-Law QA**: Passed (Alberta Rule: Drivers must yield to pedestrians in marked or unmarked crosswalks).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 09: Safe Passing Distance for Cyclist
- **Question ID**: `CYC-001`
- **Category**: `Pedestrians & Cyclists`
- **Purpose**: Test safe passing clearance distance when overtaking cyclists.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education illustration of a suburban two-lane road in Alberta Canada. A cyclist is riding forward along the right side of the travel lane. A red passenger car is positioned behind and to the left of the cyclist, maintaining a wide 1.5-metre safety buffer clearance before safely passing. Clear daylight, dry pavement, Canadian right-hand traffic, green suburban roadside. No baked-in text labels. Clear educational illustration.`
- **Generated Asset**: `/assets/questions/cyclists/q_cyclist_safe_passing_12.jpg`
- **Alt-Text**: `A passenger vehicle traveling behind and to the left of a cyclist on a suburban road maintaining a safe passing buffer.`
- **Visual QA**: Passed (clean road, cyclist on right, vehicle clearance).
- **Road-Law QA**: Passed (Alberta Rule: Leave at least 1.0 to 1.5 metres passing distance).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 10: Winter Driving & Bridge Black Ice Hazard
- **Question ID**: `WINT-001`
- **Category**: `Winter Driving & Weather Hazards`
- **Purpose**: Test recognition of elevated structures freezing before road surfaces.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education diagram of a two-lane highway approaching an elevated highway bridge structure in Alberta Canada during winter. Light snow along the road edges and shoulders, transparent black ice glaze on the cold elevated bridge deck surface. A blue SUV is slowing down before driving onto the bridge. Canadian prairie winter landscape with pine trees. High contrast, clean visual, no baked-in text labels. Educational driver training diagram.`
- **Generated Asset**: `/assets/questions/winter/q_winter_black_ice_bridge_13.jpg`
- **Alt-Text**: `A highway approaching a bridge deck with winter snow and potential black ice conditions.`
- **Visual QA**: Passed (winter environment, clear bridge approach).
- **Road-Law QA**: Passed (Alberta Rule: Bridge decks freeze before normal road surfaces due to air underneath).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 11: Commercial Semi-Truck Blind Spots ("No-Zone")
- **Question ID**: `LANE-004`
- **Category**: `Sharing the Road & Heavy Vehicles`
- **Purpose**: Identify dangerous blind spots around commercial vehicles.
- **Nano Banana Prompt**: `Clean elevated top-down 3D driver-education diagram of a large commercial semi-trailer truck on a three-lane highway in Alberta Canada. A white semi truck is in the middle lane. Three passenger cars are positioned around it: Car A directly in the truck right-side blind spot, Car B closely tailgating behind the trailer, and Car C safely traveling in the left lane visible in the driver side mirror. Clear daylight, clean lane markings, dry pavement, Canadian right-hand traffic, no baked-in text labels. Educational diagram.`
- **Generated Asset**: `/assets/questions/lane-positioning/q_truck_blind_spots_14.jpg`
- **Programmatic Overlays**: `Position A` (Right blind spot), `Position B` (Rear blind spot), `Position C` (Visible left lane)
- **Alt-Text**: `A large commercial truck on a three-lane highway with three passenger cars in different positions around the truck.`
- **Visual QA**: Passed (positions A, B, C clearly separated).
- **Road-Law QA**: Passed (Alberta Rule: If you cannot see truck mirrors, the truck driver cannot see you; right side is the largest blind spot).
- **Final Status**: Accepted into Production Bank.

---

### Scenario 12: Railway Crossing with Flashing Red Signals
- **Question ID**: `RAIL-001`
- **Category**: `Railway Crossings`
- **Purpose**: Test legal stopping distance from tracks when signals are active.
- **Nano Banana Prompt**: `Clean elevated 3D driver-education illustration of a rural railway crossing in Alberta Canada. A white and red railway crossbuck post has alternating red lights flashing and a lowered red-and-white gate arm. A silver car is stopped cleanly 5 metres before the nearest rail track. Clear daylight, Canadian prairie landscape, tracks crossing the two-lane road. High contrast, clear educational diagram. No baked-in text labels.`
- **Generated Asset**: `/assets/questions/railway/q_railway_crossing_signal_16.jpg`
- **Alt-Text**: `A vehicle stopped at a railway crossing with active flashing red warning lights and a lowered gate arm.`
- **Visual QA**: Passed (crossbuck, flashing signals, 5m stopping mark).
- **Road-Law QA**: Passed (Alberta Rule: Stop at least 5 metres, and no more than 15 metres, from the nearest rail track).
- **Final Status**: Accepted into Production Bank.
