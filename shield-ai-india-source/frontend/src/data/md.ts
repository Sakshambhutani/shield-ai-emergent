export type DataClass = 'public' | 'internal' | 'target' | 'illustrative';
export const DATA_CLASS: Record<DataClass, { label: string; tone: 'green' | 'grey' | 'purple' | 'amber' }> = {
  public: { label: 'Verified public', tone: 'green' },
  internal: { label: 'Internal · baseline required', tone: 'grey' },
  target: { label: 'Management target', tone: 'purple' },
  illustrative: { label: 'Illustrative', tone: 'amber' },
};

export interface Bet {
  id: 'scale' | 'embed' | 'expand'; title: string; who: string; what: string;
  currentGate: string; nextGate: string; blocker: string; outcome: string; evidence: string;
  next90: string[]; dependencies: string[]; decisionIds: string[]; riskIds: string[]; claimIds: string[]; drill: number;
  funnel?: string[]; stages?: string[]; stage?: number; stageLabel?: string;
}

export const MD_BETS: Bet[] = [
  { id: 'scale', title: 'SCALE', who: 'Army', what: 'V-BAT + Hivemind', currentGate: 'Programme governance & acceptance plan', nextGate: 'Operational proof', blocker: 'Customer acceptance dependency', outcome: 'Army programme becomes the India reference and scale engine.', evidence: 'Selection announced Jan 2026; JSW Hyderabad facility under construction.', next90: ['Governance charter signed', 'Acceptance and support plan agreed', 'JSW readiness gates defined'], dependencies: ['Export licences', 'JSW facility timeline'], decisionIds: ['d2'], riskIds: ['r1', 'r2', 'r6'], claimIds: ['c-army-select', 'c-jsw', 'm-md'], drill: 4, stageLabel: 'EXECUTE NOW: SCALE' },
  { id: 'embed', title: 'EMBED', who: 'Hivemind', what: 'Indian defence platforms', currentGate: 'Choose 2 Catalyst platforms', nextGate: 'First Indian-platform SIL/HIL', blocker: 'Platform choice & SDK export scope', outcome: '3–4 meaningful Hivemind integrations on Indian-built platforms.', evidence: 'SDK licensed to Indian Army; MHI reached flight test in 8 weeks.', next90: ['OEM force-ranking complete', 'India Catalyst offer live', '2 platforms committed'], dependencies: ['HQ Catalyst engineers', 'Export scope ruling'], decisionIds: ['d1', 'd4'], riskIds: ['r3', 'r4', 'r5'], claimIds: ['c-army-sdk', 'c-catalyst', 'c-mhi', 'm-integrations'], drill: 2, funnel: ['Qualified', 'Committed', 'SIL/HIL', 'Autonomous op', 'Customer demo', 'Programme-linked'], stageLabel: 'BUILD POSITION: EMBED' },
  { id: 'expand', title: 'EXPAND', who: 'Navy', what: 'V-BAT + ViDAR + Maritime Hivemind', currentGate: 'Operational sponsor identified', nextGate: 'Technical pathway agreed', blocker: 'Trial slot & incumbent navigation autonomy', outcome: 'Navy becomes the second anchor service.', evidence: 'NSUAS has AoN (bundled); Netherlands Navy operates V-BAT from ships.', next90: ['Navy stakeholder map', 'Maritime partner shortlist', 'ViDAR mission-fit note'], dependencies: ['Navy access', 'Partner selection'], decisionIds: ['d3'], riskIds: ['r4', 'r5'], claimIds: ['c-nsuas', 'c-rnln', 'm-navy-pen'], drill: 4, stages: ['Discovery', 'Sponsor', 'Pathway', 'Demo', 'Evaluation', 'Programme'], stage: 0, stageLabel: 'SHAPE & PROVE: EXPAND' },
];

export interface Outcome { id: string; title: string; question: string; states: string[]; current: number | null; cls: DataClass; next: string; target?: string }
export const NORTH_STAR: Outcome[] = [
  { id: 'ref', title: 'Army reference', question: 'Credible India reference and scale engine?', states: ['Establishing', 'Operational proof', 'Reference', 'Scale path'], current: 0, cls: 'public', next: 'Operational proof' },
  { id: 'footprint', title: 'Autonomy footprint', question: 'Hivemind embedded in Indian platforms?', states: ['Committed', 'SIL/HIL', 'Autonomous op', 'Programme-linked'], current: null, cls: 'target', next: 'First SIL/HIL', target: '3–4 meaningful integrations' },
  { id: 'navy', title: 'Second service', question: 'Credible Navy franchise forming?', states: ['Discovery', 'Sponsor', 'Pathway', 'Demo', 'Programme'], current: 0, cls: 'public', next: 'Operational sponsor' },
  { id: 'reuse', title: 'Global reuse', question: 'India capability improving Shield globally?', states: ['India-created', 'Reused elsewhere', 'Global baseline'], current: null, cls: 'internal', next: 'First India-built behaviour reused' },
];

