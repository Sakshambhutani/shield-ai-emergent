export interface BudgetNode {
  id: string;
  parent: string | null;
  title: string;
  value?: string;
  tag?: string;
  cls: 'official' | 'industry' | 'modelled' | 'context';
  relevant: boolean;
  why?: string;
  products?: string[];
  buyer?: string;
  claimIds: string[];
  modelKey?: 'tactical' | 'male';
}

export const BUDGET_TREE: BudgetNode[] = [
  { id: 'total', parent: null, title: 'India Defence Budget FY2026-27', value: '₹7.85 L Cr', tag: 'FY27 · annual', cls: 'official', relevant: true, why: 'Total MoD allocation. Context only — not addressable.', claimIds: ['c-budget-total'] },
  { id: 'revenue', parent: 'total', title: 'Revenue, pay & pensions', tag: 'FY27', cls: 'official', relevant: false, why: 'Operating costs and pensions. Not relevant to autonomy acquisition.', claimIds: ['c-budget-revenue'] },
  { id: 'capital', parent: 'total', title: 'Capital outlay', value: '₹2.19 L Cr', tag: 'FY27 · annual', cls: 'official', relevant: true, why: 'Modernisation pool where autonomy spend sits.', claimIds: ['c-budget-capital'] },
  { id: 'other-cap', parent: 'capital', title: 'Land, works & other capital', tag: 'FY27', cls: 'official', relevant: false, why: 'Not relevant.', claimIds: ['c-budget-capital'] },
  { id: 'acq', parent: 'capital', title: 'Capital acquisition', value: '≈₹1.85 L Cr', tag: 'FY27 · annual', cls: 'official', relevant: true, why: 'Fighters, ships, submarines, drones, smart weapons. ₹1.39 L Cr earmarked domestic.', buyer: 'MoD Acquisition Wing', claimIds: ['c-budget-acq', 'c-budget-domestic', 'c-dap'] },
  { id: 'u-unmanned', parent: 'acq', title: 'Unmanned systems', tag: 'Capability universe', cls: 'context', relevant: true, why: 'Core Shield universe: tactical UAS, MALE/HALE, shipborne UAS.', products: ['V-BAT', 'Hivemind'], buyer: 'Army · Navy · IAF', claimIds: ['c-army-drones', 'c-male', 'c-nsuas'] },
  { id: 'p-tactical', parent: 'u-unmanned', title: 'Tactical UAS (Army)', value: '~₹16,000 Cr', tag: '18-24m · reported', cls: 'industry', relevant: true, why: 'Army fast-track drone buys; V-BAT already selected under emergency procurement.', products: ['V-BAT', 'Hivemind'], buyer: 'Indian Army', claimIds: ['c-army-drones', 'c-army-select', 'm-tactical-layer'], modelKey: 'tactical' },
  { id: 'p-male', parent: 'u-unmanned', title: '87 MALE UAVs (indigenous)', value: '~₹20,000 Cr', tag: 'Multi-year · reported', cls: 'industry', relevant: true, why: 'Buy Indian-IDDM; bids closed. Autonomy layer via winning OEM only.', products: ['Hivemind'], buyer: 'Tri-service', claimIds: ['c-male', 'm-male-layer'], modelKey: 'male' },
  { id: 'p-nsuas', parent: 'u-unmanned', title: 'Naval shipborne UAS', value: 'Value not publicly separable', tag: 'Multi-year · AoN', cls: 'official', relevant: true, why: 'AoN granted in a bundled DAC approval. Navy entry point.', products: ['V-BAT', 'ViDAR'], buyer: 'Indian Navy', claimIds: ['c-nsuas'] },
  { id: 'u-combat', parent: 'acq', title: 'Combat aviation', tag: 'Capability universe', cls: 'context', relevant: true, why: 'CCA / loyal wingman, future air teaming, HAPS.', products: ['Hivemind', 'X-BAT'], buyer: 'IAF via HAL', claimIds: ['c-cats', 'c-haps', 'c-cca'] },
  { id: 'p-cats', parent: 'u-combat', title: 'HAL CATS / CCA', value: 'Value not publicly separable', tag: 'Long-term', cls: 'industry', relevant: true, why: 'First flight now targeted 2027; autonomy architecture still open.', products: ['Hivemind Enterprise'], buyer: 'IAF', claimIds: ['c-cats'] },
  { id: 'p-haps', parent: 'u-combat', title: 'FW-HAPS', value: 'Value not publicly separable', tag: 'Long-term · AoN', cls: 'official', relevant: true, why: 'Stratospheric ISR; seed-level autonomy relevance.', products: ['Hivemind'], buyer: 'IAF', claimIds: ['c-haps'] },
  { id: 'u-maritime', parent: 'acq', title: 'Maritime autonomy', tag: 'Capability universe', cls: 'context', relevant: true, why: 'USV, UUV, autonomous maritime missions with Indian shipyards.', products: ['Hivemind Maritime', 'ViDAR'], buyer: 'Indian Navy', claimIds: ['c-bel-a2ncs', 'c-grse', 'c-tt'] },
  { id: 'p-usv', parent: 'u-maritime', title: 'USV / AUV programmes', value: 'Value not publicly separable', tag: 'Multi-year', cls: 'industry', relevant: true, why: 'BEL–Navy A2NCS certified; GRSE–KSSL agreement. Mission-autonomy layer open.', products: ['Hivemind Maritime'], buyer: 'Indian Navy via BEL / GRSE', claimIds: ['c-bel-a2ncs', 'c-grse'] },
  { id: 'u-isr', parent: 'acq', title: 'ISR / perception & C-UAS', tag: 'Capability universe', cls: 'context', relevant: true, why: 'Airborne & maritime sensing; layered C-UAS after Op Sindoor.', products: ['ViDAR', 'Tracker C-UAS'], buyer: 'Army · Navy · IAF', claimIds: ['c-cuas-aon', 'c-vidar'] },
  { id: 'p-cuas', parent: 'u-isr', title: 'C-UAS / force protection', value: 'Value not publicly separable', tag: 'Multi-year · AoN', cls: 'official', relevant: true, why: 'Tracker C-UAS is a perception layer inside primes\' systems.', products: ['Tracker C-UAS'], buyer: 'Army via primes', claimIds: ['c-cuas-aon', 'c-tracker-l3h'] },
  { id: 'u-autonomy', parent: 'acq', title: 'Autonomy software', tag: 'Cross-cutting layer', cls: 'context', relevant: true, why: 'Mission autonomy, multi-agent, sovereign software — not an accounting head; embedded in platforms.', products: ['Hivemind', 'Hivemind SDK'], buyer: 'All services · DRDO', claimIds: ['c-army-sdk', 'c-hivemind-agnostic'] },
  { id: 'u-sim', parent: 'acq', title: 'Simulation & training', tag: 'Capability universe', cls: 'context', relevant: true, why: 'Mission rehearsal, synthetic environments, T&E.', products: ['Aechelon'], buyer: 'IAF · DRDO', claimIds: ['c-aechelon'] },
  { id: 'u-space', parent: 'acq', title: 'Military space', tag: 'Capability universe · seed', cls: 'context', relevant: true, why: 'Constellation autonomy / defence ISR satellites. Civilian space spend excluded.', products: ['Hivemind'], buyer: 'Defence space ecosystem', claimIds: ['c-novi'] },
];

