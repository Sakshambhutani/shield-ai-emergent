import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Headline, Screen } from '@/components/ui';
import './cadence.css';

const LAYERS = [
  {
    id: 'milestone',
    name: 'VALIDATE',
    period: 'Programme milestones',
    cadence: 'At agreed programme milestones',
    format: 'Programme-specific checkpoints for Army, maritime, JSW partnership and other customer, partner or HQ commitments.',
    outer: 110,
    inner: 0,
    labelY: 490,
    measures: [
      'Deliverables and timelines against programme commitments',
      'Customer, partner and HQ acceptance criteria',
      'Open gaps and readiness for the next milestone',
    ],
    decisions: ['Accept deliverables', 'Agree recovery dates', 'Confirm next milestone'],
  },
  {
    id: 'weekly',
    name: 'OPERATE',
    period: 'Weekly',
    cadence: 'Weekly · brief operational touchpoint',
    format: 'Bring functions together to prioritise the week’s most important tasks and unblock delivery.',
    outer: 200,
    inner: 110,
    labelY: 338,
    measures: [
      'Progress on last week’s commitments',
      'Urgent blockers and cross-functional dependencies',
      'Priority tasks and capacity for the coming week',
    ],
    decisions: ['Prioritise the week', 'Assign owners and dates', 'Unblock or escalate'],
  },
  {
    id: 'monthly',
    name: 'ALIGN',
    period: 'Monthly',
    cadence: 'Monthly · a couple of checkpoint meetings',
    format: 'Check that quarterly goals remain achievable and coordinate operational fixes across functions.',
    outer: 290,
    inner: 200,
    labelY: 248,
    measures: [
      'Progress and risks against quarterly goals',
      'Operational roadblocks and shared dependencies',
      'Resource gaps and follow-through on agreed actions',
    ],
    decisions: ['Resolve roadblocks', 'Rebalance resources', 'Confirm corrective actions'],
  },
  {
    id: 'quarterly',
    name: 'REVIEW',
    period: 'Quarterly',
    cadence: 'Quarterly · discussions across roughly one week',
    format: 'Focused functional and cross-functional roadmap sessions connect the quarter’s results to the next quarter’s milestones.',
    outer: 380,
    inner: 290,
    labelY: 158,
    measures: [
      'Quarterly goals achieved, missed and lessons learned',
      'Functional KPIs and milestone gaps',
      'Roadmap priorities and dependencies by function',
      'Capacity and resources needed for the next quarter',
    ],
    decisions: ['Set quarterly goals', 'Sequence the roadmap', 'Commit milestone owners and dates'],
  },
  {
    id: 'yearly',
    name: 'STEER',
    period: 'Yearly',
    cadence: 'Yearly · planning cycle over roughly two weeks',
    format: 'Leadership-led planning with in-person / offsite working sessions, reconciling the past year and setting direction for the next.',
    outer: 470,
    inner: 380,
    labelY: 68,
    measures: [
      'Prior-year results, shortfalls and lessons learned',
      'Annual operating plan and business plan',
      'Financial plan, budgets and funding needs',
      'Yearly targets, high-level goals and KPIs',
      'Annual hiring and organisational capacity plans',
      'Major milestones, future opportunities and strategic bets',
    ],
    decisions: ['Approve annual plans', 'Allocate budgets and funds', 'Set targets and hiring plans', 'Commit strategic bets'],
  },
] as const;

type LayerId = typeof LAYERS[number]['id'];
const RING_QUESTIONS: Partial<Record<LayerId, { text: string; y: number }>> = {
  weekly: { text: 'What matters most this week?', y: 661 },
  monthly: { text: 'Are quarterly goals on track?', y: 751 },
  quarterly: { text: 'What must the next quarter deliver?', y: 841 },
  yearly: { text: 'Where do we go next year?', y: 931 },
};

// Separate annular hit areas keep selection and highlighting on exactly one layer.
function ringPath(outer: number, inner: number) {
  const circle = (radius: number) => `M 500 ${500 - radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 ${-radius * 2} Z`;
  return circle(outer) + (inner ? ` ${circle(inner)}` : '');
}

export default function Cadence() {
  const [selected, setSelected] = useState<LayerId | null>('milestone');
  const [hasInteracted, setHasInteracted] = useState(false);
  const ringRefs = useRef<Partial<Record<LayerId, SVGGElement | null>>>({});
  const active = LAYERS.find(layer => layer.id === selected);
  const close = () => {
    if (selected) ringRefs.current[selected]?.focus();
    setSelected(null);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (selected) ringRefs.current[selected]?.focus();
        setSelected(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return <Screen className="cadence-screen">
    <Headline title="A rhythm for delivery and growth" sub="Operate weekly, align monthly, review quarterly and steer yearly, with programme milestones throughout." />
    <div className={`cadence-layout${active ? ' has-selection' : ''}${hasInteracted ? '' : ' show-click-cue'}`}>
      <svg className="cadence-circles" viewBox="0 0 1000 1000" role="group" aria-label="Cadence layers" data-testid="decision-rhythm">
        {LAYERS.map(layer => <g key={layer.id} ref={node => { ringRefs.current[layer.id] = node; }}
          className={`cadence-layer${selected === layer.id ? ' is-selected' : ''}`}
          role="button" tabIndex={0} aria-label={`${layer.name}. ${layer.cadence}. Show measures and decisions`}
          aria-pressed={selected === layer.id} aria-expanded={selected === layer.id}
          aria-controls={selected === layer.id ? 'cadence-questions' : undefined}
          data-testid={`cadence-ring-${layer.id}`}
          onClick={() => { setHasInteracted(true); setSelected(selected === layer.id ? null : layer.id); }}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setHasInteracted(true);
              setSelected(selected === layer.id ? null : layer.id);
            }
          }}>
          <path d={ringPath(layer.outer, layer.inner)} fillRule="evenodd" className="cadence-ring" />
          <path d={ringPath(layer.outer, layer.inner)} fillRule="evenodd" className={`cadence-click-cue cue-${layer.id}`} aria-hidden="true" />
          <g textAnchor="middle" className="cadence-ring-copy">
            <text x="500" y={layer.labelY} className="cadence-horizon-name">{layer.name}</text>
            <text x="500" y={layer.labelY + 26} className="cadence-period">{layer.period}</text>
            <text x="500" y={RING_QUESTIONS[layer.id]?.y} className="cadence-question">{RING_QUESTIONS[layer.id]?.text}</text>
          </g>
        </g>)}
      </svg>
      {active && <aside id="cadence-questions" className="cadence-questions" aria-labelledby="cadence-questions-title" aria-live="polite">
        <div className="cadence-panel-heading">
          <h2 id="cadence-questions-title">{active.name}</h2>
          <button type="button" onClick={close} aria-label="Close cadence details"><X size={18} /></button>
        </div>
        <p className="cadence-panel-period">{active.cadence}</p>
        <p className="cadence-panel-format">{active.format}</p>
        <section className="cadence-panel-section" aria-labelledby="cadence-review-title">
          <h3 id="cadence-review-title">Review</h3>
          <ul>{active.measures.map(measure => <li key={measure}>{measure}</li>)}</ul>
        </section>
        <section className="cadence-panel-section cadence-panel-decisions" aria-labelledby="cadence-decide-title">
          <h3 id="cadence-decide-title">Decide</h3>
          <div className="cadence-decision-labels">{active.decisions.map(decision => <span key={decision}>{decision}</span>)}</div>
        </section>
      </aside>}
    </div>
  </Screen>;
}
