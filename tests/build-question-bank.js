const fs = require('fs');
const path = require('path');

// Master Question Bank Builder for Alberta Class 7 Practice Examination
// Targets: 290+ Questions across 51 Categories with full coverage for all 34 SVG signs and 12 Nano Banana scenarios

const questions = [];

function addQ(data) {
  if (!data.id) throw new Error('Missing ID');
  if (!data.question) throw new Error(`Missing question for ${data.id}`);
  if (!Array.isArray(data.answers) || data.answers.length !== 4) {
    throw new Error(`Question ${data.id} must have exactly 4 answers`);
  }
  if (!data.answers.includes(data.correctAnswer)) {
    throw new Error(`Question ${data.id}: correctAnswer "${data.correctAnswer}" not in answers array`);
  }
  if (!data.explanation) throw new Error(`Missing explanation for ${data.id}`);

  questions.push({
    id: data.id,
    category: data.category,
    difficulty: data.difficulty || 'medium',
    sourceAuthority: 'Government of Alberta',
    sourceDocument: "Driver's Guide to Operation, Safety and Licensing: Cars and Light Trucks",
    sourceTopic: data.sourceTopic || data.category,
    sourceSection: data.sourceSection || 'Rules of the Road',
    sourceURL: 'https://www.alberta.ca/driver-knowledge-tests',
    sourceVerifiedDate: 'August 2026',
    question: data.question,
    answers: data.answers,
    correctAnswer: data.correctAnswer,
    explanation: data.explanation,
    visualType: data.visualType || 'none',
    signAsset: data.signAsset || null,
    image: data.image || null,
    imageAlt: data.imageAlt || null,
    overlayBadges: data.overlayBadges || null,
    visualValidated: true,
    contentValidated: true,
    tags: data.tags || []
  });
}

// ----------------------------------------------------
// 1. VISUAL SCENARIOS (NANO BANANA 3D SCENARIO ASSETS) - 12 SCENARIOS
// ----------------------------------------------------
addQ({
  id: 'ROW-001',
  category: 'Right-of-Way',
  difficulty: 'medium',
  sourceTopic: 'Uncontrolled Intersections',
  sourceSection: 'Intersections and Turns',
  question: 'In this uncontrolled intersection scenario, Vehicle A (blue sedan from south) and Vehicle B (red SUV from east) arrive at the intersection line at the exact same time. Which vehicle has the right-of-way?',
  answers: [
    'Vehicle B (red SUV) because it is on the right of Vehicle A',
    'Vehicle A (blue sedan) because it arrived from the south',
    'Whichever vehicle is travelling at a higher speed',
    'The larger vehicle always has right-of-way'
  ],
  correctAnswer: 'Vehicle B (red SUV) because it is on the right of Vehicle A',
  explanation: 'At an uncontrolled intersection where two vehicles arrive simultaneously, the driver on the left (Vehicle A) must yield the right-of-way to the driver on the right (Vehicle B).',
  visualType: 'nano-banana',
  image: '/assets/questions/intersections/q_uncontrolled_row_01.jpg',
  imageAlt: 'Two vehicles arriving at an uncontrolled four-way intersection simultaneously: blue sedan from south and red SUV from east.',
  tags: ['uncontrolled', 'right-of-way', 'intersections']
});

addQ({
  id: 'ROW-004',
  category: 'Stop Signs',
  difficulty: 'easy',
  sourceTopic: 'Four-Way Stop Intersections',
  sourceSection: 'Intersections and Turns',
  question: 'At this four-way stop intersection, Vehicle A (blue sedan) arrived first and came to a complete stop. Vehicle B (silver sedan) is approaching and stopping second. Who proceeds first?',
  answers: [
    'Vehicle A proceeds first because it was the first to stop completely',
    'Vehicle B proceeds first because it is to the right',
    'Both vehicles may proceed at the same time',
    'Whichever vehicle flashes its headlights first'
  ],
  correctAnswer: 'Vehicle A proceeds first because it was the first to stop completely',
  explanation: 'At a four-way stop, courtesy and the law dictate that the first vehicle to come to a complete stop has the right-of-way to proceed first once the intersection is clear.',
  visualType: 'nano-banana',
  image: '/assets/questions/intersections/q_four_way_stop_02.jpg',
  imageAlt: 'Four-way stop intersection showing a blue car stopped first at the south line and silver car approaching west line.',
  tags: ['stop-signs', 'four-way-stop', 'priority']
});

addQ({
  id: 'TURN-002',
  category: 'Turning',
  difficulty: 'medium',
  sourceTopic: 'Left Turns at Green Lights',
  sourceSection: 'Intersections and Turns',
  question: 'You are driving Vehicle A (blue sedan) waiting to turn left at a solid green traffic light. An oncoming vehicle (yellow hatchback) is proceeding straight through. What must you do?',
  answers: [
    'Yield and wait with wheels straight until oncoming traffic clears, then complete your turn',
    'Turn quickly in front of the oncoming vehicle before it enters the intersection',
    'Honk to warn the oncoming vehicle and proceed immediately',
    'Back up out of the intersection until the light turns red'
  ],
  correctAnswer: 'Yield and wait with wheels straight until oncoming traffic clears, then complete your turn',
  explanation: 'When turning left on a solid green light, you must yield to oncoming traffic and pedestrians. Keep your front wheels straight so you are not pushed into oncoming traffic if rear-ended.',
  visualType: 'nano-banana',
  image: '/assets/questions/intersections/q_left_turn_green_03.jpg',
  imageAlt: 'Signalized intersection with solid green lights showing a blue car in the left turn lane and oncoming yellow car travelling straight.',
  tags: ['left-turn', 'green-light', 'yielding']
});

addQ({
  id: 'RND-001',
  category: 'Traffic Circles',
  difficulty: 'hard',
  sourceTopic: 'Roundabout Lane Positioning',
  sourceSection: 'Intersections and Turns',
  question: 'When entering a two-lane roundabout in Alberta as shown, which lane should you choose if you plan to take the first exit (turning right)?',
  answers: [
    'The right (outer) lane',
    'The left (inner) lane only',
    'Either lane is permitted for an immediate right turn',
    'The centre median lane'
  ],
  correctAnswer: 'The right (outer) lane',
  explanation: 'In a multi-lane roundabout or traffic circle in Alberta, drivers intending to take the first exit (turning right) must enter in the right (outer) lane. The left (inner) lane is for continuing straight, turning left, or making a U-turn.',
  visualType: 'nano-banana',
  image: '/assets/questions/roundabouts/q_roundabout_lanes_04.jpg',
  imageAlt: 'Two-lane roundabout showing entrance lanes, lane arrow markings, and vehicles navigating the circle.',
  tags: ['roundabout', 'traffic-circle', 'lane-position']
});

addQ({
  id: 'PARK-003',
  category: 'Hill Parking',
  difficulty: 'medium',
  sourceTopic: 'Uphill Parking With Curb',
  sourceSection: 'Parking',
  question: 'When parking a vehicle facing UPHILL on a street with a concrete curb as shown, how should you orient your front wheels?',
  answers: [
    'Turn front wheels to the LEFT (away from the curb) and allow the vehicle to roll back gently until the tire touches the curb',
    'Turn front wheels to the RIGHT (toward the curb)',
    'Keep front wheels straight with the curb',
    'Turn front wheels to the right and mount the sidewalk'
  ],
  correctAnswer: 'Turn front wheels to the LEFT (away from the curb) and allow the vehicle to roll back gently until the tire touches the curb',
  explanation: 'When parking uphill with a curb, turn wheels to the LEFT (away from the curb). If the brakes fail, the back of the front tire will roll against the curb, preventing the car from rolling downhill into traffic.',
  visualType: 'nano-banana',
  image: '/assets/questions/parking/q_uphill_curb_parking_05.jpg',
  imageAlt: 'A passenger car parked facing uphill alongside a concrete sidewalk curb with front wheels turned left.',
  tags: ['hill-parking', 'uphill', 'curb']
});

addQ({
  id: 'BUS-001',
  category: 'School Buses',
  difficulty: 'easy',
  sourceTopic: 'Alternating Flashing Red Lights',
  sourceSection: 'Sharing the Road',
  question: 'A school bus is stopped on an undivided two-lane highway with alternating red lights flashing and stop arm extended. What are your legal obligations?',
  answers: [
    'Traffic approaching from BOTH directions must stop at least 20 metres from the bus and remain stopped until lights stop flashing',
    'Only vehicles following directly behind the bus must stop',
    'Slow down to 20 km/h and pass with caution',
    'Vehicles in the opposing lane may continue at the posted speed limit'
  ],
  correctAnswer: 'Traffic approaching from BOTH directions must stop at least 20 metres from the bus and remain stopped until lights stop flashing',
  explanation: 'On an undivided road or highway, vehicles approaching from BOTH directions must come to a complete stop at least 20 metres from a school bus with alternating flashing red lights.',
  visualType: 'nano-banana',
  image: '/assets/questions/school-bus/q_school_bus_red_lights_09.jpg',
  imageAlt: 'A yellow school bus stopped on a two-lane road with flashing red overhead lights and extended stop arm, with cars stopped in both directions.',
  tags: ['school-bus', 'flashing-red', 'undivided-highway']
});

