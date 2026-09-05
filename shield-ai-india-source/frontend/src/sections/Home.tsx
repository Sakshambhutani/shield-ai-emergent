import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Callout, Headline, Screen, Pill } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { BET_META } from '@/data/opportunities';
import { useStore } from '@/store';

const STAGES = [
  { id: 'army', label: 'Army reference', x: 300, y: 40, text: 'The Indian Army selection is the proof point: V-BAT delivered, Hivemind used, JSW producing locally.', claims: ['c-army-select', 'c-jsw'] },
  { id: 'cred', label: 'India credibility', x: 300, y: 130, text: 'A live Indian service customer is the credential every OEM and every second service will ask for.', claims: ['c-army-select', 'c-india-sub'] },
  { id: 'oem', label: 'OEM embedding', x: 120, y: 230, text: 'Hivemind becomes the autonomy layer inside Indian-built aircraft and vessels, the way MHI did in Japan.', claims: ['c-hivemind-agnostic', 'c-army-sdk'] },
  { id: 'navy', label: 'Navy expansion', x: 480, y: 230, text: 'Shipborne ISR is the door; maritime autonomy is the room. The Netherlands Navy shows the pattern.', claims: ['c-nsuas', 'c-rnln'] },
  { id: 'layer', label: 'Common autonomy layer', x: 300, y: 330, text: 'Every integration reuses the same Hivemind stack, so each win lowers the cost of the next.', claims: ['c-hivemind-agnostic', 'c-catalyst'] },
  { id: 'scale', label: 'Future multi-domain scale', x: 300, y: 420, text: 'Air, maritime, weapons and space become extensions of a proven Indian autonomy base, not new bets.', claims: ['c-novi', 'c-cca'] },
];
const LINKS: [string, string][] = [['army', 'cred'], ['cred', 'oem'], ['cred', 'navy'], ['oem', 'layer'], ['navy', 'layer'], ['layer', 'scale']];

const CLAIMS = { beachhead: ['c-army-select'], bets: ['m-3bets'], window: ['m-roadmap'], flywheel: ['c-army-select', 'c-hivemind-agnostic', 'c-army-sdk'] };

function Flywheel() {
  const [active, setActive] = useState<string | null>(null);
  const { openEvidence } = useStore();
  const pos = Object.fromEntries(STAGES.map((s) => [s.id, s]));
  const a = active ? pos[active] : null;
  return (
    <div className="panel p-3 flex flex-col h-full min-h-[320px]">
      <div className="flex items-center justify-between"><span className="eyebrow">Flywheel · click a stage</span><SourceButton claimIds={CLAIMS.flywheel} title="Flywheel" size="xs" /></div>
      <svg viewBox="0 0 600 460" className="w-full flex-1 min-h-0" data-testid="flywheel">
        <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#3B82F6" /></marker></defs>
        {LINKS.map(([f, t]) => { const A = pos[f], B = pos[t]; const on = active === f || active === t; return <line key={f + t} x1={A.x} y1={A.y + 22} x2={B.x} y2={B.y - 22} stroke={on ? '#3B82F6' : '#2E3546'} strokeWidth={on ? 2 : 1.25} markerEnd="url(#arr)" className="transition-all duration-300" />; })}
        {STAGES.map((s, i) => { const on = active === s.id; return (
          <g key={s.id} data-testid={`flywheel-stage-${s.id}`} onClick={() => setActive(on ? null : s.id)} className="cursor-pointer" style={{ animation: `rise 300ms ease-out ${i * 80}ms both` }}>
            <rect x={s.x - 95} y={s.y - 20} width={190} height={40} rx={4} fill={on ? 'rgba(59,130,246,0.15)' : '#181C25'} stroke={on ? '#3B82F6' : '#2E3546'} className="transition-all duration-200" />
            <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize={13} fontWeight={500} fill={on ? '#F3EFE6' : '#B8B3A8'} style={{ fontFamily: 'Inter' }}>{s.label}</text>
          </g>); })}
      </svg>
      <div className={cn('mt-2 text-sm text-paper-2 min-h-[40px] transition-opacity duration-200', a ? 'opacity-100' : 'opacity-0')} data-testid="flywheel-detail">
        {a && <><span className="text-paper">{a.label}.</span> {a.text} <button onClick={() => openEvidence(a.claims, a.label)} className="text-sig-blue text-xs hover:underline ml-1">Sources</button></>}
      </div>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState<string | null>(null);
  const bets = ['scale', 'embed', 'expand'] as const;
  const meta = {
    scale: { who: 'Army', what: 'V-BAT + Hivemind', line: 'Selection → reference → local production → follow-on.', tag: 'Execute now', tone: 'green' as const },
    embed: { who: 'Indian ecosystem', what: 'Hivemind in Indian platforms', line: 'Autonomy layer inside HAL · NewSpace · BEL · GRSE · TASL.', tag: 'Build position', tone: 'blue' as const },
    expand: { who: 'Navy', what: 'V-BAT + ViDAR + Maritime Hivemind', line: 'Enter via shipborne ISR → maritime autonomy.', tag: 'Execute · build', tone: 'blue' as const },
  };
  return (
    <Screen>
      <Headline title="Scale. Embed. Expand." sub="Prove with V-BAT. Embed with Hivemind. Expand across services and domains." />
      <div className="grid lg:grid-cols-5 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-3 flex flex-col justify-center gap-5">
          <div className="grid sm:grid-cols-3 gap-4 stagger">
            {bets.map((b) => { const m = BET_META[b]; const x = meta[b]; const on = open === b; return (
              <button key={b} data-testid={`bet-card-${b}`} onClick={() => setOpen(on ? null : b)} className={cn('panel panel-hover p-5 text-left flex flex-col gap-3 border-t-2 min-h-[190px]', on && 'bg-ink-3')} style={{ borderTopColor: m.color }}>
                <div className="flex items-center justify-between"><span className="num text-4xl font-semibold" style={{ color: m.color }}>{m.n}</span><Pill tone={x.tone}>{x.tag}</Pill></div>
                <div><div className="text-2xl font-semibold tracking-tight">{m.label}</div><div className="text-sm text-paper-2">{x.who}</div></div>
                <div className="text-sm text-sig-blue mt-auto">{x.what}</div>
                {on && <div data-testid={`bet-detail-${b}`} className="text-xs text-paper-2 animate-rise border-t border-line pt-2">{x.line}</div>}
              </button>); })}
          </div>
          <div data-testid="seed-strip" className="flex items-center gap-2 flex-wrap opacity-60">
            <span className="eyebrow mr-1">Seed</span>
            {['CCA / X-BAT', 'Military space', 'Weapons autonomy', '87-MALE layer', 'Aechelon', 'Benchmark'].map((s) => <Pill key={s} tone="grey">{s}</Pill>)}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Callout label="Existing beachhead" value="1" tag="Indian Army" tone="green" claimIds={CLAIMS.beachhead} testId="metric-beachhead" />
            <Callout label="Execution bets" value="3" tone="blue" claimIds={CLAIMS.bets} testId="metric-bets" />
            <Callout label="Focus window" value="18 mo" claimIds={CLAIMS.window} testId="metric-window" />
          </div>
        </div>
        <div className="lg:col-span-2 min-h-[360px]"><Flywheel /></div>
      </div>
    </Screen>
  );
}
