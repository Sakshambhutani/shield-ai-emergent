export interface MissionTeam { id: string; bet: string; service: string; mandate: string; capabilityIds: string[]; color: string }
export const MISSION_TEAMS: MissionTeam[] = [
  { id: 'scale', bet: 'SCALE', service: 'Army', mandate: 'V-BAT + Hivemind reference and expansion', capabilityIds: ['growth', 'programmes', 'autonomy', 'industrialisation', 'finance', 'people', 'legal'], color: '#34D399' },
  { id: 'embed', bet: 'EMBED', service: 'Hivemind', mandate: 'Indian platform / OEM integrations', capabilityIds: ['growth', 'programmes', 'autonomy', 'finance', 'people', 'legal'], color: '#3B82F6' },
  { id: 'expand', bet: 'EXPAND', service: 'Navy', mandate: 'V-BAT + ViDAR + maritime autonomy', capabilityIds: ['growth', 'programmes', 'autonomy', 'industrialisation', 'finance', 'legal'], color: '#A78BFA' },
];

export interface OperatingCapability { id: string; short: string; name: string; owns: string[]; notOwns: string[]; kpis: string[]; global: string[]; claimIds: string[] }
export const OPERATING_CAPABILITIES: OperatingCapability[] = [
  { id: 'growth', short: 'GROWTH', name: 'Growth, BD & Capture', owns: ['Customer relationships and requirement shaping', 'Capture, partnerships and market development'], notOwns: ['Programme delivery', 'Final product commitments'], kpis: ['Qualified programme positions', 'Stage conversion', 'Sponsor coverage', 'Forecast quality'], global: ['Aircraft / V-BAT / X-BAT', 'Hivemind Core'], claimIds: ['m-opmodel'] },
  { id: 'programmes', short: 'PROGRAMMES', name: 'Programmes, Delivery & Mission Success', owns: ['Mobilisation, trials and acceptance', 'Deployment, customer success and follow-on'], notOwns: ['Product roadmap', 'Independent customer promises'], kpis: ['Critical gates', 'Acceptance', 'Blocker ageing', 'Follow-on stage'], global: ['Aircraft / V-BAT / X-BAT', 'Hivemind Core', 'Vision Systems'], claimIds: ['c-army-select', 'm-opmodel'] },
  { id: 'autonomy', short: 'AUTONOMY', name: 'Autonomy & Solutions Engineering', owns: ['India mission engineering', 'Reusable global product contribution'], notOwns: ['Hivemind core architecture', 'Global product prioritisation'], kpis: ['Time-to-autonomy', 'Integration success', 'Reuse', 'Global reuse'], global: ['Hivemind Core', 'Vision Systems', 'Aechelon / Simulation'], claimIds: ['c-india-sub', 'c-army-sdk', 'c-hivemind-agnostic', 'm-opmodel'] },
  { id: 'industrialisation', short: 'INDUSTRIAL', name: 'Supply Chain, Procurement & Industrialisation', owns: ['JSW execution interface and supplier readiness', 'Localisation, fulfilment, spares and sustainment'], notOwns: ['Global aircraft design authority', 'Unvalidated JSW sustainment scope'], kpis: ['Readiness gates', 'Supplier risk', 'Fulfilment', 'Sustainment readiness'], global: ['Aircraft / V-BAT / X-BAT', 'Global corporate standards'], claimIds: ['c-jsw', 'm-opmodel'] },
  { id: 'finance', short: 'FINANCE', name: 'Finance & Commercial', owns: ['Programme economics and forecast', 'Pricing support, cost / cash visibility and planning'], notOwns: ['Customer requirement shaping', 'Product roadmap'], kpis: ['Forecast accuracy', 'Programme variance', 'Cash / commercial milestone health'], global: ['Global corporate standards'], claimIds: ['m-opmodel'] },
  { id: 'people', short: 'PEOPLE', name: 'People / HR', owns: ['Workforce and capacity planning', 'Critical hiring, talent and organisation health'], notOwns: ['Mission priorities', 'Functional execution'], kpis: ['Critical-role coverage', 'Capacity vs commitment', 'Priority hiring'], global: ['Global corporate standards'], claimIds: ['c-india-sub', 'm-opmodel'] },
  { id: 'legal', short: 'LEGAL NETWORK', name: 'Legal / Contracts / Compliance Network', owns: ['Route specialist advice and global standards', 'Clear material contract, export and compliance gates'], notOwns: ['A large internal India legal department', 'Programme execution'], kpis: ['Material contract / export / compliance gates blocking programmes'], global: ['Global corporate standards'], claimIds: ['m-opmodel'] },
];