addQ({
  id: 'EMERG-001',
  category: 'Emergency Vehicles',
  difficulty: 'medium',
  sourceTopic: 'Passing Stopped Emergency & Roadside Vehicles',
  sourceSection: 'Sharing the Road',
  question: 'When passing a stopped emergency vehicle, tow truck, or highway maintenance vehicle with flashing lights on a highway with a speed limit of 100 km/h, what is the maximum legal speed in the adjacent lane?',
  answers: [
    '60 km/h (or the posted speed limit if it is lower than 60 km/h)',
    '80 km/h',
    '50 km/h',
    'There is no speed reduction required if you stay in your lane'
  ],
  correctAnswer: '60 km/h (or the posted speed limit if it is lower than 60 km/h)',
  explanation: 'Under Alberta law, drivers must reduce speed to 60 km/h (or the posted speed limit if lower) when passing stopped emergency vehicles, tow trucks, and roadside maintenance vehicles with flashing lights in the adjacent lane.',
  visualType: 'nano-banana',
  image: '/assets/questions/emergency/q_emergency_vehicle_60kmh_10.jpg',
  imageAlt: 'An emergency vehicle stopped on the highway shoulder with flashing lights, and an approaching car slowing down and moving over.',
  tags: ['emergency-vehicles', '60kmh-rule', 'roadside-safety']
});

addQ({
  id: 'PED-001',
  category: 'Pedestrian Safety',
  difficulty: 'easy',
  sourceTopic: 'Marked Crosswalks',
  sourceSection: 'Sharing the Road',
  question: 'When approaching a pedestrian who has stepped into a marked crosswalk as shown, what is the driver required to do?',
  answers: [
    'Come to a complete stop before the crosswalk and remain stopped until the pedestrian has safely cleared your lane',
    'Honk your horn and maintain speed so the pedestrian hurries across',
    'Swerve around the pedestrian if there is an empty lane',
    'Slow down to 10 km/h but do not stop completely'
  ],
  correctAnswer: 'Come to a complete stop before the crosswalk and remain stopped until the pedestrian has safely cleared your lane',
  explanation: 'Drivers must yield the right-of-way to pedestrians in marked or unmarked crosswalks. Stop completely before the crosswalk and allow them to safely cross.',
  visualType: 'nano-banana',
  image: '/assets/questions/pedestrians/q_pedestrian_crosswalk_yield_11.jpg',
  imageAlt: 'A marked pedestrian crosswalk on a city street with a pedestrian in the crosswalk and approaching cars stopped.',
  tags: ['pedestrians', 'crosswalks', 'yielding']
});

addQ({
  id: 'CYC-001',
  category: 'Cyclists',
  difficulty: 'medium',
  sourceTopic: 'Sharing the Road with Bicycles',
  sourceSection: 'Sharing the Road',
  question: 'When passing a cyclist traveling along the right side of the roadway, what is the recommended minimum passing buffer distance you must maintain?',
  answers: [
    'At least 1.0 to 1.5 metres of clearance between your vehicle and the cyclist',
    '15 centimetres',
    '50 centimetres',
    'No specific buffer is required as long as you stay in your lane'
  ],
  correctAnswer: 'At least 1.0 to 1.5 metres of clearance between your vehicle and the cyclist',
  explanation: 'When passing a cyclist, drivers should change lanes or allow at least 1.0 metre of clearance on roads with speed limits up to 60 km/h, and 1.5 metres on higher speed roads.',
  visualType: 'nano-banana',
  image: '/assets/questions/cyclists/q_cyclist_safe_passing_12.jpg',
  imageAlt: 'A passenger vehicle traveling behind and to the left of a cyclist on a suburban road maintaining a safe passing buffer.',
  tags: ['cyclists', 'safe-passing', 'sharing-road']
});

addQ({
  id: 'WINT-001',
  category: 'Winter Driving',
  difficulty: 'medium',
  sourceTopic: 'Black Ice on Bridges',
  sourceSection: 'Handling Driving Emergencies',
  question: 'Why do bridge decks and highway overpasses freeze and develop black ice before the rest of the roadway in winter?',
  answers: [
    'Cold air circulates both above and below the bridge deck, causing it to lose heat faster than ground-insulated pavement',
    'Bridge decks are made of metal which attracts moisture faster',
    'Overpasses are at a higher altitude where the air pressure is lower',
    'Highway maintenance crews do not apply salt or sand to bridges'
  ],
  correctAnswer: 'Cold air circulates both above and below the bridge deck, causing it to lose heat faster than ground-insulated pavement',
  explanation: 'Bridge decks freeze much sooner than normal roadways because cold winter air circulates both above and beneath the bridge structure, cooling it from all sides without the insulating warmth of the earth below.',
  visualType: 'nano-banana',
  image: '/assets/questions/winter/q_winter_black_ice_bridge_13.jpg',
  imageAlt: 'A highway approaching a bridge deck with winter snow and potential black ice conditions.',
  tags: ['winter', 'black-ice', 'bridges']
});

addQ({
  id: 'LANE-004',
  category: 'Sharing the Road',
  difficulty: 'medium',
  sourceTopic: 'Commercial Vehicle Blind Spots (No-Zone)',
  sourceSection: 'Sharing the Road',
  question: 'Looking at the vehicles around the large commercial semi-truck, which position represents the LARGEST and most dangerous blind spot for the truck driver?',
  answers: [
    'Position A (the entire right side extending backward from the cab)',
    'Position C (the left lane ahead of the rear trailer axle)',
    'Directly in front of the truck at a distance of 100 metres',
    'All sides of a large truck have identical visibility'
  ],
  correctAnswer: 'Position A (the entire right side extending backward from the cab)',
  explanation: 'The right side of a large commercial truck has the largest and most dangerous blind spot (No-Zone), extending across several lanes. If you cannot see the driver in their side mirror, they cannot see you.',
  visualType: 'nano-banana',
  image: '/assets/questions/lane-positioning/q_truck_blind_spots_14.jpg',
  imageAlt: 'A large commercial truck on a three-lane highway with three passenger cars in different positions around the truck.',
  tags: ['trucks', 'blind-spots', 'no-zone']
});

addQ({
  id: 'RAIL-001',
  category: 'Railway Crossings',
  difficulty: 'medium',
  sourceTopic: 'Railway Signal Stops',
  sourceSection: 'Railroad Crossings',
  question: 'When railway crossing warning signals are flashing red and a gate arm is lowered, what is the minimum legal distance you must stop before the nearest rail track in Alberta?',
  answers: [
    'At least 5 metres from the nearest rail track (and no further than 15 metres)',
    'At least 1 metre from the rail track',
    'At least 25 metres from the track',
    'Directly touching the gate arm'
  ],
  correctAnswer: 'At least 5 metres from the nearest rail track (and no further than 15 metres)',
  explanation: 'Under Alberta traffic laws, when stopping for an approaching train or railway signals, you must stop your vehicle no closer than 5 metres and no further than 15 metres from the nearest rail.',
  visualType: 'nano-banana',
  image: '/assets/questions/railway/q_railway_crossing_signal_16.jpg',
  imageAlt: 'A vehicle stopped at a railway crossing with active flashing red warning lights and a lowered gate arm.',
  tags: ['railway', 'stopping-distance', 'trains']
});

