import { INDIA_OPENINGS } from '@/data/md-india-openings';
import { useSectionLink } from './useSectionLink';
import { useEffect, useRef, useState } from 'react';
import {
  PEOPLE_AS_OF, PEOPLE_BASE, PEOPLE_TARGET, PEOPLE_HEADCOUNT, PEOPLE_PLAN,
  PEOPLE_ROLES, PEOPLE_STARTERS, PEOPLE_CRITICAL_ROLES, PEOPLE_JOINING_GAPS,
  PEOPLE_CAPABILITIES, PEOPLE_METRICS, PEOPLE_READY, PEOPLE_UNCOVERED,
} from '@/data/md-people';
import { date } from '@/data/md-scenario';
import { Badge, Bars, Cards, Choice, Metric, Panel, Table } from './Shared';

export default function Hiring({ initial = 'All' }: { initial?: string }) {
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
    <Cards>{[0,1,3,2].map(i => {const metric=PEOPLE_METRICS[i];return <Metric key={metric.name} label={metric.name} value={metric.value} sub={metric.context} tone="mc-amber" onClick={actions[i]}/>;})}</Cards>
    <div className="mc-two">
      <Panel collapsible={false} title="Headcount plan" aside={<span>{PEOPLE_HEADCOUNT} in example · {PEOPLE_BASE} → {PEOPLE_TARGET} planned · Oct 2026–Mar 2027</span>}>
        <Bars data={PEOPLE_PLAN.map(m => ({ label: m.month, planned: m.cumulative, ...(m.due <= PEOPLE_AS_OF ? { actual: PEOPLE_BASE + PEOPLE_STARTERS.filter(s => s.start <= m.due).length } : {}) }))} series={[{ key: 'planned', name: 'Month-end plan', color: '#53677f' }, { key: 'actual', name: 'Actual · illustrative', color: '#80b4fa' }]}/>
      </Panel>
      <Panel collapsible={false} title="Candidate pipeline" aside={<select className="mc-position-select" aria-label="Candidate pipeline position" value={position} onChange={event => setPosition(event.target.value)} title={opening?.title || 'All India openings'}>
        <option value="all">All India openings</option>
        {INDIA_OPENINGS.map(role => <option key={role.id} value={role.id}>{role.title}</option>)}
      </select>}>
        <div className="mc-funnel">{(['screened', 'interviewed', 'reachedNegotiation', 'offersAccepted', 'joined'] as const).map((key, i) => <div key={key}><span>{['Screened', 'Interviewed', 'Negotiation', 'Offers accepted', 'Joined'][i]}</span><div><i style={{ width: `${Math.min(100, sum(key) / pipelineMax * 100)}%` }}/></div><strong>{sum(key)}</strong></div>)}</div>
        <div className="mc-pipeline-caption"><span>Candidates reaching each stage · illustrative</span></div>
      </Panel>
    </div>



    <Panel id="hr-plan" title="Hiring against plan" aside={<Choice label="Hiring priority" value={priority} options={['All', 'Critical']} onChange={setPriority}/>}>
      <Table headers={['Position', 'Planned hires', 'Joined / remaining', 'Interviewing now', 'Negotiating now', 'Offers accepted', 'Yet to join', 'Plan complete by']}>
        {PEOPLE_ROLES.filter(r => priority !== 'Critical' || r.critical).map(r => <tr key={r.role}><th scope="row"><span >{r.role}</span>{r.critical && <small className="mc-amber">Critical skill group</small>}</th><td>{r.count}</td><td>{r.joined} / {r.count - r.joined}</td><td>{r.interviewing}</td><td>{r.offered}</td><td>{r.offersAccepted}</td><td>{r.awaitingJoining}</td><td>{date(r.due)}</td></tr>)}
      </Table>
    </Panel>

    <div id="hr-joining" ref={joiningRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Joining gaps" aside={<></>}>
        <Table headers={['Position', 'Required', 'Forecast', 'Status', 'Impact', 'Owner']}>
          {PEOPLE_JOINING_GAPS.map(r => <tr key={r.id}><th scope="row">{r.id} · {r.role}</th><td>{date(r.due)}</td><td>{date(r.forecast)}</td><td><Badge tone="amber">{r.confirmed ? 'Late · date confirmed' : 'Late · unconfirmed'}</Badge></td><td>{r.impact}</td><td>{r.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div id="hr-critical" ref={criticalRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Critical roles · next 90 days" aside={<></>}>
        <Table headers={['Role', 'Coverage', 'Required', 'Action', 'Owner']}>
          {PEOPLE_CRITICAL_ROLES.map(r => <tr key={r.role}><th scope="row">{r.role}</th><td><Badge tone={r.covered ? 'green' : 'amber'}>{r.coverage}</Badge></td><td>{date(r.due)}</td><td>{r.action}</td><td>{r.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div id="hr-capability" ref={coverRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Critical capability cover" aside={<><></><Choice label="Capability cover" value={coverFilter} options={['Gaps', 'All']} onChange={setCoverFilter}/></>}>
        <Table headers={['Capability', 'Primary coverage', 'Backup / HQ support', 'Action', 'Owner', 'Due']}>
          {(coverFilter === 'Gaps' ? PEOPLE_UNCOVERED : PEOPLE_CAPABILITIES).map(c => <tr key={c.capability}><th scope="row">{c.capability}</th><td>{c.primary}</td><td><Badge tone={c.covered ? 'green' : 'amber'}>{c.backup}</Badge></td><td>{c.action}</td><td>{c.owner}</td><td>{date(c.due)}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div id="hr-onboarding" ref={onboardingRef} tabIndex={-1} style={{scrollMarginTop:16}}>
      <Panel title="Onboarding readiness" aside={<><></><button className="mc-link" aria-expanded={showReady} onClick={() => setShowReady(!showReady)}>{showReady ? 'Hide ready' : `Show ready (${PEOPLE_READY})`}</button></>}>
        <Table headers={['Role / starter', 'Start date', 'Readiness due', 'Status', 'Blocker', 'Owner']}>
          {PEOPLE_STARTERS.filter(s => showReady || !s.ready).map(s => <tr key={s.id}><th scope="row"><span >{s.role}<small>{s.id}</small></span></th><td>{date(s.start)}</td><td>{date(s.due)}</td><td><Badge tone={s.ready ? 'green' : 'amber'}>{s.ready ? 'Ready' : 'Overdue'}</Badge></td><td>{s.blocker || '—'}</td><td>{s.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>



  </>;
}
