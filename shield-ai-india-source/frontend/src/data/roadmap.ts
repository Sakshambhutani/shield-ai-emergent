export const STAGES = [
  { months: '0–3 months', name: 'Establish', span: 1 },
  { months: '3–6 months', name: 'Prove', span: 1 },
  { months: '6–12 months', name: 'Expand', span: 2 },
  { months: '12–18 months', name: 'Scale', span: 2 },
];

export const GROWTH_ROUTES = [
  { title: 'Direct / B2G', summary: 'Army → next service → programmes', detail: 'Existing Army programme → next government / service channel → additional programmes' },
  { title: 'Partner-led / B2B2G', summary: 'OEM / prime → SDK integration → joint programmes', detail: 'Indian OEM / defence prime → Hivemind SDK / Solutions integration → joint programme opportunities' },
];

export const MILESTONES = [
  { month: 0, label: 'M0', title: 'India operation in motion', lines: ['Existing Army programme', 'JSW partnership', 'Initial India team in place'], details: [
    'The existing Army programme and JSW partnership anchor the India business.',
    'The initial India team provides the starting point for local execution and customer support.',
  ], assumption: 'Current commitments provide the foundation; delivery sequencing and the initial capacity baseline must be confirmed.', note: 'Starting position, rather than a new programme award.' },
  { month: 3, label: 'M3', title: 'Delivery readiness established', lines: ['V-BAT delivery & trial support', 'India Hivemind environment live', 'Bangalore setup & execution model'], details: [
    'V-BAT delivery and trial support available in India.',
    'Hivemind configured and validated for the Indian operating environment.',
    'Bangalore setup operational, with an agreed Shield AI / JSW execution model and critical capacity in place.',
  ], assumption: 'Readiness depends on product access, required approvals, local infrastructure and critical hiring.', note: 'Readiness is the company state; customer acceptance and trial dates remain externally dependent.' },
  { month: 6, label: 'M6', title: 'India model proven', lines: ['First India Hivemind proof', 'First OEM / prime pathway active', 'Direct government pipeline advancing'], details: [
    'A successful India Hivemind technical proof demonstrates that local execution works.',
    'A serious Indian OEM / defence-prime engagement establishes a Hivemind SDK / Solutions integration pathway.',
    'The direct government opportunity pipeline is actively progressing alongside the partner route.',
  ], assumption: 'A suitable proof scope, partner engineering access and customer engagement can be secured.', note: 'Technical proof and an active partner pathway do not imply a contracted programme.' },
  { month: 12, label: 'M9 / M12', title: 'Growth engines activated', lines: ['Next government / service channel', 'Indian OEM / prime B2B2G route active', 'India integration capability deepening'], details: [
    'M9: the next government / service channel reaches meaningful evaluation, demo or programme definition.',
    'M9: additional platform / partner opportunities are qualified.',
    'M12: both direct B2G and partner-led B2B2G growth routes are active.',
    'M12: at least one meaningful Indian-platform Hivemind integration progresses, with deeper India ownership.',
  ], assumption: 'Customer sponsorship, partner bandwidth and platform access support progression across the M9–M12 window.', note: 'This is a combined growth window, shown at its M12 checkpoint. No specific next service is prescribed.' },
  { month: 15, label: 'M15', title: 'Operating scale taking shape', lines: ['Production / supply-chain readiness', 'Multi-programme support developing', 'Sustainment model taking shape'], details: [
    'JSW production and supply-chain readiness advance toward repeatable customer delivery.',
    'India develops the capacity and systems to support multiple programmes concurrently.',
    'A defined sustainment model supports the transition from individual deliveries to an enduring operation.',
  ], assumption: 'Industrial readiness and support capacity mature in step with programme demand.', note: 'Readiness milestones should be validated against actual facility, supplier and delivery dependencies.' },
  { month: 18, label: 'M18', title: 'Repeatable India operation', lines: ['Multiple programme pathways', 'Capture → integration → delivery', 'Local growth + selected global Hivemind'], details: [
    'Multiple active customer / programme pathways develop through both direct and partner routes.',
    'A repeatable capture → integration → delivery model is backed by sustainment capability.',
    'India engineering supports local growth and selected global Hivemind contribution.',
    'India leadership, operating cadence and P&L visibility support a repeatable multi-programme business.',
  ], assumption: 'Demand, engineering depth and delivery capacity justify scaling beyond the initial commitment.', note: 'The target is repeatability across programmes, rather than a fixed number of procurement awards.' },
];
