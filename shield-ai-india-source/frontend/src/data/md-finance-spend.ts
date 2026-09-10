import { ANNUAL } from './md-plan';
import { JSW_SPEND_ESTIMATE } from './md-jsw-finance';

// User-requested illustrative variance, not recorded actuals.
// FY25–26: ₹1 Cr India-opex overrun against the full-year budget.
// FY26–27 through Sep: ₹1.5 Cr India-opex overrun against an assumed
// straight-line six-month budget; JSW remains the existing ₹6 Cr estimate.
// Future-year spend and variance remain unknown.
export const ANNUAL_SPENDING = ANNUAL.map((p,index)=>{
 const planned=p.opex+p.execution;
 const periodBudget=index===0?planned:index===1?planned*.5:null;
 const spent=index===0?planned+1:index===1?p.opex*.5+1.5+JSW_SPEND_ESTIMATE.amount:null;
 return {label:p.year,planned,spent,periodBudget,
  variance:spent===null||periodBudget===null?null:spent-periodBudget,
  period:index===0?'full year':'through Sep',
 };
});
