import { HR_EXITS } from './md-attrition';
import { PEOPLE_AS_OF, PEOPLE_ROLES, PEOPLE_STARTERS } from './md-people';
import type { RagTone } from '@/sections/md/status';

export interface HiringCost {
 id: string; role: string; budget: number; latest: number | null;
 stage: 'Joined' | 'Offer' | 'Vacant';
}
// Illustrative annual employer costs, INR lakh, for the same 25 new positions
// as the People and Culture hiring plan. Excludes the existing team and one-time recruitment costs.
const roleBudgets = [100, 50, 60, 70, 100, 50, 80];
export const HIRING_COST_BASIS = 'Example position budgets and candidate costs for the 25 planned hires. Annual fully loaded employer cost, INR lakh; excludes the existing team and one-time hiring costs. Joined positions use agreed costs, offers use proposed costs, and vacancies retain their individual budgets. Original budgets remain unchanged. This is annual cost at full staffing, not current-FY spending.';
export const HIRING_COSTS: HiringCost[] = PEOPLE_ROLES.flatMap((role, index) => {
 const starters = PEOPLE_STARTERS.filter(s => s.role === role.role && s.start <= PEOPLE_AS_OF);
 return Array.from({length:role.count}, (_, slot) => {
  const stage = slot < starters.length ? 'Joined' : slot < role.offersAccepted + role.offered ? 'Offer' : 'Vacant';
  const budget = roleBudgets[index];
  // Examples include a committed premium, a proposed premium, and a saving.
  const latest = stage === 'Vacant' ? null : index === 2 && slot === 0 ? 65 : index === 4 && slot === starters.length ? 115 : index === 0 ? 95 : budget;
  return {id:starters[slot]?.id ?? `HIRE-${index+1}-${slot+1}`,role:role.role,budget,latest,stage};
 });
});
export function hiringCostSummary(rows: HiringCost[]) {
 const budget = rows.reduce((sum,r)=>sum+r.budget,0);
 const forecast = rows.reduce((sum,r)=>sum+(r.latest ?? r.budget),0);
 const committedOverrun = rows.some(r=>r.stage==='Joined' && r.latest!==null && r.latest>r.budget);
 const pendingPremium = rows.some(r=>r.stage==='Offer' && r.latest!==null && r.latest>r.budget);
 const tone: RagTone = !rows.length ? '' : committedOverrun ? 'red' : pendingPremium || forecast>budget ? 'amber' : 'green';
 return {budget,forecast,variance:forecast-budget,tone};
}
export function hiringCostTone(row: HiringCost): RagTone {
 return row.latest===null ? '' : row.latest<=row.budget ? 'green' : row.stage==='Joined' ? 'red' : 'amber';
}
export const HR_FY_START = `${Number(PEOPLE_AS_OF.slice(0,4))-(Number(PEOPLE_AS_OF.slice(5,7))<4?1:0)}-04-01`;
export const HR_FY_EXITS = HR_EXITS.filter(e=>e.date>=HR_FY_START && e.date<=PEOPLE_AS_OF);
