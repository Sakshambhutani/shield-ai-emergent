import { ANNUAL } from './md-plan';
import { ANNUAL_SPENDING } from './md-finance-spend';

// Prototype assumptions, not workbook cash balances or bank records.
// Initial HQ contribution: ₹40 Cr (₹35 Cr first-year operating plan + ₹5 Cr buffer).
// Collect 50% of each FY's combined revenue/ToT earnings in that FY, the remainder
// in the next FY. At September 2026, assume half of the FY26–27 collections received.
// Cash payments equal estimated spending; no additional capex, tax or working-capital
// payments are assumed. This is an annual cash scenario, not a verified runway model.
const round=(n:number)=>Math.round(n*100)/100;
let opening=0;
let cumulativeFunding=0;
export const CASH_PLAN = ANNUAL.map((p,index)=>{
 const spending=ANNUAL_SPENDING[index];
 const earnings=p.revenue+p.tot;
 const previous=index?ANNUAL[index-1].revenue+ANNUAL[index-1].tot:0;
 const fullYearCollections=(earnings+previous)*.5;
 const collections=index===1?fullYearCollections*.5:fullYearCollections;
 const funding=index===0?40:0;
 cumulativeFunding+=funding;
 const payments=spending.spent??spending.planned;
 const closing=round(opening+collections+funding-payments);
 const fullYearPayments=index===1?payments+spending.planned-spending.periodBudget!:payments;
 const projectedYearEnd=round(opening+fullYearCollections+funding-fullYearPayments);
 const result={year:p.year,asOf:index===1?'2026-09-30':`${Number(p.start.slice(0,4))+1}-03-31`,
  projected:index>1,opening,collections:round(collections),funding,cumulativeFunding,payments,closing,projectedYearEnd};
 opening=projectedYearEnd;
 return result;
});
