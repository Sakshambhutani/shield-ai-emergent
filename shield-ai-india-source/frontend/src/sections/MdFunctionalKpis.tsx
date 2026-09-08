import { MD_FUNCTIONAL_KPIS } from '@/data/md-functional-kpis';

export default function MdFunctionalKpis() {
  return <div className="md-functional-scorecard">
    <div className="md-section-title"><h2>Functional KPIs</h2></div>
    <div className="md-function-scorecards">{MD_FUNCTIONAL_KPIS.map(team => <section className="panel md-function-scorecard" key={team.id} aria-label={`${team.name} KPIs`}>
      <header><h3>{team.name}</h3>{team.id === 'people' && <small>Illustrative HR review · 30 Nov 2026</small>}</header>
      {team.kpis.map(kpi => <article className="md-function-measure" key={kpi.name}>
        <div className="md-function-measure-title"><h4>{kpi.name}</h4><strong>{kpi.value}</strong></div>
        <p className="md-function-target">Target · {kpi.target}</p>
        <p>{kpi.context}</p>
      </article>)}
    </section>)}</div>
  </div>;
}
