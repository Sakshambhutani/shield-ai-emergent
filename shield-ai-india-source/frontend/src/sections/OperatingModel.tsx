import { useRef } from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useSearchParams } from 'react-router-dom';
import { Headline, Screen } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { OPERATING_FUNCTIONS } from '@/data/operating-model';
import { useStore } from '@/store';
import './operating-model.css';

function OperatingSystem() {
  const [params, setParams] = useSearchParams();
  const { present } = useStore();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const focus = params.get('focus') === 'legal' ? 'finance' : params.get('focus');
  const team = OPERATING_FUNCTIONS.find((item) => item.id === focus);
  const close = () => setParams((current) => { const next = new URLSearchParams(current); next.delete('focus'); return next; });
  return <>
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
        <path className="operating-arm-0" d="M600 300 L300 95" />
        <path className="operating-arm-1" d="M600 300 L900 95" />
        <path className="operating-arm-2" d="M600 300 H1050" />
        <path className="operating-arm-3" d="M600 300 H150" />
        <path className="operating-arm-4" d="M600 300 L900 505" />
        <path className="operating-arm-5" d="M600 300 L300 505" />
      </svg>
      {OPERATING_FUNCTIONS.map((item, i) => <button
        type="button" key={item.id} data-testid={`capability-${item.id}`}
        className={`operating-function operating-function-${i}`} aria-haspopup="dialog"
        aria-label={`${item.name}: view KPI definitions and accountability`}
        disabled={present}
        onClick={(event) => { trigger.current = event.currentTarget; setParams((current) => { const next = new URLSearchParams(current); next.set('focus', item.id); return next; }); }}
      >
        <span className="operating-function-name">{item.name}</span>
        <span className="operating-kpi-label">Headline KPIs</span>
        <span className="operating-kpis">{item.kpis.slice(0, 2).map((kpi) => <span key={kpi.name}>{kpi.headline ?? kpi.name}</span>)}</span>
      </button>)}
    </div>
    <Dialog.Root open={!!team && !present} onOpenChange={(open) => { if (!open) close(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="operating-drawer-overlay" />
        <Dialog.Content className="operating-drawer" data-testid="capability-drawer" onCloseAutoFocus={(event) => { if (trigger.current) { event.preventDefault(); trigger.current.focus(); } }} onKeyDown={(event) => { if (['ArrowLeft', 'ArrowRight', 'p', 'P'].includes(event.key)) event.stopPropagation(); }}>
          <div className="operating-drawer-header">
            <div><div className="eyebrow">Functional accountability · Proposed</div><Dialog.Title>{team?.name}</Dialog.Title><Dialog.Description>{team?.mandate}</Dialog.Description></div>
            <Dialog.Close aria-label="Close KPI details" data-testid="capability-drawer-close"><X size={18} /></Dialog.Close>
          </div>
          <div className="operating-drawer-body">
            <div className="operating-owner"><div className="eyebrow">Primary owner</div><p>{team?.owner}</p></div>
            {team?.kpis.map((kpi) => <section className="operating-kpi-detail" key={kpi.name}>
              <h3>{kpi.name}</h3>
              <dl><dt>KPI definition</dt><dd>{kpi.definition}</dd><dt>Why it matters</dt><dd>{kpi.why}</dd><dt>Main cross-functional dependency</dt><dd>{kpi.dependency}</dd></dl>
            </section>)}
            {team?.diagnostic && <p className="operating-diagnostic">{team.diagnostic}</p>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}

export default function OperatingModel() {
  return <Screen className="operating-screen">
    <Headline title="Small team. Clear accountability. Shared execution." sub="Each function owns a few outcomes that materially determine whether India delivers and scales." right={<SourceButton claimIds={['m-opmodel', 'c-india-sub', 'c-jsw']} title="Operating model" />} />
    <OperatingSystem />
  </Screen>;
}
