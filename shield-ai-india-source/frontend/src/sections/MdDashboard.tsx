import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Headline, Pill, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { BET_META } from '@/data/opportunities';
import { ACCOUNT_MAP } from '@/data/accounts';
import { ACCOUNT_GROUPS, ATTENTION_BASE, CAPACITY, DATA_CLASS, HORIZONS, MD_BETS, MD_DECISIONS, MD_RISKS, NORTH_STAR, type Bet, type DataClass, type Decision, type Risk } from '@/data/md';
import { useStore } from '@/store';

const MD_CLAIMS = ['m-md', 'm-integrations'];
const DRILL_LABEL: Record<number, string> = { 4: 'Open roadmap', 2: 'Open accounts', 3: 'Open priorities', 5: 'Open operating model' };
const STORY_BET_COPY = {
  scale: { current: 'Governance', next: 'Operational proof', blocker: 'Acceptance owner' },
  embed: { current: 'Platform selection', next: 'First SIL / HIL', blocker: 'SDK scope' },
  expand: { current: 'Sponsor', next: 'Technical path', blocker: 'Trial access' },
};
const ACTIVE_DECISION_IDS = ['d2', 'd1', 'd3'];
const ACTIVE_RISK_IDS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'];
const betTone = (b: string) => (b === 'scale' ? 'green' : b === 'embed' ? 'blue' : 'purple') as 'green' | 'blue' | 'purple';
const trendTone = (t: string) => t === '↑' ? 'text-sig-red' : t === '↓' ? 'text-emerald-300' : 'text-sig-amber';
const Cls = ({ c }: { c: DataClass }) => <Pill tone={DATA_CLASS[c].tone}>{DATA_CLASS[c].label}</Pill>;

function Drill({ to, label }: { to: number; label: string }) {
  const { go } = useStore();
  return <button onClick={(e) => { e.stopPropagation(); go(to); }} className="inline-flex items-center gap-0.5 text-[11px] text-sig-blue hover:underline">{label} <ArrowUpRight className="h-3 w-3" /></button>;
}

function Track({ states, current }: { states: string[]; current: number | null }) {
  return <div className="flex items-center gap-1 w-full">{states.map((s, i) => <div key={s} className="flex-1 min-w-0 flex flex-col gap-1"><div className={cn('h-1 rounded-full', current === i ? 'bg-sig-blue' : current !== null && i < current ? 'bg-paper-3' : 'bg-line-2')} /><div className={cn('truncate font-mono text-[8px] uppercase tracking-wider', current === i ? 'text-paper' : 'text-paper-3/70')}>{s}</div></div>)}</div>;
}

function StoryBetCard({ bet, onOpen }: { bet: Bet; onOpen: () => void }) {
  const m = BET_META[bet.id];
  const copy = STORY_BET_COPY[bet.id];
  return <button data-testid={`md-bet-${bet.id}`} onClick={onOpen} className="panel panel-hover min-h-[176px] p-5 text-left flex flex-col border-t-2" style={{ borderTopColor: m.color }}>
    <div><div className="eyebrow" style={{ color: m.color }}>{bet.stageLabel ?? `${bet.title} · ${bet.who}`}</div><div className="text-xl font-semibold mt-1">{bet.what}</div></div>
    <div className="grid grid-cols-2 gap-4 mt-auto pt-4">
      <div><div className="eyebrow">Current gate</div><div className="text-sm mt-1">{copy.current}</div></div>
      <div><div className="eyebrow">Next gate</div><div className="text-sm mt-1">{copy.next}</div></div>
    </div>
    <div className="border-t border-line mt-3 pt-2 flex items-center justify-between gap-3"><span className="eyebrow text-sig-amber">Blocker</span><span className="text-xs">{copy.blocker}</span></div>
  </button>;
}

function BetDrawer({ bet, onClose }: { bet: Bet | null; onClose: () => void }) {
  const decs = MD_DECISIONS.filter((d) => bet?.decisionIds.includes(d.id));
  const risks = MD_RISKS.filter((r) => bet?.riskIds.includes(r.id));
  return <SideDrawer open={!!bet} onClose={onClose} title={bet ? `${bet.title} · ${bet.who}` : ''} eyebrow="Programme / roadmap detail" testId="bet-drawer">
    {bet && <div className="space-y-4 stagger">
      <div className="flex items-center gap-2"><SourceButton claimIds={bet.claimIds} title={bet.title} /><Drill to={bet.drill} label={DRILL_LABEL[bet.drill]} /></div>
      <Field label="Outcome sought">{bet.outcome}</Field><Field label="Current gate">{bet.currentGate}</Field><Field label="Next gate">{bet.nextGate}</Field><Field label="Biggest blocker">{bet.blocker}</Field>
      {(bet.funnel || bet.stages) && <Field label="Programme path"><div className="mt-2"><Track states={(bet.funnel || bet.stages)!} current={bet.stage ?? null} /></div></Field>}
      <Field label="Dependencies"><div className="flex flex-wrap gap-1 mt-1">{bet.dependencies.map((x) => <Pill key={x} tone="amber">{x}</Pill>)}</div></Field>
      <Field label="Decisions">{decs.map((d) => <div key={d.id} className="text-xs text-paper-2">→ {d.decision}</div>)}</Field>
      <Field label="Active risks">{risks.map((r) => <div key={r.id} className="text-xs text-paper-2">{r.trend} {r.risk}</div>)}</Field>
    </div>}
  </SideDrawer>;
}

