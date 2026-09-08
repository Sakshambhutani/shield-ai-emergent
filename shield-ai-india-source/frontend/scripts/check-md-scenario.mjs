import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server=await createServer({server:{middlewareMode:true}});
try {
 const s=await server.ssrLoadModule('/src/data/md-scenario.ts');
 const sum=(rows,key)=>rows.reduce((a,r)=>a+r[key],0);
 assert.deepEqual(s.DELIVERY_ACCEPTANCE,{due:0,onTime:0,percentage:null});
 const acceptanceCases=[
  {due:'2026-10-10',acceptedAt:'2026-10-10'},
  {due:'2026-10-11',acceptedAt:'2026-10-12'},
  {due:'2026-10-12'},
  {due:'2026-11-01',acceptedAt:'2026-10-15'},
  {due:'2026-09-30',acceptedAt:'2026-09-30'},
 ];
 assert.deepEqual(s.milestoneAcceptance(acceptanceCases,'2026-10-01','2026-10-31'),{due:3,onTime:1,percentage:33});

 assert.equal(sum(s.PAYMENTS,'amount'),s.ARMY.value);
 assert.equal(s.ARMY.value,20);
 assert.equal(sum(s.REVENUE_PLAN,'amount'),s.ARMY.value);
 assert.equal(s.RECOGNISED_REVENUE,0);
 assert.equal(s.CURRENT_HEADCOUNT,20);
 const engineering=s.engineeringMetrics('army');
 assert.equal(engineering.percentage,80);
 assert.equal(engineering.due.length,5);
 assert.equal(engineering.blockers.length,2);
 assert.equal(engineering.oldest,10);
 assert.equal(s.engineeringMetrics('oem-isr').percentage,100);
 assert.equal(s.engineeringMetrics('oem-isr').blockers.length,1);
 for(const link of s.ENGINEERING_BLOCKER_LINKS){
  const commitment=s.ENGINEERING_COMMITMENTS.find(c=>c.id===link.commitment);
  const blocker=s.BLOCKERS.find(b=>b.id===link.blocker);
  assert.ok(commitment&&blocker);
  assert.equal(commitment.project,blocker.project);
 }

 assert.equal(s.CRITICAL_JOINING_GAPS.length,2);
 assert.equal(s.JOINING_COMMITMENTS.filter(r=>r.confirmed).length,sum(s.ROLES,'accepted'));
 assert.ok(s.CRITICAL_JOINING_GAPS.every(r=>s.days(s.AS_OF,r.due)<=30));
 assert.equal(sum(s.ROLES,'count'),s.TARGET_HEADCOUNT-s.BASE_HEADCOUNT);
 assert.equal(sum(s.HIRING_PLAN,'planned'),30);
 assert.equal(sum(s.CAPACITY,'current'),20);
 assert.equal(sum(s.CAPACITY,'target'),50);
 assert.equal(sum(s.CAPACITY,'assigned'),20);
 assert.ok(Math.abs(s.MONTHLY_PAYROLL-10/12)<1e-10);
 assert.ok(Math.abs(s.CASH_FORECAST[5].payroll-25/12)<1e-10);
 assert.equal(s.CASH_CURVE.length,18);
 assert.equal(s.FUNDING_COVERAGE,18);
 assert.ok(s.CASH_CURVE.every(m=>m.balance>=0),'Funding must be available when expenditure is due');
 assert.ok(Math.abs(s.CASH_CURVE.at(-1).balance)<1e-8);
 assert.ok(Math.abs(s.CURRENT_CASH+s.CONFIRMED_FUNDING-sum(s.CASH_FORECAST,'burn'))<1e-8);
 assert.equal(s.OPPORTUNITIES.filter(s.nearClosure).length,0);
 assert.equal(s.OPPORTUNITIES.filter(o=>o.backed).length,1);
 assert.equal(s.TRANSFERS.filter(t=>t.accepted).length,6);
 for(const role of s.ROLES) assert.ok(role.screening+role.interviewing+role.offered+role.accepted+role.joined<=role.applied);
 for(const o of s.OPPORTUNITIES) assert.ok(s.STAGES[o.segment][o.stage]);
 for(const m of [...s.DELIVERY,...s.JSW]) {assert.ok(s.days(m.start,m.due)>=0);assert.ok(s.days(m.start,m.forecast)>=0);assert.ok(m.progress>=0&&m.progress<=100);}
 for(const p of s.PAYMENTS.filter(p=>p.milestone!=='advance')) assert.ok(s.DELIVERY.find(m=>m.id===p.milestone));
 for(const b of s.BLOCKERS.filter(b=>b.milestone)) assert.ok([...s.DELIVERY,...s.JSW].find(m=>m.id===b.milestone));
 console.log('PASS: salary, headcount, candidate stages, 18-month cash, order/receipt reconciliation and linked milestones.');
} finally {await server.close();}
