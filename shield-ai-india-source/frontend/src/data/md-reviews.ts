// Illustrative review snapshots, not Shield operational records. Independent of the
// editable long-term scenario. Replace at each weekly review / monthly close.
export const WEEKLY_REVIEWS = [
  { id: '2026-09-04', period: 'Week ending 04 Sep 2026', updated: '04 Sep 2026 · 17:00 IST', prior: '28 Aug', plannedAcceptance: '30 Sep', forecastAcceptance: '14 Oct', priorForecast: '07 Oct', milestoneValue: 4, lateDays: 14, priorLateDays: 7, engineersNeeded: 14, engineersAvailable: 9, priorGap: 4, actions: 3, priorActions: 4,
    movements: [['Army award', '1 announced', 'No new order', 'Acceptance forecast +7 days'], ['Navy pursuit', '1 route', 'No stage change', 'Trial scope to validate'], ['OEM pursuit', '1 route', 'No stage change', 'Engineering allocation pending'], ['JSW partnership', '1 partner', 'No gate cleared', 'Production-readiness evidence due']],
  },
  { id: '2026-08-28', period: 'Week ending 28 Aug 2026', updated: '28 Aug 2026 · 17:00 IST', prior: '21 Aug', plannedAcceptance: '30 Sep', forecastAcceptance: '07 Oct', priorForecast: '30 Sep', milestoneValue: 4, lateDays: 7, priorLateDays: 0, engineersNeeded: 13, engineersAvailable: 9, priorGap: 3, actions: 4, priorActions: 5,
    movements: [['Army award', '1 announced', 'No new order', 'Acceptance forecast +7 days'], ['Navy pursuit', '1 route', 'No stage change', 'Trial sponsor review pending'], ['OEM pursuit', '1 route', 'No stage change', 'Integration scope under review'], ['JSW partnership', '1 partner', 'No gate cleared', 'JSW readiness review pending']],
  },
];
export const MONTHLY_REVIEWS = [
  { id: '2026-08', period: 'August 2026', updated: '03 Sep 2026 · 12:00 IST', prior: 'July', rows: [
    { label: 'Revenue', review: 0.8, plan: 0.9, prior: 0.65, owner: 'Programmes + Finance', note: 'Accepted integration and support scope; separate from the long-term Army scenario.' },
    { label: 'New bookings', review: 1.5, plan: 1.8, prior: 1.2, owner: 'BD + Commercial', note: 'Incremental paid integration and support orders; excludes rebooking the anchor award.' },
    { label: 'Collections', review: 0.72, plan: 0.85, prior: 0.6, owner: 'Finance', note: 'Customer receipts against integration and support invoices.' },
    { label: 'Local operating cost', review: .22, plan: .205, prior: .21, owner: 'People + Finance', note: '$0.19M people + $0.03M overhead. $0.015M above the $0.205M monthly base envelope; illustrative additional support cost.' },
    { label: 'Programme delivery payments', review: 0.52, plan: 0.585, prior: 0.4225, owner: 'Programmes + Finance', note: 'Programme-level delivery charges for integration and support, including global product and engineering allocations; not JSW procurement or a confirmed Shield India payable. June includes an anchor mobilisation charge.' },
    { label: 'Operating contribution', review: 0.06, plan: 0.11, prior: 0.0175, owner: 'Finance', note: 'Revenue less 65% matched delivery cost and local operating cost; programme payment timing is separate.' },
  ] },
  { id: '2026-07', period: 'July 2026', updated: '04 Aug 2026 · 12:00 IST', prior: 'June', rows: [
    { label: 'Revenue', review: 0.65, plan: 0.7, prior: 0.55, owner: 'Programmes + Finance', note: 'Accepted integration and support scope; separate from the long-term Army scenario.' },
    { label: 'New bookings', review: 1.2, plan: 1.4, prior: 1, owner: 'BD + Commercial', note: 'Incremental paid integration and support orders; excludes rebooking the anchor award.' },
    { label: 'Collections', review: 0.6, plan: 0.65, prior: 0.5, owner: 'Finance', note: 'Customer receipts against integration and support invoices.' },
    { label: 'Local operating cost', review: .21, plan: .205, prior: .205, owner: 'People + Finance', note: '$0.185M people + $0.025M overhead; $0.005M above the monthly planning envelope.' },
    { label: 'Programme delivery payments', review: 0.4225, plan: 0.455, prior: 2.6, owner: 'Programmes + Finance', note: 'Programme-level delivery charges for integration and support, including global product and engineering allocations; not JSW procurement or a confirmed Shield India payable. June includes an anchor mobilisation charge.' },
    { label: 'Operating contribution', review: 0.0175, plan: 0.04, prior: -0.0125, owner: 'Finance', note: 'Revenue less 65% matched delivery cost and local operating cost; programme payment timing is separate.' },
  ] },
];

