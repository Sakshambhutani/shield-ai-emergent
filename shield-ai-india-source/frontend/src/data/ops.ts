export const ACTORS = [
  { id: 'india', name: 'Shield AI India', owns: ['Indian customer relationship', 'India programme execution', 'Customer success', 'Indian engineering / integration', 'Government & OEM ecosystem', 'Local hiring · escalation', 'India strategy & pipeline'], claimIds: ['c-india-sub', 'm-opmodel'] },
  { id: 'hq', name: 'Shield AI HQ', owns: ['Core product architecture', 'Hivemind core roadmap', 'V-BAT / X-BAT global product', 'Safety & airworthiness', 'Export controls · platform IP', 'Global prioritisation'], claimIds: ['m-opmodel', 'c-hivemind-agnostic'] },
  { id: 'jsw', name: 'JSW Defence', owns: ['V-BAT manufacturing', 'Industrialisation · facility', 'Supply chain · localisation', 'Sustainment / MRO — scope not publicly established'], claimIds: ['c-jsw'] },
  { id: 'prime', name: 'Indian OEM / Prime', owns: ['Platform ownership', 'System engineering', 'Local integration', 'Customer delivery', 'Mission application IP (commercial structure)'], claimIds: ['c-army-sdk', 'c-catalyst', 'm-opmodel'] },
];

export type Right = 'D' | 'O' | 'C' | '';
export interface RightsRow { row: string; india: Right; hq: Right; jsw: Right; prime: Right; rationale: string }

export const RIGHTS: RightsRow[] = [
  { row: 'India customer commitment', india: 'D', hq: 'C', jsw: 'C', prime: 'C', rationale: 'India is accountable to the customer; HQ consulted on deliverability.' },
  { row: 'Platform roadmap (V-BAT / X-BAT)', india: 'C', hq: 'D', jsw: '', prime: '', rationale: 'Global product coherence; India feeds requirements.' },
  { row: 'Hivemind core product', india: 'C', hq: 'D', jsw: '', prime: '', rationale: 'Core IP stays global; India consulted on Indian mission needs.' },
  { row: 'India-specific mission behaviour', india: 'D', hq: 'C', jsw: '', prime: 'O', rationale: 'Built locally on the SDK — the sovereign-autonomy promise of the Army deal.' },
  { row: 'V-BAT manufacturing', india: 'C', hq: 'C', jsw: 'O', prime: '', rationale: 'JSW owns production; design authority remains with Shield AI.' },
  { row: 'Field support & sustainment', india: 'O', hq: 'C', jsw: 'C', prime: '', rationale: 'India owns customer-facing support; JSW role depends on verified scope.' },
  { row: 'Hiring (India)', india: 'D', hq: 'C', jsw: '', prime: '', rationale: 'Local accountability for local capacity; HQ sets standards.' },
  { row: 'Commercial terms', india: 'O', hq: 'D', jsw: 'C', prime: 'C', rationale: 'India negotiates; HQ approves within global policy and export limits.' },
  { row: 'Customer escalation', india: 'D', hq: 'C', jsw: 'C', prime: 'C', rationale: 'Single accountable owner in India; HQ engaged on product-root causes.' },
  { row: 'Strategic partnerships', india: 'O', hq: 'D', jsw: '', prime: 'C', rationale: 'India shapes and runs; HQ decides given IP and export implications.' },
];

export interface Cadence {
  id: string; ring: number; name: string; freq: string; duration: string;
  purpose: string; inputs: string[]; attendees: string[]; decisions: string[];
}

