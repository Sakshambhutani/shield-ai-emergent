import { HR_EXITS } from '@/data/md-attrition';
import { HIRING_COSTS, HIRING_COST_BASIS, hiringCostSummary, hiringCostTone, HR_FY_EXITS, HR_FY_START } from '@/data/md-hiring-costs';
import { targetTone, dueTone, metricTone } from './status';
import { INDIA_OPENINGS } from '@/data/md-india-openings';
import { useSectionLink } from './useSectionLink';
import { useRef, useState } from 'react';
import {
  PEOPLE_JOINED, PEOPLE_JOINS_DUE, PEOPLE_READINESS_DUE, PEOPLE_AS_OF, PEOPLE_BASE, PEOPLE_TARGET, PEOPLE_HEADCOUNT, PEOPLE_PLAN,
  PEOPLE_ROLES, PEOPLE_STARTERS, PEOPLE_CRITICAL_ROLES, PEOPLE_JOINING_GAPS,
  PEOPLE_CAPABILITIES, PEOPLE_METRICS, PEOPLE_READY, PEOPLE_UNCOVERED,
} from '@/data/md-people';
import { date, inr } from '@/data/md-scenario';
import { ContextInfo, Badge, Bars, Cards, Choice, Empty, Metric, Panel, Table } from './Shared';

