import { AS_OF, BLOCKERS, COSTS, CRITICAL_JOINING_GAPS, DELIVERY, FUNDING_COVERAGE, JSW, date, days, type Area } from '@/data/md-scenario';
import { Badge, Cards, Metric, Panel, Table } from './Shared';
export default function Overview({ navigate }: { navigate: (area: Area, filter?: string)=>void }) {
 const milestones=[...DELIVERY,...JSW].filter(m=>days(AS_OF,m.due)>=0).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,5);
 const atRisk=DELIVERY.filter(m=>days(m.due,m.forecast)>0);
 const next=atRisk[0];
 const movement=next?days(next.previous,next.forecast):0;
 const actual=COSTS.reduce((s,c)=>s+c.actual,0), budget=COSTS.reduce((s,c)=>s+c.budget,0);
 const delta=actual-budget;
 const signed=(n:number)=>`${n>0?'+':''}${n}`;
 return <>
 <Cards>
  <Metric label="Delivery at risk" value={`${atRisk.length} milestones`} sub={`${signed(movement)} days WoW`} tone="mc-amber" onClick={()=>navigate('Operations','At risk')}/>
  <Metric label="Critical hiring gaps" value={`${CRITICAL_JOINING_GAPS.length} roles`} onClick={()=>navigate('HR','Joining gaps')}/>
  <Metric label="Funding coverage" value={`${FUNDING_COVERAGE} months`} onClick={()=>navigate('Finance and Legal')} tone="mc-green"/>
  <Metric label="Budget variance · Sep" value={`${delta>0?'+':''}${(delta/budget*100).toFixed(1)}%`} sub={`₹${Math.abs(delta*100).toFixed(0)}L ${delta>=0?'over':'under'}`} tone={delta>0?'mc-amber':''} onClick={()=>navigate('Finance and Legal')}/>
 </Cards>
 <Panel title="Decisions required" aside={<Badge tone="amber">{BLOCKERS.length} open</Badge>}>
  <Table headers={['Due','Decision','Impact','Action']}>
   {BLOCKERS.slice().sort((a,b)=>a.due.localeCompare(b.due)).map(b=><tr key={b.id}>
    <td>{date(b.due).slice(0,6)}</td><th scope="row">{b.label}</th><td>{b.impact}</td>
    <td><button className="mc-link" aria-label={`Open ${b.label}`} onClick={()=>navigate(b.area,b.area==='Operations'?'At risk':undefined)}>Open ↗</button></td>
   </tr>)}
  </Table>
 </Panel>
 <Panel title="Upcoming commitments">
  <Table headers={['Milestone','Agreed','Forecast','Weekly change']}>
   {milestones.map(m=><tr key={m.id}><th scope="row"><button className="mc-link" onClick={()=>navigate(m.project==='jsw'?'JSW Partnership':'Operations')}>{m.label}</button></th><td>{date(m.due)}</td><td>{date(m.forecast)}</td><td><Badge tone={days(m.previous,m.forecast)>0?'amber':''}>{days(m.previous,m.forecast)===0?'—':`${signed(days(m.previous,m.forecast))} days`}</Badge></td></tr>)}
  </Table>
 </Panel>
 </>;
}
