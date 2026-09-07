import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight, Navigation } from 'lucide-react';
import { Headline, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { useStore } from '@/store';
import { GROWTH_ROUTES, MILESTONES } from '@/data/roadmap';
import './roadmap.css';

// Three mission legs: outbound, return, then the final approach.
const MISSION_COURSE = 'M80 160 H840 C950 160 950 402 840 402 H200 C90 402 90 644 200 644 H900';
const CHECKPOINTS = [
  { x: 80, y: 160 }, { x: 430, y: 160 }, { x: 780, y: 160 },
  { x: 720, y: 402 }, { x: 240, y: 402 },
  { x: 280, y: 644 }, { x: 900, y: 644 },
];

export default function Roadmap() {
  const [selected, setSelected] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [roadmapScale, setRoadmapScale] = useState(1);
  const { mode, present } = useStore();
  const interactive = mode === 'explore' && !present;
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    // Fit desktop and presentation views, keeping the final line clear of the footer.
    // Narrow screens retain the full-size, scrollable roadmap.
    const fit = () => {
      const fitToViewport = present || viewport.clientWidth >= 1060;
      setRoadmapScale(fitToViewport
        ? Math.max(0.01, Math.min(1, (viewport.clientHeight - 8) / 731, viewport.clientWidth / 1060))
        : 1);
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
    <Headline title="18-Month Company Roadmap" sub="Proposed milestones across delivery, growth and India capability." right={<SourceButton claimIds={['m-roadmap', 'c-army-select', 'c-jsw', 'c-catalyst']} title="India company roadmap" />} />
    <div ref={viewportRef} className="company-roadmap-scroll" role="region" aria-label="18-month mission corridor; scroll horizontally on smaller screens" tabIndex={0}>
      <div className="company-roadmap-canvas" data-testid="company-roadmap" style={{ zoom: roadmapScale }}>
        <div className="mission-corridor">
          <div className="mission-grid" aria-hidden="true" />
          <div className="mission-path-area">
            <svg className="mission-path" viewBox="0 0 1000 669" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="mission-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="669"><stop stopColor="#3b82f6" /><stop offset=".65" stopColor="#60a5fa" /><stop offset="1" stopColor="#80b4fa" /></linearGradient></defs>
              <path className="mission-halo" d={MISSION_COURSE} />
              <path className="mission-center" d="M80 160 H840 C950 160 950 402 840 402 H630 M410 402 H200 C90 402 90 644 200 644 H900" />
              <path className="mission-branch direct" d="M630 402 C600 402 605 383 580 383 H460 C435 383 440 402 410 402" />
              <path className="mission-branch engineering" d="M630 402 H410" />
              <path className="mission-branch partner" d="M630 402 C600 402 605 421 580 421 H460 C435 421 440 402 410 402" />
              <path className="mission-direction" d="M425 152 L437 160 L425 168 M680 394 L668 402 L680 410 M570 636 L582 644 L570 652" />
            </svg>
            <div className="mission-routes" data-testid="commercial-growth-routes" aria-label="Government, global engineering and business routes">
              {GROWTH_ROUTES.map((route, index) => <div className={`mission-route route-${index}`} key={route.title}><strong>{route.title}</strong></div>)}
            </div>
            <ol className="company-milestones" aria-label="Company milestones">
              {MILESTONES.map((item, index) => {
                const content = <><span className="company-month">{item.label}{interactive && <ArrowUpRight aria-hidden="true" />}</span><ul>{item.lines.map((line) => <li key={line}>{line}</li>)}</ul></>;
                return <li key={item.month} className={`company-milestone above ${item.month === 12 ? 'october-2027' : ''} ${index === 0 ? 'first' : ''} ${index === MILESTONES.length - 1 ? 'last' : ''} ${selected === item.month ? 'selected' : ''}`} style={{ '--position': `${CHECKPOINTS[index].x / 10}%`, '--altitude': `${CHECKPOINTS[index].y}px` } as CSSProperties}>
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
      {(selected === 6 || selected === 12) && <div className="milestone-panel-section"><h3>Growth routes</h3>{GROWTH_ROUTES.map((route) => <p key={route.title}><strong>{route.title}</strong><br />{route.detail}</p>)}</div>}
      <div className="milestone-panel-section"><h3>Planning assumption</h3><p>{milestone?.assumption}</p></div>
      <div className="milestone-panel-section"><h3>Supporting note</h3><p>{milestone?.note}</p><p className="milestone-planning-note">Dates are proposed planning checkpoints, not confirmed customer or procurement commitments.</p></div>
    </SideDrawer>
  </Screen>;
}
