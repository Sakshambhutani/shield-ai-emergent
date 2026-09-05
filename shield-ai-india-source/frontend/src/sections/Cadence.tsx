import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Field, Headline, Pill, Screen } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { CADENCES } from '@/data/ops';

export default function Cadence() {
  const [sel, setSel] = useState('monthly');
  const [more, setMore] = useState(false);
  const c = CADENCES.find((x) => x.id === sel)!;
  const cx = 260, cy = 260;
  return (
    <Screen>
      <Headline title="Five loops. Every one produces decisions." sub="If a cadence produces no decision, remove it." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposal</Pill><SourceButton claimIds={['m-cadence']} title="Cadence" /></div>} />
      <div className="grid lg:grid-cols-5 gap-3 flex-1 min-h-0">
        <div className="lg:col-span-3 panel p-3 flex items-center justify-center min-h-[380px] relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-[10px] font-mono text-paper-3"><span>↑</span><span className="[writing-mode:vertical-rl] rotate-180">EXCEPTIONS ESCALATE</span></div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-[10px] font-mono text-paper-3"><span className="[writing-mode:vertical-rl]">DECISIONS CASCADE</span><span>↓</span></div>
          <svg viewBox="0 0 520 520" className="h-full max-h-[520px] w-auto" data-testid="cadence-loops">
            {[...CADENCES].reverse().map((k) => { const r = 60 + k.ring * 42; const on = k.id === sel; return (
              <g key={k.id} data-testid={`cadence-ring-${k.id}`} onClick={() => setSel(k.id)} className="cursor-pointer">
                <circle cx={cx} cy={cy} r={r} fill={on ? 'rgba(59,130,246,0.12)' : '#12151C'} stroke={on ? '#3B82F6' : '#2E3546'} strokeWidth={on ? 2 : 1.25} className="transition-all duration-300" />
                <text x={cx} y={cy - r + 26} textAnchor="middle" fontSize={11} fill={on ? '#F3EFE6' : '#B8B3A8'} style={{ fontFamily: 'Inter', fontWeight: 500 }}>{k.name}</text>
                <text x={cx} y={cy - r + 40} textAnchor="middle" fontSize={9} fill="#7C7870" style={{ fontFamily: 'IBM Plex Mono' }}>{k.freq.toUpperCase()}</text>
              </g>); })}
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fill="#3B82F6" style={{ fontFamily: 'IBM Plex Mono', letterSpacing: 2 }}>DECISIONS</text>
          </svg>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-3 min-h-0">
          <div className="flex flex-wrap gap-1">{CADENCES.map((k) => <button key={k.id} data-testid={`cadence-tab-${k.id}`} onClick={() => setSel(k.id)} className={cn('rounded border px-2 py-1 text-[11px] transition-colors duration-200', sel === k.id ? 'border-sig-blue/60 bg-ink-3 text-paper' : 'border-line text-paper-3 hover:text-paper-2')}>{k.freq}</button>)}</div>
          <div className="panel p-4 flex-1 overflow-y-auto animate-rise" key={c.id} data-testid="cadence-card">
            <div className="flex items-start justify-between gap-2"><div><div className="eyebrow">{c.freq} · {c.duration}</div><div className="text-lg font-medium mt-0.5">{c.name}</div></div>{c.id === 'monthly' && <Pill tone="blue">= Section 08</Pill>}</div>
            <div className="mt-3 space-y-3">
              <Field label="Purpose">{c.purpose}</Field>
              <Field label="Decisions produced"><ul className="text-xs mt-0.5">{c.decisions.map((d) => <li key={d} className="text-emerald-300">→ {d}</li>)}</ul></Field>
              <button data-testid="cadence-more" onClick={() => setMore(!more)} className="text-[11px] text-paper-3 hover:text-paper-2">{more ? 'Hide' : 'Inputs & attendees'}</button>
              {more && <div className="animate-rise space-y-3">
                <Field label="Inputs"><div className="flex flex-wrap gap-1 mt-1">{c.inputs.map((i) => <Pill key={i}>{i}</Pill>)}</div></Field>
                <Field label="Attendees"><div className="flex flex-wrap gap-1 mt-1">{c.attendees.map((a) => <Pill key={a}>{a}</Pill>)}</div></Field>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
