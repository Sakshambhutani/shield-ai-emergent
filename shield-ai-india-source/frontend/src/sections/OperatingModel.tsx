import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Headline, Pill, Screen } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { ACTORS, RIGHTS, type Right } from '@/data/ops';

const COLS: { key: 'india' | 'hq' | 'jsw' | 'prime'; label: string }[] = [{ key: 'india', label: 'India' }, { key: 'hq', label: 'HQ' }, { key: 'jsw', label: 'JSW' }, { key: 'prime', label: 'Indian Prime' }];
const R: Record<Right, string> = { D: 'bg-sig-blue/20 text-sig-blue border-sig-blue/50', O: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40', C: 'bg-ink-3 text-paper-2 border-line', '': 'text-paper-3/40 border-transparent' };

const ACTOR_POS: Record<string, { x: number; y: number; label: string; color: string }> = {
  hq: { x: 300, y: 48, label: 'Shield AI HQ', color: '#B8B3A8' },
  india: { x: 300, y: 190, label: 'Shield AI India', color: '#3B82F6' },
  jsw: { x: 100, y: 320, label: 'JSW Defence', color: '#34D399' },
  prime: { x: 500, y: 320, label: 'Indian OEM / Prime', color: '#F59E0B' },
  customer: { x: 300, y: 430, label: 'Indian customer', color: '#F3EFE6' },
};
const EDGES: { a: string; b: string; label: string }[] = [
  { a: 'hq', b: 'india', label: 'Product · IP · export' },
  { a: 'india', b: 'jsw', label: 'Industrialisation' },
  { a: 'india', b: 'prime', label: 'Hivemind integration' },
  { a: 'india', b: 'customer', label: 'Accountable' },
  { a: 'jsw', b: 'customer', label: 'Production' },
  { a: 'prime', b: 'customer', label: 'Platform delivery' },
];

const OPMODEL_CLAIMS = ['m-opmodel', 'c-india-sub', 'c-jsw'];
type ColKey = 'india' | 'hq' | 'jsw' | 'prime';
const linked = (actor: string, id: string): boolean => EDGES.some((e) => (e.a === actor && e.b === id) || (e.b === actor && e.a === id));

function AccountabilityMap({ actor, onPick }: { actor: string | null; onPick: (id: string | null) => void }) {
  return (
    <svg viewBox="0 0 600 480" className="w-full flex-1 min-h-0" data-testid="opmodel-map">
      {EDGES.map((e) => { const A = ACTOR_POS[e.a], B = ACTOR_POS[e.b]; const on = !actor || actor === e.a || actor === e.b; const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2; return (
        <g key={e.a + e.b} opacity={on ? 1 : 0.2} className="transition-opacity duration-300">
          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={on && actor ? '#3B82F6' : '#2E3546'} strokeWidth={1.5} />
          <rect x={mx - 58} y={my - 9} width={116} height={18} rx={3} fill="#0F1216" />
          <text x={mx} y={my + 4} textAnchor="middle" fontSize={10} fill="#7C7870" style={{ fontFamily: 'IBM Plex Mono' }}>{e.label}</text>
        </g>); })}
      {Object.entries(ACTOR_POS).map(([id, p]) => { const on = actor === id; const isC = id === 'customer'; const dim = !!actor && !on && !linked(actor, id); return (
        <g key={id} data-testid={`actor-${id}`} onClick={() => !isC && onPick(on ? null : id)} className={isC ? '' : 'cursor-pointer'} opacity={dim ? 0.3 : 1} style={{ transition: 'opacity 300ms' }}>
          <rect x={p.x - 90} y={p.y - 22} width={180} height={44} rx={isC ? 22 : 4} fill={on ? 'rgba(59,130,246,0.15)' : '#181C25'} stroke={on ? '#3B82F6' : p.color} strokeWidth={on ? 2 : 1.25} strokeDasharray={isC ? '3 3' : undefined} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={13} fontWeight={600} fill="#F3EFE6" style={{ fontFamily: 'Inter' }}>{p.label}</text>
        </g>); })}
    </svg>
  );
}

function RightsMatrix({ colKey, row, onRow }: { colKey: ColKey | null; row: number | null; onRow: (i: number) => void }) {
  const fade = (k: ColKey): string => (colKey && colKey !== k ? 'opacity-25' : '');
  return (
    <div className="panel overflow-auto flex-1" data-testid="rights-matrix">
      <table className="w-full text-sm">
        <thead><tr className="text-left"><th className="px-3 py-2 eyebrow font-normal">Decision rights</th>{COLS.map((c) => <th key={c.key} className={cn('px-1 py-2 eyebrow font-normal text-center transition-opacity duration-300', fade(c.key))}>{c.label}</th>)}</tr></thead>
        <tbody>
          {RIGHTS.map((r, i) => (
            <tr key={r.row} data-testid={`rights-row-${i}`} onClick={() => onRow(i)} className={cn('cursor-pointer border-t border-line transition-colors duration-200 hover:bg-ink-3', row === i && 'bg-ink-3')}>
              <td className="px-3 py-1.5 text-xs text-paper">{r.row}</td>
              {COLS.map((c) => <td key={c.key} className={cn('px-1 py-1.5 text-center transition-opacity duration-300', fade(c.key))}><span className={cn('inline-flex h-6 w-6 items-center justify-center rounded border num text-xs font-semibold', R[r[c.key]])}>{r[c.key] || '·'}</span></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function OperatingModel() {
  const [row, setRow] = useState<number | null>(null);
  const [actor, setActor] = useState<string | null>(null);
  const a = ACTORS.find((x) => x.id === actor);
  return (
    <Screen>
      <Headline title="Locally accountable, globally coherent" sub="India should be locally accountable without recreating HQ." right={<div className="flex items-center gap-2"><Pill tone="purple">Proposal</Pill><SourceButton claimIds={OPMODEL_CLAIMS} title="Operating model" /></div>} />
      <div className="grid lg:grid-cols-5 gap-4 flex-1 min-h-0">
        <div className="lg:col-span-3 panel p-3 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between"><span className="eyebrow">Accountability map · click an actor</span>{a && <button data-testid="actor-clear" onClick={() => setActor(null)} className="text-[11px] text-paper-3 hover:text-paper">clear</button>}</div>
          <AccountabilityMap actor={actor} onPick={setActor} />
          {a && <div data-testid="actor-detail" className="animate-rise border-t border-line pt-2 flex flex-wrap gap-1.5 items-center"><span className="eyebrow mr-1">Owns</span>{a.owns.map((o) => <Pill key={o} tone={o.includes('not publicly') ? 'grey' : 'neutral'}>{o}</Pill>)}<SourceButton claimIds={a.claimIds} title={a.name} size="xs" /></div>}
        </div>
        <div className="lg:col-span-2 flex flex-col gap-3 min-h-0">
          <RightsMatrix colKey={actor as ColKey | null} row={row} onRow={(i) => setRow(i === row ? null : i)} />
          <div className="panel p-3 text-xs flex flex-wrap gap-3 items-center" data-testid="rights-rationale">
            <span><span className="num font-semibold text-sig-blue">D</span> Decides</span><span><span className="num font-semibold text-emerald-300">O</span> Owns</span><span><span className="num font-semibold text-paper-2">C</span> Consulted</span>
            {row !== null && <span className="w-full text-paper-2 animate-rise border-t border-line pt-2"><span className="text-paper">{RIGHTS[row].row}:</span> {RIGHTS[row].rationale}</span>}
          </div>
        </div>
      </div>
    </Screen>
  );
}
