import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

test('BD scenario reconciles annual, segment, booked and near-closure figures',async()=>{
 const server=await createServer({server:{middlewareMode:true},appType:'custom'});
 try {
  const {BD_OPEN_DEALS,BD_BOOKED_DEALS,bdScenario,sumBd}=await server.ssrLoadModule('/src/data/md-bd-scenario.ts');
  const {YEARS,inYear}=await server.ssrLoadModule('/src/data/md-plan.ts');
  const {STAGES}=await server.ssrLoadModule('/src/data/md-scenario.ts');
  const years=YEARS.map(bdScenario);
  assert.deepEqual(years.map(y=>y.pipelineValue),[200,105,1045,1200]);
  assert.deepEqual(years.map(y=>y.orderValue),[200,6,600,1200]);
  assert.deepEqual(years.map(y=>y.contractCount),[1,2,14,28]);
  assert.deepEqual(['B2B','B2G','PSUs'].map(s=>sumBd(years[1].open.filter(o=>o.segment===s))),[30,45,30]);
  assert.equal(sumBd(years[1].near),60);
  assert.equal(years[1].near.length,2);
  assert.equal(sumBd(BD_OPEN_DEALS),years.slice(1).reduce((sum,y)=>sum+y.pipelineValue,0));
  assert.ok(BD_OPEN_DEALS.every(o=>o.stage<STAGES[o.segment].length-1));
  assert.ok(BD_BOOKED_DEALS.every(o=>o.stage===STAGES[o.segment].length-1));
  assert.equal(new Set([...BD_OPEN_DEALS,...BD_BOOKED_DEALS].map(o=>o.id)).size,BD_OPEN_DEALS.length+BD_BOOKED_DEALS.length);
  assert.ok(years.every((y,i)=>y.pipelineDeals.every(o=>inYear(o.close,YEARS[i]))));
  assert.equal(years[2].open.find(o=>o.id==='psu-b').close,'2028-03-31');
  assert.equal(years[3].open.find(o=>o.id==='army-follow').close,'2028-04-01');
  assert.equal(years[0].past,true);
  assert.equal(years[2].future,true);
  const {default:BusinessDevelopment}=await server.ssrLoadModule('/src/sections/md/BusinessDevelopment.tsx');
  const html=renderToStaticMarkup(createElement(MemoryRouter,null,createElement(BusinessDevelopment)));
  for(const amount of ['₹105 Cr','₹6 Cr','₹60 Cr']) assert.ok(html.includes(amount),amount);
  for(const empty of ['Awaiting update','No forecast closures','Historical data unavailable','Orders confirmed','BD scenario assumptions','assumed 80%']) assert.ok(!html.includes(empty),empty);
  assert.ok(html.includes('Orders booked · assumed'));
 } finally {await server.close();}
});
