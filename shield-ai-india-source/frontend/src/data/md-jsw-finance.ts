import { ANNUAL, type Year } from './md-plan';
// User-authorised estimate for the dashboard review; not recorded expenditure.
export const JSW_SPEND_ESTIMATE = { year: 'FY26–27' as Year, asOf: '2026-09-30', amount: 6 };
export const JSW_FINANCE_BASIS = 'FY26–27 execution spend is estimated at ₹6 Cr through 30 September 2026, assuming half of the ₹12 Cr annual budget has been used. This is a user-authorised planning assumption, not recorded expenditure. FY25–26 execution spending is estimated at its full ₹5 Cr budget, consistent with the Finance spending scenario. Cumulative estimated spend is ₹11 Cr against an assumed ₹11 Cr phased budget through September. No future-year spend or actual earnings are inferred.';
export const JSW_COST_WEIGHTS = [
 ['US engineering support',6],['India-to-US training',4],['QA / QC',4],['Vendor qualification',3],['Documentation',3],['Initial production support',3],['Compliance',2],
] as const;
export function jswFinance(year:Year) {
 const plan=ANNUAL.find(p=>p.year===year)!;
 return {year,rows:[
  {id:'earnings',label:'ToT / licensing earnings',plan:plan.tot,actual:null as number|null},
  {id:'execution',label:'Transfer execution costs',plan:plan.execution,actual:null as number|null},
  {id:'net',label:'Net transfer contribution',plan:plan.tot-plan.execution,actual:null as number|null},
 ]};
}

// Full prior-year budget plus a straight-line six-month current-year budget.
export const JSW_EXECUTION_TRACKER = ANNUAL.map(p=>({
 label:p.year,earnings:p.tot,costs:p.execution,
 spend:p.end<=JSW_SPEND_ESTIMATE.asOf?p.execution:p.year===JSW_SPEND_ESTIMATE.year?JSW_SPEND_ESTIMATE.amount:null,
 budgetToDate:p.end<=JSW_SPEND_ESTIMATE.asOf?p.execution:p.year===JSW_SPEND_ESTIMATE.year?p.execution*.5:null,
}));
export const JSW_SPEND_TO_DATE = JSW_EXECUTION_TRACKER.reduce((sum,p)=>sum+(p.spend??0),0);
export const JSW_BUDGET_TO_DATE = JSW_EXECUTION_TRACKER.reduce((sum,p)=>sum+(p.budgetToDate??0),0);
export const JSW_SPEND_VARIANCE = JSW_SPEND_TO_DATE-JSW_BUDGET_TO_DATE;
