// McLaren P1 real-time study — content & configurator data.
// 3D model: "Mclaren P1 | www.vecarz.com" by vecarz, CC-BY 4.0 via Sketchfab.
// Performance figures are McLaren's published P1 numbers (mclaren.com / contemporary
// road tests), verified against sources listed in SPECS below; colours/pricing are illustrative.

export const BRAND = {
  marque: 'McLaren',
  model: 'P1',
  tagline: 'Real-time 3D experience',
  disclaimer:
    'This is an independent, non-commercial portfolio study in real-time WebGL created for ' +
    'web-graphics practice. The McLaren P1 3D model was authored by vecarz (www.vecarz.com) and ' +
    'is used under Creative Commons Attribution 4.0. This site is not affiliated with, endorsed ' +
    'by, or connected to McLaren Automotive. McLaren and P1 are trademarks of McLaren Automotive Ltd.',
}

export const HERO = {
  kicker: 'The Art of Engineered Speed',
  title: ['Born to', 'defy the', 'ordinary.'],
  sub: 'Explore the McLaren P1 through an immersive real-time 3D experience, precision detailing and an interactive vehicle configurator. Drag to orbit — scroll to fly through.',
}

// McLaren quotes combined output as 916 PS (= 903 bhp / 674 kW); PS and hp are not
// interchangeable, so the figure is labelled in PS. Downforce is McLaren/autozine's
// ~600 kg at speed (not the widely-misquoted 1,000 kg). Electric range is the
// published ~11 km (6.8 mi) zero-emission figure.
export const STATS = [
  { id: 'power', value: 916, suffix: ' PS', label: 'Combined output', detail: '903 bhp · 3.8L twin-turbo V8 + electric' },
  { id: 'zero', value: 2.8, suffix: ' s', label: '0–100 km/h', decimals: 1, detail: 'Race mode' },
  { id: 'vmax', value: 350, suffix: ' km/h', label: 'V-max', detail: 'Electronically limited' },
  { id: 'weight', value: 1395, suffix: ' kg', label: 'Dry mass', detail: 'Carbon MonoCage cell' },
  { id: 'dl', value: 600, suffix: ' kg', label: 'Downforce', detail: 'Active aero at speed' },
  { id: 'range', value: 11, suffix: ' km', label: 'Electric range', detail: 'Zero-emission mode' },
]

export const AERO = [
  {
    id: 'monocoque',
    index: '01',
    title: 'Carbon MonoCage',
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
    '3.8-litre twin-turbo V8 plus electric motor — 916 PS combined through a 7-speed dual-clutch. Hybrid, not compromise.',
  canopy:
    'Carbon MonoCage cockpit with dihedral doors; the roofline flows straight into the flying buttresses.',
  wing:
    'Speed-reactive rear wing. Deploys with velocity, stalls flat under braking, and acts as an airbrake in Race mode.',
}

// Hybrid powertrain — McLaren published figures (mclaren.com specs + contemporary press).
// The V8 and the electric motor are quoted separately, then summed to the combined figure.
export const POWERTRAIN = {
  headline: 'One crankshaft, two eras.',
  intro:
    'A 3.8-litre twin-turbo V8 built for the track, and an electric motor that fills the gaps the turbos leave. They drive the rear axle through a single seven-speed dual-clutch — the same idea McLaren raced in Formula 1 as KERS.',
  sources: [
    {
      id: 'v8',
      title: 'M838TQ · 3.8L twin-turbo V8',
      figure: '737',
      unit: ' PS',
      sub: '727 bhp @ 7,500 rpm · 720 Nm @ 4,000 rpm',
      body: 'The internal-combustion half: a flat-plane-crank V8 boosted to 1.4 bar, spinning to a 7,500 rpm limiter.',
    },
    {
      id: 'ev',
      title: 'Electric motor · IPUG',
      figure: '179',
      unit: ' PS',
      sub: '176 bhp · 132 kW · 4.7 kWh liquid-cooled pack',
      body: 'The electric half: bolted to the transmission, it fills torque lag and can drive the car alone in Zero-emission mode.',
    },
    {
      id: 'combined',
      title: 'Combined output',
      figure: '916',
      unit: ' PS',
      sub: '903 bhp / 674 kW · 900 Nm · 7-speed dual-clutch',
      body: 'Both plants together — and the reason there is no reverse gear: the electric motor drives the car backwards on its own.',
    },
  ],
  modes: [
    { name: 'E', note: 'Electric-only, silent, up to ~11 km.' },
    { name: 'P', note: 'Hybrid — the everyday default.' },
    { name: 'G', note: 'Grand Prix — sharper response, active aero.' },
    { name: 'R', note: 'Race — full 916 PS, DRS, max deployment.' },
  ],
}

// Technical reference — consolidated published specifications with sources.
export const SPECS = {
  intro:
    'A single-page technical reference for the figures used across this experience. Every value is McLaren’s own published specification or widely corroborated road-test data.',
  groups: [
    {
      title: 'Powertrain',
      rows: [
        ['Configuration', '3.8L twin-turbo V8 + electric motor (M838TQ)'],
        ['Combined output', '916 PS (903 bhp / 674 kW)'],
        ['Combined torque', '900 Nm (664 lb-ft)'],
        ['Transmission', '7-speed dual-clutch, rear-wheel drive'],
        ['Battery', '4.7 kWh lithium-ion, liquid-cooled'],
      ],
    },
    {
      title: 'Performance',
      rows: [
        ['0–100 km/h', '2.8 s'],
        ['0–200 km/h', '6.8 s'],
        ['Top speed', '350 km/h (217 mph), limited'],
        ['Downforce', '~600 kg at speed (active aero)'],
        ['Electric range', '~11 km (6.8 mi)'],
      ],
    },
    {
      title: 'Structure',
      rows: [
        ['Chassis', 'Carbon-fibre MonoCage'],
        ['Dry mass', '1,395 kg'],
        ['Kerb mass', '1,547 kg'],
        ['Production', '375 units (2013–2015)'],
      ],
    },
  ],
  sources: [
    { label: 'McLaren P1 official specifications', href: 'https://www.mclaren.com/cars/zh_zh/ultimate-models/mclaren-p1' },
    { label: 'McLaren P1 — Wikipedia', href: 'https://en.wikipedia.org/wiki/McLaren_P1' },
  ],
}

export const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Performance', href: '#performance' },
  { label: 'Powertrain', href: '#powertrain' },
  { label: 'Aero', href: '#aero' },
  { label: 'Configure', href: '#configure' },
]
