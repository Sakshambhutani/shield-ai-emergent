import { CASH_PLAN } from '@/data/md-cash-plan';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSectionLink } from './useSectionLink';
import { ANNUAL_SPENDING } from '@/data/md-finance-spend';
import { ANNUAL, YEARS, type Year } from '@/data/md-plan';
import { inr, date } from '@/data/md-scenario';
import { Bars, Cards, Metric, Panel, Table } from './Shared';

export default function Finance() {
 const [params]=useSearchParams(),location=useLocation(),navigate=useNavigate();
 const selected=params.get('fy');
 const year:Year=YEARS.includes(selected as Year)?selected as Year:'FY26–27';
 const plan=ANNUAL.find(p=>p.year===year)!;
 const cash=CASH_PLAN.find(p=>p.year===year)!;
 const spending=ANNUAL_SPENDING.find(p=>p.label===year)!;
 const jump=useSectionLink('Finance and Legal');
 const selectYear=(fy:Year)=>{const next=new URLSearchParams(params);next.set('fy',fy);navigate({pathname:location.pathname,search:next.toString(),hash:''});};
 const variance=spending.variance;
 const varianceText=variance===null?'N/A':`${inr(Math.abs(variance))} ${variance>0?'over':variance<0?'under':'on budget'}`;
 return <>
 <nav className="mc-controls" aria-label="Finance financial year"><div className="mc-choices">{YEARS.map(fy=><button key={fy} aria-pressed={year===fy} onClick={()=>selectYear(fy)}>{fy}</button>)}</div></nav>
 <Cards>
<Metric onClick={()=>jump('finance-variance',{fy:year})} label="Budget variance" value={varianceText} sub={variance===null?'No spending yet':`Against ${inr(spending.periodBudget!)} period budget`} tone={variance!==null&&variance>0?'mc-amber':''}/>
<Metric onClick={()=>jump('finance-spending',{fy:year})} label="Spent to date" value={spending.spent===null?'N/A':inr(spending.spent)} sub={spending.spent===null?'Future year':`Estimated · ${spending.period}`}/>
<Metric onClick={()=>jump('finance-spending',{fy:year})} label="Expense budget" value={inr(spending.planned)} sub={`${inr(plan.opex)} opex + ${inr(plan.execution)} execution`}/>
<Metric onClick={()=>jump('finance-revenue',{fy:year})} label="Earnings plan" value={inr(plan.revenue+plan.tot)} sub={`${inr(plan.revenue)} revenue + ${inr(plan.tot)} ToT`}/>
</Cards>
 <Panel collapsible={false} id="finance-spending" title="Spending by FY"><div id="finance-variance" tabIndex={-1} style={{scrollMarginTop:16}} className="mc-strip">
  <span>{year} · {spending.spent===null?'plan only':spending.period}</span>
  <span>Period budget <b>{spending.periodBudget===null?'N/A':inr(spending.periodBudget)}</b></span>
  <span>Variance <b style={{color:variance!==null&&variance>0?'#d5b17a':undefined}}>{varianceText}{variance!==null&&spending.periodBudget?` (${(Math.abs(variance)/spending.periodBudget*100).toFixed(1)}%)`:''}</b></span>
 </div><Bars data={ANNUAL_SPENDING} unit="Cr" series={[
  {key:'planned',name:'Planned',color:'#53677f'},
  {key:'spent',name:'Spent · estimated through Sep 2026',color:'#80b4fa'},
 ]}/></Panel>
 <Panel collapsible={false} id="finance-revenue" title="Earnings by FY"><Bars data={ANNUAL.map(p=>({label:p.year,revenue:p.revenue,tot:p.tot}))} unit="Cr" series={[
  {key:'revenue',name:'Customer revenue plan',color:'#80b4fa'},
  {key:'tot',name:'ToT earnings plan',color:'#53677f'},
 ]}/></Panel>
 <Panel title={cash.projected?'Cash & funding · projection':'Cash & funding · estimate'}><div className="mc-strip">
  <button className="mc-link" onClick={()=>jump('finance-cash',{fy:year})}>Bank balance <b>{inr(cash.closing)}</b></button>
  <button className="mc-link" onClick={()=>jump('finance-collections',{fy:year})}>{cash.projected?'Projected collections':'Collections to date'} <b>{inr(cash.collections)}</b></button>
  <button className="mc-link" onClick={()=>jump('finance-funding',{fy:year})}>Cumulative HQ funding <b>{inr(cash.cumulativeFunding)}</b></button>
 </div></Panel>
 <Panel id="finance-cash" title="Cash summary" aside={<span>{date(cash.asOf)}</span>}><Table headers={['Cash movement','Amount']}>
  <tr><th>Opening bank balance</th><td>{inr(cash.opening)}</td></tr>
  <tr id="finance-collections" tabIndex={-1} style={{scrollMarginTop:16}}><th>+ Customer and ToT collections</th><td>{inr(cash.collections)}</td></tr>
  <tr id="finance-funding" tabIndex={-1} style={{scrollMarginTop:16}}><th>+ HQ funding during this FY</th><td>{inr(cash.funding)}</td></tr>
  <tr><th>− Cash payments</th><td>{inr(cash.payments)}</td></tr>
  <tr><th>= Closing bank balance</th><td>{inr(cash.closing)}</td></tr>
 </Table><p className="mc-currency-note">Planning estimates: ₹40 Cr initial HQ funding; 50% of earnings collected in-year and 50% the next year. September uses half-year collections. Payments follow the spending estimates; future years are projections. These are not verified bank balances.</p></Panel>
 </>;
}
