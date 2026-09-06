// Illustrative management snapshot only. USD millions; YTD through June 2026.
// Replace this snapshot at each weekly review / monthly finance close.
export interface Detail {
  id: string; title: string; owner: string; target: string; explanation: string;
  action: string; programmes: string; trend: number[]; unit: string;
}
export interface Metric extends Detail { actual: string; plan: string; variance: string; status: 'amber' | 'green'; movement: string }
const detail = (id: string, title: string, owner: string, target: string, explanation: string, action: string, programmes: string, trend: number[], unit: string): Detail => ({ id, title, owner, target, explanation, action, programmes, trend, unit });
export const METRICS: Metric[] = [
  { ...detail('bookings', 'Bookings / Sales Closed', 'BD & Ops lead', '$20M YTD', 'Two contract approvals moved into July.', 'Close commercial approvals on Army follow-on.', 'Army follow-on · Maritime ISR', [3, 5, 8, 11, 15, 18], '$M YTD'), actual: '$18M', plan: '$20M', variance: '−$2M · 90%', status: 'amber', movement: '+$3M MoM' },
  { ...detail('revenue', 'Revenue', 'Programmes lead', '$12M YTD', 'Army acceptance delay leaves $1.5M exposed; other programmes offset part of the gap.', 'Resolve acceptance ownership and rebaseline the milestone.', 'Army delivery · OEM integration', [1.2, 2.8, 4.5, 6.7, 9.4, 11.2], '$M YTD'), actual: '$11.2M', plan: '$12M', variance: '−$0.8M · 93%', status: 'amber', movement: '+$1.8M MoM' },
  { ...detail('backlog', 'Backlog', 'BD & Ops lead', '$44M closing backlog', 'Opening backlog $35.2M + $18M bookings − $11.2M revenue = $42M.', 'Convert negotiation-stage opportunities.', 'Army delivery · Maritime ISR · OEM integration', [37, 38.5, 39, 39.5, 40.8, 42], '$M balance'), actual: '$42M', plan: '$44M', variance: '−$2M', status: 'amber', movement: '+$1.2M MoM' },
  { ...detail('pipeline', 'Qualified Pipeline', 'BD & Ops lead', '$60M / ≥3× coverage', 'Coverage is $65M ÷ $20M bookings plan; displayed conservatively as 3.2×. Top two pursuits dominate weighted pipeline.', 'Qualify two additional non-anchor pursuits.', 'Army follow-on · Maritime ISR · OEM autonomy', [42, 47, 51, 56, 60, 65], '$M snapshot'), actual: '$65M', plan: '$60M', variance: '+$5M · 3.2×', status: 'green', movement: '+$5M MoM' },
  { ...detail('margin', 'Contribution Margin', 'Finance lead', '35%', 'Programme labour and logistics mix reduce margin by 3 percentage points.', 'Agree programme recovery actions with delivery owners.', 'Army delivery · OEM integration', [36, 35, 34, 33, 31, 32], '% YTD'), actual: '32%', plan: '35%', variance: '−3 pp', status: 'amber', movement: '+1 pp MoM' },
  { ...detail('ebitda', 'EBITDA / Operating Contribution', 'Finance lead', '$2.1M YTD', 'Lower contribution is partially offset by overhead underspend.', 'Protect programme margin and phase discretionary overhead.', 'India programme portfolio', [0.2, 0.45, 0.7, 1, 1.5, 1.8], '$M YTD'), actual: '$1.8M', plan: '$2.1M', variance: '−$0.3M', status: 'amber', movement: '+$0.3M MoM' },
  { ...detail('budget', 'Budget Consumed', 'Finance lead', '50% time-phased spend', '$9.4M operating cost ÷ assumed $20.435M annual envelope = 46% (rounded). Underspend includes hiring delays.', 'Reforecast hiring and delivery catch-up costs before releasing headroom.', 'India operating budget', [7, 14, 21, 29, 38, 46], '% annual budget'), actual: '46%', plan: '50% time', variance: '−4 pp', status: 'green', movement: '+8 pp MoM' },
  { ...detail('delivery', 'Delivery', 'Programmes lead', '95% on-time milestones', 'One Army milestone is 17 days late; acceptance is complete on 7 of 8 gates.', 'Assign one acceptance owner and agree the recovery date.', 'Army delivery · Maritime ISR · OEM integration', [96, 94, 92, 90, 86, 88], '% on time'), actual: '88%', plan: '95%', variance: '−7 pp', status: 'amber', movement: '+2 pp MoM' },
];
export const FUNCTIONS = [
  { ...detail('growth', 'Business Development & Ops', 'India BD & Ops lead', '$60M pipeline · $20M bookings · 30% win rate', 'Pipeline exceeds target, while bookings lag $2M and win rate trails by 2 pp.', 'Clear closing conditions and diversify the qualified pipeline.', 'Army follow-on · Maritime ISR · OEM autonomy', [42, 47, 51, 56, 60, 65], '$M qualified pipeline'), numbers: [['$65M', 'Qualified pipeline'], ['$18M', 'Bookings'], ['28%', 'Win rate']] },
  { ...detail('programmes', 'Programmes & Customer Delivery', 'India Programmes lead', '95% on time · 8/8 acceptance · $0 at risk', 'Acceptance ownership is delaying an Army revenue milestone.', 'Name the acceptance owner and execute the recovery plan.', 'Army delivery · Maritime ISR', [96, 94, 92, 90, 86, 88], '% on time'), numbers: [['88%', 'Milestones on time'], ['7 / 8', 'Customer acceptance'], ['$1.5M', 'Revenue at risk']] },
  { ...detail('engineering', 'Hivemind & Solutions Engineering', 'India Engineering lead', '4 integrations · 3 deployments · ≤12 weeks', '14 FTE demand exceeds 9 available; cycle time is 2 weeks over target.', 'Prioritise two integrations and secure one interim specialist.', 'Army SDK · OEM autonomy · Maritime ISR · Simulation', [18, 18, 17, 16, 15, 14], 'weeks / integration'), numbers: [['4', 'Active integrations'], ['2', 'Operational deployments'], ['14 wk', 'Integration cycle time']] },
  { ...detail('industrial', 'Procurement & Industrialisation', 'India Industrialisation lead', '≥95% material coverage · ≥95% build adherence · 0 gates', 'Late critical materials leave three production gates outstanding.', 'Expedite critical materials with JSW and sequence remaining gates.', 'JSW build programme · Army delivery', [96, 94, 92, 89, 85, 87], '% build adherence'), numbers: [['92%', 'Critical-material coverage'], ['87%', 'Build-plan adherence'], ['3', 'Production gates remaining']] },
  { ...detail('people', 'People & HR', 'India People lead', '35 headcount · 0 critical vacancies · ≤40 days', 'Four critical vacancies leave headcount below plan; a fifth FTE is an interim execution need.', 'Approve four critical hires plus one temporary engineering assignment.', 'Engineering · Delivery · Industrialisation', [22, 24, 26, 28, 30, 31], 'headcount'), numbers: [['31 / 35', 'Headcount / plan'], ['4', 'Critical roles open'], ['46 d', 'Time to productivity']] },
  { ...detail('finance', 'Finance, Commercial & Legal', 'India Finance / Commercial lead', '≥95% collections · 35% margin · ≤50% budget · 0 exposures', 'Collections trail by 1 pp. Two open exposures concern acceptance terms and partner liability.', 'Resolve commercial exposures with Programmes and global Legal.', 'Army acceptance · JSW partner agreement', [89, 90, 92, 93, 93, 94], '% collections'), numbers: [['94%', 'Collections'], ['32%', 'Contribution margin'], ['46%', 'Budget consumed'], ['2', 'Material commercial/legal exposures']] },
];
export const DEALS = [
  { name: 'Army follow-on', product: 'V-BAT', value: '$16M', stage: 'Negotiation', close: 'Jul 2026', movement: '↑ From proposal', blocker: 'Acceptance terms' },
  { name: 'Maritime ISR', product: 'V-BAT', value: '$8M', stage: 'Negotiation', close: 'Aug 2026', movement: '→ No change', blocker: 'Trial access' },
  { name: 'OEM autonomy', product: 'Hivemind', value: '$9M', stage: 'Proposal', close: 'Sep 2026', movement: '↑ From qualified', blocker: 'Integration capacity' },
  { name: 'Tactical autonomy', product: 'Hivemind', value: '$5M', stage: 'Proposal', close: 'Oct 2026', movement: '→ No change', blocker: 'Funded scope' },
];
export const FUNNEL = [['Pipeline', '$95M', '+$7M'], ['Qualified', '$65M', '+$5M'], ['Proposal', '$38M', '+$4M'], ['Negotiation', '$24M', '+$6M'], ['Closed', '$18M', '+$3M'], ['Backlog', '$42M', '+$1.2M'], ['Revenue', '$11.2M', '+$1.8M']];
// Cost variances are favourable when actual < budget; income variances use actual − budget.
export const PNL = [
  { label: 'Revenue', actual: 11.2, budget: 12, total: true },
  { label: '− Direct manpower', actual: 2.4, budget: 2.5 },
  { label: '− Partner / JSW cost', actual: 2.8, budget: 2.9 },
  { label: '− Product, material, logistics & other direct programme cost', actual: 2.416, budget: 2.4 },
  { label: '= Contribution Margin', actual: 3.584, budget: 4.2, total: true, subtotal: true },
  { label: '− Indirect manpower', actual: 0.7, budget: 1.2 },
  { label: '− Legal / Finance / HR / Office / other overhead', actual: 1.084, budget: 0.9 },
  { label: '= EBITDA / Operating Contribution', actual: 1.8, budget: 2.1, total: true, subtotal: true },
];
export const RISKS = [
  { ...detail('army-risk', 'Army delivery', 'Programmes lead', '≤0 days late · $0 revenue exposed', 'Acceptance ownership remains unresolved.', 'MD to name the accountable acceptance owner.', 'Army acceptance milestone', [0, 0, 4, 8, 21, 17], 'days behind plan'), summary: '17 days behind plan', impact: '$1.5M revenue exposed', value: 17, threshold: 0, severity: 'red' },
  { ...detail('capacity-risk', 'Engineering capacity', 'Engineering lead', 'Demand ≤ available capacity', 'Four concurrent integrations require 14 FTE; only 9 are available.', 'Prioritise two integrations; approve four hires and one interim FTE.', 'Army SDK · OEM autonomy · Maritime ISR · Simulation', [1, 2, 3, 4, 5, 5], 'FTE gap'), summary: '14 FTE demand / 9 available', impact: '5 FTE execution gap', value: 14, threshold: 9, severity: 'amber' },
  { ...detail('concentration-risk', 'Pipeline concentration', 'BD & Ops lead', '≤60% in top two pursuits', 'Army follow-on and Maritime ISR account for 68% of probability-weighted pipeline.', 'Qualify additional OEM and tactical pursuits.', 'Army follow-on · Maritime ISR', [54, 57, 61, 65, 70, 68], '% weighted pipeline'), summary: '68% in top 2 opportunities', impact: '60% concentration threshold', value: 68, threshold: 60, severity: 'amber' },
  { ...detail('industrial-risk', 'Industrialisation', 'Industrialisation lead', '≥95% build-plan adherence', 'Material delays reduce adherence by 8 percentage points.', 'Confirm supplier expedite dates and resequence production gates.', 'JSW build programme', [4, 6, 8, 11, 15, 13], '% build-plan shortfall'), summary: '87% build-plan adherence', impact: '95% minimum threshold', value: 13, threshold: 5, severity: 'amber' },
];
export const DECISIONS = [
  { ...RISKS[0], id: 'acceptance-decision', title: 'Resolve acceptance ownership', impact: 'Protects $1.5M milestone', link: 'Revenue / Army delivery', due: '03 Jul' },
  { ...RISKS[1], id: 'integration-decision', title: 'Prioritise 2 Hivemind integrations', impact: 'Allocates 9 available FTE', link: 'Engineering capacity', due: '03 Jul' },
  { ...FUNCTIONS[4], id: 'hiring-decision', title: 'Approve critical hiring', impact: 'Closes 5 FTE execution gap', link: 'People / Engineering capacity', due: '06 Jul' },
];
