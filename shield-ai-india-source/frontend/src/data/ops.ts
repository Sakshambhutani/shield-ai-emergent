export type CapabilityIntensity = 'core' | 'support' | 'as-needed';
export interface MissionTeam { id: string; bet: string; service: string; mandate: string; capabilityIds: string[]; capabilityLevels: Record<string, CapabilityIntensity>; color: string }
export const MISSION_TEAMS: MissionTeam[] = [
  { id: 'scale', bet: 'SCALE', service: 'Army', mandate: 'V-BAT + Hivemind reference and expansion', capabilityIds: ['growth', 'programmes', 'autonomy', 'industrialisation', 'finance', 'people', 'legal'], capabilityLevels: { growth: 'core', programmes: 'core', autonomy: 'core', industrialisation: 'core', finance: 'support', people: 'as-needed', legal: 'support' }, color: '#34D399' },
  { id: 'embed', bet: 'EMBED', service: 'Hivemind', mandate: 'Indian platform / OEM integrations', capabilityIds: ['growth', 'programmes', 'autonomy', 'industrialisation', 'finance', 'people', 'legal'], capabilityLevels: { growth: 'core', programmes: 'support', autonomy: 'core', industrialisation: 'as-needed', finance: 'support', people: 'as-needed', legal: 'support' }, color: '#3B82F6' },
  { id: 'expand', bet: 'EXPAND', service: 'Navy', mandate: 'V-BAT + ViDAR + maritime autonomy', capabilityIds: ['growth', 'programmes', 'autonomy', 'industrialisation', 'finance', 'people', 'legal'], capabilityLevels: { growth: 'core', programmes: 'core', autonomy: 'core', industrialisation: 'support', finance: 'support', people: 'as-needed', legal: 'support' }, color: '#A78BFA' },
];

export interface OperatingCapability { id: string; short: string; name: string; owns: string[]; notOwns: string[]; interfaces: string[]; kpis: string[]; global: string[]; claimIds: string[] }
export const OPERATING_CAPABILITIES: OperatingCapability[] = [
  { id: 'growth', short: 'GROWTH', name: 'Growth, BD & Capture', owns: ['Customer relationships and requirement shaping', 'Capture, partnerships and market development'], notOwns: ['Programme delivery', 'Final product commitments'], interfaces: ['Customer / mission owners', 'Global Product', 'Programmes'], kpis: ['Qualified programme positions', 'Stage conversion', 'Sponsor coverage', 'Forecast quality'], global: ['Aircraft / V-BAT / X-BAT', 'Hivemind Core'], claimIds: ['m-opmodel'] },
  { id: 'programmes', short: 'PROGRAMMES', name: 'Programmes, Delivery & Mission Success', owns: ['Mobilisation, trials and acceptance', 'Deployment, customer success and follow-on'], notOwns: ['Product roadmap', 'Independent customer promises'], interfaces: ['Customer / mission owners', 'Autonomy Engineering', 'JSW / Indian primes'], kpis: ['Critical gates', 'Acceptance', 'Blocker ageing', 'Follow-on stage'], global: ['Aircraft / V-BAT / X-BAT', 'Hivemind Core', 'Vision Systems'], claimIds: ['c-army-select', 'm-opmodel'] },
  { id: 'autonomy', short: 'AUTONOMY', name: 'Autonomy & Solutions Engineering', owns: ['Platform integration', 'Mission engineering', 'Simulation / SIL/HIL', 'Field engineering'], notOwns: ['Hivemind core architecture', 'Global product prioritisation'], interfaces: ['Global Hivemind Product', 'Programmes', 'Customer / OEM engineering'], kpis: ['Time-to-autonomy', 'Integration success', 'Reuse', 'Global reuse'], global: ['Hivemind Core', 'Vision Systems', 'Aechelon / Simulation'], claimIds: ['c-india-sub', 'c-army-sdk', 'c-hivemind-agnostic', 'm-opmodel'] },
  { id: 'industrialisation', short: 'INDUSTRIAL', name: 'Supply Chain, Procurement & Industrialisation', owns: ['JSW interface; Shield supplier identification, evaluation and onboarding support', 'Localisation, fulfilment, spares and sustainment'], notOwns: ['Global aircraft design authority', 'Unapproved local repair scope'], interfaces: ['JSW', 'Global Aircraft Product', 'Supply Chain / Procurement'], kpis: ['Readiness gates', 'Supplier risk', 'Fulfilment', 'Sustainment readiness'], global: ['Aircraft / V-BAT / X-BAT', 'Global legal / export / security expertise'], claimIds: ['c-jsw', 'm-opmodel'] },
  { id: 'finance', short: 'FINANCE', name: 'Finance & Commercial', owns: ['Programme economics and forecast', 'Pricing support, cost / cash visibility and planning'], notOwns: ['Customer requirement shaping', 'Product roadmap'], interfaces: ['Mission / Programmes', 'Global Finance', 'Legal / Compliance'], kpis: ['Forecast accuracy', 'Programme variance', 'Cash / commercial milestone health'], global: ['Global legal / export / security expertise'], claimIds: ['m-opmodel'] },
  { id: 'people', short: 'PEOPLE', name: 'People / HR', owns: ['Workforce and capacity planning', 'Critical hiring, talent and organisation health'], notOwns: ['Mission priorities', 'Functional execution'], interfaces: ['Mission owners', 'Global People', 'MD Office'], kpis: ['Critical-role coverage', 'Capacity vs commitment', 'Priority hiring'], global: ['Global legal / export / security expertise'], claimIds: ['c-india-sub', 'm-opmodel'] },
  { id: 'legal', short: 'LEGAL NETWORK', name: 'Legal / Contracts / Compliance Network', owns: ['Route specialist advice and global standards', 'Clear material contract, export and compliance gates'], notOwns: ['A large internal India legal department', 'Programme execution'], interfaces: ['Global Legal / Export / Security', 'Finance', 'Mission / Programmes'], kpis: ['Material contract / export / compliance gates blocking programmes'], global: ['Global legal / export / security expertise'], claimIds: ['m-opmodel'] },
];

