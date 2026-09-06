import { ExternalLink, FileText, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { CLAIM_MAP } from '@/data/claims';
import { SOURCE_MAP } from '@/data/sources';
import { SECTIONS } from '@/data/sections';
import type { EvidenceClass, Claim } from '@/data/types';
import { useStore } from '@/store';

export const CLS_META: Record<EvidenceClass, { label: string; badge: string; border: string; dot: string }> = {
  official: { label: 'Official', badge: 'bg-ink-3 text-paper-2 border-line-2', border: 'ev-official', dot: 'bg-paper-3' },
  company: { label: 'Official company', badge: 'bg-ink-3 text-paper-2 border-line-2', border: 'border border-line-2', dot: 'bg-paper-3' },
  shield: { label: 'Shield AI ✓', badge: 'bg-ink-3 text-paper-2 border-line-2', border: 'ev-shield', dot: 'bg-paper-3' },
  industry: { label: 'Industry', badge: 'bg-ink-3 text-paper-2 border-line-2', border: 'ev-industry', dot: 'bg-paper-3' },
  modelled: { label: 'Management hypothesis', badge: 'bg-ink-3 text-paper-2 border-line-2 border-dashed', border: 'ev-modelled', dot: 'bg-paper-3' },
};

export function EvidenceBadge({ cls, className }: { cls: EvidenceClass; className?: string }) {
  const m = CLS_META[cls];
  return <span data-testid={`evidence-badge-${cls}`} className={cn('inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider', m.badge, className)}>{m.label}</span>;
}

export function SourceButton({ claimIds, title, className, size = 'sm' }: { claimIds: string[]; title?: string; className?: string; size?: 'sm' | 'xs' }) {
  const { openEvidence } = useStore();
  return (
    <button
      type="button"
      data-testid={`source-btn-${(title ?? claimIds[0] ?? 'x').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`}
      title="Show sources & assumptions"
      onClick={(e) => { e.stopPropagation(); openEvidence(claimIds, title); }}
      className={cn('inline-flex items-center gap-1 rounded-sm text-paper-3 hover:text-sig-blue transition-colors duration-200', size === 'xs' ? 'text-xs' : 'text-xs', className)}
    >
      <FileText className={size === 'xs' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {size === 'sm' && <span className="font-mono">{claimIds.length}</span>}
    </button>
  );
}

const CONF_TONE: Record<Claim['confidence'], string> = { High: 'text-emerald-300', Medium: 'text-amber-300', Low: 'text-paper-3' };

function Entry({ c }: { c: Claim }) {
  const m = CLS_META[c.cls];
  return (
    <div data-testid={`evidence-entry-${c.id}`} className={cn('rounded-md p-3 bg-ink-2 animate-rise', m.border)}>
      <div className="flex items-start justify-between gap-2">
        <EvidenceBadge cls={c.cls} />
        <span className={cn('font-mono text-xs uppercase tracking-wider', c.cls === 'modelled' ? 'text-paper-2' : CONF_TONE[c.confidence])}>{c.cls === 'modelled' ? 'To validate' : `${c.confidence} confidence`}</span>
      </div>
      <div className="mt-2">
        <div className="eyebrow">Claim</div>
        <div className="text-sm text-paper mt-0.5">{c.label}</div>
        {c.value && <div className={cn('num text-lg mt-1', c.cls === 'modelled' ? 'text-paper-2' : 'text-paper')}>{c.value} {c.horizon && <span className="ml-2 font-mono text-xs uppercase tracking-wider text-paper-3 border border-line rounded-sm px-1 py-0.5">{c.horizon}</span>}</div>}
        {!c.value && c.horizon && <div className="mt-1"><span className="font-mono text-xs uppercase tracking-wider text-paper-3 border border-line rounded-sm px-1 py-0.5">{c.horizon}</span></div>}
      </div>
      <div className="mt-2 text-xs text-paper-2">{c.interpretation}</div>
      {c.assumption && <div className="mt-2 text-xs"><span className="eyebrow text-paper-2">Assumption</span><div className="text-paper-2 mt-0.5">{c.assumption}</div></div>}
      {c.formula && <div className="mt-2 text-xs"><span className="eyebrow text-paper-2">Formula</span><div className="num text-paper-2 mt-0.5 text-xs leading-relaxed">{c.formula}</div></div>}
      {c.sourceIds.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-line pt-2">
          <div className="eyebrow">Source{c.sourceIds.length > 1 ? 's' : ''}</div>
          {c.sourceIds.map((sid) => { const s = SOURCE_MAP[sid]; return s ? (
            <div key={sid} className="flex items-start justify-between gap-2 text-xs">
              <div className="min-w-0">
                <div className="text-paper leading-snug">{s.title}</div>
                <div className="text-paper-3 font-mono text-xs mt-0.5">{s.publisher} · {s.date}</div>
              </div>
              <a data-testid={`source-link-${sid}`} href={s.url} target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-1 text-sig-blue hover:underline whitespace-nowrap">Open source <ExternalLink className="h-3 w-3" /></a>
            </div>) : null; })}
        </div>
      )}
      {c.sourceIds.length === 0 && <div className="mt-2 text-xs text-paper-3 font-mono">Analyst model — no external source; see assumption.</div>}
    </div>
  );
}

export function EvidenceDrawer() {
  const { evidence, closeEvidence, sectionIndex, present } = useStore();
  const section = SECTIONS[sectionIndex];
  const ids = evidence.claimIds ?? section.claimIds;
  const claims = ids.map((id) => CLAIM_MAP[id]).filter(Boolean);
  const counts = claims.reduce<Record<string, number>>((a, c) => ((a[c.cls] = (a[c.cls] ?? 0) + 1), a), {});
  return (
    <>
      <div onClick={closeEvidence} className={cn('fixed inset-0 z-[65] bg-black/40 transition-opacity duration-250', evidence.open && !present ? 'opacity-100' : 'opacity-0 pointer-events-none')} />
      <aside data-testid="evidence-drawer" aria-hidden={!evidence.open || present} className={cn('fixed right-0 top-0 z-[70] h-full w-full sm:w-[440px] bg-ink-1 border-l border-line shadow-2xl transition-transform duration-250 ease-out flex flex-col', evidence.open && !present ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-start justify-between p-4 border-b border-line">
          <div>
            <div className="eyebrow">Sources & Assumptions</div>
            <div className="text-base font-medium mt-0.5">{evidence.title || `${section.num} · ${section.label}`}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">{(Object.keys(counts) as EvidenceClass[]).map((k) => <span key={k} className="inline-flex items-center gap-1 text-xs font-mono text-paper-3"><span className={cn('h-1.5 w-1.5 rounded-full', CLS_META[k].dot)} />{counts[k]} {CLS_META[k].label}</span>)}</div>
          </div>
          <button data-testid="evidence-drawer-close" onClick={closeEvidence} className="p-1.5 rounded hover:bg-ink-3 text-paper-2" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {claims.map((c) => <Entry key={c.id} c={c} />)}
          {claims.length === 0 && <div className="text-sm text-paper-3">No evidence attached.</div>}
        </div>
        <div className="p-3 border-t border-line text-xs font-mono text-paper-3">Official ≠ management hypothesis. Hypotheses are scenario planning, not company guidance.</div>
      </aside>
    </>
  );
}
