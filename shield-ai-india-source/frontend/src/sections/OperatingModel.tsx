import { useEffect, useState } from 'react';
import { ArrowLeftRight, Check, CircleDotDashed, Network } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { ExploreNote, Field, Headline, Pill, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { GLOBAL_CENTRES, MISSION_TEAMS, OPERATING_CAPABILITIES, RIGHTS, type CapabilityIntensity, type OperatingCapability, type Right } from '@/data/ops';

type View = 'system' | 'rights';
const COLS = [{ key: 'india', label: 'India' }, { key: 'global', label: 'Global Product / Capability Centre' }, { key: 'jsw', label: 'JSW' }, { key: 'prime', label: 'Indian Prime' }] as const;
const RIGHT_STYLE: Record<Right, string> = {
  D: 'border-sig-blue/60 bg-sig-blue/15 text-sig-blue', O: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
  C: 'border-line-2 bg-ink-3 text-paper-2', V: 'border-amber-500/50 border-dashed bg-amber-500/10 text-amber-300', '': 'border-transparent text-paper-3/25',
};
const INTENSITY: Record<CapabilityIntensity, { symbol: string; label: string }> = {
  core: { symbol: '●', label: 'Core' },
  support: { symbol: '○', label: 'Support' },
  'as-needed': { symbol: '·', label: 'As needed' },
};

function Toggle({ view, setView }: { view: View; setView: (v: View) => void }) {
  return <div className="flex rounded border border-line overflow-hidden text-[11px]">
    <button data-testid="op-view-system" onClick={() => setView('system')} className={cn('px-3 py-1.5 transition-colors', view === 'system' ? 'bg-ink-4 text-paper' : 'text-paper-3')}>Operating system</button>
    <button data-testid="op-view-rights" onClick={() => setView('rights')} className={cn('px-3 py-1.5 transition-colors', view === 'rights' ? 'bg-ink-4 text-paper' : 'text-paper-3')}>Decision rights</button>
  </div>;
}

function CapabilityDrawer({ item, onClose }: { item: OperatingCapability | null; onClose: () => void }) {
  return <SideDrawer open={!!item} onClose={onClose} title={item?.name ?? ''} eyebrow="India operating capability" testId="capability-drawer" width="sm:w-[520px]">
    {item && <div className="space-y-5 stagger">
      <Field label="Owns"><ul className="space-y-1 mt-1">{item.owns.map((x) => <li key={x} className="text-xs text-paper-2">→ {x}</li>)}</ul></Field>
      <Field label="Key interfaces"><ul className="space-y-1 mt-1">{item.interfaces.map((x) => <li key={x} className="text-xs text-paper-2">→ {x}</li>)}</ul></Field>
      <Field label="Measures"><div className="flex flex-wrap gap-1.5 mt-1">{item.kpis.slice(0, 3).map((x) => <Pill key={x} tone="blue">{x}</Pill>)}</div></Field>
    </div>}
  </SideDrawer>;
}

function MdOfficeDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <SideDrawer open={open} onClose={onClose} title="MD Office · Integration layer" eyebrow="Operating system" testId="md-office-drawer" width="sm:w-[460px]">
    <div className="space-y-5 stagger">
      <Field label="Role">Integrates the operating system; does not own functional execution.</Field>
      <Field label="Responsibilities"><ul className="space-y-1 mt-1">{['Integrated priorities', 'Decision preparation', 'Cross-functional dependencies', 'Resource conflicts', 'India↔Global alignment', 'Closure of critical decisions / actions'].map((item) => <li key={item} className="text-xs text-paper-2">→ {item}</li>)}</ul></Field>
    </div>
  </SideDrawer>;
}

function GlobalCentresDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <SideDrawer open={open} onClose={onClose} title="Global product & capability centres" eyebrow="Secondary interface" testId="global-centres-drawer" width="sm:w-[460px]">
    <div className="space-y-5 stagger">
      <Field label="Shared capability"><ul className="space-y-1 mt-1">{GLOBAL_CENTRES.map((centre) => <li key={centre.id} className="text-xs text-paper-2">→ {centre.name}</li>)}</ul></Field>
      <Field label="Principle">India owns local execution. Global centres provide shared product capability.</Field>
    </div>
  </SideDrawer>;
}

