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
  { id: 'home', num: '00', label: 'Thesis', path: '/', question: 'What is our answer?', answer: 'Three bets.', claimIds: ['c-army-select', 'c-army-sdk', 'c-jsw', 'c-mission', 'c-hivemind-agnostic', 'c-india-sub', 'm-3bets'] },
  { id: 'money', num: '01', label: 'Market', path: '/money', question: 'Where is the money?', answer: 'Money and modernisation are moving toward autonomy.', claimIds: ['c-budget-total', 'c-budget-capital', 'c-budget-acq', 'c-budget-domestic', 'c-budget-revenue', 'c-dap', 'c-nsuas', 'c-haps', 'c-cuas-aon', 'c-male', 'c-army-drones', 'c-cats', 'm-tactical-layer', 'm-male-layer'] },
  { id: 'buyers', num: '02', label: 'Accounts', path: '/buyers', question: 'Who exactly do we sell to?', answer: 'Specific services, programmes, platforms and primes.', claimIds: ['c-army-select', 'c-army-sdk', 'c-nsuas', 'c-cats', 'c-nrt', 'c-bel-a2ncs', 'c-grse', 'c-tasl-lm', 'c-vidar', 'c-tracker-l3h', 'c-catalyst', 'c-dap', 'c-mhi', 'c-sg', 'c-tt', 'c-rnln'] },
  { id: 'convergence', num: '03', label: 'Priorities', path: '/convergence', question: 'Which opportunities survive both tests?', answer: 'Scale Army, embed Hivemind, expand Navy.', claimIds: ['m-scores', 'm-3bets', 'm-tactical-layer', 'm-male-layer', 'm-navy-pen', 'c-army-select', 'c-male', 'c-nsuas', 'c-cats', 'c-nrt', 'c-grse'] },
  { id: 'roadmap', num: '04', label: 'Roadmap', path: '/roadmap', question: 'What do we do over 18 months?', answer: 'Establish → prove → expand → scale.', claimIds: ['m-roadmap', 'm-integrations', 'c-catalyst', 'c-jsw', 'c-army-select', 'c-nsuas'] },
  { id: 'opmodel', num: '05', label: 'Operating Model', path: '/operating-model', question: 'How should India be organised?', answer: 'Local accountability with clear HQ / JSW / partner decision rights.', claimIds: ['m-opmodel', 'c-india-sub', 'c-jsw', 'c-army-sdk'] },
  { id: 'cadence', num: '06', label: 'Cadence', path: '/cadence', question: 'How does the machine run?', answer: 'A small number of decision-driven cadences.', claimIds: ['m-cadence'] },
  { id: 'kpis', num: '07', label: 'Scorecard', path: '/kpis', question: 'Are we achieving the outcomes?', answer: 'Outcomes tied directly to the three bets.', claimIds: ['m-kpis', 'm-integrations', 'c-army-select', 'c-jsw'] },
  { id: 'md', num: '08', label: 'MD Dashboard', path: '/md-dashboard', question: 'What does the MD need to see / decide?', answer: 'One screen: progress, risks, decisions.', claimIds: ['m-md', 'm-integrations', 'c-jsw', 'c-army-select'] },
];
