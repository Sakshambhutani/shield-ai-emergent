import { OPERATING_FUNCTIONS } from '@/data/operating-model';

export default function MdFunctionalKpis() {
  return <div className="md-functional-scorecard">
    <div className="md-section-title"><h2>Functional accountability</h2><span>Assumed snapshot · proposed targets · 07 Sep 2026</span></div>
    <p className="md-example-note">Two headline measures per function, supported by diagnostics. Review the next gate and the trend with the owner; escalate when the stated trigger is met. Targets and historical samples are planning assumptions.</p>
    <div className="md-function-scorecards">{OPERATING_FUNCTIONS.map(team => <section className="panel md-function-scorecard" key={team.id} aria-label={`${team.name} KPIs`}>
      <header><h3>{team.name}</h3><p>{team.mandate}</p><span>{team.owner}</span></header>
      {team.kpis.slice(0, 2).map(kpi => <article className="md-function-measure" key={kpi.name}>
        <div className="md-function-measure-title"><h4>{kpi.headline ?? kpi.name}</h4><strong className={kpi.tone}>{kpi.value}</strong></div>
        <p className="md-function-target">Target · {kpi.target}</p>
        <p>{kpi.why}</p>
        <details><summary>Definition, escalation & basis</summary><dl><div><dt>How measured</dt><dd>{kpi.definition}</dd></div><div><dt>Escalate when</dt><dd>{kpi.trigger}</dd></div><div><dt>Review rhythm</dt><dd>{kpi.cadence}</dd></div><div><dt>Shared dependency</dt><dd>{kpi.dependency}</dd></div><div><dt>Assumed basis</dt><dd>{kpi.basis}</dd></div></dl></details>
      </article>)}
      <details className="md-function-diagnostics"><summary>Supporting measures · {team.kpis.slice(2).map(k => k.headline ?? k.name).join(' / ')}</summary>{team.kpis.slice(2).map(kpi => <article className="md-function-measure" key={kpi.name}><div className="md-function-measure-title"><h4>{kpi.name}</h4><strong className={kpi.tone}>{kpi.value}</strong></div><p className="md-function-target">Target · {kpi.target}</p><p>{kpi.definition}</p><dl><div><dt>Why it matters</dt><dd>{kpi.why}</dd></div><div><dt>Escalate when</dt><dd>{kpi.trigger}</dd></div><div><dt>Review rhythm</dt><dd>{kpi.cadence}</dd></div><div><dt>Shared dependency</dt><dd>{kpi.dependency}</dd></div><div><dt>Assumed basis</dt><dd>{kpi.basis}</dd></div></dl></article>)}</details>
    </section>)}</div>
    <section className="panel md-portfolio-brief"><h3>MD Office · resolve the shared constraint</h3><p>Customer acceptance belongs to Programmes; technical evidence to Engineering; productive capacity to People; funded pursuit gates to BD; joint readiness to Industrialisation; cash, margin and rights to Finance / Commercial. Each outcome has one accountable owner and named dependencies.</p><p>The MD reviews missed commitments, decisions approaching their latest safe date, and whether a previous intervention improved the forecast. Do not average these measures into one score or count a shared milestone as several business wins.</p><p className="md-footnote">Weekly: forward delivery, capacity, bid and cash gates. Monthly: accepted outcomes, programme economics, licence obligations and staffing readiness. Retain original due dates and definitions when reviewing performance.</p></section>
  </div>;
}
