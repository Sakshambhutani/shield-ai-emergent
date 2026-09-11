import { useSectionLink } from './useSectionLink';
import { ANNUAL, YEARS, type Year } from '@/data/md-plan';
import { bdPlan } from '@/data/md-bd-plan';
import { BD_OPEN_DEALS, bdScenario, sumBd, type BdDeal } from '@/data/md-bd-scenario';
import { useRef, useState } from 'react';
import { AS_OF, inr, STAGES, date, type Segment } from '@/data/md-scenario';
import { Badge, Cards, Empty, Metric, Panel, Table } from './Shared';
const SEGMENTS:Segment[]=['B2B','B2G','PSUs'];
function DealTable({deals}:{deals:BdDeal[]}) {
 return <Table headers={['Customer / project','Route / stage','Value','Closure date','Next decision','Owner','Risk']}>{deals.map(o=><tr key={o.id}><th scope="row">{o.customer}<small>{o.project}</small></th><td><Badge>{o.segment}</Badge><small>{STAGES[o.segment][o.stage]}</small></td><td>{inr(o.value)}</td><td>{date(o.close)}</td><td>{o.decision}<small>{date(o.due)}</small></td><td>{o.owner}</td><td><Badge tone="amber">{o.risk}</Badge></td></tr>)}</Table>;
}
export default function BusinessDevelopment({ initial = 'All' }: { initial?: string }) {
 const pursuitsRef=useRef<HTMLDivElement>(null);
 const [year,setYear]=useState<Year>('FY26–27');
 const [segment,setSegment]=useState<Segment|null>(null);
 const [stage,setStage]=useState<number|null>(null);
 const jump=useSectionLink('Business Development',(_id,params)=>{const fy=params.get('fy');if(YEARS.includes(fy as Year))setYear(fy as Year);setSegment(null);setStage(null);});
 const plan=ANNUAL.find(p=>p.year===year)!;
 const annual=bdPlan(year), rows=annual.filter(r=>segment===null||r.segment===segment);
 const orders=plan.orders, pipeline=annual.reduce((s,r)=>s+r.pipeline,0), count=annual.reduce((s,r)=>s+r.count,0);
 const scenario=bdScenario(year);
 const {past,future,pipelineDeals,near,orderValue,contractCount}=scenario;
 const scope=pipelineDeals.filter(o=>segment===null||o.segment===segment);
 const opportunities=scope.filter(o=>stage===null||o.stage===stage);
 const progress=(value:number,target:number)=>target>0?`${Math.round(value/target*100)}% of target`:'No target allocated';
 const pipelineLabel=past?'Pipeline developed':'Open pipeline';
 const nearApplicable=!past&&!future;
 return <><Cards>
 <Metric label={`${pipelineLabel} · ${year}`} value={inr(scenario.pipelineValue)} sub={`Assumed · target ${inr(pipeline)} · ${progress(scenario.pipelineValue,pipeline)}`} onClick={()=>jump('bd-pipeline',{fy:year})}/>
 <Metric label={future?'Orders planned':'Orders booked · assumed'} value={inr(orderValue)} sub={future?`${year} · annual operating plan`:`Target ${inr(orders)} · ${progress(orderValue,orders)} · through ${date(past?plan.end.slice(0,4)+'-03-31':AS_OF)}`} onClick={()=>jump('bd-orders',{fy:year})}/>
 <Metric label={future?'Contracts planned':'Contracts booked · assumed'} value={contractCount} sub={future?`${year} · planned contract mix`:`Target ${count} contracts · ${progress(contractCount,count)}`} onClick={()=>jump('bd-orders',{fy:year})}/>
 <Metric label="Near closure · next 90 days" value={nearApplicable?inr(sumBd(near)):'N/A'} sub={nearApplicable?`${near.length} assumed late-stage deals · as of ${date(AS_OF)}`:`${year} is outside the current 90-day window`} onClick={()=>jump('bd-near-closure',{fy:year})}/>
 </Cards>
 <nav className="mc-controls" aria-label="BD financial year"><div className="mc-choices">{YEARS.map(y=><button key={y} aria-current={year===y?'page':undefined} aria-pressed={year===y} onClick={()=>{setYear(y);setSegment(null);setStage(null);}}>{y}</button>)}</div></nav>
 <p className="mc-bd-basis">Assumed BD scenario · {past?'Reconstructed pipeline developed and converted during the year':`Open opportunities by expected closure year · as of ${date(AS_OF)}`}. {future?'Orders and contract counts follow the annual plan.':'Booked figures are planning assumptions.'}</p>
 <Panel collapsible={false} id="bd-pipeline" title={`${pipelineLabel} · ${year}`} aside={segment!==null&&<button className="mc-link" onClick={()=>{setSegment(null);setStage(null);}}>← All segments</button>}><div className="mc-pipeline">{SEGMENTS.map(s=>{const target=annual.filter(r=>r.segment===s).reduce((n,r)=>n+r.pipeline,0),named=pipelineDeals.filter(o=>o.segment===s),value=sumBd(named);return <button key={s} aria-pressed={segment===s} onClick={()=>{setSegment(segment===s?null:s);setStage(null);}}><span>{s}</span><strong>{past&&!named.length?'N/A':inr(value)}</strong><small>{past&&!named.length?'Not active in the initial-order year':`${pipelineLabel} · assumed`}</small><small>{target>0?`Target ${inr(target)} · ${progress(value,target)}`:'No target allocated'}</small><small>{named.length} opportunities</small><i style={{width:`${target>0?Math.min(100,value/target*100):0}%`}}/></button>})}</div></Panel>
 {segment!==null&&<Panel collapsible={false} title={`Pipeline stages · ${segment} · ${year}`}><div className="mc-pipeline">{STAGES[segment].map((label,index)=>{const matching=scope.filter(o=>o.stage===index),value=sumBd(matching);return <button key={label} aria-pressed={stage===index} onClick={()=>setStage(stage===index?null:index)}><span>{label}</span><strong>{matching.length}</strong><small>{inr(value)}</small><i style={{width:`${sumBd(scope)?value/sumBd(scope)*100:0}%`}}/></button>})}</div></Panel>}
 <div id="bd-pursuits" tabIndex={-1} ref={pursuitsRef} style={{scrollMarginTop:16}}><Panel title={`${past?'Developed pursuits':'Active pursuits'} · ${year}${segment?` · ${segment}`:''}`} aside={<span>{opportunities.length} opportunities · assumed {stage!==null&&<button className="mc-link" onClick={()=>setStage(null)}>Clear stage</button>}</span>}><DealTable deals={opportunities}/>{!opportunities.length&&<Empty text="0 opportunities in this selection."/>}</Panel></div>
 <Panel id="bd-orders" title={`${future?'Order plan':'Assumed bookings'} · ${year}`}>
 {future?<p className="mc-bd-basis">{inr(orderValue)} across {contractCount} planned contracts. See the annual programme allocation below.</p>:<DealTable deals={scenario.booked}/>}
 </Panel>
 <Panel id="bd-near-closure" title="Near closure · next 90 days" aside={<span>{year} · as of {date(AS_OF)} · assumed</span>}>
 {nearApplicable?<DealTable deals={near}/>:<p className="mc-bd-basis">This financial year is outside the 90-day window from {date(AS_OF)}.</p>}
 </Panel>
 <Panel title="Total open pipeline · all financial years"><div className="mc-pipeline">{SEGMENTS.map(s=>{const named=BD_OPEN_DEALS.filter(o=>o.segment===s);return <div key={s}><span>{s}</span><strong>{inr(sumBd(named))}</strong><small>{named.length} open opportunities · assumed</small></div>})}</div><p className="mc-pipeline-caption">Total {inr(sumBd(BD_OPEN_DEALS))} · {BD_OPEN_DEALS.length} open opportunities · as of {date(AS_OF)} · excludes booked orders</p></Panel>
 <Panel id="bd-plan" title="Planned pursuits" aside={<span>{year} · assumed allocation</span>}><Table headers={['Programme / partnership','Route','Pipeline target','Order target','Closures','Next decision / owner','Risk']}>{rows.map(r=><tr key={r.id}><th scope="row"><span >{r.name}</span><small>{year}</small></th><td><Badge>{r.segment}</Badge><small>{r.route}</small></td><td>{inr(r.pipeline)}</td><td>{inr(r.orders)}</td><td>{r.count}</td><td>{r.next}<small>{r.owner}</small></td><td><Badge tone="amber">{r.risk}</Badge></td></tr>)}</Table></Panel>
 <Panel title="Next commercial priorities"><div className="mc-commitments">{rows.slice(0,3).map(r=><div key={r.id}><span>{year} · proposed</span><strong>{r.next}</strong><small>{r.owner}</small></div>)}</div></Panel>
 </>;
}