export const GLOBAL_CENTRES = [
  { id: 'aircraft', name: 'Aircraft / V-BAT / X-BAT', sub: 'Global aircraft & product organisation', claimIds: ['c-vbat', 'c-xbat'] },
  { id: 'hivemind', name: 'Hivemind Core', sub: 'Autonomy platform, architecture & roadmap', claimIds: ['c-hivemind-agnostic'] },
  { id: 'vision', name: 'Vision Systems', sub: 'Australia · vision, simulation & systems engineering', claimIds: ['c-vision-australia'] },
  { id: 'aechelon', name: 'Aechelon / Simulation', sub: 'Global simulation & synthetic reality', claimIds: ['c-aechelon'] },
  { id: 'standards', name: 'Global legal / export / security expertise', sub: 'Legal · export · security', claimIds: ['m-opmodel'] },
];

export type Right = 'D' | 'O' | 'C' | 'V' | '';
export interface RightsRow { row: string; india: Right; global: Right; jsw: Right; prime: Right; rationale: string }
export const RIGHTS: RightsRow[] = [
  { row: 'India customer ownership / commitment recommendation', india: 'O', global: 'C', jsw: 'C', prime: 'C', rationale: 'India owns the customer relationship and recommends the commitment after programme, engineering, finance and compliance inputs.' },
  { row: 'Global platform / product roadmap', india: 'C', global: 'D', jsw: '', prime: '', rationale: 'India supplies requirements; the relevant global product centre protects coherence.' },
  { row: 'Hivemind core product', india: 'C', global: 'D', jsw: '', prime: '', rationale: 'India contributes reusable work; Hivemind Core decides the product baseline.' },
  { row: 'India mission integration', india: 'O', global: 'C', jsw: '', prime: 'C', rationale: 'India mission engineering owns integration; final decision right requires programme-specific validation.' },
  { row: 'V-BAT industrialisation', india: 'C', global: 'C', jsw: 'O', prime: '', rationale: 'JSW executes local industrialisation; design authority remains global.' },
  { row: 'Field support / sustainment', india: 'O', global: 'C', jsw: 'V', prime: 'V', rationale: 'India owns the customer interface; JSW service execution is proposed, with Shield/OEM backing. Detailed repair scope and acceptance gates require programme agreement.' },
  { row: 'India hiring', india: 'D', global: 'C', jsw: '', prime: '', rationale: 'India owns capability formation within global people standards.' },
  { row: 'Commercial commitment', india: 'V', global: 'V', jsw: 'C', prime: 'C', rationale: 'Joint approval boundary with authorised global leadership is to validate; India owns the customer recommendation.' },
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
  { id: 'event', freq: 'EVENT-DRIVEN', name: 'Critical Escalation', output: 'Resolve / Escalate', purpose: 'Resolve issues that cannot wait for the next review.', participants: 'Only required mission, programme, functional and authority owners.', inputs: 'Trigger · impact · options · owner · authority required.', closure: 'Decision · owner · due date · escalation path.' },
  { id: 'weekly', freq: 'WEEKLY', name: 'Mission Review', output: 'Decide / Unblock', purpose: 'Keep SCALE / EMBED / EXPAND moving.', participants: 'Mission owners + relevant functional leads; MD Office / CoS; MD when authority is required.', inputs: 'Next milestone · blocker · dependency · customer issue · capacity conflict.', closure: 'Resolved, escalated, owner assigned or decision date set.' },
  { id: 'milestone', freq: 'MILESTONE-DRIVEN', name: 'Programme / Integration Review', output: 'Pass / Hold / Rework', purpose: 'Judge whether a meaningful technical, customer or delivery gate can advance.', participants: 'Programme · engineering · industrialisation · customer / partner · global product as needed.', inputs: 'Gate evidence · defects · acceptance · readiness · dependency.', closure: 'Gate outcome · owner · next gate / date.' },
  { id: 'product', freq: 'BIWEEKLY', name: 'India × Global Product & Engineering', output: 'Product / Priority Decision', purpose: 'Resolve India ↔ global product and priority trade-offs.', participants: 'India autonomy / solutions · global product · programme as needed · MD Office for conflicts.', inputs: 'Customer dependency · reuse · roadmap · capacity · architecture conflict.', closure: 'Productise, keep specific, re-prioritise, escalate, assign or defer.' },
  { id: 'monthly', freq: 'MONTHLY', name: 'MD Business Review', output: 'Leadership Decision', purpose: 'Give the MD an integrated view and surface judgement calls.', participants: 'MD · mission owners · relevant functional heads · MD Office / CoS.', inputs: 'SCALE / EMBED / EXPAND · exceptions · outcomes · dependencies · capacity · risks.', closure: 'Priority, resource, customer, programme or global alignment action with owner / date.' },
  { id: 'quarterly', freq: 'QUARTERLY', name: 'Portfolio & Resource Review', output: 'Scale / Maintain / Stop / Reallocate', purpose: 'Allocate scarce leadership and engineering capacity across bets and seeds.', participants: 'MD · mission owners · relevant functional / global leaders · MD Office.', inputs: 'Bet maturity · customer pull · fit · capacity · opportunity cost.', closure: 'Portfolio posture + capacity allocation + next review owner / date.' },
];

