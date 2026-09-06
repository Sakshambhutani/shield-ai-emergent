import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ExploreNote, Field, Headline, Pill, Screen } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { useStore } from '@/store';
import { BLOCKS, LANES, MILESTONES, type Milestone } from '@/data/roadmap';

const ROADMAP_CLAIMS = ['m-roadmap', 'm-integrations', 'c-catalyst'];
const LANE_KEYS = Object.keys(LANES) as (keyof typeof LANES)[];
const CELL: Record<string, Milestone[]> = {};
MILESTONES.forEach((m) => { (CELL[`${m.lane}${m.block}`] ||= []).push(m); });
const STORY_ROWS = [
  { id: 'scale', label: 'SCALE Army', color: LANES.scale.color, values: ['Programme, acceptance & support model locked', 'Operational proof + local production readiness', 'Operational reference + follow-on/Hivemind expansion shaped', 'Follow-on + sustainment pathway'] },
  { id: 'embed', label: 'EMBED Hivemind', color: LANES.embed.color, values: ['Select first 2 platform integrations', 'First Indian-platform SIL/HIL demo', 'First autonomous flight/sail', '3–4 meaningful integrations + programme pathway'] },
  { id: 'expand', label: 'EXPAND Navy', color: LANES.expand.color, values: ['Priority Navy mission + entry path agreed', 'Demo pathway + partner agreed', 'Shipborne trial / maritime demo', 'Second-service reference position'] },
] as const;

function StoryRoadmap({ focusedLane }: { focusedLane: string | null }) {
  return <div data-testid="roadmap-story" className="flex-1 min-h-0 overflow-x-auto">
    <div className="grid min-w-[1000px] h-full" style={{ gridTemplateColumns: '190px repeat(4, minmax(180px, 1fr))' }}>
      <div className="border-b border-line" />
      {BLOCKS.map((block) => <div key={block.name} className="border-b border-line px-4 py-3 text-sm font-semibold">{block.label.replace(' months', '')} {block.name}</div>)}
      {STORY_ROWS.flatMap((row) => [
        <div key={`${row.id}-label`} aria-current={focusedLane === row.id ? 'true' : undefined} className={cn('border-b border-line px-4 py-5 text-sm font-semibold', focusedLane === row.id && 'bg-sig-blue/10')} style={{ color: row.color }}>{row.label}</div>,
        ...row.values.map((value, index) => <div key={`${row.id}-${index}`} className={cn('border-b border-l border-line px-4 py-5 text-sm leading-relaxed', focusedLane === row.id && 'bg-sig-blue/[.06]')}>{value}</div>),
      ])}
    </div>
  </div>;
}

export default function Roadmap() {
  const [params] = useSearchParams();
  const focusedLane = params.get('lane');
  const [sel, setSel] = useState<string | null>(null);
  const { mode, present } = useStore();
  useEffect(() => { if (present) setSel(null); }, [present]);
  const m = MILESTONES.find((x) => x.id === sel) ?? null;
  const lanes = LANE_KEYS;
  return (
    <Screen>
       <Headline title="Establish → Prove → Expand → Scale" sub="Uncertain items are gates, not dates." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposed plan</Pill><SourceButton claimIds={ROADMAP_CLAIMS} title="Roadmap" /></div>} />
      {mode === 'story' ? <StoryRoadmap focusedLane={focusedLane} /> : <>
       <ExploreNote>Select a milestone to inspect owner, dependency, decision, completion evidence and risk.</ExploreNote>
       <div className="overflow-x-auto shrink-0">
        <div className="grid min-w-[880px]" style={{ gridTemplateColumns: '150px repeat(4, minmax(0, 1fr))' }} data-testid="roadmap-grid">
          <div />
          {BLOCKS.map((b, i) => <div key={b.name} className="px-2 pb-2 border-b border-line"><div className="eyebrow">{b.label}</div><div className="text-sm font-medium"><span className="num text-paper-3 mr-1">{i + 1}</span>{b.name}</div></div>)}
          {lanes.map((l) => {
            const seed = l === 'seed';
            return [
              <div data-testid={`roadmap-lane-${l}`} aria-current={focusedLane === l ? 'true' : undefined} key={l + '-h'} className={cn('py-3 pr-3 border-b border-line flex items-start', seed && 'opacity-60', focusedLane === l && 'bg-sig-blue/10')}><div><div className="text-[11px] font-mono uppercase tracking-wider" style={{ color: LANES[l].color }}>{LANES[l].label}</div>{seed && <div className="text-[10px] text-paper-3 mt-0.5">Minimal activity</div>}</div></div>,
              ...BLOCKS.map((_, bi) => (
                <div key={l + bi} className={cn('border-b border-l border-line p-2 flex flex-col gap-1.5 relative', seed ? 'py-2' : 'min-h-[88px]', focusedLane === l && 'bg-sig-blue/10')}>
                  {!seed && <div className="absolute left-0 top-0 h-full w-px" style={{ background: LANES[l].color, opacity: 0.35 }} />}
                  {seed && <div className="absolute left-2 right-2 top-1/2 h-px" style={{ background: LANES[l].color, opacity: 0.5 }} />}
                  {(CELL[`${l}${bi}`] ?? []).map((x, i) => (
                    <button key={x.id} data-testid={`milestone-${x.id}`} onClick={() => setSel(x.id === sel ? null : x.id)} style={{ animationDelay: `${bi * 80 + i * 40}ms` }} className={cn('animate-rise text-left rounded border px-2 py-1.5 text-xs transition-colors duration-200 relative z-10', seed ? 'bg-ink-2 border-line text-paper-3 py-1' : 'bg-ink-2 border-line hover:border-line-2 text-paper', sel === x.id && 'border-sig-blue/70 bg-ink-3')}>
                      <span className="flex items-center gap-1.5">{x.gate && <Flag className="h-3 w-3 text-sig-amber shrink-0" />}<span className="leading-snug">{x.title}</span></span>
                    </button>
                  ))}
                </div>
              )),
            ];
          })}
        </div>
       </div>
       <div className="flex items-center gap-3 text-[11px] text-paper-3"><Flag className="h-3 w-3 text-sig-amber" /> Gate · external timing</div>
       {m && (
         <div data-testid="milestone-detail" className="panel p-4 grid md:grid-cols-6 gap-3 animate-rise shrink-0">
           <div className="md:col-span-2"><div className="text-base font-medium flex items-center gap-2">{m.gate && <Flag className="h-4 w-4 text-sig-amber" />}{m.title}</div><div className="text-xs text-paper-2 mt-1">{m.outcome}</div></div>
           <Field label="Owner">{m.owner}</Field>
           <Field label="Dependency">{m.dependency}</Field>
           <Field label="Decision required">{m.decision}</Field>
           <div><Field label="Evidence of completion">{m.evidence}</Field><div className="mt-2"><span className="eyebrow text-sig-red">Risk</span><div className="text-sm">{m.risk}</div></div></div>
         </div>
       )}
      </>}
    </Screen>
  );
}
