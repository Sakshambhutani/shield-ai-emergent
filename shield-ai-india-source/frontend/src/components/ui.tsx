import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SourceButton } from './Evidence';
import { useStore } from '@/store';
import { SECTIONS } from '@/data/sections';

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('h-full flex flex-col gap-3 lg:gap-4 min-h-0', className)}>{children}</div>;
}

export function Headline({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  const { sectionIndex, mode } = useStore();
  const s = SECTIONS[sectionIndex];
  return (
    <div className="flex items-end justify-between gap-6 shrink-0">
      <div className="animate-rise">
        <div className="eyebrow text-sig-blue">{s.num} · {s.label} <span className="text-paper-3 normal-case tracking-normal ml-2">{s.question}</span></div>
        <h1 data-testid="screen-headline" className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mt-1 leading-tight">{title}</h1>
        {sub && mode === 'explore' && <p data-testid="screen-subhead" className="text-sm md:text-base text-paper-2 mt-1.5 max-w-3xl">{sub}</p>}
      </div>
      {right && <div className="shrink-0 hidden md:block">{right}</div>}
    </div>
  );
}

export function Callout({ label, value, tone = 'neutral', claimIds, tag, testId }: { label: string; value?: string; tone?: 'neutral' | 'blue' | 'green' | 'amber' | 'purple' | 'red'; claimIds?: string[]; tag?: string; testId?: string }) {
  const tones = { neutral: 'text-paper', blue: 'text-sig-blue', green: 'text-sig-green', amber: 'text-sig-amber', purple: 'text-sig-purple', red: 'text-sig-red' };
  return (
    <div data-testid={testId ?? 'callout'} className={cn('panel px-3 py-2.5 flex flex-col gap-1 min-w-0', tone === 'purple' && 'border-dashed border-violet-400/50')}>
      <div className="flex items-center justify-between gap-2">
        <span className="eyebrow truncate">{label}</span>
        {claimIds && <SourceButton claimIds={claimIds} title={label} size="xs" />}
      </div>
      {value && <div className={cn('num text-lg lg:text-xl font-semibold leading-tight', tones[tone])}>{value}</div>}
      {tag && <span className="self-start font-mono text-[10px] uppercase tracking-wider text-paper-3 border border-line rounded-sm px-1 py-0.5">{tag}</span>}
    </div>
  );
}

export function Pill({ children, tone = 'neutral', className }: { children: ReactNode; tone?: 'neutral' | 'blue' | 'green' | 'amber' | 'purple' | 'red' | 'grey'; className?: string }) {
  const t = {
    neutral: 'border-line text-paper-2', grey: 'border-line text-paper-3 bg-ink-3',
    blue: 'border-sig-blue/50 text-sig-blue bg-sig-blue/10', green: 'border-emerald-500/50 text-emerald-300 bg-emerald-500/10',
    amber: 'border-amber-500/50 text-amber-300 bg-amber-500/10', purple: 'border-violet-400/50 text-violet-300 bg-violet-500/10 border-dashed', red: 'border-red-500/50 text-red-300 bg-red-500/10',
  }[tone];
  return <span className={cn('inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider whitespace-nowrap', t, className)}>{children}</span>;
}

export const HORIZON_META = {
  execute: { label: 'Execute now', tone: 'green' as const, color: '#34D399' },
  build: { label: 'Build position', tone: 'blue' as const, color: '#3B82F6' },
  seed: { label: 'Monitor / seed', tone: 'grey' as const, color: '#6B7280' },
};

export function SideDrawer({ open, onClose, title, eyebrow, children, testId, width = 'sm:w-[460px]' }: { open: boolean; onClose: () => void; title: string; eyebrow?: string; children: ReactNode; testId: string; width?: string }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} className={cn('fixed inset-0 z-30 bg-black/40 transition-opacity duration-250', open ? 'opacity-100' : 'opacity-0 pointer-events-none')} />
      <aside data-testid={testId} className={cn('fixed right-0 top-0 z-40 h-full w-full bg-ink-1 border-l border-line shadow-2xl transition-transform duration-250 ease-out flex flex-col', width, open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-start justify-between p-4 border-b border-line">
          <div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<div className="text-base font-medium mt-0.5">{title}</div></div>
          <button data-testid={`${testId}-close`} onClick={onClose} className="p-1.5 rounded hover:bg-ink-3 text-paper-2" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </aside>
    </>
  );
}

export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return <div className={className}><div className="eyebrow">{label}</div><div className="text-sm text-paper mt-0.5">{children}</div></div>;
}

export const accessTone = (a: 'High' | 'Medium' | 'Low'): 'green' | 'amber' | 'grey' => ({ High: 'green', Medium: 'amber', Low: 'grey' } as const)[a];
export const chainTone = (label: string): 'blue' | 'amber' | 'green' | 'neutral' => {
  if (label === 'Decision authority') return 'blue';
  if (label === 'Budget authority') return 'amber';
  if (label === 'High influence') return 'green';
  return 'neutral';
};

export function NotDisclosed({ label = 'Not publicly disclosed' }: { label?: string }) {
  return <span data-testid="not-disclosed" className="font-mono text-[11px] text-paper-3 italic">{label}</span>;
}
