const fs = require('fs');
const path = require('path');

const signsDir = path.join(__dirname, '..', 'assets', 'signs');
if (!fs.existsSync(signsDir)) {
  fs.mkdirSync(signsDir, { recursive: true });
}

const signs = {
  'stop.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <polygon points="58,10 142,10 190,58 190,142 142,190 58,190 10,142 10,58" fill="#DC2626" stroke="#FFFFFF" stroke-width="6"/>
    <polygon points="60,15 140,15 185,60 185,140 140,185 60,185 15,140 15,60" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    <text x="100" y="118" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="44" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">STOP</text>
  </svg>`,

  'yield.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <polygon points="100,185 15,25 185,25" fill="#DC2626" stroke="#FFFFFF" stroke-width="4"/>
    <polygon points="100,150 42,42 158,42" fill="#FFFFFF"/>
    <text x="100" y="78" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="24" font-weight="900" fill="#DC2626" text-anchor="middle" letter-spacing="1.5">YIELD</text>
  </svg>`,

  'max-50.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="100%" height="100%">
    <rect x="6" y="6" width="148" height="188" rx="12" fill="#FFFFFF" stroke="#000000" stroke-width="6"/>
    <text x="80" y="55" font-family="'DM Sans', 'Arial', sans-serif" font-size="20" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">MAXIMUM</text>
    <text x="80" y="145" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="80" font-weight="900" fill="#000000" text-anchor="middle">50</text>
  </svg>`,

  'max-80.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="100%" height="100%">
    <rect x="6" y="6" width="148" height="188" rx="12" fill="#FFFFFF" stroke="#000000" stroke-width="6"/>
    <text x="80" y="55" font-family="'DM Sans', 'Arial', sans-serif" font-size="20" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">MAXIMUM</text>
    <text x="80" y="145" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="80" font-weight="900" fill="#000000" text-anchor="middle">80</text>
  </svg>`,

  'max-100.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="100%" height="100%">
    <rect x="6" y="6" width="148" height="188" rx="12" fill="#FFFFFF" stroke="#000000" stroke-width="6"/>
    <text x="80" y="55" font-family="'DM Sans', 'Arial', sans-serif" font-size="18" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">MAXIMUM</text>
    <text x="80" y="145" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="70" font-weight="900" fill="#000000" text-anchor="middle">100</text>
  </svg>`,

  'school-zone.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <polygon points="100,15 185,75 160,185 40,185 15,75" fill="#D9F99D" stroke="#000000" stroke-width="6"/>
    <!-- Adult silhouette -->
    <circle cx="82" cy="72" r="10" fill="#000000"/>
    <path d="M72,88 Q82,82 92,88 L96,135 L86,135 L84,165 L76,165 L74,135 L68,135 Z" fill="#000000"/>
    <!-- Child silhouette -->
    <circle cx="122" cy="90" r="8" fill="#000000"/>
    <path d="M114,104 Q122,98 130,104 L132,140 L125,140 L123,165 L117,165 L115,140 L110,140 Z" fill="#000000"/>
    <!-- Briefcase/Bag -->
    <rect x="62" y="112" width="10" height="14" rx="2" fill="#000000"/>
  </svg>`,

  'playground-zone.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="100%" height="100%">
    <!-- Diamond upper -->
    <g transform="translate(100, 95) rotate(45)">
      <rect x="-65" y="-65" width="130" height="130" rx="10" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Running child and ball -->
    <circle cx="92" cy="55" r="9" fill="#000000"/>
    <path d="M84,70 L98,66 L108,82 L98,90 L102,112 L92,110 L88,94 L78,98 L72,85 L84,80 Z" fill="#000000"/>
    <circle cx="130" cy="100" r="8" fill="#000000"/>
    <!-- Tab below -->
    <rect x="35" y="175" width="130" height="55" rx="6" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
    <text x="100" y="214" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="34" font-weight="900" fill="#000000" text-anchor="middle">30</text>
  </svg>`,

  'pedestrian-crosswalk.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <circle cx="100" cy="55" r="10" fill="#000000"/>
    <path d="M92,72 L108,72 L116,98 L104,102 L98,84 L94,115 L106,145 L94,145 L86,120 L78,145 L66,145 L80,105 L82,82 Z" fill="#000000"/>
    <!-- Crosswalk stripes -->
    <line x1="45" y1="155" x2="155" y2="155" stroke="#000000" stroke-width="4"/>
    <line x1="45" y1="163" x2="155" y2="163" stroke="#000000" stroke-width="3" stroke-dasharray="8,6"/>
  </svg>`,

  'railway-crossing.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <circle cx="100" cy="100" r="90" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    <line x1="36" y1="36" x2="164" y2="164" stroke="#000000" stroke-width="14"/>
    <line x1="164" y1="36" x2="36" y2="164" stroke="#000000" stroke-width="14"/>
    <text x="50" y="112" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="44" font-weight="900" fill="#000000" text-anchor="middle">R</text>
    <text x="150" y="112" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="44" font-weight="900" fill="#000000" text-anchor="middle">R</text>
  </svg>`,

  'traffic-signal-ahead.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Traffic light housing -->
    <rect x="80" y="48" width="40" height="104" rx="8" fill="#000000"/>
    <circle cx="100" cy="68" r="11" fill="#DC2626"/>
    <circle cx="100" cy="100" r="11" fill="#EAB308"/>
    <circle cx="100" cy="132" r="11" fill="#22C55E"/>
  </svg>`,

  'merging-traffic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Main straight arrow -->
    <path d="M88,155 L88,68 L72,82 L72,60 L96,36 L120,60 L120,82 L104,68 L104,155 Z" fill="#000000"/>
    <!-- Merging curved lane -->
    <path d="M145,145 Q125,120 104,102 L104,120 Q120,132 135,150 Z" fill="#000000"/>
  </svg>`,

  'lane-ending.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Left lane straight -->
    <line x1="75" y1="45" x2="75" y2="155" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
    <!-- Right lane tapering left -->
    <path d="M125,155 L125,115 Q125,80 88,60" fill="none" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
  </svg>`,

  'divided-highway-begins.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Median island at top -->
    <path d="M90,40 Q100,32 110,40 L114,75 Q100,85 86,75 Z" fill="#000000"/>
    <!-- Curved arrows passing around island -->
    <path d="M72,155 L72,95 Q72,70 60,60 L50,70 L50,45 L78,45 L70,55 Q82,65 82,95 L82,155 Z" fill="#000000"/>
    <path d="M128,155 L128,95 Q128,70 140,60 L150,70 L150,45 L122,45 L130,55 Q118,65 118,95 L118,155 Z" fill="#000000"/>
  </svg>`,

  'divided-highway-ends.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Median island at bottom -->
    <path d="M88,130 Q100,120 112,130 L110,165 Q100,172 90,165 Z" fill="#000000"/>
    <!-- Arrows converging -->
    <path d="M65,155 L65,115 Q65,85 92,60 L80,60 L100,38 L120,60 L108,60 Q82,85 82,115 L82,155 Z" fill="#000000"/>
  </svg>`,

  'roundabout-ahead.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Counter clockwise 3 circular arrows -->
    <g transform="translate(100, 100)">
      <path d="M-15,-38 A 42 42 0 0 1 38,-15" fill="none" stroke="#000000" stroke-width="9"/>
      <polygon points="44,-24 40,-4 22,-12" fill="#000000"/>
      <path d="M38,15 A 42 42 0 0 1 -15,38" fill="none" stroke="#000000" stroke-width="9"/>
      <polygon points="-4,-44 16,-40 8,-22" fill="#000000"/>
      <path d="M-38,-15 A 42 42 0 0 1 -15,-38" fill="none" stroke="#000000" stroke-width="9"/>
      <polygon points="-40,24 -44,4 -26,12" fill="#000000"/>
    </g>
  </svg>`,

  'winding-road.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <path d="M100,155 C100,130 135,130 135,105 C135,80 65,80 65,55 L50,55 L75,30 L100,55 L85,55 C85,70 155,70 155,105 C155,140 120,140 120,155 Z" fill="#000000"/>
  </svg>`,

  'slippery-when-wet.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Car tilted -->
    <g transform="translate(100, 80) rotate(-12)">
      <rect x="-35" y="-15" width="70" height="28" rx="6" fill="#000000"/>
      <path d="M-22,-15 L-12,-32 L15,-32 L26,-15 Z" fill="#000000"/>
      <circle cx="-20" cy="15" r="8" fill="#000000"/>
      <circle cx="20" cy="15" r="8" fill="#000000"/>
    </g>
    <!-- Wavy skid marks -->
    <path d="M72,120 Q85,135 72,150" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
    <path d="M128,120 Q115,135 128,150" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
  </svg>`,

  'no-left-turn.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect x="8" y="8" width="184" height="184" rx="16" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
    <circle cx="100" cy="100" r="75" fill="none" stroke="#DC2626" stroke-width="16"/>
    <!-- Left turn arrow -->
    <path d="M115,145 L115,100 Q115,85 100,85 L70,85 L70,100 L45,75 L70,50 L70,65 L100,65 Q135,65 135,100 L135,145 Z" fill="#000000"/>
    <!-- Prohibitory slash -->
    <line x1="47" y1="47" x2="153" y2="153" stroke="#DC2626" stroke-width="16"/>
  </svg>`,

  'no-right-turn.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect x="8" y="8" width="184" height="184" rx="16" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
    <circle cx="100" cy="100" r="75" fill="none" stroke="#DC2626" stroke-width="16"/>
    <!-- Right turn arrow -->
    <path d="M85,145 L85,100 Q85,85 100,85 L130,85 L130,100 L155,75 L130,50 L130,65 L100,65 Q65,65 65,100 L65,145 Z" fill="#000000"/>
    <!-- Prohibitory slash -->
    <line x1="47" y1="47" x2="153" y2="153" stroke="#DC2626" stroke-width="16"/>
  </svg>`,

  'no-u-turn.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect x="8" y="8" width="184" height="184" rx="16" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
    <circle cx="100" cy="100" r="75" fill="none" stroke="#DC2626" stroke-width="16"/>
    <!-- U-turn arrow -->
    <path d="M125,145 L125,95 Q125,65 100,65 Q75,65 75,95 L75,120 L60,120 L85,145 L110,120 L95,120 L95,95 Q95,82 100,82 Q105,82 105,95 L105,145 Z" fill="#000000"/>
    <!-- Prohibitory slash -->
    <line x1="47" y1="47" x2="153" y2="153" stroke="#DC2626" stroke-width="16"/>
  </svg>`,

  'do-not-enter.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect x="8" y="8" width="184" height="184" rx="16" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
    <circle cx="100" cy="100" r="78" fill="#DC2626"/>
    <rect x="42" y="85" width="116" height="30" rx="4" fill="#FFFFFF"/>
  </svg>`,

  'one-way-right.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100" width="100%" height="100%">
    <rect x="4" y="4" width="212" height="92" rx="8" fill="#000000" stroke="#FFFFFF" stroke-width="3"/>
    <!-- White arrow -->
    <path d="M25,50 L145,50 L145,28 L195,50 L145,72 L145,50 Z" fill="#FFFFFF"/>
    <text x="85" y="58" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="20" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">ONE WAY</text>
  </svg>`,

  'one-way-left.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100" width="100%" height="100%">
    <rect x="4" y="4" width="212" height="92" rx="8" fill="#000000" stroke="#FFFFFF" stroke-width="3"/>
    <!-- White arrow pointing left -->
    <path d="M195,50 L75,50 L75,28 L25,50 L75,72 L75,50 Z" fill="#FFFFFF"/>
    <text x="135" y="58" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="20" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">ONE WAY</text>
  </svg>`,

  'no-parking.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect x="8" y="8" width="184" height="184" rx="16" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
    <circle cx="100" cy="100" r="75" fill="none" stroke="#DC2626" stroke-width="16"/>
    <text x="100" y="128" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="86" font-weight="900" fill="#000000" text-anchor="middle">P</text>
    <line x1="47" y1="47" x2="153" y2="153" stroke="#DC2626" stroke-width="16"/>
  </svg>`,

  'two-way-traffic.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#FACC15" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Up arrow -->
    <path d="M78,145 L78,65 L64,78 L64,60 L85,38 L106,60 L106,78 L92,65 L92,145 Z" fill="#000000"/>
    <!-- Down arrow -->
    <path d="M122,55 L122,135 L136,122 L136,140 L115,162 L94,140 L94,122 L108,135 L108,55 Z" fill="#000000"/>
  </svg>`,

  'construction-roadwork.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#F97316" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Digging worker silhouette -->
    <circle cx="118" cy="58" r="9" fill="#000000"/>
    <path d="M112,72 L128,78 L118,102 L100,90 L92,122 L102,150 L88,150 L78,125 L65,150 L52,150 L68,115 L78,80 L102,80 Z" fill="#000000"/>
    <!-- Shovel -->
    <line x1="124" y1="78" x2="148" y2="145" stroke="#000000" stroke-width="5"/>
    <polygon points="144,142 155,140 152,156 138,154" fill="#000000"/>
  </svg>`,

  'construction-flagperson.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g transform="translate(100, 100) rotate(45)">
      <rect x="-68" y="-68" width="136" height="136" rx="12" fill="#F97316" stroke="#000000" stroke-width="6"/>
    </g>
    <!-- Flagperson with flag -->
    <circle cx="85" cy="58" r="9" fill="#000000"/>
    <path d="M78,72 L96,72 L100,118 L94,152 L84,152 L86,122 L80,152 L70,152 L74,118 L68,88 Z" fill="#000000"/>
    <!-- Arm holding flag staff horizontally -->
    <line x1="92" y1="85" x2="152" y2="85" stroke="#000000" stroke-width="5"/>
    <polygon points="120,85 152,85 152,118 120,118" fill="#000000"/>
  </svg>`,

  'slow-moving-vehicle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" width="100%" height="100%">
    <polygon points="100,15 188,165 12,165" fill="#EF4444"/>
    <polygon points="100,45 162,150 38,150" fill="#F97316"/>
  </svg>`,

  'hospital.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="100%" height="100%">
    <rect x="6" y="6" width="168" height="168" rx="16" fill="#2563EB" stroke="#FFFFFF" stroke-width="4"/>
    <path d="M55,42 L75,42 L75,78 L105,78 L105,42 L125,42 L125,138 L105,138 L105,102 L75,102 L75,138 L55,138 Z" fill="#FFFFFF"/>
  </svg>`,

  'keep-right.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="100%" height="100%">
    <rect x="6" y="6" width="148" height="188" rx="12" fill="#FFFFFF" stroke="#000000" stroke-width="6"/>
    <!-- Obstacle divider at top -->
    <path d="M70,35 Q80,28 90,35 L95,65 Q80,75 65,65 Z" fill="#000000"/>
    <!-- Arrow pointing down and right -->
    <path d="M55,75 Q75,90 95,115 L108,102 L112,142 L72,138 L85,125 Q65,100 45,85 Z" fill="#000000"/>
  </svg>`,

  'straight-or-left-lane.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="100%" height="100%">
    <rect x="6" y="6" width="148" height="188" rx="12" fill="#FFFFFF" stroke="#000000" stroke-width="6"/>
    <!-- Straight shaft & arrow -->
    <path d="M92,165 L92,75 L80,88 L80,68 L100,45 L120,68 L120,88 L108,75 L108,165 Z" fill="#000000"/>
    <!-- Left branching arrow -->
    <path d="M92,125 Q92,90 60,90 L60,102 L38,80 L60,58 L60,70 Q108,70 108,125 Z" fill="#000000"/>
  </svg>`,

  'right-turn-only-lane.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" width="100%" height="100%">
    <rect x="6" y="6" width="148" height="188" rx="12" fill="#FFFFFF" stroke="#000000" stroke-width="6"/>
    <path d="M65,145 L65,105 Q65,75 95,75 L95,90 L125,65 L95,40 L95,55 Q45,55 45,105 L45,145 Z" fill="#000000"/>
    <text x="80" y="175" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="20" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="2">ONLY</text>
  </svg>`,

  'passing-prohibited.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%">
    <!-- Yellow pennant -->
    <polygon points="15,15 185,60 15,105" fill="#FACC15" stroke="#000000" stroke-width="5"/>
    <text x="60" y="52" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="14" font-weight="900" fill="#000000" letter-spacing="1">NO</text>
    <text x="60" y="74" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="14" font-weight="900" fill="#000000" letter-spacing="1">PASSING</text>
  </svg>`,

  'emergency-vehicles-slowdown.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 220" width="100%" height="100%">
    <rect x="6" y="6" width="168" height="208" rx="12" fill="#FFFFFF" stroke="#000000" stroke-width="5"/>
    <text x="90" y="38" font-family="'DM Sans', 'Arial', sans-serif" font-size="15" font-weight="900" fill="#000000" text-anchor="middle">PASSING</text>
    <text x="90" y="58" font-family="'DM Sans', 'Arial', sans-serif" font-size="14" font-weight="900" fill="#DC2626" text-anchor="middle">EMERGENCY</text>
    <text x="90" y="78" font-family="'DM Sans', 'Arial', sans-serif" font-size="13" font-weight="900" fill="#000000" text-anchor="middle">VEHICLES</text>
    <rect x="25" y="90" width="130" height="85" rx="8" fill="#F8FAFC" stroke="#000000" stroke-width="3"/>
    <text x="90" y="112" font-family="'DM Sans', 'Arial', sans-serif" font-size="12" font-weight="700" fill="#000000" text-anchor="middle">MAXIMUM</text>
    <text x="90" y="162" font-family="'DM Sans', 'Arial Black', sans-serif" font-size="46" font-weight="900" fill="#000000" text-anchor="middle">60</text>
    <text x="90" y="198" font-family="'DM Sans', 'Arial', sans-serif" font-size="11" font-weight="700" fill="#64748B" text-anchor="middle">WHEN FLASHING</text>
  </svg>`
};

let count = 0;
for (const [filename, svgContent] of Object.entries(signs)) {
  fs.writeFileSync(path.join(signsDir, filename), svgContent.trim());
  count++;
}
console.log(`Successfully generated ${count} vector SVG traffic signs in ${signsDir}`);
