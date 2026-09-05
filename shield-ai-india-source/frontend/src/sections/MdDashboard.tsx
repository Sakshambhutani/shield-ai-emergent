import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Headline, Pill, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { BET_META } from '@/data/opportunities';
import { ACCOUNT_MAP } from '@/data/accounts';
import { ACCOUNT_GROUPS, ATTENTION_BASE, CAPACITY, DATA_CLASS, EXCEPTIONS, HORIZONS, MD_BETS, MD_DECISIONS, MD_RISKS, NORTH_STAR, type Bet, type DataClass } from '@/data/md';
import { useStore } from '@/store';

const betTone = (b: string) => (b === 'scale' ? 'green' : 'blue') as 'green' | 'blue';
const Cls = ({ c }: { c: DataClass }) => <Pill tone={DATA_CLASS[c].tone}>{DATA_CLASS[c].label}</Pill>;
const Drill = ({ to, label }: { to: number; label: string }) => { const { go } = useStore(); return <button data-testid={`drill-${label.toLowerCase().replace(/\W+/g, '-')}`} onClick={(e) => { e.stopPropagation(); go(to); }} className="inline-flex items-center gap-0.5 text-[11px] text-sig-blue hover:underline">{label} <ArrowUpRight className="h-3 w-3" /></button>; };

function Track({ states, current, small }: { states: string[]; current: number | null; small?: boolean }) {
  return (
    <div className="flex items-center gap-1 w-full">
      {states.map((s, i) => { const on = current === i; const past = current !== null && i < current; return (
        <div key={s} className="flex-1 min-w-0 flex flex-col gap-1">
          <div className={cn('h-1 rounded-full transition-colors duration-300', on ? 'bg-sig-blue' : past ? 'bg-paper-3' : 'bg-line-2')} />
          <div style={{ fontSize: small ? 8 : 9 }} className={cn('truncate font-mono uppercase tracking-wider', on ? 'text-paper' : 'text-paper-3/70')}>{s}</div>
        </div>); })}
    </div>
  );
}

function BetCard({ b, onOpen }: { b: Bet; onOpen: () => void }) {
  const m = BET_META[b.id];
  return (
    <button data-testid={`md-bet-${b.id}`} onClick={onOpen} className="panel panel-hover p-4 text-left flex flex-col gap-3 border-t-2 min-h-[170px]" style={{ borderTopColor: m.color }}>
      <div className="flex items-start justify-between gap-2">
        <div><div className="text-2xl font-semibold tracking-tight">{b.title}</div><div className="text-xs text-paper-2">{b.who} · {b.what}</div></div>
        <div className="flex flex-col items-end gap-1"><span data-testid={`md-status-${b.id}`} className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-paper-3"><span className="h-2.5 w-2.5 rounded-full border border-paper-3/60" />Baseline required</span><span className="font-mono text-[10px] text-paper-3">Trend —</span></div>
      </div>
      {b.funnel && <Track states={b.funnel} current={null} small />}
      {b.stages && <Track states={b.stages} current={b.stage ?? null} small />}
      <div className="grid grid-cols-2 gap-3 text-xs mt-auto">
        <div><div className="eyebrow">Current gate</div><div className="mt-0.5 text-paper">{b.currentGate}</div></div>
        <div><div className="eyebrow">Next gate</div><div className="mt-0.5 text-paper">{b.nextGate}</div></div>
        <div className="col-span-2 border-t border-line pt-2 flex items-center justify-between gap-2"><span className="eyebrow text-sig-amber">Blocker</span><span className="text-paper text-right">{b.blocker}</span></div>
      </div>
    </button>
  );
}

