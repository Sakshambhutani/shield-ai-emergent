export interface HrExit {
 id: string;
 role: string;
 date: string;
 replacement: string;
 expectedJoin: string | null;
 coverage: string;
 criticalGap: boolean;
 owner: string;
}
// One example departure from the original team. Replacement restores this
// existing position; it is separate from the 25 growth hires and their budget.
export const HR_EXITS: HrExit[] = [{
 id: 'EXIT-BD-01', role: 'BD account manager', date: '2026-11-20',
 replacement: 'Offer accepted', expectedJoin: '2026-12-15',
 coverage: 'BD lead covering accounts', criticalGap: false,
 owner: 'People and Culture + BD lead',
}];
