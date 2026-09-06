import { useState } from 'react';
import { Headline, Screen } from '@/components/ui';
import { DEFAULT_INPUTS, dollars, PROGRAMMES, SCHEDULE, simulate } from '@/data/md-planning';
import MdAssumptions from './MdAssumptions';
import MdReview from './MdReview';
import MdBusinessReview from './MdBusinessReview';
import MdMetricDetail, { type MdMetric } from './MdMetricDetail';
import './md-dashboard.css';

export default function MdDashboard() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [metric, setMetric] = useState<MdMetric | null>(null);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [delay, setDelay] = useState(0);
  const [dealsOpen, setDealsOpen] = useState(false);
  const model = simulate(inputs, delay), base = simulate(inputs);
  const firstAcceptance = SCHEDULE[0].month + delay;
  const counts = [
    { label: 'Announced award', count: PROGRAMMES.filter(p => p.kind === 'award').length },
    { label: 'Pursuit routes', count: PROGRAMMES.filter(p => p.kind === 'pursuit').length },
    { label: 'Industrial partner', count: PROGRAMMES.filter(p => p.kind === 'partnership').length },
  ];
  const risks = [
    ...(model.peakFunding > 0 ? [{ title: 'Funding', signal: `${dollars(model.peakFunding)} maximum cash gap`, action: 'Finance · secure funding before supplier commitments' }] : []),
    { title: 'Concentration', signal: '100% of model revenue · Army', action: 'BD · qualify follow-ons before expanding the team' },
    delay > 0
      ? { title: 'Acceptance delay', signal: `${dollars(base.years[0].revenue - model.years[0].revenue)} moves out of Y1`, action: 'Programmes · agree acceptance and cash recovery dates' }
      : { title: 'JSW readiness', signal: 'Production gate unverified', action: 'Industrialisation · confirm readiness before order releases' },
  ];
  const metrics: { label: MdMetric; value: string; context: string }[] = [
    { label: 'Contract value', value: dollars(inputs.contract), context: 'Full term' },
    { label: 'Year 1 revenue', value: dollars(model.years[0].revenue), context: `First acceptance M${firstAcceptance} · Y${Math.ceil(firstAcceptance / 12)}` },
    { label: 'Annual local cost', value: dollars(model.annualRunCost), context: `${inputs.headcount} posts + overhead` },
    { label: 'Maximum cash needed', value: dollars(model.peakFunding), context: 'Cash gap before funding' },
  ];
  const rows = [
    { label: 'Revenue', values: model.years.map(y => y.revenue) },
    { label: 'Collections', values: model.years.map(y => y.receipts) },
    { label: 'Supplier payments', values: model.years.map(y => y.externalCost) },
    { label: 'People + overhead', values: model.years.map(y => y.localCost) },
    { label: 'Operating contribution', values: model.years.map(y => y.revenue * (1 - inputs.directCost / 100) - y.localCost), total: true },
    { label: 'Remaining contract', values: model.years.map(y => y.remainingValue) },
    { label: 'Cumulative cash', values: model.years.map(y => y.closingCash), total: true },
  ];
  return <Screen className="md-dashboard md-numeric">
    <Headline title="MD Operating Dashboard" />
    <div className="md-numeric-toolbar"><span>Weekly operations · monthly financial close</span><button className="md-register-button" onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog">Assumptions ↗</button></div>
    <MdReview />
    <details className="md-disclosure md-planning-drilldown"><summary>Long-term plan<span>Contract, four-year cash flow & delivery stress test</span></summary><div className="md-planning-content">
    <section aria-label="Business KPIs" className="md-kpis">{metrics.map(m => <button key={m.label} className="panel panel-hover md-kpi" onClick={() => setMetric(m.label)} aria-haspopup="dialog"><span className="md-kpi-label">{m.label}<span>↗</span></span><strong className="md-actual">{m.value}</strong><span className="md-metric-context">{m.context}</span></button>)}</section>
    {delay > 0 && <div className="md-timing-note" role="status">First acceptance: M9 → M{firstAcceptance}. Y1 revenue: {dollars(base.years[0].revenue)} → {dollars(model.years[0].revenue)}. Total contract: {dollars(inputs.contract)} unchanged.</div>}
    <section aria-label="Deal coverage"><div className="md-section-title"><h2>Deal coverage</h2><span>Tracked here · pursuits are not signed deals</span></div><div className="md-deal-counts panel">{counts.map(c => <button key={c.label} onClick={() => setDealsOpen(!dealsOpen)} aria-expanded={dealsOpen} aria-controls="md-deal-detail"><strong>{c.count}</strong><span>{c.label}</span></button>)}<button className="md-deal-detail-toggle" onClick={() => setDealsOpen(!dealsOpen)} aria-expanded={dealsOpen} aria-controls="md-deal-detail">{dealsOpen ? 'Hide detail −' : 'Deals & partners ↗'}</button></div>{dealsOpen && <div id="md-deal-detail"><MdBusinessReview /></div>}</section>
    <section aria-label="Annual financial metrics"><div className="md-section-title"><h2>Financial performance</h2><span>Y1 = mobilisation year</span></div><div className="md-table-wrap panel"><table className="md-pnl"><thead><tr><th scope="col">USD M</th>{model.years.map(y => <th key={y.year} scope="col">Year {y.year}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.label} className={row.total ? 'md-subtotal' : ''}><th scope="row">{row.label}</th>{row.values.map((value, i) => <td key={i}>{dollars(value)}</td>)}</tr>)}</tbody></table></div>{model.futureReceipts > 0 && <div className="md-numeric-tail"><span>Collections after Y4</span><strong>{dollars(model.futureReceipts)}</strong></div>}</section>
    <section aria-label="Planning risks"><div className="md-section-title"><h2>Risks & actions</h2><span>Planning watchlist</span></div><div className="md-risk-ledger panel">{risks.map(r => <div key={r.title}><strong>{r.title}</strong><span>{r.signal}</span><small>{r.action}</small></div>)}</div></section>
    <section aria-label="Delivery milestones"><div className="md-section-title"><h2>Acceptance milestones</h2><span>Contract allocation</span></div><div className="md-gates panel">{SCHEDULE.map(g => <div key={g.month}><span>M{g.month + delay} · {g.share * 100}%</span><strong>{dollars(inputs.contract * g.share)}</strong><small>{g.gate.split(' / ')[0]}</small></div>)}</div></section>
    </div></details>
    <MdMetricDetail metric={metric} inputs={inputs} delay={delay} onClose={() => setMetric(null)} />
    <MdAssumptions open={assumptionsOpen} inputs={inputs} delay={delay} onDelay={setDelay} onApply={setInputs} onClose={() => setAssumptionsOpen(false)} />
  </Screen>;
}
