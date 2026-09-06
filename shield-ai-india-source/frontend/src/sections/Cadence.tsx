import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ExploreNote, Field, Headline, Screen } from '@/components/ui';
import { DECISION_RHYTHMS, WORK_STAGES } from '@/data/ops';
import { useStore } from '@/store';

const COMPACT_STAGES = [
  { id: 'shape', label: 'SHAPE' },
  { id: 'commit', label: 'COMMIT' },
  { id: 'mobilise', label: 'DELIVER' },
  { id: 'field', label: 'FIELD' },
  { id: 'expand', label: 'EXPAND' },
] as const;

function DecisionRhythm() {
  const [selected, setSelected] = useState<string | null>(null);
  const rhythm = DECISION_RHYTHMS.find((item) => item.id === selected);
  return <div data-testid="decision-rhythm" className="flex-1 min-h-0 grid lg:grid-cols-[1fr_320px] gap-4">
    <div className="flex flex-col justify-center gap-2 max-w-4xl w-full mx-auto">{DECISION_RHYTHMS.map((r) => <button key={r.id} data-testid={`rhythm-${r.id}`} onClick={() => setSelected(selected === r.id ? null : r.id)} className={cn('group rounded border bg-ink-2 px-4 py-3 text-left grid grid-cols-[150px_1fr] sm:grid-cols-[190px_1fr_auto] items-center gap-4 transition-all', selected === r.id ? 'border-sig-blue/60 bg-ink-3' : selected ? 'border-line opacity-30' : 'border-line hover:border-line-2')}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-sig-blue">{r.freq}</span><span className="text-sm font-medium">{r.name}</span><span className="hidden sm:inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-300">{r.output}<ArrowRight className="h-3 w-3" /></span>
    </button>)}</div>
    <div className="panel p-4 flex flex-col"><div className="eyebrow">Forum contract</div>{!rhythm ? <div className="flex-1 flex items-center justify-center text-center text-sm text-paper-3">Select a forum</div> : <div className="animate-rise mt-5 space-y-4"><Field label="Purpose">{rhythm.purpose}</Field><Field label="Participants">{rhythm.participants}</Field><Field label="Inputs">{rhythm.inputs}</Field><Field label="Decision / output"><span className="text-emerald-300">{rhythm.output}</span></Field><Field label="Closure">{rhythm.closure}</Field></div>}</div>
  </div>;
}

function OperatingContext() {
  const [selected, setSelected] = useState<string | null>(null);
  const stage = WORK_STAGES.find((item) => item.id === selected);
  return <section data-testid="operating-context" className="panel p-3 shrink-0">
    <div className="eyebrow mb-2">Operating context</div>
    <div className="flex flex-wrap items-center gap-2">{COMPACT_STAGES.map((item, index) => <div key={item.id} className="inline-flex items-center gap-2"><button data-testid={`compact-stage-${item.id}`} onClick={() => setSelected(selected === item.id ? null : item.id)} className={cn('rounded border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-colors', selected === item.id ? 'border-sig-blue/60 bg-sig-blue/10 text-paper' : 'border-line text-paper-2 hover:border-line-2')}>{item.label}</button>{index < COMPACT_STAGES.length - 1 && <ArrowRight className="h-3 w-3 text-paper-3" />}</div>)}</div>
    {stage && <div className="mt-3 grid sm:grid-cols-3 gap-3 border-t border-line pt-3 animate-rise"><Field label="Primary owner">{stage.owner}</Field><Field label="Supporting functions">{stage.support}</Field><Field label="Key decision">{stage.decision}</Field></div>}
  </section>;
}

export default function Cadence() {
  const { mode } = useStore();
  return <Screen>
    <Headline title="Decisions at the right cadence." sub="Every forum exists to decide, unblock, escalate or reallocate." />
    <ExploreNote>Select a forum for its contract. Explore also exposes the compact operating context.</ExploreNote>
    <DecisionRhythm />
    {mode === 'explore' && <OperatingContext />}
  </Screen>;
}
