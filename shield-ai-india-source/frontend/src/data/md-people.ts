// Illustrative month-two HR review, independent of the October contract/finance snapshot.
export const PEOPLE_AS_OF = '2026-11-30';
export const PEOPLE_BASE = 20;
export const PEOPLE_TARGET = 45;
export const PEOPLE_PLAN = [4, 4, 5, 4, 4, 4].map((planned, i, cohorts) => ({
  month: ['Oct 26', 'Nov 26', 'Dec 26', 'Jan 27', 'Feb 27', 'Mar 27'][i],
  due: new Date(Date.UTC(2026, 10 + i, 0)).toISOString().slice(0, 10),
  planned,
  cumulative: PEOPLE_BASE + cohorts.slice(0, i + 1).reduce((sum, n) => sum + n, 0),
}));

export const PEOPLE_STARTERS = [
  { id: 'AUT-01', role: 'Autonomy engineer', group: 'Autonomy engineers', start: '2026-10-05', due: '2026-11-05', ready: '2026-11-03', blocker: '', owner: 'Autonomy lead', assignment: 'Run the agreed mission workflow independently' },
  { id: 'AUT-02', role: 'Autonomy engineer', group: 'Autonomy engineers', start: '2026-10-12', due: '2026-11-12', ready: '2026-11-10', blocker: '', owner: 'Autonomy lead', assignment: 'Configure and demonstrate the agreed autonomy scenario' },
  { id: 'INT-01', role: 'Integration engineer', group: 'Integration engineers', start: '2026-10-15', due: '2026-11-15', ready: '2026-11-13', blocker: '', owner: 'Engineering lead', assignment: 'Complete the agreed platform interface task' },
  { id: 'SIM-01', role: 'Simulation / test engineer', group: 'Simulation / test engineers', start: '2026-11-02', due: '2026-11-25', ready: '2026-11-24', blocker: '', owner: 'Test lead', assignment: 'Run and document the agreed simulation check' },
  { id: 'OPS-01', role: 'People / operations coordinator', group: 'People / finance / operations', start: '2026-11-02', due: '2026-11-23', ready: '2026-11-20', blocker: '', owner: 'People lead', assignment: 'Complete the starter setup and payroll-input handover' },
  { id: 'INT-02', role: 'Integration engineer', group: 'Integration engineers', start: '2026-11-02', due: '2026-11-28', ready: '', blocker: 'HQ environment access', owner: 'Engineering lead', assignment: 'Complete the agreed integration task in the HQ environment' },
];
export const PEOPLE_ROLES = [
  { role: 'Autonomy engineers', count: 8, critical: true, applied: 72, screening: 20, interviewing: 12, offered: 2, accepted: 2, due: '2027-01-31', need: 'Existing-contract autonomy delivery' },
  { role: 'Integration engineers', count: 4, critical: true, applied: 40, screening: 8, interviewing: 6, offered: 1, accepted: 1, due: '2026-12-31', need: 'Existing-contract platform integration' },
  { role: 'Simulation / test engineers', count: 3, critical: true, applied: 28, screening: 8, interviewing: 4, offered: 1, accepted: 0, due: '2027-01-31', need: 'Existing-contract validation' },
  { role: 'Field / programme support', count: 4, critical: false, applied: 35, screening: 12, interviewing: 5, offered: 0, accepted: 0, due: '2027-02-28', need: 'Delivery and customer support' },
  { role: 'BD / partnership managers', count: 2, critical: false, applied: 20, screening: 6, interviewing: 2, offered: 0, accepted: 0, due: '2027-03-31', need: 'New-customer development' },
  { role: 'People / finance / operations', count: 4, critical: false, applied: 30, screening: 10, interviewing: 2, offered: 0, accepted: 0, due: '2027-03-31', need: 'Team setup and employee operations' },
].map(role => ({ ...role, joined: PEOPLE_STARTERS.filter(s => s.group === role.role && s.start <= PEOPLE_AS_OF).length }));

