import { useEffect, useRef, useState } from 'react';
import {
  PEOPLE_AS_OF, PEOPLE_BASE, PEOPLE_TARGET, PEOPLE_HEADCOUNT, PEOPLE_PLAN,
  PEOPLE_ROLES, PEOPLE_STARTERS, PEOPLE_CRITICAL_ROLES, PEOPLE_JOINING_GAPS,
  PEOPLE_CAPABILITIES, PEOPLE_METRICS, PEOPLE_READY, PEOPLE_UNCOVERED,
} from '@/data/md-people';
import { date } from '@/data/md-scenario';
import { Badge, Bars, Cards, Choice, Metric, Panel, Table, type Inspect } from './Shared';

export default function Hiring({ inspect, initial = 'All' }: { inspect: Inspect; initial?: string }) {
  const [priority, setPriority] = useState(initial === 'Critical' ? 'Critical' : 'All');
  const [showReady, setShowReady] = useState(false);
  const [coverFilter, setCoverFilter] = useState('Gaps');
  const joiningRef = useRef<HTMLDivElement>(null);
  const criticalRef = useRef<HTMLDivElement>(null);
  const onboardingRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const jump = (element: HTMLDivElement | null) => { element?.scrollIntoView({ behavior: 'smooth', block: 'start' }); element?.focus({ preventScroll: true }); };
  useEffect(() => { if (initial === 'Joining gaps') jump(joiningRef.current); }, [initial]);
  const actions = [() => jump(joiningRef.current), () => jump(criticalRef.current), () => { setShowReady(false); jump(onboardingRef.current); }, () => { setCoverFilter('Gaps'); jump(coverRef.current); }];
  const sum = (key: 'applied' | 'screening' | 'interviewing' | 'offered' | 'accepted' | 'joined') => PEOPLE_ROLES.reduce((total, role) => total + role[key], 0);
  const inspectMetric = (index: number) => {
    const metric = PEOPLE_METRICS[index];
    inspect({ title: metric.name, rows: [['Basis', metric.period], ['Calculation', metric.definition], ...metric.details.map(d => [d.label, d.text] as [string, string])] });
  };
  return <>
    <Cards>{PEOPLE_METRICS.map((metric, i) => <Metric key={metric.name} label={metric.name} value={metric.value} sub={metric.context} tone="mc-amber" onClick={actions[i]}/>)}</Cards>

    <div className="mc-two">
      <Panel title="Headcount plan" aside={<span>{PEOPLE_HEADCOUNT} today · {PEOPLE_BASE} → {PEOPLE_TARGET} planned · Oct 2026–Mar 2027</span>}>
        <Bars data={PEOPLE_PLAN.map(m => ({ label: m.month, planned: m.cumulative, ...(m.due <= PEOPLE_AS_OF ? { actual: PEOPLE_BASE + PEOPLE_STARTERS.filter(s => s.start <= m.due).length } : {}) }))} series={[{ key: 'planned', name: 'Month-end plan', color: '#53677f' }, { key: 'actual', name: 'Actual · illustrative', color: '#80b4fa' }]}/>
      </Panel>
      <Panel title="Candidate pipeline" aside={<span>{sum('accepted')} accepted · awaiting joining</span>}>
        <div className="mc-funnel">{(['screening', 'interviewing', 'offered', 'accepted', 'joined'] as const).map((key, i) => <div key={key}><span>{['Screening', 'Interviewing', 'Offer pending', 'Accepted', 'Joined'][i]}</span><div><i style={{ width: `${Math.max(1, sum(key) / Math.max(1, sum('screening')) * 100)}%` }}/></div><strong>{sum(key)}</strong></div>)}</div>
      </Panel>
    </div>

    <div ref={onboardingRef} tabIndex={-1}>
      <Panel title="Onboarding readiness" aside={<><button className="mc-link" onClick={() => inspectMetric(2)}>Definition ↗</button><button className="mc-link" aria-expanded={showReady} onClick={() => setShowReady(!showReady)}>{showReady ? 'Hide ready' : `Show ready (${PEOPLE_READY})`}</button></>}>
        <Table headers={['Role / starter', 'Start date', 'Readiness due', 'Status', 'Blocker', 'Owner']}>
          {PEOPLE_STARTERS.filter(s => showReady || !s.ready).map(s => <tr key={s.id}><th scope="row"><button className="mc-link" onClick={() => inspect({ title: `${s.id} · ${s.role}`, rows: [['Basis', 'Illustrative starter record'], ['Assigned readiness task', s.assignment], ['Manager', s.owner], ['Readiness due', date(s.due)], ['Signed off', s.ready ? date(s.ready) : 'Awaiting sign-off'], ['Blocker', s.blocker || 'None']] })}>{s.role}<small>{s.id}</small></button></th><td>{date(s.start)}</td><td>{date(s.due)}</td><td><Badge tone={s.ready ? 'green' : 'amber'}>{s.ready ? 'Ready' : 'Overdue'}</Badge></td><td>{s.blocker || '—'}</td><td>{s.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div ref={coverRef} tabIndex={-1}>
      <Panel title="Critical capability cover" aside={<><button className="mc-link" onClick={() => inspectMetric(3)}>Definition ↗</button><Choice label="Capability cover" value={coverFilter} options={['Gaps', 'All']} onChange={setCoverFilter}/></>}>
        <Table headers={['Capability', 'Primary coverage', 'Backup / HQ support', 'Action', 'Owner', 'Due']}>
          {(coverFilter === 'Gaps' ? PEOPLE_UNCOVERED : PEOPLE_CAPABILITIES).map(c => <tr key={c.capability}><th scope="row">{c.capability}</th><td>{c.primary}</td><td><Badge tone={c.covered ? 'green' : 'amber'}>{c.backup}</Badge></td><td>{c.action}</td><td>{c.owner}</td><td>{date(c.due)}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div ref={criticalRef} tabIndex={-1}>
      <Panel title="Critical roles · next 90 days" aside={<button className="mc-link" onClick={() => inspectMetric(1)}>Definition ↗</button>}>
        <Table headers={['Role', 'Coverage', 'Required', 'Action', 'Owner']}>
          {PEOPLE_CRITICAL_ROLES.map(r => <tr key={r.role}><th scope="row">{r.role}</th><td><Badge tone={r.covered ? 'green' : 'amber'}>{r.coverage}</Badge></td><td>{date(r.due)}</td><td>{r.action}</td><td>{r.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <div ref={joiningRef} tabIndex={-1}>
      <Panel title="Joining gaps" aside={<button className="mc-link" onClick={() => inspectMetric(0)}>Hiring definition ↗</button>}>
        <Table headers={['Position', 'Required', 'Forecast', 'Status', 'Impact', 'Owner']}>
          {PEOPLE_JOINING_GAPS.map(r => <tr key={r.id}><th scope="row">{r.id} · {r.role}</th><td>{date(r.due)}</td><td>{date(r.forecast)}</td><td><Badge tone="amber">{r.confirmed ? 'Late · date confirmed' : 'Late · unconfirmed'}</Badge></td><td>{r.impact}</td><td>{r.owner}</td></tr>)}
        </Table>
      </Panel>
    </div>

    <Panel title="Position plan" aside={<Choice label="Hiring priority" value={priority} options={['All', 'Critical']} onChange={setPriority}/>}>
      <Table headers={['Position', 'Planned hires', 'Joined / remaining', 'Interviews', 'Offers / accepted', 'Plan complete by']}>
        {PEOPLE_ROLES.filter(r => priority !== 'Critical' || r.critical).map(r => <tr key={r.role}><th scope="row"><button className="mc-link" onClick={() => inspect({ title: r.role, rows: [['Basis', 'Illustrative six-month position plan'], ['Business need', r.need], ['Planned hires', String(r.count)], ['Joined', String(r.joined)], ['Remaining', String(r.count - r.joined)], ['Applications to date', String(r.applied)], ['Screening', String(r.screening)], ['Interviews', String(r.interviewing)], ['Offers pending / accepted', `${r.offered} / ${r.accepted}`]] })}>{r.role}</button>{r.critical && <small className="mc-amber">Critical skill group</small>}</th><td>{r.count}</td><td>{r.joined} / {r.count - r.joined}</td><td>{r.interviewing}</td><td>{r.offered} / {r.accepted}</td><td>{date(r.due)}</td></tr>)}
      </Table>
    </Panel>
  </>;
}