export interface Decision { id: string; type: string; decision: string; why: string; deadline: string; rec: string; recLabel?: string; delay: string; bet: 'scale' | 'embed' | 'expand'; claimIds: string[] }
export const MD_DECISIONS: Decision[] = [
  { id: 'd1', type: 'RESOURCE', decision: 'Which 2 platforms get Hivemind engineering first?', why: 'Integration clock starts only when platforms are fixed.', deadline: 'Month 3 gate', rec: 'Select two platforms with a committed sponsor, hardware access and a credible 90-day SIL/HIL demonstration path.', recLabel: 'Decision criteria', delay: 'First-flight window slips a quarter.', bet: 'embed', claimIds: ['c-nrt', 'c-catalyst', 'm-integrations'] },
  { id: 'd2', type: 'ORGANISATION', decision: 'Approve India / HQ / JSW governance charter?', why: 'Ownership must be explicit before first deliveries.', deadline: 'Month 1', rec: 'India accountable · HQ design authority · JSW production.', delay: 'Escalations stall at first slip.', bet: 'scale', claimIds: ['m-opmodel', 'c-jsw'] },
  { id: 'd3', type: 'PARTNER', decision: 'Which Indian maritime partner for the Navy pathway?', why: 'Partner choice sets trial timing and incumbent exposure.', deadline: 'Month 6 gate', rec: 'Hypothesis: engage a shipbuilder + BEL in parallel, subject to a named sponsor, hardware access and a credible trial path.', recLabel: 'Working hypothesis', delay: 'Navy demo moves beyond month 12.', bet: 'expand', claimIds: ['c-grse', 'c-bel-a2ncs', 'c-tt'] },
  { id: 'd4', type: 'PRODUCT', decision: 'Escalate HQ Catalyst engineering allocation?', why: 'Parallel integrations exceed India capacity.', deadline: 'Month 4', rec: 'Request dedicated Catalyst engineers for India.', delay: 'Second integration cannot start.', bet: 'embed', claimIds: ['c-catalyst', 'm-integrations'] },
];

export interface Exception { id: string; label: string; state: string; cls: DataClass; drill: number; bar?: number | null }
export const EXCEPTIONS: Exception[] = [
  { id: 'x1', label: 'Army programme gate', state: 'Baseline required', cls: 'internal', drill: 4 },
  { id: 'x2', label: 'Hivemind time to autonomy', state: 'Baseline required', cls: 'internal', drill: 7 },
  { id: 'x3', label: 'Industrialisation gate', state: 'Facility under construction', cls: 'public', drill: 4 },
  { id: 'x4', label: 'Engineering capacity', state: 'Baseline required', cls: 'internal', drill: 5, bar: null },
  { id: 'x5', label: 'Global dependencies > 30d', state: 'Baseline required', cls: 'internal', drill: 5 },
  { id: 'x6', label: 'Programme conversion', state: 'Baseline required', cls: 'internal', drill: 3 },
];

export interface Risk { id: string; risk: string; trend: '↑' | '→' | '↓'; trigger: string; bet: 'scale' | 'embed' | 'expand'; owner: string; decision: string; drill: number }
export const MD_RISKS: Risk[] = [
  { id: 'r1', risk: 'Army acceptance', trend: '→', trigger: 'Acceptance owner or criteria unresolved by the agreed gate', bet: 'scale', owner: 'India programme lead', decision: 'Escalate with Army/HQ and lock ownership', drill: 4 },
  { id: 'r2', risk: 'Delivery', trend: '↑', trigger: 'A committed delivery or readiness gate slips beyond tolerance', bet: 'scale', owner: 'India programme lead', decision: 'Reallocate resources or reset customer commitment', drill: 4 },
  { id: 'r3', risk: 'Engineering capacity', trend: '↑', trigger: 'Committed integrations exceed qualified capacity', bet: 'embed', owner: 'India engineering lead', decision: 'Stop, sequence or resource integrations', drill: 5 },
  { id: 'r4', risk: 'OEM conversion', trend: '→', trigger: 'Integration proceeds without a named service sponsor or programme pathway', bet: 'embed', owner: 'India MD · Growth', decision: 'Continue, pause or exit the account', drill: 3 },
  { id: 'r5', risk: 'Global dependency', trend: '↑', trigger: 'HQ decision remains unresolved across two review cycles', bet: 'embed', owner: 'MD Office · HQ Product', decision: 'Escalate or alter scope', drill: 5 },
  { id: 'r6', risk: 'JSW industrialisation', trend: '→', trigger: 'A critical transfer, facility or supply-chain gate misses plan', bet: 'scale', owner: 'JSW · India industrialisation', decision: 'Joint recovery plan and accountable owner', drill: 4 },
];

export const HORIZONS = [
  { label: 'Next 30', sub: 'Must close', items: ['Governance charter', 'OEM force-ranking', 'Navy stakeholder map'] },
  { label: 'Next 60', sub: 'Decision gates', items: ['2 Catalyst platforms', 'Support staffing', 'HQ allocation'] },
  { label: 'Next 90', sub: 'Observable outcomes', items: ['India Catalyst live', 'Acceptance and support plan', 'Navy pursuit approved'] },
];

export const ATTENTION_BASE = { scale: 40, embed: 30, expand: 20, seed: 10 };
export const CAPACITY = ['Programme management', 'Autonomy engineering', 'Field applications', 'Industrialisation', 'Critical specialists'];
export const ACCOUNT_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Active programme', ids: ['a-army'] },
  { label: 'Active proof', ids: [] },
  { label: 'Qualified next bet', ids: ['a-nrt', 'a-navy', 'a-grse'] },
  { label: 'Strategic seed', ids: ['a-hal', 'a-bel', 'a-drdo'] },
];
