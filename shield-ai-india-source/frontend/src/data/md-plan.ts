// Annual planning inputs from Shield_AI_India_Operating_Model.xlsx supplied by the user.
// INR crore throughout. These are targets, not actuals or customer collection dates.
export const YEARS = ['FY25–26', 'FY26–27', 'FY27–28', 'FY28–29'] as const;
export type Year = typeof YEARS[number];
export const SOURCE = 'Shield_AI_India_Operating_Model.xlsx';
export const SOURCE_URL = 'https://docs.google.com/spreadsheets/d/1zcvhR2SxnjRonN_DjJXXPCim_JrRIaLd/edit?gid=1373926597#gid=1373926597';
export const ANNUAL = YEARS.map((year, i) => ({ year, start: `${2025+i}-04-01`, end: `${2026+i}-04-01`,
 pipeline: [0,3000,6000,12000][i], orders: [200,300,600,1200][i], revenue: [0,150,300,600][i],
 backlog: [200,350,650,1250][i], exit: [15,40,75,100][i], average: [15,27.5,57.5,87.5][i],
 employeeRate: .7, opex: [30,45,70,90][i], tot: [50,75,50,0][i], execution: [5,12,6,2][i],
}));
export const COST_HEADS = [
 {id:'employee',name:'Employee compensation',owner:'People and Culture',values:[10.5,19.25,40.25,61.25]},
 {id:'office',name:'Office / facilities',owner:'Finance',values:[1.5,2,3,4]},
 {id:'travel',name:'Travel / customer engagement',owner:'Finance',values:[4,5,6,5]},
 {id:'training',name:'General training / engineering support',owner:'Finance',values:[1.5,2,2.5,2.5]},
 {id:'legal',name:'Government affairs / legal / compliance',owner:'Finance',values:[3,3,4,4]},
 {id:'it',name:'IT / cloud / security',owner:'Finance',values:[1.5,2,3,3]},
 {id:'recruitment',name:'Recruitment / relocation',owner:'Finance',values:[1,2,3,2]},
 {id:'field',name:'Demonstrations / field support',owner:'Finance',values:[2,3,4,4]},
 {id:'ga',name:'G&A / insurance / finance',owner:'Finance',values:[2,2,3,4]},
 {id:'contingency',name:'Setup / contingency',owner:'Finance',values:[3,4.75,1.25,.25]},
 {id:'tot',name:'Technology-transfer execution',owner:'JSW',values:[5,12,6,2]},
];
export type Amount = number | null;
export type BudgetField = 'ytdBudget'|'actual'|'committed'|'forecast';
export type Tracking = Record<string, Partial<Record<BudgetField,Amount>>>;
export const totalKnown = (values: Amount[]): Amount => values.length && values.every(v=>v!==null) ? values.reduce<number>((s,v)=>s+v!,0) : null;
export const fiscalYear = (date: string): Year | null => ANNUAL.find(p=>date>=p.start&&date<p.end)?.year ?? null;
export const inYear = (date:string, year:Year) => fiscalYear(date)===year;
export const delta = (forecast:Amount,budget:number): Amount => forecast===null?null:forecast-budget;
export const trackingKey = (year:Year,id:string) => `${year}:${id}`;
export const tracked = (t:Tracking,year:Year,id:string,field:BudgetField):Amount => t[trackingKey(year,id)]?.[field] ?? null;
export const aggregate = (t:Tracking,year:Year,ids:string[],field:BudgetField) => totalKnown(ids.map(id=>tracked(t,year,id,field)));
export const LANES = ['Service programmes / RFPs','Customer expansion','OEM integrations','PSU / other partnerships'] as const;
export type Lane = typeof LANES[number];
// Suggested target allocation, distinct from named or qualified pipeline.
export const LANE_SHARES = [.55,.20,.15,.10];
export interface Pursuit { id:string; customer:string; scope:string; value:number; close:string; lane:Lane; stage:'Discovery'|'Qualified'|'Proposal'|'Negotiation'|'Signed'; owner:string; next:string; evidence:string; signed:string; group:string; primary:boolean; illustrative:boolean }
export function pursuitMetrics(rows:Pursuit[],year:Year,asOf:string) {
 const valid=rows.filter(r=>r.primary&&r.evidence.trim()&&!r.illustrative);
 const eligible=valid.filter((r,i,a)=>a.findIndex(x=>(x.group||x.id)===(r.group||r.id))===i);
 const signed=eligible.filter(r=>r.stage==='Signed'&&r.signed&&r.signed<=asOf&&inYear(r.signed,year));
 const open=eligible.filter(r=>r.stage!=='Signed'&&inYear(r.close,year));
 const qualified=open.filter(r=>r.stage!=='Discovery');
 const expected=qualified.filter(r=>r.stage==='Negotiation'&&r.close>=asOf);
 const ninety=expected.filter(r=>(Date.parse(r.close)-Date.parse(asOf))/86400000<=90);
 const sum=(a:Pursuit[])=>a.reduce((s,r)=>s+r.value,0);
 return {signed:sum(signed),signedCount:signed.length,qualified:sum(qualified),qualifiedRows:qualified,forecast:sum(signed)+sum(expected),ninety:sum(ninety),ninetyCount:ninety.length,eligible,open};
}
export interface Position {id:string;year:Year;role:string;budget:Amount;cost:Amount;start:string;planned:string;owner:string}
export const positionVariance = (p:Position):Amount => p.budget===null||p.cost===null?null:p.cost-p.budget;
export interface FinancialMilestone {id:string;year:Year;label:string;area:'Operations'|'JSW Partnership';due:string;forecast:string;value:Amount;owner:string;status:'Pending'|'At risk'|'Accepted';group:string;primary:boolean}
export const revenueAtRisk = (rows:FinancialMilestone[],year:Year,area:FinancialMilestone['area']):Amount => {
 const scope=rows.filter(r=>r.year===year&&r.area===area&&r.primary);
 if(!scope.length)return null;
 const unique=scope.filter((r,i,a)=>a.findIndex(x=>(x.group||x.id)===(r.group||r.id))===i);
 if(unique.some(r=>r.value===null))return null;
 return unique.filter(r=>r.status!=='Accepted'&&(r.status==='At risk'||r.forecast>r.due)).reduce((s,r)=>s+r.value!,0);
};
export interface EngineeringItem {id:string;year:Year;label:string;owner:string;due:string;forecast:string;accepted:string;milestone:string;fte:Amount;available:Amount}
export const engineeringRisk = (rows:EngineeringItem[],year:Year,asOf:string) => rows.filter(r=>r.year===year&&!r.accepted&&(r.forecast>r.due||r.due<asOf));
export interface PlanState { tracking:Tracking;pursuits:Pursuit[];positions:Position[];milestones:FinancialMilestone[];engineering:EngineeringItem[];registerComplete:Partial<Record<Year,boolean>>; }
export const EMPTY_STATE:PlanState = {tracking:{},pursuits:[],positions:[],milestones:[],engineering:[],registerComplete:{}};
