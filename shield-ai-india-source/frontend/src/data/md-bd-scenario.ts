import { bdPlan } from './md-bd-plan';
import { ANNUAL, inYear, type Year } from './md-plan';
import { AS_OF, OPPORTUNITIES, STAGES, type Segment } from './md-scenario';
import { usdMillionsToCrore } from '@/lib/currency';

// User-authorised BD planning assumptions. Native INR crore; not booked financial actuals.
export const BD_SCENARIO_BASIS = 'User-directed mid-year planning scenario as of 1 October 2026. FY26–27 open pipeline is ₹1,800 Cr, 60% of the ₹3,000 Cr target, split B2B ₹360 Cr, B2G ₹1,260 Cr and PSUs ₹180 Cr. Two separate contracted integration packages are booked at ₹30 Cr each, giving ₹60 Cr or 20% of the ₹300 Cr annual order target. Booked orders are excluded from open pipeline. The November OEM and December PSU pursuits total ₹150 Cr in the next 90 days. FY27–28 open pipeline is ₹3,000 Cr (50% of target); FY28–29 is ₹4,800 Cr (40%). Future-year pipeline includes RFP bids and platform programme packages with current bid actions and later expected closure dates. Values represent potential Shield contract scope, not total customer procurement budgets. Existing later-year pursuits retain their values and closure dates; additional packages represent distinct scopes. Package values, stages, bid actions and dates are planning assumptions, not verified bids or contract awards. Future orders and contract counts remain annual targets, not booked wins or probability-adjusted forecasts. FY25–26 retains the user-designated ₹200 Cr initial order baseline. These BD assumptions do not automatically create revenue, spending or cash receipts.';
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
 owner:segment==='B2G'?'Government BD':'Partner BD',risk:'Scope and procurement timing',
});
export const BD_OPEN_DEALS:BdDeal[] = [
 ...OPPORTUNITIES.filter(o=>o.stage<STAGES[o.segment].length-1).map(o=>({...o,value:usdMillionsToCrore(o.value)})),
 assumedDeal('bd-oem-eval','OEM evaluation partner','Phased integration package, including evaluation','B2B',90,'2026-11-30',5,'Agree evaluation statement of work','2026-10-20'),
 assumedDeal('bd-service-trial','Service trial sponsor','Multi-platform deployment and mission-support package','B2G',1260,'2027-03-15',4,'Approve trial scope and evaluation criteria','2026-11-15'),
 assumedDeal('bd-psu-study','PSU feasibility partner','Development package, including feasibility','PSUs',60,'2026-12-15',6,'Finalise commercial terms','2026-10-30'),
 assumedDeal('bd-oem-scale','OEM expansion partners','Additional platform integration scopes','B2B',averageBdContract('FY28–29','oem'),'2028-11-30',1,'Identify additional platform sponsors','2027-03-15'),
 assumedDeal('bd-psu-scale','PSU expansion partners','Additional autonomy development scopes','PSUs',averageBdContract('FY28–29','psu'),'2029-02-28',0,'Identify funded platform programmes','2027-03-31'),
 assumedDeal('bd-oem-fleet','OEM fleet partner','Fleet autonomy integration package','B2B',270,'2027-03-20',4,'Submit commercial integration proposal','2026-11-20'),
 assumedDeal('bd-psu-platform','PSU platform partner','Platform autonomy production package','PSUs',120,'2027-03-25',4,'Complete technical offer review','2026-11-25'),
 assumedDeal('bd-fy27-oem','OEM programme partner','Additional air-platform integration package','B2B',505,'2027-12-20',2,'Agree platform scope and bid team','2026-11-15'),
 assumedDeal('bd-fy27-service-air','Air programme sponsor','Airborne ISR and autonomy RFP package','B2G',700,'2028-02-15',3,'Complete bid clarification response','2026-10-30'),
 assumedDeal('bd-fy27-service-ground','Land programme sponsor','Ground-platform autonomy RFP package','B2G',640,'2028-03-15',2,'Approve RFP bid submission','2026-11-30'),
 assumedDeal('bd-fy27-psu','PSU systems partner','Additional simulation and integration package','PSUs',110,'2028-03-20',3,'Prepare tender response','2026-12-15'),
 assumedDeal('bd-fy28-oem','OEM next-generation partner','Next-generation platform autonomy package','B2B',930,'2028-12-15',2,'Agree phased platform requirements','2026-12-10'),
 assumedDeal('bd-fy28-service','Service modernisation sponsor','Multi-year ISR and autonomy RFP package','B2G',2220,'2029-02-15',2,'Set bid consortium and response plan','2026-12-20'),
 assumedDeal('bd-fy28-psu','PSU next-generation partner','Next-generation mission systems package','PSUs',450,'2029-03-15',1,'Complete source qualification plan','2026-12-15'),
];
export const BD_BOOKED_DEALS:BdDeal[] = [
 assumedDeal('bd-initial','Indian Army','Initial systems order · user baseline','B2G',200,'2026-03-15',7,'Confirm delivery and collection milestones','2026-10-30'),
 assumedDeal('bd-scope-oem','OEM integration partner','Contracted platform integration package','B2B',averageBdContract('FY26–27','oem'),'2026-08-31',6,'Agree integration delivery milestones','2026-11-15'),
 assumedDeal('bd-scope-psu','PSU integration partner','Contracted autonomy integration package','PSUs',averageBdContract('FY26–27','psu'),'2026-09-15',7,'Agree integration acceptance criteria','2026-11-30'),
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
