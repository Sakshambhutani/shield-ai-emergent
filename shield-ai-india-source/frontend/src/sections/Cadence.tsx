import { useEffect, useState } from 'react';
import { ArrowRight, RotateCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { ExploreNote, Field, Headline, Pill, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { DECISION_RHYTHMS, WORK_STAGES, type WorkStage } from '@/data/ops';

type View = 'loop' | 'rhythm';
const INTERNATIONAL_PATTERN = [
  ['Ukraine', 'field operations → operator / mission feedback'],
  ['Taiwan', 'local integration → sovereign-autonomy programme'],
  ['Australia', 'customer work → global Vision / product engineering'],
  ['India', 'customer programmes → reusable Hivemind / integration capability'],
];

function StageDrawer({ stage, onClose }: { stage: WorkStage | null; onClose: () => void }) {
  return <SideDrawer open={!!stage} onClose={onClose} title={stage?.name ?? ''} eyebrow="Operating loop stage" testId="stage-drawer" width="sm:w-[500px]">
    {stage && <div className="space-y-5 stagger">
      <Field label="Primary owner">{stage.owner}</Field>
      <Field label="Supporting functions">{stage.support}</Field>
      <Field label="Decision produced"><span className="text-emerald-300">{stage.decision}</span></Field>
      <Field label="KPIs"><div className="flex flex-wrap gap-1.5 mt-1">{stage.kpis.map((x) => <Pill key={x} tone="blue">{x}</Pill>)}</div></Field>
      {stage.id === 'productise' && <div className="border-t border-line pt-4">
        <div className="eyebrow mb-2">Field learning becomes reusable capability</div>
        <div className="space-y-2">{INTERNATIONAL_PATTERN.map(([country, path]) => <div key={country} className={cn('rounded border px-3 py-2 text-xs grid grid-cols-[70px_1fr] gap-2', country === 'India' ? 'border-sig-blue/60 bg-sig-blue/10' : 'border-line bg-ink-2')}><span className="font-medium">{country}</span><span className="text-paper-2">{path}</span></div>)}</div>
        <SourceButton claimIds={['c-ukraine-field', 'c-taiwan-node', 'c-vision-australia', 'c-india-sub']} title="International operating pattern" className="mt-3" />
      </div>}
    </div>}
  </SideDrawer>;
}

function OperatingLoop() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('focus');
  const [selected, setSelected] = useState<string | null>(WORK_STAGES.some((s) => s.id === initial) ? initial : null);
  useEffect(() => { if (initial && WORK_STAGES.some((s) => s.id === initial)) setSelected(initial); }, [initial]);
  const stage = WORK_STAGES.find((s) => s.id === selected) ?? null;
  return <>
    <div data-testid="operating-loop-mobile" className="md:hidden flex-1 py-3">
      <div className="border-l border-dashed border-line-2 ml-3 space-y-2 pl-5">
        {WORK_STAGES.map((s, i) => <button key={s.id} data-testid={`mobile-stage-${s.id}`} onClick={() => { setSelected(s.id); setParams({ focus: s.id }); }} className={cn('relative w-full rounded border bg-ink-2 px-3 py-2 text-left transition-all', selected === s.id ? 'border-sig-blue bg-sig-blue/10' : 'border-line')}>
          <span className="absolute -left-[27px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-sig-blue bg-ink" />
          <span className="font-mono text-[9px] uppercase tracking-wider">{String(i + 1).padStart(2, '0')} · {s.name}</span>
        </button>)}
      </div>
      <div className="mt-3 text-center font-mono text-[9px] uppercase tracking-wider text-sig-blue">Product learning → next mission need</div>
    </div>
    <div data-testid="operating-loop" className="relative flex-1 min-h-[560px] max-w-[1040px] w-full mx-auto hidden md:block">
      <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
        <path d="M170 278 C170 115 320 72 500 72 C680 72 830 115 830 278 C830 440 680 488 500 488 C320 488 170 440 170 278 Z" fill="none" stroke="#232937" strokeWidth="2" strokeDasharray="4 7" />
        <path d="M805 195 l25 9 -21 15" fill="none" stroke="#3B82F6" strokeWidth="2" />
        <path d="M195 365 l-25 -9 21 -15" fill="none" stroke="#3B82F6" strokeWidth="2" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <RotateCw className="h-8 w-8 text-sig-blue mx-auto mb-2 opacity-80" />
        <div className="font-mono text-xs tracking-[.22em] text-paper">ONE MISSION SYSTEM</div>
        <div className="font-mono text-[9px] uppercase tracking-wider text-paper-3 mt-2">evidence returns to the next mission</div>
      </div>
      {WORK_STAGES.map((s, i) => {
        const angle = (-150 + i * (300 / (WORK_STAGES.length - 1))) * Math.PI / 180;
        const left = 50 + Math.cos(angle) * 40;
        const top = 50 + Math.sin(angle) * 37;
        const on = selected === s.id;
        return <button key={s.id} data-testid={`stage-${s.id}`} onClick={() => { setSelected(s.id); setParams({ focus: s.id }); }} className={cn('absolute -translate-x-1/2 -translate-y-1/2 w-[126px] min-h-[52px] rounded border bg-ink-2 px-2 py-2 text-center transition-all duration-300', on ? 'border-sig-blue bg-sig-blue/10 text-paper shadow-lg' : selected ? 'border-line opacity-25' : 'border-line hover:border-line-2')} style={{ left: `${left}%`, top: `${top}%` }}>
          <span className="block font-mono text-[9px] uppercase tracking-wider leading-tight">{s.name}</span>
          <span className={cn('mx-auto mt-1.5 block h-1 rounded-full transition-all', on ? 'w-8 bg-sig-blue' : 'w-2 bg-paper-3/50')} />
        </button>;
      })}
    </div>
    <StageDrawer stage={stage} onClose={() => { setSelected(null); setParams({}); }} />
  </>;
}

function DecisionRhythm() {
  const [selected, setSelected] = useState<string | null>(null);
  return <div data-testid="decision-rhythm" className="flex-1 min-h-0 grid lg:grid-cols-[1fr_300px] gap-4">
    <div className="flex flex-col justify-center gap-2 max-w-4xl w-full mx-auto">{DECISION_RHYTHMS.map((r, i) => <button key={r.id} data-testid={`rhythm-${r.id}`} onClick={() => setSelected(selected === r.id ? null : r.id)} className={cn('group rounded border bg-ink-2 px-4 py-3 text-left grid grid-cols-[190px_1fr_auto] items-center gap-4 transition-all', selected === r.id ? 'border-sig-blue/60 bg-ink-3' : selected ? 'border-line opacity-30' : 'border-line hover:border-line-2')}>
      <span className="font-mono text-[10px] uppercase tracking-wider text-sig-blue">{r.freq}</span><span className="text-sm font-medium">{r.name}</span><span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-300">{r.output}<ArrowRight className="h-3 w-3" /></span>
    </button>)}</div>
    <div className="panel p-4 flex flex-col"><div className="eyebrow">Forum contract</div>{selected ? <div className="animate-rise mt-6"><div className="text-lg font-medium">{DECISION_RHYTHMS.find((x) => x.id === selected)?.name}</div><p className="text-sm text-paper-2 mt-2">{DECISION_RHYTHMS.find((x) => x.id === selected)?.detail}</p></div> : <div className="flex-1 flex items-center justify-center text-center text-sm text-paper-3">Select a rhythm</div>}<div className="mt-auto border-t border-line pt-3 text-[10px] font-mono text-paper-3">MD Office stewards inputs, dependencies, decision log and closure. Functional and mission owners retain accountability.</div></div>
  </div>;
}

export default function Cadence() {
  const [view, setView] = useState<View>('loop');
  return <Screen>
    <Headline title="One operating loop. Decisions at gates." sub="Work moves continuously from mission need to field proof, then returns as reusable product capability." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposed system</Pill><SourceButton claimIds={['m-cadence']} title="Operating loop" /></div>} />
    <div className="flex rounded border border-line overflow-hidden text-[11px] self-start shrink-0">
      <button data-testid="cadence-view-loop" onClick={() => setView('loop')} className={cn('px-3 py-1.5', view === 'loop' ? 'bg-ink-4 text-paper' : 'text-paper-3')}>Operating Loop</button>
      <button data-testid="cadence-view-rhythm" onClick={() => setView('rhythm')} className={cn('px-3 py-1.5', view === 'rhythm' ? 'bg-ink-4 text-paper' : 'text-paper-3')}>Decision Rhythm</button>
    </div>
    <ExploreNote>Select a stage or forum to inspect owner, support, decision output and KPIs.</ExploreNote>
    {view === 'loop' ? <OperatingLoop /> : <DecisionRhythm />}
  </Screen>;
}
