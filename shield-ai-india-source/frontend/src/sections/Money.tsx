import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactFlow, ReactFlowProvider, Handle, Position, useReactFlow, type Node, type Edge, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Callout, ExploreNote, Field, Headline, NotDisclosed, Pill, Screen } from '@/components/ui';
import { EvidenceBadge, SourceButton } from '@/components/Evidence';
import { fmtCr, modelledLayer } from '@/components/AssumptionCalc';
import { BUDGET_TREE, MISSION_TREE, type BudgetNode } from '@/data/budget';
import { useStore } from '@/store';
import FuturePossibility from '@/components/FuturePossibility';

const COLW = 205, ROW = 118;
const PRO_OPTIONS = { hideAttribution: true };
const EV_BORDER: Record<BudgetNode['cls'], string> = { official: 'border-slate-400/70', industry: 'border-amber-500/70', modelled: 'border-violet-400/80 border-dashed', context: 'border-line-2' };
const EV_DOT: Record<BudgetNode['cls'], string> = { official: 'bg-slate-300', industry: 'bg-amber-400', modelled: 'bg-violet-400', context: '' };
const isMoney = (v: string): boolean => /^[₹~≈]/.test(v);
const MODEL_BASE: Record<NonNullable<BudgetNode['modelKey']>, { cr: number; label: string }> = { tactical: { cr: 16000, label: '₹16,000 Cr' }, male: { cr: 20000, label: '₹20,000 Cr' } };
const UAS_ROWS = [['Nano / Micro', 'Group 1', 'Hand-launched'], ['Mini / Small', 'Group 2', 'Tactical unit'], ['Tactical VTOL', 'Group 3', 'V-BAT sits here'], ['MALE', 'Group 4', '87-MALE programme'], ['HALE / CCA', 'Group 5', 'CATS · HAPS']];
const CALLOUTS = [
  { label: 'Total MoD FY27', value: '₹7.85 L Cr', tag: 'Annual · official', claimIds: ['c-budget-total'], testId: 'callout-total' },
  { label: 'Capital outlay', value: '₹2.19 L Cr', tag: 'Annual · official', claimIds: ['c-budget-capital'], testId: 'callout-capital' },
  { label: 'Capital acquisition', value: '₹1.85 L Cr', tag: 'Annual · official', tone: 'blue' as const, claimIds: ['c-budget-acq'], testId: 'callout-acq' },
  { label: 'Domestic procurement', value: '₹1.39 L Cr', tag: '~75% · official', tone: 'green' as const, claimIds: ['c-budget-domestic'], testId: 'callout-domestic' },
];

type NData = { n: BudgetNode; dim: boolean; selected: boolean; hasKids: boolean; open: boolean };

