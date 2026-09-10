import { useSectionLink } from './useSectionLink';
import { useState } from 'react';
import { ARMY, AS_OF, BLOCKERS, DELIVERY, DELIVERY_ACCEPTANCE, date, days, formatUsdMillionsInInr } from '@/data/md-scenario';
import { Badge, Cards, Choice, Empty, Gantt, Metric, Panel, Table } from './Shared';
export default function Delivery({ initial='All' }: { initial?: string }) {
 const [filter,setFilter]=useState(initial); const next=DELIVERY[0];
 const jump=useSectionLink('Operations',(_id,params)=>setFilter(params.get('filter')||'All'));
 const rows=DELIVERY.filter(m=>(filter!=='At risk'||days(m.due,m.forecast)>0)&&(filter!=='Due · 90d'||days(AS_OF,m.due)>=0&&days(AS_OF,m.due)<=90));
 return <><Cards>
<Metric label="Next milestone variance" value={`+${days(next.due,next.forecast)} days`} sub={`+${days(next.previous,next.forecast)} days WoW`} tone="mc-amber" onClick={()=>jump('operations-schedule',{filter:'At risk'})}/>
<Metric label="Milestones completed / due · 90d" value={`${DELIVERY.filter(m=>days(AS_OF,m.due)>=0&&days(AS_OF,m.due)<=90&&m.progress===100).length} / ${DELIVERY.filter(m=>days(AS_OF,m.due)>=0&&days(AS_OF,m.due)<=90).length}`} onClick={()=>jump('operations-milestones',{filter:'Due · 90d'})}/>
<Metric onClick={()=>jump('operations-milestones',{filter:'All'})} label="Milestones accepted on time" value={DELIVERY_ACCEPTANCE.percentage === null ? `${DELIVERY_ACCEPTANCE.onTime} / ${DELIVERY_ACCEPTANCE.due}` : `${DELIVERY_ACCEPTANCE.percentage}%`} sub={DELIVERY_ACCEPTANCE.percentage === null ? 'accepted on time / due' : `${DELIVERY_ACCEPTANCE.onTime} / ${DELIVERY_ACCEPTANCE.due} due · programme to date`} />
<Metric label="Next acceptance receipt" value="Pending" sub="Collection timing absent from model"/>
</Cards>
 <div className="mc-controls"><label>Programme <select aria-label="Delivery programme"><option>{ARMY.name}</option></select></label><Choice label="Delivery milestone filter" value={filter} options={['All','At risk','Due · 90d']} onChange={setFilter}/></div>
 <Panel collapsible={false} id="operations-schedule" title="Delivery schedule" aside={<Badge>1 confirmed order</Badge>}><Gantt items={rows} initial="36 months" horizons={['36 months']} /></Panel>
 <Panel id="operations-milestones" title="Milestone commitments"><Table headers={['Milestone','Agreed date','Forecast','Movement','Owner']}>{rows.map(m=><tr key={m.id}><th scope="row"><span >{m.label}</span></th><td>{date(m.due)}</td><td>{date(m.forecast)}</td><td><Badge tone={days(m.due,m.forecast)>0?'amber':''}>{days(m.previous,m.forecast)>0?'+':''}{days(m.previous,m.forecast)}d / week</Badge></td><td>{m.owner}</td></tr>)}</Table>{!rows.length&&<Empty text="0 milestones in this selection"/>}</Panel>
 <Panel id="operations-blockers" title="Milestone blockers"><Table headers={['Blocker','Owner','Resolve by','Impact']}>{BLOCKERS.filter(b=>b.project==='army').map(b=><tr key={b.id}><th scope="row"><span >{b.label}</span></th><td>{b.owner}</td><td>{date(b.due)}</td><td>{b.impact}</td></tr>)}</Table></Panel></>;
}