export const MISSION_TREE: BudgetNode[] = [
  { id: 'm-root', parent: null, title: 'Shield-relevant mission universes', tag: 'Mission view', cls: 'context', relevant: true, why: 'Capabilities cut across accounting heads.', claimIds: ['c-budget-acq'] },
  { id: 'm-air', parent: 'm-root', title: 'Air', tag: 'Domain', cls: 'context', relevant: true, why: 'Tactical UAS, MALE, CCA, HAPS.', products: ['V-BAT', 'Hivemind', 'X-BAT'], buyer: 'Army · IAF', claimIds: ['c-army-select', 'c-male', 'c-cats'] },
  { id: 'm-air-tac', parent: 'm-air', title: 'Tactical UAS', value: '~₹16,000 Cr', tag: '18-24m · reported', cls: 'industry', relevant: true, why: 'Army beachhead.', products: ['V-BAT', 'Hivemind'], buyer: 'Indian Army', claimIds: ['c-army-drones', 'c-army-select'], modelKey: 'tactical' },
  { id: 'm-air-male', parent: 'm-air', title: 'MALE', value: '~₹20,000 Cr', tag: 'Multi-year · reported', cls: 'industry', relevant: true, why: 'Influence the autonomy architecture.', products: ['Hivemind'], buyer: 'Tri-service', claimIds: ['c-male'], modelKey: 'male' },
  { id: 'm-air-cca', parent: 'm-air', title: 'CCA / CATS', value: 'Not publicly separable', tag: 'Long-term', cls: 'industry', relevant: true, why: 'Seed via HAL.', products: ['Hivemind'], buyer: 'IAF', claimIds: ['c-cats', 'c-cca'] },
  { id: 'm-maritime', parent: 'm-root', title: 'Maritime', tag: 'Domain', cls: 'context', relevant: true, why: 'Shipborne UAS, USV/UUV, maritime perception.', products: ['V-BAT', 'ViDAR', 'Hivemind Maritime'], buyer: 'Indian Navy', claimIds: ['c-nsuas', 'c-grse', 'c-bel-a2ncs'] },
  { id: 'm-mar-nsuas', parent: 'm-maritime', title: 'Shipborne UAS', value: 'Not publicly separable', tag: 'AoN', cls: 'official', relevant: true, why: 'Navy entry.', products: ['V-BAT', 'ViDAR'], buyer: 'Indian Navy', claimIds: ['c-nsuas', 'c-rnln'] },
  { id: 'm-mar-usv', parent: 'm-maritime', title: 'USV / UUV', value: 'Not publicly separable', tag: 'Multi-year', cls: 'industry', relevant: true, why: 'Mission autonomy above navigation.', products: ['Hivemind Maritime'], buyer: 'Navy via BEL / GRSE', claimIds: ['c-bel-a2ncs', 'c-grse'] },
  { id: 'm-weapons', parent: 'm-root', title: 'Weapons', tag: 'Domain · seed', cls: 'context', relevant: true, why: 'Loitering munitions, jet kamikaze systems — discovery only.', products: ['Hivemind'], buyer: 'Army · IAF via primes', claimIds: ['c-tasl-lm', 'c-cuas-aon'] },
  { id: 'm-space', parent: 'm-root', title: 'Space', tag: 'Domain · seed', cls: 'context', relevant: true, why: 'Defence ISR constellations — discovery only.', products: ['Hivemind'], buyer: 'Defence space ecosystem', claimIds: ['c-novi'] },
  { id: 'm-isr', parent: 'm-root', title: 'ISR & C-UAS', tag: 'Domain', cls: 'context', relevant: true, why: 'Perception across air and sea; layered C-UAS.', products: ['ViDAR', 'Tracker C-UAS'], buyer: 'All services', claimIds: ['c-cuas-aon', 'c-vidar'] },
  { id: 'm-training', parent: 'm-root', title: 'Training & simulation', tag: 'Domain · seed', cls: 'context', relevant: true, why: 'Aechelon discovery.', products: ['Aechelon'], buyer: 'IAF · DRDO', claimIds: ['c-aechelon'] },
];
