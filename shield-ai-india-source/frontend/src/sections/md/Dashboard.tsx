import { PEOPLE_AS_OF, PEOPLE_ASSUMPTION_ROWS } from '@/data/md-people';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Headline } from '@/components/ui';
import { AREAS, AS_OF, ASSUMPTIONS, date, type Area } from '@/data/md-scenario';
import Overview from './Overview';
import BusinessDevelopment from './BusinessDevelopment';
import Delivery from './Delivery';
import Engineering from './Engineering';
import Hiring from './Hiring';
import Finance from './Finance';
import JswPartnership from './JswPartnership';
import type { Detail } from './Shared';
import './dashboard.css';
export default function Dashboard() {
 const [area,setArea]=useState<Area>('Overview');const [initial,setInitial]=useState('All');const [detail,setDetail]=useState<Detail|null>(null);const dialog=useRef<HTMLDialogElement>(null);
 const navigate=(next:Area,filter='All')=>{setArea(next);setInitial(filter);};
 useEffect(()=>{if(detail)dialog.current?.showModal();else dialog.current?.close();},[detail]);
 return <div className="md-cut"><div className="mc-header"><Headline title="MD Dashboard"/><div className="mc-toolbar"><span><time dateTime={area === 'HR' ? PEOPLE_AS_OF : AS_OF}>{date(area === 'HR' ? PEOPLE_AS_OF : AS_OF)}</time>{area === 'HR' && ' · Illustrative review'}</span><button className="mc-link" onClick={()=>setDetail({title:area === 'HR' ? 'HR planning assumptions' : 'Planning assumptions',rows:area === 'HR' ? PEOPLE_ASSUMPTION_ROWS : ASSUMPTIONS.map(a=>[`${a.label} · ${a.value}`,a.detail])})}>Assumptions ↗</button></div>
 <nav className="mc-nav" aria-label="MD dashboard areas">{AREAS.map(a=><button key={a} aria-current={a===area?'page':undefined} onClick={()=>navigate(a)}>{a}</button>)}</nav>
 </div>
 <div className="mc-view" key={area+initial} aria-label={area}>
 {area==='Overview'&&<Overview navigate={navigate}/>}
 {area==='Business Development'&&<BusinessDevelopment inspect={setDetail} initial={initial}/>}
 {area==='Operations'&&<Delivery inspect={setDetail} initial={initial}/>}
 {area==='Engineering'&&<Engineering inspect={setDetail}/>}
 {area==='HR'&&<Hiring inspect={setDetail} initial={initial}/>}
 {area==='Finance and Legal'&&<Finance inspect={setDetail}/>}
 {area==='JSW Partnership'&&<JswPartnership inspect={setDetail}/>}
 </div>
 <dialog className="mc-drawer" ref={dialog} aria-labelledby="mc-detail-title" onCancel={()=>setDetail(null)} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setDetail(null);}}} onKeyDown={e=>e.stopPropagation()}><header><h2 id="mc-detail-title">{detail?.title}</h2><button onClick={()=>setDetail(null)} aria-label="Close details"><X size={20}/></button></header><dl>{detail?.rows.map(([label,value],i)=><div key={`${label}-${i}`}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></dialog>
 </div>;
}
