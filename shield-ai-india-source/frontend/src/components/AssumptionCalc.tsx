import { useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { BASE_WEIGHTS, useStore, type Assumptions, type Weights } from '@/store';
import { SideDrawer } from './ui';
import { EvidenceBadge } from './Evidence';

function Slider({ label, value, min, max, step = 1, unit, onChange, testId }: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (v: number) => void; testId: string }) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs"><span className="text-paper-2">{label}</span><span className="num text-violet-300">{value}{unit}</span></div>
      <input data-testid={testId} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-violet-400 mt-1" />
    </label>
  );
}

export const WEIGHT_LABELS: Record<keyof Weights, string> = { urgency: 'Customer urgency / timing', fit: 'Shield product fit', access: 'Access / architectural openness', budget: 'Budget / programme certainty', leverage: 'Long-term strategic leverage' };
const WEIGHT_KEYS = Object.keys(BASE_WEIGHTS) as (keyof Weights)[];

export function WeightSliders() {
  const { weights, setWeights } = useStore();
  const total = useMemo(() => Object.values(weights).reduce((a, b) => a + b, 0), [weights]);
  return (
    <div className="space-y-2.5">
      {WEIGHT_KEYS.map((k) => (
        <Slider key={k} label={WEIGHT_LABELS[k]} value={weights[k]} min={0} max={50} unit="" onChange={(v) => setWeights({ ...weights, [k]: v })} testId={`weight-${k}`} />
      ))}
      <div className="text-xs font-mono text-paper-3">Total weight {total} · normalised in scoring</div>
    </div>
  );
}

export function AssumptionCalc() {
  const { calc, setCalc, assumptions, setAssumptions, reset } = useStore();
  const set = (k: keyof Assumptions) => (v: number) => setAssumptions({ ...assumptions, [k]: v });
  return (
    <SideDrawer open={calc} onClose={() => setCalc(false)} title="Assumption calculator" eyebrow="Scenario planning" testId="assumption-drawer" width="sm:w-[400px]">
      <div className="space-y-5">
        <div className="flex items-center justify-between"><EvidenceBadge cls="modelled" /><span className="font-mono text-xs text-paper-3">Scenario planning, not company guidance.</span></div>
        <div className="space-y-3">
          <div className="eyebrow text-violet-300">Opportunity sizing</div>
          <Slider label="Tactical-UAS autonomy attach" value={assumptions.attach} min={1} max={15} unit="%" onChange={set('attach')} testId="assume-attach" />
          <Slider label="Programme accessibility / capture" value={assumptions.capture} min={5} max={60} step={5} unit="%" onChange={set('capture')} testId="assume-capture" />
          <Slider label="OEM integration → programme probability" value={assumptions.oemProb} min={10} max={90} step={5} unit="%" onChange={set('oemProb')} testId="assume-oem" />
          <Slider label="Maritime penetration (integrations in 18m)" value={assumptions.maritime} min={0} max={3} unit="" onChange={set('maritime')} testId="assume-maritime" />
        </div>
        <div className="space-y-3">
          <div className="eyebrow text-violet-300">Convergence weights</div>
          <WeightSliders />
        </div>
        <button data-testid="reset-base-case" onClick={reset} className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs text-paper-2 hover:text-paper hover:border-line-2 transition-colors duration-200"><RotateCcw className="h-3.5 w-3.5" /> Reset to Base Case</button>
      </div>
    </SideDrawer>
  );
}

export const fmtCr = (v: number) => (v >= 1000 ? `₹${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k Cr` : `₹${Math.round(v)} Cr`);
export const modelledLayer = (programmeCr: number, a: Assumptions) => programmeCr * (a.attach / 100) * (a.capture / 100);
