import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Screen } from '@/components/ui';
import './home.css';

const MOVES = [
  { id: 'scale', title: 'SCALE', outcome: 'Make Army the reference', detail: 'Deliver → operationalise → follow-on', y: 90 },
  { id: 'embed', title: 'EMBED', outcome: 'Become the autonomy layer', detail: 'Hivemind × Indian platforms', y: 230 },
  { id: 'expand', title: 'EXPAND', outcome: 'Open the second service', detail: 'Navy · airborne + maritime', y: 370 },
];
const OUTCOMES = ['ARMY ANCHOR', '3–4 PLATFORM EMBEDS', 'NAVY SECOND SERVICE', 'GLOBAL REUSE'];
const OPTIONS = ['CCA / X-BAT', 'WEAPONS', 'MILITARY SPACE', 'SIMULATION'];

export default function Home() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Screen className="thesis">
      <header className="thesis-heading">
        <div className="eyebrow text-sig-blue">00 · Thesis</div>
        <h1 data-testid="screen-headline">FROM ARMY BEACHHEAD TO INDIA SCALE</h1>
        <p>Use the Army programme to establish trust, Hivemind to embed across Indian platforms, and the Navy to prove multi-service, multi-domain scale.</p>
      </header>

      <div className="thesis-journey" data-testid="strategy-journey" aria-label="Today's India beachhead follows three converging strategic paths to a Month-18 India autonomy business">
        <svg className="thesis-connections" viewBox="0 0 1000 460" preserveAspectRatio="none" aria-hidden="true">
          {MOVES.map(({ id, y }) => (
            <path key={id} className={`thesis-path ${active === id ? 'is-active' : ''}`} pathLength="1"
              d={`M 172 230 C 215 230 215 ${y} 265 ${y} L 585 ${y} C 635 ${y} 635 230 700 230`} />
          ))}
          <path className="thesis-arrow" d="m 691 223 9 7-9 7" />
        </svg>

        <div className="thesis-today" data-testid="today-node">
          <div className="thesis-time-label">TODAY</div>
          <div className="thesis-current-marker" />
          <div className="thesis-beachhead">INDIA BEACHHEAD</div>
          <h2>Indian Army</h2>
          <div className="thesis-product">V-BAT + Hivemind</div>
        </div>

        <div className="thesis-moves">
          {MOVES.map((move) => (
            <Link key={move.id} to={`/roadmap?lane=${move.id}`} className={`thesis-move thesis-move-${move.id}`} data-testid={`strategy-${move.id}`}
              onMouseEnter={() => setActive(move.id)} onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(move.id)} onBlur={() => setActive(null)}
              aria-label={`${move.title}: ${move.outcome}. View ${move.id === 'scale' ? 'Army' : move.id === 'embed' ? 'Hivemind platform strategy' : 'Navy'} roadmap`}>
              <h2>{move.title}<span aria-hidden="true">↗</span></h2>
              <div className="thesis-move-outcome">{move.outcome}</div>
              <div className="thesis-move-detail">{move.detail}</div>
            </Link>
          ))}
        </div>

        <div className="thesis-destination" data-testid="month-18-destination">
          <div className="thesis-time-label">MONTH 18</div>
          <h2>INDIA<br />AUTONOMY<br /><span>BUSINESS</span></h2>
          <ul>{OUTCOMES.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
        </div>
      </div>

      <div className="thesis-options" data-testid="future-options">
        <span className="thesis-options-line" aria-hidden="true" />
        {OPTIONS.map((option) => <Link key={option} to="/market?view=future">{option}<span aria-hidden="true"> ↗</span></Link>)}
      </div>
    </Screen>
  );
}
