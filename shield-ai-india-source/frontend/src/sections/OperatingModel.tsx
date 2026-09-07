import { Headline, Screen } from '@/components/ui';
import { OPERATING_FUNCTIONS, OPERATING_MODEL_KPIS, OPERATING_MODEL_SUMMARIES } from '@/data/operating-model';
import './operating-model.css';

const SLIDE_FUNCTIONS = ['growth', 'autonomy', 'programmes', 'people', 'industrialisation', 'finance']
  .map((id) => OPERATING_FUNCTIONS.find((item) => item.id === id)!);
// Read left to right, then top to bottom, preserving the six existing positions.
const FUNCTION_POSITIONS = [0, 1, 3, 2, 5, 4];

const ROTORS = [
  { x: 140, y: 127 }, { x: 340, y: 127 },
  { x: 440, y: 300 }, { x: 40, y: 300 },
  { x: 340, y: 473 }, { x: 140, y: 473 },
];

function OperatingSystem() {
  return (
    <div className="operating-architecture" data-testid="operating-system" aria-label="Six functions supporting India contract bookings">
      <div className="operating-aircraft">
        <svg className="operating-airframe" viewBox="0 0 480 600" aria-hidden="true">
          {ROTORS.map((motor, i) => <g key={i}>
            <path className="operating-arm" d={`M240 300 L${motor.x} ${motor.y}`} />
            <path className="operating-callout-line" d={`M${motor.x < 240 ? 0 : 480} ${motor.y} H${motor.x}`} />
            <g className="operating-rotor" transform={`translate(${motor.x} ${motor.y})`}>
              <circle className="operating-rotor-disc" r="38" />
              <circle className="operating-rotor-track" r="31" />
              <g transform={`rotate(${i % 2 ? -35 : 35})`}>
                <ellipse className="operating-blade" cx="0" cy="-15" rx="6" ry="18" />
                <ellipse className="operating-blade" cx="0" cy="15" rx="6" ry="18" />
              </g>
              <circle className="operating-motor" r="7" />
            </g>
          </g>)}
        </svg>
        <div className="operating-hub" data-testid="company-north-star">
          <svg className="operating-hub-frame" viewBox="0 0 220 140" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="110,1 219,36 219,104 110,139 1,104 1,36" />
          </svg>
          <p className="operating-hub-metric">Contract bookings (₹)</p>
        </div>
      </div>
      <p className="operating-hub-scope">Army follow-on · New Indian programmes · Paid integrations</p>
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
    <Headline title="How Shield AI India operates" sub="Clear ownership across six functions. Selected KPIs for the first six months." />
    <OperatingSystem />
  </Screen>;
}
