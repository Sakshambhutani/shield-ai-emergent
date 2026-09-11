import { targetTone, metricTone } from './status';
import { ANNUAL } from '@/data/md-plan';
import { ANNUAL_SPENDING } from '@/data/md-finance-spend';
import { bdScenario } from '@/data/md-bd-scenario';
import { inr } from '@/data/md-scenario';
import { engineeringMetrics, TRANSFER_PACKAGES } from '@/data/md-scenario';
import { AS_OF, BLOCKERS, CRITICAL_JOINING_GAPS, DELIVERY, JSW, JSW_DECISIONS, date, days, type Area } from '@/data/md-scenario';
import { Badge, Cards, Metric, Panel, Table } from './Shared';
export default function Overview({ navigate }: { navigate: (area: Area, filter?: string, section?: string)=>void }) {
 const decisions=[...BLOCKERS,...JSW_DECISIONS.filter(d=>d.status==='Pending').map(d=>({...d,area:'JSW Partnership' as Area}))];
 const milestones=[...DELIVERY,...JSW].filter(m=>days(AS_OF,m.due)>=0).sort((a,b)=>a.due.localeCompare(b.due)).slice(0,5);
 const atRisk=DELIVERY.filter(m=>days(m.due,m.forecast)>0);
 const engineeringBlockers=engineeringMetrics('army').blockers.length;
 const productionAccepted=TRANSFER_PACKAGES.Production.filter(t=>t.accepted).length;
 const productionTotal=TRANSFER_PACKAGES.Production.length;
 const overdueDecisions=decisions.filter(d=>days(d.due,AS_OF)>0).length;
 const next=atRisk[0];
 const movement=next?days(next.previous,next.forecast):0;
 const plan=ANNUAL.find(p=>p.start<=AS_OF&&AS_OF<p.end)!;
 const spending=ANNUAL_SPENDING.find(p=>p.label===plan.year)!;
 const orders=bdScenario(plan.year).orderValue;
 const orderProgress=plan.orders>0?Math.round(orders/plan.orders*100):null;
 const orderGap=Math.max(0,plan.orders-orders);
 const variance=spending.variance;
 const spendingStatus=variance===null?'Variance unavailable':variance===0?'On budget':`${inr(Math.abs(variance))} ${variance>0?'over':'under'} budget${spending.periodBudget?` (${(Math.abs(variance)/spending.periodBudget*100).toFixed(1)}%)`:''}`;
 const signed=(n:number)=>`${n>0?'+':''}${n}`;
 return <>
 <div className="mc-overview-six"><Cards>
<Metric label="Delivery at risk" value={`${atRisk.length} milestones`} sub={`${signed(movement)} days WoW`} tone={atRisk.length?'mc-red':'mc-green'} onClick={()=>navigate('Operations','At risk','operations-schedule')}/>
<Metric label="Critical engineering blockers" value={engineeringBlockers} tone={engineeringBlockers?'mc-red':'mc-green'} sub={engineeringBlockers?'Action required':'No critical blockers'} onClick={()=>navigate('Engineering','All','engineering-blockers')}/>
<Metric label="Critical hiring gaps" value={`${CRITICAL_JOINING_GAPS.length} roles`} tone={CRITICAL_JOINING_GAPS.length?'mc-red':'mc-green'} sub={CRITICAL_JOINING_GAPS.length?'Critical roles unfilled':'No critical gaps'} onClick={()=>navigate('HR','Joining gaps','hr-joining')}/>
<Metric label="JSW production transfer accepted" value={`${productionAccepted} / ${productionTotal}`} tone={!productionTotal?'':productionAccepted===productionTotal?'mc-green':'mc-amber'} sub={!productionTotal?'No packages registered':productionAccepted===productionTotal?'All packages accepted':'Acceptance pending'} onClick={()=>navigate('JSW Partnership','All','jsw-transfer-acceptance')}/>
<Metric label={`India spending vs budget · estimated · ${plan.year}`} target={spending.periodBudget===null?undefined:inr(spending.periodBudget)} targetLabel="budget" value={spending.spent===null?'Not available':inr(spending.spent)} sub={`Budget ${spending.periodBudget===null?'not available':inr(spending.periodBudget)} · ${spendingStatus} · Estimated ${spending.period}; opex + execution`} tone={variance===null?'':variance>0?'mc-red':'mc-green'} onClick={()=>navigate('Finance and Legal','All','finance-spending')}/>
<Metric label={`Orders booked to date · ${plan.year}`} value={inr(orders)} target={plan.orders>0?inr(plan.orders):undefined} sub={`${orderProgress===null?'No target':`${orderProgress}% of ${inr(plan.orders)} annual target`} · ${inr(orderGap)} remaining as of ${date(AS_OF)}; monthly plan not set`} tone={metricTone(targetTone(orders,plan.orders,plan.end<=AS_OF))} onClick={()=>navigate('Business Development','All','bd-orders')}/>
</Cards></div>
 <Panel title="Decisions required" aside={<Badge tone={overdueDecisions?'red':decisions.length?'amber':'green'}>{decisions.length} open{overdueDecisions?` · ${overdueDecisions} overdue`:''}</Badge>}>
  <Table headers={['Due','Decision','Impact','Action']}>
   {decisions.slice().sort((a,b)=>a.due.localeCompare(b.due)).map(b=><tr key={b.id}>
    <td><Badge tone={days(b.due,AS_OF)>0?'red':days(AS_OF,b.due)<=7?'amber':''}>{date(b.due).slice(0,6)}{days(b.due,AS_OF)>0?' · Overdue':days(AS_OF,b.due)<=7?' · Due soon':''}</Badge></td><th scope="row">{b.label}</th><td>{b.impact}</td>
    <td><button className="mc-link" aria-label={`Open ${b.label}`} onClick={()=>navigate(b.area,b.area==='Operations'?'At risk':undefined)}>Open ↗</button></td>
   </tr>)}
  </Table>
 </Panel>
 <Panel title="Upcoming commitments">
  <Table headers={['Milestone','Agreed','Forecast','Weekly change']}>
   {milestones.map(m=><tr key={m.id}><th scope="row"><button className="mc-link" onClick={()=>navigate(m.project==='jsw'?'JSW Partnership':'Operations')}>{m.label}</button></th><td>{date(m.due)}</td><td><Badge tone={m.forecastPending?'':days(m.due,m.forecast)>0?'red':'green'}>{m.forecastPending?'TBD':`${date(m.forecast)} · ${days(m.due,m.forecast)>0?'Late':'On time'}`}</Badge></td><td><Badge tone={m.forecastPending?'':days(m.previous,m.forecast)>0?'red':days(m.previous,m.forecast)<0?'green':days(m.due,m.forecast)>0?'amber':'green'}>{days(m.previous,m.forecast)===0?'No change':`${signed(days(m.previous,m.forecast))} days`}</Badge></td></tr>)}
  </Table>
 </Panel>
 </>;
}
