export interface BudgetNode {
  id: string;
  parent: string | null;
  title: string;
  value?: string;
  tag?: string;
  cls: 'official' | 'industry' | 'modelled' | 'context';
  relevant: boolean;
  why?: string;
  products?: string[];
  buyer?: string;
  claimIds: string[];
  modelKey?: 'tactical' | 'male';
}

export const BUDGET_TREE: BudgetNode[] = [
  { id: 'total', parent: null, title: 'India Defence Budget FY2026-27', value: '₹7.85 L Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Total MoD allocation. Context only — not addressable.', claimIds: ['c-budget-total'] },
  { id: 'revenue', parent: 'total', title: 'Revenue, pay & pensions', tag: 'FY27 · operating spend', cls: 'official', relevant: false, why: 'Operating costs and pensions. Not relevant to autonomy acquisition.', claimIds: ['c-budget-revenue'] },
  { id: 'capital', parent: 'total', title: 'Capital outlay', value: '₹2.19 L Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Modernisation pool where acquisition spending sits.', claimIds: ['c-budget-capital'] },
  { id: 'other-cap', parent: 'capital', title: 'Land, works & other capital', tag: 'FY27 · annual budget', cls: 'official', relevant: false, why: 'Not a direct autonomy acquisition pool.', claimIds: ['c-budget-capital'] },
  { id: 'acq', parent: 'capital', title: 'Capital acquisition', value: '₹1,84,932 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Broad acquisition pool — not autonomy TAM. Programme values may sit within these annual heads and may overlap across reporting.', claimIds: ['c-budget-acq', 'c-budget-domestic', 'c-dap'] },
  { id: 'acq-other', parent: 'acq', title: 'Other Equipment', value: '₹82,217.82 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Broad equipment acquisition head — not autonomy TAM.', claimIds: ['c-cap-other-equipment'] },
  { id: 'p-tactical', parent: 'acq-other', title: 'Tactical UAS / ISR / strike drones', value: '~₹16,000 Cr', tag: 'Multi-year · reported pipeline', cls: 'industry', relevant: true, why: 'Reported Army drone demand signal. V-BAT is already selected under emergency procurement.', claimIds: ['c-army-drones', 'c-army-select', 'm-tactical-layer'], modelKey: 'tactical' },
  { id: 'p-male', parent: 'acq-other', title: '87 MALE UAVs', value: '₹30,050 Cr+', tag: 'Multi-year · reported tender', cls: 'industry', relevant: true, why: 'Reported tender estimate. Programme value is not autonomy content or Shield revenue.', claimIds: ['c-male-pipeline', 'c-male'], modelKey: 'male' },
  { id: 'p-loitering', parent: 'acq-other', title: 'Loitering munitions', value: '₹1,577 Cr', tag: 'Contracted · reported', cls: 'industry', relevant: true, why: 'Reported contracted programme; platform value is not autonomy content.', claimIds: ['c-tasl-lm'] },
  { id: 'p-cuas', parent: 'acq-other', title: 'Anti-UAV EW / counter-UAS', value: 'Value not publicly separable', tag: 'AoN / procurement activity', cls: 'official', relevant: true, why: 'Public demand signal; value is not separable from broader C-UAS systems.', claimIds: ['c-cuas-aon'] },
  { id: 'acq-aircraft', parent: 'acq', title: 'Aircraft & Aero Engines', value: '₹63,733.94 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Broad aircraft and engine acquisition head — not autonomy TAM.', claimIds: ['c-cap-aircraft'] },
  { id: 'p-haps', parent: 'acq-aircraft', title: 'Fixed-wing HAPS', value: 'Value not publicly separable', tag: 'AoN approved', cls: 'official', relevant: true, why: 'Persistent-ISR demand signal. No Shield allocation established.', claimIds: ['c-haps'] },
  { id: 'p-cca', parent: 'acq-aircraft', title: 'CCA / autonomous combat aviation', value: 'Value not publicly separable', tag: 'Long-term programme', cls: 'industry', relevant: true, why: 'Long-term airpower programme signal; not a current Shield opportunity claim.', claimIds: ['c-cca', 'c-cats'] },
  { id: 'acq-naval', parent: 'acq', title: 'Naval Fleet', value: '₹25,023.63 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Broad naval acquisition head — not maritime autonomy TAM.', claimIds: ['c-cap-naval'] },
  { id: 'p-nsuas', parent: 'acq-naval', title: 'Shipborne UAS', value: 'Value not publicly separable', tag: 'AoN approved', cls: 'official', relevant: true, why: 'Public Navy requirement signal; individual value is not disclosed.', claimIds: ['c-nsuas'] },
  { id: 'p-maritime', parent: 'acq-naval', title: 'Maritime ISR / unmanned systems', value: 'Value not publicly separable', tag: 'Programme signal', cls: 'industry', relevant: true, why: 'Maritime programme signals supported by Navy, BEL and shipbuilder activity.', claimIds: ['c-bel-a2ncs', 'c-grse', 'c-vidar'] },
  { id: 'acq-vehicles', parent: 'acq', title: 'Heavy & Medium Vehicles', value: '₹4,580.16 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Broad vehicle acquisition head — no autonomy content assumed.', claimIds: ['c-cap-vehicles'] },
  { id: 'acq-dockyard', parent: 'acq', title: 'Naval Dockyard / Projects', value: '₹4,333.70 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Broad naval infrastructure/project head — no autonomy content assumed.', claimIds: ['c-cap-dockyard'] },
  { id: 'acq-joint', parent: 'acq', title: 'Joint Staff', value: '₹3,138.72 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Joint-services head — no autonomy content assumed.', claimIds: ['c-cap-joint'] },
  { id: 'acq-special', parent: 'acq', title: 'Special Projects', value: '₹1,989.12 Cr', tag: 'FY27 · annual · broad pool', cls: 'official', relevant: true, why: 'Special-projects head — programme content is not publicly separable.', claimIds: ['c-cap-special'] },
];

