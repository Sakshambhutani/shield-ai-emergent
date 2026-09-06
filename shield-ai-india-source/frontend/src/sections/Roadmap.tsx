import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight, Navigation } from 'lucide-react';
import { Headline, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { useStore } from '@/store';
import { GROWTH_ROUTES, MILESTONES } from '@/data/roadmap';
import './roadmap.css';

// Three mission legs: outbound, return, then the final approach.
const MISSION_COURSE = 'M80 160 H840 C950 160 950 382 840 382 H200 C90 382 90 604 200 604 H900';
const CHECKPOINTS = [
  { x: 80, y: 160 }, { x: 620, y: 160 },
  { x: 720, y: 382 }, { x: 240, y: 382 },
  { x: 280, y: 604 }, { x: 900, y: 604 },
];

export default function Roadmap() {
  const [selected, setSelected] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [presentationScale, setPresentationScale] = useState(1);
  const { mode, present } = useStore();
  const interactive = mode === 'explore' && !present;
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !present) {
      setPresentationScale(1);
      return;
    }
    // Fit the complete corridor, including its endpoint halo, above the footer.
    const fit = () => {
      setPresentationScale(Math.max(0.01, Math.min(1, (viewport.clientHeight - 2) / 653, viewport.clientWidth / 1060)));
      viewport.scrollTo({ top: 0, left: 0 });
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [present]);
  useEffect(() => { if (!interactive) setSelected(null); }, [interactive]);
  const milestone = MILESTONES.find((item) => item.month === selected);

  return <Screen className={`company-roadmap${present ? ' company-roadmap-present' : ''}`}>
    <Headline title="18-Month Company Roadmap" sub="Proposed company checkpoints across delivery, growth and India capability." right={<SourceButton claimIds={['m-roadmap', 'c-army-select', 'c-jsw', 'c-catalyst']} title="India company roadmap" />} />
    <div ref={viewportRef} className="company-roadmap-scroll" role="region" aria-label="18-month mission corridor; scroll horizontally on smaller screens" tabIndex={0}>
      <div className="company-roadmap-canvas" data-testid="company-roadmap" style={present ? { zoom: presentationScale } : undefined}>
        <div className="mission-corridor">
          <div className="mission-grid" aria-hidden="true" />
          <div className="mission-path-area">
            <svg className="mission-path" viewBox="0 0 1000 629" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="mission-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="629"><stop stopColor="#3b82f6" /><stop offset=".65" stopColor="#60a5fa" /><stop offset="1" stopColor="#80b4fa" /></linearGradient></defs>
              <path className="mission-halo" d={MISSION_COURSE} />
              <path className="mission-center" d="M80 160 H840 C950 160 950 382 840 382 H630 M410 382 H200 C90 382 90 604 200 604 H900" />
              <path className="mission-branch direct" d="M630 382 C600 382 605 363 580 363 H460 C435 363 440 382 410 382" />
              <path className="mission-branch partner" d="M630 382 C600 382 605 401 580 401 H460 C435 401 440 382 410 382" />
              <path className="mission-direction" d="M425 152 L437 160 L425 168 M680 374 L668 382 L680 390 M570 596 L582 604 L570 612" />
            </svg>
            <div className="mission-routes" data-testid="commercial-growth-routes" aria-label="Parallel growth routes between M6 and M12">
              {GROWTH_ROUTES.map((route, index) => <div className={`mission-route route-${index}`} key={route.title}><strong>{route.title}</strong></div>)}
            </div>
            <ol className="company-milestones" aria-label="Company milestones">
              {MILESTONES.map((item, index) => {
                const content = <><span className="company-month">{item.label}{interactive && <ArrowUpRight aria-hidden="true" />}</span><h3>{item.title}</h3><ul>{item.lines.map((line) => <li key={line}>{line}</li>)}</ul></>;
                return <li key={item.month} className={`company-milestone above ${index === 0 ? 'first' : ''} ${index === MILESTONES.length - 1 ? 'last' : ''} ${selected === item.month ? 'selected' : ''}`} style={{ '--position': `${CHECKPOINTS[index].x / 10}%`, '--altitude': `${CHECKPOINTS[index].y}px` } as CSSProperties}>
                  <span className="company-milestone-dot" aria-hidden="true">{index === MILESTONES.length - 1 && <Navigation />}</span>
                  {interactive ? <button data-testid={`milestone-m${item.month}`} className="company-milestone-copy" onClick={() => setSelected(item.month)} aria-expanded={selected === item.month} aria-label={`${item.label}: ${item.title}. Explore details and assumptions`}>{content}</button> : <div className="company-milestone-copy" data-testid={`milestone-m${item.month}`}>{content}</div>}
                </li>;
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
    <SideDrawer open={interactive && !!milestone} onClose={() => setSelected(null)} title={milestone?.title ?? ''} eyebrow={`${milestone?.label ?? ''} · Company checkpoint`} testId="milestone-detail">
      <div className="milestone-panel-section"><h3>Company state</h3><ul className="company-milestone-details">{milestone?.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
      {(selected === 6 || selected === 12) && <div className="milestone-panel-section"><h3>Growth routes · M6–M12</h3>{GROWTH_ROUTES.map((route) => <p key={route.title}><strong>{route.title}</strong><br />{route.detail}</p>)}</div>}
      <div className="milestone-panel-section"><h3>Planning assumption</h3><p>{milestone?.assumption}</p></div>
      <div className="milestone-panel-section"><h3>Supporting note</h3><p>{milestone?.note}</p><p className="milestone-planning-note">Month markers are proposed planning checkpoints, not confirmed customer or procurement commitments.</p></div>
    </SideDrawer>
  </Screen>;
}