export default function Hiring({ initial = 'All' }: { initial?: string }) {
  const hiringCost=hiringCostSummary(HIRING_COSTS);
  const costExamples=HIRING_COSTS.filter(r=>r.latest!==null&&r.latest!==r.budget);
  const remainingPositions=HIRING_COSTS.filter(r=>r.latest===null||r.latest===r.budget);
  const remainingCost=hiringCostSummary(remainingPositions);
  const lakh=(value:number)=>`${inr(value/100)}`;
  const [priority, setPriority] = useState(initial === 'Critical' ? 'Critical' : 'All');
  const [showReady, setShowReady] = useState(true);
  const [coverFilter, setCoverFilter] = useState('Gaps');
  const joiningRef = useRef<HTMLDivElement>(null);
  const criticalRef = useRef<HTMLDivElement>(null);
  const onboardingRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const jump=useSectionLink('HR',(id)=>{if(id==='hr-onboarding')setShowReady(true);if(id==='hr-capability')setCoverFilter('Gaps');});
  const actions = [()=>jump('hr-plan'),()=>jump('hr-critical'),()=>jump('hr-onboarding'),()=>jump('hr-capability')];
  const [position, setPosition] = useState('all');
  const opening = INDIA_OPENINGS.find(role => role.id === position);
  const pipelineRoles = opening ? PEOPLE_ROLES.filter(role => role.role === opening.title) : PEOPLE_ROLES;
  const sum = (key: 'screened' | 'interviewed' | 'reachedNegotiation' | 'offersAccepted' | 'joined') => pipelineRoles.reduce((total, role) => total + role[key], 0);

  const pipelineMax = Math.max(1, ...(['screened', 'interviewed', 'reachedNegotiation', 'offersAccepted', 'joined'] as const).map(sum));

  return <>
    <div className="mc-overview-six"><Cards>{[0,1,3,2].map(i => {const metric=PEOPLE_METRICS[i];return <Metric key={metric.name} label={metric.name} value={metric.value} sub={metric.context} tone={metricTone(i===0?targetTone(PEOPLE_JOINED,PEOPLE_JOINS_DUE,true):i===1?targetTone(PEOPLE_CRITICAL_ROLES.filter(r=>r.covered).length,PEOPLE_CRITICAL_ROLES.length,PEOPLE_CRITICAL_ROLES.some(r=>!r.covered&&r.due<PEOPLE_AS_OF)):i===2?targetTone(PEOPLE_READY,PEOPLE_READINESS_DUE.length,true):PEOPLE_UNCOVERED.length?'amber':'green')} onClick={actions[i]}/>;})}
      <Metric label="Hiring cost / budget · annual" value={inr(hiringCost.forecast/100)} target={inr(hiringCost.budget/100)} targetLabel="approved budget" tone={metricTone(hiringCost.tone)} sub={HIRING_COST_BASIS} onClick={()=>jump('hr-hiring-cost')}/>
      <Metric label="Attrition · exits this FY" value={HR_FY_EXITS.length} tone={HR_FY_EXITS.some(e=>e.criticalGap)?'mc-red':HR_FY_EXITS.some(e=>e.replacement!=='Joined')?'mc-amber':'mc-green'} sub={`Existing People and Culture review scenario: exits from ${date(HR_FY_START)} through ${date(PEOPLE_AS_OF)}.`} onClick={()=>jump('hr-attrition')}/>
    </Cards></div>

    <div className="mc-two">
      <Panel collapsible={false} title="Headcount plan" aside={<span>{PEOPLE_BASE} → {PEOPLE_TARGET}</span>} context={`${PEOPLE_HEADCOUNT} in the illustrative example. Headcount plan: October 2026–March 2027.`}>
        <Bars data={PEOPLE_PLAN.map(m => ({ label: m.month, planned: m.cumulative, ...(m.due <= PEOPLE_AS_OF ? { actual: PEOPLE_BASE + PEOPLE_STARTERS.filter(s => s.start <= m.due).length - HR_EXITS.filter(e=>e.date<=m.due).length } : {}) }))} series={[{ key: 'planned', name: 'Month-end plan', color: '#53677f' }, { key: 'actual', name: 'Actual · illustrative', color: '#80b4fa' }]}/>
      </Panel>
      <Panel collapsible={false} title="Candidate pipeline" context="Illustrative candidates reaching each stage." aside={<select className="mc-position-select" aria-label="Candidate pipeline position" value={position} onChange={event => setPosition(event.target.value)} title={opening?.title || 'All India openings'}>
        <option value="all">All India openings</option>
        {INDIA_OPENINGS.map(role => <option key={role.id} value={role.id}>{role.title}</option>)}
      </select>}>
        <div className="mc-funnel">{(['screened', 'interviewed', 'reachedNegotiation', 'offersAccepted', 'joined'] as const).map((key, i) => <div key={key}><span>{['Screened', 'Interviewed', 'Negotiation', 'Offers accepted', 'Joined'][i]}</span><div><i style={{ width: `${Math.min(100, sum(key) / pipelineMax * 100)}%` }}/></div><strong>{sum(key)}</strong></div>)}</div>
      </Panel>
    </div>





    <Panel id="hr-plan" title="Hiring against plan" aside={<Choice label="Hiring priority" value={priority} options={['All', 'Critical']} onChange={setPriority}/>}>
      <Table headers={['Position', 'Planned hires', 'Joined / remaining', 'Interviewing now', 'Negotiating now', 'Offers accepted', 'Yet to join', 'Plan complete by']}>
        {PEOPLE_ROLES.filter(r => priority !== 'Critical' || r.critical).map(r => <tr key={r.role}><th scope="row"><span >{r.role}</span>{r.critical && <Badge tone="amber">Critical skill group</Badge>}</th><td>{r.count}</td><td>{r.joined} / {r.count - r.joined}</td><td>{r.interviewing}</td><td>{r.offered}</td><td>{r.offersAccepted}</td><td>{r.awaitingJoining}</td><td>{date(r.due)}</td></tr>)}
      </Table>
    </Panel>

    <div id="hr-joining" ref={joiningRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Joining gaps" aside={<></>}>
        <Table headers={['Position', 'Required', 'Forecast', 'Status', 'Impact', 'Owner']}>
          {PEOPLE_JOINING_GAPS.map(r => <tr key={r.id}><th scope="row">{r.id} · {r.role}</th><td>{date(r.due)}</td><td>{date(r.forecast)}</td><td><Badge tone="red">{r.confirmed ? 'Late · date confirmed' : 'Late · unconfirmed'}</Badge></td><td>{r.impact}</td><td>{r.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div id="hr-critical" ref={criticalRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Critical roles · next 90 days" aside={<></>}>
        <Table headers={['Role', 'Coverage', 'Required', 'Action', 'Owner']}>
          {PEOPLE_CRITICAL_ROLES.map(r => <tr key={r.role}><th scope="row">{r.role}</th><td><Badge tone={dueTone(r.due,PEOPLE_AS_OF,r.covered)}>{r.coverage}</Badge></td><td>{date(r.due)}</td><td>{r.action}</td><td>{r.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div id="hr-capability" ref={coverRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Critical capability cover" aside={<><></><Choice label="Capability cover" value={coverFilter} options={['All', 'Gaps']} onChange={setCoverFilter}/></>}>
        <Table headers={['Capability', 'Primary coverage', 'Backup / HQ support', 'Action', 'Owner', 'Due']}>
          {(coverFilter === 'Gaps' ? PEOPLE_UNCOVERED : PEOPLE_CAPABILITIES).map(c => <tr key={c.capability}><th scope="row">{c.capability}</th><td>{c.primary}</td><td><Badge tone={c.covered ? 'green' : 'amber'}>{c.backup}</Badge></td><td>{c.action}</td><td>{c.owner}</td><td>{date(c.due)}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div id="hr-onboarding" ref={onboardingRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Onboarding readiness" aside={<><></><button className="mc-link" aria-expanded={showReady} onClick={() => setShowReady(!showReady)}>{showReady ? 'Hide ready' : `Show ready (${PEOPLE_READY})`}</button></>}>
        <Table headers={['Role / starter', 'Start date', 'Readiness due', 'Status', 'Blocker', 'Owner']}>
          {PEOPLE_STARTERS.filter(s => showReady || !s.ready).map(s => <tr key={s.id}><th scope="row"><span >{s.role}<ContextInfo>{s.id}</ContextInfo></span></th><td>{date(s.start)}</td><td>{date(s.due)}</td><td><Badge tone={dueTone(s.due,PEOPLE_AS_OF,!!s.ready)}>{s.ready ? 'Ready' : s.due<PEOPLE_AS_OF?'Overdue':'Pending'}</Badge></td><td>{s.blocker || 'None'}</td><td>{s.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <Panel id="hr-hiring-cost" title="Hiring cost by position" aside={<span>Annual · {HIRING_COSTS.length} positions</span>} context={HIRING_COST_BASIS}>
      <Table headers={['Position','Approved budget','Latest cost','Variance']}>
        {costExamples.map(r=><tr key={r.id}><th scope="row">{r.role}<ContextInfo label={`Position ${r.id}`}>{r.id} · {r.stage}</ContextInfo></th><td>{lakh(r.budget)}</td><td>{lakh(r.latest??r.budget)}<ContextInfo label={`Cost basis for ${r.id}`}>{r.stage==='Joined'?'Agreed annual cost':r.stage==='Offer'?'Proposed annual cost · approval pending':'Vacancy · approved position budget'}</ContextInfo></td><td><Badge tone={hiringCostTone(r)}>{(r.latest??r.budget)>r.budget?'+':''}{lakh((r.latest??r.budget)-r.budget)}</Badge></td></tr>)}
        {remainingPositions.length>0&&<tr><th scope="row">Remaining positions ({remainingPositions.length})<ContextInfo>Combined positions at budget, including vacancies. Each retains its individual approved budget.</ContextInfo></th><td>{lakh(remainingCost.budget)}</td><td>{lakh(remainingCost.forecast)}</td><td><Badge tone={remainingCost.tone}>{lakh(remainingCost.variance)}</Badge></td></tr>}
        <tr className="mc-total-row"><th scope="row">Total</th><td>{lakh(hiringCost.budget)}</td><td>{lakh(hiringCost.forecast)}</td><td><Badge tone={hiringCost.tone}>{hiringCost.variance>0?'+':''}{lakh(hiringCost.variance)}</Badge></td></tr>
      </Table>
    </Panel>

    <Panel id="hr-attrition" title="Attrition · exits this FY" context="Replacement restores an existing position; it is separate from the 25 growth hires and their hiring-cost budget.">{HR_FY_EXITS.length?<Table headers={['Position','Exit date','Coverage','Replacement','Expected joining','Owner']}>{HR_FY_EXITS.map(e=><tr key={e.id}><th scope="row">{e.role}</th><td>{date(e.date)}</td><td><Badge tone={e.criticalGap?'red':'amber'}>{e.coverage}</Badge></td><td><Badge tone={e.replacement==='Joined'?'green':'amber'}>{e.replacement}</Badge></td><td>{e.expectedJoin?date(e.expectedJoin):'Pending'}</td><td>{e.owner}</td></tr>)}</Table>:<Empty text="No exits in the current People and Culture review. No replacements required."/>}</Panel>

  </>;
}