export type EvidenceStatus = 'verified' | 'internal' | 'proposed' | 'modelled';
export const SCORECARD_OUTCOMES = [
  { id: 'army', label: 'ARMY REFERENCE', short: 'Operational reference → follow-on path', definition: 'Trusted operational reference with a credible follow-on / scale pathway.', question: 'Has the current Army programme become a trusted operational reference with a credible path to scale?', accountability: { primary: 'Programmes / Mission Success', contributors: ['Growth', 'Autonomy', 'Industrialisation'] }, healthSignals: ['Industrialisation readiness', 'Customer acceptance blockers', 'Capacity / dependency health'], drivers: [
    { id: 'army-gates', name: 'Critical programme gates', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Programmes + Industrialisation', stage: 'accept', capability: 'programmes', definition: 'Customer-agreed delivery and acceptance gates reached on time.', claimIds: ['c-army-select'] },
    { id: 'army-proof', name: 'Operational / reference milestone', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Programmes / Mission Success', stage: 'field', capability: 'programmes', definition: 'Army confirms credible operational use or a referenceable proof point.', claimIds: ['c-army-select', 'm-kpis'] },
    { id: 'army-follow', name: 'Follow-on programme stage', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Growth + Programmes', stage: 'expand', capability: 'growth', definition: 'Next Army decision advances beyond unqualified interest.', claimIds: ['m-kpis'] },
  ]},
  { id: 'autonomy', label: 'AUTONOMY FOOTPRINT', short: 'Meaningful Indian platform embeds', definition: 'Hivemind embedded on meaningful Indian defence platforms with real customer and programme relevance.', question: 'Is Hivemind becoming embedded across strategically relevant Indian-built defence platforms?', target: '3–4 meaningful integrations', accountability: { primary: 'Autonomy & Solutions Engineering', contributors: ['Growth / Capture', 'Programmes', 'Global Hivemind'] }, healthSignals: ['Engineering capacity', 'Global product dependency', 'Partner / platform access'], drivers: [
    { id: 'integration-maturity', name: 'Integrations by maturity', value: 'Proposed Month-18 ambition: 3–4', status: 'proposed' as EvidenceStatus, owner: 'Autonomy & Solutions Engineering', stage: 'integrate', capability: 'autonomy', definition: 'Selected → Integration → SIL/HIL → Autonomous Operation → Customer Demo → Programme-Linked.', claimIds: ['m-integrations', 'c-catalyst'] },
    { id: 'time-autonomy', name: 'Time-to-autonomy', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Autonomy & Solutions Engineering', stage: 'integrate', capability: 'autonomy', definition: 'Elapsed time from locked scope to autonomous operation on the platform.', claimIds: ['c-catalyst', 'c-mhi'] },
    { id: 'integration-reuse', name: 'Reuse across integrations', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Autonomy & Solutions Engineering', stage: 'productise', capability: 'autonomy', definition: 'Adapters, behaviours or tests used by more than one India integration.', claimIds: ['m-kpis'] },
  ]},
  { id: 'navy', label: 'SECOND SERVICE', short: 'Navy → credible evaluation / programme position', definition: 'Navy progresses into a credible evaluation, trial or programme pathway.', question: 'Has Shield created a credible second-service pathway beyond the Army?', accountability: { primary: 'Navy mission / capture owner', contributors: ['Programmes', 'Autonomy', 'Growth'] }, healthSignals: ['Platform / partner access', 'Trial readiness', 'Engineering capacity'], drivers: [
    { id: 'navy-stage', name: 'Navy engagement stage', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Growth + Mission Owner', stage: 'qualify', capability: 'growth', definition: 'Discovery → Sponsor → Technical Path → Demo → Evaluation → Programme.', claimIds: ['c-nsuas', 'm-navy-pen'] },
    { id: 'navy-decision', name: 'Next customer decision', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Programmes + Growth', stage: 'commit', capability: 'programmes', definition: 'The named customer decision required to advance the Navy position.', claimIds: ['m-navy-pen'] },
    { id: 'navy-path', name: 'Trial / evaluation path', value: 'Baseline required', status: 'internal' as EvidenceStatus, owner: 'Mission Owner + Autonomy', stage: 'accept', capability: 'autonomy', definition: 'A technically credible path with platform, mission and acceptance logic.', claimIds: ['c-nsuas', 'c-rnln'] },
  ]},
  { id: 'reuse', label: 'GLOBAL REUSE', short: 'India-created capability reused elsewhere', definition: 'India-created capability is reused by another Shield programme, geography or global product baseline.', question: 'Is work created through Indian programmes improving another Shield deployment, geography or global product baseline?', accountability: { primary: 'Autonomy / Solutions Engineering + relevant Global Product owner', contributors: ['Programme / mission teams'] }, healthSignals: ['India × global product alignment', 'Engineering capacity', 'Reuse discipline'], drivers: [
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
    { id: 'd1', decision: 'Choose 2 platforms for India Catalyst', why: 'Integration clock starts only when platforms are fixed.', deadline: 'Month 3', rec: 'Select two platforms with a committed sponsor, hardware access and a credible 90-day SIL/HIL demonstration path.', bet: 'embed' },
    { id: 'd2', decision: 'Approve programme governance charter', why: 'India / HQ / JSW ownership must be explicit before deliveries.', deadline: 'Month 1', rec: 'Approve; India accountable, HQ design authority, JSW production', bet: 'scale' },
    { id: 'd3', decision: 'Approve Navy partner engagement', why: 'Partner choice determines trial pathway timing.', deadline: 'Month 6', rec: 'Hypothesis: engage a shipbuilder + BEL in parallel, subject to a named sponsor, hardware access and a credible trial path.', bet: 'expand' },
    { id: 'd4', decision: 'Escalate HQ engineering allocation', why: 'Parallel integrations exceed India capacity without HQ support.', deadline: 'Month 4', rec: 'Request dedicated Catalyst engineers for India', bet: 'embed' },
  ],
  risks: [
    { id: 'k1', risk: 'Army acceptance', trigger: 'Acceptance owner or criteria unresolved by the agreed gate', bet: 'scale', owner: 'India programme lead', decision: 'Escalate with Army/HQ and lock ownership' },
    { id: 'k2', risk: 'Delivery', trigger: 'A committed delivery or readiness gate slips beyond tolerance', bet: 'scale', owner: 'India programme lead', decision: 'Reallocate resources or reset customer commitment' },
    { id: 'k3', risk: 'Engineering capacity', trigger: 'Committed integrations exceed qualified capacity', bet: 'embed', owner: 'India engineering lead', decision: 'Stop, sequence or resource integrations' },
    { id: 'k4', risk: 'OEM conversion', trigger: 'Integration proceeds without a named service sponsor or programme pathway', bet: 'embed', owner: 'India MD · Growth', decision: 'Continue, pause or exit the account' },
    { id: 'k5', risk: 'Global dependency', trigger: 'HQ decision remains unresolved across two review cycles', bet: 'embed', owner: 'MD Office · HQ Product', decision: 'Escalate or alter scope' },
    { id: 'k6', risk: 'JSW industrialisation', trigger: 'A critical transfer, facility or supply-chain gate misses plan', bet: 'scale', owner: 'JSW · India industrialisation', decision: 'Joint recovery plan and accountable owner' },
  ],
  horizons: [
    { label: 'Next 30', sub: 'Critical milestones', items: ['Governance charter signed', 'OEM force-ranking complete', 'Navy stakeholder map'] },
    { label: 'Next 60', sub: 'Decision gates', items: ['2 Catalyst platforms chosen', 'Support staffing released', 'HQ allocation confirmed'] },
    { label: 'Next 90', sub: 'Outcomes expected', items: ['India Catalyst offer live', 'Acceptance and support plan agreed', 'Navy pursuit approved'] },
  ],
};
