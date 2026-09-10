import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Area } from '@/data/md-scenario';

export function highlightSection(target:HTMLElement) {
 document.querySelectorAll('.mc-section-target').forEach(e=>e.classList.remove('mc-section-target'));
 target.classList.add('mc-section-target');
}

export function useSectionLink(area:Area, prepare?:(id:string,params:URLSearchParams)=>void) {
 const location=useLocation(),navigate=useNavigate(),prepareRef=useRef(prepare);
 prepareRef.current=prepare;
 const reveal=(id:string,params:URLSearchParams)=>{
  if(!id)return;
  prepareRef.current?.(id,params);
  const frame=requestAnimationFrame(()=>{
   const target=document.getElementById(id);
   if(!target)return;
   for(let node:HTMLElement|null=target;node;node=node.parentElement)if(node instanceof HTMLDetailsElement)node.open=true;
   const child=target.querySelector(':scope > details');
   if(child instanceof HTMLDetailsElement)child.open=true;
   highlightSection(target);
   target.focus({preventScroll:true});
   target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
  return ()=>cancelAnimationFrame(frame);
 };
 useEffect(()=>reveal(location.hash.slice(1),new URLSearchParams(location.search)),[location.hash,location.search]);
 return (id:string,extra:Record<string,string>={})=>{
  const params=new URLSearchParams(location.search);
  params.set('area',area.toLowerCase().replace(/ /g,'-'));
  for(const [key,value] of Object.entries(extra))params.set(key,value);
  if(location.hash===`#${id}`&&params.toString()===new URLSearchParams(location.search).toString())reveal(id,params);
  else navigate({pathname:location.pathname,search:params.toString(),hash:id});
 };
}
