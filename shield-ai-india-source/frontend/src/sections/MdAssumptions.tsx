import { useEffect, useRef, useState } from 'react';
import { OPERATING_FUNCTIONS } from '@/data/operating-model';
import { PORTFOLIO_ASSUMPTIONS } from '@/data/md-portfolio';
import { X } from 'lucide-react';
import { DEFAULT_INPUTS, INPUT_REGISTER, SCHEDULE, type PlanningInputs } from '@/data/md-planning';
const draftOf = (inputs: PlanningInputs) => Object.fromEntries(Object.entries(inputs).map(([k,v]) => [k, v === null ? '' : String(v)]));
export default function MdAssumptions({ open, inputs, delay, onDelay, onApply, onClose }: { open: boolean; inputs: PlanningInputs; delay: number; onDelay: (delay: number) => void; onApply: (inputs: PlanningInputs) => void; onClose: () => void }) {
  const [draftDelay, setDraftDelay] = useState(delay);
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(draftOf(inputs));
  useEffect(() => { if (open) { setDraft(draftOf(inputs)); setDraftDelay(delay); ref.current?.showModal(); } else ref.current?.close(); }, [open, inputs, delay]);
  return <dialog ref={ref} className="md-detail md-assumptions" aria-labelledby="assumptions-title" onCancel={onClose} onKeyDown={e => e.stopPropagation()}>
    <header><div><div className="eyebrow">Illustrative · current session</div><h2 id="assumptions-title">Assumptions</h2></div><button autoFocus onClick={onClose} aria-label="Close assumptions"><X size={20} /></button></header>
    <div className="md-detail-body">
      <h3>Portfolio assumptions</h3><dl>{PORTFOLIO_ASSUMPTIONS.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.basis}</dd></div>)}</dl>
      <h3>Functional KPI assumptions</h3>
      <p>All targets, escalation thresholds and historical samples are proposed for this planning case. Staffing and flight evidence figures reuse the portfolio data; other samples are explicitly assumed. Ratify targets with each accountable lead before operational use.</p>
      {OPERATING_FUNCTIONS.map(team => <details className="md-register-section" key={team.id}><summary>{team.name}</summary><dl>{team.kpis.map(kpi => <div key={kpi.name}><dt>{kpi.name} · {kpi.value}</dt><dd>{kpi.basis}</dd><dd>Target: {kpi.target}. Escalation: {kpi.trigger}</dd></div>)}</dl></details>)}
      <h3>Editable long-term scenario</h3>
      <form onSubmit={e => { e.preventDefault(); const next = { ...inputs }; for (const item of INPUT_REGISTER) { const value = draft[item.key]; next[item.key] = Number(value); } onApply(next); onDelay(draftDelay); onClose(); }}>
        <label className="md-scenario-select">Acceptance delay<select aria-label="Delivery stress test" value={draftDelay} onChange={e => setDraftDelay(Number(e.target.value))}><option value={0}>Base schedule</option><option value={6}>6 months</option></select></label>
        {INPUT_REGISTER.map(item => <article className="md-assumption-input" key={item.key}><label htmlFor={`md-input-${item.key}`}>{item.label}<span>{item.unit}</span></label><input id={`md-input-${item.key}`} type="number" value={draft[item.key]} onChange={e => setDraft({ ...draft, [item.key]: e.target.value })} required min={item.min} max={item.max} step={item.key === 'headcount' || item.key === 'collectionLag' ? 1 : 'any'}  /></article>)}
        <div className="md-assumption-actions"><button type="submit">Apply to scenario</button><button type="button" onClick={() => { setDraft(draftOf(DEFAULT_INPUTS)); setDraftDelay(0); }}>Reset defaults</button></div>
      </form>
      <h3>Fixed variables</h3>
      <dl>{[
        ['Forecast horizon', '48 months'],
        ...SCHEDULE.map(g => [g.gate, `Month ${g.month + draftDelay} · ${g.share * 100}%`]),
        ['Assumed programme payment lead', '3 months before acceptance'],
        ['Retention', '10%'],
        ['Retention release', '12 months after final acceptance'],
        ['Opening cash', '$1.8M planning allocation'],
      ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
  </dialog>;
}
