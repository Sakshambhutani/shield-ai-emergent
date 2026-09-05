import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Field, Headline, NotDisclosed, Pill, Screen } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { KPIS, KPI_DIMS } from '@/data/ops';

const STATUS = {
  verified: { label: 'Externally verified', tone: 'green' as const },
  proposed: { label: 'Proposed internal target', tone: 'purple' as const },
  placeholder: { label: 'Illustrative placeholder', tone: 'amber' as const },
};

const OUTCOMES: Record<string, string> = {
  'Customer / programme': 'Army reference delivered',
  'Hivemind embedding': '3–4 Indian integrations',
  'Service expansion': 'Navy as second service',
  'Industrialisation': 'V-BAT made in India',
  'Organisational health': 'Capacity matches commitments',
};

const KPI_BY_DIM: Record<string, typeof KPIS> = Object.fromEntries(KPI_DIMS.map((d) => [d, KPIS.filter((x) => x.dim === d)]));
const STATUS_DOT = { green: 'bg-emerald-400', purple: 'bg-violet-400', amber: 'bg-amber-400' } as const;

const KPI_CLAIMS = ['m-kpis', 'm-integrations'];

export default function Kpis() {
  const [open, setOpen] = useState<string | null>(null);
  const k = KPIS.find((x) => x.id === open) ?? null;
  return (
    <Screen>
      <Headline title="Outcomes, not activity" sub="North Star → five outcomes → eight driver KPIs, all derived from the three bets." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposed KPI set</Pill><SourceButton claimIds={KPI_CLAIMS} title="KPIs" /></div>} />
      <div className="flex-1 min-h-0 flex flex-col items-stretch" data-testid="kpi-tree">
        <div className="flex justify-center"><div data-testid="north-star" className="panel px-8 py-4 border-sig-blue/60 text-center"><div className="eyebrow text-sig-blue">North Star · 18 months</div><div className="text-xl lg:text-2xl font-semibold tracking-tight mt-1">Three bets advancing</div><div className="text-xs text-paper-3 mt-0.5 num">reference · integrations · second service</div></div></div>
        <div className="flex justify-center"><div className="w-px h-6 bg-line-2" /></div>
        <div className="relative mx-[10%] h-px bg-line-2" />
        <div className="grid grid-cols-5 gap-4 flex-1 min-h-0">
          {KPI_DIMS.map((dim, i) => (
            <div key={dim} className="flex flex-col items-stretch" style={{ animation: `rise 300ms ease-out ${i * 70}ms both` }}>
              <div className="flex justify-center"><div className="w-px h-5 bg-line-2" /></div>
              <div data-testid={`outcome-${i}`} className="panel px-3 py-3 text-center"><div className="eyebrow">{dim}</div><div className="text-sm font-medium leading-snug mt-1">{OUTCOMES[dim]}</div></div>
              <div className="flex justify-center"><div className="w-px h-5 bg-line-2" /></div>
              <div className="flex flex-col gap-2">
                {KPI_BY_DIM[dim].map((x) => { const st = STATUS[x.status]; const on = open === x.id; return (
                  <button key={x.id} data-testid={`kpi-${x.id}`} onClick={() => setOpen(on ? null : x.id)} className={cn('panel panel-hover px-3 py-2 text-left flex flex-col gap-1.5', on && 'border-sig-blue/60 bg-ink-3')}>
                    <div className="text-xs leading-snug">{x.name}</div>
                    <div className="flex items-center justify-between gap-2"><span className="num text-xs text-sig-blue truncate">{x.target}</span><span className={cn('h-2 w-2 rounded-full shrink-0', STATUS_DOT[st.tone])} title={st.label} /></div>
                  </button>); })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-[10px] font-mono text-paper-3 shrink-0"><span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />Externally verified</span><span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet-400" />Proposed internal target</span><span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />Illustrative placeholder</span><span className="ml-auto">Current values: <span className="italic">Not publicly disclosed</span></span></div>
      {k && (
        <div data-testid="kpi-detail" className="panel p-4 grid md:grid-cols-5 gap-3 animate-rise shrink-0">
          <div className="md:col-span-2"><div className="flex items-center gap-2 flex-wrap"><div className="text-base font-medium">{k.name}</div><Pill tone={STATUS[k.status].tone}>{STATUS[k.status].label}</Pill><SourceButton claimIds={k.claimIds} title={k.name} /></div><div className="text-xs text-paper-2 mt-1">{k.detail}</div></div>
          <Field label="Current">{k.current.startsWith('Not') ? <NotDisclosed /> : k.current}</Field>
          <Field label="Target"><span className="num text-sig-blue">{k.target}</span></Field>
          <Field label="Owner · RAG">{k.owner}<div><NotDisclosed label="RAG not publicly disclosed" /></div></Field>
        </div>
      )}
    </Screen>
  );
}
