import { useState } from 'react';
import { AS_OF, JSW, JSW_DECISIONS, VENDOR_AREAS, JSW_NEXT_GATE, TRANSFER_PACKAGES, date, days } from '@/data/md-scenario';
import { Badge, Cards, Choice, Empty, Gantt, Metric, Panel, Table, type Inspect } from './Shared';

export default function JswPartnership({ inspect }: { inspect: Inspect }) {
 const [risk, setRisk] = useState('All');
 const [tab, setTab] = useState<keyof typeof TRANSFER_PACKAGES>('Production');
 const [acceptance, setAcceptance] = useState('Pending');
 const ready = VENDOR_AREAS.filter(p => p.stage === 'Onboarded');
 const production = TRANSFER_PACKAGES.Production;
 const readiness = JSW_NEXT_GATE;
 const variance = days(readiness.due, readiness.forecast);
 const decisions = JSW_DECISIONS.filter(d => d.status === 'Pending').sort((a,b) => a.due.localeCompare(b.due));
 const transfers = TRANSFER_PACKAGES[tab];
 const overdue = transfers.filter(t => !t.accepted && t.due < AS_OF).length;
 const rows = JSW.filter(m => risk === 'All' || (!m.forecastPending && days(m.due,m.forecast)>0) || (m.id==='vendors' && TRANSFER_PACKAGES['Supplier enablement'].some(t=>!t.accepted && t.due<AS_OF)));
 const shownTransfers = transfers.filter(t => acceptance === 'All' || (acceptance === 'Pending' ? !t.accepted : !t.accepted && t.due < AS_OF));
 return <>
  <div className="mc-jsw-caption"><Badge>Illustrative planning snapshot</Badge><span>As of {date(AS_OF)}</span></div>
  <Cards>
   <Metric label="Transfer accepted" value={`${production.filter(t => t.accepted).length} / ${production.length}`} sub={`Production · ${production.filter(t=>!t.accepted).length} awaiting acceptance`} onClick={() => inspect({title:'Production transfer acceptance', rows:production.filter(t=>!t.accepted).map(t=>[t.label,`${t.owner} → ${t.receiver} · due ${date(t.due)}`])})}/>
   <Metric label="Vendor onboarding coverage" value={`${ready.length}/${VENDOR_AREAS.length} areas`} sub={`${VENDOR_AREAS.length-ready.length} in progress`} onClick={()=>inspect({title:'Vendor onboarding coverage',rows:[['Definition','Capability areas with technically approved, commercially onboarded vendors. Not a unique-vendor count or delivered supply.'],...VENDOR_AREAS.map(v=>[v.label,`${v.stage} · ${v.nextAction} · ${date(v.due)}`] as [string,string])]})}/>
   <Metric label="Next joint readiness gate" value={date(readiness.forecast)} sub={`${readiness.label} · ${variance>0?`${variance} days late`:'on schedule'}`} tone={variance>0?'mc-amber':''} onClick={()=>inspect({title:readiness.label,rows:[['Baseline',date(readiness.due)],['Forecast',date(readiness.forecast)],['Owner',readiness.owner],['Prerequisites',readiness.dependency]]})}/>
   <Metric label="MD decisions required" value={`${decisions.length} pending`} sub={decisions.length ? `Earliest due: ${date(decisions[0].due)}` : 'No pending decisions'} onClick={()=>inspect({title:'MD decisions required',rows:decisions.flatMap(d=>[[d.label,`${d.owner} · due ${date(d.due)}`],['Decision / impact',`${d.action} ${d.impact}`],['Closure evidence',d.evidence]] as [string,string][])})}/>
  </Cards>
  <div className="mc-jsw-compact">
  <Panel title="Joint readiness Gantt" aside={<Choice label="JSW risk filter" value={risk} options={['All','At risk']} onChange={setRisk}/>}>
   {rows.length ? <Gantt items={rows} inspect={inspect} horizons={['6 months','18 months']}/> : <Empty text="No workstreams match this filter."/>}
  </Panel>
  <Panel title="Vendor onboarding">
   <Table headers={['Capability area','Stage','Owner','Next gate / date']}>{VENDOR_AREAS.map(v=><tr key={v.id}><th scope="row"><button className="mc-link" onClick={()=>inspect({title:v.label,rows:[['Stage',v.stage],['Shield owner',v.shieldOwner],['JSW owner',v.jswOwner],['Next gate',v.nextAction],['Due',date(v.due)],['Acceptance evidence',v.evidence],['Scope','Illustrative capability area for vendor evaluation and onboarding. Manufacturing, integration or support scope requires agreement; no supply delivery implied.']]})}>{v.label}</button></th><td><Badge tone={v.stage==='Onboarded'?'green':''}>{v.stage}</Badge></td><td>{v.jswOwner}</td><td>{v.nextAction} · {date(v.due)}</td></tr>)}</Table>
  </Panel>
  </div>
  <details className="mc-jsw-fold"><summary>Transfer acceptance <span>{Object.entries(TRANSFER_PACKAGES).map(([key,items])=>`${key} ${items.filter(t=>t.accepted).length}/${items.length}${items.every(t=>t.due>AS_OF)?' · none due':''}`).join(' · ')}</span></summary>
  <Panel title="Transfer acceptance" aside={<Choice label="Transfer package" value={tab} options={Object.keys(TRANSFER_PACKAGES)} onChange={v=>{setTab(v as keyof typeof TRANSFER_PACKAGES);setAcceptance('Pending');}}/>}>
   <div className="mc-strip"><span>Accepted <b>{transfers.filter(t=>t.accepted).length}/{transfers.length}</b></span><span>Due by snapshot <b>{transfers.filter(t=>t.due<=AS_OF).length}</b></span><span>Overdue <b className={overdue?'mc-amber':''}>{overdue}</b></span><Choice label="Transfer status" value={acceptance} options={['All','Pending','Overdue']} onChange={setAcceptance}/></div>
   <Table headers={['Deliverable','Shield owner','JSW receiver','Due','Acceptance']}>{shownTransfers.map(t=><tr key={t.id}><th scope="row"><button className="mc-link" onClick={()=>inspect({title:t.label,rows:[['Package',tab],['Shield owner',t.owner],['JSW receiver',t.receiver],['Due',date(t.due)],['Acceptance',t.accepted?'Accepted · 30 Sep 2026 (illustrative)':t.due<AS_OF?'Overdue':'Pending · not overdue'],['Acceptance criteria','Receiving-owner sign-off against agreed scope. Training requires demonstrated capability; supplier onboarding requires technical approval and JSW acceptance.'],['Evidence',t.accepted?'Illustrative sign-off; no source document attached.':'Awaiting receiving-owner evidence.']]})}>{t.label}</button></th><td>{t.owner}</td><td>{t.receiver}</td><td>{date(t.due)}</td><td><Badge tone={t.accepted?'green':t.due<AS_OF?'amber':''}>{t.accepted?'Accepted':t.due<AS_OF?'Overdue':'Pending'}</Badge></td></tr>)}</Table>
   {!shownTransfers.length&&<Empty text="No transfer deliverables match this filter."/>}
  </Panel>
  </details>
  <details className="mc-jsw-fold"><summary>MD decisions <span>{decisions.length} pending · earliest due {date(decisions[0].due)}</span></summary><Table headers={['Decision','Owner','Due','Action']}>{decisions.map(d=><tr key={d.id}><th scope="row"><button className="mc-link" onClick={()=>inspect({title:d.label,rows:[['Owner',d.owner],['Due',date(d.due)],['Action',d.action],['Impact',d.impact],['Closure evidence',d.evidence]]})}>{d.label}</button></th><td>{d.owner}</td><td>{date(d.due)}</td><td>{d.action}</td></tr>)}</Table></details>
 </>;
}
