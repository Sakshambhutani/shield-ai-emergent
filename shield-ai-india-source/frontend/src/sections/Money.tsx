import { useState } from 'react';
import { ChevronRight, FileText } from 'lucide-react';
import { SourceButton } from '@/components/Evidence';
import { MARKET_TREE, type BudgetNode } from '@/data/budget';
import { AREA_FUNDING, PROGRAMME_FUNDING, formatCrore, programmeFundingTotal } from '@/data/market-funding';
import { budgetPath } from '@/lib/market-drilldown';
import { Headline } from '@/components/ui';
import { useStore } from '@/store';
import './market.css';

const AREAS = [
  { id: 'mod', title: 'Defence Services (IA,IN,IAF)', summary: 'UAS, ISR & autonomous systems', intro: 'Visible programmes across tactical, air and maritime systems.' },
  { id: 'future-drdo', title: 'Research & innovation (DRDO)', summary: 'DRDO · iDEX · ADITI · TDF', intro: 'Research and innovation routes where autonomy capabilities can be developed.' },
  { id: 'future-coastguard', title: 'Coastal security (ICG)', summary: 'Indian Coast Guard', intro: 'Aerial surveillance and unmanned maritime requirements.' },
  { id: 'future-mha', title: 'Border & internal security (MHA)', summary: 'MHA · CAPFs', intro: 'Surveillance and protection capabilities to investigate within modernisation.' },
  { id: 'future-space', title: 'Military space (DSA)', summary: 'SBS-III · surveillance', intro: 'Space-based surveillance and potential autonomous mission management.' },
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
function BudgetNotes({ owner }: { owner: string }) {
  const pool = AREA_FUNDING[owner];
  const totals = programmeFundingTotal(rowsFor(owner).map(n => n.id));
  return (
    <details className="market-budget-context market-calculation market-budget-notes" key={`totals-${owner}`}>
      <summary>Budget notes <ChevronRight size={14} /></summary>
      <div className="market-budget-row"><span>{owner === 'mod' ? 'Other Equipment funding pool' : 'Relevant funding pool'}</span><div><span>{formatCrore(pool.crore)}</span><SourceButton claimIds={pool.claimIds} title={`${owner} · funding pool`} /></div><small>{pool.period}</small></div>
      <p>{pool.scope}</p>
      <div className="market-budget-row"><span>Programme total · gross</span><div><span>{totals.counted ? formatCrore(totals.total, totals.qualifier) : 'Value undisclosed'}</span>{totals.claimIds.length > 0 && <SourceButton claimIds={totals.claimIds} title={`${owner} · programme total`} />}</div></div>
      <dl><div><dt>Contracted · reported</dt><dd>{totals.contracted ? formatCrore(totals.contracted) : 'None identified'}</dd></div><div><dt>Sanctioned · disclosed</dt><dd>{totals.sanctioned ? formatCrore(totals.sanctioned) : 'None identified'}</dd></div><div><dt>Estimates / reported values</dt><dd>{totals.estimated ? formatCrore(totals.estimated, totals.qualifier) : 'None identified'}</dd></div></dl>
      <p>{totals.counted} valued programmes included · {totals.undisclosed} undisclosed{totals.overlapping > 0 && ` · ${totals.overlapping} potentially overlapping pipeline included`}. Undisclosed values are not zero.</p>
      {rowsFor(owner).filter(n => PROGRAMME_FUNDING[n.id]?.overlapNote).map(n => <p key={n.id}>{n.title}: {PROGRAMME_FUNDING[n.id].overlapNote}</p>)}
      <p>Programme values span mixed periods. Do not add them to annual funding pools or interpret them as Shield revenue.</p>
    </details>
  );
}
export default function Money() {
  const [area, setArea] = useState('mod');
  const { openEvidence } = useStore();
  const owner = AREAS.find(a => a.id === area)!;
  const programmes = rowsFor(area);
  const pool = AREA_FUNDING[area];
  const totals = programmeFundingTotal(programmes.map(n => n.id));
  return <section className="market-page" data-testid="market-page">
    <Headline title="Where is India investing in defence capability?" sub="Programmes, procurement activity and capability needs across defence and security." />
    <div className="market-workspace market-workspace--references">
      <nav className="market-area-list" aria-label="Market opportunity areas">
        <div className="market-eyebrow market-area-label">Opportunity areas</div>
        {AREAS.map((a, i) => <button key={a.id} data-testid={`market-area-${a.id}`} aria-pressed={area === a.id} onClick={() => setArea(a.id)} className={area === a.id ? 'selected' : ''}><span className="market-area-number">{String(i + 1).padStart(2, '0')}</span><span><strong>{a.title}</strong><small className="market-area-amount">{formatCrore(AREA_FUNDING[a.id].crore)}</small></span><ChevronRight size={14} /></button>)}
      </nav>
      <div className="market-programme-panel">
        <header><span className="market-eyebrow">{owner.title}</span><h2>Programmes & capability needs</h2><p>{owner.intro}</p></header>
        <div className="market-budget-strip" aria-label="Funding summary">
          <div data-testid="market-pool-summary"><span>{area === 'mod' ? 'Other Equipment funding pool' : 'Relevant funding pool'} <SourceButton claimIds={pool.claimIds} title={`${owner.title} · funding pool`} /></span><strong>{formatCrore(pool.crore)}</strong><small>{pool.period}</small></div>
          <div data-testid="market-programme-totals"><span>Programme total · gross {totals.claimIds.length > 0 && <SourceButton claimIds={totals.claimIds} title={`${owner.title} · programme total`} />}</span><strong className={totals.counted ? '' : 'is-undisclosed'}>{totals.counted ? formatCrore(totals.total, totals.qualifier) : 'Value undisclosed'}</strong><small>{totals.counted ? (totals.overlapping ? 'Sum of shown values · overlap possible' : 'Sum of shown values · mixed periods') : 'No disclosed programme values'}</small></div>
        </div>
        <div className="market-programme-grid" aria-label={`${owner.title} programmes`}>
          {programmes.map(n => {
            const funding = PROGRAMME_FUNDING[n.id];
            const claimIds = [...new Set([...n.claimIds, ...(funding?.claimIds ?? [])])];
            return <button type="button" key={n.id} data-testid={`market-programme-${n.id}`} className="market-programme-card" aria-label={`${programmeTitle(n)} — show references`} onClick={() => openEvidence(claimIds, programmeTitle(n))}>
              <span className={`market-status ${n.cls}`}>{status(n)}</span>
              <strong>{programmeTitle(n)}</strong>
              <span className="market-card-footer"><span className={`market-programme-amount ${funding ? '' : 'is-undisclosed'}`}>{funding ? formatCrore(funding.crore, funding.qualifier) : 'Value undisclosed'}</span><span className="market-card-references"><FileText size={13} /> References <span>{claimIds.length}</span></span></span>
            </button>;
          })}
        </div>
        <BudgetNotes key={area} owner={area} />
      </div>
    </div>
  </section>;
}