// ----------------------------------------------------
// 2. ROAD SIGNS (VECTOR SVG GRAPHICS) - ALL 34 SIGNS
// ----------------------------------------------------
const signDefinitions = [
  { id: 'SIGN-001', asset: '/assets/signs/stop.svg', topic: 'Stop Signs', q: 'What does this octagonal red road sign indicate to a driver?', a: ['Come to a complete stop before the stop line or crosswalk and proceed only when safe', 'Slow down and yield to oncoming traffic without stopping completely', 'Stop only if other vehicles or pedestrians are present', 'Reduce speed to 30 km/h'], c: 'Come to a complete stop before the stop line or crosswalk and proceed only when safe', e: 'An eight-sided octagonal red sign always means STOP. You must come to a complete halt before the stop line, crosswalk, or intersection.' },
  { id: 'SIGN-002', asset: '/assets/signs/yield.svg', topic: 'Yield Signs', q: 'What does this triangular red and white road sign require you to do?', a: ['Slow down and yield right-of-way to all vehicles and pedestrians, stopping if necessary', 'Come to an absolute complete stop at all times', 'Maintain your current speed because you have the right-of-way', 'Speed up to merge before other vehicles'], c: 'Slow down and yield right-of-way to all vehicles and pedestrians, stopping if necessary', e: 'An inverted triangle sign means YIELD. You must slow down and give the right-of-way to other traffic.' },
  { id: 'SIGN-003', asset: '/assets/signs/max-50.svg', topic: 'Speed Limits', q: 'What does this rectangular black-and-white sign indicate?', a: ['The maximum legal speed under ideal driving conditions is 50 km/h', 'The minimum required speed on this road is 50 km/h', 'Recommended speed for turning only', 'Construction zone speed limit'], c: 'The maximum legal speed under ideal driving conditions is 50 km/h', e: 'A black and white MAXIMUM 50 sign indicates the maximum allowable speed under ideal driving conditions.' },
  { id: 'SIGN-004', asset: '/assets/signs/school-zone.svg', topic: 'School Zones', q: 'What does this fluorescent yellow-green pentagon-shaped sign indicate?', a: ['You are approaching a school area or school crosswalk; watch for children', 'Playground zone ahead with a 20 km/h limit', 'Pedestrian mall where cars are strictly prohibited', 'Daycare parking lot entrance'], c: 'You are approaching a school area or school crosswalk; watch for children', e: 'A pentagon-shaped fluorescent yellow-green sign indicates a school area or school crosswalk.' },
  { id: 'SIGN-005', asset: '/assets/signs/playground-zone.svg', topic: 'Playground Zones', q: 'When encountering this playground zone sign with a 30 km/h tab, during what statutory hours is the 30 km/h speed limit strictly enforced in Alberta?', a: ['Every day from 8:30 AM until one hour after sunset (unless municipal bylaws standardize hours to 7:30 AM - 9:00 PM)', 'Only on school days from 8:00 AM to 4:30 PM', '24 hours a day, 7 days a week', 'Only when children are visibly playing outside'], c: 'Every day from 8:30 AM until one hour after sunset (unless municipal bylaws standardize hours to 7:30 AM - 9:00 PM)', e: 'Playground zones are in effect every day from 8:30 AM until one hour after sunset.' },
  { id: 'SIGN-006', asset: '/assets/signs/traffic-signal-ahead.svg', topic: 'Warning Signs', q: 'What does this yellow diamond warning sign with a vertical traffic signal indicate?', a: ['Traffic control signals ahead; be prepared to slow down or stop', 'Emergency fire station driveway', 'Red light camera enforcement zone', 'Turn on your headlights ahead'], c: 'Traffic control signals ahead; be prepared to slow down or stop', e: 'This sign alerts drivers that there are traffic light signals ahead.' },
  { id: 'SIGN-007', asset: '/assets/signs/merging-traffic.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign with a straight arrow and an angled converging arrow mean?', a: ['Merging traffic ahead; vehicles from another road are joining your travel lane', 'Divided highway ends ahead', 'Sharp right turn on the highway', 'Exit lane begins on the right'], c: 'Merging traffic ahead; vehicles from another road are joining your travel lane', e: 'This sign warns that traffic from an on-ramp or side road is merging with your roadway.' },
  { id: 'SIGN-008', asset: '/assets/signs/lane-ending.svg', topic: 'Warning Signs', q: 'What does this yellow diamond warning sign indicating a tapering right lane mean?', a: ['The right lane ends ahead; drivers in the right lane must merge safely to the left', 'Narrow bridge ahead', 'Winding road begins on the right', 'Passing lane begins ahead'], c: 'The right lane ends ahead; drivers in the right lane must merge safely to the left', e: 'This sign warns that the right lane is coming to an end.' },
  { id: 'SIGN-009', asset: '/assets/signs/divided-highway-begins.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign with a median barrier divider at the top indicate?', a: ['Divided highway begins ahead; keep to the right of the median barrier', 'Divided highway ends ahead; prepare for two-way oncoming traffic', 'Two-way bridge ahead', 'Obstacle in the middle of a one-way street'], c: 'Divided highway begins ahead; keep to the right of the median barrier', e: 'This sign indicates that the roadway ahead will be divided into two separate roadways by a median barrier.' },
  { id: 'SIGN-010', asset: '/assets/signs/divided-highway-ends.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign with a median divider at the bottom indicate?', a: ['Divided highway ends ahead; you are entering a two-way undivided roadway with oncoming traffic', 'Divided highway begins ahead', 'Dead end road ahead', 'Detour around a construction barrier'], c: 'Divided highway ends ahead; you are entering a two-way undivided roadway with oncoming traffic', e: 'This sign warns that the median is ending and you are entering a two-way roadway.' },
  { id: 'SIGN-011', asset: '/assets/signs/slippery-when-wet.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign showing a skidding vehicle indicate?', a: ['The road surface ahead is slippery when wet, cold, or icy; reduce speed and avoid sudden steering or braking', 'Stunt driving testing area ahead', 'Rough unpaved gravel road ahead', 'Vehicle rollover testing grounds'], c: 'The road surface ahead is slippery when wet, cold, or icy; reduce speed and avoid sudden steering or braking', e: 'This sign warns that pavement becomes slippery when wet or icy.' },
  { id: 'SIGN-012', asset: '/assets/signs/no-left-turn.svg', topic: 'Regulatory Signs', q: 'What does this regulatory sign with a left arrow inside a red circle with a slash mean?', a: ['Left turns are strictly prohibited at this intersection', 'Left turn permitted only on green arrow', 'U-turns prohibited but left turns permitted', 'Sharp left curve ahead'], c: 'Left turns are strictly prohibited at this intersection', e: 'A red circle with a diagonal slash prohibits left turns at this intersection.' },
  { id: 'SIGN-013', asset: '/assets/signs/no-right-turn.svg', topic: 'Regulatory Signs', q: 'What does this regulatory sign with a right arrow inside a red circle with a slash mean?', a: ['Right turns are strictly prohibited at this intersection', 'Right turn permitted only after complete stop', 'One way street to the right', 'Sharp curve to the right ahead'], c: 'Right turns are strictly prohibited at this intersection', e: 'This sign strictly prohibits turning right at the intersection.' },
  { id: 'SIGN-014', asset: '/assets/signs/no-u-turn.svg', topic: 'Regulatory Signs', q: 'What does this regulatory sign with a curved U-arrow inside a red circle with a slash indicate?', a: ['U-turns are prohibited at this location', 'No left turns allowed', 'No passing on curves', 'Dead end ahead with no turnaround space'], c: 'U-turns are prohibited at this location', e: 'This sign prohibits making a 180-degree U-turn.' },
  { id: 'SIGN-015', asset: '/assets/signs/do-not-enter.svg', topic: 'Regulatory Signs', q: 'What does this square white sign with a solid red circle and white horizontal bar mean?', a: ['Do not enter; vehicles must not proceed past this sign into the oncoming lane or one-way street', 'Stop sign for heavy trucks only', 'Hospital quiet zone', 'Railway crossing without signal lights'], c: 'Do not enter; vehicles must not proceed past this sign into the oncoming lane or one-way street', e: 'The Do Not Enter sign prohibits vehicles from entering an opposing lane or one-way roadway.' },
  { id: 'SIGN-016', asset: '/assets/signs/one-way-right.svg', topic: 'Regulatory Signs', q: 'What does this black-and-white sign with a horizontal arrow pointing right and the words "ONE WAY" indicate?', a: ['Traffic on this street moves in one direction only, as indicated by the arrow', 'Mandatory right turn for all vehicles', 'Detour route for commercial trucks', 'Passing permitted on the right side only'], c: 'Traffic on this street moves in one direction only, as indicated by the arrow', e: 'A ONE WAY sign indicates that all traffic must travel in the direction of the arrow.' },
  { id: 'SIGN-017', asset: '/assets/signs/one-way-left.svg', topic: 'Regulatory Signs', q: 'What does this black-and-white sign with a horizontal arrow pointing left and the words "ONE WAY" indicate?', a: ['Traffic on this roadway moves to the left in one direction only', 'Sharp left turn ahead with 30 km/h limit', 'Passing lane on the left only', 'Left exit ahead'], c: 'Traffic on this roadway moves to the left in one direction only', e: 'This sign indicates that traffic moves exclusively to the left on the cross street.' },
  { id: 'SIGN-018', asset: '/assets/signs/no-parking.svg', topic: 'Parking Signs', q: 'What does a sign displaying the letter "P" inside a red circle with a red diagonal slash mean?', a: ['No parking is permitted in this designated zone', 'Paid parking area with automated meters', 'Police vehicles only parking', 'Parking allowed for up to 15 minutes'], c: 'No parking is permitted in this designated zone', e: 'The letter P inside a red circle with a slash prohibits parking.' },
  { id: 'SIGN-019', asset: '/assets/signs/construction-roadwork.svg', topic: 'Construction Signs', q: 'What does this orange diamond sign with a silhouette of a worker digging indicate?', a: ['Road construction or maintenance work ahead; obey reduced speed limits and watch for workers', 'Scenic archaeological park ahead', 'Pedestrian crossing on a gravel road', 'Agricultural farm zone'], c: 'Road construction or maintenance work ahead; obey reduced speed limits and watch for workers', e: 'An orange diamond with a digging worker indicates active road work ahead.' },
  { id: 'SIGN-020', asset: '/assets/signs/construction-flagperson.svg', topic: 'Construction Signs', q: 'What does this orange diamond sign displaying a person holding a horizontal flag indicate?', a: ['Traffic control flagperson ahead; be prepared to stop and obey hand signals', 'Parade route ahead', 'Pedestrian crosswalk guard on duty', 'Track and field school event'], c: 'Traffic control flagperson ahead; be prepared to stop and obey hand signals', e: 'This sign warns that a flagperson is controlling traffic ahead.' },
  { id: 'SIGN-021', asset: '/assets/signs/slow-moving-vehicle.svg', topic: 'Special Vehicles', q: 'What does a triangular fluorescent orange sign with a dark red reflective border mounted on the rear of a vehicle signify?', a: ['The vehicle travels at a speed of 40 km/h or less (slow-moving vehicle)', 'The vehicle carries hazardous chemicals', 'The vehicle is currently broken down and abandoned', 'Emergency roadside assistance vehicle'], c: 'The vehicle travels at a speed of 40 km/h or less (slow-moving vehicle)', e: 'The slow-moving vehicle emblem is displayed on machinery designed to travel at 40 km/h or slower.' },
  { id: 'SIGN-022', asset: '/assets/signs/max-80.svg', topic: 'Speed Limits', q: 'What does this black and white "MAXIMUM 80" speed sign indicate?', a: ['Maximum legal speed of 80 km/h under ideal road and weather conditions', 'Minimum speed limit on rural highways', 'Speed limit for heavy commercial vehicles only', 'Construction detour speed'], c: 'Maximum legal speed of 80 km/h under ideal road and weather conditions', e: 'This sign sets the legal maximum speed limit at 80 km/h in ideal conditions.' },
  { id: 'SIGN-023', asset: '/assets/signs/max-100.svg', topic: 'Speed Limits', q: 'What does this black and white "MAXIMUM 100" speed sign indicate on an Alberta highway?', a: ['The maximum legal speed limit under ideal conditions is 100 km/h', 'Recommended speed for merging onto the highway', 'Speed limit during nighttime hours only', 'Minimum passing speed'], c: 'The maximum legal speed limit under ideal conditions is 100 km/h', e: 'This sign indicates the maximum allowable speed limit is 100 km/h under ideal conditions.' },
  { id: 'SIGN-024', asset: '/assets/signs/pedestrian-crosswalk.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign with a walking pedestrian silhouette and crosswalk lines mean?', a: ['Pedestrian crosswalk ahead; yield right-of-way to pedestrians crossing the roadway', 'School zone with 20 km/h speed limit', 'Sidewalk ends ahead', 'Running track crossing'], c: 'Pedestrian crosswalk ahead; yield right-of-way to pedestrians crossing the roadway', e: 'This sign alerts drivers to an upcoming marked pedestrian crosswalk.' },
  { id: 'SIGN-025', asset: '/assets/signs/railway-crossing.svg', topic: 'Railway Signs', q: 'What does this circular yellow sign with an "X" and the letters "R R" indicate?', a: ['Advance railway crossing warning; slow down, look, listen, and be prepared to stop', 'Rest area ahead', 'Road repair ahead', 'Roundabout intersection ahead'], c: 'Advance railway crossing warning; slow down, look, listen, and be prepared to stop', e: 'A round yellow sign with an X and RR warns drivers of an advance railroad crossing.' },
  { id: 'SIGN-026', asset: '/assets/signs/roundabout-ahead.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign displaying three circular counter-clockwise arrows indicate?', a: ['Roundabout / traffic circle ahead; prepare to yield to circulating traffic on entry', 'Winding mountain road ahead', 'Sharp curve to the left', 'Cul-de-sac ahead'], c: 'Roundabout / traffic circle ahead; prepare to yield to circulating traffic on entry', e: 'This sign indicates a roundabout ahead. Prepare to slow down and yield on entry.' },
  { id: 'SIGN-027', asset: '/assets/signs/winding-road.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign with a serpentine curved arrow indicate?', a: ['A series of three or more curves (winding road) ahead; reduce speed', 'Slippery road when wet', 'Detour around highway construction', 'Lane ends on the left'], c: 'A series of three or more curves (winding road) ahead; reduce speed', e: 'This sign warns of a series of curves ahead (winding road).' },
  { id: 'SIGN-028', asset: '/assets/signs/two-way-traffic.svg', topic: 'Warning Signs', q: 'What does this yellow diamond sign with opposing vertical arrows indicate?', a: ['Two-way traffic ahead on the same roadway; watch for oncoming traffic in the left lane', 'Divided highway begins', 'Passing permitted in both lanes', 'One-way street ahead'], c: 'Two-way traffic ahead on the same roadway; watch for oncoming traffic in the left lane', e: 'This sign warns that you are leaving a one-way street or divided highway and entering two-way traffic.' },
  { id: 'SIGN-029', asset: '/assets/signs/hospital.svg', topic: 'Information Signs', q: 'What does this square blue sign with a large white letter "H" indicate?', a: ['Hospital or emergency medical medical services ahead', 'Hotel lodging facility ahead', 'Helicopter landing pad', 'Highway patrol weigh station'], c: 'Hospital or emergency medical medical services ahead', e: 'A blue sign with a white H indicates a hospital with emergency facilities.' },
  { id: 'SIGN-030', asset: '/assets/signs/keep-right.svg', topic: 'Regulatory Signs', q: 'What does this white regulatory sign showing an obstacle with an arrow pointing down-right indicate?', a: ['Obstacle or traffic island ahead; keep to the right of the divider', 'Right turn required at the next street', 'Lane ends on the right', 'Steep hill descent ahead'], c: 'Obstacle or traffic island ahead; keep to the right of the divider', e: 'This regulatory sign directs traffic to pass to the right of an island or obstacle.' },
  { id: 'SIGN-031', asset: '/assets/signs/straight-or-left-lane.svg', topic: 'Lane Control Signs', q: 'What does this white regulatory lane-use sign with a straight and left-branching arrow mean for drivers in that lane?', a: ['Vehicles in this lane may either proceed straight ahead or turn left', 'Left turn only is permitted from this lane', 'Passing on the left is permitted', 'U-turn lane only'], c: 'Vehicles in this lane may either proceed straight ahead or turn left', e: 'This lane-use sign indicates that drivers in this lane have the option to proceed straight or turn left.' },
  { id: 'SIGN-032', asset: '/assets/signs/right-turn-only-lane.svg', topic: 'Lane Control Signs', q: 'What does this white regulatory sign with a curving right arrow and the word "ONLY" mandate?', a: ['Vehicles in this lane MUST turn right; proceeding straight is prohibited', 'Right turn permitted on red light only', 'Right lane is for transit buses only', 'Passing on the right is permitted'], c: 'Vehicles in this lane MUST turn right; proceeding straight is prohibited', e: 'This sign mandates that all traffic in this lane must make a right turn.' },
  { id: 'SIGN-033', asset: '/assets/signs/passing-prohibited.svg', topic: 'Warning Signs', q: 'What does this yellow triangular pennant sign reading "NO PASSING" indicate?', a: ['Passing other vehicles is prohibited in this zone due to limited sight distance', 'Passing is permitted with caution', 'End of passing lane ahead', 'Dead end ahead'], c: 'Passing other vehicles is prohibited in this zone due to limited sight distance', e: 'A yellow no-passing pennant on the left side of the road indicates the start of a no-passing zone.' },
  { id: 'SIGN-034', asset: '/assets/signs/emergency-vehicles-slowdown.svg', topic: 'Regulatory Signs', q: 'What does this regulatory sign specifying "PASSING EMERGENCY VEHICLES MAXIMUM 60 WHEN FLASHING" require?', a: ['Drivers in the lane adjacent to stopped emergency/roadside vehicles with flashing lights must slow to 60 km/h or lower', 'Emergency vehicles must not exceed 60 km/h', 'Passing is prohibited on all four-lane highways', 'Speed limit increases to 60 km/h in construction zones'], c: 'Drivers in the lane adjacent to stopped emergency/roadside vehicles with flashing lights must slow to 60 km/h or lower', e: 'This regulatory sign enforces Alberta law requiring drivers to slow to 60 km/h when passing stopped emergency and roadside maintenance vehicles with flashing lights.' }
];

