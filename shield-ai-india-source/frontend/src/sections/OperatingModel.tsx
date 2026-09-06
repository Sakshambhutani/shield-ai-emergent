import { Headline, Screen } from '@/components/ui';
import { OPERATING_FUNCTIONS } from '@/data/operating-model';
import './operating-model.css';

function OperatingSystem() {
  return (
    <div className="operating-architecture" data-testid="operating-system" aria-label="Six functions integrated by the MD Office">
      <div className="operating-hub" data-testid="md-office-layer">
        <svg className="operating-hub-frame" viewBox="0 0 320 260" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="160,1 319,65 319,195 160,259 1,195 1,65" />
        </svg>
        <div className="operating-hub-name">SHIELD AI INDIA</div>
        <h2>MD OFFICE · INTEGRATION LAYER</h2>
        <p className="operating-hub-scope">Decisions · Dependencies · Resources · Risks · India ↔ Global</p>
      </div>
      <svg className="operating-spokes" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
        {[
          { x: 300, y: 78 }, { x: 900, y: 78 },
          { x: 1000, y: 300 }, { x: 200, y: 300 },
          { x: 900, y: 522 }, { x: 300, y: 522 },
        ].map((motor, i) => <g key={i}>
          <path className={`operating-arm-${i}`} d={`M600 300 L${motor.x} ${motor.y}`} />
          <g className="operating-rotor" transform={`translate(${motor.x} ${motor.y})`}>
            <ellipse rx="88" ry="104" />
            <ellipse className="operating-rotor-inner" rx="78" ry="93" />
          </g>
        </g>)}
      </svg>
      {OPERATING_FUNCTIONS.map((item, i) => <div
        key={item.id} data-testid={`capability-${item.id}`}
        className={`operating-function operating-function-${i}`}
      >
        <span className="operating-function-name">{item.name}</span>
        <span className="operating-kpi-label">Headline KPIs</span>
        <span className="operating-kpis">{item.kpis.slice(0, 2).map((kpi) => <span key={kpi.name}>{kpi.headline ?? kpi.name}</span>)}</span>
      </div>)}
    </div>
  );
}

export default function OperatingModel() {
  return <Screen className="operating-screen">
    <Headline title="Small team. Clear accountability. Shared execution." sub="Each function owns a few outcomes that materially determine whether India delivers and scales." />
    <OperatingSystem />
  </Screen>;
}
