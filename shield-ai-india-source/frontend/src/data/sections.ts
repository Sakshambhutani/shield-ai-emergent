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
  { id: 'home', num: '00', label: 'Thesis', path: '/', question: 'How do we scale in India?', answer: 'Three bets.', claimIds: ['c-army-select', 'c-army-sdk', 'c-jsw', 'c-mission', 'c-hivemind-agnostic', 'c-india-sub', 'm-3bets'] },
  { id: 'money', num: '01', label: 'Market', path: '/market', question: 'Where is demand heading?', answer: 'Money and modernisation are moving toward autonomy.', claimIds: ['c-budget-total', 'c-budget-capital', 'c-budget-acq', 'c-budget-domestic', 'c-budget-revenue', 'c-dap', 'c-nsuas', 'c-haps', 'c-cuas-aon', 'c-male', 'c-army-drones', 'c-cats', 'm-tactical-layer', 'm-male-layer'] },
  { id: 'buyers', num: '02', label: 'Opportunity Map', path: '/opportunities', question: 'Where can we win?', answer: 'A broad bottom-up opportunity universe across products, missions and platform cells.', claimIds: ['c-army-select', 'c-vbat', 'c-xbat', 'c-vidar', 'c-grse-platforms', 'c-bel-platforms', 'c-hal-platforms', 'c-hal-warrior-2026', 'c-bdl-ai', 'c-kssl-underwater', 'c-mdl-xlauv', 'c-newspace-incumbency', 'c-lt-incumbent', 'c-adani-incumbent', 'c-raphe-incumbency', 'c-ayaan-incumbency', 'c-paras-selective', 'm-account-postures', 'c-mhi', 'c-sg', 'c-tt', 'c-tracker-l3h'] },
  { id: 'convergence', num: '03', label: 'Priorities', path: '/convergence', question: 'Which moves matter most?', answer: 'Three growth bets. Two execution enablers.', claimIds: ['m-scores', 'm-3bets', 'm-tactical-layer', 'm-male-layer', 'm-navy-pen', 'c-army-select', 'c-male', 'c-nsuas', 'c-cats', 'c-nrt', 'c-grse'] },
  { id: 'roadmap', num: '04', label: 'Roadmap', path: '/roadmap', question: 'What happens when?', answer: 'Establish → prove → expand → scale.', claimIds: ['m-roadmap', 'm-integrations', 'c-catalyst', 'c-jsw', 'c-army-select', 'c-nsuas'] },
  { id: 'opmodel', num: '05', label: 'Operating Model', path: '/operating-model', question: 'How do we organise to deliver?', answer: 'Three mission teams consume seven India capabilities and pull from global centres.', claimIds: ['m-opmodel', 'c-india-sub', 'c-jsw', 'c-army-sdk', 'c-vision-australia', 'c-taiwan-node', 'c-ukraine-field', 'c-uae-hub'] },
  { id: 'cadence', num: '06', label: 'Cadence', path: '/cadence', question: 'How do we turn learning into action?', answer: 'One loop turns mission need into field proof and reusable product learning.', claimIds: ['m-cadence', 'c-catalyst', 'c-ukraine-field', 'c-taiwan-node', 'c-vision-australia'] },
  { id: 'kpis', num: '07', label: 'Scorecard', path: '/kpis', question: 'What does success look like?', answer: 'Four outcomes balance local mission impact and reusable global leverage.', claimIds: ['m-kpis', 'm-integrations', 'c-army-select', 'c-jsw', 'c-vision-australia'] },
  { id: 'md', num: '08', label: 'MD Agenda', path: '/md-dashboard', question: 'What needs my attention now?', answer: 'Three bets, three decisions and six monitored red flags.', claimIds: ['m-md', 'm-integrations', 'c-jsw', 'c-army-select'] },
];
