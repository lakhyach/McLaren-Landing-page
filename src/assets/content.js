// VELOCE GT-01 — original concept content & configurator data.
// All names, figures and copy are invented for this independent concept study.

export const BRAND = {
  marque: 'VELOCE',
  model: 'GT-01 Concept',
  tagline: 'Independent design concept',
  disclaimer:
    'VELOCE GT-01 is an independent, non-commercial design and engineering study inspired by high-performance automotive design language. It is not affiliated with, endorsed by, or connected to McLaren Automotive or any vehicle manufacturer. All names, marks, and figures are fictional.',
}

export const HERO = {
  kicker: 'Project 01 — Real-time WebGL',
  title: ['Form', 'sculpted by', 'airflow.'],
  sub: 'A monocoque concept explored entirely in the browser — cinematic camera work, live material physics and a fully interactive configurator. Drag to orbit. Scroll to fly through.',
}

export const STATS = [
  { id: 'power', value: 1036, suffix: ' hp', label: 'Peak output', detail: 'Twin-motor + range-extender' },
  { id: 'zero', value: 2.4, suffix: ' s', label: '0–100 km/h', decimals: 1, detail: 'Launch control, track mode' },
  { id: 'vmax', value: 341, suffix: ' km/h', label: 'V-max', detail: 'Aero-optimised tail' },
  { id: 'weight', value: 1290, suffix: ' kg', label: 'Dry mass', detail: 'Carbon monocoque' },
  { id: 'cd', value: 0.29, suffix: ' Cd', label: 'Drag coeff.', decimals: 2, detail: 'Active underbody' },
  { id: 'dl', value: 1.6, suffix: ' g', label: 'Lat. grip', decimals: 1, detail: 'Ground-effect diffuser' },
]

export const AERO = [
  {
    id: 'monocoque',
    index: '01',
    title: 'Single-piece monocoque',
    body: 'The passenger cell is extruded as one continuous surface — every line on the GT-01 exists to move air, not to decorate it.',
  },
  {
    id: 'canopy',
    index: '02',
    title: 'Drooped glass canopy',
    body: 'A low, teardrop greenhouse keeps the frontal area minimal while the tinted laminate diffuses cabin heat across a graded coating.',
  },
  {
    id: 'signature',
    index: '03',
    title: 'Ember light signature',
    body: 'Emissive strips replace chrome. A front-to-rear light band reads the car’s speed and charge state to following traffic.',
  },
  {
    id: 'wing',
    index: '04',
    title: 'Active rear wing',
    body: 'The wing deploys with speed and stalls flat under braking, trading downforce for drag exactly when the driver needs either.',
  },
]

export const CONFIG = {
  paints: [
    { id: 'ember', name: 'Ember Papaya', hex: '#ff6a1f', metalness: 0.85, roughness: 0.28, swatch: '#ff6a1f' },
    { id: 'titanium', name: 'Titanium Frost', hex: '#c9cfd6', metalness: 0.95, roughness: 0.16, swatch: '#c9cfd6' },
    { id: 'onyx', name: 'Onyx Carbon', hex: '#17171c', metalness: 0.7, roughness: 0.4, swatch: '#17171c' },
    { id: 'ash', name: 'Ash Silver', hex: '#8b8f96', metalness: 0.9, roughness: 0.22, swatch: '#8b8f96' },
    { id: 'cobalt', name: 'Midnight Cobalt', hex: '#1e3a8a', metalness: 0.85, roughness: 0.24, swatch: '#1e3a8a' },
    { id: 'linen', name: 'Chalk Linen', hex: '#e7e5e4', metalness: 0.25, roughness: 0.34, swatch: '#e7e5e4' },
    { id: 'signal', name: 'Signal Yellow', hex: '#facc15', metalness: 0.8, roughness: 0.3, swatch: '#facc15' },
    { id: 'verdant', name: 'Verdant Magno', hex: '#1f8a5b', metalness: 0.8, roughness: 0.36, swatch: '#1f8a5b' },
  ],
  rims: [
    { id: 'aero', name: '20" Aero Blade', price: 0, color: '#d4d4d8' },
    { id: 'track', name: '21" Forged Track', price: 6800, color: '#2a2a34' },
    { id: 'turbina', name: '20" Turbinia', price: 4200, color: '#8b8f96' },
  ],
  calipers: [
    { id: 'ember', name: 'Ember', hex: '#ff6a1f' },
    { id: 'silver', name: 'Satin Silver', hex: '#d4d4d8' },
    { id: 'graphite', name: 'Graphite', hex: '#3a3a44' },
    { id: 'yellow', name: 'Hi-Viz Yellow', hex: '#facc15' },
  ],
  basePrice: 310000,
}

export const HOTSPOT_INFO = {
  powertrain:
    'Carbon-cell monocoque wrapping a twin-motor all-wheel drivetrain. Structural, not cosmetic.',
  canopy:
    'Teardrop laminate canopy tuned for a 0.29 Cd while keeping roll-over protection certification targets.',
  wing:
    'Speed-reactive rear wing. Deploys with velocity; stalls flat under braking to trade downforce for stability.',
}

export const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Performance', href: '#performance' },
  { label: 'Aero', href: '#aero' },
  { label: 'Configure', href: '#configure' },
]
