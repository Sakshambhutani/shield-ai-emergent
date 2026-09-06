// Illustrative review snapshots, not Shield operational records. Independent of the
// editable long-term scenario. Replace at each weekly review / monthly close.
export const WEEKLY_REVIEWS = [
  { id: '2026-09-04', period: 'Week ending 04 Sep 2026', updated: '04 Sep 2026 · 17:00 IST', prior: '28 Aug', plannedAcceptance: '30 Sep', forecastAcceptance: '14 Oct', priorForecast: '07 Oct', milestoneValue: 4, lateDays: 14, priorLateDays: 7, engineersNeeded: 14, engineersAvailable: 9, priorGap: 4, actions: 3, priorActions: 4,
    movements: [['Army award', '1 announced', 'No new order', 'Acceptance forecast +7 days'], ['Navy pursuit', '1 route', 'No stage change', 'Trial scope to validate'], ['OEM pursuit', '1 route', 'No stage change', 'Engineering allocation pending'], ['JSW partnership', '1 partner', 'No gate cleared', 'Production-readiness evidence due']],
  },
  { id: '2026-08-28', period: 'Week ending 28 Aug 2026', updated: '28 Aug 2026 · 17:00 IST', prior: '21 Aug', plannedAcceptance: '30 Sep', forecastAcceptance: '07 Oct', priorForecast: '30 Sep', milestoneValue: 4, lateDays: 7, priorLateDays: 0, engineersNeeded: 13, engineersAvailable: 9, priorGap: 3, actions: 4, priorActions: 5,
    movements: [['Army award', '1 announced', 'No new order', 'Acceptance forecast +7 days'], ['Navy pursuit', '1 route', 'No stage change', 'Trial sponsor review pending'], ['OEM pursuit', '1 route', 'No stage change', 'Integration scope under review'], ['JSW partnership', '1 partner', 'No gate cleared', 'Supplier evidence pending']],
  },
];
export const MONTHLY_REVIEWS = [
  { id: '2026-08', period: 'August 2026', updated: '03 Sep 2026 · 12:00 IST', prior: 'July', rows: [
    { label: 'Revenue', review: 0, plan: 0, prior: 0, owner: 'Programmes + Finance', note: 'No accepted milestone in August; the base schedule places first acceptance in September.' },
    { label: 'New bookings', review: 0, plan: 0, prior: 0, owner: 'BD + Commercial', note: 'No new signed order in this example month. The assumed $20M anchor award is not rebooked every month.' },
    { label: 'Collections', review: 0, plan: 0, prior: 0, owner: 'Finance', note: 'No receipt in August. The example advance belongs to mobilisation; progress payments follow acceptance and the collection lag.' },
    { label: 'Local operating cost', review: .22, plan: .205, prior: .21, owner: 'People + Finance', note: '$0.19M people + $0.03M overhead. $0.015M above the $0.205M monthly base envelope; illustrative additional support cost.' },
    { label: 'Supplier payments', review: 0, plan: 0, prior: 0, owner: 'Procurement + Finance', note: 'No supplier payment due this month in the base schedule; the first planned outflow occurs in June.' },
    { label: 'Operating contribution', review: -.22, plan: -.205, prior: -.21, owner: 'Finance', note: 'Revenue less costs allocated to accepted scope and local operating costs. No acceptance revenue or matched external delivery cost this month.' },
  ] },
  { id: '2026-07', period: 'July 2026', updated: '04 Aug 2026 · 12:00 IST', prior: 'June', rows: [
    { label: 'Revenue', review: 0, plan: 0, prior: 0, owner: 'Programmes + Finance', note: 'No accepted milestone in July; first planned acceptance is September.' },
    { label: 'New bookings', review: 0, plan: 0, prior: 0, owner: 'BD + Commercial', note: 'No new order in July. Full-term award value is counted once when signed.' },
    { label: 'Collections', review: 0, plan: 0, prior: 0, owner: 'Finance', note: 'No progress payment collected before the first acceptance gate.' },
    { label: 'Local operating cost', review: .21, plan: .205, prior: .205, owner: 'People + Finance', note: '$0.185M people + $0.025M overhead; $0.005M above the monthly planning envelope.' },
    { label: 'Supplier payments', review: 0, plan: 0, prior: 2.6, owner: 'Procurement + Finance', note: 'June includes the assumed first supplier payment: $20M × 65% external cost × 20% first lot = $2.6M.' },
    { label: 'Operating contribution', review: -.21, plan: -.205, prior: -.205, owner: 'Finance', note: 'No accepted revenue this month. June supplier cash is not expensed here before acceptance.' },
  ] },
];