function BetDrawer({ bet, onClose }: { bet: Bet | null; onClose: () => void }) {
  const decs = MD_DECISIONS.filter((d) => bet?.decisionIds.includes(d.id));
  const risks = MD_RISKS.filter((r) => bet?.riskIds.includes(r.id));
  return (
    <SideDrawer open={!!bet} onClose={onClose} title={bet ? `${bet.title} · ${bet.who}` : ''} eyebrow="Bet detail" testId="bet-drawer">
      {bet && <div className="space-y-4 stagger">
        <div className="flex items-center gap-2 flex-wrap"><SourceButton claimIds={bet.claimIds} title={bet.title} /><Drill to={bet.drill} label={DRILL_LABEL[bet.drill]} /></div>
        <Field label="Outcome sought">{bet.outcome}</Field>
        <Field label="Current gate">{bet.currentGate}</Field>
        <Field label="Evidence">{bet.evidence} <Pill tone="green" className="ml-1">Verified public</Pill></Field>
        <Field label="Next 90 days"><div className="flex flex-wrap gap-1 mt-1">{bet.next90.map((x) => <Pill key={x}>{x}</Pill>)}</div></Field>
        <Field label="Dependencies"><div className="flex flex-wrap gap-1 mt-1">{bet.dependencies.map((x) => <Pill key={x} tone="amber">{x}</Pill>)}</div></Field>
        <Field label="Decisions required">{decs.map((d) => <div key={d.id} className="text-xs text-paper-2">· {d.decision}</div>)}</Field>
        <Field label="Top risks">{risks.map((r) => <div key={r.id} className="text-xs text-paper-2">{r.trend} {r.risk}</div>)}</Field>
        <div className="text-[10px] font-mono text-paper-3">Status & trend: internal data not connected — baseline required.</div>
      </div>}
    </SideDrawer>
  );
}

function DecisionCard({ d }: { d: (typeof MD_DECISIONS)[number] }) {
  const [lvl, setLvl] = useState(0);
  const { openEvidence } = useStore();
  return (
    <div data-testid={`decision-${d.id}`} role="button" tabIndex={0} onClick={() => setLvl((l) => (l + 1) % 3)} onKeyDown={(e) => e.key === 'Enter' && setLvl((l) => (l + 1) % 3)} className={cn('rounded border bg-ink-2 px-4 py-2.5 cursor-pointer transition-colors duration-200 hover:border-line-2', lvl ? 'border-sig-blue/60 bg-ink-3' : 'border-line')}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-paper-3 w-20 shrink-0">{d.type}</span>
        <span className="text-sm font-medium flex-1 leading-snug">{d.decision}</span>
        <Pill tone={betTone(d.bet)}>{BET_META[d.bet].label}</Pill>
        <span className="num text-xs text-sig-amber whitespace-nowrap">{d.deadline}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-paper-3 transition-transform duration-200', lvl && 'rotate-180')} />
      </div>
      {lvl >= 1 && <div data-testid={`decision-why-${d.id}`} className="animate-rise grid sm:grid-cols-3 gap-3 mt-3 pl-[92px] text-xs">
        <Field label="Why now">{d.why}</Field>
        <Field label="Recommendation"><span className="text-emerald-300">{d.rec}</span></Field>
        <Field label="Consequence of delay"><span className="text-sig-amber">{d.delay}</span></Field>
      </div>}
      {lvl === 2 && <div data-testid={`decision-evidence-${d.id}`} className="animate-rise mt-2 pl-[92px] flex items-center gap-3 text-[11px]"><span className="eyebrow">Evidence</span><button onClick={(e) => { e.stopPropagation(); openEvidence(d.claimIds, d.decision); }} className="text-sig-blue hover:underline">Sources & assumptions ({d.claimIds.length})</button><span className="text-paper-3">Owner: India MD</span></div>}
    </div>
  );
}

