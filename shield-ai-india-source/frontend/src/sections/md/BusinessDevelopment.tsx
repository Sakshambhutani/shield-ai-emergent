import { useSearchParams } from 'react-router-dom';
import { targetTone, dueTone, metricTone } from './status';
import { useSectionLink } from './useSectionLink';
import { ANNUAL, YEARS, type Year } from '@/data/md-plan';
import { bdPlan } from '@/data/md-bd-plan';
import { BD_OPEN_DEALS, bdScenario, sumBd, type BdDeal } from '@/data/md-bd-scenario';
import { useRef, useState } from 'react';
import { AS_OF, inr, STAGES, date, type Segment } from '@/data/md-scenario';
import { ContextInfo, Badge, Cards, Choice, Empty, MetricValue, Metric, Panel, Table } from './Shared';
const SEGMENTS:Segment[]=['B2B','B2G','PSUs'];
function DealTable({deals}:{deals:BdDeal[]}) {
 return <Table headers={['Customer / project','Route','Stage','Value','Closure date','Next decision','Due','Owner','Risk']}>{deals.map(o=><tr key={o.id}><th scope="row">{o.customer}<ContextInfo>{o.project}</ContextInfo></th><td><Badge>{o.segment}</Badge></td><td>{STAGES[o.segment][o.stage]}</td><td>{inr(o.value)}</td><td>{date(o.close)}</td><td>{o.decision}</td><td><Badge tone={dueTone(o.due,AS_OF)}>{date(o.due)}</Badge></td><td>{o.owner}</td><td><Badge tone="amber">{o.risk}</Badge></td></tr>)}</Table>;
}
export default function BusinessDevelopment({ initial = 'All' }: { initial?: string }) {
 const pursuitsRef=useRef<HTMLDivElement>(null);
 const [params,setParams]=useSearchParams();
 const selected=params.get('fy');
 const allYears=selected==='All';
 const year:Year=YEARS.includes(selected as Year)?selected as Year:'FY26–27';
 const selectScope=(next:Year|'All')=>{const updated=new URLSearchParams(params);updated.set('fy',next);setParams(updated);setSegment(null);setStage(null);};
 const [segment,setSegment]=useState<Segment|null>(null);
 const [stage,setStage]=useState<number|null>(null);
 const jump=useSectionLink('Business Development',()=>{setSegment(null);setStage(null);});
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
 const scopeNav = (<nav className="mc-controls" aria-label="BD financial year"><Choice label="BD financial year" value={allYears?'All':year} options={['All',...YEARS] as const} onChange={selectScope}/><ContextInfo label="Business development assumptions">BD scenario · {!allYears&&past?'Reconstructed pipeline developed and converted during the year':`Open opportunities by expected closure year · as of ${date(AS_OF)}`}. {!allYears&&future?'Orders and contract counts follow the annual plan.':'Booked figures are planning assumptions.'}</ContextInfo></nav>);
 if(allYears){
  const allOpportunities=BD_OPEN_DEALS.filter(o=>segment===null||o.segment===segment);
  return <>{scopeNav}
 <Panel title="Total open pipeline · all financial years" aside={<span>{inr(sumBd(BD_OPEN_DEALS))} · {BD_OPEN_DEALS.length} opportunities</span>} context={`Open opportunities as of ${date(AS_OF)}; excludes booked orders.`}><div className="mc-pipeline">{SEGMENTS.map(s=>{const named=BD_OPEN_DEALS.filter(o=>o.segment===s);return <button key={s} aria-pressed={segment===s} onClick={()=>setSegment(segment===s?null:s)}><span>{s} · {named.length} opportunities</span><strong>{inr(sumBd(named))}</strong></button>})}</div></Panel>
 <Panel title={`Open opportunities${segment?` · ${segment}`:''}`} aside={<span>{allOpportunities.length} opportunities{segment && <button className="mc-link" onClick={()=>setSegment(null)}> · All segments</button>}</span>}><DealTable deals={allOpportunities}/>{!allOpportunities.length&&<Empty text="0 opportunities in this selection."/>}</Panel>
 </>;
 }
 return <>{scopeNav}<Cards>
 <Metric label={`${pipelineLabel} · ${year}`} tone={metricTone(targetTone(scenario.pipelineValue,pipeline,past))} value={inr(scenario.pipelineValue)} target={pipeline>0?inr(pipeline):undefined} sub={`Target ${inr(pipeline)} · ${progress(scenario.pipelineValue,pipeline)}`} onClick={()=>jump('bd-pipeline',{fy:year})}/>
 <Metric label={future?'Orders planned':'Orders booked'} tone={future?'':metricTone(targetTone(orderValue,orders,past))} value={inr(orderValue)} target={future?undefined:inr(orders)} sub={future?`${year} · annual operating plan`:`Target ${inr(orders)} · ${progress(orderValue,orders)} · through ${date(past?plan.end.slice(0,4)+'-03-31':AS_OF)}`} onClick={()=>jump('bd-orders',{fy:year})}/>
 <Metric label={future?'Contracts planned':'Contracts booked'} tone={future?'':metricTone(targetTone(contractCount,count,past))} value={contractCount} target={future?undefined:count} sub={future?`${year} · planned contract mix`:`Target ${count} contracts · ${progress(contractCount,count)}`} onClick={()=>jump('bd-orders',{fy:year})}/>
 <Metric label="Near closure · next 90 days" value={nearApplicable?inr(sumBd(near)):'N/A'} sub={nearApplicable?`${near.length} late-stage deals · as of ${date(AS_OF)}`:`${year} is outside the current 90-day window`} onClick={()=>jump('bd-near-closure',{fy:year})}/>
 </Cards>

 <Panel collapsible={false} id="bd-pipeline" title={`${pipelineLabel} · ${year}`} aside={segment!==null&&<button className="mc-link" onClick={()=>{setSegment(null);setStage(null);}}>← All segments</button>}><div className="mc-pipeline">{SEGMENTS.map(s=>{const target=annual.filter(r=>r.segment===s).reduce((n,r)=>n+r.pipeline,0),named=pipelineDeals.filter(o=>o.segment===s),value=sumBd(named);return <button key={s} aria-pressed={segment===s} onClick={()=>{setSegment(segment===s?null:s);setStage(null);}}><span>{s} · {named.length} opportunities</span><strong className={metricTone(targetTone(past&&!named.length?null:value,target,past))}><MetricValue value={past&&!named.length?'N/A':inr(value)} target={target>0?inr(target):undefined}/></strong><i style={{backgroundColor:`var(--mc-${targetTone(value,target,past)||'blue'})`,width:`${target>0?Math.min(100,value/target*100):0}%`}}/></button>})}</div></Panel>
 {segment!==null&&<Panel collapsible={false} title={`Pipeline stages · ${segment} · ${year}`}><div className="mc-pipeline">{STAGES[segment].map((label,index)=>{const matching=scope.filter(o=>o.stage===index),value=sumBd(matching);return <button key={label} aria-pressed={stage===index} onClick={()=>setStage(stage===index?null:index)}><span>{label} · {matching.length} opportunities</span><strong>{inr(value)}</strong><i style={{width:`${sumBd(scope)?value/sumBd(scope)*100:0}%`}}/></button>})}</div></Panel>}
 <div id="bd-pursuits" tabIndex={-1} ref={pursuitsRef} style={{scrollMarginTop:16}}><Panel title={`${past?'Developed pursuits':'Active pursuits'} · ${year}${segment?` · ${segment}`:''}`} aside={<span>{opportunities.length} opportunities {stage!==null&&<button className="mc-link" onClick={()=>setStage(null)}>Clear stage</button>}</span>}><DealTable deals={opportunities}/>{!opportunities.length&&<Empty text="0 opportunities in this selection."/>}</Panel></div>
 <Panel id="bd-orders" title={`${future?'Order plan':'Bookings'} · ${year}`}>
 {future?<div className="mc-strip"><span>Order plan <b>{inr(orderValue)}</b></span><span>Contracts <b>{contractCount}</b></span></div>:<DealTable deals={scenario.booked}/>}
 </Panel>
 <Panel id="bd-near-closure" title="Near closure · next 90 days" aside={<span>{year}</span>}>
 {nearApplicable?<DealTable deals={near}/>:<Empty text="Outside the current 90-day window."/>}
 </Panel>

 <Panel id="bd-plan" title="Planned pursuits" aside={<span>{year}</span>}><Table headers={['Programme / partnership','Route','Pipeline target','Order target','Closures','Next decision / owner','Risk']}>{rows.map(r=><tr key={r.id}><th scope="row"><span >{r.name}</span><ContextInfo>{year}</ContextInfo></th><td><Badge>{r.segment}</Badge><ContextInfo>{r.route}</ContextInfo></td><td>{inr(r.pipeline)}</td><td>{inr(r.orders)}</td><td>{r.count}</td><td>{r.next}<ContextInfo>{r.owner}</ContextInfo></td><td><Badge tone="amber">{r.risk}</Badge></td></tr>)}</Table></Panel>
 <Panel title="Next commercial priorities"><div className="mc-commitments">{rows.slice(0,3).map(r=><div key={r.id}><span>{year} · proposed <ContextInfo label={`Owner for ${r.next}`}>{r.owner}</ContextInfo></span><strong>{r.next}</strong></div>)}</div></Panel>
 </>;
}