export const REVIEW_ASSUMPTIONS = [
  { label: 'JSW and Shield responsibility split', basis: 'Planning assumption: JSW owns production, factory investment and production supplier procurement. Shield India coordinates technology transfer, integration, acceptance support and partner dependencies, and manages its own people and overhead budget. The financial review is an India-facing programme case, not a Shield India legal-entity cash ledger. The 65% delivery-cost allowance and $1.56M 13-week programme payments represent global product, engineering and delivery charges; they do not establish an obligation for Shield India to fund JSW suppliers. Finance and HQ must assign the payer before using the programme cash case as an India funding request.' },
  { label: 'Monthly review scope', basis: 'Fixed illustrative integration and support case, independent of the editable Army scenario. All review figures, dates and operational statuses are planning assumptions, not company records.' },
  ...MONTHLY_REVIEWS.map(month => ({ label: `${month.period} financial assumptions`, basis: month.rows.map(row => `${row.label}: review $${row.review}M / plan $${row.plan}M / prior $${row.prior}M. ${row.note}`).join(' ') })),
  { label: '13-week cash headroom', basis: 'Opening cash $2M + receipts $2.2M − programme delivery payments $1.56M − local costs $0.66M = closing and minimum cash $1.98M. Planning floor $0.5M; minimum headroom $1.48M. Assume receipts precede outflows each week; Finance owns the weekly phasing.' },
  { label: 'Production readiness', basis: 'Assume 8 of 10 required JSW readiness checks complete (80%); 2 sign-offs due 11 Sep. JSW owns production execution and its supplier commitments; Shield Industrialisation coordinates technology transfer, engineering support and the joint readiness review.' },
  { label: 'Action follow-through', basis: 'Assume 4 prior open actions, 2 closed with evidence and 1 new recovery action, leaving 3 open. Of these, 1 is overdue. Prior staffing review closed 02 Sep; JSW delivery review closed 03 Sep. Programme recovery, cash phasing and production sign-off are due 09, 08 and 11 Sep respectively.' },
  { label: 'Weekly delivery and capacity', basis: 'Assume a $4M milestone committed 30 Sep, forecast 14 Oct versus 07 Oct previously; 9 of 14 engineers assigned versus 9 of 13 previously. These snapshots are independent of the editable scenario.' },
  { label: 'Programme planning values', basis: 'Army $20M package; JSW $1.5M illustrative licence/transfer fee opportunity; Navy $8M pursuit; OEM $2M integration pursuit. Only Army enters the long-term model. Other values are unweighted planning allowances, not announced prices or signed awards.' },
];
export const REVIEW_CASH = { opening: 2, receipts: 2.2, programmePayments: 1.56, localCosts: .66, floor: .5 };
export const REVIEW_HEADROOM = REVIEW_CASH.opening + REVIEW_CASH.receipts - REVIEW_CASH.programmePayments - REVIEW_CASH.localCosts - REVIEW_CASH.floor;
