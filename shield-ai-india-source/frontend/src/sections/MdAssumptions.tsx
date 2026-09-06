import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import MdBusinessReview from './MdBusinessReview';
import { CONTRACT_BUILDUP, DEFAULT_INPUTS, INPUT_REGISTER, MD_SOURCES, STRUCTURAL_ASSUMPTIONS, type PlanningInputs } from '@/data/md-planning';
const draftOf = (inputs: PlanningInputs) => Object.fromEntries(Object.entries(inputs).map(([k,v]) => [k, v === null ? '' : String(v)]));
export default function MdAssumptions({ open, inputs, onApply, onClose }: { open: boolean; inputs: PlanningInputs; onApply: (inputs: PlanningInputs) => void; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(draftOf(inputs));
  useEffect(() => { if (open) { setDraft(draftOf(inputs)); ref.current?.showModal(); } else ref.current?.close(); }, [open, inputs]);
  return <dialog ref={ref} className="md-detail md-assumptions" aria-labelledby="assumptions-title" onCancel={onClose} onKeyDown={e => e.stopPropagation()}>
    <header><div><div className="eyebrow">MD dashboard only · reviewed 06 Sep 2026</div><h2 id="assumptions-title">Assumptions & evidence register</h2></div><button autoFocus onClick={onClose} aria-label="Close assumptions"><X size={20} /></button></header>
    <div className="md-detail-body"><p className="md-register-intro">Public facts establish the programme and partnership scope. They do not establish prices, staffing, margins or realised performance. These inputs are a planning case, not an approved budget. Changes apply to this page for the current session.</p>
      <details className="md-register-section"><summary>Verified source anchors</summary>{MD_SOURCES.map(s => <article key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a><p>{s.fact}</p><p className="text-paper-3">{s.boundary}</p></article>)}</details>
      <form onSubmit={e => { e.preventDefault(); const next = { ...inputs }; for (const item of INPUT_REGISTER) { const value = draft[item.key]; next[item.key] = Number(value); } onApply(next); onClose(); }}>
        <h3>Assumed base package · $20M over three years</h3><p>Planning allowances; not disclosed Army pricing. Editing the total scales the scenario and does not assert a priced product split.</p><ul>{CONTRACT_BUILDUP.map(line => <li key={line.scope} className="text-xs text-paper-2 my-2">{line.scope}: ${line.amount}M</li>)}</ul><h3>Numerical inputs · editable planning case</h3>
        {INPUT_REGISTER.map(item => <article className="md-assumption-input" key={item.key}><label htmlFor={`md-input-${item.key}`}>{item.label}<span>{item.unit}</span></label><input id={`md-input-${item.key}`} type="number" value={draft[item.key]} onChange={e => setDraft({ ...draft, [item.key]: e.target.value })} required min={item.min} max={item.max} step={item.key === 'headcount' || item.key === 'collectionLag' ? 1 : 'any'}  /><details><summary>Basis, sensitivity & validation</summary><p>{item.rationale}</p><p><b>Sensitivity:</b> {item.sensitivity}</p><p><b>Owner:</b> {item.owner}</p><p><b>Evidence needed:</b> {item.validate}</p></details></article>)}
        <div className="md-assumption-actions"><button type="submit">Apply to scenario</button><button type="button" onClick={() => setDraft(draftOf(DEFAULT_INPUTS))}>Restore provisional inputs</button></div>
      </form>
      <details className="md-register-section"><summary>Programme & partnership context</summary><MdBusinessReview /></details><h3>Model rules & exclusions</h3>{STRUCTURAL_ASSUMPTIONS.map(a => <details className="md-register-section" key={a.label}><summary>{a.label}</summary><p>{a.basis}</p><p><b>Owner:</b> {a.owner}</p><p><b>Validate:</b> {a.validation}</p></details>)}
      <p className="md-footnote">Retired: fabricated YTD actuals, dollar pipeline, near-term close dates, 68% concentration, generic capture rates and assumed recurring software ARR. No actual programme delay or delivery percentage is asserted.</p>
    </div>
  </dialog>;
}
