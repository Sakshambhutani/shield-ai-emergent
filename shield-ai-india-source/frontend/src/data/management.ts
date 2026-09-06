export type PerformanceStatus = 'on-track' | 'watch' | 'off-track' | 'not-baselined';
export type PerformanceTrend = 'improving' | 'stable' | 'deteriorating' | 'unknown';

export const STATUS_META: Record<PerformanceStatus, { label: string; symbol: string; className: string }> = {
  'on-track': { label: 'On track', symbol: '●', className: 'text-emerald-300' },
  watch: { label: 'Watch', symbol: '▲', className: 'text-amber-300' },
  'off-track': { label: 'Off track', symbol: '■', className: 'text-red-300' },
  'not-baselined': { label: 'Not yet baselined', symbol: '—', className: 'text-paper-3' },
};

export const TREND_META: Record<PerformanceTrend, { label: string; symbol: string; className: string }> = {
  improving: { label: 'Improving', symbol: '↑', className: 'text-emerald-300' },
  stable: { label: 'Stable', symbol: '→', className: 'text-paper-2' },
  deteriorating: { label: 'Deteriorating', symbol: '↓', className: 'text-red-300' },
  unknown: { label: 'Not reported', symbol: '—', className: 'text-paper-3' },
};

export const SCORECARD_SIGNALS = [
  {
    id: 'scale', bet: 'SCALE', title: 'ARMY REFERENCE', status: 'not-baselined' as PerformanceStatus, trend: 'unknown' as PerformanceTrend,
    now: '—', plan: 'M3 · Programme / acceptance / support model locked',
    current: 'Internal programme actual not supplied.', expected: 'Programme, acceptance and support model locked.',
    drivers: ['Critical programme gates', 'Customer acceptance', 'Industrialisation readiness'], accountability: 'Programmes / Mission Success',
    trajectory: ['M3 · Programme / acceptance / support model locked', 'M6 · Operational proof + local production readiness', 'M12 · Operational reference + follow-on / Hivemind expansion shaped', 'M18 · Follow-on + sustainment pathway'],
  },
  {
    id: 'embed', bet: 'EMBED', title: 'AUTONOMY FOOTPRINT', status: 'not-baselined' as PerformanceStatus, trend: 'unknown' as PerformanceTrend,
    now: '—', plan: 'M3 · First 2 platform integrations selected',
    current: 'Internal integration maturity not supplied.', expected: 'First two platform integrations selected.',
    drivers: ['Integration maturity', 'Time to autonomy', 'Engineering / global-product dependency'], accountability: 'Autonomy & Solutions Engineering', target: '3–4 meaningful integrations',
    trajectory: ['M3 · First 2 platform integrations selected', 'M6 · First Indian-platform SIL/HIL demo', 'M12 · First autonomous flight / sail', 'M18 · 3–4 meaningful integrations + programme pathway'],
    maturity: ['Selected', 'Integration', 'SIL/HIL', 'Autonomous', 'Customer Demo', 'Programme-linked'],
    reuse: ['India-created capability reused on another programme', 'India contribution incorporated into global product / tooling', 'Integration N+1 becomes faster or easier than integration N'],
  },
  {
    id: 'expand', bet: 'EXPAND', title: 'SECOND SERVICE', status: 'not-baselined' as PerformanceStatus, trend: 'unknown' as PerformanceTrend,
    now: '—', plan: 'M3 · Priority Navy mission + entry path agreed',
    current: 'Internal customer / programme maturity not supplied.', expected: 'Priority Navy mission and entry path agreed.',
    drivers: ['Operational sponsor', 'Technical / demo pathway', 'Next customer decision'], accountability: 'Navy mission / capture owner',
    trajectory: ['M3 · Priority Navy mission + entry path agreed', 'M6 · Demo pathway + partner agreed', 'M12 · Shipborne trial / maritime demo', 'M18 · Second-service reference position'],
    maturity: ['Discovery', 'Sponsor', 'Technical Path', 'Demo', 'Evaluation', 'Programme'],
  },
] as const;

export const EXECUTION_SIGNALS = [
  { id: 'delivery', label: 'DELIVERY HEALTH', status: 'not-baselined' as PerformanceStatus, detail: 'Programme execution · acceptance · industrialisation · fulfilment · sustainment' },
  { id: 'capacity', label: 'CAPACITY HEALTH', status: 'not-baselined' as PerformanceStatus, detail: 'Engineering capacity · programme capacity · hiring · global dependencies' },
] as const;
