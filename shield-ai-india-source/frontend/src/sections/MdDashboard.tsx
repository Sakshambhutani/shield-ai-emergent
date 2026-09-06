import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Headline, Screen } from '@/components/ui';
import { DEALS, FUNCTIONS, FUNNEL, METRICS, PNL, RISKS, type Detail } from '@/data/md-dashboard';
import './md-dashboard.css';

function SectionTitle({ title, note }: { title: string; note: string }) {
  return <div className="md-section-title"><h2>{title}</h2><span>{note}</span></div>;
}
function DetailDialog({ item, onClose }: { item: Detail | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (item) ref.current?.showModal(); else ref.current?.close(); }, [item]);
  return <dialog ref={ref} className="md-detail" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={e => e.stopPropagation()} aria-labelledby="md-detail-title">
    {item && <div><header><div><div className="eyebrow">Illustrative · June 2026 review</div><h2 id="md-detail-title">{item.title}</h2></div><button autoFocus onClick={onClose} aria-label="Close detail"><X size={20} /></button></header>
      <div className="md-detail-body"><div className="eyebrow">Monthly trend · {item.unit}</div><div className="md-months">{item.trend.map((v, i) => <div key={i}><div className="md-month-bar"><i style={{ height: `${Math.max(4, v / Math.max(...item.trend, 1) * 100)}%` }} /></div><strong>{v}</strong><span>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span></div>)}</div>
        <dl>{[['Underlying programmes / deals', item.programmes], ['Owner', item.owner], ['Target', item.target], ['Variance explanation', item.explanation], ['Next action', item.action]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </div></div>}
  </dialog>;
}
export default function MdDashboard() {
  const [selected, setSelected] = useState<Detail | null>(null);
  const exceptions = RISKS.filter(r => r.value > r.threshold).slice(0, 4);
  const headlineMetrics = METRICS.filter(m => ['bookings', 'revenue', 'margin', 'ebitda'].includes(m.id));
  const interventions: Record<string, { action: string; owner: string }> = {
    'army-risk': { action: 'Assign acceptance ownership', owner: 'MD decision · 03 Jul' },
    'capacity-risk': { action: 'Prioritise 2 integrations; approve critical hiring', owner: 'MD decisions · 03–06 Jul' },
    'concentration-risk': { action: 'Diversify qualified pursuits', owner: 'BD & Ops lead' },
    'industrial-risk': { action: 'Confirm supplier recovery dates', owner: 'Industrialisation lead' },
  };
  return <Screen className="md-dashboard">
    <Headline title="MD Operating Dashboard" sub="Are we selling, delivering, industrialising and operating within financial capacity?" />
    <div className="md-period"><span>YTD · 30 Jun 2026</span><span>Weekly operating review / Monthly finance close</span><span>Illustrative / assumed · USD</span></div>
    <section aria-label="MD Business Scorecard"><SectionTitle title="Business performance" note="Actual against YTD plan" />
      <div className="md-kpis">{headlineMetrics.map(m => <button key={m.id} className="panel panel-hover md-kpi" onClick={() => setSelected(m)} aria-haspopup="dialog"><span className="md-kpi-label">{m.title}<ArrowUpRight size={12} /></span><strong className="md-actual">{m.actual}</strong><div className="md-kpi-comparison"><span>Actual</span><span>Plan <b>{m.plan}</b></span></div><div className="md-kpi-bottom"><span><span className={`md-status ${m.status}`}>{m.variance}</span></span><span className="md-kpi-detail-link">Detail ↗</span></div></button>)}</div>
    </section>
    <details className="md-disclosure"><summary>Commercial engine<span>Pipeline quality, material deals & backlog</span></summary><section aria-label="Commercial Engine">
      <div className="md-funnel panel">{FUNNEL.map(([label, value, movement], i) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{movement}</small>{i < FUNNEL.length - 1 && <ArrowRight size={13} />}</div>)}</div>
      <div className="md-table-wrap"><table className="md-deals"><caption className="sr-only">Four material illustrative opportunities</caption><thead><tr>{['Opportunity', 'Product', 'Value', 'Stage', 'Expected close', 'Movement', 'Blocker'].map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{DEALS.map(d => <tr key={d.name}><th scope="row">{d.name}</th><td>{d.product}</td><td className="num">{d.value}</td><td>{d.stage}</td><td>{d.close}</td><td>{d.movement}</td><td>{d.blocker}</td></tr>)}</tbody></table></div>
      <p className="md-footnote">Pipeline stages are cumulative snapshots; closed and revenue are YTD flows. Backlog is a closing balance.</p>
    </section></details>
    <details className="md-disclosure"><summary>Functional execution<span>Six accountable functions</span></summary><section aria-label="Functional Operating Scorecard">
      <div className="md-functions">{FUNCTIONS.map(f => <button key={f.id} className="panel panel-hover md-function" onClick={() => setSelected(f)} aria-haspopup="dialog"><h3>{f.title}<ArrowUpRight size={13} /></h3><div className="md-function-numbers">{f.numbers.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></button>)}</div>
    </section></details>
    <section aria-label="Financial capacity"><button className="panel panel-hover md-capacity-summary" onClick={() => setSelected(METRICS[6])} aria-haspopup="dialog"><span><strong>Financial capacity</strong><span className="md-capacity-numbers">46% budget consumed <span>/ 50% time elapsed</span></span></span><span className="md-capacity-context">Hiring and delivery catch-up still to fund <ArrowUpRight size={13} /></span></button></section>
    <details className="md-disclosure"><summary>Management P&amp;L<span>Actual, budget & cost variances</span></summary><section aria-label="Financial View">
      <div className="md-table-wrap"><table className="md-pnl"><thead><tr><th scope="col">Management P&amp;L</th><th scope="col">Actual</th><th scope="col">Budget</th><th scope="col">Variance</th></tr></thead><tbody>{PNL.map(row => { const delta = row.actual - row.budget; const favourable = row.total ? delta >= 0 : delta <= 0; return <tr key={row.label} className={row.subtotal ? 'md-subtotal' : ''}><th scope="row">{row.label}</th><td>{row.actual.toFixed(3)}</td><td>{row.budget.toFixed(3)}</td><td className={favourable ? 'green' : 'amber'}>{delta > 0 ? '+' : '−'}{Math.abs(delta).toFixed(3)} {favourable ? 'F' : 'U'}</td></tr>; })}</tbody></table><p className="md-footnote">USD millions · YTD · Variance = actual − budget · F favourable / U unfavourable</p></div>
    </section></details>
    <section aria-label="Exceptions and actions"><SectionTitle title="Exceptions & actions" note="Only triggered issues · decisions shown in context" />
      <div className="panel md-attention">{exceptions.map(r => <button key={r.id} onClick={() => setSelected(r)} aria-haspopup="dialog"><span className="md-attention-issue"><strong><i className={r.severity} />{r.title}</strong><span>{r.id === 'army-risk' ? r.impact : r.id === 'industrial-risk' ? '87% build adherence / 95% threshold' : r.summary}</span></span><span className="md-attention-action"><strong>{interventions[r.id].action}</strong><span>{interventions[r.id].owner}</span></span><ArrowUpRight size={13} /></button>)}</div>
    </section>
    <DetailDialog item={selected} onClose={() => setSelected(null)} />
  </Screen>;
}