export const FUTURE_BUDGET_TREE: BudgetNode[] = [
  { id: 'future-root', parent: null, title: 'India autonomy-relevant public spend', tag: 'Future possibility · budget owners', cls: 'context', relevant: true, why: 'Potential public spending pools beyond the current Defence Services acquisition tree. Values are not additive.', claimIds: ['c-budget-total'] },
  { id: 'future-mod', parent: 'future-root', title: 'MoD / Defence Services', value: '₹7.85 L Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Primary defence budget owner. Drill into current acquisition and revenue procurement trees.', claimIds: ['c-budget-total'] },
  { id: 'future-mod-cap', parent: 'future-mod', title: 'Capital acquisition', value: '₹1.85 L Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Current acquisition pool; programme values may overlap this annual head.', claimIds: ['c-budget-acq'] },
  { id: 'future-mod-revenue', parent: 'future-mod', title: 'Revenue procurement', value: '≈₹1 L Cr', tag: 'Annual · DPM 2025 · reported', cls: 'industry', relevant: true, why: 'Spares, repairs, MRO, ICT, services and sustainment. Not autonomy TAM.', claimIds: ['c-dpm-revenue'] },
  { id: 'future-drdo', parent: 'future-root', title: 'DRDO & defence innovation', value: '₹29,100.25 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'R&D budget owner with public industry, start-up and academia participation.', claimIds: ['c-drdo-budget'] },
  { id: 'future-drdo-cap', parent: 'future-drdo', title: 'DRDO capital expenditure', value: '₹17,250.25 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Capital R&D and technology development pool.', claimIds: ['c-drdo-budget'] },
  { id: 'future-idex', parent: 'future-drdo', title: 'iDEX / ADITI / TDF', value: '₹498.78 Cr', tag: 'Innovation outlay · official', cls: 'official', relevant: true, why: 'Defence innovation ecosystem. Scheme outlay is not a Shield market estimate.', claimIds: ['c-idex-budget'] },
  { id: 'future-coastguard', parent: 'future-root', title: 'Indian Coast Guard', value: '₹8,392.85 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Separate maritime-security budget owner beyond the Navy.', claimIds: ['c-coastguard-budget'] },
  { id: 'future-coastguard-revenue', parent: 'future-coastguard', title: 'Revenue', value: '₹4,392.85 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Operating and readiness spend.', claimIds: ['c-coastguard-budget'] },
  { id: 'future-coastguard-capital', parent: 'future-coastguard', title: 'Capital', value: '₹4,000 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Capital acquisition for maritime and coastal security assets.', claimIds: ['c-coastguard-budget'] },
  { id: 'future-coastguard-programmes', parent: 'future-coastguard-capital', title: 'Shipborne UAS / maritime ISR / counter-UAS', value: 'Value not publicly separable', tag: 'Programme areas', cls: 'context', relevant: true, why: 'Potential relevance areas only; no autonomy TAM inferred.', claimIds: ['c-nsuas', 'c-vidar', 'c-cuas-aon'] },
  { id: 'future-mha', parent: 'future-root', title: 'MHA / CAPF', value: '₹2,55,234 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Headline internal-security pool. Most of the allocation is not autonomy-relevant.', claimIds: ['c-mha-budget'] },
  { id: 'future-police', parent: 'future-mha', title: 'Police', value: '₹1,73,803 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Police head including CAPFs, border and intelligence functions.', claimIds: ['c-mha-police'] },
  { id: 'future-police-capital', parent: 'future-police', title: 'Police capital', value: '₹21,272.47 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Capital layer within the Police head.', claimIds: ['c-mha-police-capital'] },
  { id: 'future-capf-modernisation', parent: 'future-police-capital', title: 'CAPF Modernisation Plan IV', value: '₹343.66 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Modernisation pool for equipment and upgraded IT.', claimIds: ['c-capf-modernisation'] },
  { id: 'future-space', parent: 'future-root', title: 'Military Space / SBS-III', value: '₹26,968 Cr', tag: 'Multi-year · reported programme', cls: 'industry', relevant: true, why: '52-satellite surveillance programme; programme value is not an annual budget head.', claimIds: ['c-sbs3'] },
  { id: 'future-space-satellites', parent: 'future-space', title: '52 surveillance satellites', value: '52 satellites', tag: 'Target ~2029 · reported', cls: 'industry', relevant: true, why: 'Potential relevance: autonomous tasking, constellation coordination and mission management.', claimIds: ['c-sbs3'] },
  { id: 'future-dos', parent: 'future-root', title: 'Department of Space', value: '₹13,705.63 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Contextual national-space budget; not equivalent to military autonomy spending.', claimIds: ['c-dos-budget'] },
  { id: 'future-dos-capital', parent: 'future-dos', title: 'Capital outlay', value: '₹6,375.92 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Capital space infrastructure and mission pool.', claimIds: ['c-dos-capital'] },
];

const MOD_TREE: BudgetNode[] = [
  { id: 'mod', parent: 'market-root', title: 'MoD / Defence Services · Capital acquisition', value: '₹1,84,932 Cr', tag: 'FY27 · annual budget', cls: 'official', relevant: true, why: 'Relevant modernisation entry point. This is an acquisition pool, not autonomy TAM; programme values may overlap it.', claimIds: ['c-budget-acq', 'c-budget-domestic', 'c-dap'] },
  ...BUDGET_TREE.filter((node) => node.parent === 'acq' || node.parent === 'acq-other' || node.parent === 'acq-aircraft' || node.parent === 'acq-naval').map((node) => ({ ...node, id: `mod-${node.id}`, parent: node.parent === 'acq' ? 'mod' : `mod-${node.parent}` })),
];

const FUTURE_POOLS: BudgetNode[] = FUTURE_BUDGET_TREE
  .filter((node) => node.id !== 'future-root' && node.id !== 'future-mod' && !node.id.startsWith('future-mod-'))
  .filter((node) => !['future-drdo-cap', 'future-coastguard-revenue', 'future-coastguard-capital', 'future-police', 'future-police-capital', 'future-capf-modernisation', 'future-dos-capital'].includes(node.id))
  .map((node) => {
    if (node.id === 'future-drdo') return { ...node, parent: 'market-root', title: 'DRDO capital / defence innovation', value: '₹17,250.25 Cr', tag: 'FY27 · capital R&D' };
    if (node.id === 'future-coastguard') return { ...node, parent: 'market-root', title: 'Indian Coast Guard · capital', value: '₹4,000 Cr', tag: 'FY27 · capital budget' };
    if (node.id === 'future-coastguard-programmes') return { ...node, parent: 'future-coastguard' };
    if (node.id === 'future-mha') return { ...node, parent: 'market-root', title: 'MHA / CAPF · Modernisation Plan IV', value: '₹343.66 Cr', tag: 'FY27 · modernisation budget', why: 'Relevant CAPF equipment and IT modernisation pool. The wider MHA budget is not autonomy TAM.' };
    if (node.id === 'future-dos') return { ...node, parent: 'market-root', title: 'Department of Space · capital context', value: '₹6,375.92 Cr', tag: 'FY27 · capital context' };
    return { ...node, parent: node.parent === 'future-root' ? 'market-root' : node.parent };
  });

export const MARKET_TREE: BudgetNode[] = [
  { id: 'market-root', parent: null, title: 'India autonomy-relevant public spend', tag: 'Budget owners · values not additive', cls: 'context', relevant: true, why: 'A single public-spend canvas. Drill from owner to budget head to programme; annual budgets and programme values are not additive.', claimIds: ['c-budget-total'] },
  ...MOD_TREE,
  { id: 'future-revenue', parent: 'market-root', title: 'MoD revenue procurement · ICT / services', value: '≈₹1 L Cr', tag: 'Annual · DPM 2025 · reported', cls: 'industry', relevant: true, why: 'Revenue procurement can fund software, ICT, services, integration and sustainment. It is not autonomy TAM.', claimIds: ['c-dpm-revenue'] },
  ...FUTURE_POOLS,
];
