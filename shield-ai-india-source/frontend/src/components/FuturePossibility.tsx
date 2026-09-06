import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, RotateCcw, X } from 'lucide-react';
import { CORE_NODES, FUTURE_OPTIONS, type CoreId, type FutureHorizon, type FutureOption } from '@/data/future';
import { cn } from '@/lib/cn';
import './future-possibility.css';

const STORAGE_KEY = 'shield-india-future-horizons-v1';
const HORIZONS: FutureHorizon[] = ['NOW', 'POSITION', 'OPTION'];
const STAGES = ['Army proof', 'India credibility', 'Hivemind embedding', 'Navy / multi-domain proof', 'Future opportunities unlock'];
const OUTER = [[24, 12], [76, 12], [89, 55], [76, 90], [24, 90], [11, 55]];
const MOBILE_OUTER = [[24, 8], [76, 8], [76, 75], [76, 91], [24, 91], [24, 75]];

function readHorizons(): Record<string, FutureHorizon> {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return Object.fromEntries(FUTURE_OPTIONS.flatMap((o) => HORIZONS.includes(saved?.[o.id]) ? [[o.id, saved[o.id]]] : []));
  } catch { return {}; }
}

function OptionDrawer({ option, horizon, onHorizon, onClose }: {
  option: FutureOption; horizon: FutureHorizon; onHorizon: (h: FutureHorizon) => void; onClose: () => void;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    title.current?.focus({ preventScroll: true });
    if (window.matchMedia('(min-width: 640px) and (max-width: 1199px)').matches) {
      title.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [option.id]);
  return (
    <aside className="future-drawer" aria-labelledby="future-detail-title" data-testid="future-drawer">
      <div className="flex items-start justify-between gap-3 mb-5">
        <h2 id="future-detail-title" ref={title} tabIndex={-1} className="text-xl font-medium outline-none">{option.title}</h2>
        <button className="future-icon-button" aria-label="Close opportunity" onClick={onClose}><X size={18} /></button>
      </div>
      <dl className="future-fields">
        {[
          ['Mission', option.mission], ['Shield wedge', option.wedge],
          ['India signal', option.signal], ['Shield proof', option.proof],
        ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        <div><dt><label htmlFor="future-horizon">Horizon</label></dt><dd>
          <select id="future-horizon" value={horizon} onChange={(e) => onHorizon(e.target.value as FutureHorizon)}>
            {HORIZONS.map((h) => <option key={h}>{h}</option>)}
          </select>
          <span className="future-horizon-context">{horizon === 'NOW' ? 'Core' : 'Seed'} · strategic judgement</span>
          <span className="block mt-1">{option.timing}</span>
        </dd></div>
        <div><dt>What must become true?</dt><dd>{option.gate}</dd></div>
      </dl>
      <details className="future-evidence" key={option.id}>
        <summary>Sources &amp; Evidence <ChevronRight size={14} /></summary>
        <div className="future-evidence-content">
          <div><h3>Shield capability proof</h3><a href={option.proofSource.url} target="_blank" rel="noreferrer">{option.proofSource.label} ↗</a></div>
          <div><h3>Indian market signal</h3><a href={option.indiaSource.url} target="_blank" rel="noreferrer">{option.indiaSource.label} ↗</a></div>
          <div><h3>Funded programme</h3><p>{option.programme}</p></div>
          <div><h3>Our strategic inference</h3><p>{option.inference}</p></div>
          <div className="future-evidence-meta"><span>Budget visibility · {option.budget}</span><span>Shield fit · {option.fit}</span><span>Route · {option.route}</span></div>
          <p className="text-paper-3">Horizon, fit and route are planning assumptions. Horizon edits stay in this browser.</p>
        </div>
      </details>
    </aside>
  );
}

export default function FuturePossibility() {
  const [selected, setSelected] = useState<string | null>(null);
  const [core, setCore] = useState<CoreId | null>(null);
  const [offset, setOffset] = useState(0);
  const [horizons, setHorizons] = useState(readHorizons);
  const [stage, setStage] = useState<number | null>(null);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);
  const map = useRef<HTMLDivElement>(null);
  const option = FUTURE_OPTIONS.find((o) => o.id === selected);
  const horizonOf = (o: FutureOption) => horizons[o.id] ?? o.horizon;
  const visible = FUTURE_OPTIONS.slice(offset, offset + 6);
  const activeCore = option?.core ?? core;
  const corePositions = CORE_NODES.map((n) => ({ ...n, x: mobile ? n.id === 'army' ? 24 : n.id === 'ecosystem' ? 76 : 50 : n.x, y: mobile ? n.id === 'navy' ? 58 : 26 : n.id === 'navy' ? 76 : 34 }));
  const centre = { x: 50, y: mobile ? 44 : 54 };
  const positions = mobile ? MOBILE_OUTER : OUTER;

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (stage === null) return;
    const timer = window.setTimeout(() => setStage(stage === 4 ? null : stage + 1), stage === 4 ? 1600 : 1100);
    return () => window.clearTimeout(timer);
  }, [stage]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null); setCore(null); setStage(null);
        if (selected) map.current?.querySelector<HTMLButtonElement>(`[data-option="${selected}"]`)?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const close = () => {
    setSelected(null);
    map.current?.querySelector<HTMLButtonElement>(`[data-option="${selected}"]`)?.focus();
  };
  const editHorizon = (h: FutureHorizon) => {
    if (!option) return;
    const next = { ...horizons, [option.id]: h };
    setHorizons(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Session editing remains available. */ }
  };
  const play = () => {
    setSelected(null); setCore(null);
    setStage(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 4 : 0);
  };
  const dim = (id: CoreId) => activeCore && activeCore !== id;
  const nodeStyle = (x: number, y: number, opacity: number): CSSProperties => ({ left: `${x}%`, top: `${y}%`, opacity });

  return (
    <section className={cn('future-view', option && 'has-selection')} aria-label="Future possibility" data-testid="future-view">
      <div className="future-toolbar">
        <div className="future-legend" aria-label="Horizon legend">{HORIZONS.map((h) => <span key={h} data-horizon={h}><i />{h}</span>)}</div>
        <button className="future-play" onClick={stage === null ? play : () => setStage(null)}><Play size={12} />{stage === null ? 'Earn the right to expand' : 'Stop expansion'}</button>
      </div>
      <div className="future-workspace">
        <div ref={map} className="future-map" data-testid="future-map">
          <svg className="future-orbits" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="50" cy={centre.y} rx="22" ry="23" className="inner-orbit" />
            <ellipse cx="50" cy="52" rx="39" ry="41" className={cn('outer-orbit', stage === 4 && 'unlock-orbit')} />
            {corePositions.map((n) => <line key={n.id} x1={centre.x} y1={centre.y} x2={n.x} y2={n.y} className={cn('core-link', activeCore === n.id && 'is-connected')} style={{ opacity: dim(n.id) ? 0.12 : undefined }} />)}
            {visible.map((o, i) => {
              const n = corePositions.find((c) => c.id === o.core)!;
              const connected = selected === o.id || (!selected && core === o.core) || stage === 4;
              return connected && <line key={o.id} data-testid={`future-link-${o.id}`} x1={n.x} y1={n.y} x2={positions[i][0]} y2={positions[i][1]} className="future-link is-connected" />;
            })}
          </svg>
          <div className={cn('future-centre', stage === 1 && 'permission-pulse')} style={nodeStyle(centre.x, centre.y, 1)} data-testid="future-centre">
            <span className="future-centre-mark" aria-hidden="true">✳</span>
            <span>Shield AI India</span>
          </div>
          {corePositions.map((n) => {
            const highlighted = stage === (n.id === 'army' ? 0 : n.id === 'ecosystem' ? 2 : 3);
            return <button key={n.id} className={cn('future-node core-node', activeCore === n.id && 'is-selected', highlighted && 'permission-pulse')} style={nodeStyle(n.x, n.y, dim(n.id) ? 0.2 : 1)} aria-pressed={core === n.id} onClick={() => { setStage(null); setSelected(null); setCore(core === n.id ? null : n.id); }} data-testid={`future-core-${n.id}`}>
              <strong>{n.title}</strong><span className="future-node-horizon">NOW</span><small>{n.tag}</small>
            </button>;
          })}
          {visible.map((o, i) => {
            const horizon = horizonOf(o);
            const isSelected = selected === o.id;
            const unrelated = selected ? !isSelected : core ? core !== o.core : false;
            const opacity = isSelected ? 1 : unrelated ? 0.13 : stage !== null && stage < 4 ? 0.1 : horizon === 'NOW' ? 1 : horizon === 'POSITION' ? 0.68 : 0.4;
            return <button key={o.id} data-option={o.id} data-testid={`future-node-${o.id}`} data-horizon={horizon} aria-pressed={isSelected} aria-controls={isSelected ? 'future-detail-title' : undefined} className={cn('future-node option-node', isSelected && 'is-selected', stage === 4 && 'option-unlock')} style={nodeStyle(positions[i][0], positions[i][1], opacity)} onClick={() => { setStage(null); setCore(null); setSelected(isSelected ? null : o.id); }}>
              <strong>{o.title}</strong><span className="future-node-horizon">{horizon}</span><small>{o.tag}</small>
            </button>;
          })}
        </div>
        {option && <OptionDrawer option={option} horizon={horizonOf(option)} onHorizon={editHorizon} onClose={close} />}
      </div>
      <div className="future-bottom">
        <div className="future-sequence" aria-live="polite">{stage !== null ? <><span className="num">0{stage + 1}</span><span className="future-stage-label" key={stage}>{STAGES[stage]}</span><ArrowRight size={14} /></> : <span>First earn the right to expand.</span>}</div>
        <div className="future-paging">
          {Object.keys(horizons).length > 0 && <button className="future-icon-button" aria-label="Reset horizon judgements" title="Reset horizon judgements" onClick={() => { setHorizons({}); try { localStorage.removeItem(STORAGE_KEY); } catch { /* Session reset succeeds. */ } }}><RotateCcw size={13} /></button>}
          <span>6 of 7 options</span>
          <button className="future-icon-button" aria-label="Previous future options" disabled={offset === 0} onClick={() => { setOffset(0); setSelected(null); setCore(null); setStage(null); }}><ChevronLeft size={16} /></button>
          <button className="future-icon-button" aria-label="More future options, including national-security adjacencies" disabled={offset === 1} onClick={() => { setOffset(1); setSelected(null); setCore(null); setStage(null); }}><ChevronRight size={16} /></button>
        </div>
      </div>
      <p className="future-message">The 18-month plan builds the beachheads; the same autonomy stack creates options across India’s future multi-domain force.</p>
    </section>
  );
}