export const GLOBAL_CENTRES = [
  { id: 'aircraft', name: 'Aircraft / V-BAT / X-BAT', sub: 'Global aircraft & product organisation', claimIds: ['c-vbat', 'c-xbat'] },
  { id: 'hivemind', name: 'Hivemind Core', sub: 'Autonomy platform, architecture & roadmap', claimIds: ['c-hivemind-agnostic'] },
  { id: 'vision', name: 'Vision Systems', sub: 'Australia · vision, simulation & systems engineering', claimIds: ['c-vision-australia'] },
  { id: 'aechelon', name: 'Aechelon / Simulation', sub: 'Global simulation & synthetic reality', claimIds: ['c-aechelon'] },
  { id: 'standards', name: 'Global corporate standards', sub: 'Legal · export · security', claimIds: ['m-opmodel'] },
];

export type Right = 'D' | 'O' | 'C' | 'V' | '';
export interface RightsRow { row: string; india: Right; global: Right; jsw: Right; prime: Right; rationale: string }
export const RIGHTS: RightsRow[] = [
  { row: 'India customer commitment', india: 'D', global: 'C', jsw: 'C', prime: 'C', rationale: 'India decides only after programme, engineering, finance and relevant compliance inputs.' },
  { row: 'Global platform / product roadmap', india: 'C', global: 'D', jsw: '', prime: '', rationale: 'India supplies requirements; the relevant global product centre protects coherence.' },
  { row: 'Hivemind core product', india: 'C', global: 'D', jsw: '', prime: '', rationale: 'India contributes reusable work; Hivemind Core decides the product baseline.' },
  { row: 'India mission integration', india: 'O', global: 'C', jsw: '', prime: 'C', rationale: 'India mission engineering owns integration; final decision right requires programme-specific validation.' },
  { row: 'V-BAT industrialisation', india: 'C', global: 'C', jsw: 'O', prime: '', rationale: 'JSW executes local industrialisation; design authority remains global.' },
  { row: 'Field support / sustainment', india: 'O', global: 'C', jsw: 'V', prime: 'V', rationale: 'India owns the customer interface; partner scope must be validated per programme.' },
  { row: 'India hiring', india: 'D', global: 'C', jsw: '', prime: '', rationale: 'India owns capability formation within global people standards.' },
  { row: 'Commercial commitment', india: 'O', global: 'V', jsw: 'C', prime: 'C', rationale: 'Approval thresholds and final commercial decision rights require internal confirmation.' },
  { row: 'Customer escalation', india: 'D', global: 'C', jsw: 'C', prime: 'C', rationale: 'India is the single customer-facing escalation owner.' },
  { row: 'Strategic partnerships', india: 'O', global: 'V', jsw: '', prime: 'C', rationale: 'India shapes partnerships; final approval rights depend on IP, export and commercial scope.' },
  { row: 'India / global engineering capacity', india: 'C', global: 'V', jsw: '', prime: '', rationale: 'Scarce capacity allocation needs explicit India–global governance.' },
];

