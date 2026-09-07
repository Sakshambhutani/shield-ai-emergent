import { useState } from 'react';
import MdFunctionalKpis from './MdFunctionalKpis';
import { CONTRACTS, ENGINEERING_WORK, ENGAGEMENTS, MD_DECISIONS, PAYMENTS, PORTFOLIO_DATE, PORTFOLIO_TOTALS as totals, PROGRAMME_PORTFOLIO, TRIAL_CAMPAIGNS, dateLabel, daysUntil, money } from '@/data/md-portfolio';

const VIEWS = ['Overview', 'Programmes', 'Engineering', 'Cash & licences', 'KPIs', 'Calendar'] as const;
type View = typeof VIEWS[number];
const Title = ({ title, note }: { title: string; note?: string }) => <div className="md-section-title"><h2>{title}</h2>{note && <span>{note}</span>}</div>;
const shortDate = (date: string) => dateLabel(date).replace(/ 202\d$/, '');
const budget = (amount: number) => `$${Math.round(amount * 1000)}k`;

export default function MdPortfolio() {
  const [view, setView] = useState<View>('Overview');
  const [programme, setProgramme] = useState('all');
  const [horizon, setHorizon] = useState('90');
  const [calendarHorizon, setCalendarHorizon] = useState('30');
  const navigate = (next: View, id = 'all') => { setProgramme(id); setView(next); };
  const selected = PROGRAMME_PORTFOLIO.filter(p => programme === 'all' || p.id === programme);
  const payments = PAYMENTS.filter(p => (programme === 'all' || p.programme === programme) && (horizon === 'all' || (p.status !== 'Received' && daysUntil(p.due) >= 0 && daysUntil(p.due) <= Number(horizon))));
  const meetings = ENGAGEMENTS.filter(e => (programme === 'all' || e.programme === programme) && daysUntil(e.date) >= 0 && (calendarHorizon === 'all' || daysUntil(e.date) <= Number(calendarHorizon))).sort((a, b) => a.date.localeCompare(b.date));
  const contracts = CONTRACTS.filter(c => programme === 'all' || c.id === programme);
  const work = ENGINEERING_WORK.filter(w => programme === 'all' || w.id === programme || (programme === 'army' && w.id === 'sdk'));
  const upcoming = ENGAGEMENTS.filter(e => daysUntil(e.date) >= 0).sort((a,b) => a.date.localeCompare(b.date)).slice(0,3);
  const flights = TRIAL_CAMPAIGNS.reduce((s, t) => s + t.completed, 0);
  const plannedFlights = TRIAL_CAMPAIGNS.reduce((s, t) => s + t.planned, 0);
  const acceptedReports = TRIAL_CAMPAIGNS.reduce((s, t) => s + t.accepted, 0);
  return <div className="md-portfolio">
    <div className="md-period">{dateLabel(PORTFOLIO_DATE)}</div>
    <div className="md-portfolio-controls">
      <div className="md-portfolio-nav" role="group" aria-label="Dashboard views">{VIEWS.map(v => <button key={v} aria-pressed={view === v} onClick={() => navigate(v)}>{v}</button>)}</div>
      {view !== 'Overview' && view !== 'KPIs' && <label>Programme<select aria-label="Filter dashboard programme" value={programme} onChange={e => setProgramme(e.target.value)}><option value="all">All programmes</option>{PROGRAMME_PORTFOLIO.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>}
    </div>
    <div className="md-portfolio-view" aria-label={view}>
      {view === 'Overview' && <>
        <div className="md-critical-signals">
          <button className="panel" onClick={() => navigate('Programmes', 'army')}><span>Army deployment</span><strong className="red">+14 days</strong><small>30 Sep → 14 Oct forecast</small></button>
          <button className="panel" onClick={() => navigate('Engineering')}><span>Engineering gap</span><strong className="amber">{totals.required - totals.assigned} people</strong><small>{totals.assigned} assigned / {totals.required} needed</small></button>
          <button className="panel" onClick={() => { setHorizon('90'); navigate('Cash & licences'); }}><span>Receipts at risk</span><strong className="amber">{money(totals.nextCash)}</strong><small>Army + JSW · next 90 days</small></button>
        </div>
        <section><Title title="Decisions required" note="Ordered by due date" /><div className="panel md-decision-ledger">{MD_DECISIONS.slice().sort((a,b) => a.due.localeCompare(b.due)).map(d => <details key={d.id} className="md-compact-decision"><summary><span className="md-ledger-date">{shortDate(d.due)}</span><span><strong>{d.title}</strong><span className="md-ledger-copy">{d.brief}</span><small>{d.owner}</small></span><span className="md-expand" aria-hidden="true">+</span></summary><div className="md-ledger-detail"><p>{d.request}</p><p>{d.consequence}</p><p><b>Close with:</b> {d.closure}</p></div></details>)}</div></section>
        <section><Title title="Next meetings" /><div className="md-next-meetings">{upcoming.map(e => <button key={e.meeting} onClick={() => navigate('Calendar', e.programme)}><span>{shortDate(e.date)}</span><strong>{e.meeting}</strong></button>)}</div></section>
      </>}
      {view === 'KPIs' && <MdFunctionalKpis />}
      {view === 'Programmes' && <>
        <section><Title title="Next programme gates" note={programme === 'all' ? `${selected.length} programmes · ${money(totals.pursuit)} in pursuits` : `${selected.length} programme in view`} /><div className="md-compact-list">{selected.map(p => <details key={p.id} className="panel md-programme-row"><summary><span><strong>{p.name}</strong><small>{p.owner}</small></span><span className={p.tone}>{p.status}</span><span>{p.next}</span><span className="md-expand" aria-hidden="true">+</span></summary><div className="md-ledger-detail"><p>{p.outcome}</p><dl className="md-brief-facts"><div><dt>Commitment</dt><dd>{p.commitment}</dd></div><div><dt>Forecast</dt><dd>{p.forecast}</dd></div><div><dt>Dependency</dt><dd>{p.dependency}</dd></div><div><dt>Commercial</dt><dd>{money(p.value)} · {p.stage}. {p.impact}</dd></div><div><dt>MD action</dt><dd>{p.action}</dd></div><div><dt>6 / 12 months</dt><dd>{p.six}<br />{p.twelve}</dd></div></dl></div></details>)}</div></section>
        {(programme === 'all' || programme === 'maritime' || programme === 'urgent') && <details className="panel md-secondary-detail"><summary>Maritime acquisition windows · 6 / 12 months</summary><div className="md-ledger-detail"><p><b>Capital · $8M pursuit:</b> AoN → RFP → bid → evaluation → award. RFP planning cases: 01 Mar or 01 Sep 2027; pre-bid follows by two weeks.</p><p><b>Urgent pilot · $1.2M pursuit:</b> funding decision 30 Oct 2026; delivery 15 Jan 2027 if awarded. Separate scope and buying route.</p><p className="md-footnote">Planning windows, not statutory deadlines. Procurement basis: <a href="https://www.ddpmod.gov.in/sites/default/files/DAP%202020%20%2011%20Nov%2021_0.pdf" target="_blank" rel="noreferrer">MoD DAP 2020</a>.</p></div></details>}
      </>}
      {view === 'Engineering' && <>
        <section><Title title="Capacity & commitments" note={`${totals.assigned} assigned / ${totals.required} needed · entire portfolio`} /><div className="md-table-wrap panel"><table className="md-deals"><thead><tr>{['Workstream', 'Assigned / needed', 'Next deliverable', 'Dependency'].map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{work.map(w => <tr key={w.id}><th scope="row">{w.name}</th><td><strong className={w.assigned < w.required ? 'amber' : ''}>{w.assigned} / {w.required}</strong></td><td>{w.deliverable}</td><td>{w.global}</td></tr>)}</tbody></table>{!work.length && <p className="md-empty">Team allocation follows the bid or paid-scope decision.</p>}</div></section>
        {(programme === 'all' || programme === 'army') && <details className="panel md-secondary-detail"><summary>Army trials · {flights} / {plannedFlights} flights · {acceptedReports} reports accepted</summary><div className="md-ledger-detail"><div className="md-table-wrap"><table className="md-deals"><thead><tr>{['Campaign', 'Flights', 'Reports accepted', 'Next review'].map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{TRIAL_CAMPAIGNS.map(t => <tr key={t.terrain}><th scope="row">{t.terrain}</th><td>{t.completed} / {t.planned}</td><td>{t.accepted}</td><td>{t.next}<small>{t.owner}</small></td></tr>)}</tbody></table></div><p>SDK pack: 30 Sep. HQ research review: 09 Oct. Protect 2 engineers; completed flights require accepted evidence.</p></div></details>}
      </>}
      {view === 'Cash & licences' && <>
        <section><div className="md-section-title"><h2>Receipts & acceptance gates</h2><label className="md-payment-filter">Window<select aria-label="Payment window" value={horizon} onChange={e => setHorizon(e.target.value)}><option value="90">Next 90 days</option><option value="365">Next 12 months</option><option value="all">Full contract life</option></select></label></div><div className="md-table-wrap panel"><table className="md-deals"><thead><tr>{['Due', 'Contract', 'Receipt', 'Status', 'Required to collect'].map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{payments.slice().sort((a,b) => a.due.localeCompare(b.due)).map(p => <tr key={p.invoice}><th scope="row">{dateLabel(p.due)}</th><td>{p.contract}</td><td>{money(p.amount)}</td><td className={p.status === 'At risk' ? 'amber' : p.status === 'Received' ? 'green' : ''}>{p.status}</td><td>{p.trigger}<details><summary>Invoice / entity</summary><p>{p.invoice}</p><p>{p.entity}</p></details></td></tr>)}</tbody></table>{!payments.length && <p className="md-empty">No receipts in this window. Select full contract life for later milestones.</p>}</div></section>
        <div className="md-cash-context"><span>Contracts <strong>{money(totals.contracts)}</strong></span><span>Received <strong>{money(totals.received)}</strong></span><span>India spend / allocation <strong>$615k / $660k</strong></span></div>
        <p className="md-footnote">Portfolio receipts span Shield entities. India funding is a separate HQ allocation.</p>
        <section><Title title="Contracts & licence reviews" /><div className="md-compact-list">{contracts.map(c => <details key={c.id} className="panel md-contract-row"><summary><strong>{c.name}</strong><span>{c.period}</span><span>{money(c.value)}</span></summary><div className="md-ledger-detail"><p>{c.licence}</p><p><b>Next review:</b> {c.renewal}</p><p>{c.entity}</p></div></details>)}</div>{!contracts.length && <p className="md-empty">Pursuit only; excluded from signed contract value.</p>}</section>
      </>}
      {view === 'Calendar' && <section><div className="md-section-title"><h2>Customer & partner meetings</h2><label className="md-payment-filter">Window<select aria-label="Calendar window" value={calendarHorizon} onChange={e => setCalendarHorizon(e.target.value)}><option value="30">Next 30 days</option><option value="90">Next 90 days</option><option value="all">Full calendar</option></select></label></div><div className="md-compact-list">{meetings.map(e => <details key={e.meeting} className="panel md-calendar-row"><summary><span className="md-ledger-date">{dateLabel(e.date)}</span><span><strong>{e.meeting}</strong><span className="md-ledger-copy">{e.purpose}</span></span><span className="md-expand" aria-hidden="true">+</span></summary><div className="md-ledger-detail"><p>{e.people} · {budget(e.budget)} budget</p><p><b>Prepare:</b> {e.preparation}</p><p><b>Follow-up:</b> {e.followup}</p></div></details>)}</div>{!meetings.length && <p className="md-empty">No meetings in this selection. Widen the window or select all programmes.</p>}</section>}
    </div>
  </div>;
}
