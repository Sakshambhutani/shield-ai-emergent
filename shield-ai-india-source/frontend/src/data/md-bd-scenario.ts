import { bdPlan } from './md-bd-plan';
import { ANNUAL, inYear, type Year } from './md-plan';
import { AS_OF, OPPORTUNITIES, STAGES, type Segment } from './md-scenario';
import { usdMillionsToCrore } from '@/lib/currency';

// User-authorised BD planning assumptions. Native INR crore; not booked financial actuals.
export const BD_SCENARIO_BASIS = 'Assumed deal sizes use each BD lane’s annual order target divided by its planned contract count. FY26–27: OEM ₹60 Cr ÷ 2 = ₹30 Cr; service programmes ₹135 Cr ÷ 3 = ₹45 Cr; PSU ₹30 Cr ÷ 1 = ₹30 Cr. One open package per lane gives ₹105 Cr. Package values cover the full proposed scope, including development or deployment, rather than evaluation fees alone. Two earlier, separate scoping studies are assumed booked at 10% of an average OEM/PSU package each: ₹3 Cr + ₹3 Cr. The 10% study allowance, one-open-package assumption, stages and dates are planning judgements, not sourced contract terms. The November OEM and December PSU packages give ₹60 Cr in the next 90 days. Existing later-year pursuits retain their values and dates; FY28–29 adds one average OEM package and one average PSU package, ₹30 Cr each. Future orders and contract counts show the annual plan, not a probability-adjusted forecast or confirmed wins. FY25–26 uses the user-designated ₹200 Cr initial order as reconstructed pipeline developed and converted. BD estimates do not create revenue or cash receipts.';
export function averageBdContract(year:Year,lane:string):number {
 const row=bdPlan(year).find(r=>r.id===lane);
 if(!row||!row.count) throw new Error(`Missing BD lane: ${year} / ${lane}`);
 return row.orders/row.count;
}
export interface BdDeal {
 id: string; customer: string; project: string; segment: Segment; stage: number;
 value: number; close: string; decision: string; due: string; owner: string; risk: string;
}
const assumedDeal = (id:string,customer:string,project:string,segment:Segment,value:number,close:string,stage:number,decision:string,due:string):BdDeal => ({
 id,customer,project,segment,value,close,stage,decision,due,
 owner:segment==='B2G'?'Government BD':'Partner BD',risk:'Assumed scope and procurement timing',
});
export const BD_OPEN_DEALS:BdDeal[] = [
 ...OPPORTUNITIES.filter(o=>o.stage<STAGES[o.segment].length-1).map(o=>({...o,value:usdMillionsToCrore(o.value)})),
 assumedDeal('bd-oem-eval','OEM evaluation partner','Phased integration package, including evaluation','B2B',averageBdContract('FY26–27','oem'),'2026-11-30',5,'Agree evaluation statement of work','2026-10-20'),
 assumedDeal('bd-service-trial','Service trial sponsor','Limited deployment and mission-support package','B2G',averageBdContract('FY26–27','services'),'2027-03-15',4,'Approve trial scope and evaluation criteria','2026-11-15'),
 assumedDeal('bd-psu-study','PSU feasibility partner','Development package, including feasibility','PSUs',averageBdContract('FY26–27','psu'),'2026-12-15',6,'Finalise commercial terms','2026-10-30'),
 assumedDeal('bd-oem-scale','OEM expansion partners','Additional platform integration scopes','B2B',averageBdContract('FY28–29','oem'),'2028-11-30',1,'Identify additional platform sponsors','2027-03-15'),
 assumedDeal('bd-psu-scale','PSU expansion partners','Additional autonomy development scopes','PSUs',averageBdContract('FY28–29','psu'),'2029-02-28',0,'Identify funded platform programmes','2027-03-31'),
];
export const BD_BOOKED_DEALS:BdDeal[] = [
 assumedDeal('bd-initial','Indian Army','Initial systems order · user baseline','B2G',200,'2026-03-15',7,'Confirm delivery and collection milestones','2026-10-30'),
 assumedDeal('bd-scope-oem','OEM scoping partner','Requirements and architecture study','B2B',averageBdContract('FY26–27','oem')*.1,'2026-08-31',6,'Accept study deliverables','2026-11-15'),
 assumedDeal('bd-scope-psu','PSU scoping partner','Integration readiness study','PSUs',averageBdContract('FY26–27','psu')*.1,'2026-09-15',7,'Accept readiness report','2026-11-30'),
];
export const sumBd = (rows:BdDeal[]) => rows.reduce((sum,o)=>sum+o.value,0);
export function bdScenario(year:Year) {
 const plan=ANNUAL.find(p=>p.year===year)!;
 const past=plan.end<=AS_OF, future=plan.start>AS_OF;
 const booked=BD_BOOKED_DEALS.filter(o=>inYear(o.close,year)&&o.close<=AS_OF);
 const open=BD_OPEN_DEALS.filter(o=>inYear(o.close,year));
 const pipelineDeals=past?booked:open;
 const near=open.filter(o=>o.stage>=STAGES[o.segment].length-3&&o.close>=AS_OF&&(Date.parse(o.close)-Date.parse(AS_OF))/86400000<=90);
 const orderValue=future?plan.orders:sumBd(booked);
 const contractCount=future?bdPlan(year).reduce((sum,row)=>sum+row.count,0):booked.length;
 return {past,future,booked,open,pipelineDeals,near,pipelineValue:sumBd(pipelineDeals),orderValue,contractCount};
}
