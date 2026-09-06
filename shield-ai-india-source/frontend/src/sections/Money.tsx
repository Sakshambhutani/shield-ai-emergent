import { useEffect, useMemo, useState } from 'react';
import { ReactFlow, ReactFlowProvider, Handle, Position, useReactFlow, type Node, type Edge, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Field, Headline, NotDisclosed, Pill, Screen } from '@/components/ui';
import { EvidenceBadge, SourceButton } from '@/components/Evidence';
import { fmtCr, modelledLayer } from '@/components/AssumptionCalc';
import { MARKET_TREE, type BudgetNode } from '@/data/budget';
import { useStore } from '@/store';

const COLW = 235, ROW = 142;
const PRO_OPTIONS = { hideAttribution: true };
const EV_BORDER: Record<BudgetNode['cls'], string> = { official: 'border-slate-400/70', industry: 'border-amber-500/70', modelled: 'border-violet-400/80 border-dashed', context: 'border-line-2' };
const EV_DOT: Record<BudgetNode['cls'], string> = { official: 'bg-slate-300', industry: 'bg-amber-400', modelled: 'bg-violet-400', context: '' };
const isMoney = (v: string): boolean => /^[₹~≈]/.test(v);
const MODEL_BASE: Record<NonNullable<BudgetNode['modelKey']>, { cr: number; label: string }> = { tactical: { cr: 16000, label: '₹16,000 Cr' }, male: { cr: 20000, label: '₹20,000 Cr' } };

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
  const focusNodes = nodes.filter((n) => !n.data.dim);
  const focusIds = new Set(focusNodes.map((n) => n.id));
  const focusKey = focusNodes.map((n) => n.id).join('|');
  const focusEdges = focusNodes.length === nodes.length ? edges : edges.filter((edge) => focusIds.has(edge.source) && focusIds.has(edge.target));
  useEffect(() => {
    const ids = focusKey.split('|').filter(Boolean).map((id) => ({ id }));
    const t = setTimeout(() => rf.fitView({ nodes: ids, duration: 300, padding: 0.2, maxZoom: 1, minZoom: 0.55 }), 40);
    return () => clearTimeout(t);
  }, [focusKey, rf]);
  return <ReactFlow nodes={nodes} edges={focusEdges} nodeTypes={nodeTypes} onNodeClick={(_, n) => onNode(n.id)} fitView proOptions={PRO_OPTIONS} nodesConnectable={false} zoomOnScroll={false} panOnScroll minZoom={0.3} className="bg-ink-1" />;
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
        {!sel.value && sel.cls !== 'context' && <Field label="Value"><NotDisclosed label="Value not publicly separable" /></Field>}
        <ModelledLayer sel={sel} />
      </div>
    </aside>
  );
}

export default function Money() {
  const { present } = useStore();
  const tree = MARKET_TREE;
  const root = tree[0].id;
  const [expanded, setExpanded] = useState<Set<string>>(new Set([root]));
  const [selected, setSelected] = useState<string | null>(null);
  const [canvasFocus, setCanvasFocus] = useState(false);
  useEffect(() => { setExpanded(new Set([tree[0].id])); setSelected(null); }, [tree]);
  useEffect(() => { if (present) setSelected(null); }, [present]);
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
       <Headline title="India’s defence demand is moving toward autonomy" sub="Government budget owners, official heads and emerging programme pools. Values are not additive." />
       <div className="flex flex-wrap justify-end gap-2 shrink-0">
         <button data-testid="budget-focus-toggle" aria-label="Focus market canvas" onClick={() => setCanvasFocus(true)} className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1 text-xs text-paper-3 hover:text-paper-2"><Maximize2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Focus canvas</span></button>
       </div>
       <div className="flex gap-3 flex-1 min-h-0">
        <div className="panel overflow-hidden min-h-[420px] hidden md:block flex-1" data-testid="budget-tree">
          <ReactFlowProvider><Flow nodes={nodes} edges={edges} onNode={onNode} /></ReactFlowProvider>
        </div>
        <div className="md:hidden space-y-2 flex-1">
          {tree.map((n) => <button key={n.id} onClick={() => setSelected(n.id)} className={cn('panel w-full text-left px-3 py-2', !n.relevant && 'opacity-40')}><div className="text-sm">{n.title}</div>{n.value && <div className="num text-sig-blue">{n.value}</div>}</button>)}
        </div>
         {sel && !present && <NodePanel sel={sel} onClose={() => setSelected(null)} />}
       </div>
      {canvasFocus && <div data-testid="budget-canvas-focus" className="fixed inset-0 z-[80] flex flex-col gap-3 bg-ink p-4 lg:p-6">
        <div className="flex items-center justify-between gap-3 shrink-0"><div><div className="eyebrow text-sig-blue">01 · Market</div><div className="text-lg font-medium">Public-spend canvas view</div></div><button data-testid="budget-focus-close" aria-label="Exit market canvas focus" onClick={() => setCanvasFocus(false)} className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs text-paper-2 hover:text-paper"><Minimize2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Exit focus</span></button></div>
        <div className="panel flex-1 min-h-0 overflow-hidden"><ReactFlowProvider><Flow nodes={nodes} edges={edges} onNode={onNode} /></ReactFlowProvider></div>
      </div>}
    </Screen>
  );
}
