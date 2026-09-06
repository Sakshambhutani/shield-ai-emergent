import { useState } from 'react';
import { ArrowUpRight, ChevronRight, FileText } from 'lucide-react';
import { SourceButton } from '@/components/Evidence';
import { MARKET_TREE, type BudgetNode } from '@/data/budget';
import { budgetPath } from '@/lib/market-drilldown';
import { Headline } from '@/components/ui';
import './market.css';

const AREAS = [
  { id: 'mod', title: 'Defence Services', summary: 'UAS, ISR & autonomous systems', intro: 'Visible programmes across tactical, air and maritime systems.' },
  { id: 'future-drdo', title: 'Research & innovation', summary: 'DRDO · iDEX · ADITI · TDF', intro: 'Research and innovation routes where autonomy capabilities can be developed.' },
  { id: 'future-coastguard', title: 'Coastal security', summary: 'Indian Coast Guard', intro: 'Aerial surveillance and unmanned maritime requirements.' },
  { id: 'future-mha', title: 'Border & internal security', summary: 'MHA · CAPFs', intro: 'Surveillance and protection capabilities to investigate within modernisation.' },
  { id: 'future-space', title: 'Military space', summary: 'SBS-III · surveillance', intro: 'Space-based surveillance and potential autonomous mission management.' },
];
const rowsFor = (owner: string) => MARKET_TREE.filter(n => n.relevant && n.id !== owner && !(n.value?.includes('₹') && /annual|budget|capital/i.test(n.tag ?? '')) && budgetPath(MARKET_TREE, n.id).some(p => p.id === owner) && !MARKET_TREE.some(c => c.parent === n.id));
function status(n: BudgetNode) {
  if (n.id === 'future-cg-shipborne') return 'RFP retracted';
  if (n.id === 'future-cg-male') return 'RFI issued';
  if (n.id === 'future-idex' || n.id === 'future-tdf' || n.id.startsWith('future-revenue-')) return 'Funding / procurement route';
  if (n.id === 'future-space-satellites') return 'Reported programme · SBS-III';
  if (n.cls === 'context') return 'Capability area · to validate';
  return n.tag ?? 'Programme signal';
}
function programmeTitle(n: BudgetNode) {
  return n.id === 'future-space-satellites' ? 'SBS-III · 52 surveillance satellites' : n.title;
}
function ProgrammeDetail({ node, owner }: { node: BudgetNode; owner: string }) {
  const path = budgetPath(MARKET_TREE, node.id).filter(n => n.id !== 'market-root');
  const budgetNodes = path.filter(n => n.value?.includes('₹'));
  return <aside className="market-detail" aria-label="Programme details" data-testid="market-programme-detail">
    <div className="market-detail-top"><span className="market-eyebrow">Selected opportunity</span><SourceButton claimIds={node.claimIds} title={node.title} /></div>
    <span className={`market-status ${node.cls}`}>{status(node)}</span>
    <h3>{programmeTitle(node)}</h3>
    <p>{node.why}</p>
    {owner === 'future-drdo' && <p className="market-detail-note">iDEX / ADITI are related DIO / DDP routes. TDF is executed by DRDO.</p>}
    <div className="market-detail-evidence"><FileText size={14} /><span>Programme evidence and sources</span><SourceButton claimIds={node.claimIds} title={node.title} /></div>
    <details className="market-budget-context" key={node.id}>
      <summary>Funding context <ChevronRight size={14} /></summary>
      <p>Related budget context only. The funding route and addressable content need to be established programme by programme.</p>
      {budgetNodes.length ? budgetNodes.map(n => <div key={n.id} className="market-budget-row"><span>{n.title}</span><div><span>{n.value}</span><SourceButton claimIds={n.claimIds} title={n.title} /></div><small>{n.tag}</small></div>) : <p>No separable funding value established.</p>}
      <p>Annual budgets and programme values may overlap. These figures are not Shield-addressable spend.</p>
    </details>
  </aside>;
}
export default function Money() {
  const [area, setArea] = useState('mod');
  const [selectedByArea, setSelectedByArea] = useState<Record<string, string>>({});
  const owner = AREAS.find(a => a.id === area)!;
  const programmes = rowsFor(area);
  const selected = programmes.find(n => n.id === selectedByArea[area]) ?? programmes[0];
  return <section className="market-page" data-testid="market-page">
    <Headline title="Where can autonomy find a place in India?" sub="Programmes, capability needs and procurement routes across government." />
    <div className="market-workspace">
      <nav className="market-area-list" aria-label="Market opportunity areas">
        <div className="market-eyebrow market-area-label">Opportunity areas</div>
        {AREAS.map((a, i) => <button key={a.id} data-testid={`market-area-${a.id}`} aria-pressed={area === a.id} onClick={() => setArea(a.id)} className={area === a.id ? 'selected' : ''}><span className="market-area-number">{String(i + 1).padStart(2, '0')}</span><span><strong>{a.title}</strong></span><ChevronRight size={14} /></button>)}
      </nav>
      <div className="market-programme-panel">
        <header><span className="market-eyebrow">{owner.title}</span><h2>Programmes & capability needs</h2><p>{owner.intro}</p></header>
        <div className="market-programme-grid" aria-label={`${owner.title} programmes`}>
          {programmes.map(n => <button key={n.id} data-testid={`market-programme-${n.id}`} className={`market-programme-card ${selected?.id === n.id ? 'selected' : ''}`} aria-pressed={selected?.id === n.id} onClick={() => setSelectedByArea(prev => ({ ...prev, [area]: n.id }))}><span className={`market-status ${n.cls}`}>{status(n)}</span><strong>{programmeTitle(n)}</strong><ArrowUpRight size={16} /></button>)}
        </div>
      </div>
      {selected && <ProgrammeDetail node={selected} owner={area} />}
    </div>
  </section>;
}