function DecisionDrawer({ decision, onClose }: { decision: Decision | null; onClose: () => void }) {
  const recTone = decision?.recLabel === 'Working hypothesis' ? 'text-amber-300' : decision?.recLabel === 'Decision criteria' ? 'text-violet-300' : 'text-emerald-300';
  return <SideDrawer open={!!decision} onClose={onClose} title={decision?.decision ?? ''} eyebrow="Executive decision" testId="decision-drawer">
    {decision && <div className="space-y-5 stagger"><div className="flex items-center gap-2"><Pill tone={betTone(decision.bet)}>{BET_META[decision.bet].label}</Pill><SourceButton claimIds={decision.claimIds} title={decision.decision} /></div><Field label={decision.recLabel ?? 'Recommended direction'}><span className={recTone}>{decision.rec}</span></Field><Field label="Deadline / gate"><span className="font-mono text-sig-amber">{decision.deadline}</span></Field><Field label="Why now">{decision.why}</Field><Field label="Consequence of delay">{decision.delay}</Field></div>}
  </SideDrawer>;
}

function RiskDrawer({ risk, onClose }: { risk: Risk | null; onClose: () => void }) {
  return <SideDrawer open={!!risk} onClose={onClose} title={risk?.risk ?? ''} eyebrow="Active risk / blocker" testId="risk-drawer">
    {risk && <div className="space-y-5 stagger"><div className="flex items-center gap-2"><span className={cn('font-mono text-xl', trendTone(risk.trend))}>{risk.trend}</span><Pill tone={betTone(risk.bet)}>{BET_META[risk.bet].label}</Pill></div><Field label="Trigger">{risk.trigger}</Field><Field label="Owner">{risk.owner}</Field><Field label="Required decision">{risk.decision}</Field><Drill to={risk.drill} label="Open affected system" /></div>}
  </SideDrawer>;
}

function Story({ setBet, setDecision, setRisk }: { setBet: (b: Bet) => void; setDecision: (d: Decision) => void; setRisk: (r: Risk) => void }) {
  const decisions = ACTIVE_DECISION_IDS.map((id) => MD_DECISIONS.find((d) => d.id === id)!).filter(Boolean);
  const risks = ACTIVE_RISK_IDS.map((id) => MD_RISKS.find((r) => r.id === id)!).filter(Boolean);
  return <div data-testid="md-story" className="flex-1 min-h-0 grid grid-rows-[auto_auto_auto] gap-4">
    <section><div className="eyebrow mb-2">Three bets</div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{MD_BETS.map((b) => <StoryBetCard key={b.id} bet={b} onOpen={() => setBet(b)} />)}</div></section>
    <section data-testid="md-decisions"><div className="flex items-center justify-between mb-2"><span className="eyebrow text-sig-blue">Decisions required</span><span className="font-mono text-[10px] text-paper-3">3 active</span></div><div className="rounded border border-line divide-y divide-line bg-ink-2">{decisions.map((d) => <button key={d.id} data-testid={`decision-${d.id}`} onClick={() => setDecision(d)} className="w-full px-4 py-2.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] items-center gap-3 text-left hover:bg-ink-3 transition-colors"><span className="text-sm font-medium truncate">{d.decision}</span><span className="hidden sm:block text-xs text-emerald-300 max-w-[320px] truncate"><ArrowRight className="h-3 w-3 inline mr-1" />{d.rec}</span><span className="font-mono text-[10px] text-sig-amber whitespace-nowrap">{d.deadline.replace(' gate', '')}</span></button>)}</div></section>
     <section data-testid="md-risks"><div className="flex items-center justify-between mb-2"><span className="eyebrow text-sig-red">Red flags / blockers</span><span className="font-mono text-[10px] text-paper-3">{risks.length} monitored</span></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{risks.map((r) => <button key={r.id} data-testid={`risk-${r.id}`} onClick={() => setRisk(r)} className="panel panel-hover px-4 py-3 flex items-center gap-3 text-left"><span className={cn('font-mono text-lg', trendTone(r.trend))}>{r.trend}</span><span className="flex-1 min-w-0"><span className="text-sm font-medium block truncate">{r.risk}</span><span className="text-[10px] text-paper-3 block truncate">{r.trigger}</span></span><Pill tone={betTone(r.bet)}>{BET_META[r.bet].label}</Pill></button>)}</div></section>
  </div>;
}