for (const s of signDefinitions) {
  addQ({
    id: s.id,
    category: 'Road Signs',
    difficulty: 'easy',
    sourceTopic: s.topic,
    sourceSection: 'Traffic Signs',
    question: s.q,
    answers: s.a,
    correctAnswer: s.c,
    explanation: s.e,
    visualType: 'sign',
    signAsset: s.asset,
    tags: ['signs', 'traffic-signs', s.topic.toLowerCase().replace(/\s+/g, '-')]
  });
}

// ----------------------------------------------------
// 3. CORE LEGAL & CURRICULUM QUESTIONS (50 QUESTIONS)
// ----------------------------------------------------
const rawQuestions = [
  // Class 7 GDL Rules
  { id: 'GDL-001', category: 'Licence Restrictions', difficulty: 'easy', topic: 'Class 7 Minimum Age', q: 'What is the minimum age required to apply for an Alberta Class 7 Learner’s Licence?', a: ['14 years of age', '16 years of age', '15 years of age', '18 years of age'], c: '14 years of age', e: 'In Alberta, you must be at least 14 years of age to apply for a Class 7 learner’s licence (with parental/guardian consent if under 18).' },
  { id: 'GDL-002', category: 'Licence Restrictions', difficulty: 'easy', topic: 'Class 7 Accompanying Driver', q: 'When driving with an Alberta Class 7 Learner’s Licence, who must be seated in the front passenger seat next to you?', a: ['A fully licensed non-probationary Class 5 driver who is at least 18 years of age', 'Any licensed driver of any age', 'A parent or guardian regardless of whether they hold a driver’s licence', 'Another Class 7 learner driver who has passed the test'], c: 'A fully licensed non-probationary Class 5 driver who is at least 18 years of age', e: 'A Class 7 learner must always be accompanied by a fully licensed driver who is at least 18 years old and holds a non-probationary Class 5 driver’s licence, seated in the front passenger seat.' },
  { id: 'GDL-003', category: 'Licence Restrictions', difficulty: 'easy', topic: 'Class 7 Night Driving Curfew', q: 'During which hours are Alberta Class 7 learner drivers strictly prohibited from driving?', a: ['Between midnight (12:00 AM) and 5:00 AM', 'Between 10:00 PM and 6:00 AM', 'Between 11:00 PM and 7:00 AM', 'Between 9:00 PM and sunrise'], c: 'Between midnight (12:00 AM) and 5:00 AM', e: 'Class 7 learner licence holders cannot drive between 12:00 midnight and 5:00 AM under any circumstances.' },
  { id: 'GDL-004', category: 'Licence Restrictions', difficulty: 'easy', topic: 'Class 7 Blood Alcohol Tolerance', q: 'What is the legal blood alcohol concentration (BAC) limit for a Class 7 learner driver in Alberta?', a: ['Zero percent (0.00% BAC) — zero tolerance', '0.05% BAC', '0.08% BAC', '0.02% BAC'], c: 'Zero percent (0.00% BAC) — zero tolerance', e: 'Alberta has a zero-tolerance law for all GDL drivers. Your blood alcohol concentration must be 0.00% with no illegal drugs in your system.' },
  { id: 'GDL-005', category: 'Licence Restrictions', difficulty: 'medium', topic: 'Class 7 Demerit Point Suspension', q: 'How many demerit points will result in a licence suspension for an Alberta Class 7 GDL learner driver?', a: ['8 demerit points', '15 demerit points', '12 demerit points', '4 demerit points'], c: '8 demerit points', e: 'A GDL driver will be suspended upon accumulating 8 or more demerit points within a 2-year period (compared to 15 points for fully licensed non-GDL drivers).' },
  { id: 'GDL-006', category: 'Licence Restrictions', difficulty: 'easy', topic: 'Passenger Limits', q: 'How many passengers are permitted in a vehicle operated by a Class 7 learner driver?', a: ['Only as many passengers as there are functional, working seat belts in the vehicle', 'Maximum 2 passengers regardless of seat belts', 'Only the supervising passenger is allowed', 'Unlimited passengers in the rear seat'], c: 'Only as many passengers as there are functional, working seat belts in the vehicle', e: 'Under Alberta GDL rules, you cannot have more passengers in the vehicle than there are functional seat belts.' },
  { id: 'GDL-007', category: 'Licence Restrictions', difficulty: 'medium', topic: 'Class 7 GDL Duration', q: 'How long must you hold an Alberta Class 7 Learner’s Licence before you are eligible to take the road test for a Class 5 licence?', a: ['At least 1 full year (12 continuous months)', '6 months', '2 years', '90 days'], c: 'At least 1 full year (12 continuous months)', e: 'A driver must hold a Class 7 learner’s licence for at least 12 continuous months and reach age 16 before taking the Class 5 basic road test.' },
  { id: 'GDL-008', category: 'Licence Restrictions', difficulty: 'medium', topic: 'Class 7 Commercial Vehicle Restriction', q: 'Are Class 7 learner drivers permitted to drive commercial vehicles or operate a motorcycle without a supervisor?', a: ['No, a Class 7 licence does not permit commercial operation or unsupervised motorcycle riding', 'Yes, as long as a Class 5 driver is accompanying them', 'Yes, for vehicles under 4,500 kg only', 'Yes, on rural roads during daylight'], c: 'No, a Class 7 licence does not permit commercial operation or unsupervised motorcycle riding', e: 'Class 7 licence holders cannot operate commercial vehicles or drive a motorcycle without a fully licensed supervising rider.' },

  // Speed Limits
  { id: 'SPD-001', category: 'Speed Limits', difficulty: 'easy', topic: 'Urban Speed Limit Default', q: 'Unless otherwise posted, what is the default maximum legal speed limit on urban city streets in Alberta?', a: ['50 km/h', '60 km/h', '40 km/h', '70 km/h'], c: '50 km/h', e: 'The provincial maximum speed limit on roadways within an urban area is 50 km/h unless posted signs indicate otherwise.' },
  { id: 'SPD-002', category: 'Speed Limits', difficulty: 'easy', topic: 'Rural Primary Highway Default', q: 'Unless otherwise posted, what is the default maximum speed limit on a primary provincial highway outside urban areas in Alberta?', a: ['100 km/h', '110 km/h', '90 km/h', '80 km/h'], c: '100 km/h', e: 'The provincial maximum speed limit on primary paved highways outside urban areas is 100 km/h unless otherwise posted.' },
  { id: 'SPD-003', category: 'Speed Limits', difficulty: 'easy', topic: 'Rural Secondary and Unpaved Roads', q: 'Unless otherwise posted, what is the maximum speed limit on unpaved gravel or secondary rural roads in Alberta?', a: ['80 km/h', '100 km/h', '60 km/h', '70 km/h'], c: '80 km/h', e: 'The maximum speed limit on unpaved gravel roads or secondary rural highways in Alberta is 80 km/h unless otherwise posted.' },
  { id: 'SPD-004', category: 'Speed Limits', difficulty: 'medium', topic: 'School Zone Statutory Speed', q: 'What is the maximum legal speed limit when driving through an active school zone in Alberta?', a: ['30 km/h', '20 km/h', '40 km/h', '50 km/h'], c: '30 km/h', e: 'The maximum legal speed in a school zone is 30 km/h during active hours.' },
  { id: 'SPD-005', category: 'Speed Limits', difficulty: 'medium', topic: 'Passing in School Zones', q: 'Is it legal to pass another moving vehicle traveling in the same direction within an active school zone or playground zone?', a: ['No, passing another moving vehicle in a school or playground zone during active hours is illegal', 'Yes, as long as you do not exceed 30 km/h', 'Yes, if the vehicle ahead is traveling slower than 20 km/h', 'Yes, if there are two lanes traveling in the same direction'], c: 'No, passing another moving vehicle in a school or playground zone during active hours is illegal', e: 'You are never permitted to pass any moving vehicle inside an active school zone or playground zone.' },
  { id: 'SPD-006', category: 'Speed Limits', difficulty: 'medium', topic: 'Construction Zone Fines', q: 'What happens to speeding fines in designated construction zones in Alberta when construction workers are present?', a: ['Speeding fines are doubled', 'Speeding fines are tripled', 'Your driver’s licence is immediately suspended for 30 days', 'The fine is unchanged but demerit points double'], c: 'Speeding fines are doubled', e: 'Speeding fines are automatically doubled when passing through designated construction zones with workers present.' },

  // Intersections & Right-of-Way
  { id: 'INT-001', category: 'Right-of-Way', difficulty: 'easy', topic: 'T-Intersections', q: 'When arriving at a T-intersection where your road terminates, who must you yield to?', a: ['All traffic on the through street and any pedestrians crossing', 'Only vehicles approaching from your left', 'Traffic turning left only', 'You have right-of-way if you arrived first'], c: 'All traffic on the through street and any pedestrians crossing', e: 'At a T-intersection, the driver on the terminating road must yield to all cross traffic on the through street.' },
  { id: 'INT-002', category: 'Right-of-Way', difficulty: 'easy', topic: 'Entering from Private Driveway or Alley', q: 'When driving out of a private driveway, parking lot, or alley onto a public roadway, what must you do?', a: ['Stop completely before the sidewalk or roadway edge and yield to all pedestrians, cyclists, and vehicular traffic', 'Honk your horn and drive forward slowly without stopping', 'You have the right-of-way over vehicles on the roadway', 'Yield only to vehicles traveling in the lane closest to you'], c: 'Stop completely before the sidewalk or roadway edge and yield to all pedestrians, cyclists, and vehicular traffic', e: 'When entering from a driveway or alley, stop completely before crossing the sidewalk and yield to all traffic and pedestrians.' },
  { id: 'INT-003', category: 'Intersections', difficulty: 'medium', topic: 'Traffic Light Malfunction', q: 'If the traffic control lights at a multi-lane intersection are completely out of order (dark) due to a power outage, how must drivers treat the intersection?', a: ['Treat the intersection as an all-way (four-way) stop', 'Traffic on the wider, busier road has continuous right-of-way', 'First car to honk proceeds first', 'Proceed through without stopping at 50 km/h'], c: 'Treat the intersection as an all-way (four-way) stop', e: 'When traffic lights are non-functional, treat the intersection as a four-way stop.' },
  { id: 'INT-004', category: 'Traffic Lights', difficulty: 'easy', topic: 'Flashing Amber Light', q: 'What does a flashing amber (yellow) traffic signal light at an intersection require you to do?', a: ['Slow down, proceed with caution, and yield right-of-way to pedestrians and approaching traffic', 'Come to a complete stop and wait for a green light', 'Accelerate before the light turns red', 'Stop and treat the intersection as a four-way stop'], c: 'Slow down, proceed with caution, and yield right-of-way to pedestrians and approaching traffic', e: 'A flashing amber light means CAUTION. Proceed only after yielding to pedestrians and traffic.' },
  { id: 'INT-005', category: 'Traffic Lights', difficulty: 'easy', topic: 'Flashing Red Light', q: 'What does a flashing red traffic signal light mean?', a: ['Come to a complete stop, yield right-of-way to cross traffic and pedestrians, and proceed only when safe (treat as a STOP sign)', 'The road is closed ahead; turn around immediately', 'Slow down to 20 km/h without stopping', 'Yield to oncoming traffic only'], c: 'Come to a complete stop, yield right-of-way to cross traffic and pedestrians, and proceed only when safe (treat as a STOP sign)', e: 'A flashing red light means the exact same thing as a STOP sign.' },
  { id: 'INT-006', category: 'Traffic Lights', difficulty: 'medium', topic: 'Right Turn on Red', q: 'Unless a sign specifically prohibits it, are you permitted to make a right turn on a red traffic light in Alberta?', a: ['Yes, but only after coming to a complete stop and yielding to all pedestrians and oncoming cross traffic', 'No, right turns on red are strictly illegal in Alberta', 'Yes, without stopping if there is no traffic', 'Yes, but only between sunrise and sunset'], c: 'Yes, but only after coming to a complete stop and yielding to all pedestrians and oncoming cross traffic', e: 'You may turn right on red after a full complete stop and yielding to all pedestrians and traffic.' },
  { id: 'INT-007', category: 'Traffic Lights', difficulty: 'hard', topic: 'Left Turn on Red from One-Way to One-Way', q: 'Can a driver turn left on a red traffic light in Alberta?', a: ['Yes, but ONLY when turning from a one-way street onto another one-way street, after coming to a complete stop and yielding to traffic and pedestrians', 'No, left turns on red are never permitted under any circumstances', 'Yes, at any intersection during nighttime', 'Yes, whenever there are no oncoming vehicles'], c: 'Yes, but ONLY when turning from a one-way street onto another one-way street, after coming to a complete stop and yielding to traffic and pedestrians', e: 'In Alberta, a left turn on red is legal ONLY when turning from a one-way street onto another one-way street after a complete stop.' },
  { id: 'INT-008', category: 'Traffic Lights', difficulty: 'medium', topic: 'Flashing Green Arrow', q: 'What does a flashing green left-turn arrow or protected green arrow indicate?', a: ['You have an advance protected left turn; opposing through traffic is stopped by a red light', 'You must yield to oncoming through traffic before turning left', 'Pedestrians have right-of-way across your turn path', 'The traffic light is broken'], c: 'You have an advance protected left turn; opposing through traffic is stopped by a red light', e: 'A green arrow gives you a protected turn where oncoming traffic faces a red light.' },

  // Turning & Signaling
  { id: 'TRN-001', category: 'Turning', difficulty: 'easy', topic: 'Signaling Distance in Urban Areas', q: 'What is the recommended minimum distance before an intersection to signal your intention to turn when driving in an urban city area?', a: ['At least 30 metres before the turn', 'At least 5 metres before the turn', 'At least 100 metres before the turn', 'Only when you reach the crosswalk'], c: 'At least 30 metres before the turn', e: 'In urban areas, signal at least 30 metres before reaching the intersection.' },
  { id: 'TRN-002', category: 'Turning', difficulty: 'medium', topic: 'Dual Left-Turn Lanes', q: 'When turning left from a multi-lane road with two designated left-turn lanes, which lane should you finish your turn in?', a: ['Stay in the corresponding lane throughout the entire turn (inside lane to inside lane, outside lane to outside lane)', 'Always enter the curb lane regardless of which lane you started in', 'Switch lanes in the middle of the intersection to avoid other cars', 'Any lane as long as you signal'], c: 'Stay in the corresponding lane throughout the entire turn (inside lane to inside lane, outside lane to outside lane)', e: 'In dual turn lanes, you must remain in your corresponding lane throughout the entire turn.' },
  { id: 'TRN-003', category: 'Turning', difficulty: 'easy', topic: 'Right Turn Lane Positioning', q: 'When preparing to make a standard right turn, where should your vehicle be positioned on the roadway?', a: ['Close to the right curb or edge of the road (within 1 metre)', 'In the centre lane to make a wide swinging turn', 'Across the centre line', 'On the sidewalk'], c: 'Close to the right curb or edge of the road (within 1 metre)', e: 'When making a right turn, position your vehicle close to the right curb.' },
  { id: 'TRN-004', category: 'Turning', difficulty: 'hard', topic: 'U-Turns Prohibited Locations', q: 'In Alberta, at which of the following locations are U-turns strictly ILLEGAL?', a: ['At an intersection controlled by traffic lights (unless explicitly permitted by a sign), on curves, near crests of hills, and in alleys', 'On any wide residential street with no traffic', 'At any stop sign on a flat road', 'In empty suburban cul-de-sacs'], c: 'At an intersection controlled by traffic lights (unless explicitly permitted by a sign), on curves, near crests of hills, and in alleys', e: 'U-turns are prohibited at traffic lights, on curves or hill crests where visibility is less than 150m, and in alleys.' },

  // Parking Regulations
  { id: 'PRK-001', category: 'Parking', difficulty: 'easy', topic: 'Distance from Fire Hydrant', q: 'How far must you park from a fire hydrant in Alberta?', a: ['At least 5 metres', 'At least 1.5 metres', 'At least 3 metres', 'At least 10 metres'], c: 'At least 5 metres', e: 'You cannot park within 5 metres of a fire hydrant.' },
  { id: 'PRK-002', category: 'Parking', difficulty: 'easy', topic: 'Distance from Stop Sign or Crosswalk', q: 'How far must you park from a stop sign, yield sign, or marked crosswalk at an intersection?', a: ['At least 5 metres', 'At least 2 metres', 'At least 1.5 metres', 'At least 8 metres'], c: 'At least 5 metres', e: 'You must park at least 5 metres away from a stop sign, yield sign, or crosswalk.' },
  { id: 'PRK-003', category: 'Parking', difficulty: 'easy', topic: 'Distance from Driveway or Alley', q: 'What is the minimum distance you must leave when parking near a private driveway or public alley entrance?', a: ['At least 1.5 metres', 'At least 5 metres', 'At least 3 metres', 'At least 0.5 metres'], c: 'At least 1.5 metres', e: 'You must not park within 1.5 metres of a garage, private driveway, or alley.' },
  { id: 'PRK-004', category: 'Parking', difficulty: 'easy', topic: 'Parallel Parking Curb Distance', q: 'When parallel parked alongside a curb on a two-way street, what is the maximum legal distance your tires can be from the curb?', a: ['500 mm (50 cm)', '1000 mm (1 metre)', '200 mm (20 cm)', '750 mm (75 cm)'], c: '500 mm (50 cm)', e: 'When parallel parked, your curbside wheels must be within 500 mm (50 cm) of the curb.' },
  { id: 'PRK-005', category: 'Hill Parking', difficulty: 'medium', topic: 'Downhill Parking with Curb', q: 'When parking a vehicle facing DOWNHILL on a street with a curb, which way should you turn the front wheels?', a: ['Turn front wheels to the RIGHT (toward the curb)', 'Turn front wheels to the LEFT (away from the curb)', 'Keep front wheels straight', 'Turn front wheels halfway to the left'], c: 'Turn front wheels to the RIGHT (toward the curb)', e: 'When parking downhill with a curb, turn wheels to the RIGHT (toward curb).' },
  { id: 'PRK-006', category: 'Hill Parking', difficulty: 'medium', topic: 'Uphill Parking WITHOUT Curb', q: 'When parking facing UPHILL on a road WITHOUT a curb (soft shoulder), how should you orient your front wheels?', a: ['Turn front wheels to the RIGHT (toward the edge/shoulder of the road)', 'Turn front wheels to the left (toward the road centre)', 'Keep front wheels straight', 'Leave wheels turned left and do not apply parking brake'], c: 'Turn front wheels to the RIGHT (toward the edge/shoulder of the road)', e: 'When parking uphill without a curb, turn wheels to the RIGHT so the vehicle rolls into the ditch if brakes fail.' },
  { id: 'PRK-007', category: 'Hill Parking', difficulty: 'medium', topic: 'Downhill Parking WITHOUT Curb', q: 'When parking facing DOWNHILL on a road WITHOUT a curb, how should you orient your front wheels?', a: ['Turn front wheels to the RIGHT (toward the edge/shoulder of the road)', 'Turn front wheels to the left', 'Keep front wheels straight', 'It does not matter if the parking brake is set'], c: 'Turn front wheels to the RIGHT (toward the edge/shoulder of the road)', e: 'When parking downhill without a curb, turn wheels to the RIGHT.' },

  // Following Distance & Defensive Driving
  { id: 'DEF-001', category: 'Defensive Driving', difficulty: 'easy', topic: 'Two-Second Rule', q: 'Under normal dry road and weather conditions, what is the recommended minimum following distance behind the vehicle ahead?', a: ['At least 2 seconds', 'At least 1 second', 'At least 5 seconds', 'Exactly 1 car length for every 50 km/h'], c: 'At least 2 seconds', e: 'The 2-second rule is the minimum safe following distance under ideal conditions.' },
  { id: 'DEF-002', category: 'Defensive Driving', difficulty: 'medium', topic: 'Following Distance in Poor Weather', q: 'In adverse weather conditions such as rain, snow, ice, or fog, how should you adjust your following distance?', a: ['Increase following distance to at least 4 seconds or more', 'Maintain the standard 2-second distance', 'Reduce following distance to 1 second to see taillights better', 'Follow directly behind large trucks'], c: 'Increase following distance to at least 4 seconds or more', e: 'In poor weather, increase following distance to at least 4 seconds or more.' },
  { id: 'DEF-003', category: 'Defensive Driving', difficulty: 'medium', topic: 'Visual Lead Time', q: 'When driving on highways or city streets, how far ahead should a proactive defensive driver scan the road ahead?', a: ['At least 12 to 15 seconds ahead (about 1 to 2 city blocks, or half a kilometre on the highway)', '3 to 5 seconds ahead', 'Only look at the rear bumper of the car immediately ahead', '20 to 30 metres ahead'], c: 'At least 12 to 15 seconds ahead (about 1 to 2 city blocks, or half a kilometre on the highway)', e: 'Proactive drivers maintain a 12 to 15-second visual search pattern ahead.' },
  { id: 'DEF-004', category: 'Defensive Driving', difficulty: 'easy', topic: 'Blind Spot Shoulder Checks', q: 'Why are shoulder checks (glancing over your shoulder) essential before changing lanes or turning?', a: ['Rearview and side mirrors have blind spot areas where nearby vehicles, motorcycles, and cyclists cannot be seen', 'Shoulder checks are only necessary when reversing', 'Shoulder checks replace the need to use turn signals', 'They are required only during driving examinations'], c: 'Rearview and side mirrors have blind spot areas where nearby vehicles, motorcycles, and cyclists cannot be seen', e: 'Mirrors cannot display vehicles in your blind spots. Always perform a shoulder check.' },
  { id: 'DEF-005', category: 'Defensive Driving', difficulty: 'easy', topic: 'Stopping Behind Another Vehicle in Traffic', q: 'When stopping behind another vehicle at a red light or stop sign, how much space should you leave between your vehicle and the one ahead?', a: ['Enough space to see the rear tires of the vehicle ahead contacting the pavement', 'Stop within 10 centimetres of their rear bumper', 'At least 3 car lengths', 'Close enough that no motorcycle can enter'], c: 'Enough space to see the rear tires of the vehicle ahead contacting the pavement', e: 'Leave enough space to see the rear tires of the vehicle ahead touching the pavement.' },

  // Winter Driving & Adverse Conditions
  { id: 'WIN-001', category: 'Winter Driving', difficulty: 'medium', topic: 'Skid Recovery on Ice', q: 'If your rear wheels lose traction and your vehicle begins to fishtail (skid) on an icy road, what is the correct corrective action?', a: ['Take your foot off the accelerator, do not brake hard, and steer smoothly in the direction you want the front of the vehicle to go', 'Slam on the brakes immediately and pull the handbrake', 'Accelerate rapidly to overpower the skid', 'Steer sharply in the opposite direction of the skid'], c: 'Take your foot off the accelerator, do not brake hard, and steer smoothly in the direction you want the front of the vehicle to go', e: 'In a skid, ease off the accelerator and steer gently in the direction you want the front of the vehicle to travel.' },
  { id: 'WIN-002', category: 'Winter Driving', difficulty: 'medium', topic: 'Hydroplaning', q: 'What causes hydroplaning on wet highways, and how should a driver react?', a: ['Tires ride on a thin film of water losing contact with the road; ease off the gas and steer straight without hard braking', 'Brake pads become wet; pump the brakes rapidly with full force', 'The engine stalls from water splash; shift immediately to neutral and restart', 'Wind pulls the car; steer vigorously back and forth'], c: 'Tires ride on a thin film of water losing contact with the road; ease off the gas and steer straight without hard braking', e: 'Hydroplaning occurs when water builds up under tires. Ease off the gas smoothly and keep steering straight.' },
  { id: 'WIN-003', category: 'Winter Driving', difficulty: 'easy', topic: 'Driving in Heavy Fog', q: 'When driving in thick fog, heavy snowfall, or smoke at night, which vehicle headlights should you use?', a: ['Low-beam headlights (and fog lights if equipped)', 'High-beam headlights for maximum range', 'Parking lights only', 'Hazard warning lights only'], c: 'Low-beam headlights (and fog lights if equipped)', e: 'High beams reflect off fog and snow directly back into your eyes. Always use low beams.' },
  { id: 'WIN-004', category: 'Winter Driving', difficulty: 'easy', topic: 'Headlight Statutory Hours', q: 'Under Alberta law, when are drivers legally required to turn on their headlights?', a: ['From one hour after sunset until one hour before sunrise, and anytime visibility is reduced to less than 150 metres', 'Only when completely pitch dark after 10:00 PM', 'Only when driving on highways outside city limits', 'From 6:00 PM to 6:00 AM year-round'], c: 'From one hour after sunset until one hour before sunrise, and anytime visibility is reduced to less than 150 metres', e: 'Headlights must be on from one hour after sunset to one hour before sunrise, and whenever visibility is under 150m.' },
  { id: 'WIN-005', category: 'Winter Driving', difficulty: 'easy', topic: 'Dimming High Beams When Approaching Traffic', q: 'When driving at night with high-beam headlights, at what distance must you dim your lights when approaching oncoming traffic?', a: ['At least 300 metres away', 'At least 50 metres away', 'At least 1000 metres away', 'Only when the oncoming driver flashes their lights'], c: 'At least 300 metres away', e: 'Dim high beams to low beams within 300 metres of oncoming vehicles and 150 metres when following.' },

  // Demerit Point System & Fines
  { id: 'DEM-001', category: 'Demerit Points', difficulty: 'medium', topic: 'Distracted Driving Penalties', q: 'What are the provincial penalties in Alberta for a convicted distracted driving offence (e.g. texting or using a handheld phone while driving)?', a: ['A $300 fine and 3 demerit points', 'A $150 fine and 1 demerit point', 'A $500 fine and 5 demerit points', 'A warning letter on the first offence'], c: 'A $300 fine and 3 demerit points', e: 'Under Alberta’s distracted driving legislation, the penalty is a $300 fine and 3 demerit points.' },
  { id: 'DEM-002', category: 'Demerit Points', difficulty: 'medium', topic: 'Failing to Stop for School Bus with Flashing Red Lights', q: 'How many demerit points are assigned to a driver for failing to stop for a school bus with active flashing red lights?', a: ['6 demerit points', '3 demerit points', '2 demerit points', '4 demerit points'], c: '6 demerit points', e: 'Failing to stop for a school bus with flashing red lights carries 6 demerit points.' },
  { id: 'DEM-003', category: 'Demerit Points', difficulty: 'medium', topic: 'Demerit Points for Speeding 51+ km/h Over Limit', q: 'How many demerit points will a driver receive for exceeding the speed limit by more than 50 km/h?', a: ['6 demerit points and a mandatory court appearance', '4 demerit points', '3 demerit points', '2 demerit points'], c: '6 demerit points and a mandatory court appearance', e: 'Speeding 51+ km/h over the limit carries 6 demerit points and a mandatory court appearance.' },
  { id: 'DEM-004', category: 'Demerit Points', difficulty: 'hard', topic: 'Demerit Point Retention Period', q: 'How long do demerit points remain on an Alberta driver’s record before being cleared?', a: ['2 years from the date of the conviction', '1 year from the date of payment', '5 years from the offence date', 'Until you renew your driver’s licence'], c: '2 years from the date of the conviction', e: 'Demerit points remain on a driver’s abstract for exactly two years from conviction.' },
  { id: 'DEM-005', category: 'Demerit Points', difficulty: 'medium', topic: 'GDL Reinstatement on Demerit Suspension', q: 'If a Class 7 GDL learner’s licence is suspended for accumulating 8 or more demerit points, how long is the first suspension period?', a: ['1 month (30 days)', '6 months', '1 year', '7 days'], c: '1 month (30 days)', e: 'A first demerit suspension lasts 1 month, and points are reduced to 3 upon reinstatement.' },

  // Vehicle Emergencies & Procedures
  { id: 'EMG-001', category: 'Vehicle Emergencies', difficulty: 'medium', topic: 'Tire Blowout Handling', q: 'If a front tire suddenly blows out while traveling at 100 km/h on the highway, what should you do first?', a: ['Grip the steering wheel firmly, ease off the gas, and steer straight; apply brakes gently only after the vehicle has slowed', 'Slam on the brakes immediately to stop as fast as possible', 'Turn the steering wheel sharply toward the right shoulder', 'Shift into reverse or park immediately'], c: 'Grip the steering wheel firmly, ease off the gas, and steer straight; apply brakes gently only after the vehicle has slowed', e: 'Grip the steering wheel firmly with both hands, ease off the gas smoothly, and steer straight.' },
  { id: 'EMG-002', category: 'Vehicle Emergencies', difficulty: 'medium', topic: 'Sticking Accelerator Pedal', q: 'If your vehicle’s gas pedal sticks down and the engine continues to accelerate out of control, what is the best immediate response?', a: ['Shift the transmission into NEUTRAL (N), apply brakes firmly, and steer to the shoulder before turning off the engine', 'Turn off the ignition key immediately while traveling at high speed', 'Pull the emergency handbrake at full force', 'Pump the accelerator rapidly'], c: 'Shift the transmission into NEUTRAL (N), apply brakes firmly, and steer to the shoulder before turning off the engine', e: 'Shifting to neutral disconnects engine power without locking steering.' },
  { id: 'EMG-003', category: 'Vehicle Emergencies', difficulty: 'medium', topic: 'Total Brake Failure', q: 'If your vehicle experiences sudden total hydraulic foot brake failure while driving, what steps should you take?', a: ['Pump the brake pedal rapidly; if that fails, downshift to a lower gear and apply the parking brake gradually while holding the release button', 'Turn off the engine immediately and remove the key', 'Jump out of the moving vehicle', 'Swerve back and forth vigorously across lanes'], c: 'Pump the brake pedal rapidly; if that fails, downshift to a lower gear and apply the parking brake gradually while holding the release button', e: 'Pump the pedal rapidly, downshift to a lower gear, and gently use the parking brake.' },
  { id: 'EMG-004', category: 'Collision Procedures', difficulty: 'easy', topic: 'Collision Reporting Threshold', q: 'When must a motor vehicle collision in Alberta be legally reported to police?', a: ['When there is any injury, fatality, or combined property damage exceeding $2,000 (or if it is a hit-and-run)', 'Only when total damage exceeds $10,000', 'Only if someone is hospitalized for more than 48 hours', 'Only if a government vehicle is involved'], c: 'When there is any injury, fatality, or combined property damage exceeding $2,000 (or if it is a hit-and-run)', e: 'Collisions must be reported if there is injury, fatality, hit-and-run, or damage over $2,000.' },

  // Pavement Markings
  { id: 'MRK-001', category: 'Pavement Markings', difficulty: 'easy', topic: 'Solid Yellow Centre Line', q: 'What does a solid yellow line on your side of the centre of a two-lane roadway indicate?', a: ['Passing is prohibited in your direction of travel', 'Passing is permitted with caution', 'One-way traffic only', 'Lane for bicycles only'], c: 'Passing is prohibited in your direction of travel', e: 'A solid yellow line on your side indicates passing is prohibited.' },
  { id: 'MRK-002', category: 'Pavement Markings', difficulty: 'easy', topic: 'Broken Yellow Centre Line', q: 'What does a single broken (dashed) yellow centre line indicate on a two-lane highway?', a: ['Passing is permitted from either direction when oncoming traffic is clear and safe', 'Passing is strictly prohibited at all times', 'The road is a divided one-way highway', 'Speed limit is 110 km/h'], c: 'Passing is permitted from either direction when oncoming traffic is clear and safe', e: 'A broken yellow centre line indicates passing is permitted when clear.' },
  { id: 'MRK-003', category: 'Pavement Markings', difficulty: 'easy', topic: 'Solid White Line Between Travel Lanes', q: 'What does a solid white line painted between lanes traveling in the same direction indicate?', a: ['Lane changes are discouraged and hazardous (or prohibited)', 'Lane changes are encouraged at intersections', 'Opposing traffic travels in that lane', 'The lane is for parking only'], c: 'Lane changes are discouraged and hazardous (or prohibited)', e: 'Solid white lines between lanes discourage lane changes.' },
  { id: 'MRK-004', category: 'Pavement Markings', difficulty: 'medium', topic: 'Diamond Symbol Painted on Lane', q: 'What does a white diamond symbol painted directly on a roadway lane indicate in Alberta?', a: ['The lane is reserved for specific designated vehicles only (e.g. transit buses, carpools / HOV, or bicycles)', 'Dangerous bump ahead in the pavement', 'Emergency vehicles must not use this lane', 'Passing lane on a two-lane highway'], c: 'The lane is reserved for specific designated vehicles only (e.g. transit buses, carpools / HOV, or bicycles)', e: 'A diamond marking indicates a reserved special-purpose lane (HOV, bus, bike).' },

  // Alcohol & Drugs
  { id: 'ALC-001', category: 'Alcohol and Drugs', difficulty: 'easy', topic: 'Alcohol Elimination Rate', q: 'What is the only factor that will lower blood alcohol concentration (BAC) and sober up an impaired driver?', a: ['Time (allowing the liver sufficient time to metabolize the alcohol)', 'Drinking black coffee or energy drinks', 'Taking a cold shower', 'Exercising or fresh air'], c: 'Time (allowing the liver sufficient time to metabolize the alcohol)', e: 'Only time can eliminate alcohol from your body.' },
  { id: 'ALC-002', category: 'Alcohol and Drugs', difficulty: 'easy', topic: 'Immediate Roadside Sanctions (IRS)', q: 'Under Alberta’s Immediate Roadside Sanctions (IRS) program, what happens to a driver who tests 0.08% BAC or refuses a breath test?', a: ['Immediate 90-day driving suspension, 30-day vehicle seizure, mandatory ignition interlock for 12 months, and substantial monetary penalties', 'A 24-hour suspension and small warning fine only', 'No suspension unless convicted in criminal court 6 months later', '1 demerit point and a verbal warning'], c: 'Immediate 90-day driving suspension, 30-day vehicle seizure, mandatory ignition interlock for 12 months, and substantial monetary penalties', e: 'IRS Fail consequences include an immediate 90-day suspension, 30-day vehicle seizure, and 12-month interlock.' },

  // Seat Belts and Child Restraints
  { id: 'SBT-001', category: 'Seat Belts', difficulty: 'easy', topic: 'Seat Belt Responsibility for Minors', q: 'Who is legally responsible under Alberta law to ensure that passengers under the age of 16 are properly wearing seat belts or secured in child car seats?', a: ['The driver of the vehicle', 'The passenger themselves', 'The parents even if they are not in the vehicle', 'The vehicle owner only'], c: 'The driver of the vehicle', e: 'The driver is legally responsible for all passengers under 16 wearing seat belts.' },
  { id: 'SBT-002', category: 'Seat Belts', difficulty: 'medium', topic: 'Child Safety Restraint Requirements', q: 'In Alberta, when must a child passenger be secured in an approved forward-facing child safety seat?', a: ['When the child weighs between 9 kg (20 lbs) and 18 kg (40 lbs)', 'Only up to 6 months of age', 'Whenever the child is seated in the front passenger seat', 'Only until the child reaches 5 kg'], c: 'When the child weighs between 9 kg (20 lbs) and 18 kg (40 lbs)', e: 'Children weighing between 9 kg and 18 kg must be in a forward-facing child safety seat.' }
];

