// First-cut management scenario. User inputs and constructed dates are documented in ASSUMPTIONS.
export const AS_OF = '2026-10-01';
export const BASE_HEADCOUNT = 20;
export const TARGET_HEADCOUNT = 50;
export const SALARY_LAKH = 50;
export const DAY = 86400000;
export const days = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / DAY);
export const date = (s: string) => new Date(`${s}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
export const usd = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
export const inr = (n: number) => `₹${n.toFixed(2)}Cr`;
export type Area = 'Overview' | 'Business Development' | 'Delivery' | 'Engineering' | 'Hiring' | 'Finance' | 'JSW Partnership';
export const AREAS: Area[] = ['Overview', 'Business Development', 'Delivery', 'Engineering', 'Hiring', 'Finance', 'JSW Partnership'];
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
 { id: 'army-follow', customer: 'Indian Army', project: 'Follow-on deployment', segment: 'B2G', stage: 0, value: 120, close: '2028-04-01', decision: 'Agree follow-on discovery', due: '2026-11-06', owner: 'BD + Programme lead', risk: 'Depends on initial acceptance', backed: false, route: 'Capital acquisition · proposed', commitment: 'Separate future scope; excluded from the existing $500M order.' },
 { id: 'maritime', customer: 'Maritime service', project: 'Maritime ISR programme', segment: 'B2G', stage: 1, value: 80, close: '2028-01-31', decision: 'Confirm RFP planning window', due: '2026-10-30', owner: 'Government BD', risk: 'RFP timing', backed: false, route: 'Capital acquisition · standard', commitment: 'Assumed AoN-stage pursuit; no Shield award or evaluation commitment.' },
 { id: 'psu-a', customer: 'Defence PSU A', project: 'Indigenous platform integration', segment: 'PSUs', stage: 2, value: 8, close: '2027-11-30', decision: 'Confirm tender scope', due: '2026-10-20', owner: 'Partner BD', risk: 'Source qualification', backed: false, route: 'PSU tender', commitment: 'Procurement route identified; technical scope awaiting agreement.' },
 { id: 'psu-b', customer: 'Defence PSU B', project: 'Autonomy development package', segment: 'PSUs', stage: 0, value: 12, close: '2028-03-31', decision: 'Nominate programme sponsor', due: '2026-11-13', owner: 'Partner BD', risk: 'Budget not confirmed', backed: false, route: 'Development procurement · proposed', commitment: 'Initial programme discussion; no commitment.' },
];
export const nearClosure = (o: Opportunity) => o.stage >= STAGES[o.segment].length - 3 && days(AS_OF, o.close) >= 0 && days(AS_OF, o.close) <= 90;
export const ARMY = { id: 'army', name: 'Indian Army · V-BAT + Hivemind', value: 500, start: '2026-10-01', end: '2029-09-30', entity: 'Shield contracting entity · USD', owner: 'Programme lead' };
export interface Milestone { id: string; label: string; group: string; start: string; due: string; forecast: string; previous: string; progress: number; owner: string; dependency: string; project: string; receipt?: number }
export const DELIVERY: Milestone[] = [
 { id: 'scope', label: 'Use case & integration scope', group: 'Army · first acceptance', start: '2026-10-01', due: '2026-10-30', forecast: '2026-11-06', previous: '2026-11-03', progress: 10, owner: 'Programme lead', dependency: 'Customer operating-scenario inputs', project: 'army' },
 { id: 'environment', label: 'Engineering environment ready', group: 'Army · first acceptance', start: '2026-10-01', due: '2027-01-01', forecast: '2027-01-01', previous: '2027-01-01', progress: 5, owner: 'Engineering lead', dependency: 'HQ configuration and access', project: 'army' },
 { id: 'simulation', label: 'Simulation demonstration', group: 'Army · first acceptance', start: '2026-11-07', due: '2027-02-01', forecast: '2027-02-05', previous: '2027-02-05', progress: 0, owner: 'Engineering lead', dependency: 'Scope baseline and simulation evidence', project: 'army' },
 { id: 'ground', label: 'Ground / flight readiness', group: 'Army · first acceptance', start: '2027-02-06', due: '2027-03-15', forecast: '2027-03-15', previous: '2027-03-15', progress: 0, owner: 'Programme + Test leads', dependency: 'Engineering readiness sign-off', project: 'army' },
 { id: 'acceptance', label: 'First delivery & acceptance', group: 'Army · first acceptance', start: '2027-03-16', due: '2027-04-01', forecast: '2027-04-01', previous: '2027-04-01', progress: 0, owner: 'Programme lead', dependency: 'Customer demonstration and acceptance', project: 'army', receipt: 100 },
 { id: 'lot2', label: 'Year-two delivery acceptance', group: 'Army · remaining contract', start: '2027-04-02', due: '2028-04-01', forecast: '2028-04-01', previous: '2028-04-01', progress: 0, owner: 'Programme lead', dependency: 'First acceptance and supply readiness', project: 'army', receipt: 150 },
 { id: 'lot3', label: 'Year-three delivery acceptance', group: 'Army · remaining contract', start: '2028-04-02', due: '2029-04-01', forecast: '2029-04-01', previous: '2029-04-01', progress: 0, owner: 'Programme lead', dependency: 'Year-two acceptance', project: 'army', receipt: 150 },
 { id: 'handover', label: 'Final support handover', group: 'Army · remaining contract', start: '2029-04-02', due: '2029-09-30', forecast: '2029-09-30', previous: '2029-09-30', progress: 0, owner: 'Customer support lead', dependency: 'Final contractual handover', project: 'army', receipt: 50 },
];
export interface Blocker { id: string; area: Area; project: string; milestone: string; label: string; owner: string; opened: string; due: string; impact: string; action: string }
export const BLOCKERS: Blocker[] = [
 { id: 'customer-input', area: 'Delivery', project: 'army', milestone: 'scope', label: 'Customer scenario inputs', owner: 'Programme lead', opened: '2026-09-21', due: '2026-10-05', impact: 'Scope forecast +7 days', action: 'Agree the missing inputs with the customer sponsor.' },
 { id: 'hq-access', area: 'Engineering', project: 'army', milestone: 'environment', label: 'HQ environment access', owner: 'Engineering lead', opened: '2026-09-26', due: '2026-10-08', impact: '2 scenarios awaiting inputs', action: 'Confirm configuration and environment access.' },
 { id: 'platform', area: 'Business Development', project: 'oem-isr', milestone: '', label: 'OEM platform availability', owner: 'Partner BD', opened: '2026-09-24', due: '2026-10-16', impact: '$4M scope decision', action: 'Secure the platform-access window for the agreed evaluation.' },
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
 { role: 'Autonomy engineers', count: 10, team: 'Engineering', critical: true, due: '2026-11-01', stage: 'Interviewing', applied: 72, screening: 20, interviewing: 12, offered: 2, accepted: 1, joined: 0 },
 { role: 'Integration engineers', count: 5, team: 'Engineering', critical: true, due: '2026-11-01', stage: 'Offers', applied: 40, screening: 8, interviewing: 6, offered: 2, accepted: 1, joined: 0 },
 { role: 'Simulation / test engineers', count: 3, team: 'Engineering', critical: true, due: '2026-12-01', stage: 'Interviewing', applied: 28, screening: 8, interviewing: 4, offered: 1, accepted: 0, joined: 0 },
 { role: 'Field / programme support', count: 5, team: 'Delivery & support', critical: false, due: '2027-01-01', stage: 'Screening', applied: 35, screening: 12, interviewing: 5, offered: 0, accepted: 1, joined: 0 },
 { role: 'BD / partnership managers', count: 2, team: 'BD & partnerships', critical: false, due: '2027-02-01', stage: 'Screening', applied: 20, screening: 6, interviewing: 2, offered: 0, accepted: 0, joined: 0 },
 { role: 'People / finance / operations', count: 5, team: 'People, finance & operations', critical: false, due: '2027-03-01', stage: 'Posted', applied: 30, screening: 10, interviewing: 2, offered: 0, accepted: 0, joined: 0 },
];
export const HIRING_PLAN = Array.from({ length: 6 }, (_, i) => ({ month: ['Oct 26','Nov 26','Dec 26','Jan 27','Feb 27','Mar 27'][i], planned: 5, cumulative: 25 + i * 5, actual: 20, due: new Date(Date.UTC(2026,10+i,0)).toISOString().slice(0,10) }));
export const CURRENT_HEADCOUNT = BASE_HEADCOUNT + ROLES.reduce((s,r)=>s+r.joined,0);
export const MONTHLY_PAYROLL = CURRENT_HEADCOUNT * SALARY_LAKH / 100 / 12;
export const OVERHEAD_RATE = .25;
export const FIXED_MONTHLY = .30;
export const CURRENT_BURN = MONTHLY_PAYROLL * (1 + OVERHEAD_RATE) + FIXED_MONTHLY;
export const CURRENT_CASH = 10; // INR crore, India entity only
export const CASH_FORECAST = Array.from({ length: 18 }, (_, i) => {
 const headcount = Math.min(25+i*5, TARGET_HEADCOUNT);
 const payroll = headcount * SALARY_LAKH / 100 / 12;
 const d = new Date(Date.UTC(2026,9+i,1));
 return { month: d.toLocaleDateString('en-GB',{month:'short',year:'2-digit',timeZone:'UTC'}), headcount, payroll, overhead: payroll * OVERHEAD_RATE + FIXED_MONTHLY, burn: payroll * (1+OVERHEAD_RATE) + FIXED_MONTHLY };
});
export const REQUIRED_FUNDING = CASH_FORECAST.reduce((s,m)=>s+m.burn,0);
export const CONFIRMED_FUNDING = REQUIRED_FUNDING - CURRENT_CASH;
export const FUNDING_EVENTS = [{ date: '2026-12-01', amount: CONFIRMED_FUNDING, label: 'HQ funding transfer' }];
let cash = CURRENT_CASH;
export const CASH_CURVE = CASH_FORECAST.map((m,i)=>{
 cash += i===2 ? CONFIRMED_FUNDING : 0;
 cash -= m.burn;
 return { ...m, balance: Math.abs(cash) < 1e-8 ? 0 : cash };
});
export const FUNDING_COVERAGE = CASH_CURVE.filter((_,i)=>CASH_CURVE.slice(0,i+1).every(m=>m.balance >= 0)).length;
export const COSTS = [
 { label: 'Salaries', budget: MONTHLY_PAYROLL, actual: MONTHLY_PAYROLL },
 { label: 'Benefits / people overhead', budget: MONTHLY_PAYROLL * OVERHEAD_RATE, actual: MONTHLY_PAYROLL * OVERHEAD_RATE },
 { label: 'Facilities / tools / travel', budget: FIXED_MONTHLY, actual: FIXED_MONTHLY + .04 },
];
export const PAYMENTS = [
 { id: 'A-01', milestone: 'advance', label: 'Contract advance', amount: 50, invoice: '2026-09-30', due: '2026-09-30', received: true },
 ...DELIVERY.filter(m=>m.receipt).map((m,i)=>({ id: `A-0${i+2}`, milestone: m.id, label: m.label, amount: m.receipt!, invoice: m.due, due: new Date(Date.parse(m.due)+30*DAY).toISOString().slice(0,10), received: false })),
];
// Illustrative recognised-revenue schedule; distinct from the cash instalments.
export const REVENUE_PLAN = [
 { milestone: 'acceptance', amount: 100 },
 { milestone: 'lot2', amount: 150 },
 { milestone: 'lot3', amount: 150 },
 { milestone: 'handover', amount: 100 },
].map(item => ({ ...item, date: DELIVERY.find(m => m.id === item.milestone)!.forecast }));
export const RECOGNISED_REVENUE = REVENUE_PLAN.filter(r=>r.date<=AS_OF).reduce((s,r)=>s+r.amount,0);
export const TRANSFERS = ['Configuration baseline','Document index','Interface documentation','Tooling specifications','Training material','Support documentation','Final documentation pack','Training capability demonstration'].map((label,i)=>({ id:`t${i}`, label, accepted:i<6, due:i<6?'2026-09-30':i===6?'2026-10-15':'2026-10-29', owner:i===7?'India training lead':'HQ transfer lead', receiver:i===7?'JSW training lead':'JSW technical lead' }));
export const JSW: Milestone[] = [
 { id:'documentation', label:'Transfer documentation', group:'Shield commitments', start:'2026-09-01', due:'2026-10-15', forecast:'2026-10-15', previous:'2026-10-15', progress:75, owner:'HQ transfer lead', dependency:'JSW document review', project:'jsw' },
 { id:'training', label:'Training & capability acceptance', group:'Shield commitments', start:'2026-10-01', due:'2026-10-29', forecast:'2026-10-29', previous:'2026-10-29', progress:0, owner:'India training lead', dependency:'Receiving team available', project:'jsw' },
 { id:'design', label:'Configuration / design release', group:'Joint engineering', start:'2026-09-15', due:'2026-10-30', forecast:'2026-10-30', previous:'2026-10-30', progress:25, owner:'HQ Product + JSW engineering', dependency:'Configuration decision', project:'jsw' },
 { id:'tooling', label:'Facility & tooling readiness', group:'JSW industrialisation', start:'2026-10-01', due:'2026-11-20', forecast:'2026-11-30', previous:'2026-11-25', progress:0, owner:'JSW operations', dependency:'Tooling supplier approval', project:'jsw' },
 { id:'vendors', label:'Critical vendors qualified', group:'JSW industrialisation', start:'2026-10-01', due:'2026-11-15', forecast:'2026-11-15', previous:'2026-11-15', progress:0, owner:'JSW procurement', dependency:'Quality qualification', project:'jsw' },
 { id:'materials', label:'Long-lead materials available', group:'JSW industrialisation', start:'2026-10-16', due:'2026-12-10', forecast:'2026-12-10', previous:'2026-12-10', progress:0, owner:'JSW supply chain', dependency:'Supplier release and funding', project:'jsw' },
 { id:'readiness', label:'Initial production readiness', group:'Joint readiness', start:'2026-12-11', due:'2026-12-31', forecast:'2026-12-31', previous:'2026-12-31', progress:0, owner:'JSW + Shield programme leads', dependency:'Transfer, tooling and materials', project:'jsw' },
];
export const ASSUMPTIONS = [
 { label:'Reporting date & roadmap', value:`${date(AS_OF)} · planning snapshot`, detail:'Roadmap anchors: October 2026 baseline; January 2027 engineering environment and initial production; April 2027 first acceptance; October 2027 first paid expansion; April 2028 Army follow-on. These are proposed month-level checkpoints. Exact days and programme durations below are constructed assumptions, not verified contract dates.' },
 { label:'Army order', value:'$500M · 3 years', detail:'User-directed assumption, not a verified order value. Assumed term 01 Oct 2026–30 Sep 2029, signed 30 Sep 2026. Payment shares 10%, 20%, 30%, 30%, 10%; advance received $50M. Remaining receipts follow acceptance by 30 days. No revenue recognised at the initial snapshot; customer advance is not earned revenue. Constructed performance allocations: $100M first acceptance, $150M year two, $150M year three and $100M final handover, recognising $500M in total. Finance must validate entity attribution and revenue recognition.' },
 { label:'Headcount & salaries', value:'20 → 50 · ₹50L per person/year', detail:'Latest user input supersedes the earlier 45-person target. Adds 30 people in six monthly cohorts of five, at each month end, with no exits. Conservative cash forecast charges each forecast month at its ending headcount. Annual salary: 20 × ₹50L = ₹10Cr; 50 × ₹50L = ₹25Cr. The salary assumption is treated as cash salary; add-on costs are separately assumed.' },
 { label:'Operating expenditure', value:'25% people overhead + ₹0.30Cr/month', detail:'Constructed allowance for benefits and related people overhead at 25% of salary plus ₹30L monthly facilities, tools and travel. September actuals contain ₹4L additional setup expense. All India operating figures are INR crore; contract values are USD millions. No FX conversion or cross-entity cash aggregation.' },
 { label:'Funding coverage', value:`18 months · ${inr(REQUIRED_FUNDING)}`, detail:`Assume ${inr(CURRENT_CASH)} accessible India cash and ${inr(CONFIRMED_FUNDING)} confirmed HQ funding arriving 01 Dec 2026. Funding is constructed to meet the 18-month growing-team expenditure forecast. Target >15 months; an additional decision is needed before the threshold is reached. Army receipts are held by the contracting entity and excluded from India funding.` },
 { label:'BD and hiring samples', value:'6 opportunities · 30 vacancies', detail:'OEM A/B and PSU A/B are fictional placeholders. All scopes, values, stages, candidates and dates are constructed. Near closure requires a commercial-stage opportunity and a forecast signature within 90 days. No current opportunity qualifies; zero is intentional. Candidate current-stage counts are mutually exclusive; applications are cumulative. Customer-backed target: two new programmes in six months; Army follow-on tracked separately.' },
 { label:'Engineering & JSW', value:'6 Army scenarios · 8 transfer items', detail:'Early simulation work is exploratory against a proposed baseline and does not constitute contractual or flight acceptance. Two OEM scenarios are approved presales work, not an order. JSW has accepted six of eight example transfer items. Joint Gantt progress is estimated work completion, distinct from receiving-owner acceptance. JSW owns facility and supplier actions; procurement and capital spending are not India operating expenditure.' },
 { label:'Procurement routes', value:'B2B · B2G · PSUs', detail:'Stages are management templates, not universal legal gates. Use the actual tender route; emergency procurement is a route, not a mandatory pre-AoN stage. PSU procurement follows the specific organisation. Paid pilots move to Delivery when signed; the follow-on remains in BD.' },
];