export interface WorkStage { id: string; name: string; owner: string; support: string; decision: string; kpis: string[] }
export const WORK_STAGES: WorkStage[] = [
  { id: 'need', name: 'MISSION NEED', owner: 'Customer + mission owner', support: 'Growth · mission experts', decision: 'Is the mission need clear enough to shape?', kpis: ['Sponsor signal'] },
  { id: 'shape', name: 'SHAPE', owner: 'Growth / BD', support: 'Mission + technical experts', decision: 'Is this a strategic problem worth shaping?', kpis: ['Sponsor coverage', 'Problem clarity'] },
  { id: 'qualify', name: 'QUALIFY', owner: 'Growth / Capture', support: 'Programme · Engineering · Finance', decision: 'Pursue / Shape / Stop', kpis: ['Stage conversion', 'Qualified position'] },
  { id: 'capture', name: 'CAPTURE', owner: 'Growth / Capture', support: 'Mission owner · partner leads', decision: 'Is there a winnable route and accountable team?', kpis: ['Capture gate', 'Partner readiness'] },
  { id: 'commit', name: 'COMMIT', owner: 'Mission owner', support: 'Engineering · Programme · Finance · Legal', decision: 'Can Shield responsibly make this commitment?', kpis: ['Decision latency', 'Capacity coverage'] },
  { id: 'mobilise', name: 'MOBILISE', owner: 'Programmes / Mission Success', support: 'All required capability owners', decision: 'Scope, acceptance, team and dependencies locked', kpis: ['Mobilisation gate', 'Blocker age'] },
  { id: 'integrate', name: 'INTEGRATE / INDUSTRIALISE', owner: 'Autonomy or Industrialisation', support: 'Global product · JSW / prime', decision: 'Is the solution ready to test?', kpis: ['Integration success', 'Readiness gates'] },
  { id: 'accept', name: 'TEST / ACCEPT', owner: 'Programmes / Mission Success', support: 'Engineering · Industrialisation · Customer', decision: 'Pass / correct / hold', kpis: ['Acceptance', 'Critical defects'] },
  { id: 'field', name: 'FIELD', owner: 'Programmes / Mission Success', support: 'Engineering · field operations', decision: 'Release and deploy', kpis: ['Operational milestone', 'Mission blockers'] },
  { id: 'sustain', name: 'SUSTAIN', owner: 'Programmes / Mission Success', support: 'Operations · Industrialisation', decision: 'Support posture and improvement priority', kpis: ['Availability', 'Blocker ageing'] },
  { id: 'expand', name: 'EXPAND', owner: 'Growth / BD', support: 'Mission owner · Programmes', decision: 'Where does operational proof unlock scale?', kpis: ['Follow-on stage', 'Reference strength'] },
  { id: 'productise', name: 'PRODUCTISE LEARNING', owner: 'India Engineering + Global Product', support: 'Programmes · field teams', decision: 'What becomes reusable Shield capability?', kpis: ['Reuse', 'Subsequent integration time'] },
];

export const DECISION_RHYTHMS = [
  { id: 'event', freq: 'EVENT-DRIVEN', name: 'Critical escalation', output: 'Escalation', detail: 'Safety, deployed mission, customer-critical, compliance or production blocker.' },
  { id: 'weekly', freq: 'WEEKLY', name: 'Mission Review', output: 'Decision', detail: 'SCALE / EMBED / EXPAND exceptions, gates and dependencies.' },
  { id: 'milestone', freq: 'MILESTONE-DRIVEN', name: 'Programme / Integration Review', output: 'Gate outcome', detail: 'Only the team required for the live programme, integration or trial.' },
  { id: 'product', freq: 'BIWEEKLY / 4–6 WEEKLY', name: 'India × Global Product & Engineering', output: 'Resource shift', detail: 'Customer-specific vs product, global dependencies, reuse and scarce capacity.' },
  { id: 'monthly', freq: 'MONTHLY', name: 'MD Business Review', output: 'Decision', detail: 'Three bets, roadmap exceptions, capacity, active risks and decisions.' },
  { id: 'quarterly', freq: 'QUARTERLY', name: 'Portfolio & Resource Review', output: 'Resource shift', detail: 'Accelerate / Maintain / Seed / Stop.' },
];