function Explore() {
  const [att, setAtt] = useState(ATTENTION_BASE);
  const total = Object.values(att).reduce((a, b) => a + b, 0);
  const shift = att.embed - ATTENTION_BASE.embed;
  const { setAccount } = useStore();
  return (
    <div className="grid lg:grid-cols-3 gap-4 animate-rise" data-testid="md-explore">
      <div className="panel p-4 border-dashed border-violet-400/50">
        <div className="flex items-center justify-between"><span className="eyebrow text-violet-300">Management-attention allocation</span><Pill tone="amber">Illustrative</Pill></div>
        <div className="mt-3 space-y-2">
          {(Object.keys(att) as (keyof typeof att)[]).map((k) => <label key={k} className="block text-xs"><div className="flex justify-between"><span className="uppercase font-mono text-[10px] text-paper-2">{k}</span><span className="num text-violet-300">{Math.round((att[k] / total) * 100)}%</span></div><input data-testid={`attention-${k}`} type="range" min={0} max={60} value={att[k]} onChange={(e) => setAtt({ ...att, [k]: Number(e.target.value) })} className="w-full accent-violet-400" /></label>)}
        </div>
        <div className="mt-3 text-xs text-paper-2 num">{shift > 0 ? `+${shift} to EMBED → SIL/HIL gate earlier · seeds slow` : shift < 0 ? `${shift} from EMBED → first-flight gate slips` : 'Base case · Bet 1 protected'}</div>
        <button data-testid="attention-reset" onClick={() => setAtt(ATTENTION_BASE)} className="mt-2 text-[11px] text-paper-3 hover:text-paper-2">Reset</button>
      </div>
      <div className="panel p-4">
        <div className="flex items-center justify-between"><span className="eyebrow">Commitment vs capacity</span><Cls c="internal" /></div>
        <div className="mt-3 space-y-2">{CAPACITY.map((c) => <div key={c} className="flex items-center justify-between text-xs"><span>{c}</span><span className="font-mono text-[10px] text-paper-3 italic">Baseline required</span></div>)}</div>
        <div className="mt-3 flex gap-2 text-[9px] font-mono text-paper-3">{['Available', 'Healthy', 'Tight', 'Overcommitted'].map((s, i) => <span key={s} className="inline-flex items-center gap-1"><span className={cn('h-1.5 w-1.5 rounded-full', ['bg-paper-3', 'bg-emerald-400', 'bg-amber-400', 'bg-red-400'][i])} />{s}</span>)}</div>
      </div>
      <div className="panel p-4">
        <div className="eyebrow">Account signals</div>
        <div className="mt-3 space-y-2">{ACCOUNT_GROUPS.map((g) => <div key={g.label} className="flex items-start gap-2 text-xs"><span className="font-mono text-[9px] uppercase tracking-wider text-paper-3 w-28 shrink-0 mt-0.5">{g.label}</span><div className="flex flex-wrap gap-1">{g.ids.length ? g.ids.map((id) => <button key={id} data-testid={`md-account-${id}`} onClick={() => setAccount(id)} className="rounded border border-line px-1.5 py-0.5 text-[11px] hover:border-sig-blue/60">{ACCOUNT_MAP[id].name}</button>) : <span className="text-paper-3 italic">None public</span>}</div></div>)}</div>
        <div className="mt-3 text-[10px] font-mono text-paper-3">Decision · sponsor · stage: baseline required</div>
      </div>
    </div>
  );
}

const MD_CLAIMS = ['m-md', 'm-integrations'];
const DRILL_LABEL: Record<number, string> = { 4: 'Open roadmap', 2: 'Open accounts' };
const trendTone = (t: string): string => (t === '↑' ? 'text-sig-red' : 'text-sig-amber');

function NorthStarStrip() {
  const { go } = useStore();
  return (
    <>
      <div className="eyebrow">North Star · Month 18</div>
      {NORTH_STAR.map((o) => (
        <button key={o.id} data-testid={`outcome-${o.id}`} onClick={() => go(7)} className="panel panel-hover px-3 py-2 text-left flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2"><span className="text-sm font-medium">{o.title}</span><div className="flex items-center gap-2">{o.target && <span className="num text-[10px] text-violet-300">{o.target}</span>}<Cls c={o.cls} /></div></div>
          <Track states={o.states} current={o.current} small />
          <div className="text-[10px] text-paper-3">Next: <span className="text-paper-2">{o.next}</span></div>
        </button>
      ))}
    </>
  );
}

function RiskCards() {
  const [risk, setRisk] = useState<string | null>(null);
  return (
    <div data-testid="md-risks" className="mt-2">
      <div className="flex items-center justify-between mb-2"><span className="eyebrow text-sig-red">Active risks · leading indicators triggered</span><span className="num text-xs text-paper-3">{MD_RISKS.length}</span></div>
      <div className="grid md:grid-cols-3 gap-3">
        {MD_RISKS.map((r) => { const on = risk === r.id; return (
          <div key={r.id} role="button" tabIndex={0} data-testid={`risk-${r.id}`} onClick={() => setRisk(on ? null : r.id)} onKeyDown={(e) => e.key === 'Enter' && setRisk(on ? null : r.id)} className={cn('panel panel-hover px-3 py-2 text-left flex flex-col gap-1.5 cursor-pointer', on && 'bg-ink-3 border-line-2')}>
            <div className="flex items-center gap-2"><span className={cn('num text-base', trendTone(r.trend))}>{r.trend}</span><span className="text-sm flex-1 leading-snug">{r.risk}</span><Pill tone={betTone(r.bet)}>{BET_META[r.bet].label}</Pill></div>
            {on && <div className="animate-rise text-xs space-y-1.5 border-t border-line pt-2"><Field label="Leading indicator">{r.indicator}</Field><Field label="Mitigation owner">{r.owner}</Field>{r.decision && <Field label="Decision needed">{r.decision}</Field>}<Drill to={r.drill} label="Affected gate" /></div>}
          </div>); })}
      </div>
    </div>
  );
}