function OperatingSystem() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('focus');
  const [mission, setMission] = useState<string | null>(MISSION_TEAMS.some((m) => m.id === initial) ? initial : null);
  const [capId, setCapId] = useState<string | null>(OPERATING_CAPABILITIES.some((c) => c.id === initial) ? initial : null);
  const [mdOfficeOpen, setMdOfficeOpen] = useState(false);
  const [globalOpen, setGlobalOpen] = useState(false);
  useEffect(() => { if (initial && OPERATING_CAPABILITIES.some((c) => c.id === initial)) setCapId(initial); else if (!initial) setCapId(null); }, [initial]);
  const selectMission = (id: string) => { setMission((current) => current === id ? null : id); setCapId(null); setParams({}); };
  const selectCapability = (id: string) => { setCapId(id); setParams({ focus: id }); };
  const selectedMission = MISSION_TEAMS.find((m) => m.id === mission);
  const cap = OPERATING_CAPABILITIES.find((c) => c.id === capId) ?? null;
  return <>
    <div data-testid="operating-system" className="flex-1 min-h-[500px] flex flex-col justify-center max-w-7xl w-full mx-auto py-2 overflow-x-auto">
      <div className="grid grid-cols-[150px_repeat(7,minmax(76px,1fr))] gap-x-2 gap-y-2 items-stretch min-w-[880px]">
        <div className="eyebrow self-end pb-1">Mission teams</div>
        {OPERATING_CAPABILITIES.map((c) => <div key={c.id} className="text-center font-mono text-[9px] uppercase tracking-wider text-paper-3 leading-tight px-1 self-end">{c.short}</div>)}
        {MISSION_TEAMS.map((m) => { const on = mission === m.id; const faded = !!mission && !on; return <div key={m.id} className="contents">
           <button data-testid={`mission-${m.id}`} onClick={() => selectMission(m.id)} className={cn('rounded-l border px-3 py-3 text-left transition-all duration-300', faded && 'opacity-25')} style={{ borderColor: on ? m.color : '#2E3546', background: on ? `${m.color}18` : '#12151C' }}>
            <div className="font-mono text-[10px] tracking-[.18em]" style={{ color: m.color }}>{m.bet}</div><div className="text-lg font-semibold leading-tight">{m.service}</div>
          </button>
           {OPERATING_CAPABILITIES.map((c) => { const intensity = m.capabilityLevels[c.id]; const meta = intensity ? INTENSITY[intensity] : null; return <button key={c.id} aria-label={`${m.bet} ${meta?.label ?? 'unused'} ${c.name}`} title={meta?.label} onClick={() => selectMission(m.id)} className={cn('border-y border-line bg-ink-2 flex items-center justify-center transition-all duration-300 last:border-r last:rounded-r', faded && 'opacity-20', !meta && 'opacity-10')}><span className={cn('font-mono text-sm leading-none transition-all duration-300', on && meta?.symbol === '●' ? 'text-base' : 'text-xs')} style={{ color: meta ? m.color : '#2E3546' }}>{meta?.symbol ?? '·'}</span></button>})}
        </div>; })}
        <div className="h-5" />{OPERATING_CAPABILITIES.map((c) => <div key={c.id} className="flex justify-center"><div className="h-5 w-px bg-line-2" /></div>)}
        <div className="eyebrow self-center">India capabilities</div>
         {OPERATING_CAPABILITIES.map((c) => { const relevant = !selectedMission || selectedMission.capabilityLevels[c.id] !== undefined; return <button key={c.id} data-testid={`capability-${c.id}`} onClick={() => selectCapability(c.id)} className={cn('panel panel-hover px-2 py-4 min-h-[104px] text-center flex flex-col items-center justify-center transition-all duration-300', !relevant && 'opacity-15', capId === c.id && 'border-sig-blue/60 bg-ink-3')}><CircleDotDashed className="h-4 w-4 text-paper-3 mb-2" /><span className="text-[11px] leading-tight font-medium">{c.name}</span></button>})}
        <div className="h-5" />{OPERATING_CAPABILITIES.map((c) => <div key={c.id} className="flex justify-center"><div className="h-5 w-px bg-line-2" /></div>)}
         <button type="button" className="col-span-8 rounded border border-sig-blue/40 bg-sig-blue/[.06] px-4 py-2 flex items-center gap-5 text-left hover:bg-sig-blue/[.1]" data-testid="md-office-layer" onClick={() => setMdOfficeOpen(true)}>
           <div className="font-mono text-[10px] uppercase tracking-[.18em] text-sig-blue whitespace-nowrap">MD Office · Integration layer</div><div className="h-px flex-1 bg-sig-blue/25" />
           <div className="hidden lg:flex gap-4 font-mono text-[9px] uppercase tracking-wider text-paper-3">{['Priorities', 'Decisions', 'Dependencies', 'Resources', 'Risks', 'India↔Global'].map((x) => <span key={x}>{x}</span>)}</div>
         </button>
      </div>
       <div className="mt-5 flex items-center justify-between text-[10px] font-mono text-paper-3 min-w-[880px]"><span>{selectedMission ? `${selectedMission.bet} · capability intensity shown` : 'Select a mission or capability'}</span><button type="button" data-testid="global-centres-trigger" onClick={() => setGlobalOpen(true)} className="inline-flex items-center gap-1.5 text-paper-3 hover:text-paper-2"><Network className="h-3 w-3" /> GLOBAL PRODUCT &amp; CAPABILITY CENTRES ↗</button></div>
    </div>
    <CapabilityDrawer item={cap} onClose={() => { setCapId(null); setParams({}); }} />
    <MdOfficeDrawer open={mdOfficeOpen} onClose={() => setMdOfficeOpen(false)} />
    <GlobalCentresDrawer open={globalOpen} onClose={() => setGlobalOpen(false)} />
  </>;
}

