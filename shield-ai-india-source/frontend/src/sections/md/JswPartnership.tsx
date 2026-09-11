import { targetTone, dueTone, metricTone } from './status';
import { highlightSection } from './useSectionLink';
import JswFinancialTracker from './JswFinancialTracker';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AS_OF, JSW, JSW_DECISIONS, VENDOR_AREAS, JSW_NEXT_GATE, TRANSFER_PACKAGES, date, days } from '@/data/md-scenario';
import { Badge, Cards, Choice, Empty, Gantt, Metric, Panel, Table } from './Shared';

export default function JswPartnership() {
 const location=useLocation(),navigate=useNavigate();
 const [risk, setRisk] = useState('All');
 const [tab, setTab] = useState<keyof typeof TRANSFER_PACKAGES>('Production');
 const reveal=(id:string)=>{
  if(!['jsw-transfer-acceptance','jsw-vendor-onboarding','jsw-readiness','jsw-decisions'].includes(id))return;
  if(id==='jsw-transfer-acceptance')setTab('Production');
  if(id==='jsw-readiness')setRisk('All');
  const target=document.getElementById(id);
  if(target instanceof HTMLDetailsElement)target.open=true;
  const child=target?.querySelector(':scope > details');
  if(child instanceof HTMLDetailsElement)child.open=true;
  if(target)highlightSection(target);
  target?.focus({preventScroll:true});
  target?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 };
 useEffect(()=>{
  const frame=requestAnimationFrame(()=>reveal(location.hash.slice(1)));
  return ()=>cancelAnimationFrame(frame);
 },[location.hash]);
 const jump=(id:string)=>{
  if(location.hash===`#${id}`){reveal(id);return;}
  const params=new URLSearchParams(location.search);params.set('area','jsw-partnership');
  navigate({pathname:location.pathname,search:params.toString(),hash:id});
 };
 const ready = VENDOR_AREAS.filter(p => p.stage === 'Onboarded');
 const production = TRANSFER_PACKAGES.Production;
 const readiness = JSW_NEXT_GATE;
 const variance = days(readiness.due, readiness.forecast);
 const decisions = JSW_DECISIONS.filter(d => d.status === 'Pending').sort((a,b) => a.due.localeCompare(b.due));
 const transfers = TRANSFER_PACKAGES[tab];
 const overdue = transfers.filter(t => !t.accepted && t.due < AS_OF).length;
 const rows = JSW.filter(m => risk === 'All' || (!m.forecastPending && days(m.due,m.forecast)>0) || (m.id==='vendors' && TRANSFER_PACKAGES['Supplier enablement'].some(t=>!t.accepted && t.due<AS_OF)));
 const shownTransfers = [...transfers].sort((a,b)=>Number(a.accepted)-Number(b.accepted)||a.due.localeCompare(b.due));
 return <>
  <Cards>
   <Metric onClick={()=>jump('jsw-decisions')} tone={decisions.length?decisions.some(d=>d.due<AS_OF)?'mc-red':'mc-amber':'mc-green'} label="Decisions pending" value={`${decisions.length} pending`} sub={decisions.length ? `Earliest due: ${date(decisions[0].due)}` : 'No pending decisions'} />
   <Metric onClick={()=>jump('jsw-readiness')} label="Next readiness gate" value={date(readiness.forecast)} sub={`${readiness.label} · ${variance>0?`${variance} days late`:'on schedule'}`} tone={variance>0?'mc-red':'mc-green'} />
   <Metric onClick={()=>jump('jsw-transfer-acceptance')} tone={metricTone(targetTone(production.filter(t=>t.accepted).length,production.length,production.some(t=>!t.accepted&&t.due<AS_OF)))} label="Transfer accepted" value={`${production.filter(t => t.accepted).length} / ${production.length}`} sub={`Production · ${production.filter(t=>!t.accepted).length} awaiting acceptance`} />
   <Metric onClick={()=>jump('jsw-vendor-onboarding')} tone={metricTone(targetTone(ready.length,VENDOR_AREAS.length,VENDOR_AREAS.some(v=>v.stage!=='Onboarded'&&v.due<AS_OF)))} label="Vendor readiness" value={`${ready.length}/${VENDOR_AREAS.length} areas`} sub={`${VENDOR_AREAS.length-ready.length} in progress`} />
  </Cards>

  <Panel id="jsw-decisions" title="Decisions pending" aside={<span>{decisions.length} pending{decisions.length > 0 && ` · earliest due ${date(decisions[0].due)}`}</span>}><Table headers={['Decision','Owner','Due','Action']}>{decisions.map(d=><tr key={d.id}><th scope="row"><span >{d.label}</span></th><td>{d.owner}</td><td>{date(d.due)}</td><td>{d.action}</td></tr>)}</Table></Panel>
  <div className="mc-jsw-compact">
  <div id="jsw-readiness" tabIndex={-1} style={{scrollMarginTop:16}}><Panel collapsible={false} title="Joint readiness Gantt" aside={<Choice label="JSW risk filter" value={risk} options={['All','At risk']} onChange={setRisk}/>}>
   {rows.length ? <Gantt items={rows}  initial="18 months" horizons={['18 months']}/> : <Empty text="No workstreams match this filter."/>}
  </Panel></div>
  </div>
  <Panel id="jsw-transfer-acceptance" title="Transfer acceptance" aside={<Choice label="Transfer package" value={tab==='Supplier enablement'?'Suppliers':tab} options={['Production','Suppliers','MRO']} onChange={v=>setTab((v==='Suppliers'?'Supplier enablement':v) as keyof typeof TRANSFER_PACKAGES)}/>}>
   <div className="mc-strip"><span>Accepted <b>{transfers.filter(t=>t.accepted).length}/{transfers.length}</b></span><span>Due by snapshot <b>{transfers.filter(t=>t.due<=AS_OF).length}</b></span><span>Overdue <b className={overdue?'mc-red':'mc-green'}>{overdue}</b></span></div>
   <Table headers={['Deliverable','Due','Status']}>{shownTransfers.map(t=><tr key={t.id}><th scope="row"><span >{t.label}</span></th><td>{date(t.due)}</td><td><Badge tone={dueTone(t.due,AS_OF,t.accepted)}>{t.accepted?'Accepted':t.due<AS_OF?'Overdue':'Pending'}</Badge></td></tr>)}</Table>
   {!shownTransfers.length&&<Empty text="No transfer deliverables in this package."/>}
  </Panel>
  <div id="jsw-vendor-onboarding" tabIndex={-1} style={{scrollMarginTop:16}}><Panel title="Vendor onboarding">
   <Table headers={['Capability area','Stage','Owner','Next gate / date']}>{VENDOR_AREAS.map(v=><tr key={v.id}><th scope="row"><span >{v.label}</span></th><td><Badge tone={dueTone(v.due,AS_OF,v.stage==='Onboarded')}>{v.stage}</Badge></td><td>{v.jswOwner}</td><td>{v.nextAction} · {date(v.due)}</td></tr>)}</Table>
  </Panel></div>
  <JswFinancialTracker />
 </>;
}
