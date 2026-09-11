import { ANNUAL } from '@/data/md-plan';
import { inr } from '@/data/md-scenario';
import { OPPORTUNITIES, nearClosure, formatUsdMillionsInInr, engineeringMetrics, TRANSFER_PACKAGES } from '@/data/md-scenario';
import { AS_OF, BLOCKERS, COSTS, CRITICAL_JOINING_GAPS, DELIVERY, FUNDING_COVERAGE, JSW, JSW_DECISIONS, date, days, type Area } from '@/data/md-scenario';
import { Badge, Cards, Metric, Panel, Table } from './Shared';
export default function Overview({ navigate }: { navigate: (area: Area, filter?: string, section?: string)=>void }) {
 const decisions=[...BLOCKERS,...JSW_DECISIONS.filter(d=>d.status==='Pending').map(d=>({...d,area:'JSW Partnership' as Area}))];
 const milestones=[...DELIVERY,...JSW].filter(m=>days(AS_OF,m.due)>=0).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,5);
 const atRisk=DELIVERY.filter(m=>days(m.due,m.forecast)>0);
 const next=atRisk[0];
 const movement=next?days(next.previous,next.forecast):0;
 const actual=COSTS.reduce((s,c)=>s+c.actual,0), budget=COSTS.reduce((s,c)=>s+c.budget,0);
 const delta=actual-budget;
 const signed=(n:number)=>`${n>0?'+':''}${n}`;
 return <>
 <div className="mc-overview-six"><Cards>
<Metric label="Delivery at risk" value={`${atRisk.length} milestones`} sub={`${signed(movement)} days WoW`} tone="mc-amber" onClick={()=>navigate('Operations','At risk','operations-schedule')}/>
<Metric label="Critical engineering blockers" value={engineeringMetrics('army').blockers.length} onClick={()=>navigate('Engineering','All','engineering-blockers')}/>
<Metric label="Critical hiring gaps" value={`${CRITICAL_JOINING_GAPS.length} roles`} onClick={()=>navigate('HR','Joining gaps','hr-joining')}/>
<Metric label="JSW production transfer accepted" value={`${TRANSFER_PACKAGES.Production.filter(t=>t.accepted).length} / ${TRANSFER_PACKAGES.Production.length}`} onClick={()=>navigate('JSW Partnership','All','jsw-transfer-acceptance')}/>
<Metric label="India opex budget · FY26–27" value={inr(ANNUAL[1].opex)} sub="Annual model plan" onClick={()=>navigate('Finance and Legal','All','finance-spending')}/>
<Metric label="Order closure target · FY26–27" value={inr(ANNUAL[1].orders)} sub="Annual model plan" onClick={()=>navigate('Business Development','All','bd-plan')}/>
</Cards></div>
 <Panel title="Decisions required" aside={<Badge tone="amber">{decisions.length} open</Badge>}>
  <Table headers={['Due','Decision','Impact','Action']}>
   {decisions.slice().sort((a,b)=>a.due.localeCompare(b.due)).map(b=><tr key={b.id}>
    <td>{date(b.due).slice(0,6)}</td><th scope="row">{b.label}</th><td>{b.impact}</td>
    <td><button className="mc-link" aria-label={`Open ${b.label}`} onClick={()=>navigate(b.area,b.area==='Operations'?'At risk':undefined)}>Open ↗</button></td>
   </tr>)}
  </Table>
 </Panel>
 <Panel title="Upcoming commitments">
  <Table headers={['Milestone','Agreed','Forecast','Weekly change']}>
   {milestones.map(m=><tr key={m.id}><th scope="row"><button className="mc-link" onClick={()=>navigate(m.project==='jsw'?'JSW Partnership':'Operations')}>{m.label}</button></th><td>{date(m.due)}</td><td>{date(m.forecast)}</td><td><Badge tone={days(m.previous,m.forecast)>0?'amber':''}>{days(m.previous,m.forecast)===0?'No change':`${signed(days(m.previous,m.forecast))} days`}</Badge></td></tr>)}
  </Table>
 </Panel>
 </>;
}
