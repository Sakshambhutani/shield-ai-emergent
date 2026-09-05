export type FutureHorizon = 'NOW' | 'POSITION' | 'OPTION';
export type CoreId = 'army' | 'ecosystem' | 'navy';
type Reference = { label: string; url: string };
export interface FutureOption {
  id: string; title: string; tag: string; horizon: FutureHorizon; core: CoreId;
  mission: string; wedge: string; signal: string; proof: string; timing: string; gate: string;
  programme: string; budget: 'Low' | 'Medium'; fit: 'High' | 'Medium'; route: string;
  inference: string; proofSource: Reference; indiaSource: Reference;
}

// Horizon, fit, route and linkage are editable strategic judgements, not programme facts.
// No values are aggregated: evidence of demand does not establish Shield access.
export const FUTURE_OPTIONS: FutureOption[] = [
  {
    id: 'cca', title: 'CCA / X-BAT', tag: 'Airpower', horizon: 'POSITION', core: 'ecosystem',
    mission: 'Collaborative aircraft and future fighter teaming.',
    wedge: 'Hivemind · X-BAT · Aechelon.',
    signal: 'HAL’s CATS roadmap signals Indian interest in combat air teaming.',
    proof: 'Hivemind selected for the US CCA programme; integrated on YFQ-44A.',
    timing: 'Shape requirements now; potential scale in 3–5+ years.',
    gate: 'Indian platform access, a sponsor and a funded integration path.',
    programme: 'CATS is a demand signal; no Indian Shield award established here.', budget: 'Low', fit: 'High', route: 'B2B OEM / Partner',
    inference: 'OEM embedding may earn access to future airpower. X-BAT is not an Indian programme.',
    proofSource: { label: 'Shield AI · US CCA selection, February 2026', url: 'https://shield.ai/shield-ai-selected-as-mission-autonomy-provider-for-the-u-s-air-force-collaborative-combat-aircraft-program/' },
    indiaSource: { label: 'HAL · CATS product brochure', url: 'https://hal-india.co.in/backend/wp-content/uploads/2022/12/LCA.pdf' },
  },
  {
    id: 'weapons', title: 'Weapons autonomy', tag: 'OEM layer', horizon: 'POSITION', core: 'army',
    mission: 'Mission autonomy for Indian-built loitering and teaming systems.',
    wedge: 'Hivemind integrated with an Indian weapon developer.',
    signal: 'TASL’s ALS portfolio establishes an Indian loitering-system ecosystem.',
    proof: 'Hivemind provides platform-agnostic mission autonomy; weapon fit needs validation.',
    timing: 'Position now; potential integration in 2–5 years.',
    gate: 'Prime access, integration approval and a funded customer requirement.',
    programme: 'Product evidence; no Shield weapons contract established here.', budget: 'Low', fit: 'Medium', route: 'B2B OEM',
    inference: 'Army credibility may open prime relationships; Shield need not manufacture the weapon.',
    proofSource: { label: 'Shield AI · Hivemind capabilities', url: 'https://shield.ai/hivemind/' },
    indiaSource: { label: 'TASL · Advanced Loitering Systems', url: 'https://www.tataadvancedsystems.com/advanced-loitering-systems' },
  },
  {
    id: 'space', title: 'Military space', tag: 'Constellations', horizon: 'OPTION', core: 'ecosystem',
    mission: 'Defence-space constellation autonomy and national-security ISR.',
    wedge: 'Hivemind Space · simulation and mission autonomy.',
    signal: 'DefSpace connects military and industry; Indian access is unproven.',
    proof: 'Hivemind ran on a NOVI satellite in orbit with Sedaro.',
    timing: 'Monitor programme access; potential scale in 3–5+ years.',
    gate: 'Defence-space customer access, open architecture and a funded pathway.',
    programme: 'No Indian funded Shield constellation programme verified in this view.', budget: 'Low', fit: 'Medium', route: 'B2G / Partner',
    inference: 'The uncertainty is India access and timing. ISRO is an execution ecosystem, not civilian-space TAM.',
    proofSource: { label: 'Shield AI · NOVI on-orbit demonstration', url: 'https://shield.ai/shield-ai-and-sedaro-demonstrate-trusted-autonomy-capabilities-on-novi-satellite/' },
    indiaSource: { label: 'ISpA · Indian DefSpace Symposium 2025', url: 'https://www.ispaevents.space/_files/ugd/f6c7c9_880acb7c50f84b0187f10803b5a2d1fe.pdf' },
  },
  {
    id: 'undersea', title: 'Undersea autonomy', tag: 'Maritime', horizon: 'OPTION', core: 'navy',
    mission: 'Underwater surveillance, mine countermeasures and distributed sensing.',
    wedge: 'Extend Hivemind Maritime through an Indian underwater-platform partner.',
    signal: 'GRSE’s Neerakshi AUV signals an Indian underwater-system ecosystem.',
    proof: 'Hivemind demonstrated surface-vessel teaming, not undersea capability.',
    timing: 'Option over 2–5+ years, after maritime proof.',
    gate: 'An AUV partner, domain validation and a funded Navy requirement.',
    programme: 'AUV development evidence; no Shield undersea programme verified.', budget: 'Low', fit: 'Medium', route: 'B2B OEM / B2G',
    inference: 'Navy proof may extend permission to undersea; surface demonstrations do not prove every underwater mission.',
    proofSource: { label: 'Shield AI · Thunder Tiger maritime demonstration', url: 'https://shield.ai/shield-ai-and-thunder-tiger-complete-hiveminds-first-multi-asset-autonomous-maritime-teaming-demonstration-in-taiwan/' },
    indiaSource: { label: 'GRSE · Annual Report 2023–24, Neerakshi', url: 'https://www.grse.in/annual-reports/Annual_Report_2023_24_English.pdf' },
  },
  {
    id: 'haps', title: 'HAPS / persistent ISR', tag: 'Sensing', horizon: 'POSITION', core: 'army',
    mission: 'Persistent military ISR, communications relay and distributed sensing.',
    wedge: 'Hivemind · Vision Systems · Aechelon on an Indian-built platform.',
    signal: 'DAC’s July 2026 AoN includes fixed-wing HAPS for IAF persistent ISR.',
    proof: 'Shield offers vision and autonomy software; HAPS integration is unproven.',
    timing: 'Position now; potential integration in 2–5 years.',
    gate: 'Platform access, endurance validation and funded autonomy requirements.',
    programme: 'AoN is procurement intent, not a contract or a Shield allocation.', budget: 'Medium', fit: 'Medium', route: 'B2B OEM / Partner',
    inference: 'Army ISR credibility may travel to persistent platforms; platform ownership is not required.',
    proofSource: { label: 'Shield AI · Vision Systems', url: 'https://shield.ai/vision-systems/' },
    indiaSource: { label: 'PIB · DAC acceptance of necessity, July 2026', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2280728&lang=2&reg=48' },
  },
  {
    id: 'simulation', title: 'Simulation / Aechelon', tag: 'Cross-cutting', horizon: 'POSITION', core: 'ecosystem',
    mission: 'Design, simulate, validate and rehearse military autonomy.',
    wedge: 'Hivemind Enterprise · Aechelon; Benchmark where relevant.',
    signal: 'MoD’s simulator framework supports simulation-based military training.',
    proof: 'Shield completed its acquisition of simulation specialist Aechelon.',
    timing: 'Build position now; cross-cutting expansion over 2–5 years.',
    gate: 'An IAF, test-establishment or OEM sponsor and a funded evaluation need.',
    programme: 'Policy evidence; no funded Indian Shield simulation award verified.', budget: 'Low', fit: 'High', route: 'B2G / B2B OEM',
    inference: 'Embedded Hivemind may create demand for validation infrastructure beyond platform sales.',
    proofSource: { label: 'Shield AI · Aechelon acquisition completed', url: 'https://shield.ai/shield-ai-completes-acquisition-of-aechelon-technology/' },
    indiaSource: { label: 'PIB · Military simulator framework, September 2021', url: 'https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1757253&lang=2&reg=48' },
  },
  {
    id: 'adjacent', title: 'National-security adjacencies', tag: 'Adjacent · not core', horizon: 'OPTION', core: 'navy',
    mission: 'Selected border ISR and coastal-security surveillance missions.',
    wedge: 'V-BAT · Vision / ViDAR; Hivemind where mission-relevant.',
    signal: 'Sagar Kavach exercises include Navy and Coast Guard aerial surveillance.',
    proof: 'ViDAR provides maritime detection; customer-specific fit still needs validation.',
    timing: 'Secondary option; monitor over 3–5+ years.',
    gate: 'A specific security mission, customer urgency and a funded buyer.',
    programme: 'Operational need; no funded Shield CAPF or Coast Guard pathway verified.', budget: 'Low', fit: 'Medium', route: 'B2G / Partner',
    inference: 'Consider selected CAPFs or Coast Guard only where defence products fit; exclude general policing and MHA-wide TAM.',
    proofSource: { label: 'Shield AI · Vision Systems / ViDAR', url: 'https://shield.ai/vision-systems/' },
    indiaSource: { label: 'PIB · Sagar Kavach coastal-security exercise, March 2026', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2240001&lang=2&reg=3' },
  },
];

export const CORE_NODES: { id: CoreId; title: string; tag: string; x: number; y: number }[] = [
  { id: 'army', title: 'Army', tag: 'Core · 18 months', x: 34, y: 43 },
  { id: 'ecosystem', title: 'Hivemind ecosystem', tag: 'Core · 18 months', x: 66, y: 43 },
  { id: 'navy', title: 'Navy', tag: 'Core · 18 months', x: 50, y: 72 },
];
