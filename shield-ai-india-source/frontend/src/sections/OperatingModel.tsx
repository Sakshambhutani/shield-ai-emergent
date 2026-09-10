import { useLayoutEffect, useRef, useState } from 'react';
import { FX_NOTE } from '@/lib/currency';
import { Headline, Screen } from '@/components/ui';
import { OPERATING_FUNCTIONS, OPERATING_MODEL_KPIS, OPERATING_MODEL_SUMMARIES } from '@/data/operating-model';
import './operating-model.css';

const SLIDE_FUNCTIONS = ['growth', 'autonomy', 'programmes', 'people', 'industrialisation', 'finance']
  .map((id) => OPERATING_FUNCTIONS.find((item) => item.id === id)!);
// Read left to right, then top to bottom, preserving the six existing positions.
const FUNCTION_POSITIONS = [0, 1, 3, 2, 5, 4];

function OperatingSystem() {
  const architectureRef = useRef<HTMLDivElement>(null);
  const [connectors, setConnectors] = useState<{ d: string; x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    const root = architectureRef.current!;
    const update = () => {
      const bounds = root.getBoundingClientRect();
      const hub = root.querySelector('.operating-hub')!.getBoundingClientRect();
      setConnectors(Array.from(root.querySelectorAll('.operating-function')).map((panel) => {
        const rect = panel.getBoundingClientRect();
        const heading = panel.querySelector('.operating-function-name')!.getBoundingClientRect();
        const left = rect.left < hub.left;
        const x = (left ? rect.right + 16 : rect.left - 16) - bounds.left;
        const y = heading.top + heading.height / 2 - bounds.top;
        const endX = (left ? hub.left + 12 : hub.right - 12) - bounds.left;
        const endY = hub.top + hub.height / 2 - bounds.top;
        const elbowX = x + (left ? 1 : -1) * Math.min(48, Math.abs(endX - x) / 3);
        return { x, y, d: `M${x} ${y} H${elbowX} L${endX} ${endY}` };
      }));
    };
    const observer = new ResizeObserver(update);
    observer.observe(root);
    root.querySelectorAll('.operating-function, .operating-hub').forEach((element) => observer.observe(element));
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={architectureRef} className="operating-architecture" data-testid="operating-system" aria-label="Six functions supporting India contract bookings">
      <div className="operating-aircraft">
        <img className="operating-airframe" src="/images/operating-xbat.png" alt="" aria-hidden="true" />
        <svg className="operating-guides" viewBox="0 0 600 600" aria-hidden="true">
          <circle cx="300" cy="300" r="220" />
          <path d="M300 0 V600 M60 300 H540" />
        </svg>
        <div className="operating-hub" data-testid="company-north-star">
          <svg className="operating-hub-frame" viewBox="0 0 220 140" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="110,1 219,36 219,104 110,139 1,104 1,36" />
          </svg>
          <p className="operating-hub-metric">Contract bookings (₹)</p>
        </div>
      </div>
      <svg className="operating-connectors" aria-hidden="true">
        {connectors.map(({ d, x, y }, i) => <g key={SLIDE_FUNCTIONS[i].id}>
          <path d={d} />
          <circle cx={x} cy={y} r="2.5" />
        </g>)}
      </svg>
      {SLIDE_FUNCTIONS.map((item, i) => <div
        key={item.id} data-testid={`capability-${item.id}`}
        tabIndex={0} aria-describedby={`kpi-explanation-${item.id}`}
        className={`operating-function operating-function-${FUNCTION_POSITIONS[i]}`}
      >
        <span className="operating-function-name">{item.id === 'autonomy' ? 'Hivemind Engineering' : item.name}</span>
        <span className="operating-kpi-label">KPIs</span>
        <span className="operating-kpis">{OPERATING_MODEL_KPIS[item.id].map((kpi) => <span key={kpi.name}><span className="operating-kpi-text"><span>{kpi.name}</span><span className="operating-kpi-indicator">{kpi.indicator}</span></span></span>)}</span>
        <div className="operating-kpi-explanation" id={`kpi-explanation-${item.id}`} role="tooltip">
          <p>{OPERATING_MODEL_SUMMARIES[item.id]}</p>
        </div>
      </div>)}
    </div>
  );
}

export default function OperatingModel() {
  return <Screen className="operating-screen">
    <Headline title="How Shield AI India operates" sub={`Clear ownership across six functions. Selected KPIs for the first six months. ${FX_NOTE}.`} />
    <OperatingSystem />
  </Screen>;
}
