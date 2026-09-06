import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { dollars, SCHEDULE, simulate, type PlanningInputs } from '@/data/md-planning';

export type MdMetric = 'Contract value' | 'Year 1 revenue' | 'Annual local cost' | 'Maximum cash needed';
export default function MdMetricDetail({ metric, inputs, delay, onClose }: { metric: MdMetric | null; inputs: PlanningInputs; delay: number; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (metric) ref.current?.showModal(); else ref.current?.close(); }, [metric]);
  const model = simulate(inputs, delay);
  const peak = model.months.reduce((lowest, month) => month.closingCash < lowest.closingCash ? month : lowest, model.months[0]);
  const throughPeak = model.months.slice(0, peak.month);
  const sum = (key: 'receipts' | 'externalCost' | 'localCost') => throughPeak.reduce((n, month) => n + month[key], 0);
  const details: Record<MdMetric, { value: string; note: string; rows: [string, string][] }> = {
    'Contract value': { value: dollars(inputs.contract), note: 'Army programme · full-term scenario value. Optional follow-ons and JSW investment are excluded.', rows: [['Customer / programme', 'Army · V-BAT + Hivemind'], ['First acceptance', `Month ${SCHEDULE[0].month + delay}`], ['Final acceptance', `Month ${SCHEDULE[2].month + delay}`], ['Total allocated to acceptance', dollars(model.years.reduce((n, y) => n + y.revenue, 0))], ['Owner', 'Commercial + Programmes']] },
    'Year 1 revenue': { value: model.years[0].revenue > 0 ? dollars(model.years[0].revenue) : 'Acceptance deferred', note: 'Year 1 includes months 1–12 from mobilisation. Only acceptance gates within that window contribute revenue.', rows: [...SCHEDULE.map(g => [`M${g.month + delay} · ${g.share * 100}% acceptance`, `${dollars(inputs.contract * g.share)} · ${(g.month + delay) <= 12 ? 'in Year 1' : `Year ${Math.ceil((g.month + delay) / 12)}`}`] as [string,string]), ['Year 1 collections (separate)', dollars(model.years[0].receipts)], ['Owner', 'Programmes + Finance']] },
    'Annual local cost': { value: dollars(model.annualRunCost), note: 'Local people and overhead only. Programme delivery payments are tracked separately.', rows: [['Planning posts', String(inputs.headcount)], ['Loaded cost / person / year', `$${inputs.loadedCost.toLocaleString('en-US')}`], ['Annual people cost', dollars(model.annualPeople)], ['Annual non-people overhead', dollars(inputs.overhead)], ['Monthly local cost', dollars(model.annualRunCost / 12)], ['Owner', 'People + Finance']] },
    'Maximum cash needed': { value: model.peakFunding > 0 ? dollars(model.peakFunding) : 'Covered', note: model.peakFunding > 0 ? `Costs exceed customer payments most in month ${peak.month}. This is the cash needed to bridge that gap, after the assumed $1.8M opening cash and before additional financing.` : 'Customer receipts cover modelled outflows throughout the 48-month view; no additional funding gap is calculated.', rows: model.peakFunding > 0 ? [['Opening cash assumption', '$1.8M'], ['Customer receipts', dollars(sum('receipts'))], ['Programme delivery payments', dollars(sum('externalCost'))], ['People + overhead', dollars(sum('localCost'))], ['Largest cash shortfall', dollars(peak.closingCash)], ['Year 4 closing cash', dollars(model.years[3].closingCash)], ['Owner', 'Finance / Treasury']] : [['Year 4 closing cash', dollars(model.years[3].closingCash)], ['Owner', 'Finance / Treasury']] },
  };
  const detail = metric ? details[metric] : null;
  return <dialog ref={ref} className="md-detail" aria-labelledby="md-metric-title" onCancel={onClose} onKeyDown={e => e.stopPropagation()}>
    {detail && <><header><div><div className="eyebrow">Metric detail · current scenario</div><h2 id="md-metric-title">{metric}</h2></div><button autoFocus onClick={onClose} aria-label="Close metric detail"><X size={20} /></button></header><div className="md-detail-body"><strong className="md-actual">{detail.value}</strong><p className="md-functional-check">{detail.note}</p><dl>{detail.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></>}
  </dialog>;
}