function NorthStarStrip() {
  const { go } = useStore();
  return <div><div className="eyebrow mb-2">North Star outcomes</div><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">{NORTH_STAR.map((o) => <button key={o.id} onClick={() => go(7)} className="panel panel-hover px-3 py-3 text-left"><div className="flex items-center justify-between gap-2"><span className="text-sm font-medium">{o.title}</span><Cls c={o.cls} /></div><div className="mt-2"><Track states={o.states} current={o.current} /></div><div className="text-[10px] text-paper-3 mt-2">Next: {o.next}</div></button>)}</div></div>;
}

function Explore() {
  const [att, setAtt] = useState(ATTENTION_BASE);
  const [fwd, setFwd] = useState(false);
  const total = Object.values(att).reduce((a, b) => a + b, 0);
  const { setAccount } = useStore();
  return <div className="space-y-4 animate-rise" data-testid="md-explore">
    <NorthStarStrip />
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="panel p-4 border-dashed border-violet-400/50"><div className="flex items-center justify-between"><span className="eyebrow text-violet-300">Attention allocation</span><Pill tone="amber">Illustrative</Pill></div><div className="mt-3 space-y-2">{(Object.keys(att) as (keyof typeof att)[]).map((k) => <label key={k} className="block text-xs"><div className="flex justify-between"><span className="uppercase font-mono text-[10px] text-paper-2">{k}</span><span className="num text-violet-300">{Math.round((att[k] / total) * 100)}%</span></div><input type="range" min={0} max={60} value={att[k]} onChange={(e) => setAtt({ ...att, [k]: Number(e.target.value) })} className="w-full accent-violet-400" /></label>)}</div></div>
      <div className="panel p-4"><div className="flex items-center justify-between"><span className="eyebrow">Commitment vs capacity</span><Cls c="internal" /></div><div className="mt-3 space-y-2">{CAPACITY.map((c) => <div key={c} className="flex items-center justify-between text-xs"><span>{c}</span><span className="font-mono text-[10px] text-paper-3 italic">Baseline required</span></div>)}</div></div>
      <div className="panel p-4"><div className="eyebrow">Account signals</div><div className="mt-3 space-y-2">{ACCOUNT_GROUPS.map((g) => <div key={g.label} className="flex items-start gap-2 text-xs"><span className="font-mono text-[9px] uppercase tracking-wider text-paper-3 w-28 shrink-0 mt-0.5">{g.label}</span><div className="flex flex-wrap gap-1">{g.ids.length ? g.ids.map((id) => <button key={id} onClick={() => setAccount(id)} className="rounded border border-line px-1.5 py-0.5 text-[11px] hover:border-sig-blue/60">{ACCOUNT_MAP[id].name}</button>) : <span className="text-paper-3 italic">None public</span>}</div></div>)}</div></div>
    </div>
    <div><button data-testid="forward-toggle" onClick={() => setFwd(!fwd)} className="flex items-center gap-2 eyebrow hover:text-paper-2"><ChevronDown className={cn('h-3 w-3 transition-transform', fwd && 'rotate-180')} />30 / 60 / 90 forward view</button>{fwd && <div className="grid grid-cols-3 gap-3 mt-2 animate-rise">{HORIZONS.map((h) => <div key={h.label} className="panel px-3 py-2"><span className="num text-sm text-sig-blue">{h.label}</span><div className="mt-2 flex flex-wrap gap-1">{h.items.map((i) => <Pill key={i}>{i}</Pill>)}</div></div>)}</div>}</div>
    <div className="text-[10px] font-mono text-paper-3 border-t border-line pt-3">Explore view · planning context, baselines and supporting signals</div>
  </div>;
}

export default function MdDashboard() {
  const { mode } = useStore();
  const [bet, setBet] = useState<Bet | null>(null);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [risk, setRisk] = useState<Risk | null>(null);
  useEffect(() => { const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setBet(null); setDecision(null); setRisk(null); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  return <Screen>
    <Headline title="Decide. Unblock. Intervene." sub="Executive attention only: the three bets, active decisions and triggered risks." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposed structure</Pill><SourceButton claimIds={MD_CLAIMS} title="MD Agenda" /></div>} />
    {mode === 'story' ? <Story setBet={setBet} setDecision={setDecision} setRisk={setRisk} /> : <Explore />}
    <BetDrawer bet={bet} onClose={() => setBet(null)} /><DecisionDrawer decision={decision} onClose={() => setDecision(null)} /><RiskDrawer risk={risk} onClose={() => setRisk(null)} />
  </Screen>;
}
