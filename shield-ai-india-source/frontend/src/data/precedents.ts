import type { Precedent } from './types';

export const PRECEDENTS: Precedent[] = [
  { id: 'p-india', country: 'India', title: 'Indian Army: V-BAT + Hivemind + SDK licensing', type: 'Customer programme', lesson: 'Sovereign development is already part of the Indian deal structure.', claimIds: ['c-army-select', 'c-army-sdk'] },
  { id: 'p-singapore', country: 'Singapore', title: 'RSAF + DSTA: Hivemind Enterprise / SDK', type: 'Customer programme', lesson: 'Hivemind can be sold as sovereign autonomy infrastructure, not Shield-controlled software.', claimIds: ['c-sg'] },
  { id: 'p-mhi', country: 'Japan', title: 'MHI: Hivemind on ARMD, flight test in 8 weeks', type: 'Integration proof', lesson: 'OEM platform + Shield autonomy is an effective national-industry partnership model.', claimIds: ['c-mhi'] },
  { id: 'p-tt', country: 'Taiwan', title: 'Thunder Tiger: multi-USV maritime ISR teaming', type: 'Capability demonstration', lesson: 'Shipbuilders own vessels while Hivemind provides mission autonomy.', claimIds: ['c-tt'] },
  { id: 'p-rnln', country: 'Netherlands', title: 'Royal Netherlands Navy: V-BAT operational, 12 aircraft / 8 vessels', type: 'Operational deployment', lesson: 'V-BAT is a fleet-level maritime ISR capability, not only an Army tactical drone.', claimIds: ['c-rnln'] },
  { id: 'p-cca', country: 'United States', title: 'USAF CCA: Hivemind on YFQ-44A', type: 'Customer programme', lesson: 'Mission autonomy can be evaluated independently from the airframe.', claimIds: ['c-cca'] },
  { id: 'p-novi', country: 'Space', title: 'NOVI satellite: Hivemind on-orbit', type: 'Capability demonstration', lesson: 'Military-space autonomy is technically credible. This is a precedent, not a business.', claimIds: ['c-novi'] },
  { id: 'p-vidar', country: 'United States', title: 'ViDAR payloads to NAVAIR PMA-263 (USMC)', type: 'Customer programme', lesson: 'ViDAR is a fielded payload, not a concept.', claimIds: ['c-vidar-usmc'] },
  { id: 'p-tracker', country: 'United States', title: 'Tracker C-UAS inside L3Harris VAMPIRE', type: 'Integration proof', lesson: 'Perception software can be embedded inside a prime\'s system.', claimIds: ['c-tracker-l3h'] },
];
export const PRECEDENT_MAP = Object.fromEntries(PRECEDENTS.map((p) => [p.id, p]));
