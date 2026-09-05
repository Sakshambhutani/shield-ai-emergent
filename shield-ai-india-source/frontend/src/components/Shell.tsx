import { ChevronLeft, ChevronRight, FileText, Maximize2, Minimize2, SlidersHorizontal } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { SECTIONS } from '@/data/sections';
import { useStore } from '@/store';
import { EvidenceDrawer } from './Evidence';
import { AccountDrawer } from './AccountDrawer';
import { AssumptionCalc } from './AssumptionCalc';

function Nav() {
  const { sectionIndex, go, present } = useStore();
  if (present) return null;
  return (
    <nav data-testid="side-nav" className="hidden md:flex w-52 shrink-0 flex-col border-r border-line bg-ink-1 p-4">
      <div className="mb-6">
        <div className="eyebrow text-sig-blue">Shield AI India</div>
        <div className="text-sm font-medium leading-tight mt-1">18-Month Operating Plan</div>
      </div>
      <div className="flex flex-col gap-0.5">
        {SECTIONS.map((s, i) => (
          <button key={s.id} data-testid={`nav-${s.id}`} onClick={() => go(i)} className={cn('group flex items-start gap-3 rounded px-2 py-1.5 text-left transition-colors duration-200', i === sectionIndex ? 'bg-ink-3 text-paper' : 'text-paper-3 hover:text-paper-2 hover:bg-ink-2')}>
            <span className={cn('num text-[11px] mt-0.5', i === sectionIndex ? 'text-sig-blue' : 'text-paper-3')}>{s.num}</span>
            <span className="min-w-0"><span className="text-sm block">{s.label}</span>{i === sectionIndex && <span className="block text-[10px] text-paper-3 leading-tight mt-0.5">{s.question}</span>}</span>
            {i === sectionIndex && <span className="ml-auto mt-1.5 h-1.5 w-1.5 rounded-full bg-sig-blue shrink-0" />}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-6 text-[10px] font-mono text-paper-3 leading-relaxed">← → navigate · Esc close · P present</div>
    </nav>
  );
}

function TopBar() {
  const { mode, setMode, present, setPresent, sectionIndex, openEvidence, calc, setCalc } = useStore();
  const s = SECTIONS[sectionIndex];
  return (
    <header className="flex items-center justify-between gap-3 px-4 lg:px-6 h-12 border-b border-line bg-ink-1 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className="md:hidden eyebrow text-sig-blue">Shield AI India</span>
        <span className="hidden md:inline text-xs text-paper-3 truncate">{s.num} · {s.label}</span>
      </div>
      <div className="flex items-center gap-2">
        {!present && (
          <div data-testid="mode-toggle" className="flex rounded border border-line overflow-hidden text-xs">
            {(['story', 'explore'] as const).map((m) => (
              <button key={m} data-testid={`mode-${m}`} onClick={() => setMode(m)} className={cn('px-2.5 py-1 capitalize transition-colors duration-200', mode === m ? 'bg-ink-4 text-paper' : 'text-paper-3 hover:text-paper-2')}>{m}</button>
            ))}
          </div>
        )}
        {mode === 'explore' && !present && (
          <button data-testid="assumptions-btn" onClick={() => setCalc(!calc)} className="inline-flex items-center gap-1.5 rounded border border-violet-400/50 border-dashed px-2.5 py-1 text-xs text-violet-300 hover:bg-violet-500/10 transition-colors duration-200"><SlidersHorizontal className="h-3.5 w-3.5" /> Assumptions</button>
        )}
        <button data-testid="sources-btn" onClick={() => openEvidence()} className="inline-flex items-center gap-1.5 rounded border border-line px-2.5 py-1 text-xs text-paper-2 hover:text-paper hover:border-line-2 transition-colors duration-200">
          <FileText className="h-3.5 w-3.5" /> Sources & Assumptions <span className="num text-sig-blue">({s.claimIds.length})</span>
        </button>
        <button data-testid="present-btn" onClick={() => setPresent(!present)} className={cn('inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs transition-colors duration-200', present ? 'bg-sig-blue text-white' : 'border border-line text-paper-2 hover:text-paper')}>
          {present ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />} {present ? 'Exit' : 'Present'}
        </button>
      </div>
    </header>
  );
}

const progressDot = (i: number, current: number): string => {
  if (i === current) return 'w-6 bg-sig-blue';
  if (i < current) return 'w-2 bg-paper-3';
  return 'w-2 bg-line-2';
};

function Footer() {
  const { sectionIndex, go } = useStore();
  return (
    <footer className="flex items-center justify-between gap-3 px-4 lg:px-6 h-12 border-t border-line bg-ink-1 shrink-0">
      <button data-testid="prev-btn" disabled={sectionIndex === 0} onClick={() => go(sectionIndex - 1)} className="inline-flex items-center gap-1 text-xs text-paper-2 hover:text-paper disabled:opacity-30 transition-colors duration-200"><ChevronLeft className="h-4 w-4" /> Previous</button>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex gap-1">{SECTIONS.map((x, i) => <button key={x.id} onClick={() => go(i)} aria-label={x.label} className={cn('h-1 rounded-full transition-all duration-300', progressDot(i, sectionIndex))} />)}</div>
        <span data-testid="section-progress" className="num text-[11px] text-paper-3">{sectionIndex + 1} / {SECTIONS.length}</span>
      </div>
      <button data-testid="next-btn" disabled={sectionIndex === SECTIONS.length - 1} onClick={() => go(sectionIndex + 1)} className="inline-flex items-center gap-1 text-xs text-paper-2 hover:text-paper disabled:opacity-30 transition-colors duration-200">Next <ChevronRight className="h-4 w-4" /></button>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { present } = useStore();
  return (
    <div className="h-full flex bg-ink text-paper">
      <Nav />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <TopBar />
        <main data-testid="main-content" className={cn('flex-1 min-h-0 overflow-y-auto overflow-x-hidden', present ? 'p-6 lg:p-10' : 'p-4 lg:p-6')}>{children}</main>
        <Footer />
      </div>
      <EvidenceDrawer />
      <AccountDrawer />
      <AssumptionCalc />
    </div>
  );
}
