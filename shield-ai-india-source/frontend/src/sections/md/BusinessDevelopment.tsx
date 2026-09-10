import { useSectionLink } from './useSectionLink';
import { ANNUAL, YEARS, type Year } from '@/data/md-plan';
import { bdPlan, closedOrders } from '@/data/md-bd-plan';
import { useRef, useState } from 'react';
import { inr, STAGES, OPPORTUNITIES, formatUsdMillionsInInr, date, type Segment } from '@/data/md-scenario';
import { Badge, Cards, Empty, Metric, Panel, Table } from './Shared';
export default function BusinessDevelopment({ initial = 'All' }: { initial?: string }) {
 const pursuitsRef=useRef<HTMLDivElement>(null);
 const [year,setYear]=useState<Year>('FY26–27');
 const [segment,setSegment]=useState<Segment|null>(null);
 const [stage,setStage]=useState<number|null>(null);
 const jump=useSectionLink('Business Development',(_id,params)=>{const fy=params.get('fy');if(YEARS.includes(fy as Year))setYear(fy as Year);setSegment(null);setStage(null);});
 const plan=ANNUAL.find(p=>p.year===year)!;
 const annual=bdPlan(year), rows=annual.filter(r=>segment===null||r.segment===segment);
 const orders=plan.orders, pipeline=annual.reduce((s,r)=>s+r.pipeline,0), count=annual.reduce((s,r)=>s+r.count,0);
 const opportunityScope=OPPORTUNITIES.filter(o=>segment===null||o.segment===segment);
 const opportunities=opportunityScope.filter(o=>stage===null||o.stage===stage);
 const opportunityTotal=opportunityScope.reduce((sum,o)=>sum+o.value,0);

 return <><Cards>
<Metric onClick={()=>jump('bd-pipeline',{fy:year})} label="Pipeline target" value={inr(pipeline)} />
<Metric label="Target contracts" value={count} onClick={()=>jump('bd-pursuits',{fy:year})} sub={year==='FY25–26'?'Initial Army order':'Planned contract mix'} />
<Metric onClick={()=>jump('bd-plan',{fy:year})} label="Order target" value={inr(orders)} />
<Metric onClick={closedOrders(year)===null?undefined:()=>jump('bd-plan',{fy:year})} label="Orders closed" value={closedOrders(year)===null?'—':inr(closedOrders(year)!)} sub={year==='FY25–26'?'1 Army order':'Awaiting signed-order data'}/>
</Cards>
 <nav className="mc-controls" aria-label="BD financial year"><div className="mc-choices">{YEARS.map(y=><button key={y} aria-current={year===y?'page':undefined} aria-pressed={year===y} onClick={()=>{setYear(y);setSegment(null);setStage(null);}}>{y}</button>)}</div><></></nav>
 <Panel collapsible={false} id="bd-pipeline" title="Pipeline" aside={segment!==null&&<button className="mc-link" onClick={()=>{setSegment(null);setStage(null);}}>← All segments</button>}><div className="mc-pipeline">{(['B2B','B2G','PSUs'] as Segment[]).map(s=>{const lane=annual.filter(r=>r.segment===s),value=lane.reduce((n,r)=>n+(r.pipeline??r.orders),0),named=OPPORTUNITIES.filter(o=>o.segment===s);return <button key={s} aria-pressed={segment===s} onClick={()=>{setSegment(segment===s?null:s);setStage(null);}}><span>{s}</span><strong>{lane.length?inr(value):'—'}</strong><small>Pipeline target</small><small>{named.length} listed opportunities · {formatUsdMillionsInInr(named.reduce((sum,o)=>sum+o.value,0))}</small><i style={{width:`${value/pipeline*100}%`}}/></button>})}</div></Panel>
 {segment!==null&&<Panel collapsible={false} title={`Pipeline stages · ${segment}`}><div className="mc-pipeline">{STAGES[segment].map((label,index)=>{const matching=opportunityScope.filter(o=>o.stage===index),value=matching.reduce((sum,o)=>sum+o.value,0);return <button key={label} aria-pressed={stage===index} onClick={()=>setStage(stage===index?null:index)}><span>{label}</span><strong>{matching.length}</strong><small>{formatUsdMillionsInInr(value)}</small><i style={{width:`${opportunityTotal?value/opportunityTotal*100:0}%`}}/></button>})}</div></Panel>}
 <div id="bd-pursuits" tabIndex={-1} ref={pursuitsRef} style={{scrollMarginTop:16}}><Panel title={segment?`Active pursuits · ${segment}`:'Active pursuits'} aside={<span>{opportunities.length} opportunities {stage!==null&&<button className="mc-link" onClick={()=>setStage(null)}>Clear stage</button>}</span>}><Table headers={['Customer / project','Route / stage','Value','Target closure','Next decision','Owner','Risk']}>{opportunities.map(o=><tr key={o.id}><th scope="row">{o.customer}<small>{o.project}</small></th><td><Badge>{o.segment}</Badge><small>{STAGES[o.segment][o.stage]}</small></td><td>{formatUsdMillionsInInr(o.value)}</td><td>{date(o.close)}</td><td>{o.decision}<small>{date(o.due)}</small></td><td>{o.owner}</td><td><Badge tone="amber">{o.risk}</Badge></td></tr>)}</Table>{!opportunities.length&&<Empty text="No opportunities in this stage"/>}</Panel></div>
 <Panel id="bd-plan" title="Planned pursuits" aside={<span>{year} · assumed allocation</span>}><Table headers={['Programme / partnership','Route','Pipeline target','Order target','Closures','Next decision / owner','Risk']}>{rows.map(r=><tr key={r.id}><th scope="row"><span >{r.name}</span><small>{year}</small></th><td><Badge>{r.segment}</Badge><small>{r.route}</small></td><td>{inr(r.pipeline)}</td><td>{inr(r.orders)}</td><td>{r.count}</td><td>{r.next}<small>{r.owner}</small></td><td><Badge tone="amber">{r.risk}</Badge></td></tr>)}</Table></Panel>
 <Panel title="Next commercial priorities"><div className="mc-commitments">{rows.slice(0,3).map(r=><div key={r.id}><span>{year} · proposed</span><strong>{r.next}</strong><small>{r.owner}</small></div>)}</div></Panel>
 </>;
}
