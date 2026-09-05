export interface Milestone {
  id: string;
  lane: 'scale' | 'embed' | 'expand' | 'seed';
  block: 0 | 1 | 2 | 3;
  title: string;
  gate?: boolean;
  outcome: string;
  owner: string;
  dependency: string;
  decision: string;
  evidence: string;
  risk: string;
}

export const BLOCKS = [
  { label: '0–3 months', name: 'Establish' },
  { label: '4–6 months', name: 'Prove' },
  { label: '7–12 months', name: 'Expand' },
  { label: '13–18 months', name: 'Scale' },
];

export const LANES = {
  scale: { label: 'BET 1 — SCALE ARMY', color: '#34D399' },
  embed: { label: 'BET 2 — EMBED HIVEMIND', color: '#3B82F6' },
  expand: { label: 'BET 3 — EXPAND NAVY', color: '#60A5FA' },
  seed: { label: 'SEED LANE', color: '#6B7280' },
};

export const MILESTONES: Milestone[] = [
  { id: 'r1', lane: 'scale', block: 0, title: 'Programme governance locked', outcome: 'India / HQ / JSW responsibilities and escalation paths agreed in writing.', owner: 'India MD · Chief of Staff', dependency: 'HQ programme office; JSW leadership', decision: 'Approve governance charter', evidence: 'Signed charter; RACI published', risk: 'Ambiguous ownership slows delivery' },
  { id: 'r2', lane: 'scale', block: 0, title: 'Customer success plan', outcome: 'Acceptance dependencies and training/support model mapped with Army users.', owner: 'India programme lead', dependency: 'Army trial & acceptance schedule (not public)', decision: 'Approve support staffing', evidence: 'Plan reviewed with customer', risk: 'Acceptance criteria unclear' },
  { id: 'r3', lane: 'scale', block: 1, title: 'Delivery / operational proof', gate: true, outcome: 'First deliveries accepted; operational use begins.', owner: 'India programme lead · HQ product', dependency: 'Export licences; customer readiness', decision: 'Release deliveries', evidence: 'Customer acceptance record', risk: 'Slip in delivery or acceptance' },
  { id: 'r4', lane: 'scale', block: 1, title: 'Local production readiness', gate: true, outcome: 'JSW Hyderabad facility gates tracked toward reported late-2026 start.', owner: 'JSW · India industrialisation lead', dependency: 'Facility, supply chain, tech transfer', decision: 'Confirm readiness gates', evidence: 'Gate reviews passed', risk: 'Industrialisation delay' },
  { id: 'r5', lane: 'scale', block: 2, title: 'Operational reference', outcome: 'Army use documented as referenceable proof for Navy and OEMs.', owner: 'India MD', dependency: 'Customer permission', decision: 'Approve reference use', evidence: 'Reference agreed', risk: 'Customer sensitivity' },
  { id: 'r6', lane: 'scale', block: 2, title: 'Follow-on shaping · deeper Hivemind use', outcome: 'SDK-based mission apps in use; follow-on requirement conversations opened.', owner: 'India engineering · India sales', dependency: 'SDK enablement; Army units', decision: 'Fund SDK enablement team', evidence: 'Apps deployed; requirement dialogue', risk: 'SDK adoption slower than planned' },
  { id: 'r7', lane: 'scale', block: 3, title: 'Follow-on positioned · MRO model', gate: true, outcome: 'Recurring support model live; expansion beyond initial formations positioned.', owner: 'India MD · JSW', dependency: 'Procurement cycle (not invented)', decision: 'Commit sustainment investment', evidence: 'Support contract path defined', risk: 'Procurement timing outside control' },

  { id: 'e1', lane: 'embed', block: 0, title: 'Force-rank 5–6 OEM accounts', outcome: 'HAL, NewSpace, BEL, GRSE, TASL, DRDO/ADE scored; 2 initial platforms chosen.', owner: 'India BD · Chief of Staff', dependency: 'HQ Catalyst team', decision: 'Choose 2 platforms', evidence: 'Ranked list; 2 LOIs / agreements', risk: 'Picking slow DPSU first' },
  { id: 'e2', lane: 'embed', block: 0, title: 'India Catalyst programme defined', outcome: 'Repeatable 3-month SIL→HIL→flight offer localised for India.', owner: 'India engineering lead', dependency: 'Export controls on SDK scope', decision: 'Approve India Catalyst offer', evidence: 'Programme pack ready', risk: 'Export scope limits' },
  { id: 'e3', lane: 'embed', block: 1, title: 'SIL/HIL integration · first demo', outcome: 'First platform through SIL/HIL; first customer developers trained.', owner: 'India engineering', dependency: 'OEM hardware access', decision: 'Approve demo scope', evidence: 'Demo delivered', risk: 'Partner engineering bandwidth' },
  { id: 'e4', lane: 'embed', block: 2, title: 'Autonomous first flight / sail', gate: true, outcome: 'Hivemind flies or sails on an Indian-built platform; second/third integration started.', owner: 'India engineering · OEM', dependency: 'Range/test permissions', decision: 'Bring service customer in', evidence: 'Flight/sail record', risk: 'Test-range access' },
  { id: 'e5', lane: 'embed', block: 3, title: '3–4 integrations · programme pathway', gate: true, outcome: 'At least one integration enters a formal procurement/programme pathway; playbook repeatable.', owner: 'India MD', dependency: 'Service sponsorship', decision: 'Scale or cut accounts', evidence: 'Programme position documented', risk: 'Integrations without buyers' },

  { id: 'x1', lane: 'expand', block: 0, title: 'Navy mission & stakeholder map', outcome: 'NSUAS / maritime ISR stakeholders, Indian maritime OEMs and ViDAR fit assessed.', owner: 'India BD (Navy)', dependency: 'Navy access', decision: 'Approve Navy pursuit', evidence: 'Map and fit note', risk: 'Wrong entry point' },
  { id: 'x2', lane: 'expand', block: 1, title: 'Maritime demo strategy · partner selected', outcome: 'Indian maritime-autonomy partner chosen; demo pathway agreed.', owner: 'India MD', dependency: 'GRSE / BEL / shipyard engagement', decision: 'Select partner', evidence: 'Partner agreement', risk: 'Incumbent navigation-autonomy provider' },
  { id: 'x3', lane: 'expand', block: 2, title: 'Shipborne trial pathway · first maritime demo', gate: true, outcome: 'V-BAT/ViDAR trial pathway agreed; first Hivemind maritime integration/demo.', owner: 'India programme · HQ maritime', dependency: 'Ship availability; trial approvals', decision: 'Fund trial', evidence: 'Trial plan; demo record', risk: 'Trial slot timing' },
  { id: 'x4', lane: 'expand', block: 3, title: 'Second-service reference position', gate: true, outcome: 'Navy programme pathway defined; Navy as second anchor service.', owner: 'India MD', dependency: 'DAC/procurement steps (not invented)', decision: 'Commit Navy resourcing', evidence: 'Documented pathway', risk: 'Procurement timing' },

  { id: 's1', lane: 'seed', block: 0, title: 'CCA / X-BAT requirement shaping', outcome: 'Light-touch dialogue only.', owner: 'India MD (part-time)', dependency: '—', decision: 'None', evidence: 'Notes', risk: 'Distraction' },
  { id: 's2', lane: 'seed', block: 1, title: 'Military-space & weapons discovery', outcome: 'Identify mission, buyer, pathway — or park.', owner: 'Chief of Staff', dependency: '—', decision: 'Park or continue', evidence: 'Discovery memo', risk: 'Distraction' },
  { id: 's3', lane: 'seed', block: 2, title: 'MALE architecture influence', outcome: 'Autonomy-layer conversation with winning OEM if any.', owner: 'India BD', dependency: 'Tender outcome', decision: 'None', evidence: 'Notes', risk: 'Low' },
  { id: 's4', lane: 'seed', block: 3, title: 'Aechelon customer discovery', outcome: 'Qualify IAF/DRDO simulation demand.', owner: 'India BD', dependency: 'HQ Aechelon team', decision: 'Promote to bet or park', evidence: 'Qualified or parked', risk: 'Low' },
];
