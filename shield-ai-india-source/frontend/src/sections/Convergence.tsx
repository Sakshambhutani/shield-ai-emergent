import { useEffect, useMemo, useRef, useState } from 'react';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Headline, HORIZON_META, Pill, Screen } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { WeightSliders } from '@/components/AssumptionCalc';
import { PrecedentTag } from '@/components/AccountDrawer';
import { OPPORTUNITIES, BET_META } from '@/data/opportunities';
import { useStore, type Weights } from '@/store';

function score(o: (typeof OPPORTUNITIES)[number], w: Weights) {
  const s = o.scores;
  const tot = w.urgency + w.fit + w.access + w.budget + w.leverage || 1;
  const total = (s.urgency * w.urgency + s.fit * w.fit + s.access * w.access + s.budget * w.budget + s.leverage * w.leverage) / tot;
  const yd = w.urgency + w.budget + w.leverage || 1;
  const xd = w.fit + w.access || 1;
  const y = (s.urgency * w.urgency + s.budget * w.budget + s.leverage * w.leverage) / yd;
  const x = (s.fit * w.fit + s.access * w.access) / xd;
  return { total: +(total * 20).toFixed(0), x: +x.toFixed(2), y: +y.toFixed(2) };
}

type Row = (typeof OPPORTUNITIES)[number] & { total: number; x: number; y: number; z: number };
type HorizonKey = keyof typeof HORIZON_META;
const MARGIN = { top: 16, right: 24, bottom: 24, left: 8 };
const DOMAIN: [number, number] = [1, 5.4];
const TICKS = [1, 3, 5];
const TICK_STYLE = { fill: '#7C7870', fontSize: 10, fontFamily: 'IBM Plex Mono' };
const Z_RANGE: [number, number] = [120, 1400];
const HORIZON_KEYS = Object.keys(HORIZON_META) as HorizonKey[];
const xTick = (v: number): string => { if (v <= 1.5) return 'Hard to enter'; if (v >= 5) return 'Easy to enter'; return ''; };
const yTick = (v: number): string => { if (v <= 1.5) return 'Low'; if (v >= 5) return 'High'; return ''; };
const PRIORITIES = [
  { number: '01', type: 'Growth bet', title: 'Deliver Army V-BAT + Hivemind successfully', tone: 'green' as const },
  { number: '02', type: 'Growth bet', title: 'Embed Hivemind across selected Indian platforms', tone: 'blue' as const },
  { number: '03', type: 'Growth bet', title: 'Establish the Navy pathway through V-BAT, ViDAR and maritime autonomy', tone: 'blue' as const },
  { number: '04', type: 'Execution enabler', title: 'Establish India–HQ–JSW governance and industrialisation', tone: 'purple' as const },
  { number: '05', type: 'Execution enabler', title: 'Build mission-ready engineering and programme capacity in India', tone: 'purple' as const },
];

function BubbleTip({ payload }: { payload?: readonly { payload: Row }[] }) {
  const { mode } = useStore();
  const p = payload?.[0]?.payload;
  if (!p) return null;
  return <div className="panel px-3 py-2 text-xs"><div className="font-medium">{p.title}</div><div className="num text-paper-3">{mode === 'explore' && `score ${p.total} · `}{HORIZON_META[p.horizon].label}</div></div>;
}

function Bubble({ cx, cy, size, payload, on, faded }: { cx: number; cy: number; size: number; payload: Row; on: boolean; faded: boolean }) {
  const r = Math.sqrt(size || 300) / 2.2;
  const color = HORIZON_META[payload.horizon].color;
  return (
    <g data-testid={`bubble-${payload.id}`} style={{ cursor: 'pointer', transition: 'opacity 300ms' }} opacity={faded ? 0.35 : 1}>
      <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={on ? 0.45 : 0.22} stroke={color} strokeWidth={on ? 2 : 1} />
      <text x={cx} y={cy - r - 4} textAnchor="middle" fontSize={10} fill={on ? '#F3EFE6' : '#B8B3A8'} style={{ fontFamily: 'Inter' }}>{payload.short}</text>
    </g>
  );
}

