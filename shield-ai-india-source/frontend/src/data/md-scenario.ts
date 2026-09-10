import { FX_NOTE, formatInrCrore, formatUsdMillionsInInr } from '@/lib/currency';
export { formatUsdMillionsInInr } from '@/lib/currency';
// First-cut management scenario. User inputs and constructed dates are documented in ASSUMPTIONS.
export const AS_OF = '2026-10-01';
export const BASE_HEADCOUNT = 20;
export const TARGET_HEADCOUNT = 50;
export const SALARY_LAKH = 50;
export const DAY = 86400000;
export const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / DAY);
export const date = (s: string) => new Date(`${s}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
// Contract, opportunity, payment and revenue source amounts remain USD millions.
export const inr = formatInrCrore;
export type Area = 'Overview' | 'Business Development' | 'Operations' | 'Engineering' | 'HR' | 'Finance and Legal' | 'JSW Partnership';
export const AREAS: Area[] = ['Overview', 'Business Development', 'Operations', 'Engineering', 'HR', 'Finance and Legal', 'JSW Partnership'];
export type Segment = 'B2B' | 'B2G' | 'PSUs';
export const STAGES: Record<Segment, string[]> = {
 B2B: ['Engaged', 'Strategic fit', 'Platform & scope', 'Evaluation commitment', 'Proposal', 'Negotiation', 'Signed'],
 B2G: ['Requirement / RFI', 'AoN', 'RFP issued', 'Bid submitted', 'Technical evaluation', 'Trials / staff evaluation', 'Commercial / approval', 'Signed'],
 PSUs: ['Programme need', 'Source qualification', 'Route confirmed', 'RFQ / tender', 'Offer submitted', 'Technical evaluation', 'Commercial / approval', 'PO issued'],
};
export interface Opportunity { id: string; customer: string; project: string; segment: Segment; stage: number; value: number; close: string; decision: string; due: string; owner: string; risk: string; backed: boolean; route: string; commitment: string }
export const OPPORTUNITIES: Opportunity[] = [
 { id: 'oem-isr', customer: 'Indian OEM A', project: 'ISR platform integration', segment: 'B2B', stage: 3, value: 4, close: '2027-10-01', decision: 'Approve evaluation scope', due: '2026-10-16', owner: 'BD + Engineering', risk: 'Platform access date', backed: true, route: 'Direct integration contract', commitment: 'Partner engineers and platform access committed; paid scope unsigned.' },
 { id: 'oem-autonomy', customer: 'Indian OEM B', project: 'Platform autonomy evaluation', segment: 'B2B', stage: 1, value: 6, close: '2027-12-15', decision: 'Confirm strategic sponsor', due: '2026-10-23', owner: 'BD', risk: 'Investment case unapproved', backed: false, route: 'Evaluation → integration agreement', commitment: 'Discovery underway; no resources committed.' },
 { id: 'army-follow', customer: 'Indian Army', project: 'Follow-on deployment', segment: 'B2G', stage: 0, value: 120, close: '2028-04-01', decision: 'Agree follow-on discovery', due: '2026-11-06', owner: 'BD + Programme lead', risk: 'Depends on initial acceptance', backed: false, route: 'Capital acquisition · proposed', commitment: `Separate future scope; excluded from the existing ${formatUsdMillionsInInr(20)} order.` },
 { id: 'maritime', customer: 'Maritime service', project: 'Maritime ISR programme', segment: 'B2G', stage: 1, value: 80, close: '2028-01-31', decision: 'Confirm RFP planning window', due: '2026-10-30', owner: 'Government BD', risk: 'RFP timing', backed: false, route: 'Capital acquisition · standard', commitment: 'Assumed AoN-stage pursuit; no Shield award or evaluation commitment.' },
 { id: 'psu-a', customer: 'Defence PSU A', project: 'Indigenous platform integration', segment: 'PSUs', stage: 2, value: 8, close: '2027-11-30', decision: 'Confirm tender scope', due: '2026-10-20', owner: 'Partner BD', risk: 'Source qualification', backed: false, route: 'PSU tender', commitment: 'Procurement route identified; technical scope awaiting agreement.' },
 { id: 'psu-b', customer: 'Defence PSU B', project: 'Autonomy development package', segment: 'PSUs', stage: 0, value: 12, close: '2028-03-31', decision: 'Nominate programme sponsor', due: '2026-11-13', owner: 'Partner BD', risk: 'Budget not confirmed', backed: false, route: 'Development procurement · proposed', commitment: 'Initial programme discussion; no commitment.' },
];
export const nearClosure = (o: Opportunity) => o.stage >= STAGES[o.segment].length - 3 && days(AS_OF, o.close) >= 0 && days(AS_OF, o.close) <= 90;
export const ARMY = { id: 'army', name: 'Indian Army · V-BAT + Hivemind', value: 20, start: '2026-10-01', end: '2029-09-30', entity: 'Shield contracting entity · INR equivalent', owner: 'Programme lead' };
export interface Milestone { id: string; label: string; group: string; start: string; due: string; forecast: string; previous: string; progress: number; owner: string; dependency: string; project: string; receipt?: number; acceptedAt?: string; progressLabel?: string; forecastPending?: boolean }
export const DELIVERY: Milestone[] = [
 { id: 'scope', label: 'Use case & integration scope', group: 'Army · first acceptance', start: '2026-10-01', due: '2026-10-30', forecast: '2026-11-06', previous: '2026-11-03', progress: 10, owner: 'Programme lead', dependency: 'Customer operating-scenario inputs', project: 'army' },
 { id: 'environment', label: 'Engineering environment ready', group: 'Army · first acceptance', start: '2026-10-01', due: '2027-01-01', forecast: '2027-01-01', previous: '2027-01-01', progress: 5, owner: 'Engineering lead', dependency: 'HQ configuration and access', project: 'army' },
 { id: 'simulation', label: 'Simulation demonstration', group: 'Army · first acceptance', start: '2026-11-07', due: '2027-02-01', forecast: '2027-02-05', previous: '2027-02-05', progress: 0, owner: 'Engineering lead', dependency: 'Scope baseline and simulation evidence', project: 'army' },
 { id: 'ground', label: 'Ground / flight readiness', group: 'Army · first acceptance', start: '2027-02-06', due: '2027-03-15', forecast: '2027-03-15', previous: '2027-03-15', progress: 0, owner: 'Programme + Test leads', dependency: 'Engineering readiness sign-off', project: 'army' },
 { id: 'acceptance', label: 'First delivery & acceptance', group: 'Army · first acceptance', start: '2027-03-16', due: '2027-04-01', forecast: '2027-04-01', previous: '2027-04-01', progress: 0, owner: 'Programme lead', dependency: 'Customer demonstration and acceptance', project: 'army', receipt: 4 },
 { id: 'lot2', label: 'Year-two delivery acceptance', group: 'Army · remaining contract', start: '2027-04-02', due: '2028-04-01', forecast: '2028-04-01', previous: '2028-04-01', progress: 0, owner: 'Programme lead', dependency: 'First acceptance and supply readiness', project: 'army', receipt: 6 },
 { id: 'lot3', label: 'Year-three delivery acceptance', group: 'Army · remaining contract', start: '2028-04-02', due: '2029-04-01', forecast: '2029-04-01', previous: '2029-04-01', progress: 0, owner: 'Programme lead', dependency: 'Year-two acceptance', project: 'army', receipt: 6 },
 { id: 'handover', label: 'Final support handover', group: 'Army · remaining contract', start: '2029-04-02', due: '2029-09-30', forecast: '2029-09-30', previous: '2029-09-30', progress: 0, owner: 'Customer support lead', dependency: 'Final contractual handover', project: 'army', receipt: 2 },
];
// Programme-to-date reporting; due dates retain the original agreed baseline.
export function milestoneAcceptance(milestones: Milestone[], from: string, through: string) {
 const due = milestones.filter(m => m.due >= from && m.due <= through);
 const onTime = due.filter(m => m.acceptedAt && m.acceptedAt <= m.due).length;
 return { due: due.length, onTime, percentage: due.length ? Math.round(onTime / due.length * 100) : null };
}
export const DELIVERY_ACCEPTANCE = milestoneAcceptance(DELIVERY, ARMY.start, AS_OF);
export interface Blocker { id: string; area: Area; project: string; milestone: string; label: string; owner: string; opened: string; due: string; impact: string; action: string }
export const BLOCKERS: Blocker[] = [
 { id: 'customer-input', area: 'Operations', project: 'army', milestone: 'scope', label: 'Customer scenario inputs', owner: 'Programme lead', opened: '2026-09-21', due: '2026-10-05', impact: 'Scope forecast +7 days', action: 'Agree the missing inputs with the customer sponsor.' },
 { id: 'hq-access', area: 'Engineering', project: 'army', milestone: 'environment', label: 'HQ environment access', owner: 'Engineering lead', opened: '2026-09-26', due: '2026-10-08', impact: '2 scenarios awaiting inputs', action: 'Confirm configuration and environment access.' },
 { id: 'platform', area: 'Business Development', project: 'oem-isr', milestone: '', label: 'OEM platform availability', owner: 'Partner BD', opened: '2026-09-24', due: '2026-10-16', impact: `${formatUsdMillionsInInr(4)} scope decision`, action: 'Secure the platform-access window for the agreed evaluation.' },
 { id: 'tooling', area: 'JSW Partnership', project: 'jsw', milestone: 'tooling', label: 'Long-lead tooling approval', owner: 'JSW procurement lead', opened: '2026-09-23', due: '2026-10-09', impact: 'Tooling readiness +10 days', action: 'Confirm supplier choice and release approval.' },
];
export const SCENARIOS = [
 { id: 's1', label: 'ISR mission workflow', project: 'army', platform: 'V-BAT', state: 'Passed', owner: 'Autonomy lead', next: 'Ground-test plan', due: '2026-10-16' },
 { id: 's2', label: 'Geography configuration', project: 'army', platform: 'V-BAT', state: 'Passed', owner: 'Simulation lead', next: 'Configuration review', due: '2026-10-12' },
 { id: 's3', label: 'Platform interface validation', project: 'army', platform: 'V-BAT', state: 'Failed', owner: 'Integration lead', next: 'Interface fix and rerun', due: '2026-10-09' },
 { id: 's4', label: 'Operator workflow', project: 'army', platform: 'V-BAT', state: 'Ready', owner: 'Test lead', next: 'Simulation run', due: '2026-10-15' },
 { id: 's5', label: 'Customer environment case A', project: 'army', platform: 'V-BAT', state: 'Blocked', owner: 'Programme lead', next: 'Customer inputs', due: '2026-10-05' },
 { id: 's6', label: 'Customer environment case B', project: 'army', platform: 'V-BAT', state: 'Blocked', owner: 'Engineering lead', next: 'HQ test inputs', due: '2026-10-08' },
 { id: 'o1', label: 'OEM interface baseline', project: 'oem-isr', platform: 'Partner platform', state: 'Ready', owner: 'Solutions lead', next: 'Evaluation scope review', due: '2026-10-16' },
 { id: 'o2', label: 'OEM application scenario', project: 'oem-isr', platform: 'Partner platform', state: 'Blocked', owner: 'Partner BD', next: 'Platform access', due: '2026-10-16' },
];
// Illustrative preparation outputs, separate from customer delivery milestones.
export const ENGINEERING_PERIOD_START = '2026-09-01';
export const ENGINEERING_COMMITMENTS = [
 { id:'eng-docs', project:'army', label:'Initial hardware document register', due:'2026-09-24', acceptedAt:'2026-09-24', owner:'Integration lead', check:'Available documents indexed and gaps assigned' },
 { id:'eng-workflow', project:'army', label:'ISR simulation workflow checks', due:'2026-09-25', acceptedAt:'2026-09-25', owner:'Autonomy lead', check:'Agreed workflow checks passed in simulation' },
 { id:'eng-geography', project:'army', label:'Geography configuration checks', due:'2026-09-28', acceptedAt:'2026-09-28', owner:'Simulation lead', check:'Configuration checks passed in the preparation environment' },
 { id:'eng-test-plan', project:'army', label:'Initial interface test plan', due:'2026-09-29', acceptedAt:'2026-09-29', owner:'Test lead', check:'Interface checks and expected results agreed' },
 { id:'eng-interface', project:'army', label:'Interface validation fix', due:'2026-09-30', acceptedAt:null, owner:'Integration lead', check:'Failed interface check corrected and rerun passed' },
 { id:'eng-inputs', project:'army', label:'Customer environment test inputs', due:'2026-10-05', acceptedAt:null, owner:'Programme lead', check:'Missing customer inputs agreed for test preparation' },
 { id:'eng-access', project:'army', label:'HQ test configuration access', due:'2026-10-08', acceptedAt:null, owner:'Engineering lead', check:'Required HQ configuration accessible to India engineers' },
 { id:'eng-oem-info', project:'oem-isr', label:'Initial partner platform information register', due:'2026-09-30', acceptedAt:'2026-09-30', owner:'Solutions lead', check:'Received platform information indexed and gaps assigned' },
 { id:'eng-oem-access', project:'oem-isr', label:'Partner platform access window', due:'2026-10-16', acceptedAt:null, owner:'Partner BD', check:'Platform access window confirmed for evaluation planning' },
];
export const ENGINEERING_BLOCKER_LINKS = [
 { blocker:'customer-input', commitment:'eng-inputs' },
 { blocker:'hq-access', commitment:'eng-access' },
 { blocker:'platform', commitment:'eng-oem-access' },
];
export const engineeringMetrics = (project: string) => {
 const commitments = ENGINEERING_COMMITMENTS.filter(c=>c.project===project);
 const due = commitments.filter(c=>c.due>=ENGINEERING_PERIOD_START&&c.due<=AS_OF);
 const delivered = due.filter(c=>c.acceptedAt&&c.acceptedAt<=c.due).length;
 const blockers = ENGINEERING_BLOCKER_LINKS.filter(l=>commitments.some(c=>c.id===l.commitment)).map(l=>BLOCKERS.find(b=>b.id===l.blocker)!);
 return { commitments, due, delivered, percentage:due.length?Math.round(delivered/due.length*100):null, blockers, oldest:Math.max(0,...blockers.map(b=>days(b.opened,AS_OF))) };
};
export const CAPACITY = [
 { team: 'Engineering', current: 12, assigned: 12, target: 30 },
 { team: 'Delivery & support', current: 3, assigned: 3, target: 8 },
 { team: 'BD & partnerships', current: 2, assigned: 2, target: 4 },
 { team: 'People, finance & operations', current: 3, assigned: 3, target: 8 },
];
export const ENGINEERING_READINESS = [
 { label: 'Platform / hardware documents', complete: 4, total: 5 },
 { label: 'Interfaces & configuration', complete: 3, total: 5 },
 { label: 'Use cases & geography', complete: 4, total: 6 },
 { label: 'Test inputs & acceptance checks', complete: 4, total: 6 },
];
export const ROLES = [
 { role: 'Autonomy engineers', count: 10, team: 'Engineering', critical: true, due: '2026-11-01', stage: 'Interviewing', applied: 72, screening: 20, interviewing: 12, offered: 2, accepted: 2, joined: 0 },
 { role: 'Integration engineers', count: 5, team: 'Engineering', critical: true, due: '2026-11-01', stage: 'Offers', applied: 40, screening: 8, interviewing: 6, offered: 2, accepted: 1, joined: 0 },
 { role: 'Simulation / test engineers', count: 3, team: 'Engineering', critical: true, due: '2026-12-01', stage: 'Interviewing', applied: 28, screening: 8, interviewing: 4, offered: 1, accepted: 0, joined: 0 },
 { role: 'Field / programme support', count: 5, team: 'Delivery & support', critical: false, due: '2027-01-01', stage: 'Screening', applied: 35, screening: 12, interviewing: 5, offered: 0, accepted: 0, joined: 0 },
 { role: 'BD / partnership managers', count: 2, team: 'BD & partnerships', critical: false, due: '2027-02-01', stage: 'Screening', applied: 20, screening: 6, interviewing: 2, offered: 0, accepted: 0, joined: 0 },
 { role: 'People / finance / operations', count: 5, team: 'People, finance & operations', critical: false, due: '2027-03-01', stage: 'Posted', applied: 30, screening: 10, interviewing: 2, offered: 0, accepted: 0, joined: 0 },
];
export const HIRING_PLAN = Array.from({ length: 6 }, (_, i) => ({ month: ['Oct 26','Nov 26','Dec 26','Jan 27','Feb 27','Mar 27'][i], planned: 5, cumulative: 25 + i * 5, actual: 20, due: new Date(Date.UTC(2026,10+i,0)).toISOString().slice(0,10) }));
// Five named critical openings due within 30 days; confirmed joins require dated acceptance.
export const JOINING_COMMITMENTS = [
 { id: 'AUT-01', role: 'Autonomy engineer', due: '2026-10-31', forecast: '2026-10-26', confirmed: true, milestone: 'Simulation demonstration' },
 { id: 'AUT-02', role: 'Autonomy engineer', due: '2026-10-31', forecast: '2026-10-28', confirmed: true, milestone: 'Simulation demonstration' },
 { id: 'INT-01', role: 'Integration engineer', due: '2026-10-31', forecast: '2026-10-30', confirmed: true, milestone: 'Engineering environment ready' },
 { id: 'AUT-03', role: 'Autonomy engineer', due: '2026-10-31', forecast: '2026-11-09', confirmed: false, milestone: 'Simulation demonstration' },
 { id: 'INT-02', role: 'Integration engineer', due: '2026-10-31', forecast: '2026-11-12', confirmed: false, milestone: 'Engineering environment ready' },
];
export const CRITICAL_JOINING_GAPS = JOINING_COMMITMENTS.filter(r=>days(AS_OF,r.due)>=0 && days(AS_OF,r.due)<=30 && (!r.confirmed || r.forecast>r.due));
export const CURRENT_HEADCOUNT = BASE_HEADCOUNT + ROLES.reduce((s,r)=>s+r.joined,0);
export const MONTHLY_PAYROLL = CURRENT_HEADCOUNT * SALARY_LAKH / 100 / 12;
export const OVERHEAD_RATE = .25;
export const FIXED_MONTHLY = .30;
// Illustrative total expenditure; actuals exist only for closed months.
export const MONTHLY_EXPENDITURE: { label: string; plan: number; actual?: number }[] = [
 { label: 'Apr 26', plan: 5.00, actual: 4.95 },
 { label: 'May 26', plan: 5.25, actual: 5.30 },
 { label: 'Jun 26', plan: 5.50, actual: 5.45 },
 { label: 'Jul 26', plan: 5.75, actual: 5.80 },
 { label: 'Aug 26', plan: 6.00, actual: 6.10 },
 { label: 'Sep 26', plan: 6.25, actual: 6.35 },
 { label: 'Oct 26', plan: 6.50 },
 { label: 'Nov 26', plan: 6.75 },
 { label: 'Dec 26', plan: 7.00 },
 { label: 'Jan 27', plan: 7.25 },
 { label: 'Feb 27', plan: 7.50 },
 { label: 'Mar 27', plan: 7.75 },
];
export const LAST_CLOSED_EXPENDITURE = MONTHLY_EXPENDITURE.filter(m => m.actual !== undefined).slice(-1)[0];
export const CURRENT_BURN = LAST_CLOSED_EXPENDITURE.actual!;
export const CURRENT_CASH = 10; // INR crore, India entity only
export const CASH_FORECAST = Array.from({ length: 18 }, (_, i) => {
 const headcount = Math.min(25+i*5, TARGET_HEADCOUNT);
 const payroll = headcount * SALARY_LAKH / 100 / 12;
 const d = new Date(Date.UTC(2026,9+i,1));
 return { month: d.toLocaleDateString('en-GB',{month:'short',year:'2-digit',timeZone:'UTC'}), headcount, payroll, overhead: payroll * OVERHEAD_RATE + FIXED_MONTHLY, burn: MONTHLY_EXPENDITURE[Math.min(6+i, 11)].plan };
});
export const REQUIRED_FUNDING = CASH_FORECAST.reduce((s,m)=>s+m.burn,0);
export const CONFIRMED_FUNDING = REQUIRED_FUNDING - CURRENT_CASH;
export const FUNDING_EVENTS = [{ date: '2026-10-01', amount: CONFIRMED_FUNDING, label: 'HQ funding transfer' }];
let cash = CURRENT_CASH;
export const CASH_CURVE = CASH_FORECAST.map((m,i)=>{
 cash += i===0 ? CONFIRMED_FUNDING : 0;
 cash -= m.burn;
 return { ...m, balance: Math.abs(cash) < 1e-8 ? 0 : cash };
});
export const FUNDING_COVERAGE = CASH_CURVE.filter((_,i)=>CASH_CURVE.slice(0,i+1).every(m=>m.balance >= 0)).length;
export const COSTS = [
 { label: 'Total expenditure', budget: LAST_CLOSED_EXPENDITURE.plan, actual: CURRENT_BURN },
];
export const PAYMENTS = [
 { id: 'A-01', milestone: 'advance', label: 'Contract advance', amount: 2, invoice: '2026-09-30', due: '2026-09-30', received: true },
 ...DELIVERY.filter(m=>m.receipt).map((m,i)=>({ id: `A-0${i+2}`, milestone: m.id, label: m.label, amount: m.receipt!, invoice: m.due, due: new Date(Date.parse(m.due)+30*DAY).toISOString().slice(0,10), received: false })),
];
// Illustrative recognised-revenue schedule; distinct from the cash instalments.
export const REVENUE_PLAN = [
 { milestone: 'acceptance', amount: 4 },
 { milestone: 'lot2', amount: 6 },
 { milestone: 'lot3', amount: 6 },
 { milestone: 'handover', amount: 4 },
].map(item => ({ ...item, date: DELIVERY.find(m => m.id === item.milestone)!.forecast }));
export const RECOGNISED_REVENUE = REVENUE_PLAN.filter(r=>r.date<=AS_OF).reduce((s,r)=>s+r.amount,0);
export const TRANSFERS = ['Configuration baseline','Document index','Interface documentation','Tooling specifications','Training material','Support documentation','Final documentation pack','Training capability demonstration'].map((label,i)=>({ id:`t${i}`, label, accepted:i<6, due:i<6?'2026-09-30':i===6?'2026-10-15':'2026-10-29', owner:i===7?'India training lead':'HQ transfer lead', receiver:i===7?'JSW training lead':'JSW technical lead' }));
// Constructed JSW planning snapshot, not supplier or service operating records.
export const SUPPLIER_STAGES = ['Identified', 'Evaluating', 'Selected', 'Qualifying', 'Onboarded'] as const;
export const VENDOR_AREAS = [
 ['Airframe & composite structures', 'Onboarded'],
 ['Propulsion components', 'Evaluating'],
 ['Wiring & electrical assemblies', 'Onboarded'],
 ['Avionics & navigation electronics', 'Qualifying'],
 ['Communications equipment', 'Selected'],
 ['EO/IR sensor payloads', 'Qualifying'],
 ['Additional ISR payloads', 'Evaluating'],
 ['Tooling & test equipment', 'Onboarded'],
].map(([label, stage], i) => ({
 id: `vendor-area-${i}`, label, stage: stage as typeof SUPPLIER_STAGES[number],
 shieldOwner: i === 5 || i === 6 ? 'Shield payload engineering' : 'Shield industrialisation',
 jswOwner: 'JSW procurement', due: i === 5 || i === 6 ? '2026-11-30' : '2026-11-15',
 nextAction: stage === 'Onboarded' ? 'Transfer handover' : stage === 'Evaluating' ? 'Evaluation & selection' : stage === 'Selected' ? 'Technical qualification' : 'Qualification sign-off',
 evidence: stage === 'Onboarded' ? 'Illustrative technical and commercial onboarding sign-off; no source document attached.' : 'Awaiting technical approval and JSW onboarding evidence.',
}));
export const TRANSFER_PACKAGES = {
 Production: TRANSFERS,
 'Supplier enablement': ['Sourcing scope and criticality', 'Candidate supplier shortlist', 'Evaluation criteria', 'Qualification support package', 'Onboarding handover'].map((label, i) => ({ id: `supplier-transfer-${i}`, label, accepted: i < 3, due: i < 4 ? '2026-09-30' : '2026-11-30', owner: 'Shield industrialisation lead', receiver: 'JSW procurement lead' })),
 MRO: ['Service scope and responsibility matrix', 'Maintenance and support documentation', 'Technician capability demonstration', 'Tools and test equipment handover', 'Spares and payload repair arrangements', 'Warranty and escalation exercise'].map((label, i) => ({ id: `mro-transfer-${i}`, label, accepted: false, due: i === 0 ? '2026-12-15' : i === 1 ? '2027-01-31' : '2027-03-31', owner: 'Shield support lead', receiver: 'JSW service lead' })),
};
export const JSW_DECISIONS = [
 { id: 'jsw-support', label: 'Allocate Shield supplier qualification support', owner: 'India MD', due: '2026-10-09', action: 'Prioritise engineering capacity for the two payload capability areas.', impact: 'Payload qualification and November onboarding', evidence: 'Named engineering owner and agreed support allocation', status: 'Pending' },
 { id: 'jsw-recovery', label: 'Approve Shield readiness recovery allowance', owner: 'India MD / Finance', due: '2026-10-16', action: 'Review the costed recovery request within delegated authority; escalate excess to HQ.', impact: 'Shield support for tooling commissioning and capability readiness', evidence: 'Costed request and recorded funding decision; amount not yet baselined', status: 'Pending' },
];
export const JSW_NEXT_GATE = { label: 'Capability review', due: '2026-10-29', forecast: '2026-10-29', owner: 'Joint programme leads', dependency: 'Final transfer pack, receiving team availability, demonstration tooling and training evidence. This is an intermediate review, not full production acceptance.' };
const transferCount = (key: keyof typeof TRANSFER_PACKAGES) => `${TRANSFER_PACKAGES[key].filter(t => t.accepted).length}/${TRANSFER_PACKAGES[key].length} accepted`;
const jswMilestone = (id: string, label: string, due: string, forecast: string, owner: string, dependency: string, progressLabel: string, progress = 0): Milestone => ({ id, label, group: 'Joint readiness', start: '2026-10-01', due, forecast, previous: due, owner, dependency, progressLabel, progress, project: 'jsw' });
export const JSW: Milestone[] = [
 jswMilestone('documentation', 'Technology transfer', '2026-10-29', '2026-10-29', 'Shield transfer lead', 'Final documentation pack due 15 Oct; capability demonstration due 29 Oct; JSW receiving-owner acceptance.', transferCount('Production'), 75),
 jswMilestone('vendors', 'Vendor onboarding', '2026-11-30', '2026-11-30', 'JSW procurement', 'Shield identification, evaluation and qualification support; JSW commercial onboarding. Supplier enablement 3/5 accepted, one overdue.', `${VENDOR_AREAS.filter(v=>v.stage==='Onboarded').length}/${VENDOR_AREAS.length} areas covered`, VENDOR_AREAS.filter(v=>v.stage==='Onboarded').length/VENDOR_AREAS.length*100),
 jswMilestone('facility', 'Facility readiness', '2026-11-20', '2026-11-20', 'JSW operations', 'Infrastructure, installation prerequisites and joint site sign-off.', '3/5 checks accepted', 60),
 jswMilestone('tooling', 'Tooling & test readiness', '2026-11-20', '2026-11-30', 'JSW industrialisation', 'Equipment installation, commissioning and acceptance; supplier choice approval due 09 Oct.', '2/4 commissioned', 50),
 jswMilestone('people', 'JSW people readiness', '2026-10-23', '2026-10-23', 'JSW people lead', 'Receiving-team roster and two remaining assignments; distinct from Shield India hiring.', '6/8 roles staffed', 75),
 jswMilestone('training', 'Training & capability acceptance', '2026-10-29', '2026-10-29', 'Shield + JSW training', 'Two remaining personnel must demonstrate agreed tasks. Attendance alone does not qualify; distinct from the eight production transfer deliverables.', '4/6 personnel qualified', 4/6*100),
 jswMilestone('support-ready', 'Initial after-sales readiness', '2027-03-31', '2027-03-31', 'JSW service + Shield', 'Agree support scope by 15 Dec; service personnel, documentation, tools/spares and escalation exercise before first delivery.', 'Scope pending'),
 { ...jswMilestone('mro-capability', 'Local MRO capability', '2027-12-31', '2027-12-31', 'JSW service + Shield', 'Repair scope and demonstrated local capability to be agreed; proposed target only.', 'Later phase · forecast TBD'), start: '2027-04-01', forecastPending: true },
];
export const ASSUMPTIONS = [
 { label:'Display currency', value:FX_NOTE, detail:'Source contract values are retained in USD and converted for display. Native INR budgets are not converted. This reporting conversion does not imply an India cash transfer.' },
 { label:'Engineering commitments', value:'Army 4 / 5 delivered on time', detail:'Illustrative preparation outputs for 01 Sep–01 Oct 2026, separate from customer delivery milestones. Four outputs accepted by their original due dates; the interface fix remains outstanding. Future commitments are excluded from attainment. Critical dependencies link to the existing blocker register; their age uses the dashboard snapshot date. Scenario checks remain supporting detail.' },
 { label:'Reporting date & roadmap', value:`${date(AS_OF)} · planning snapshot`, detail:'Roadmap anchors: October 2026 baseline; January 2027 engineering environment and initial production; April 2027 first acceptance; October 2027 first paid expansion; April 2028 Army follow-on. These are proposed month-level checkpoints. Exact days and programme durations below are constructed assumptions, not verified contract dates.' },
 { label:'Army order', value:`${formatUsdMillionsInInr(20)} · 3 years`, detail:`Order value corrected to ${formatUsdMillionsInInr(20)} by the user. Payment and revenue schedules remain constructed planning assumptions. Assumed term 01 Oct 2026–30 Sep 2029, signed 30 Sep 2026. Payment shares 10%, 20%, 30%, 30%, 10%; advance received ${formatUsdMillionsInInr(2)}. Remaining receipts follow acceptance by 30 days. No revenue recognised at the initial snapshot; customer advance is not earned revenue. Constructed performance allocations: ${formatUsdMillionsInInr(4)} first acceptance, ${formatUsdMillionsInInr(6)} year two, ${formatUsdMillionsInInr(6)} year three and ${formatUsdMillionsInInr(4)} final handover, recognising ${formatUsdMillionsInInr(20)} in total. Finance must validate entity attribution and revenue recognition.` },
 { label:'Headcount & salaries', value:'20 → 50 · ₹50L per person/year', detail:'Latest user input supersedes the earlier 45-person target. Adds 30 people in six monthly cohorts of five, at each month end, with no exits. Conservative cash forecast charges each forecast month at its ending headcount. Annual salary: 20 × ₹50L = ₹10Cr; 50 × ₹50L = ₹25Cr. The salary assumption is treated as cash salary; add-on costs are separately assumed.' },
 { label:'Operating expenditure', value:'April ₹5 Cr → March ₹7.75 Cr monthly plan', detail:'User-directed illustrative total expenditure scenario for FY 2026–27. Plan rises by ₹0.25Cr each month from April 2026. Illustrative actuals through September: ₹4.95Cr, ₹5.30Cr, ₹5.45Cr, ₹5.80Cr, ₹6.10Cr, ₹6.35Cr; future actuals are unavailable. Total expenditure supersedes the earlier salary-plus-overhead burn estimate. Payroll remains a staffing assumption within the total, not additional expenditure. The cash forecast uses October–March plans, then holds ₹7.75Cr/month for its remaining horizon. India expenditure is native INR; contracting-entity receipts remain separate.' },
 { label:'Funding coverage', value:`18 months · ${inr(REQUIRED_FUNDING)}`, detail:`Assume ${inr(CURRENT_CASH)} accessible India cash and ${inr(CONFIRMED_FUNDING)} confirmed HQ funding arriving 01 Oct 2026 before October expenditure. Funding is constructed to meet the 18-month total expenditure forecast. Target >15 months; an additional decision is needed before the threshold is reached. Army receipts are held by the contracting entity and excluded from India funding.` },
 { label:'BD and hiring samples', value:'6 opportunities · 30 vacancies', detail:'OEM A/B and PSU A/B are fictional placeholders. All scopes, values, stages, candidates and dates are constructed. Near closure requires a commercial-stage opportunity and a forecast signature within 90 days. No current opportunity qualifies; zero is intentional. Five critical openings are due 31 Oct: two autonomy and one integration candidate have confirmed dates in October; one autonomy and one integration opening forecast November without confirmed joins. These are part of the 30 vacancies, not additional posts. Candidate current-stage counts are mutually exclusive; applications are cumulative. Customer-backed target: two new programmes in six months; Army follow-on tracked separately.' },
 { label:'Engineering & JSW', value:'6 Army scenarios · 8 transfer items', detail:'Early simulation work is exploratory against a proposed baseline and does not constitute contractual or flight acceptance. Two OEM scenarios are approved presales work, not an order. JSW has accepted six of eight example transfer items. Joint Gantt progress is estimated work completion, distinct from receiving-owner acceptance. JSW owns facility and procurement actions; Shield supports supplier identification, technical qualification and onboarding. Eight illustrative vendor capability areas: three onboarded, two evaluating, two qualifying and one selected. Coverage counts areas, not unique vendors or supplies delivered. Localisation scope requires agreement. Supplier enablement is 3/5 accepted (one overdue); MRO enablement 0/6 (none due). Factory and service readiness checks use separate denominators. Two MD decisions and the 29 Oct capability review are constructed. Facility checks 3/5; tooling 2/4 commissioned; JSW roles 6/8 staffed; personnel 4/6 qualified. These denominators are separate. Local MRO has a proposed target only; no agreed forecast. Procurement and capital spending are not India operating expenditure.' },
 { label:'Procurement routes', value:'B2B · B2G · PSUs', detail:'Stages are management templates, not universal legal gates. Use the actual tender route; emergency procurement is a route, not a mandatory pre-AoN stage. PSU procurement follows the specific organisation. Paid pilots move to Operations when signed; the follow-on remains in BD.' },
];
