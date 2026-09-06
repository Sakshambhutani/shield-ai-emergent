import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { MONTHLY_REVIEWS, WEEKLY_REVIEWS } from '@/data/md-reviews';
import { dollars } from '@/data/md-planning';
type ReviewDetail = { title: string; value: string; note: string; owner: string };
export default function MdReview() {
  const [mode, setMode] = useState<'weekly' | 'monthly'>('weekly');
  const [weekId, setWeekId] = useState(WEEKLY_REVIEWS[0].id);
  const [monthId, setMonthId] = useState(MONTHLY_REVIEWS[0].id);
  const [detail, setDetail] = useState<ReviewDetail | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (detail) dialog.current?.showModal(); else dialog.current?.close(); }, [detail]);
  const week = WEEKLY_REVIEWS.find(w => w.id === weekId)!;
  const month = MONTHLY_REVIEWS.find(m => m.id === monthId)!;
  const weekly = mode === 'weekly';
  const cash = (n: number) => `${n < 0 ? "−" : ""}$${Number((Math.abs(n) * 1000).toFixed(1))}k`;
  const weeklyCards = [
    { title: 'Next acceptance', value: dollars(week.milestoneValue), context: `${week.forecastAcceptance} · plan ${week.plannedAcceptance}`, note: `Forecast moved from ${week.priorForecast} to ${week.forecastAcceptance}. The $4M is the first 20% lot of the $20M example award; exposure means revenue timing, not a confirmed loss.`, owner: 'Programmes' },
    { title: 'Delivery delay', value: `${week.lateDays} days`, context: `${week.priorLateDays} days last week`, note: 'Days between planned acceptance and the latest forecast. This review snapshot is separate from the six-month planning stress test.', owner: 'Programmes' },
    { title: 'Engineering gap', value: `${week.engineersNeeded - week.engineersAvailable} FTE`, context: `${week.engineersNeeded} needed / ${week.engineersAvailable} available`, note: `Prior-week gap: ${week.priorGap} FTE. Illustrative specialist demand, not total India headcount; validate resourcing before promising integration dates.`, owner: 'Engineering + People' },
    { title: 'Open MD actions', value: String(week.actions), context: `${week.priorActions} last week`, note: 'Acceptance ownership, engineering allocation and JSW readiness remain open. The prior snapshot may include additional follow-up items.', owner: 'MD Office' },
  ];
  return <>
    <div className="md-review-controls"><div className="md-review-tabs" role="group" aria-label="Review cadence"><button aria-pressed={weekly} onClick={() => setMode('weekly')}>Weekly operations</button><button aria-pressed={!weekly} onClick={() => setMode('monthly')}>Monthly performance</button></div><label>Period<select aria-label="Reporting period" value={weekly ? weekId : monthId} onChange={e => weekly ? setWeekId(e.target.value) : setMonthId(e.target.value)}>{(weekly ? WEEKLY_REVIEWS : MONTHLY_REVIEWS).map(p => <option key={p.id} value={p.id}>{p.period}</option>)}</select></label></div>
    <div className="md-review-meta"><span>Illustrative review data · not live</span><span>Updated {weekly ? week.updated : month.updated}</span></div>
    <section aria-label={weekly ? 'Weekly KPIs' : 'Monthly KPIs'} className="md-kpis">{weekly ? weeklyCards.map(c => <button key={c.title} className="panel panel-hover md-kpi" onClick={() => setDetail(c)} aria-haspopup="dialog"><span className="md-kpi-label">{c.title} ↗</span><strong className="md-actual">{c.value}</strong><span className="md-metric-context">{c.context}</span></button>) : month.rows.slice(0,4).map(r => <button key={r.label} className="panel panel-hover md-kpi" onClick={() => setDetail({title:r.label,value:cash(r.review),note:r.note,owner:r.owner})} aria-haspopup="dialog"><span className="md-kpi-label">{r.label} ↗</span><strong className="md-actual">{cash(r.review)}</strong><span className="md-metric-context">Plan {cash(r.plan)} · {month.prior} {cash(r.prior)}</span></button>)}</section>
    {weekly ? <>
      <section aria-label="Weekly deal movement"><div className="md-section-title"><h2>Deal movement</h2><span>vs week ending {week.prior}</span></div><div className="md-table-wrap panel"><table className="md-deals"><thead><tr>{['Programme', 'Coverage', 'Movement', 'Next gate / blocker'].map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{week.movements.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((v,i) => <td key={i}>{v}</td>)}</tr>)}</tbody></table></div></section>
      <section aria-label="Weekly risks and actions"><div className="md-section-title"><h2>Risks & actions</h2><span>Current review</span></div><div className="md-risk-ledger panel"><div><strong>Acceptance</strong><span>{dollars(week.milestoneValue)} timing exposure</span><small>Programmes · assign acceptance owner</small></div><div><strong>Capacity</strong><span>{week.engineersNeeded-week.engineersAvailable} FTE gap</span><small>MD · prioritise integration allocation</small></div><div><strong>JSW readiness</strong><span>Gate evidence pending</span><small>Industrialisation · confirm readiness review</small></div></div></section>
    </> : <section aria-label="Monthly comparison"><div className="md-section-title"><h2>Monthly performance</h2><span>USD thousands · closed month</span></div><div className="md-table-wrap panel"><table className="md-pnl"><thead><tr><th scope="col">Metric</th><th scope="col">Review</th><th scope="col">Plan</th><th scope="col">{month.prior}</th></tr></thead><tbody>{month.rows.map(r => <tr key={r.label}><th scope="row">{r.label}</th><td>{cash(r.review)}</td><td>{cash(r.plan)}</td><td>{cash(r.prior)}</td></tr>)}</tbody></table></div><p className="md-footnote">Pre-acceptance phase: revenue starts at a completed gate, not evenly each month. Select a KPI for its calculation.</p></section>}
    <dialog ref={dialog} className="md-detail" aria-labelledby="review-detail-title" onCancel={() => setDetail(null)} onKeyDown={e => e.stopPropagation()}>{detail && <><header><div><div className="eyebrow">Illustrative review · {weekly ? week.period : month.period}</div><h2 id="review-detail-title">{detail.title}</h2></div><button autoFocus aria-label="Close review detail" onClick={() => setDetail(null)}><X size={20}/></button></header><div className="md-detail-body"><strong className="md-actual">{detail.value}</strong><p className="md-functional-check">{detail.note}</p><div className="md-footnote">Owner · {detail.owner}</div></div></>}</dialog>
  </>;
}
