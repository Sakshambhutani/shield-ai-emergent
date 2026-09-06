import { useState } from 'react';
import { Headline, Screen } from '@/components/ui';
import { DEFAULT_INPUTS, dollars, SCHEDULE, simulate } from '@/data/md-planning';
import MdAssumptions from './MdAssumptions';
import MdPortfolio from './MdPortfolio';
import MdMetricDetail, { type MdMetric } from './MdMetricDetail';
import './md-dashboard.css';

export default function MdDashboard() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [metric, setMetric] = useState<MdMetric | null>(null);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [delay, setDelay] = useState(0);
  const model = simulate(inputs, delay), base = simulate(inputs);
  const firstAcceptance = SCHEDULE[0].month + delay;
  const risks = [
    ...(model.peakFunding > 0 ? [{ title: 'Funding', signal: `${dollars(model.peakFunding)} maximum cash gap`, action: 'Finance · agree programme funding responsibilities with HQ' }] : []),
    { title: 'Concentration', signal: '100% of model revenue · Army', action: 'BD · qualify follow-ons before expanding the team' },
    delay > 0
      ? { title: 'Acceptance delay', signal: `${dollars(base.years[0].revenue - model.years[0].revenue)} moves out of Y1`, action: 'Programmes · agree acceptance and cash recovery dates' }
      : { title: 'JSW readiness', signal: 'Assumed 80% readiness · 2 sign-offs pending', action: 'Industrialisation · agree JSW readiness and Shield support dates' },
  ];
  const metrics: { label: MdMetric; value: string; context: string }[] = [
    { label: 'Contract value', value: dollars(inputs.contract), context: 'Full term' },
    { label: 'Year 1 revenue', value: model.years[0].revenue > 0 ? dollars(model.years[0].revenue) : 'Acceptance deferred', context: `First acceptance M${firstAcceptance} · Y${Math.ceil(firstAcceptance / 12)}` },
    { label: 'Annual local cost', value: dollars(model.annualRunCost), context: `${inputs.headcount} posts + overhead` },
    { label: 'Maximum cash needed', value: model.peakFunding > 0 ? dollars(model.peakFunding) : 'Covered', context: 'Cash gap before funding' },
  ];
  const rows = [
    { label: 'Revenue', values: model.years.map(y => y.revenue) },
    { label: 'Collections', values: model.years.map(y => y.receipts) },
    { label: 'Programme delivery payments', values: model.years.map(y => y.externalCost) },
    { label: 'People + overhead', values: model.years.map(y => y.localCost) },
    { label: 'Operating contribution', values: model.years.map(y => y.revenue * (1 - inputs.directCost / 100) - y.localCost), total: true },
    { label: 'Remaining contract', values: model.years.map(y => y.remainingValue) },
    { label: 'Cumulative cash', values: model.years.map(y => y.closingCash), total: true },
  ];
  return <Screen className="md-dashboard md-numeric">
    <Headline title="MD Operating Dashboard" sub="Deliver customer commitments. Build the next programmes. Align India and global capacity." right={<button className="md-register-button" onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog">Assumptions ↗</button>} />
    <MdPortfolio />
    <details className="md-disclosure md-planning-drilldown"><summary>Army scenario sensitivity<span>Independent assumptions · four-year view</span></summary><div className="md-planning-content">
    <p className="md-footnote">Changing this scenario does not change the dated portfolio case above. Model months run from mobilisation, not calendar dates.</p>
    <div className="md-numeric-toolbar"><span>Assumed scenario · review weekly · refresh financials monthly</span><button className="md-register-button" onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog">Assumptions ↗</button></div>
    <section aria-label="Business KPIs" className="md-kpis">{metrics.map(m => <button key={m.label} className="panel panel-hover md-kpi" onClick={() => setMetric(m.label)} aria-haspopup="dialog"><span className="md-kpi-label">{m.label}<span>↗</span></span><strong className="md-actual">{m.value}</strong><span className="md-metric-context">{m.context}</span></button>)}</section>
    {delay > 0 && <div className="md-timing-note" role="status">First acceptance: M9 → M{firstAcceptance}. Y1 revenue: {dollars(base.years[0].revenue)} → {dollars(model.years[0].revenue)}. Total contract: {dollars(inputs.contract)} unchanged.</div>}
    <section aria-label="Planning risks"><div className="md-section-title"><h2>Scenario sensitivities</h2><span>Planning watchlist</span></div><div className="md-risk-ledger panel">{risks.map(r => <div key={r.title}><strong>{r.title}</strong><span>{r.signal}</span><small>{r.action}</small></div>)}</div></section>
    <section aria-label="Annual financial metrics"><div className="md-section-title"><h2>Financial performance</h2><span>Y1 = mobilisation year</span></div><div className="md-table-wrap panel"><table className="md-pnl"><thead><tr><th scope="col">USD M</th>{model.years.map(y => <th key={y.year} scope="col">Year {y.year}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.label} className={row.total ? 'md-subtotal' : ''}><th scope="row">{row.label}</th>{row.values.map((value, i) => <td key={i}>{Math.abs(value) < .000001 ? (row.label === 'Remaining contract' ? 'Completed' : 'Outside scheduled period') : dollars(value)}</td>)}</tr>)}</tbody></table></div>{model.futureReceipts > 0 && <div className="md-numeric-tail"><span>Collections after Y4</span><strong>{dollars(model.futureReceipts)}</strong></div>}</section>
    <section aria-label="Delivery milestones"><div className="md-section-title"><h2>Acceptance milestones</h2><span>Contract allocation</span></div><div className="md-gates panel">{SCHEDULE.map(g => <div key={g.month}><span>M{g.month + delay} · {g.share * 100}%</span><strong>{dollars(inputs.contract * g.share)}</strong><small>{g.gate.split(' / ')[0]}</small></div>)}</div></section>
    </div></details>
    <MdMetricDetail metric={metric} inputs={inputs} delay={delay} onClose={() => setMetric(null)} />
    <MdAssumptions open={assumptionsOpen} inputs={inputs} delay={delay} onDelay={setDelay} onApply={setInputs} onClose={() => setAssumptionsOpen(false)} />
  </Screen>;
}