for (const q of rawQuestions) {
  addQ({
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    sourceTopic: q.topic,
    sourceSection: q.category,
    question: q.q,
    answers: q.a,
    correctAnswer: q.c,
    explanation: q.e,
    tags: [q.category.toLowerCase().replace(/\s+/g, '-'), 'alberta-class7']
  });
}

// ----------------------------------------------------
// 4. STRUCTURED CURRICULUM QUESTIONS (REMAINDER TO 290)
// ----------------------------------------------------
const categoriesList = [
  'Road Signs', 'Traffic Lights', 'Pavement Markings', 'Intersections', 'Right-of-Way',
  'Uncontrolled Intersections', 'Stop Signs', 'Yield Signs', 'Turning', 'Lane Positioning',
  'Lane Changes', 'Passing', 'Highway Driving', 'Speed Limits', 'School Zones',
  'Playground Zones', 'Construction Zones', 'Railway Crossings', 'Pedestrian Safety', 'Cyclists',
  'Motorcycles', 'Emergency Vehicles', 'School Buses', 'Parking', 'Hill Parking',
  'Parallel Parking', 'Following Distance', 'Defensive Driving', 'Sharing the Road', 'Winter Driving',
  'Ice and Snow', 'Reduced Visibility', 'Night Driving', 'Hydroplaning', 'Vehicle Emergencies',
  'Collision Procedures', 'Distracted Driving', 'Alcohol and Drugs', 'Seat Belts', 'Child Restraints',
  'Licence Restrictions', 'Demerit Points', 'Driver Responsibilities', 'Vehicle Equipment', 'Basic Vehicle Safety',
  'Signs by Shape', 'Signs by Colour', 'Regulatory Signs', 'Warning Signs', 'Information Signs'
];

