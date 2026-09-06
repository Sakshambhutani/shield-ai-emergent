import { useState } from 'react';
import { Headline, Screen } from '@/components/ui';
import { DEFAULT_INPUTS, dollars, SCHEDULE, simulate } from '@/data/md-planning';
import MdAssumptions from './MdAssumptions';
import './md-dashboard.css';

export default function MdDashboard() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [delay, setDelay] = useState(0);
  const model = simulate(inputs, delay), base = simulate(inputs);
  const metrics = [
    { label: 'Contract value', value: dollars(inputs.contract), context: 'Full term' },
    { label: 'Year 1 revenue', value: dollars(model.years[0].revenue), context: 'At acceptance' },
    { label: 'Annual local cost', value: dollars(model.annualRunCost), context: `${inputs.headcount} posts + overhead` },
    { label: 'Peak funding', value: dollars(model.peakFunding), context: 'Before financing' },
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
    <div className="md-numeric-toolbar"><span>Assumed scenario · USD millions</span><label className="md-scenario-select">Delivery<select aria-label="Delivery case" value={delay} onChange={e => setDelay(Number(e.target.value))}><option value={0}>Base case</option><option value={6}>+6 months</option></select></label><button className="md-register-button" onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog">Assumptions ↗</button></div>
    <section aria-label="Business KPIs" className="md-kpis">{metrics.map(m => <button key={m.label} className="panel panel-hover md-kpi" onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog"><span className="md-kpi-label">{m.label}<span>↗</span></span><strong className="md-actual">{m.value}</strong><span className="md-metric-context">{m.context}</span></button>)}</section>
    <section aria-label="Annual financial metrics"><div className="md-section-title"><h2>Financial performance</h2><span>Y1 = mobilisation year</span></div><div className="md-table-wrap panel"><table className="md-pnl"><thead><tr><th scope="col">USD M</th>{model.years.map(y => <th key={y.year} scope="col">Year {y.year}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.label} className={row.total ? 'md-subtotal' : ''}><th scope="row">{row.label}</th>{row.values.map((value, i) => <td key={i}>{dollars(value)}</td>)}</tr>)}</tbody></table></div>{model.futureReceipts > 0 && <div className="md-numeric-tail"><span>Collections after Y4</span><strong>{dollars(model.futureReceipts)}</strong></div>}</section>
    <section aria-label="Delivery milestones"><div className="md-section-title"><h2>Acceptance milestones</h2><span>Contract allocation</span></div><div className="md-gates panel">{SCHEDULE.map(g => <div key={g.month}><span>M{g.month + delay} · {g.share * 100}%</span><strong>{dollars(inputs.contract * g.share)}</strong><small>{g.gate.split(' / ')[0]}</small></div>)}</div></section>
    {delay > 0 && <div className="md-numeric-delta" role="status"><span>Δ vs base</span><span>Y1 revenue <strong>{dollars(model.years[0].revenue - base.years[0].revenue)}</strong></span><span>Peak funding <strong>{model.peakFunding > base.peakFunding ? '+' : ''}{dollars(model.peakFunding - base.peakFunding)}</strong></span></div>}
    <MdAssumptions open={assumptionsOpen} inputs={inputs} onApply={setInputs} onClose={() => setAssumptionsOpen(false)} />
  </Screen>;
}
