import { INDIA_OPENINGS } from './md-india-openings';
// Illustrative month-two HR review, independent of the October contract/finance snapshot.
export const PEOPLE_AS_OF = '2026-11-30';
export const PEOPLE_BASE = 15;
export const PEOPLE_TARGET = 40;
export const PEOPLE_PLAN = [4, 4, 5, 4, 4, 4].map((planned, i, cohorts) => ({
  month: ['Oct 26', 'Nov 26', 'Dec 26', 'Jan 27', 'Feb 27', 'Mar 27'][i],
  due: new Date(Date.UTC(2026, 10 + i, 0)).toISOString().slice(0, 10),
  planned,
  cumulative: PEOPLE_BASE + cohorts.slice(0, i + 1).reduce((sum, n) => sum + n, 0),
}));

// Existing team supplied by the user; department split is illustrative.
export const PEOPLE_EXISTING_TEAM = [
  { department: 'Hivemind', count: 9 },
  { department: 'Business development', count: 3 },
  { department: 'Operations / programme management', count: 3 },
];
const openingTitle = (index: number) => INDIA_OPENINGS[index].title;
// Six illustrative additions to the 15-person starting team in this month-two example.
export const PEOPLE_STARTERS = [
  { id: 'AAE-01', role: openingTitle(2), group: openingTitle(2), start: '2026-10-05', due: '2026-11-05', ready: '2026-11-03', blocker: '', owner: 'Hivemind lead', assignment: 'Run the customer mission workflow independently' },
  { id: 'AAE-02', role: openingTitle(2), group: openingTitle(2), start: '2026-10-12', due: '2026-11-12', ready: '2026-11-10', blocker: '', owner: 'Hivemind lead', assignment: 'Validate the platform autonomy interface' },
  { id: 'AUT-01', role: openingTitle(4), group: openingTitle(4), start: '2026-10-15', due: '2026-11-15', ready: '2026-11-13', blocker: '', owner: 'Hivemind lead', assignment: 'Approve the autonomy integration design' },
  { id: 'SIM-01', role: openingTitle(5), group: openingTitle(5), start: '2026-11-02', due: '2026-11-25', ready: '2026-11-24', blocker: '', owner: 'Hivemind lead', assignment: 'Run and document the customer simulation' },
  { id: 'COS-01', role: openingTitle(0), group: openingTitle(0), start: '2026-11-02', due: '2026-11-23', ready: '2026-11-20', blocker: '', owner: 'India MD', assignment: 'Own the India operating review and escalation cadence' },
  { id: 'STAFF-01', role: openingTitle(6), group: openingTitle(6), start: '2026-11-02', due: '2026-11-28', ready: '', blocker: 'HQ Hivemind environment access', owner: 'Hivemind lead', assignment: 'Complete the platform integration acceptance task' },
];
// Illustrative allocation of 25 planned hires to published role titles; a posting can cover multiple hires.
const hiringTargets = [1, 2, 8, 2, 4, 3, 5];
// Illustrative completion deadlines: leadership filled first, specialist engineering
// next, then the larger applications cohort and remaining commercial/support hires.
// Cumulative role completions fit within the unchanged monthly headcount plan.
const hiringDeadlines = [
  '2026-11-13', // Chief of Staff: already joined on 2 Nov.
  '2027-03-26', // Field Marketing Manager.
  '2027-02-19', // Senior Software Engineer: eight-person cohort.
  '2027-02-26', // BD Account Executive.
  '2026-12-18', // Senior Staff Engineer: autonomy leadership.
  '2027-03-12', // Simulation Specialist.
  '2027-01-15', // Staff Software Engineer: applications delivery.
];
export const PEOPLE_ROLES = INDIA_OPENINGS.map((opening, index) => ({
  role: opening.title, count: hiringTargets[index], critical: [2, 4, 6].includes(index),
  screening: opening.screening, interviewing: opening.interviewing,
  screened: opening.screened, interviewed: opening.interviewed, reachedNegotiation: opening.reachedNegotiation,
  offered: opening.offered, awaitingJoining: opening.awaitingJoining,
  due: hiringDeadlines[index],
  joined: PEOPLE_STARTERS.filter(s => s.group === opening.title && s.start <= PEOPLE_AS_OF).length,
})).map(role => {
  // Accepted includes both joined staff and candidates still waiting to start.
  // Earlier stages retain historical attrition, even after a role is filled.
  const offersAccepted = role.awaitingJoining + role.joined;
  return { ...role, offersAccepted };
});

