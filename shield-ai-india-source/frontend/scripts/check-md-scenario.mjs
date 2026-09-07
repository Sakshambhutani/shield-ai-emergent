import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server=await createServer({server:{middlewareMode:true}});
try {
 const s=await server.ssrLoadModule('/src/data/md-scenario.ts');
 const sum=(rows,key)=>rows.reduce((a,r)=>a+r[key],0);
 assert.equal(sum(s.PAYMENTS,'amount'),s.ARMY.value);
 assert.equal(s.ARMY.value,500);
 assert.equal(sum(s.REVENUE_PLAN,'amount'),s.ARMY.value);
 assert.equal(s.RECOGNISED_REVENUE,0);
 assert.equal(s.CURRENT_HEADCOUNT,20);
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