function RankList({ rows, sel, onSelect }: { rows: Row[]; sel: string | null; onSelect: (id: string) => void }) {
  const { mode } = useStore();
  const [showAll, setShowAll] = useState(false);
  const listed = mode === 'explore' || showAll ? rows : rows.slice(0, 3);
  return (
    <div className="panel p-3 shrink-0 max-h-[320px] overflow-y-auto" data-testid="force-rank">
       <div className="eyebrow mb-2">Force rank{mode === 'explore' && ' · /100'}</div>
      <ol className="space-y-1">
        {listed.map((r, i) => { const t = i < 3; return (
          <li key={r.id}><button data-testid={`rank-${r.id}`} onClick={() => onSelect(r.id)} className={cn('w-full flex items-center gap-2 rounded px-2 py-1.5 text-left transition-all duration-300', sel === r.id && 'bg-ink-3', !t && 'opacity-55', r.component && 'pl-5')}>
            <span className={cn('num w-5', t ? 'text-sig-blue text-base' : 'text-paper-3 text-[11px]')}>{r.component ? '↳' : i + 1}</span>
            <span className={cn('flex-1 truncate', t ? 'text-base font-medium' : 'text-sm')}>{r.title}</span>
            {r.component && <span className="font-mono text-[9px] uppercase tracking-wider text-paper-3">part of EMBED</span>}
            {t && <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: BET_META[r.bet].color }}>{BET_META[r.bet].label}</span>}
             {mode === 'explore' && <span className="num text-xs w-7 text-right">{r.total}</span>}
          </button></li>); })}
      </ol>
      {mode === 'story' && rows.length > 3 && <button data-testid="rank-show-all" onClick={() => setShowAll(!showAll)} className="mt-2 text-[11px] text-paper-3 hover:text-paper-2">{showAll ? 'Show top 3 only' : `Show ${rows.length - 3} others (faded)`}</button>}
    </div>
  );
}

function OpportunityDetail({ s, onClose }: { s: Row; onClose: () => void }) {
  const { mode } = useStore();
  return (
    <div data-testid="opportunity-detail" className="panel p-4 grid md:grid-cols-6 gap-3 animate-rise shrink-0 relative">
      <button type="button" data-testid="opportunity-detail-close" onClick={onClose} aria-label="Close opportunity detail" className="absolute right-3 top-3 rounded p-1 text-paper-3 hover:bg-ink-3 hover:text-paper-2"><X className="h-4 w-4" /></button>
      <div className="md:col-span-2"><div className="flex items-center gap-2"><div className="text-base font-medium">{s.title}</div><Pill tone={HORIZON_META[s.horizon].tone}>{HORIZON_META[s.horizon].label}</Pill><SourceButton claimIds={s.claimIds} title={s.title} /></div><div className="text-xs text-paper-2 mt-1">{s.note}</div><div className="mt-1"><PrecedentTag id={s.precedentId} /></div></div>
      <Field label="Mission">{s.mission}</Field>
      <Field label="Buyer · prime">{s.buyer}{s.prime && <div className="text-paper-2 text-xs">{s.prime}</div>}</Field>
      <Field label="Programme value"><span className={cn(s.programmeValue.includes('₹') ? 'num text-amber-300' : 'text-paper-3 italic text-xs')}>{s.programmeValue}</span><div><Pill className="mt-1">{s.valueTag}</Pill></div></Field>
       {mode === 'explore' && <Field label="Scores (1–5)"><div className="num text-xs text-paper-2">U{s.scores.urgency} · F{s.scores.fit} · A{s.scores.access} · B{s.scores.budget} · L{s.scores.leverage}</div><div className="num text-lg">{s.total}<span className="text-xs text-paper-3">/100</span></div></Field>}
    </div>
  );
}

