import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { OPERATING_FUNCTIONS } from '@/data/operating-model';
import { PORTFOLIO_ASSUMPTIONS } from '@/data/md-portfolio';

export default function MdAssumptions({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (open) ref.current?.showModal(); else ref.current?.close(); }, [open]);
  return <dialog ref={ref} className="md-detail md-assumptions" aria-labelledby="assumptions-title" onCancel={onClose} onKeyDown={e => e.stopPropagation()}>
    <header><div><div className="eyebrow">Planning case · 07 Sep 2026</div><h2 id="assumptions-title">Assumptions</h2></div><button autoFocus onClick={onClose} aria-label="Close assumptions"><X size={20} /></button></header>
    <div className="md-detail-body">
      <p>All dates, financials, staffing and performance figures are illustrative. Contract receipts span Shield entities; they are not automatically India cash.</p>
      <h3>Portfolio basis</h3>{PORTFOLIO_ASSUMPTIONS.map(item => <details className="md-register-section" key={item.label}><summary>{item.label}</summary><p>{item.basis}</p></details>)}
      <h3>KPI basis & targets</h3>
      {OPERATING_FUNCTIONS.map(team => <details className="md-register-section" key={team.id}><summary>{team.name}</summary><dl>{team.kpis.map(kpi => <div key={kpi.name}><dt>{kpi.name} · {kpi.value}</dt><dd>{kpi.basis}</dd><dd>Target: {kpi.target}. Escalate: {kpi.trigger}</dd></div>)}</dl></details>)}
    </div>
  </dialog>;
}
