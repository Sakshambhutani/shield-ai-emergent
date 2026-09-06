import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Headline, Screen } from '@/components/ui';
import './cadence.css';

const LAYERS = [
  {
    id: 'operate', name: 'OPERATE', cadence: 'Weekly', question: 'What needs attention now?',
    outer: 205, inner: 0, labelY: 458, cadenceY: 498, questionY: 550,
    questions: [
      'What changed this week?',
      'What is off track?',
      'What needs attention before the next review?',
      'What commitments are coming up?',
    ],
  },
  {
    id: 'align', name: 'ALIGN', cadence: 'Biweekly / Milestones', question: 'What needs cross-team alignment?',
    outer: 335, inner: 205, labelY: 214, cadenceY: 253, questionY: 766,
    questions: [
      'Where do India, US teams, partners or functions need to align?',
      'Where are priorities or timelines conflicting?',
      'What programme, product or commercial topics need resolution?',
      'What dependencies could affect delivery?',
    ],
  },
  {
    id: 'steer', name: 'STEER', cadence: 'Monthly / Quarterly', question: 'What needs to change?',
    outer: 470, inner: 335, labelY: 82, cadenceY: 121, questionY: 908,
    questions: [
      'Are we on track against the India plan?',
      'What is changing in opportunities, risks or priorities?',
      'Where should resources move?',
      'What should we accelerate, change or stop?',
    ],
  },
] as const;

type LayerId = typeof LAYERS[number]['id'];

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
    <Headline title="Operate. Align. Steer." />
    <div className={`cadence-layout${active ? ' has-selection' : ''}${hasInteracted ? '' : ' show-click-cue'}`}>
      <svg className="cadence-circles" viewBox="0 0 1000 1000" role="group" aria-label="Cadence layers" data-testid="decision-rhythm">
        {LAYERS.map(layer => <g key={layer.id} ref={node => { ringRefs.current[layer.id] = node; }}
          className={`cadence-layer${selected === layer.id ? ' is-selected' : ''}`}
          role="button" tabIndex={0} aria-label={`${layer.name} — ${layer.cadence}. ${layer.question}`}
          aria-pressed={selected === layer.id} aria-expanded={selected === layer.id}
          aria-controls={selected === layer.id ? 'cadence-questions' : undefined}
          data-testid={`cadence-ring-${layer.id}`}
          onPointerEnter={() => setHasInteracted(true)}
          onFocus={() => setHasInteracted(true)}
          onClick={() => { setHasInteracted(true); setSelected(selected === layer.id ? null : layer.id); }}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setSelected(selected === layer.id ? null : layer.id);
            }
          }}>
          <path d={ringPath(layer.outer, layer.inner)} fillRule="evenodd" className="cadence-ring" />
          <path d={ringPath(layer.outer, layer.inner)} fillRule="evenodd" className={`cadence-click-cue cue-${layer.id}`} aria-hidden="true" />
          <g textAnchor="middle" className="cadence-ring-copy">
            <text x="500" y={layer.labelY} className="cadence-horizon-name">{layer.name}</text>
            <text x="500" y={layer.cadenceY} className="cadence-period">{layer.cadence}</text>
            <text x="500" y={layer.questionY} className="cadence-question">“{layer.question}”</text>
          </g>
        </g>)}
      </svg>
      {active && <aside id="cadence-questions" className="cadence-questions" aria-labelledby="cadence-questions-title" aria-live="polite">
        <div className="cadence-panel-heading">
          <h2 id="cadence-questions-title">{active.name}</h2>
          <button type="button" onClick={close} aria-label="Close questions"><X size={18} /></button>
        </div>
        <ul>{active.questions.map(question => <li key={question}>{question}</li>)}</ul>
      </aside>}
    </div>
  </Screen>;
}
