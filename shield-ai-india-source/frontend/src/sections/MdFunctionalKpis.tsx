import { OPERATING_FUNCTIONS } from '@/data/operating-model';

export default function MdFunctionalKpis() {
  return <div className="md-functional-scorecard">
    <div className="md-section-title"><h2>Functional KPIs</h2><span>Two headline measures per owner</span></div>
    <div className="md-function-scorecards">{OPERATING_FUNCTIONS.map(team => <section className="panel md-function-scorecard" key={team.id} aria-label={`${team.name} KPIs`}>
      <header><h3>{team.name}</h3><span>{team.owner}</span></header>
      {team.kpis.slice(0, 2).map(kpi => <article className="md-function-measure" key={kpi.name}>
        <div className="md-function-measure-title"><h4>{kpi.headline ?? kpi.name}</h4><strong className={kpi.tone}>{kpi.value}</strong></div>
        <p className="md-function-target">Target · {kpi.target}</p>
      </article>)}
      <details className="md-function-diagnostics"><summary>Definitions & supporting measures</summary>{team.kpis.map(kpi => <article className="md-function-measure" key={kpi.name}><h4>{kpi.name} · <span className={kpi.tone}>{kpi.value}</span></h4><p>{kpi.definition}</p><dl><div><dt>Target / escalation</dt><dd>{kpi.target}. {kpi.trigger}</dd></div><div><dt>Cadence / dependency</dt><dd>{kpi.cadence}. {kpi.dependency}</dd></div></dl></article>)}</details>
    </section>)}</div>
  </div>;
}
