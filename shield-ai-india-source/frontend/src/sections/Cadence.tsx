import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Headline, Screen } from '@/components/ui';
import './cadence.css';

const LAYERS = [
  {
    "id": "milestone",
    "name": "VALIDATE",
    "cadence": "At agreed milestones",
    "outer": 110,
    "inner": 0,
    "labelY": 490,
    "measures": [
      "Deliverables completed",
      "Validation results",
      "Open acceptance items"
    ],
    "decisions": [
      "Accept",
      "Close gaps",
      "Confirm handover"
    ]
  },
  {
    "id": "weekly",
    "name": "OPERATE",
    "cadence": "Typically weekly",
    "outer": 200,
    "inner": 110,
    "labelY": 338,
    "measures": [
      "Milestone movement",
      "Open blockers",
      "Critical joining gaps",
      "Near-term cash exceptions"
    ],
    "decisions": [
      "Recover",
      "Assign ownership",
      "Escalate"
    ]
  },
  {
    "id": "fortnightly",
    "name": "ALIGN",
    "cadence": "Fortnightly / as needed",
    "outer": 290,
    "inner": 200,
    "labelY": 248,
    "measures": [
      "Shared dependencies",
      "Engineering capacity",
      "Customer and partner commitments"
    ],
    "decisions": [
      "Agree owners and dates",
      "Resolve resource conflicts"
    ]
  },
  {
    "id": "monthly",
    "name": "REVIEW",
    "cadence": "Typically monthly",
    "outer": 380,
    "inner": 290,
    "labelY": 158,
    "measures": [
      "Functional KPI trends",
      "Hiring versus plan",
      "Budget variance",
      "Funding coverage",
      "BD progression"
    ],
    "decisions": [
      "Correct performance",
      "Update forecasts"
    ]
  },
  {
    "id": "quarterly",
    "name": "STEER",
    "cadence": "Quarterly / when priorities change",
    "outer": 470,
    "inner": 380,
    "labelY": 68,
    "measures": [
      "New-business potential",
      "Army follow-on",
      "Delivery capacity",
      "Hiring and funding outlook"
    ],
    "decisions": [
      "Invest",
      "Prioritise",
      "Defer"
    ]
  }
] as const;

type LayerId = typeof LAYERS[number]['id'];
const RING_QUESTIONS: Partial<Record<LayerId, { text: string; y: number }>> = {
  weekly: { text: 'What needs attention now?', y: 661 },
  fortnightly: { text: 'What needs cross-team resolution?', y: 751 },
  monthly: { text: 'Are we delivering against plan?', y: 841 },
  quarterly: { text: 'What should change?', y: 931 },
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
    <Headline title="A rhythm for delivery and growth" sub="Resolve immediate issues, align teams and steer the India business." />
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
