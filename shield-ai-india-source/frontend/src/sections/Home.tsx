import { Boxes, Factory, GitBranch, Handshake, Microchip, Plane, Radar, Ship, Users } from 'lucide-react';
import { Headline, Screen } from '@/components/ui';
import './home.css';

const STEPS = [
  { number: '01', title: 'Deliver & deepen', copy: 'Turn Army delivery into lasting trust and repeat orders.', icon: Handshake },
  { number: '02', title: 'Open programmes', copy: 'Build demand across government and platform partners.', icon: GitBranch },
  { number: '03', title: 'Build engineering', copy: 'Integrate Hivemind in India for Indian and global programmes.', icon: Microchip },
] as const;

const NETWORK_NODES = [
  { label: 'Army', icon: Radar, position: 'army' },
  { label: 'Navy', icon: Ship, position: 'navy' },
  { label: 'Air Force', icon: Plane, position: 'air-force' },
  { label: 'ISR', icon: Radar, position: 'isr' },
  { label: 'Indian OEMs', icon: Factory, position: 'oems' },
  { label: 'Partners', icon: Users, position: 'partners' },
] as const;

function VBatMark() {
  return (
    <svg viewBox="0 0 180 180" className="thesis-vbat" role="img" aria-label="V-BAT aircraft silhouette">
      <defs><linearGradient id="vbat-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#dbe9fb" /><stop offset="1" stopColor="#6f89a9" /></linearGradient></defs>
      <g fill="url(#vbat-body)" stroke="#d8e9ff" strokeWidth="1" strokeLinejoin="round">
        <path d="M86 28h8l5 58 34 12-2 8-36-5-2 43H82l-2-43-36 5-2-8 34-12z" />
        <path d="M80 112h15l14 22-5 4-15-12-15 12-5-4z" />
        <path d="M83 145h10l6 8H77z" />
      </g>
      <circle cx="89" cy="35" r="8" fill="none" stroke="#74b2ff" strokeWidth="2" opacity=".8" />
    </svg>
  );
}

function FlowLines() {
  return (
    <svg className="thesis-flow-lines" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="flow-fade" x1="0" x2="1"><stop offset="0" stopColor="#3b82f6" stopOpacity=".12" /><stop offset=".5" stopColor="#6fb2ff" stopOpacity=".8" /><stop offset="1" stopColor="#3b82f6" stopOpacity=".18" /></linearGradient></defs>
      <path d="M120 45 C205 45 218 86 296 88 S472 88 642 90 S770 126 842 150" />
      <path d="M120 49 C208 49 220 92 296 94 S472 94 642 96 S770 132 842 154" className="thesis-flow-echo" />
      <path d="M120 45 C205 45 218 86 296 88 S472 88 642 90 S770 126 842 150" className="thesis-flow-core" />
      {[296, 472, 642, 760, 842].map((x, index) => <circle key={x} cx={x} cy={[88, 89, 90, 120, 150][index]} r="2.1" />)}
    </svg>
  );
}

function IndiaNetwork() {
  return (
    <div className="thesis-network" aria-label="India autonomy network across services, platforms and partners">
      <svg className="thesis-network-links" viewBox="0 0 250 250" aria-hidden="true">
        <circle cx="125" cy="125" r="64" /><circle cx="125" cy="125" r="96" />
        <path d="M125 125L125 23M125 125L38 73M125 125L212 73M125 125L38 180M125 125L125 230M125 125L212 180" />
        {["125,61", "70,92", "180,92", "70,163", "180,163", "125,189"].map((point) => {
          const [cx, cy] = point.split(',');
          return <circle key={point} cx={cx} cy={cy} r="3" className="thesis-network-dot" />;
        })}
      </svg>
      <div className="thesis-india-core"><Boxes /><strong>INDIA</strong><span>AUTONOMY</span></div>
      {NETWORK_NODES.map(({ label, icon: Icon, position }) => (
        <div key={label} className={`thesis-network-node thesis-network-node--${position}`}><span><Icon /></span><small>{label}</small></div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Screen className="thesis">
      <Headline title="From an Army foothold to a broader India business" sub="Grow through trusted delivery, new programmes and engineering in India for global needs." />

      <div className="thesis-system" data-testid="strategy-journey">
        <div className="thesis-stage">
        <FlowLines />
        <section className="thesis-origin" data-testid="today-node">
          <div className="thesis-time-label">OUR FOOTHOLD</div><h2>A real foothold</h2>
          <div className="thesis-vbat-orbit"><VBatMark /></div>
          <div className="thesis-origin-copy">
            <div><strong>Indian Army</strong><span>V-BAT + Hivemind</span></div>
            <div><strong>JSW partnership</strong><span>Local manufacturing underway</span><span>300/year capacity → expandable to 450</span></div>
            <div><strong>Visible production ramp</strong><span>50 → 150 → 300 export commitment</span></div>
          </div>
        </section>

        <section className="thesis-moves" aria-label="How we grow">
          <div className="thesis-time-label">HOW WE GROW</div>
          <div className="thesis-move-list">
            {STEPS.map(({ number, title, copy, icon: Icon }) => (
              <article className="thesis-move" key={number} data-testid={`strategy-step-${number.slice(1)}`}>
                <div className="thesis-move-copy"><span className="thesis-step-number">{number} —</span><h2>{title}</h2><p>{copy}</p></div>
                <div className="thesis-move-node"><Icon /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="thesis-destination" data-testid="month-18-destination">
          <div className="thesis-time-label">OUR AMBITION</div>
          <h2>A BROADER INDIA<span>AUTONOMY BUSINESS</span></h2>
          <IndiaNetwork />
          <div className="thesis-products" aria-label="Product portfolio">
            <span>V-BAT</span><span>Hivemind (Solutions &amp; SDK)</span>
            <span>Aechelon</span><span>ViDAR</span>
            <span className="thesis-product-future">X-BAT <small>Future</small></span>
          </div>
        </section>
        </div>
      </div>
    </Screen>
  );
}