function WeightsPanel() {
  const { mode, setCalc } = useStore();
  if (mode === 'explore') return <div className="panel p-3 border-dashed border-violet-400/50" data-testid="weights-panel"><div className="flex items-center justify-between mb-2"><span className="eyebrow text-violet-300">Weights · recalculates instantly</span><button onClick={() => setCalc(true)} className="text-[11px] text-violet-300 hover:underline">Full calculator</button></div><WeightSliders /></div>;
  return null;
}

function PriorityLedger() {
  return <section data-testid="priority-ledger" className="panel p-3 shrink-0">
    <div className="flex items-center justify-between gap-3"><span className="eyebrow text-sig-blue">18-month priorities</span><span className="font-mono text-[10px] text-paper-3">3 growth bets · 2 execution enablers</span></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-2">
      {PRIORITIES.map((p) => <div key={p.number} className="rounded border border-line bg-ink-2 px-2.5 py-2">
        <div className="flex items-center justify-between gap-2"><span className="num text-sm text-paper-3">{p.number}</span><Pill tone={p.tone}>{p.type}</Pill></div>
        <div className="text-xs leading-snug mt-2">{p.title}</div>
      </div>)}
    </div>
  </section>;
}

export default function Convergence() {
  const { weights, mode, present } = useStore();
  const [sel, setSel] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (present) setSel(null); }, [present]);
  useEffect(() => { if (sel) detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [sel]);
  const all = useMemo<Row[]>(() => OPPORTUNITIES.map((o) => ({ ...o, ...score(o, weights), z: o.size * 40 })).sort((a, b) => b.total - a.total), [weights]);
  const rows = useMemo(() => (mode === 'explore' ? all : all.filter((r) => !r.component)), [all, mode]);
  const top = useMemo(() => new Set(rows.slice(0, 3).map((r) => r.id)), [rows]);
  const s = all.find((r) => r.id === sel) ?? null;
  return (
    <Screen>
      <Headline title="Three growth bets. Two execution enablers." titleClassName="lg:text-4xl xl:text-5xl lg:whitespace-nowrap" sub="Large budgets do not automatically equal attractive opportunities; accessibility, architecture and timing matter." />
      <PriorityLedger />
      <div className="grid lg:grid-cols-3 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-2 panel p-3 flex flex-col min-h-[420px]" data-testid="bubble-chart">
          <div className="flex items-center justify-between text-[11px]">
             <span className="eyebrow">Attractiveness ↑ · Accessibility → · bubble size = relative opportunity</span>
            <div className="flex gap-2">{HORIZON_KEYS.map((h) => <span key={h} className="inline-flex items-center gap-1 text-paper-3"><span className="h-2 w-2 rounded-full" style={{ background: HORIZON_META[h].color }} />{HORIZON_META[h].label}</span>)}</div>
          </div>
          <div className="flex-1 min-h-0 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={MARGIN}>
                <CartesianGrid stroke="#232937" strokeDasharray="2 4" />
                <XAxis type="number" dataKey="x" domain={DOMAIN} tick={TICK_STYLE} tickFormatter={xTick} ticks={TICKS} stroke="#2E3546" />
                <YAxis type="number" dataKey="y" domain={DOMAIN} tick={TICK_STYLE} tickFormatter={yTick} ticks={TICKS} stroke="#2E3546" width={40} />
                <ZAxis type="number" dataKey="z" range={Z_RANGE} />
                <Tooltip cursor={false} content={BubbleTip} />
                <Scatter data={rows} onClick={(d: any) => setSel(d?.id ?? d?.payload?.id ?? null)} isAnimationActive shape={(p: any) => <Bubble cx={p.cx} cy={p.cy} size={p.size} payload={p.payload} on={sel === p.payload.id} faded={mode === 'story' && !top.has(p.payload.id)} />} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col gap-3 min-h-0 overflow-y-auto">
          <RankList rows={rows} sel={sel} onSelect={setSel} />
          <WeightsPanel />
        </div>
      </div>
      {s && <div ref={detailRef}><OpportunityDetail s={s} onClose={() => setSel(null)} /></div>}
    </Screen>
  );
}
