import { useEffect, useRef } from 'react';
import { BD_SCENARIO_BASIS } from '@/data/md-bd-scenario';
import { SOURCE_URL } from '@/data/md-plan';
import { PEOPLE_AS_OF } from '@/data/md-people';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Headline } from '@/components/ui';
import { AREAS, AS_OF, date, type Area } from '@/data/md-scenario';
import Overview from './Overview';
import BusinessDevelopment from './BusinessDevelopment';
import Delivery from './Delivery';
import Engineering from './Engineering';
import Hiring from './Hiring';
import Finance from './Finance';
import JswPartnership from './JswPartnership';
import './dashboard.css';
export default function Dashboard() {
 const assumptionsRef=useRef<HTMLDialogElement>(null);
 const [searchParams]=useSearchParams();
 const route=useNavigate(),location=useLocation();
 const area=AREAS.find(a=>a.toLowerCase().replace(/ /g,'-')===searchParams.get('area'))??'Overview';
 useEffect(()=>{document.querySelectorAll('.mc-section-target').forEach(e=>{if(e.id!==location.hash.slice(1))e.classList.remove('mc-section-target');});},[location.hash,area]);
 const initial=searchParams.get('filter')||'All';
 const navigate=(next:Area,filter='All',section='')=>{
  const params=new URLSearchParams(location.search);
  params.set('area',next.toLowerCase().replace(/ /g,'-'));
  if(next!==area){params.delete('project');params.delete('fy');}
  if(filter==='All')params.delete('filter');else params.set('filter',filter);
  route({pathname:location.pathname,search:params.toString(),hash:section});
 };
 return <div className="md-cut"><dialog ref={assumptionsRef} className="md-detail md-assumptions" aria-labelledby="mc-assumptions-title" onKeyDown={e=>e.stopPropagation()}>
 <header><h2 id="mc-assumptions-title">Assumptions</h2><button autoFocus aria-label="Close assumptions" onClick={()=>assumptionsRef.current?.close()}>Close</button></header>
 <div className="md-detail-body"><p><a className="mc-link" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">Annual operating model ↗</a></p><details className="md-register-section"><summary>Business Development · estimate basis</summary><p>{BD_SCENARIO_BASIS}</p></details></div>
 </dialog><div className="mc-header"><Headline title="MD Dashboard"/><div className="mc-toolbar"><span><time dateTime={area === 'HR' ? PEOPLE_AS_OF : AS_OF}>{date(area === 'HR' ? PEOPLE_AS_OF : AS_OF)}</time>{area === 'HR' && ' · Illustrative review'}</span><button className="mc-link" onClick={()=>assumptionsRef.current?.showModal()}>Assumptions ↗</button></div>
 <nav className="mc-nav" aria-label="MD dashboard areas">{AREAS.map(a=><button key={a} aria-current={a===area?'page':undefined} onClick={()=>navigate(a)}>{a}</button>)}</nav>
 </div>
 <div className="mc-view" key={area+initial} aria-label={area}>
 {area==='Overview'&&<Overview navigate={navigate}/>}
 {area==='Business Development'&&<BusinessDevelopment initial={initial}/>}
 {area==='Operations'&&<Delivery initial={initial}/>}
 {area==='Engineering'&&<Engineering initial={initial}/>}
 {area==='HR'&&<Hiring initial={initial}/>}
 {area==='Finance and Legal'&&<Finance/>}
 {area==='JSW Partnership'&&<JswPartnership/>}
 </div>

 </div>;
}