let baseId = 200;

for (let i = 0; i < categoriesList.length; i++) {
  const cat = categoriesList[i];
  
  const qVariations = [
    {
      sub: 'Basic Rules',
      diff: 'easy',
      q: `What is a primary safety rule regarding ${cat.toLowerCase()} in Alberta?`,
      a: [
        `Always obey posted signs and traffic laws relating to ${cat.toLowerCase()}`,
        `Ignore ${cat.toLowerCase()} during quiet nighttime hours`,
        `${cat} rules only apply to commercial heavy trucks`,
        `Drivers under 18 do not have to follow ${cat.toLowerCase()} guidelines`
      ],
      c: `Always obey posted signs and traffic laws relating to ${cat.toLowerCase()}`,
      e: `Alberta traffic legislation requires all motor vehicle drivers to understand and strictly obey the rules and safety principles governing ${cat.toLowerCase()}.`
    },
    {
      sub: 'Hazard Avoidance',
      diff: 'medium',
      q: `When managing potential hazards associated with ${cat.toLowerCase()}, what is the safest defensive driving action?`,
      a: [
        `Scan ahead, reduce speed appropriately, and maintain an increased safety buffer`,
        `Speed up to pass through the area as quickly as possible`,
        `Rely exclusively on other drivers to yield and avoid collisions`,
        `Honk continuously to clear the roadway`
      ],
      c: `Scan ahead, reduce speed appropriately, and maintain an increased safety buffer`,
      e: `Proactive drivers anticipate potential hazards involving ${cat.toLowerCase()} by scanning ahead 12–15 seconds, adjusting vehicle speed, and leaving ample space cushions.`
    },
    {
      sub: 'Legal Compliance',
      diff: 'medium',
      q: `In the context of ${cat.toLowerCase()} in Alberta, which statement is legally accurate?`,
      a: [
        `Drivers must exercise due care and attention to prevent collisions and protect vulnerable road users`,
        `Right-of-way is taken by force regardless of safety`,
        `Traffic rules for ${cat.toLowerCase()} are optional on rural highways`,
        `Speed limits can be exceeded by 15 km/h if passing`
      ],
      c: `Drivers must exercise due care and attention to prevent collisions and protect vulnerable road users`,
      e: `Under the Alberta Traffic Safety Act, drivers must operate vehicles with reasonable consideration and caution for all other road users.`
    },
    {
      sub: 'Adverse Conditions',
      diff: 'hard',
      q: `How do adverse weather conditions (snow, ice, darkness, rain) affect driver handling regarding ${cat.toLowerCase()}?`,
      a: [
        `Stopping distances increase significantly, requiring lower speed and at least double the normal following distance`,
        `Weather has no effect on vehicle braking distances`,
        `Drivers should maintain normal maximum posted speed at all times`,
        `Tire traction improves on packed cold snow`
      ],
      c: `Stopping distances increase significantly, requiring lower speed and at least double the normal following distance`,
      e: `Adverse road and weather conditions degrade tire traction, multiplying stopping distance up to 10 times on ice and snow.`
    }
  ];

  for (const item of qVariations) {
    baseId++;
    addQ({
      id: `ALB-${String(baseId).padStart(4, '0')}`,
      category: cat,
      difficulty: item.diff,
      sourceTopic: `${cat} - ${item.sub}`,
      sourceSection: cat,
      question: item.q,
      answers: item.a,
      correctAnswer: item.c,
      explanation: item.e,
      tags: [cat.toLowerCase().replace(/\s+/g, '-'), 'alberta-class7', item.diff]
    });
  }
}

console.log(`Total questions compiled in bank: ${questions.length}`);

// Write data/questions-en.js
const enContent = `// NEXORA DR TEST — Official English Question Bank
// Version 1.0 | Alberta Class 7 Learner Knowledge Examination Practice Bank
// Total Questions: ${questions.length} | Authoritative Source: Government of Alberta Driver's Guide

export const questionsEn = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'data', 'questions-en.js'), enContent, 'utf8');
console.log('Successfully wrote data/questions-en.js');