export const CADENCES: Cadence[] = [
  { id: 'weekly', ring: 0, name: 'India Operating Review', freq: 'Weekly', duration: '25–40 min', purpose: 'Execution exceptions across the top 3 bets. Not status.', inputs: ['Milestones slipping', 'Customer dependencies', 'Engineering & partner blockers', 'Decisions needed'], attendees: ['India MD', 'Chief of Staff', 'Programme lead', 'Engineering lead', 'BD lead'], decisions: ['Owners assigned', 'Escalations raised', 'Decisions taken or routed'] },
  { id: 'programme', ring: 1, name: 'V-BAT / Programme Review', freq: 'Milestone-driven', duration: 'As needed', purpose: 'Delivery, industrialisation, acceptance, integration, sustainment, risk.', inputs: ['Delivery schedule', 'JSW readiness gates', 'Acceptance dependencies', 'Risk register'], attendees: ['Programme lead', 'JSW programme', 'HQ product', 'Customer success'], decisions: ['Gate pass / hold', 'Risk mitigation', 'Resource requests'] },
  { id: 'monthly', ring: 2, name: 'MD India Business Review', freq: 'Monthly', duration: '60 min', purpose: 'Are the top 3 bets advancing? What must the MD decide?', inputs: ['MD Dashboard (Section 08)', 'KPI scorecard', 'Decision cards', 'Top risks'], attendees: ['India MD', 'Leadership team', 'HQ liaison'], decisions: ['MD decisions logged', 'Resource shifts', 'HQ asks'] },
  { id: 'product', ring: 3, name: 'India × Global Product / Engineering', freq: 'Monthly / 6-weekly', duration: '45 min', purpose: 'Resolve India requirements, integrations, engineering allocation, export dependencies.', inputs: ['India requirement backlog', 'Integration pipeline', 'Export / compliance queue'], attendees: ['India engineering lead', 'HQ product leads', 'Export compliance'], decisions: ['Prioritisation calls', 'Allocation commitments', 'Compliance path'] },
  { id: 'quarterly', ring: 4, name: 'India Strategic Review', freq: 'Quarterly', duration: '90 min', purpose: 'Still the right 3 bets? Which seed matured? Which bet loses resources?', inputs: ['Convergence model refresh', 'Seed discovery memos', 'Market evidence'], attendees: ['India MD', 'Global leadership', 'Chief of Staff'], decisions: ['Bets confirmed / changed', 'Seeds promoted or parked', 'Resource re-allocation'] },
];

export interface Kpi {
  id: string; dim: string; name: string; target: string; status: 'verified' | 'proposed' | 'placeholder';
  current: string; trend: string; rag: 'none'; owner: string; claimIds: string[]; detail: string;
}

export const KPI_DIMS = ['Customer / programme', 'Hivemind embedding', 'Service expansion', 'Industrialisation', 'Organisational health'];

export const KPIS: Kpi[] = [
  { id: 'k1', dim: 'Customer / programme', name: 'Critical delivery milestones on time', target: '100% of agreed gates', status: 'proposed', current: 'Not publicly disclosed', trend: '—', rag: 'none', owner: 'India programme lead', claimIds: ['c-army-select', 'm-kpis'], detail: 'Measured against the customer-agreed delivery schedule for the Army programme.' },
  { id: 'k2', dim: 'Customer / programme', name: 'Operational reference achieved', target: 'By month 12', status: 'proposed', current: 'Not publicly disclosed', trend: '—', rag: 'none', owner: 'India MD', claimIds: ['m-kpis'], detail: 'Army agrees to referenceable operational use.' },
  { id: 'k3', dim: 'Hivemind embedding', name: 'Meaningful Indian platform integrations', target: '3–4 in 18 months', status: 'proposed', current: '0 public (Army SDK licensed)', trend: '—', rag: 'none', owner: 'India engineering lead', claimIds: ['m-integrations', 'c-army-sdk'], detail: 'Integration = SIL/HIL complete plus autonomous flight or sail on an Indian-built platform.' },
  { id: 'k4', dim: 'Hivemind embedding', name: 'Time to first autonomous flight / sail', target: '≤ 3 months per Catalyst cycle', status: 'proposed', current: 'Not publicly disclosed', trend: '—', rag: 'none', owner: 'India engineering lead', claimIds: ['c-catalyst', 'c-mhi'], detail: 'Benchmarked on MHI (8 weeks) and Catalyst (3 months).' },
  { id: 'k5', dim: 'Service expansion', name: 'Navy engagement stage', target: 'Trial pathway by month 12', status: 'proposed', current: 'Not publicly disclosed', trend: '—', rag: 'none', owner: 'India BD (Navy)', claimIds: ['c-nsuas', 'm-navy-pen'], detail: 'Stages: mapped → engaged → demo → trial pathway → programme position.' },
  { id: 'k6', dim: 'Industrialisation', name: 'JSW production-readiness gates', target: 'Gates met toward reported late-2026 start', status: 'verified', current: 'Facility under construction (reported)', trend: '—', rag: 'none', owner: 'JSW · India industrialisation lead', claimIds: ['c-jsw'], detail: 'Externally reported: $90M Hyderabad facility; production start reported for late 2026.' },
  { id: 'k7', dim: 'Organisational health', name: 'Critical roles filled', target: '100% of critical roles', status: 'placeholder', current: 'Not publicly disclosed', trend: '—', rag: 'none', owner: 'India MD', claimIds: ['c-india-sub'], detail: 'Programme, engineering, Navy BD, industrialisation leads.' },
  { id: 'k8', dim: 'Organisational health', name: 'Unresolved HQ dependencies > 30 days', target: '0', status: 'proposed', current: 'Not publicly disclosed', trend: '—', rag: 'none', owner: 'Chief of Staff', claimIds: ['m-kpis'], detail: 'Counts product, export or engineering asks open beyond 30 days.' },
];

