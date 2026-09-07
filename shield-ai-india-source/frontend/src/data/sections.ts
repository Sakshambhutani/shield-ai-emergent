import { OPPORTUNITY_CLAIM_IDS } from './opportunity-landscape';

export interface SectionDef {
  id: string;
  num: string;
  label: string;
  path: string;
  question: string;
  answer: string;
  claimIds: string[];
}

export const SECTIONS: SectionDef[] = [
  { id: 'home', num: '00', label: 'Thesis', path: '/', question: 'One node → autonomy network', answer: 'Deliver. Build demand. Broaden.', claimIds: ['c-army-select', 'c-army-sdk', 'c-jsw', 'c-mission', 'c-hivemind-agnostic', 'c-india-sub', 'm-3bets'] },
  { id: 'money', num: '01', label: 'Demand', path: '/market', question: 'Where is demand heading?', answer: 'Money and modernisation are moving toward autonomy.', claimIds: ['c-budget-total', 'c-budget-capital', 'c-budget-acq', 'c-budget-domestic', 'c-budget-revenue', 'c-dap', 'c-nsuas', 'c-haps', 'c-cuas-aon', 'c-male', 'c-army-drones', 'c-cats', 'm-tactical-layer', 'm-male-layer'] },
  { id: 'buyers', num: '02', label: 'Opportunity', path: '/opportunities', question: 'How does the opportunity expand?', answer: 'From the Army foothold through adjacent direct and platform-led opportunities into future autonomy domains.', claimIds: OPPORTUNITY_CLAIM_IDS },
  { id: 'convergence', num: '03', label: 'Priorities', path: '/priorities', question: 'What must India achieve over the next 18 months?', answer: 'Five 18-month priorities.', claimIds: ['m-scores', 'm-3bets', 'm-tactical-layer', 'm-male-layer', 'm-navy-pen', 'c-army-select', 'c-male', 'c-nsuas', 'c-cats', 'c-nrt', 'c-grse'] },
  { id: 'roadmap', num: '04', label: 'Roadmap', path: '/roadmap', question: 'How does the India company evolve?', answer: 'Deliver commitments → prove Hivemind locally → open direct and partner routes → scale a repeatable India operation.', claimIds: ['m-roadmap', 'c-army-select', 'c-jsw', 'c-catalyst'] },
  { id: 'opmodel', num: '05', label: 'Operating Model', path: '/operating-model', question: 'How do we organise to deliver?', answer: 'Six functions own consequential outcomes; the MD Office integrates shared programme execution.', claimIds: ['m-opmodel', 'c-india-sub', 'c-jsw', 'c-army-sdk', 'c-vision-australia', 'c-taiwan-node', 'c-ukraine-field', 'c-uae-hub'] },
  { id: 'cadence', num: '06', label: 'Cadence', path: '/cadence', question: 'How do we make and unblock decisions?', answer: 'Decisions at the right cadence.', claimIds: ['m-cadence', 'c-catalyst', 'c-ukraine-field', 'c-taiwan-node', 'c-vision-australia'] },
  { id: 'md', num: '07', label: 'MD Dashboard', path: '/md-dashboard', question: 'What must the MD decide this month?', answer: 'Customer deployment, partner autonomy, maritime bids, global engineering and multi-year contract commitments.', claimIds: ['m-md'] },
];
