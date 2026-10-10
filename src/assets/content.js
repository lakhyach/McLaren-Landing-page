// McLaren P1 real-time study — content & configurator data.
// 3D model: "Mclaren P1 | www.vecarz.com" by vecarz, CC-BY 4.0 via Sketchfab.
// Performance figures are McLaren's published P1 numbers; colours/pricing are illustrative.

export const BRAND = {
  marque: 'McLaren',
  model: 'P1',
  tagline: 'Real-time 3D study',
  disclaimer:
    'This is an independent, non-commercial portfolio study in real-time WebGL created for ' +
    'web-graphics practice. The McLaren P1 3D model was authored by vecarz (www.vecarz.com) and ' +
    'is used under Creative Commons Attribution 4.0. This site is not affiliated with, endorsed ' +
    'by, or connected to McLaren Automotive. McLaren and P1 are trademarks of McLaren Automotive Ltd.',
}

export const HERO = {
  kicker: 'Project 01 — Real-time WebGL',
  title: ['Form', 'sculpted by', 'airflow.'],
  sub: 'McLaren’s hybrid hypercar explored entirely in the browser — cinematic camera work, live clearcoat physics and a fully interactive configurator. Drag to orbit. Scroll to fly through.',
}

export const STATS = [
  { id: 'power', value: 916, suffix: ' hp', label: 'Combined output', detail: '3.8L twin-turbo V8 + electric' },
  { id: 'zero', value: 2.8, suffix: ' s', label: '0–100 km/h', decimals: 1, detail: 'Race mode, launch control' },
  { id: 'vmax', value: 350, suffix: ' km/h', label: 'V-max (limited)', detail: 'Wing in low-drag attitude' },
  { id: 'weight', value: 1395, suffix: ' kg', label: 'Dry mass', detail: 'Carbon “monoVage” cell' },
  { id: 'dl', value: 1000, suffix: ' kg', label: 'Downforce', detail: 'Active aero at speed' },
  { id: 'range', value: 11, suffix: ' km', label: 'Electric range', detail: 'Zero-emission mode' },
]

export const AERO = [
  {
    id: 'monocoque',
    index: '01',
    title: 'Carbon monoVage',
    body: 'The passenger cell is a single carbon-fibre moulding — McLaren racing DNA, light and stiff enough that every surface on the P1 exists to move air, not to decorate it.',
  },
  {
    id: 'canopy',
    index: '02',
    title: 'Dihedral cockpit',
    body: 'The roofline sweeps into the flying buttresses in one teardrop; the dihedral doors carry the window frame with them, leaving the side intakes completely open to the air.',
  },
  {
    id: 'signature',
    index: '03',
    title: 'Teardrop tail',
    body: 'A single LED cluster sits high in the tail like a Formula 1 rain light — the exhaust exits through the diffuser itself, energising the underbody airflow under throttle.',
  },
  {
    id: 'wing',
    index: '04',
    title: 'Active rear wing',
    body: 'The wing deploys with speed and stalls flat under braking — DRS in race mode — trading downforce for drag exactly when the driver needs either.',
  },
]

export const CONFIG = {
  paints: [
    { id: 'ember', name: 'Papaya Spark', hex: '#ff6a1f', metalness: 0.65, roughness: 0.22, swatch: '#ff6a1f' },
    { id: 'titanium', name: 'Bannister Grey', hex: '#8b8f96', metalness: 0.9, roughness: 0.22, swatch: '#8b8f96' },
    { id: 'onyx', name: 'Onyx Black', hex: '#17171c', metalness: 0.7, roughness: 0.4, swatch: '#17171c' },
    { id: 'ash', name: 'Frozen White', hex: '#e7e5e4', metalness: 0.25, roughness: 0.34, swatch: '#e7e5e4' },
    { id: 'cobalt', name: 'McLaren Blue', hex: '#1e3a8a', metalness: 0.85, roughness: 0.24, swatch: '#1e3a8a' },
    { id: 'linen', name: 'Silk Beige', hex: '#c9cfd6', metalness: 0.95, roughness: 0.16, swatch: '#c9cfd6' },
    { id: 'signal', name: 'Hazard Yellow', hex: '#facc15', metalness: 0.8, roughness: 0.3, swatch: '#facc15' },
    { id: 'verdant', name: 'Emerald Isle', hex: '#1f8a5b', metalness: 0.8, roughness: 0.36, swatch: '#1f8a5b' },
  ],
  rims: [
    { id: 'aero', name: '10-Spoke Aero', price: 0, color: '#d4d4d8' },
    { id: 'track', name: 'Forged Track', price: 6800, color: '#2a2a34' },
    { id: 'turbina', name: 'Turbine Finish', price: 4200, color: '#8b8f96' },
  ],
  calipers: [
    { id: 'ember', name: 'Papaya', hex: '#ff6a1f' },
    { id: 'silver', name: 'Satin Silver', hex: '#d4d4d8' },
    { id: 'graphite', name: 'Graphite', hex: '#3a3a44' },
    { id: 'yellow', name: 'Hi-Viz Yellow', hex: '#facc15' },
  ],
  basePrice: 1150000,
}

export const HOTSPOT_INFO = {
  powertrain:
    '3.8-litre twin-turbo V8 plus electric motor — 916 hp combined through a 7-speed dual-clutch. Hybrid, not compromise.',
  canopy:
    'Carbon “monoVage” cockpit with dihedral doors; the roofline flows straight into the flying buttresses.',
  wing:
    'Speed-reactive rear wing. Deploys with velocity, stalls flat under braking, and acts as an airbrake in Race mode.',
}

export const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Performance', href: '#performance' },
  { label: 'Aero', href: '#aero' },
  { label: 'Configure', href: '#configure' },
]