export const PEOPLE_CRITICAL_ROLES = [
  { role: 'Hivemind delivery lead', coverage: 'Existing Hivemind team · covered', covered: true, due: '2026-12-01', action: 'Maintain autonomy delivery allocation', owner: 'Hivemind lead' },
  { role: 'India BD account coverage', coverage: 'Existing BD team · covered', covered: true, due: '2026-12-01', action: 'Maintain customer ownership while specialist hiring progresses', owner: 'BD lead' },
  { role: 'Customer programme manager', coverage: 'Existing operations team · covered', covered: true, due: '2026-12-01', action: 'Maintain delivery and acceptance ownership', owner: 'Operations lead' },
  { role: openingTitle(6), coverage: 'Additional hire · uncovered', covered: false, due: '2026-12-15', action: 'Confirm joining date and interim HQ support', owner: 'People + Hivemind' },
];
export const PEOPLE_JOINING_GAPS = [
  { id: 'AUT-02', role: openingTitle(4), due: '2026-11-30', forecast: '2026-12-07', owner: 'People + Hivemind', impact: 'Autonomy design review capacity', confirmed: true },
  { id: 'STAFF-02', role: openingTitle(6), due: '2026-11-30', forecast: '2026-12-14', owner: 'People + Hivemind', impact: 'Additional customer integration capacity', confirmed: false },
];
export const PEOPLE_CAPABILITIES = [
  { capability: 'Customer platform integration', primary: 'Existing Hivemind team', backup: 'HQ support unconfirmed; STAFF-01 not ready', covered: false, action: 'Resolve access and confirm interim HQ cover', owner: 'Hivemind lead', due: '2026-12-05' },
  { capability: 'Customer trials and acceptance', primary: 'Existing programme manager', backup: 'No qualified second programme manager', covered: false, action: 'Cross-train a second operations team member', owner: 'Operations lead', due: '2026-12-12' },
  { capability: 'India account development', primary: 'Existing BD account owner', backup: 'Second existing BD team member', covered: true, action: 'Maintain account handover readiness', owner: 'BD lead', due: '2026-12-18' },
  { capability: 'Simulation validation', primary: 'SIM-01 · Simulation Specialist', backup: 'Existing Hivemind engineer', covered: true, action: 'Maintain shared test procedures', owner: 'Hivemind lead', due: '2026-12-18' },
];
export const PEOPLE_JOINED = PEOPLE_STARTERS.filter(s => s.start <= PEOPLE_AS_OF).length;
export const PEOPLE_HEADCOUNT = PEOPLE_BASE + PEOPLE_JOINED;
export const PEOPLE_JOINS_DUE = PEOPLE_PLAN.filter(m => m.due <= PEOPLE_AS_OF).reduce((sum, m) => sum + m.planned, 0);
export const PEOPLE_READINESS_DUE = PEOPLE_STARTERS.filter(s => s.due <= PEOPLE_AS_OF);
export const PEOPLE_READY = PEOPLE_READINESS_DUE.filter(s => s.ready && s.ready <= s.due).length;
export const PEOPLE_UNCOVERED = PEOPLE_CAPABILITIES.filter(c => !c.covered);
export const PEOPLE_METRICS = [
  { name: 'Hiring vs plan', indicator: 'Lagging' as const, definition: 'Employees joined / planned joins due by the HR review date. Six-month hiring progress and total headcount are shown separately.', value: `${PEOPLE_JOINED} / ${PEOPLE_JOINS_DUE}`, target: 'All planned joins due', context: `${PEOPLE_JOINS_DUE - PEOPLE_JOINED} joins overdue · ${PEOPLE_JOINED} / ${PEOPLE_TARGET - PEOPLE_BASE} six-month hires joined`, details: [{ label: 'Headcount', text: `${PEOPLE_HEADCOUNT} people; starting team ${PEOPLE_BASE}, target ${PEOPLE_TARGET}. Assumes no exits.` }, { label: 'Next action', text: 'Confirm joining dates for AUT-02 and STAFF-02; review interim cover with Engineering.' }] },
  { name: 'Critical roles covered', indicator: 'Leading' as const, definition: 'Critical roles required in the next 90 days with a qualified, available person in place / critical roles required. Existing employees and active interim support count; offers and unconfirmed cover do not.', value: `${PEOPLE_CRITICAL_ROLES.filter(r => r.covered).length} / ${PEOPLE_CRITICAL_ROLES.length}`, target: 'All critical roles covered by required dates', context: '1 autonomy applications role uncovered · next 90 days', details: [{ label: 'Coverage', text: 'Existing Hivemind, BD and programme operations staff cover three critical roles; they belong to the original 15-person team.' }, { label: 'Remaining gap', text: 'An additional Staff Software Engineer post is unfilled; the blocked starter STAFF-01 is a separate person. Confirm interim cover before 15 Dec.' }] },
  { name: 'New joiners ready', indicator: 'Lagging' as const, definition: 'Starters signed off by their manager by their agreed role-specific readiness date / starters whose readiness date is due. Future checkpoints are excluded.', value: `${PEOPLE_READY} / ${PEOPLE_READINESS_DUE.length}`, target: 'All starters ready by agreed checkpoints', context: '1 starter blocked · HQ environment access', details: [{ label: 'Readiness evidence', text: 'Five of six starters completed their assigned readiness task by the agreed date. STAFF-01 missed the 28 Nov checkpoint.' }, { label: 'Next action', text: 'Hivemind lead resolves HQ access and completes the integration readiness sign-off.' }] },
  { name: 'Capabilities without backup', indicator: 'Leading' as const, definition: 'Critical capabilities with primary coverage but no qualified, available backup or confirmed HQ cover. This is separate from unfilled staffing demand.', value: String(PEOPLE_UNCOVERED.length), target: '0 without workable cover', context: PEOPLE_UNCOVERED.map(c => c.capability).join(' · '), details: PEOPLE_UNCOVERED.map(c => ({ label: c.capability, text: `${c.action}; ${c.owner}; due ${c.due}.` })) },
].map(metric => ({ ...metric, period: 'Illustrative HR review · 30 Nov 2026' }));

export const PEOPLE_ASSUMPTION_ROWS: [string, string][] = [['Review', 'Constructed month-two HR example at 30 Nov 2026; separate from the October contract and finance snapshot.'], ['Team plan', '15 existing employees + 25 planned hires = 40; six illustrative additional joins, no exits, example current team 21. Existing team split of 9 Hivemind, 3 BD and 3 operations is illustrative. Monthly planned joins: 4, 4, 5, 4, 4, 4.'], ['Evidence', 'All candidates, readiness sign-offs, coverage, actions and dates are illustrative; replace with People and manager records.'], ['Reporting', 'Published India job titles are used as examples throughout HR. Illustrative position targets total 25 planned hires; public postings do not establish vacancy quantities or candidate progress. The chart counts candidates who reached each stage, including later stages. Each job has a different illustrative funnel, including candidates not selected or no longer pursuing the role. Cumulative stage totals retain that history even when hiring is complete. The table shows current interviewing and negotiation counts. Offers accepted includes joined staff plus accepted candidates awaiting joining; joined and awaiting joining are subsets, not additional acceptances. Six joined starters are included in the team, not additional to it.']];