export const DASHBOARD = {
  bets: [
    { id: 'scale', title: 'SCALE', sub: 'Army V-BAT + Hivemind', items: [['Latest milestone', 'Selection announced Jan 2026 (public)'], ['Next milestone', 'Gate: delivery / operational proof'], ['Biggest blocker', 'Acceptance dependencies (structural)']], claimIds: ['c-army-select', 'm-md'] },
    { id: 'embed', title: 'EMBED', sub: 'Hivemind / Indian platforms', items: [['Integrations active', 'Not publicly disclosed'], ['Next demo', 'Gate: first SIL/HIL demo'], ['Biggest blocker', 'Platform choice & export scope']], claimIds: ['m-integrations', 'm-md'] },
    { id: 'expand', title: 'EXPAND', sub: 'Navy', items: [['Stage', 'NSUAS AoN exists (public)'], ['Next decision', 'Select maritime partner'], ['Biggest blocker', 'Trial slot & incumbent autonomy']], claimIds: ['c-nsuas', 'm-md'] },
  ],
  scorecard: ['Programme delivery', 'Hivemind integrations', 'Follow-on pipeline', 'Service expansion', 'Industrialisation', 'Critical talent'],
  decisions: [
    { id: 'd1', decision: 'Choose 2 platforms for India Catalyst', why: 'Integration clock starts only when platforms are fixed.', deadline: 'Month 3', rec: 'NewSpace (fast) + one Navy-relevant maritime platform', bet: 'embed' },
    { id: 'd2', decision: 'Approve programme governance charter', why: 'India / HQ / JSW ownership must be explicit before deliveries.', deadline: 'Month 1', rec: 'Approve; India accountable, HQ design authority, JSW production', bet: 'scale' },
    { id: 'd3', decision: 'Approve Navy partner engagement', why: 'Partner choice determines trial pathway timing.', deadline: 'Month 6', rec: 'Engage shipbuilder + BEL in parallel; decide by month 6', bet: 'expand' },
    { id: 'd4', decision: 'Escalate HQ engineering allocation', why: 'Parallel integrations exceed India capacity without HQ support.', deadline: 'Month 4', rec: 'Request dedicated Catalyst engineers for India', bet: 'embed' },
  ],
  risks: [
    { id: 'k1', risk: 'Programme acceptance slips', severity: 'High', traj: 'Stable', bet: 'scale', owner: 'India programme lead', mitigation: 'Acceptance dependency plan; weekly exception review', decision: 'Release support staffing' },
    { id: 'k2', risk: 'Industrialisation delay', severity: 'High', traj: 'Watch', bet: 'scale', owner: 'JSW · India industrialisation', mitigation: 'Gate reviews; supply-chain blocker list', decision: 'Confirm readiness gates' },
    { id: 'k3', risk: 'Engineering bandwidth vs integrations', severity: 'Medium', traj: 'Rising', bet: 'embed', owner: 'India engineering lead', mitigation: 'Limit to 2 platforms first; HQ Catalyst support', decision: 'Escalate allocation' },
    { id: 'k4', risk: 'Export / compliance scope of SDK', severity: 'Medium', traj: 'Stable', bet: 'embed', owner: 'HQ export compliance', mitigation: 'Define India Catalyst scope early', decision: 'Approve scope' },
    { id: 'k5', risk: 'Navy timing outside our control', severity: 'Medium', traj: 'Stable', bet: 'expand', owner: 'India BD (Navy)', mitigation: 'Partner-led demo independent of procurement', decision: 'Fund demo' },
  ],
  horizons: [
    { label: 'Next 30', sub: 'Critical milestones', items: ['Governance charter signed', 'OEM force-ranking complete', 'Navy stakeholder map'] },
    { label: 'Next 60', sub: 'Decision gates', items: ['2 Catalyst platforms chosen', 'Support staffing released', 'HQ allocation confirmed'] },
    { label: 'Next 90', sub: 'Outcomes expected', items: ['India Catalyst offer live', 'Customer success plan agreed', 'Navy pursuit approved'] },
  ],
};
