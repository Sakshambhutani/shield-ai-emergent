import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Field, Headline, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { EXECUTION_SIGNALS, SCORECARD_SIGNALS, STATUS_META, TREND_META } from '@/data/management';
import { useStore } from '@/store';

type Signal = (typeof SCORECARD_SIGNALS)[number];
type Health = (typeof EXECUTION_SIGNALS)[number];

function Status({ signal }: { signal: Signal | Health }) {
  const meta = STATUS_META[signal.status];
  return <span className={cn('inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]', meta.className)}><span>{meta.symbol}</span>{meta.label}</span>;
}

function SignalDrawer({ signal, onClose }: { signal: Signal | null; onClose: () => void }) {
  return <SideDrawer open={!!signal} onClose={onClose} title={signal?.title ?? ''} eyebrow={signal ? `${signal.bet} · Strategic outcome` : ''} testId="outcome-drawer" width="sm:w-[500px]">
    {signal && <div className="space-y-5 stagger">
      <Field label="Current state">{signal.current}</Field>
      <Field label="Expected state now">{signal.expected}</Field>
      <Field label="Leading drivers"><ul className="mt-1 space-y-2">{signal.drivers.map((driver) => <li key={driver} className="text-sm text-paper-2">→ {driver}</li>)}</ul></Field>
      <Field label="Accountability">{signal.accountability}</Field>
      {'target' in signal && signal.target && <div className="border-t border-line pt-4 font-mono text-[10px] uppercase tracking-wider text-violet-300">{signal.target}<div className="mt-1 text-paper-3">Proposed management target · Not Shield AI guidance</div></div>}
    </div>}
  </SideDrawer>;
}

function HealthDrawer({ health, onClose }: { health: Health | null; onClose: () => void }) {
  return <SideDrawer open={!!health} onClose={onClose} title={health?.label ?? ''} eyebrow="Execution health" testId="health-drawer">
    {health && <div className="space-y-5 stagger"><Status signal={health} /><Field label="Coverage">{health.detail}</Field></div>}
  </SideDrawer>;
}

function OutcomeCards({ onOpen }: { onOpen: (signal: Signal) => void }) {
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" data-testid="scorecard-outcomes">
    {SCORECARD_SIGNALS.map((signal) => {
      const trend = TREND_META[signal.trend];
      return <button key={signal.id} data-testid={`outcome-${signal.id}`} onClick={() => onOpen(signal)} className="panel panel-hover min-h-[250px] p-5 text-left flex flex-col">
        <div className="eyebrow text-sig-blue">{signal.bet}</div>
        <div className="text-xl lg:text-2xl font-semibold mt-2">{signal.title}</div>
        <div className="mt-5"><Status signal={signal} /></div>
        <dl className="mt-auto pt-6 space-y-3">
          <div className="grid grid-cols-[44px_1fr] gap-3"><dt className="eyebrow">Now</dt><dd className="text-sm text-paper-2">{signal.now}</dd></div>
          <div className="grid grid-cols-[44px_1fr] gap-3"><dt className="eyebrow">Plan</dt><dd className="text-sm leading-snug">{signal.plan}</dd></div>
          <div className="grid grid-cols-[44px_1fr] gap-3"><dt className="eyebrow">Trend</dt><dd className={cn('font-mono text-xs', trend.className)}><span className="text-base mr-2">{trend.symbol}</span>{trend.label}</dd></div>
        </dl>
      </button>;
    })}
  </div>;
}

function HealthStrip({ onOpen }: { onOpen: (health: Health) => void }) {
  return <div data-testid="execution-health" className="border-y border-line flex flex-col sm:flex-row sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-line">
    <div className="eyebrow px-4 py-3 sm:w-44">Execution health</div>
    {EXECUTION_SIGNALS.map((health) => <button key={health.id} data-testid={`health-${health.id}`} onClick={() => onOpen(health)} className="flex-1 px-4 py-3 flex items-center justify-between gap-4 text-left hover:bg-ink-2 transition-colors"><span className="text-xs font-medium">{health.label}</span><Status signal={health} /></button>)}
  </div>;
}

function Explore({ onOpen }: { onOpen: (signal: Signal) => void }) {
  return <div data-testid="scorecard-explore" className="space-y-4 overflow-y-auto">
    {SCORECARD_SIGNALS.map((signal) => <button key={signal.id} onClick={() => onOpen(signal)} className="panel panel-hover w-full p-4 text-left grid lg:grid-cols-[180px_1fr] gap-4">
      <div><div className="eyebrow text-sig-blue">{signal.bet}</div><div className="text-lg font-semibold mt-1">{signal.title}</div><div className="mt-3"><Status signal={signal} /></div></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">{signal.trajectory.map((stage) => <div key={stage} className="border-l border-line px-3 py-2 text-xs text-paper-2">{stage}</div>)}</div>
      {signal.id === 'embed' && <div className="lg:col-start-2 text-[10px] text-paper-3">Global reuse remains a driver of Autonomy Footprint: reusable capability, global-product adoption, and faster integration N+1.</div>}
    </button>)}
  </div>;
}

export default function Kpis() {
  const { mode } = useStore();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  return <Screen>
    <Headline title="Are the three bets on track?" sub="The roadmap is the benchmark: actual now is compared with expected state now." right={mode === 'explore' ? <SourceButton claimIds={['m-kpis', 'm-integrations', 'c-vision-australia']} title="Company scorecard" /> : undefined} />
    {mode === 'story' ? <div data-testid="scorecard-story" className="flex-1 min-h-0 flex flex-col justify-center gap-7"><OutcomeCards onOpen={setSignal} /><HealthStrip onOpen={setHealth} /></div> : <><Explore onOpen={setSignal} /><HealthStrip onOpen={setHealth} /></>}
    <SignalDrawer signal={signal} onClose={() => setSignal(null)} />
    <HealthDrawer health={health} onClose={() => setHealth(null)} />
  </Screen>;
}
