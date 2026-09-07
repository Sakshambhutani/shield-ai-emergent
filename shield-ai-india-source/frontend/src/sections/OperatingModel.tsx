import type { CSSProperties } from 'react';
import { Headline, Screen } from '@/components/ui';
import { OPERATING_FUNCTIONS, OPERATING_MODEL_KPIS, OPERATING_MODEL_SUMMARIES } from '@/data/operating-model';
import './operating-model.css';

const SLIDE_FUNCTIONS = ['growth', 'autonomy', 'programmes', 'people', 'industrialisation', 'finance']
  .map((id) => OPERATING_FUNCTIONS.find((item) => item.id === id)!);
// Read left to right, then top to bottom, preserving the six existing positions.
const FUNCTION_POSITIONS = [0, 1, 3, 2, 5, 4];

const ROTORS = [
  { x: 300, y: 78 }, { x: 900, y: 78 },
  { x: 1000, y: 300 }, { x: 200, y: 300 },
  { x: 900, y: 522 }, { x: 300, y: 522 },
];

function OperatingSystem() {
  return (
    <div className="operating-architecture" data-testid="operating-system" aria-label="Six functions supporting India revenue attainment">
      <div className="operating-hub" data-testid="company-north-star">
        <svg className="operating-hub-frame" viewBox="0 0 320 260" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="160,1 319,65 319,195 160,259 1,195 1,65" />
        </svg>
        <div className="operating-hub-name">SHIELD AI INDIA</div>
        <p className="operating-hub-metric">Revenue attainment (%)</p>
        <p className="operating-hub-scope">Army follow-on · New Indian programmes · Global engineering</p>
      </div>
      <svg className="operating-spokes" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
        {ROTORS.map((motor, i) => <path key={i} d={`M600 300 L${motor.x} ${motor.y}`} />)}
      </svg>
      {ROTORS.map((motor, i) => <div key={i} className="operating-rotor-ring" aria-hidden="true" style={{ left: `${motor.x / 12}%`, top: `${motor.y / 6}%` }} />)}
      {SLIDE_FUNCTIONS.map((item, i) => <div
        key={item.id} data-testid={`capability-${item.id}`}
        style={{ '--motor-x': `${ROTORS[FUNCTION_POSITIONS[i]].x / 12}%`, '--motor-y': `${ROTORS[FUNCTION_POSITIONS[i]].y / 6}%` } as CSSProperties}
        tabIndex={0} aria-describedby={`kpi-explanation-${item.id}`}
        className={`operating-function operating-function-${FUNCTION_POSITIONS[i]}`}
      >
        <span className="operating-function-name">{item.id === 'autonomy' ? 'Hivemind Engineering' : item.name}</span>
        <span className="operating-kpi-label">KPIs</span>
        <span className="operating-kpis">{OPERATING_MODEL_KPIS[item.id].map((kpi) => <span key={kpi.name}>{kpi.name}</span>)}</span>
        <div className="operating-kpi-explanation" id={`kpi-explanation-${item.id}`} role="tooltip">
          <p>{OPERATING_MODEL_SUMMARIES[item.id]}</p>
        </div>
      </div>)}
    </div>
  );
}

export default function OperatingModel() {
  return <Screen className="operating-screen">
    <Headline title="How Shield AI India operates" sub="Clear ownership across six functions. Selected KPIs for the first six months." />
    <OperatingSystem />
  </Screen>;
}
