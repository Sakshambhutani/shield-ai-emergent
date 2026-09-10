import { createContext, useContext, useState, type ReactNode } from 'react';
import { ANNUAL, EMPTY_STATE, YEARS, type Year, type PlanState, type BudgetField, type Amount, trackingKey } from '@/data/md-plan';
const KEY='shield-md-plan-v1';
function read():PlanState {try {const s=JSON.parse(localStorage.getItem(KEY)||'null');return s&&s.tracking&&Array.isArray(s.pursuits)&&Array.isArray(s.positions)&&Array.isArray(s.milestones)&&s.registerComplete?{...s,engineering:Array.isArray(s.engineering)?s.engineering:[]}:EMPTY_STATE;}catch{return EMPTY_STATE;}}
function useStore(){
 const [year,setYear]=useState<Year>('FY26–27');const [asOf,setAsOf]=useState('2026-10-01');const [state,setState]=useState(read);const [storageError,setStorageError]=useState(false);
 const update=(fn:(s:PlanState)=>PlanState)=>setState(s=>{const n=fn(s);try{localStorage.setItem(KEY,JSON.stringify(n));setStorageError(false);}catch{setStorageError(true);}return n;});
 const setTracking=(id:string,field:BudgetField,value:Amount)=>update(s=>({...s,tracking:{...s.tracking,[trackingKey(year,id)]:{...s.tracking[trackingKey(year,id)],[field]:value}}}));
 return {year,setYear,asOf,setAsOf,state,update,setTracking,plan:ANNUAL[YEARS.indexOf(year)],storageError};
}
const Context=createContext<ReturnType<typeof useStore>|null>(null);
export function PlanProvider({children}:{children:ReactNode}){const store=useStore();return <Context.Provider value={store}>{children}</Context.Provider>;}
export function usePlan(){const v=useContext(Context);if(!v)throw new Error('Missing plan provider');return v;}