export const PEOPLE_CRITICAL_ROLES = [
  { role: 'Autonomy delivery lead', coverage: 'Existing team · qualified', covered: true, due: '2026-12-01', action: 'Maintain delivery allocation', owner: 'Engineering lead' },
  { role: 'Integration delivery engineer', coverage: 'INT-01 · ready', covered: true, due: '2026-12-01', action: 'Maintain integration allocation', owner: 'Engineering lead' },
  { role: 'Simulation / test engineer', coverage: 'SIM-01 · ready', covered: true, due: '2026-12-01', action: 'Maintain test allocation', owner: 'Test lead' },
  { role: 'Additional integration engineer', coverage: 'Unfilled · HQ cover unconfirmed', covered: false, due: '2026-12-15', action: 'Confirm interim cover and joining date', owner: 'People + Engineering' },
];
export const PEOPLE_JOINING_GAPS = [
  { id: 'AUT-03', role: 'Autonomy engineer', due: '2026-11-30', forecast: '2026-12-07', owner: 'People lead', impact: 'Autonomy delivery capacity', confirmed: true },
  { id: 'INT-03', role: 'Integration engineer', due: '2026-11-30', forecast: '2026-12-14', owner: 'People + Engineering', impact: 'Additional critical integration role', confirmed: false },
];
export const PEOPLE_CAPABILITIES = [
  { capability: 'Platform integration', primary: '1 qualified person', backup: 'HQ cover unconfirmed', covered: false, action: 'Confirm HQ cover', owner: 'Engineering lead', due: '2026-12-05' },
  { capability: 'Field support', primary: '1 qualified person', backup: 'None ready', covered: false, action: 'Qualify second person', owner: 'Programme lead', due: '2026-12-12' },
  { capability: 'Autonomy configuration', primary: 'Autonomy lead', backup: 'Qualified autonomy engineer', covered: true, action: 'Maintain cover allocation', owner: 'Autonomy lead', due: '2026-12-18' },
  { capability: 'Simulation validation', primary: 'Test lead', backup: 'SIM-01 · qualified', covered: true, action: 'Maintain cover allocation', owner: 'Test lead', due: '2026-12-18' },
];
export const PEOPLE_JOINED = PEOPLE_STARTERS.filter(s => s.start <= PEOPLE_AS_OF).length;
export const PEOPLE_HEADCOUNT = PEOPLE_BASE + PEOPLE_JOINED;
export const PEOPLE_JOINS_DUE = PEOPLE_PLAN.filter(m => m.due <= PEOPLE_AS_OF).reduce((sum, m) => sum + m.planned, 0);
export const PEOPLE_READINESS_DUE = PEOPLE_STARTERS.filter(s => s.due <= PEOPLE_AS_OF);
export const PEOPLE_READY = PEOPLE_READINESS_DUE.filter(s => s.ready && s.ready <= s.due).length;
export const PEOPLE_UNCOVERED = PEOPLE_CAPABILITIES.filter(c => !c.covered);
export const PEOPLE_METRICS = [
  { name: 'Hiring vs plan', indicator: 'Lagging' as const, definition: 'Employees joined / planned joins due by the HR review date. Six-month hiring progress and total headcount are shown separately.', value: `${PEOPLE_JOINED} / ${PEOPLE_JOINS_DUE}`, target: 'All planned joins due', context: `${PEOPLE_JOINS_DUE - PEOPLE_JOINED} joins overdue · ${PEOPLE_JOINED} / ${PEOPLE_TARGET - PEOPLE_BASE} six-month hires joined`, details: [{ label: 'Headcount', text: `${PEOPLE_HEADCOUNT} people; starting team ${PEOPLE_BASE}, target ${PEOPLE_TARGET}. Assumes no exits.` }, { label: 'Next action', text: 'Confirm joining dates for AUT-03 and INT-03; review interim cover with Engineering.' }] },
  { name: 'Critical roles covered', indicator: 'Leading' as const, definition: 'Critical roles required in the next 90 days with a qualified, available person in place / critical roles required. Existing employees and active interim support count; offers and unconfirmed cover do not.', value: `${PEOPLE_CRITICAL_ROLES.filter(r => r.covered).length} / ${PEOPLE_CRITICAL_ROLES.length}`, target: 'All critical roles covered by required dates', context: '1 integration role uncovered · next 90 days', details: [{ label: 'Coverage', text: 'One existing employee and two ready starters cover three roles. These are included in the 26-person team.' }, { label: 'Remaining gap', text: 'An additional integration post is unfilled; the blocked starter INT-02 is a separate person. Confirm interim cover before 15 Dec.' }] },
  { name: 'New joiners ready', indicator: 'Lagging' as const, definition: 'Starters signed off by their manager by their agreed role-specific readiness date / starters whose readiness date is due. Future checkpoints are excluded.', value: `${PEOPLE_READY} / ${PEOPLE_READINESS_DUE.length}`, target: 'All starters ready by agreed checkpoints', context: '1 starter blocked · HQ environment access', details: [{ label: 'Readiness evidence', text: 'Five of six starters completed their assigned readiness task by the agreed date. INT-02 missed the 28 Nov checkpoint.' }, { label: 'Next action', text: 'Engineering lead resolves HQ access and completes the integration readiness sign-off.' }] },
  { name: 'Capabilities without backup', indicator: 'Leading' as const, definition: 'Critical capabilities with primary coverage but no qualified, available backup or confirmed HQ cover. This is separate from unfilled staffing demand.', value: String(PEOPLE_UNCOVERED.length), target: '0 without workable cover', context: PEOPLE_UNCOVERED.map(c => c.capability).join(' · '), details: PEOPLE_UNCOVERED.map(c => ({ label: c.capability, text: `${c.action}; ${c.owner}; due ${c.due}.` })) },
].map(metric => ({ ...metric, period: 'Illustrative HR review · 30 Nov 2026' }));

export const PEOPLE_ASSUMPTION_ROWS: [string, string][] = [['Review', 'Constructed month-two HR example at 30 Nov 2026; separate from the October contract and finance snapshot.'], ['Team plan', '20 starting employees + 25 planned hires = 45; six joined, no exits, current team 26. Monthly planned joins: 4, 4, 5, 4, 4, 4.'], ['Evidence', 'All candidates, readiness sign-offs, coverage, actions and dates are illustrative; replace with People and manager records.'], ['Reporting', 'Role groups total 25 planned hires. Candidate stages are mutually exclusive current counts; applications are cumulative. Six joined starters are included in the team, not additional to it.']];
