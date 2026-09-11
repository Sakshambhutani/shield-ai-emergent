import { budgetTone, metricTone } from './status';
import { JSW_SPEND_ESTIMATE, JSW_EXECUTION_TRACKER, JSW_SPEND_TO_DATE, JSW_BUDGET_TO_DATE, JSW_SPEND_VARIANCE } from '@/data/md-jsw-finance';
import { date, inr } from '@/data/md-scenario';
import { Bars, Panel } from './Shared';

export default function JswFinancialTracker() {
 const variancePercent=JSW_BUDGET_TO_DATE?JSW_SPEND_VARIANCE/JSW_BUDGET_TO_DATE*100:0;
 return <Panel collapsible={false} title="JSW financial tracker">
  <Bars data={JSW_EXECUTION_TRACKER} unit="Cr" series={[
   {key:'earnings',name:'Earnings planned',color:'#80b4fa'},
   {key:'costs',name:'Execution budget',color:'#53677f'},
   {key:'spend',name:'Spent · estimated',color:'#d5b17a'},
  ]}/>
  <div className="mc-strip">
   <span>Total spent through {date(JSW_SPEND_ESTIMATE.asOf)}<b>{inr(JSW_SPEND_TO_DATE)}</b></span>
   <span>Budget through that date<b>{inr(JSW_BUDGET_TO_DATE)}</b></span>
   <span>Variance<b className={metricTone(budgetTone(JSW_SPEND_VARIANCE))}>{inr(Math.abs(JSW_SPEND_VARIANCE))} ({Math.abs(variancePercent).toFixed(1)}%) · {JSW_SPEND_VARIANCE>0?'over budget':JSW_SPEND_VARIANCE<0?'under budget':'on budget'}</b></span>
  </div>
 </Panel>;
}
