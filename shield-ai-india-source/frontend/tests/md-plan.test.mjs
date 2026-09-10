import test from 'node:test';
import assert from 'node:assert/strict';
import { ANNUAL, COST_HEADS, YEARS, LANE_SHARES, fiscalYear, totalKnown, aggregate, tracked, pursuitMetrics, revenueAtRisk, positionVariance, engineeringRisk } from '../src/data/md-plan.ts';

test('workbook cost heads reconcile with annual outflow and salary uses average HC',()=>{
 ANNUAL.forEach((p,i)=>{
  assert.ok(Math.abs(COST_HEADS.reduce((s,h)=>s+h.values[i],0)-(p.opex+p.execution))<1e-8);
  assert.ok(Math.abs(COST_HEADS[0].values[i]-p.average*.7)<1e-8);
  assert.equal(Math.max(0,p.opex+p.execution-p.revenue-p.tot),0);
 });
 assert.equal(LANE_SHARES.reduce((s,n)=>s+n,0),1);
});
test('April financial-year cutoff and unknown dates',()=>{
 assert.equal(fiscalYear('2027-03-31'),'FY26–27');assert.equal(fiscalYear('2027-04-01'),'FY27–28');assert.equal(fiscalYear(''),null);
});
test('missing actuals do not become zero; owner records consolidate exactly once',()=>{
 const t={'FY26–27:employee':{actual:0,forecast:21},'FY26–27:tot':{actual:3,forecast:12}};
 assert.equal(totalKnown([null,3]),null);assert.equal(totalKnown([]),null);assert.equal(totalKnown([0,3]),3);
 assert.equal(aggregate(t,'FY26–27',['employee','tot'],'actual'),3);
 assert.equal(aggregate(t,'FY26–27',['employee','tot','office'],'actual'),null);
 assert.equal(tracked(t,'FY27–28','employee','actual'),null);
});
const pursuit=(id,changes={})=>({id,customer:'Customer',scope:'Scope',value:20,close:'2026-12-01',lane:'OEM integrations',stage:'Negotiation',owner:'BD',next:'Sign',evidence:'Scope approval',signed:'',group:'',primary:true,illustrative:false,...changes});
test('closure forecast requires evidence, dates and unique commercial scope',()=>{
 const rows=[pursuit('signed',{stage:'Signed',signed:'2026-06-01',group:'deal'}),pursuit('duplicate',{stage:'Signed',signed:'2026-06-01',group:'deal'}),pursuit('expected'),pursuit('futureFY',{close:'2027-04-01'}),pursuit('noEvidence',{evidence:''}),pursuit('example',{illustrative:true}),pursuit('unsigned',{stage:'Signed'}),pursuit('secondary',{primary:false})];
 const r=pursuitMetrics(rows,'FY26–27','2026-10-01');assert.equal(r.signed,20);assert.equal(r.signedCount,1);assert.equal(r.qualified,20);assert.equal(r.forecast,40);assert.equal(r.ninety,20);
 assert.equal(pursuitMetrics(rows,'FY27–28','2026-10-01').ninety,0);
});
test('risk uses unique primary milestones, preserves missing values and filters FY',()=>{
 const m={id:'a',year:'FY26–27',area:'Operations',label:'Delivery',due:'2026-11-01',forecast:'2026-12-01',value:30,owner:'PM',status:'Pending',group:'same',primary:true};
 assert.equal(revenueAtRisk([m,{...m,id:'b'}],'FY26–27','Operations'),30);
 assert.equal(revenueAtRisk([{...m,value:null}],'FY26–27','Operations'),null);
 assert.equal(revenueAtRisk([{...m,status:'Accepted'}],'FY26–27','Operations'),0);
 assert.equal(revenueAtRisk([m],'FY27–28','Operations'),null);
});
test('role over-budget is judged against role budget, not blended rate',()=>{
 assert.equal(positionVariance({budget:100,cost:95}),-5);assert.equal(positionVariance({budget:50,cost:60}),10);assert.equal(positionVariance({budget:null,cost:60}),null);
});
test('engineering risk excludes completed and other-year commitments',()=>{
 const r={id:'a',year:'FY26–27',due:'2026-11-01',forecast:'2026-12-01',accepted:''};
 assert.equal(engineeringRisk([r,{...r,id:'b',accepted:'2026-10-01'},{...r,id:'c',year:'FY27–28'}],'FY26–27','2026-10-01').length,1);
});
