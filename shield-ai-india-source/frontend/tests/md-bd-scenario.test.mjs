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
  assert.deepEqual(years.map(y=>y.pipelineValue),[200,1800,3000,4800]);
  assert.deepEqual(years.map(y=>y.orderValue),[200,60,600,1200]);
  assert.deepEqual(years.map(y=>y.contractCount),[1,2,14,28]);
  assert.deepEqual(['B2B','B2G','PSUs'].map(s=>sumBd(years[1].open.filter(o=>o.segment===s))),[360,1260,180]);
  assert.equal(sumBd(years[1].near),150);
  assert.equal(years[1].near.length,2);
  assert.equal(sumBd(BD_OPEN_DEALS),years.slice(1).reduce((sum,y)=>sum+y.pipelineValue,0));
  assert.ok(BD_OPEN_DEALS.every(o=>o.stage<STAGES[o.segment].length-1));
  assert.ok(BD_BOOKED_DEALS.every(o=>o.stage===STAGES[o.segment].length-1));
  assert.equal(new Set([...BD_OPEN_DEALS,...BD_BOOKED_DEALS].map(o=>o.id)).size,BD_OPEN_DEALS.length+BD_BOOKED_DEALS.length);
  assert.ok(years.every((y,i)=>y.pipelineDeals.every(o=>inYear(o.close,YEARS[i]))));
  assert.equal(years[2].open.find(o=>o.id==='psu-b').close,'2028-03-31');
  assert.equal(years[3].open.find(o=>o.id==='army-follow').close,'2028-04-01');
  assert.deepEqual(['B2B','B2G','PSUs'].map(s=>sumBd(years[2].open.filter(o=>o.segment===s))),[600,2100,300]);
  assert.deepEqual(['B2B','B2G','PSUs'].map(s=>sumBd(years[3].open.filter(o=>o.segment===s))),[960,3360,480]);
  assert.ok(years.slice(2).every(y=>y.open.some(o=>o.stage>=2&&o.due<'2027-04-01')));
  assert.equal(years[0].past,true);
  assert.equal(years[2].future,true);
  const {default:BusinessDevelopment}=await server.ssrLoadModule('/src/sections/md/BusinessDevelopment.tsx');
  const html=renderToStaticMarkup(createElement(MemoryRouter,null,createElement(BusinessDevelopment)));
  for(const amount of ['₹1,800 Cr','₹60 Cr','₹150 Cr','₹3,000 Cr','₹300 Cr']) assert.ok(html.includes(amount),amount);
  for(const empty of ['Awaiting update','No forecast closures','Historical data unavailable','Orders confirmed','BD scenario assumptions','assumed 80%']) assert.ok(!html.includes(empty),empty);
  assert.ok(html.includes('Orders booked'));
  assert.ok(!html.includes('Orders booked · assumed'));
  assert.ok(!html.includes('Total open pipeline · all financial years'));
  const renderScope = fy => renderToStaticMarkup(createElement(MemoryRouter,{initialEntries:[`/?area=business-development&fy=${encodeURIComponent(fy)}`]},createElement(BusinessDevelopment)));
  const allHtml=renderScope('All');
  assert.ok(allHtml.includes('Total open pipeline · all financial years'));
  for(const amount of ['₹9,600 Cr','₹1,920 Cr','₹6,720 Cr','₹960 Cr']) assert.ok(allHtml.includes(amount),amount);
  assert.ok(allHtml.includes('Open opportunities'));
  assert.ok(!allHtml.includes('Orders booked'));
  assert.ok(!allHtml.includes('Planned pursuits'));
  assert.ok(!allHtml.includes('bd-near-closure'));
  for(const year of YEARS){
   const scopedHtml=renderScope(year);
   assert.ok(!scopedHtml.includes('Total open pipeline · all financial years'),year);
   assert.ok(scopedHtml.includes(`Pipeline developed · ${year}`)||scopedHtml.includes(`Open pipeline · ${year}`),year);
  }
 } finally {await server.close();}
});
