import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Gauge, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Field, Headline, Pill, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { EXECUTION_HEALTH, OPERATING_CAPABILITIES, SCORECARD_OUTCOMES, type EvidenceStatus } from '@/data/ops';
import { useStore } from '@/store';

const STATUS: Record<EvidenceStatus, { label: string; dot: string; tone: 'green' | 'blue' | 'purple' | 'amber' }> = {
  verified: { label: 'Verified public fact', dot: 'bg-emerald-400', tone: 'green' },
  internal: { label: 'Internal actual', dot: 'bg-sig-blue', tone: 'blue' },
  proposed: { label: 'Proposed management target', dot: 'bg-violet-400', tone: 'purple' },
  modelled: { label: 'Management hypothesis · To validate', dot: 'bg-violet-400', tone: 'purple' },
};
const OUTCOME_COLORS = ['#34D399', '#3B82F6', '#A78BFA', '#F59E0B'];
type Outcome = (typeof SCORECARD_OUTCOMES)[number];
type Driver = Outcome['drivers'][number];
type Health = (typeof EXECUTION_HEALTH)[number];

function OutcomeDrawer({ outcome, onClose }: { outcome: Outcome | null; onClose: () => void }) {
  return <SideDrawer open={!!outcome} onClose={onClose} title={outcome?.label ?? ''} eyebrow="Company outcome" testId="outcome-drawer" width="sm:w-[500px]">
    {outcome && <div className="space-y-5 stagger">
      <Field label="OUTCOME">{outcome.definition}</Field>
      <Field label="MEASURES"><ul className="space-y-1 mt-1">{outcome.drivers.map((driver) => <li key={driver.id} className="text-xs text-paper-2">→ {driver.name}</li>)}</ul>{outcome.target && <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-violet-300">{outcome.target} · Proposed management target — not Shield AI guidance</div>}</Field>
      <Field label="ACCOUNTABILITY"><div><div className="eyebrow">Primary</div><div className="text-sm">{outcome.accountability.primary}</div><div className="eyebrow mt-3">Key contributors</div><div className="text-sm">{outcome.accountability.contributors.join(' · ')}</div></div></Field>
      <Field label="HEALTH SIGNALS"><ul className="space-y-1 mt-1">{outcome.healthSignals.map((signal) => <li key={signal} className="text-xs text-paper-2">→ {signal}</li>)}</ul></Field>
    </div>}
  </SideDrawer>;
}
function DriverDrawer({ driver, onClose }: { driver: Driver | null; onClose: () => void }) {
  const nav = useNavigate();
  return <SideDrawer open={!!driver} onClose={onClose} title={driver?.name ?? ''} eyebrow="Outcome driver" testId="driver-drawer" width="sm:w-[500px]">
    {driver && <div className="space-y-5 stagger">
      <div className="flex items-center gap-2"><Pill tone={STATUS[driver.status].tone}>{STATUS[driver.status].label}</Pill><SourceButton claimIds={driver.claimIds} title={driver.name} /></div>
      <Field label="Definition">{driver.definition}</Field>
      <Field label="Current / target"><span className={cn('font-mono', driver.status === 'proposed' ? 'text-violet-300' : 'text-paper-3 italic')}>{driver.value}</span></Field>
      <Field label="Accountable owner">{driver.owner}</Field>
      <div className="border-t border-line pt-4 flex flex-wrap gap-2">
        <button data-testid="driver-link-structure" onClick={() => nav(`/operating-model?focus=${driver.capability}`)} className="inline-flex items-center gap-1 rounded border border-line px-2 py-1 text-[11px] text-sig-blue hover:border-sig-blue/60">Structure owner <ArrowUpRight className="h-3 w-3" /></button>
        <button data-testid="driver-link-motion" onClick={() => nav('/cadence')} className="inline-flex items-center gap-1 rounded border border-line px-2 py-1 text-[11px] text-sig-blue hover:border-sig-blue/60">Open cadence <ArrowUpRight className="h-3 w-3" /></button>
      </div>
    </div>}
  </SideDrawer>;
}

function HealthDrawer({ health, onClose }: { health: Health | null; onClose: () => void }) {
  const capability = health ? OPERATING_CAPABILITIES.find((item) => item.id === health.capability) : null;
  return <SideDrawer open={!!health} onClose={onClose} title={health?.name ?? ''} eyebrow="Execution health" testId="health-drawer" width="sm:w-[500px]">
    {health && <div className="space-y-5 stagger">
      <div className="flex items-center gap-2"><Pill tone="grey">{health.status}</Pill>{capability && <SourceButton claimIds={capability.claimIds} title={health.name} />}</div>
      <Field label="Control intent">{health.sub}</Field>
      <Field label="Accountable owners">{health.owners}</Field>
      {capability && <Field label="Functional measures"><div className="flex flex-wrap gap-1.5 mt-1">{capability.kpis.slice(0, 3).map((item) => <Pill key={item} tone="blue">{item}</Pill>)}</div></Field>}
    </div>}
  </SideDrawer>;
}

function StoryHealthStrip() {
  return <div data-testid="execution-health" className="border-y border-line py-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-paper-3"><span className="eyebrow text-paper-2">Execution health</span><span>Industrialisation</span><span>·</span><span>Capacity</span><span>·</span><span>Global dependencies</span><span>·</span><span>Commercial / Compliance</span></div>;
}

function StoryOutcomes({ onOpen }: { onOpen: (outcome: Outcome) => void }) {
  return <div data-testid="scorecard-story" className="flex-1 min-h-0 flex flex-col justify-center gap-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SCORECARD_OUTCOMES.map((outcome, index) => <button key={outcome.id} data-testid={`outcome-${outcome.id}`} onClick={() => onOpen(outcome)} className="panel panel-hover min-h-[205px] p-5 text-left flex flex-col border-t-2" style={{ borderTopColor: OUTCOME_COLORS[index] }}>
        <div className="eyebrow">Outcome {String(index + 1).padStart(2, '0')}</div>
        <div className="text-xl font-semibold mt-3">{outcome.label}</div>
        <div className="text-sm text-sig-blue mt-3">{outcome.short}</div>
        <div className="text-sm text-paper-2 leading-relaxed mt-auto pt-4">{outcome.question}</div>
        {outcome.target && <div className="font-mono text-[9px] uppercase tracking-wider text-violet-300 mt-3">{outcome.target} · proposed management target</div>}
      </button>)}
    </div>
    <StoryHealthStrip />
  </div>;
}

