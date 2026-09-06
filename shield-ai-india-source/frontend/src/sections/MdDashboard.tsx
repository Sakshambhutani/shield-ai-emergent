import { useState } from 'react';
import { Headline, Screen } from '@/components/ui';
import MdAssumptions from './MdAssumptions';
import MdPortfolio from './MdPortfolio';
import './md-dashboard.css';

export default function MdDashboard() {
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  return <Screen className="md-dashboard md-numeric md-focused">
    <Headline title="MD Dashboard" right={<button className="md-register-button" onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog">Assumptions ↗</button>} />
    <MdPortfolio />
    <MdAssumptions open={assumptionsOpen} onClose={() => setAssumptionsOpen(false)} />
  </Screen>;
}
