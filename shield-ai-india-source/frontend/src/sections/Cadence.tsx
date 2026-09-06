import { Headline, Screen } from '@/components/ui';
import './cadence.css';

export default function Cadence() {
  return <Screen className="cadence-screen">
    <Headline title="Decisions at the right cadence." />
    <figure className="cadence-visual">
      <svg className="cadence-circles" viewBox="0 0 1000 1000" role="img" aria-labelledby="cadence-title cadence-description" data-testid="decision-rhythm">
        <title id="cadence-title">Operate, Align, Steer</title>
        <desc id="cadence-description">Three concentric decision horizons. At the center: decide, unblock, escalate. Operate weekly: what needs action now? Mission, pipeline, delivery. Align biweekly or milestone-driven: what needs cross-team alignment? India and US, programmes, commercial. Steer monthly or quarterly: where do we change direction or resources? Business review, portfolio, resources.</desc>
        <circle cx="500" cy="500" r="470" className="cadence-ring cadence-steer" />
        <circle cx="500" cy="500" r="360" className="cadence-ring cadence-align" />
        <circle cx="500" cy="500" r="250" className="cadence-ring cadence-operate" />
        <circle cx="500" cy="500" r="150" className="cadence-core" />

        <g textAnchor="middle" className="cadence-steer-copy">
          <text x="500" y="82" className="cadence-horizon-name">STEER</text>
          <text x="500" y="114" className="cadence-period">Monthly / quarterly</text>
          <text x="500" y="887" className="cadence-question">“Where do we change direction or resources?”</text>
          <text x="500" y="922" className="cadence-topics">Business Review • Portfolio • Resources</text>
        </g>
        <g textAnchor="middle" className="cadence-align-copy">
          <text x="500" y="193" className="cadence-horizon-name">ALIGN</text>
          <text x="500" y="225" className="cadence-period">Biweekly / milestone-driven</text>
          <text x="500" y="778" className="cadence-question">“What needs cross-team alignment?”</text>
          <text x="500" y="813" className="cadence-topics">India × US • Programmes • Commercial</text>
        </g>
        <g textAnchor="middle" className="cadence-operate-copy">
          <text x="500" y="303" className="cadence-horizon-name">OPERATE</text>
          <text x="500" y="335" className="cadence-period">Weekly</text>
          <text x="500" y="673" className="cadence-question">“What needs action now?”</text>
          <text x="500" y="708" className="cadence-topics">Mission • Pipeline • Delivery</text>
        </g>
        <text x="500" y="507" textAnchor="middle" className="cadence-center" textLength="274" lengthAdjust="spacingAndGlyphs">DECIDE • UNBLOCK • ESCALATE</text>
      </svg>
      <figcaption className="cadence-escalation">Event-driven escalation when customer, programme, legal, financial or delivery risk cannot wait.</figcaption>
    </figure>
  </Screen>;
}