function ExploreScorecard({ selected, outcomeId, health, onOutcome, onDriver, onHealth }: { selected: Outcome | null; outcomeId: string | null; health: Health | null; onOutcome: (id: string) => void; onDriver: (driver: Driver) => void; onHealth: (health: Health) => void }) {
  return <div data-testid="scorecard-tree" className="flex-1 min-h-[520px] flex flex-col justify-center max-w-7xl w-full mx-auto">
    <div className="flex justify-center"><div data-testid="north-star" className="rounded border border-sig-blue/60 bg-sig-blue/[.07] px-10 py-4 text-center max-w-xl"><div className="eyebrow text-sig-blue">Proposed organisational North Star</div><div className="text-xl lg:text-2xl font-semibold tracking-tight mt-1">Deliver Indian mission outcomes while creating reusable global capability</div></div></div>
    <ArrowDown className="h-5 w-5 text-line-2 mx-auto my-3" />
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {SCORECARD_OUTCOMES.map((outcome, index) => { const on = outcomeId === outcome.id; const faded = !!outcomeId && !on; return <button key={outcome.id} data-testid={`outcome-${outcome.id}`} onClick={() => onOutcome(outcome.id)} className={cn('panel panel-hover relative px-4 py-5 min-h-[135px] text-left transition-all duration-300 border-t-2', on && 'bg-ink-3', faded && 'opacity-25')} style={{ borderTopColor: OUTCOME_COLORS[index] }}>
        <div className="eyebrow">Outcome {String(index + 1).padStart(2, '0')}</div><div className="text-lg lg:text-xl font-semibold mt-2">{outcome.label}</div><div className="text-xs text-paper-2 leading-snug mt-2">{outcome.short}</div>
        {outcome.target && <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-violet-300">{outcome.target} · proposed management target</div>}
      </button>; })}
    </div>
    <div className="h-4 border-x border-b border-line-2 mx-[7%]" />
    {selected && <div data-testid="outcome-drivers" className="grid sm:grid-cols-3 gap-2 mx-auto w-full max-w-4xl mt-3 animate-rise">{selected.drivers.map((driver) => <button key={driver.id} data-testid={`driver-${driver.id}`} onClick={() => onDriver(driver)} className="rounded border border-line bg-ink-2 px-3 py-2 text-left hover:border-sig-blue/60"><div className="flex items-center justify-between gap-2"><span className="text-xs font-medium">{driver.name}</span><span className={cn('h-2 w-2 rounded-full shrink-0', STATUS[driver.status].dot)} /></div><div className="mt-1 font-mono text-[9px] text-paper-3">{driver.value}</div></button>)}</div>}
    {!selected && <div className="h-[72px] flex items-center justify-center text-[10px] font-mono text-paper-3">Select an outcome to reveal its drivers</div>}
    <div className="mt-3 rounded border border-line bg-ink-2/70 px-3 py-3" data-testid="execution-health-explore">
      <div className="flex items-center gap-2 mb-2"><Gauge className="h-3.5 w-3.5 text-paper-3" /><span className="eyebrow">Execution health · Explore</span></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">{EXECUTION_HEALTH.map((item) => <button key={item.id} data-testid={`health-${item.id}`} onClick={() => onHealth(item)} className={cn('rounded border border-line/80 px-3 py-2 text-left hover:border-line-2', health?.id === item.id && 'border-sig-blue/60 bg-ink-3')}><div className="text-xs font-medium">{item.name}</div><div className="text-[9px] text-paper-3 mt-0.5 truncate">{item.sub}</div><div className="font-mono text-[9px] text-paper-3 italic mt-1">{item.status}</div></button>)}</div>
    </div>
    <div className="mt-3 flex items-center gap-4 text-[9px] font-mono text-paper-3">{Object.values(STATUS).map((status) => <span key={status.label} className="inline-flex items-center gap-1"><span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />{status.label}</span>)}<span className="ml-auto hidden md:inline-flex items-center gap-1"><Target className="h-3 w-3" />Every KPI protects a Month-18 outcome</span></div>
  </div>;
}

export default function Kpis() {
  const { mode } = useStore();
  const [outcomeId, setOutcomeId] = useState<string | null>(null);
  const [outcomeDrawer, setOutcomeDrawer] = useState<Outcome | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const selected = SCORECARD_OUTCOMES.find((outcome) => outcome.id === outcomeId) ?? null;
  const selectOutcome = (id: string) => { setOutcomeId((current) => current === id ? null : id); setDriver(null); setHealth(null); };
  const openStoryOutcome = (outcome: Outcome) => { setOutcomeDrawer(outcome); setDriver(null); setHealth(null); };
  return <Screen>
    <Headline title="Local mission impact. Global product leverage." sub="Four outcomes define the proposed organisational North Star; execution health shows whether the system can deliver them." right={mode === 'explore' ? <SourceButton claimIds={['m-kpis', 'm-integrations', 'c-vision-australia']} title="Company scorecard" /> : undefined} />
    {mode === 'story' ? <StoryOutcomes onOpen={openStoryOutcome} /> : <ExploreScorecard selected={selected} outcomeId={outcomeId} health={health} onOutcome={selectOutcome} onDriver={(item) => { setDriver(item); setHealth(null); }} onHealth={(item) => { setHealth(item); setDriver(null); }} />}
    <OutcomeDrawer outcome={outcomeDrawer} onClose={() => setOutcomeDrawer(null)} />
    <DriverDrawer driver={driver} onClose={() => setDriver(null)} />
    <HealthDrawer health={health} onClose={() => setHealth(null)} />
  </Screen>;
}
