import { Navigate, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './store';
import { Shell } from './components/Shell';
import Home from './sections/Home';
import Money from './sections/Money';
import Buyers from './sections/Buyers';
import Convergence from './sections/Convergence';
import Roadmap from './sections/Roadmap';
import OperatingModel from './sections/OperatingModel';
import Cadence from './sections/Cadence';
import Kpis from './sections/Kpis';
import MdDashboard from './sections/MdDashboard';

export default function App() {
  return (
    <StoreProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Money />} />
          <Route path="/opportunities" element={<Buyers />} />
          <Route path="/convergence" element={<Convergence />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/operating-model" element={<OperatingModel />} />
          <Route path="/cadence" element={<Cadence />} />
          <Route path="/kpis" element={<Kpis />} />
          <Route path="/md-dashboard" element={<MdDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </StoreProvider>
  );
}