function BudgetFlowNode({ data }: NodeProps<Node<NData>>) {
  const { n, dim, selected, hasKids, open } = data;
  return (
    <div data-testid={`budget-node-${n.id}`} className={cn('w-[190px] rounded-md bg-ink-2 border px-2.5 py-2 transition-all duration-300', EV_BORDER[n.cls], selected && 'ring-1 ring-sig-blue bg-ink-3', dim ? 'opacity-25' : 'opacity-100')}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start justify-between gap-2">
        <div className="text-[13px] font-medium leading-tight">{n.title}</div>
        {hasKids && <ChevronDown className={cn('h-3.5 w-3.5 text-paper-3 shrink-0 transition-transform duration-200', open ? 'rotate-0' : '-rotate-90')} />}
      </div>
      {n.value && <div className={cn('num mt-1 leading-none', isMoney(n.value) ? 'text-xl font-semibold' : 'text-[11px] text-paper-3 italic')}>{n.value}</div>}
      {n.tag && <div className="mt-1.5 flex items-center gap-1.5"><span className="font-mono text-[9px] uppercase tracking-wider text-paper-3 border border-line rounded-sm px-1 py-0.5">{n.tag}</span>{n.cls !== 'context' && <span className={cn('h-1.5 w-1.5 rounded-full', EV_DOT[n.cls])} />}</div>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
const nodeTypes = { budget: BudgetFlowNode };

function useTree(tree: BudgetNode[], expanded: Set<string>, selected: string | null) {
  return useMemo(() => {
    const byParent: Record<string, BudgetNode[]> = {};
    tree.forEach((n) => { (byParent[n.parent ?? '__root'] ||= []).push(n); });
    const parentOf = Object.fromEntries(tree.map((n) => [n.id, n.parent]));
    const path = new Set<string>();
    let p: string | null | undefined = selected;
    while (p) { path.add(p); p = parentOf[p]; }
    const pos: Record<string, { x: number; y: number }> = {};
    let cursor = 0;
    const visible: BudgetNode[] = [];
    const place = (n: BudgetNode, depth: number): number => {
      visible.push(n);
      const kids = expanded.has(n.id) ? byParent[n.id] ?? [] : [];
      if (!kids.length) { const cx = cursor * COLW; cursor += 1; pos[n.id] = { x: cx, y: depth * ROW }; return cx; }
      const cs = kids.map((k) => place(k, depth + 1));
      const cx = (cs[0] + cs[cs.length - 1]) / 2; pos[n.id] = { x: cx, y: depth * ROW }; return cx;
    };
    byParent['__root'].forEach((r) => place(r, 0));
    const nodes: Node<NData>[] = visible.map((n) => {
      const dim = !n.relevant || (selected !== null && !path.has(n.id) && n.parent !== selected);
      return { id: n.id, type: 'budget', position: pos[n.id], data: { n, dim, selected: selected === n.id, hasKids: !!byParent[n.id]?.length, open: expanded.has(n.id) }, draggable: false };
    });
    const edges: Edge[] = visible.filter((n) => n.parent && pos[n.parent]).map((n) => ({ id: `${n.parent}-${n.id}`, source: n.parent!, target: n.id, type: 'smoothstep', style: { stroke: path.has(n.id) ? '#3B82F6' : '#2E3546', strokeWidth: path.has(n.id) ? 2 : 1.25, opacity: !n.relevant ? 0.3 : 1 } }));
    return { nodes, edges, parentOf };
  }, [tree, expanded, selected]);
}

function Flow({ nodes, edges, onNode }: { nodes: Node<NData>[]; edges: Edge[]; onNode: (id: string) => void }) {
  const rf = useReactFlow();
  const focusKey = nodes.map((n) => n.id).join('|');
  useEffect(() => {
    const ids = focusKey.split('|').filter(Boolean).map((id) => ({ id }));
    const t = setTimeout(() => rf.fitView({ nodes: ids, duration: 300, padding: 0.2, maxZoom: 1, minZoom: 0.55 }), 40);
    return () => clearTimeout(t);
  }, [focusKey, rf]);
  return <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} onNodeClick={(_, n) => onNode(n.id)} fitView proOptions={PRO_OPTIONS} nodesConnectable={false} zoomOnScroll={false} panOnScroll minZoom={0.3} className="bg-ink-1" />;
}

function UasPanel() {
  return (
    <div data-testid="uas-panel" className="panel p-3 text-xs grid sm:grid-cols-5 gap-2 animate-rise">
      <div className="sm:col-span-5 eyebrow">India UAS classification vs US Group 1–5 (explainer — indicative)</div>
      {UAS_ROWS.map(([a, b, c]) => <div key={a} className={cn('panel p-2', a === 'Tactical VTOL' && 'border-sig-blue/60')}><div className="font-medium">{a}</div><div className="num text-paper-3">{b}</div><div className="text-paper-2">{c}</div></div>)}
    </div>
  );
}

function ModelledLayer({ sel }: { sel: BudgetNode }) {
  const { assumptions, mode } = useStore();
  if (!sel.modelKey) return null;
  const base = MODEL_BASE[sel.modelKey];
  return (
    <div data-testid="modelled-layer" className="rounded-md p-3 ev-modelled space-y-1">
      <div className="flex items-center justify-between"><EvidenceBadge cls="modelled" />{mode === 'story' && <span className="font-mono text-[10px] text-paper-3">base case</span>}</div>
      <div className="eyebrow text-violet-300">Illustrative autonomy layer</div>
      <div className="num text-xl text-violet-300 font-semibold">≈{fmtCr(modelledLayer(base.cr, assumptions))}</div>
      <div className="num text-[10px] text-violet-200/80 leading-relaxed">{base.label} × {assumptions.attach}% autonomy layer × {assumptions.capture}% capture</div>
      <div className="text-[10px] text-paper-3">Not official data. Adjust in Explore → Assumptions.</div>
    </div>
  );
}

function NodePanel({ sel, onClose }: { sel: BudgetNode; onClose: () => void }) {
  return (
    <aside data-testid="node-panel" className="panel p-4 flex flex-col gap-3 overflow-y-auto w-[300px] shrink-0 animate-slideIn">
      <div className="space-y-3 animate-rise">
        <div className="flex items-start justify-between gap-2"><div className="text-base font-medium leading-tight">{sel.title}</div><div className="flex items-center gap-1"><SourceButton claimIds={sel.claimIds} title={sel.title} /><button data-testid="node-panel-close" onClick={onClose} className="text-paper-3 hover:text-paper text-xs px-1">✕</button></div></div>
        <div className="flex flex-wrap gap-1.5">{sel.cls !== 'context' && <EvidenceBadge cls={sel.cls} />}{sel.tag && <Pill>{sel.tag}</Pill>}</div>
        {sel.value && <div className={cn('num', sel.value.includes('₹') ? 'text-2xl font-semibold' : 'text-xs italic text-paper-3')}>{sel.value}</div>}
        <Field label="Why relevant">{sel.why}</Field>
        {sel.products && <Field label="Shield products"><div className="flex flex-wrap gap-1.5 mt-1">{sel.products.map((p) => <Pill key={p} tone="blue">{p}</Pill>)}</div></Field>}
        {sel.buyer && <Field label="Buyer">{sel.buyer}</Field>}
        {!sel.value && sel.cls !== 'context' && <Field label="Value"><NotDisclosed label="Value not publicly separable" /></Field>}
        <ModelledLayer sel={sel} />
      </div>
    </aside>
  );
}

export default function Money() {
  const { mode, present } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const marketView = searchParams.get('view') === 'future' ? 'future' : 'core';
  const setMarketView = (view: 'core' | 'future') => setSearchParams((params) => {
    if (view === 'future') params.set('view', view);
    else params.delete('view');
    return params;
  });
  const [view, setView] = useState<'budget' | 'mission'>('budget');
  const tree = view === 'budget' ? BUDGET_TREE : MISSION_TREE;
  const root = tree[0].id;
  const [expanded, setExpanded] = useState<Set<string>>(new Set([root]));
  const [selected, setSelected] = useState<string | null>(null);
  const [uas, setUas] = useState(false);
  const [canvasFocus, setCanvasFocus] = useState(false);
  useEffect(() => { setExpanded(new Set([tree[0].id])); setSelected(null); }, [tree]);
  useEffect(() => { if (present) { setSelected(null); setUas(false); } }, [present]);
  useEffect(() => {
    if (!canvasFocus) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setCanvasFocus(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [canvasFocus]);
  const { nodes, edges } = useTree(tree, expanded, selected);
  const onNode = (id: string) => {
    setSelected(id);
    setExpanded((prev) => { const s = new Set(prev); if (s.has(id) && id !== root && selected === id) s.delete(id); else s.add(id); return s; });
  };
  const sel = tree.find((n) => n.id === selected) ?? null;
  return (
    <Screen>
      <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="inline-flex rounded border border-line p-1 gap-1" role="group" aria-label="Market view">
          {(['core', 'future'] as const).map((v) => <button key={v} data-testid={`market-view-${v}`} aria-pressed={marketView === v} onClick={() => setMarketView(v)} className={cn('rounded px-3 py-2 text-[10px] sm:text-xs uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-sig-blue', marketView === v ? 'bg-ink-4 text-paper' : 'text-paper-3 hover:text-paper')}>{v === 'core' ? 'Core Today' : 'Future Possibility'}</button>)}
        </div>
        <span className="text-[10px] font-mono tracking-wider text-paper-3 uppercase">{marketView === 'core' ? '18-month planning universe' : '3–5+ year option space'}</span>
      </div>
      {marketView === 'future' ? <>
        <div className="shrink-0"><h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight" data-testid="screen-headline">Where else can Shield’s autonomy stack travel?</h1></div>
        <FuturePossibility />
      </> : <>
       <Headline title="India’s defence demand is moving toward autonomy" titleClassName="lg:text-4xl xl:text-5xl lg:whitespace-nowrap" sub="Official pools are context, not TAM. Only Shield-relevant capability universes branch out." right={
        <div className="flex gap-2">
          <div data-testid="view-toggle" className="flex rounded border border-line overflow-hidden text-xs">
            {(['budget', 'mission'] as const).map((v) => <button key={v} data-testid={`view-${v}`} onClick={() => setView(v)} className={cn('px-3 py-1 capitalize transition-colors duration-200', view === v ? 'bg-ink-4 text-paper' : 'text-paper-3 hover:text-paper-2')}>{v} view</button>)}
          </div>
           <button data-testid="uas-toggle" onClick={() => setUas(!uas)} className="rounded border border-line px-3 py-1 text-xs text-paper-3 hover:text-paper-2">UAS classes</button>
           {view === 'budget' && <button data-testid="budget-focus-toggle" aria-label="Focus budget canvas" onClick={() => setCanvasFocus(true)} className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1 text-xs text-paper-3 hover:text-paper-2"><Maximize2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Focus canvas</span></button>}
        </div>
       } />
       <ExploreNote>Explore adds sourced market callouts, model assumptions and supporting UAS classification detail.</ExploreNote>
      {mode === 'explore' && <div className="grid grid-cols-4 gap-3 shrink-0 stagger">{CALLOUTS.map((c) => <Callout key={c.testId} {...c} />)}</div>}
      {uas && <UasPanel />}
      <div className="flex gap-3 flex-1 min-h-0">
        <div className="panel overflow-hidden min-h-[420px] hidden md:block flex-1" data-testid="budget-tree">
          <ReactFlowProvider><Flow nodes={nodes} edges={edges} onNode={onNode} /></ReactFlowProvider>
        </div>
        <div className="md:hidden space-y-2 flex-1">
          {tree.map((n) => <button key={n.id} onClick={() => setSelected(n.id)} className={cn('panel w-full text-left px-3 py-2', !n.relevant && 'opacity-40')}><div className="text-sm">{n.title}</div>{n.value && <div className="num text-sig-blue">{n.value}</div>}</button>)}
        </div>
         {sel && !present && <NodePanel sel={sel} onClose={() => setSelected(null)} />}
       </div>
      </>}
      {canvasFocus && marketView === 'core' && view === 'budget' && <div data-testid="budget-canvas-focus" className="fixed inset-0 z-[80] flex flex-col gap-3 bg-ink p-4 lg:p-6">
        <div className="flex items-center justify-between gap-3 shrink-0"><div><div className="eyebrow text-sig-blue">01 · Market</div><div className="text-lg font-medium">India defence budget · canvas view</div></div><button data-testid="budget-focus-close" aria-label="Exit budget canvas focus" onClick={() => setCanvasFocus(false)} className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs text-paper-2 hover:text-paper"><Minimize2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Exit focus</span></button></div>
        <div className="panel flex-1 min-h-0 overflow-hidden"><ReactFlowProvider><Flow nodes={nodes} edges={edges} onNode={onNode} /></ReactFlowProvider></div>
      </div>}
    </Screen>
  );
}
