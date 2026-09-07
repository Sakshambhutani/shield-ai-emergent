import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Headline, Screen } from '@/components/ui';
import './cadence.css';

const LAYERS = [
  {
    "id": "milestone",
    "name": "VALIDATE",
    "cadence": "Milestone-based",
    "outer": 110,
    "inner": 0,
    "labelY": 490,
    "questions": [
      "Has the Army or partner accepted the agreed delivery evidence?",
      "What remains open across V-BAT, Hivemind or technology transfer?",
      "Can we approve handover and trigger any associated payment?"
    ]
  },
  {
    "id": "weekly",
    "name": "OPERATE",
    "cadence": "Weekly",
    "outer": 200,
    "inner": 110,
    "labelY": 338,
    "questions": [
      "What is blocking the next Army delivery or Hivemind integration?",
      "Are hiring, access or funding gaps holding up work?",
      "What needs action from India, US teams or JSW this week?"
    ]
  },
  {
    "id": "fortnightly",
    "name": "ALIGN",
    "cadence": "Fortnightly",
    "outer": 290,
    "inner": 200,
    "labelY": 248,
    "questions": [
      "Are India, US teams and JSW working to the same delivery commitments?",
      "Where do engineering capacity or partner dependencies need resolution?",
      "Can we support new customer evaluations without delaying the Army programme?"
    ]
  },
  {
    "id": "monthly",
    "name": "REVIEW",
    "cadence": "Monthly",
    "outer": 380,
    "inner": 290,
    "labelY": 158,
    "questions": [
      "Are Army acceptance and Hivemind integration progressing against plan?",
      "Are hiring and available funding keeping pace with the planned team growth?",
      "Are customer relationships turning into credible opportunities?"
    ]
  },
  {
    "id": "quarterly",
    "name": "STEER",
    "cadence": "Quarterly",
    "outer": 470,
    "inner": 380,
    "labelY": 68,
    "questions": [
      "Are we turning the Army foothold into follow-on business?",
      "Which new programmes deserve investment next?",
      "When can India take on global engineering work, and what must change in staffing, funding or partner support?"
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
  const [selected, setSelected] = useState<LayerId | null>(null);
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
          role="button" tabIndex={0} aria-label={`${layer.name}. ${layer.cadence}. Show review questions`}
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
          <button type="button" onClick={close} aria-label="Close questions"><X size={18} /></button>
        </div>
        <p className="cadence-panel-period">{active.cadence}</p>
        <ul>{active.questions.map(question => <li key={question}>{question}</li>)}</ul>
      </aside>}
    </div>
  </Screen>;
}
