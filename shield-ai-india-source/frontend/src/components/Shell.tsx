import { ChevronLeft, ChevronRight, FileText, Maximize2, Minimize2 } from 'lucide-react';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { SECTIONS } from '@/data/sections';
import { useStore } from '@/store';
import { EvidenceDrawer } from './Evidence';
import { AccountDrawer } from './AccountDrawer';

function Nav() {
  const { sectionIndex, go, present } = useStore();
  if (present) return null;
  return (
    <nav aria-label="Main navigation" data-testid="side-nav" className="relative z-[60] hidden md:flex w-60 shrink-0 flex-col border-r border-line bg-ink-1 p-4 overflow-y-auto">
      <div className="mb-6">
        <div className="eyebrow text-sig-blue">Shield AI India</div>
         <div className="text-sm font-medium leading-tight mt-1">India Strategy &amp; Operating System</div>
      </div>
      <div className="flex flex-col gap-0.5">
        {SECTIONS.map((s, i) => (
          <button key={s.id} data-testid={`nav-${s.id}`} onClick={() => go(i)} aria-current={i === sectionIndex ? 'page' : undefined} className={cn('group flex min-h-[56px] items-center gap-3 rounded px-3 py-2 text-left transition-colors duration-200', i === sectionIndex ? 'bg-ink-3 text-paper' : 'text-paper-3 hover:text-paper-2 hover:bg-ink-2')}>
            <span className={cn('num w-5 shrink-0 text-xs', i === sectionIndex ? 'text-sig-blue' : 'text-paper-3')}>{s.num}</span>
            <span className="min-w-0 flex-1 text-sm font-medium leading-5">{s.label}</span>
            {i === sectionIndex && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sig-blue shrink-0" />}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-6 text-xs font-mono text-paper-3 leading-relaxed">← → navigate · Esc close · P present</div>
    </nav>
  );
}

function ViewControls() {
  const { present, setPresent, openEvidence, sectionIndex } = useStore();
  const buttonClass = 'inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-paper-2 hover:text-paper hover:bg-ink-3';
  return <div className="flex items-center gap-1">
    {!present && SECTIONS[sectionIndex].id !== 'opmodel' && <>
      <button aria-label="Sources" title="Sources" data-testid="sources-btn" onClick={() => openEvidence()} className={buttonClass}><FileText className="h-3.5 w-3.5" /><span className="hidden lg:inline">Sources</span></button>
    </>}
    <button aria-label={present ? 'Exit presentation' : 'Present'} title={present ? 'Exit presentation' : 'Present'} data-testid="present-btn" onClick={() => setPresent(!present)} className={buttonClass}>
      {present ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}<span className="hidden sm:inline">{present ? 'Exit' : 'Present'}</span>
    </button>
  </div>;
}

const progressDot = (i: number, current: number): string => {
  if (i === current) return 'w-6 bg-sig-blue';
  if (i < current) return 'w-2 bg-paper-3';
  return 'w-2 bg-line-2';
};

function Footer() {
  const { sectionIndex, go } = useStore();
  return (
    <footer className="relative z-[60] flex items-center justify-between gap-2 px-3 lg:px-6 h-12 border-t border-line bg-ink-1 shrink-0">
      <button data-testid="prev-btn" disabled={sectionIndex === 0} onClick={() => go(sectionIndex - 1)} className="inline-flex items-center gap-1 text-xs text-paper-2 hover:text-paper disabled:opacity-30 transition-colors duration-200"><ChevronLeft className="h-4 w-4" /> Previous</button>
      <div className="flex items-center gap-3">
        <div className="hidden xl:flex gap-1">{SECTIONS.map((x, i) => <button key={x.id} onClick={() => go(i)} aria-label={x.label} className={cn('h-1 rounded-full transition-all duration-300', progressDot(i, sectionIndex))} />)}</div>
        <span data-testid="section-progress" className="num text-[11px] text-paper-3">{sectionIndex + 1} / {SECTIONS.length}</span>
      </div>
      <ViewControls />
      <button data-testid="next-btn" disabled={sectionIndex === SECTIONS.length - 1} onClick={() => go(sectionIndex + 1)} className="inline-flex items-center gap-1 text-xs text-paper-2 hover:text-paper disabled:opacity-30 transition-colors duration-200">Next <ChevronRight className="h-4 w-4" /></button>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { present, sectionIndex } = useStore();
  const mainRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => { mainRef.current?.scrollTo({ top: 0, left: 0 }); }, [sectionIndex, present]);
  return (
    <div className="h-full flex bg-ink text-paper">
      <Nav />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <main ref={mainRef} data-testid="main-content" className={cn('flex-1 min-h-0 overflow-y-auto overflow-x-hidden', present ? 'p-6 lg:p-10' : 'p-4 lg:p-6')}>{children}</main>
        <Footer />
      </div>
      {SECTIONS[sectionIndex].id !== 'opmodel' && <>
        <EvidenceDrawer />
        <AccountDrawer />
      </>}
    </div>
  );
}