export type EvidenceStatus = 'verified' | 'internal' | 'proposed' | 'modelled';
export const SCORECARD_OUTCOMES = [
  { id: 'army', label: 'ARMY REFERENCE', question: 'Trusted operational reference with a credible scale path?', drivers: [
    { id: 'army-gates', name: 'Critical programme gates', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Programmes + Industrialisation', stage: 'accept', capability: 'programmes', definition: 'Customer-agreed delivery and acceptance gates reached on time.', claimIds: ['c-army-select'] },
    { id: 'army-proof', name: 'Operational / reference milestone', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Programmes / Mission Success', stage: 'field', capability: 'programmes', definition: 'Army confirms credible operational use or a referenceable proof point.', claimIds: ['c-army-select', 'm-kpis'] },
    { id: 'army-follow', name: 'Follow-on programme stage', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Growth + Programmes', stage: 'expand', capability: 'growth', definition: 'Next Army decision advances beyond unqualified interest.', claimIds: ['m-kpis'] },
  ]},
  { id: 'autonomy', label: 'AUTONOMY FOOTPRINT', question: 'Is Hivemind embedded across meaningful Indian-built platforms?', target: '3–4 meaningful integrations', drivers: [
    { id: 'integration-maturity', name: 'Integrations by maturity', value: 'Proposed Month-18 ambition: 3–4', status: 'proposed' as EvidenceStatus, owner: 'Autonomy & Solutions Engineering', stage: 'integrate', capability: 'autonomy', definition: 'Selected → Integration → SIL/HIL → Autonomous Operation → Customer Demo → Programme-Linked.', claimIds: ['m-integrations', 'c-catalyst'] },
    { id: 'time-autonomy', name: 'Time-to-autonomy', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Autonomy & Solutions Engineering', stage: 'integrate', capability: 'autonomy', definition: 'Elapsed time from locked scope to autonomous operation on the platform.', claimIds: ['c-catalyst', 'c-mhi'] },
    { id: 'integration-reuse', name: 'Reuse across integrations', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Autonomy & Solutions Engineering', stage: 'productise', capability: 'autonomy', definition: 'Adapters, behaviours or tests used by more than one India integration.', claimIds: ['m-kpis'] },
  ]},
  { id: 'navy', label: 'SECOND SERVICE', question: 'Has Navy reached a credible evaluation, trial or programme position?', drivers: [
    { id: 'navy-stage', name: 'Navy engagement stage', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Growth + Mission Owner', stage: 'qualify', capability: 'growth', definition: 'Discovery → Sponsor → Technical Path → Demo → Evaluation → Programme.', claimIds: ['c-nsuas', 'm-navy-pen'] },
    { id: 'navy-decision', name: 'Next customer decision', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Programmes + Growth', stage: 'commit', capability: 'programmes', definition: 'The named customer decision required to advance the Navy position.', claimIds: ['m-navy-pen'] },
    { id: 'navy-path', name: 'Trial / evaluation path', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Mission Owner + Autonomy', stage: 'accept', capability: 'autonomy', definition: 'A technically credible path with platform, mission and acceptance logic.', claimIds: ['c-nsuas', 'c-rnln'] },
  ]},
  { id: 'reuse', label: 'GLOBAL REUSE', question: 'Is India-created capability improving another Shield deployment?', drivers: [
    { id: 'global-component', name: 'India-created capability reused', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Autonomy + Global Product', stage: 'productise', capability: 'autonomy', definition: 'An India-originated adapter, tool, behaviour or test ships elsewhere.', claimIds: ['m-kpis', 'c-vision-australia'] },
    { id: 'global-baseline', name: 'Incorporated into global baseline', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Global Product / Capability Centre', stage: 'productise', capability: 'autonomy', definition: 'The relevant global product owner accepts the contribution into baseline.', claimIds: ['m-kpis'] },
    { id: 'global-speed', name: 'Subsequent integration improves', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Autonomy & Solutions Engineering', stage: 'productise', capability: 'autonomy', definition: 'Reuse measurably reduces effort or elapsed time on a later integration.', claimIds: ['m-kpis'] },
  ]},
];

export const EXECUTION_HEALTH = [
  { id: 'industrial', name: 'Industrialisation Health', sub: 'Production · fulfilment · sustainment gate', status: 'Baseline required', owners: 'Industrialisation', capability: 'industrialisation' },
  { id: 'capacity', name: 'Capacity Health', sub: 'Qualified capacity vs committed work', status: 'Baseline required', owners: 'People + MD Office', capability: 'people' },
  { id: 'dependency', name: 'Global Dependency Health', sub: 'Roadmap dependencies and ageing', status: 'Baseline required', owners: 'MD Office + functional leaders', capability: 'autonomy' },
  { id: 'commercial', name: 'Commercial / Compliance Health', sub: 'Only when a programme is affected', status: 'Baseline required', owners: 'Finance + Legal network', capability: 'finance' },
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
