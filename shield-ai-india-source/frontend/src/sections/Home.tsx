import { Link } from 'react-router-dom';
import { Screen } from '@/components/ui';
import './home.css';

const STEPS = [
  { number: '1', title: 'Deliver', copy: 'Make the existing programme work exceptionally well.', to: '/roadmap?lane=scale' },
  { number: '2', title: 'Build demand', copy: 'Create enough V-BAT pipeline to support local manufacturing at scale.', to: '/opportunities' },
  { number: '3', title: 'Broaden', copy: 'Find where Hivemind can make Indian platforms autonomous.', to: '/roadmap?lane=embed' },
] as const;

function Arrow() {
  return <div className="thesis-linear-arrow" aria-hidden="true">→</div>;
}

export default function Home() {
  return (
    <Screen className="thesis">
      <header className="thesis-heading">
        <div className="eyebrow text-sig-blue">00 · Thesis</div>
        <h1 data-testid="screen-headline">FROM INDIA ENTRY POINT TO INDIA SCALE</h1>
        <p>We have the starting point. The next 18 months are about turning it into a repeatable business.</p>
      </header>

      <div className="thesis-linear" data-testid="strategy-journey" aria-label="A continuous journey from today's India foothold through three moves to a broader India autonomy business">
        <section className="thesis-linear-today" data-testid="today-node">
          <div className="thesis-time-label">TODAY</div>
          <h2>A real foothold</h2>
          <div className="thesis-foothold-list">
            <div><strong>Indian Army</strong><span>V-BAT + Hivemind</span></div>
            <div><strong>JSW partnership</strong><span>Local manufacturing underway</span></div>
            <div><strong>Visible production ramp</strong><span>50 → 150 → 300 export commitment</span><span>300/year capacity → expandable to 450</span></div>
          </div>
        </section>

        <Arrow />

        <section className="thesis-linear-next">
          <div className="thesis-time-label">NEXT 18 MONTHS</div>
          <div className="thesis-linear-steps">
            {STEPS.map((step, index) => <div key={step.number} className="contents">
              <Link to={step.to} className="thesis-linear-step" data-testid={`strategy-step-${step.number}`}>
                <div className="thesis-step-number">{step.number}.</div>
                <h2>{step.title}</h2>
                <p>{step.copy}</p>
                {step.number === '3' && <div className="thesis-broaden-scope">Indian platforms · B2B partnerships · Army · Navy · Air Force · ISR · Maritime · Space</div>}
              </Link>
              {index < STEPS.length - 1 && <Arrow />}
            </div>)}
          </div>
        </section>

        <Arrow />

        <Link to="/kpis" className="thesis-linear-ambition" data-testid="month-18-destination">
          <div className="thesis-time-label">18-MONTH AMBITION</div>
          <h2>A BROADER INDIA<br /><span>AUTONOMY BUSINESS</span></h2>
          <p>V-BAT + Hivemind + Indian platforms</p>
        </Link>
      </div>
    </Screen>
  );
}
