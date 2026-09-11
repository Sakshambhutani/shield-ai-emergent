import { ANNUAL, type Year } from './md-plan';
export const BD_PLANNING_BASIS = 'Annual orders follow the workbook; pipeline targets follow it from FY26–27 onward. Allocation: B2B 20%, B2G 70% (45% new service programmes + 25% Army expansion), PSUs 10%. Closure counts: 7 / 14 / 28 in FY26–27 / FY27–28 / FY28–29. These are planning workstreams, not named opportunities or actual wins. FY25–26 uses the model’s initial ₹200 Cr Army order baseline; the user sets FY25–26 pipeline to ₹200 Cr and treats the initial ₹200 Cr order as closed for that year. Later-year closed orders have not been supplied.';
const LANES = [
 {id:'oem',segment:'B2B',name:'OEM autonomy partnerships',share:.20,count:2,owner:'Partner BD',route:'OEM integration agreements',next:'Identify partners and agree paid integration scope',risk:'Platform access and commercial scope'},
 {id:'services',segment:'B2G',name:'Service programmes / RFPs',share:.45,count:3,owner:'Government BD',route:'Service procurement / RFP',next:'Map funded requirements and procurement windows',risk:'RFP and procurement timing'},
 {id:'expansion',segment:'B2G',name:'Army expansion / follow-on',share:.25,count:1,owner:'BD + Programme lead',route:'Follow-on procurement',next:'Confirm expansion scope and delivery dependencies',risk:'Initial programme acceptance'},
 {id:'psu',segment:'PSUs',name:'PSU platform partnerships',share:.10,count:1,owner:'Partner BD',route:'PSU tenders / development agreements',next:'Agree platform sponsors and tender scope',risk:'Budget and source qualification'},
] as const;
export function bdPlan(year:Year) {
 const index=ANNUAL.findIndex(p=>p.year===year), plan=ANNUAL[index];
 if(index===0) return [{id:'initial-army',segment:'B2G' as const,name:'Initial Army systems order',pipeline:plan.orders,orders:plan.orders,count:1,owner:'Government BD',route:'Initial order · model baseline',next:'Confirm contractual delivery and collection milestones',risk:'Collection timing not modelled'}];
 return LANES.map(l=>({...l,pipeline:plan.pipeline*l.share,orders:plan.orders*l.share,count:l.count*2**(index-1)}));
}

// Initial order baseline explicitly designated closed by the user; later FY targets are not wins.
export const closedOrders = (year: Year): number | null => year === 'FY25–26' ? ANNUAL[0].orders : null;