function ExceptionsStrip() {
  const [exc, setExc] = useState(false);
  return (
    <div data-testid="md-exceptions" className="mt-1">
      <button data-testid="exceptions-toggle" onClick={() => setExc(!exc)} className="flex items-center gap-2 eyebrow hover:text-paper-2"><ChevronDown className={cn('h-3 w-3 transition-transform', exc && 'rotate-180')} />Execution exceptions · none triggered (baseline required)</button>
      {exc && <div className="mt-2 grid grid-cols-2 gap-2 animate-rise opacity-70">
        {EXCEPTIONS.map((x) => <div key={x.id} data-testid={`exception-${x.id}`} className="panel px-3 py-2 flex flex-col gap-1"><div className="flex items-center justify-between gap-2"><span className="text-xs">{x.label}</span><Drill to={x.drill} label="→" /></div><span className={cn('font-mono text-[10px]', x.cls === 'public' ? 'text-emerald-300' : 'text-paper-3 italic')}>{x.state}</span>{x.bar === null && <div className="h-1 rounded-full bg-line-2" />}</div>)}
      </div>}
    </div>
  );
}

export default function MdDashboard() {
  const { mode } = useStore();
  const [bet, setBet] = useState<Bet | null>(null);
  const [fwd, setFwd] = useState(false);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setBet(null); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, []);
  return (
    <Screen>
      <Headline title="See → decide → unblock → scale" sub="The smallest set of information the MD needs, once a month, in under three minutes." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposed structure</Pill><SourceButton claimIds={MD_CLAIMS} title="MD Dashboard" /></div>} />
      <div className="grid md:grid-cols-3 gap-4 stagger shrink-0">{MD_BETS.map((b) => <BetCard key={b.id} b={b} onOpen={() => setBet(b)} />)}</div>
      <div className="grid lg:grid-cols-5 gap-4 shrink-0">
        <div className="lg:col-span-2 flex flex-col gap-2" data-testid="north-star-strip">
          <NorthStarStrip />
          <ExceptionsStrip />
        </div>
        <div className="lg:col-span-3 flex flex-col gap-2" data-testid="md-decisions">
          <div className="flex items-center justify-between"><span className="eyebrow text-sig-blue">Decisions required · only MD / HQ judgement</span><span className="num text-xs text-paper-3">{MD_DECISIONS.length}</span></div>
          {MD_DECISIONS.map((d) => <DecisionCard key={d.id} d={d} />)}
          <RiskCards />
        </div>
      </div>
      <div className="shrink-0">
        <button data-testid="forward-toggle" onClick={() => setFwd(!fwd)} className="flex items-center gap-2 eyebrow hover:text-paper-2"><ChevronDown className={cn('h-3 w-3 transition-transform', fwd && 'rotate-180')} />30 / 60 / 90 forward view</button>
        {fwd && <div className="grid grid-cols-3 gap-3 mt-2 animate-rise" data-testid="md-horizons">{HORIZONS.map((h) => <div key={h.label} className="panel px-3 py-2"><div className="flex items-baseline gap-2"><span className="num text-sm font-semibold text-sig-blue">{h.label}</span><span className="eyebrow">{h.sub}</span></div><div className="mt-1 flex flex-wrap gap-1">{h.items.map((i) => <Pill key={i}>{i}</Pill>)}</div></div>)}</div>}
      </div>
      {mode === 'explore' && <Explore />}
      <div className="flex items-center justify-between text-[10px] font-mono text-paper-3 shrink-0 pt-2 border-t border-line"><span>Internal data: not connected · Updated — · no silently stale data</span><span className="tracking-[0.2em]">SEE → DECIDE → UNBLOCK → SCALE</span></div>
      <BetDrawer bet={bet} onClose={() => setBet(null)} />
    </Screen>
  );
}
