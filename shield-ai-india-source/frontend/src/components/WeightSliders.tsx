import { useMemo } from 'react';
import { BASE_WEIGHTS, useStore, type Weights } from '@/store';

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

