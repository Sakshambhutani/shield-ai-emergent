import { targetTone, dueTone, metricTone } from './status';
import { useSectionLink } from './useSectionLink';
import { useState } from 'react';
import { CAPACITY, ENGINEERING_READINESS, SCENARIOS, AS_OF, ENGINEERING_PERIOD_START, engineeringMetrics, date } from '@/data/md-scenario';
import { ContextInfo, Badge, Bars, Cards, Choice, Empty, Metric, Panel, Table } from './Shared';
export default function Engineering({ initial='All' }: { initial?: string }) {
 const [project,setProject]=useState('army');const [filter,setFilter]=useState(initial);
 const jump=useSectionLink('Engineering',(_id,params)=>{setFilter(params.get('filter')||'All');if(params.get('project')==='oem-isr'||params.get('project')==='army')setProject(params.get('project')!);});
 const metrics=engineeringMetrics(project);
 const scope=SCENARIOS.filter(s=>s.project===project);const rows=scope.filter(s=>filter==='All'||s.state===filter);
 return <><Cards>
<Metric onClick={()=>jump('engineering-blockers',{project})} label="Critical engineering blockers" tone={metrics.blockers.length?'mc-red':'mc-green'} value={metrics.blockers.length} sub={metrics.blockers.length?`Oldest ${metrics.oldest} days`:undefined} />
<Metric label="Unresolved test failures" value={scope.filter(s=>s.state==='Failed').length} onClick={()=>jump('engineering-workstreams',{filter:'Failed',project})} tone={scope.some(s=>s.state==='Failed')?'mc-red':'mc-green'}/>
<Metric onClick={()=>jump('engineering-commitments',{project})} tone={metricTone(targetTone(metrics.delivered,metrics.due.length,true))} label="Engineering commitments delivered" value={metrics.percentage===null?`${metrics.delivered} / ${metrics.due.length}`:`${metrics.percentage}%`} sub={`${metrics.delivered} / ${metrics.due.length} due`} />
<Metric tone={CAPACITY[0].assigned>CAPACITY[0].current?'mc-red':CAPACITY[0].assigned===CAPACITY[0].current?'mc-amber':'mc-green'} label="Engineering capacity" value={`${CAPACITY[0].assigned} / ${CAPACITY[0].current}`} sub="Army 10 · Presales 2"/>
</Cards>
 <div className="mc-two"><Panel collapsible={false} title="Scenario validation"><Bars data={['Passed','Failed','Ready','Blocked'].map(state=>({label:state,count:scope.filter(s=>s.state===state).length}))} series={[{key:'count',name:'Scenarios',color:'#80b4fa'}]}/></Panel><Panel collapsible={false} title={project==='army'?'Platform readiness · V-BAT':'Platform readiness · OEM A'}><div className="mc-progress-list">{(project==='army'?ENGINEERING_READINESS:[{label:'Platform information',complete:1,total:2},{label:'Integration scope',complete:1,total:2},{label:'Partner inputs',complete:0,total:2}]).map(r=><div key={r.label}><span>{r.label}<b>{r.complete} / {r.total}</b></span><progress className={metricTone(targetTone(r.complete,r.total))} max={r.total} value={r.complete}/></div>)}</div><div className="mc-footer-stat"><span>Next demonstration</span><strong>{project==='army'?'05 Feb 2027':'16 Oct 2026 · scope review'}</strong></div></Panel></div>
 <div className="mc-controls"><label>Platform / project <select aria-label="Engineering project" value={project} onChange={e=>{setProject(e.target.value);setFilter('All');}}><option value="army">V-BAT · Army ISR</option><option value="oem-isr">OEM A · Presales evaluation</option></select></label><Choice label="Scenario status" value={filter} options={['All','Passed','Failed','Ready','Blocked']} onChange={setFilter}/></div>


 <Panel id="engineering-blockers" title="Engineering blockers"><Table headers={['Blocker','Owner','Resolve by','Impact']}>{metrics.blockers.map(b=><tr key={b.id}><th>{b.label}</th><td>{b.owner}</td><td>{date(b.due)}</td><td>{b.impact}</td></tr>)}</Table>{!metrics.blockers.length&&<Empty text="No critical blockers"/>}</Panel>
 <Panel id="engineering-workstreams" title="Engineering workstreams"><Table headers={['Scenario / platform','Status','Next output','Due','Owner']}>{rows.map(s=><tr key={s.id}><th scope="row"><span >{s.label}</span><ContextInfo>{s.platform}</ContextInfo></th><td><Badge tone={s.state==='Passed'?'green':s.state==='Failed'||s.state==='Blocked'?'red':'amber'}>{s.state}</Badge></td><td>{s.next}</td><td>{date(s.due)}</td><td>{s.owner}</td></tr>)}</Table>{!rows.length&&<Empty text="0 scenarios in this status"/>}</Panel>
 <Panel id="engineering-commitments" title="Engineering commitments"><Table headers={['Output','Due','Accepted','Owner']}>{metrics.commitments.map(c=><tr key={c.id}><th scope="row"><span >{c.label}</span></th><td>{date(c.due)}</td><td>{c.acceptedAt?date(c.acceptedAt):<Badge tone={dueTone(c.due,AS_OF)}>{c.due<AS_OF?'Overdue':'Pending'}</Badge>}</td><td>{c.owner}</td></tr>)}</Table></Panel>

</>;
}