function RightsMatrix() {
  const [row, setRow] = useState<number | null>(null);
  return <div data-testid="rights-matrix" className="flex-1 min-h-0 grid lg:grid-cols-[1fr_320px] gap-4">
     <div className="panel overflow-auto"><table className="w-full text-sm"><thead><tr><th className="text-left px-4 py-3 eyebrow font-normal">Material decision</th>{COLS.map((c) => <th key={c.key} className="px-2 py-3 eyebrow font-normal text-center max-w-[160px]">{c.label}</th>)}</tr></thead><tbody>{RIGHTS.map((r, i) => <tr key={r.row} data-testid={`rights-row-${i}`} onClick={() => setRow(row === i ? null : i)} className={cn('border-t border-line cursor-pointer transition-colors hover:bg-ink-3', row === i && 'bg-ink-3')}><td className="px-4 py-2.5 text-xs">{r.row}</td>{COLS.map((c) => <td key={c.key} className="text-center"><span className={cn('inline-flex min-h-7 min-w-7 px-1 items-center justify-center rounded border font-mono text-[10px] font-semibold', RIGHT_STYLE[r[c.key]])}>{r[c.key] === 'V' ? 'TO VALIDATE' : r[c.key] || '·'}</span></td>)}</tr>)}</tbody></table></div>
     <div className="panel p-4 flex flex-col"><div className="eyebrow">Decision logic</div>{row === null ? <div className="flex-1 flex items-center justify-center text-center text-sm text-paper-3"><div><ArrowLeftRight className="h-7 w-7 mx-auto mb-3 opacity-50" />Select a material decision</div></div> : <div className="animate-rise mt-6"><div className="text-lg font-medium">{RIGHTS[row].row}</div><p className="text-sm text-paper-2 mt-2">{RIGHTS[row].rationale}</p></div>}<div className="mt-auto border-t border-line pt-3 flex flex-wrap gap-3 text-[10px] font-mono"><span className="text-sig-blue">D · Decides</span><span className="text-emerald-300">O · Owns execution</span><span className="text-paper-2">C · Consulted</span><span className="text-amber-300">To validate</span></div></div>
  </div>;
}

export default function OperatingModel() {
  const [view, setView] = useState<View>('system');
  return <Screen>
     <Headline title="Three missions. One India operating system." sub="Mission owners coordinate the capabilities they consume; India pulls from global centres without recreating them." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposed operating model</Pill><SourceButton claimIds={['m-opmodel', 'c-india-sub', 'c-vision-australia']} title="Operating model" /></div>} />
     <div className="flex items-center justify-between gap-4 shrink-0"><Toggle view={view} setView={setView} />{view === 'system' && <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-paper-3"><span className="text-paper">● Core</span><span className="text-paper-2">○ Support</span><span className="text-paper-3">· As needed</span><span className="ml-2"><Check className="inline h-3 w-3 mr-1 text-emerald-300" />one accountable mission owner per bet</span></div>}</div>
     <ExploreNote>Click a mission or capability to inspect ownership, KPIs and global interfaces.</ExploreNote>
    {view === 'system' ? <OperatingSystem /> : <RightsMatrix />}
  </Screen>;
}
