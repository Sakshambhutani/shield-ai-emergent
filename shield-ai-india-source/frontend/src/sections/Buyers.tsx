import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Field, Headline, Pill, Screen, SideDrawer } from '@/components/ui';
import { useStore } from '@/store';
import { PLATFORMS, CUSTOMER_PROGRAMMES, ACCOUNTS_V2 } from '@/data/platform-ecosystem';
import { CLAIM_MAP } from '@/data/claims';
import { SOURCE_MAP } from '@/data/sources';
import { OPPORTUNITY_ARENAS, type OpportunityArena } from '@/data/opportunity-landscape';
import './opportunity-landscape.css';

function ResearchDrawer({ arena, onClose }: { arena: OpportunityArena | null; onClose: () => void }) {
  const platforms = PLATFORMS.filter((item) => arena?.accounts.includes(item.accountId));
  const programmes = (arena?.programmes ?? []).flatMap((customer) => (CUSTOMER_PROGRAMMES[customer] ?? []).map((item) => ({ ...item, customer })));
  const claimIds = [...new Set([...(arena?.claimIds ?? []), ...platforms.flatMap((item) => item.claimIds), ...programmes.flatMap((item) => item.claimIds)])];
  const claims = claimIds.map((id) => CLAIM_MAP[id]).filter((claim) => claim && claim.cls !== 'modelled');
  const sources = [...new Set(claims.flatMap((claim) => claim.sourceIds))].map((id) => SOURCE_MAP[id]).filter(Boolean);
  return <SideDrawer open={!!arena} onClose={onClose} title={arena?.title ?? ''} eyebrow="Opportunity landscape · Research" testId="opportunity-research-drawer" width="sm:w-[560px]">
    {arena && <div className="space-y-5">
      <div className="flex gap-2"><Pill tone={arena.route === 'direct' ? 'blue' : 'purple'}>{arena.route === 'direct' ? 'B2G Direct' : 'B2B2G'}</Pill><Pill>{arena.horizon}</Pill></div>
      <p className="text-sm text-paper-2 leading-relaxed">{arena.context}</p>
      <Field label="Potential Shield route">{arena.shield}</Field>
      {arena.examples && <Field label="Example customers / partners">{arena.examples}</Field>}
      {programmes.length > 0 && <section><h3 className="eyebrow mb-3">Customer / programme research</h3><div className="space-y-3">{programmes.map((item) => <article key={`${item.customer}-${item.id}`} className="panel p-3 space-y-2"><h4 className="text-sm font-medium">{item.name}</h4><p className="text-xs text-paper-3">{item.customer.toUpperCase()} · {item.maturity}</p><Field label="Platform / prime context">{item.primes}</Field><Field label="Possible insertion">{item.insertion}</Field></article>)}</div></section>}
      {platforms.length > 0 && <section><h3 className="eyebrow mb-3">Existing platforms & potential partners</h3><div className="space-y-3">{platforms.map((item) => <article key={item.id} className="panel p-3 space-y-2"><h4 className="text-sm font-medium">{ACCOUNTS_V2.find((account) => account.id === item.accountId)?.name} · {item.name}</h4><p className="text-xs text-paper-2">{item.mission}</p><Field label="User / programme">{item.endUser} · {item.programme}</Field><Field label="Research signal / pathway">{item.maturity} · {item.pathway}</Field><Field label="Current autonomy">{item.existingAutonomy}</Field><Field label="Possible Shield fit">{item.shieldFit.map((fit) => `${fit.product}: ${fit.insertionPoint}`).join(' · ')}</Field><p className="text-xs text-paper-3">To validate: {item.blocker}</p></article>)}</div></section>}
      <section><h3 className="eyebrow mb-3">Evidence & procurement context</h3><div className="space-y-3">{claims.map((claim) => <div key={claim.id} className="border-l border-line pl-3"><h4 className="text-xs text-paper-2">{claim.label}</h4><p className="text-xs text-paper-3 mt-1">{claim.interpretation}</p></div>)}</div></section>
      <section><h3 className="eyebrow mb-3">Supporting sources</h3><div className="space-y-3">{sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="block text-xs text-sig-blue hover:underline">{source.title}<ExternalLink className="inline ml-1 h-3 w-3" /><span className="block text-paper-3 mt-1">{source.publisher} · {source.date}</span></a>)}</div></section>
    </div>}
  </SideDrawer>;
}

const RADAR_NODES = [
  { id: 'army', title: 'Army Tactical ISR', sub: 'V-BAT + Hivemind · current foothold', x: 50, y: 87, horizon: 'Now' },
  { id: 'maritime-isr', title: 'Maritime ISR', sub: 'Navy · Coast Guard', x: 23, y: 48, horizon: 'Next' },
  { id: 'control', title: 'Mission & Control Layer', sub: 'Orchestration · common control', x: 27, y: 67, horizon: 'Next' },
  { id: 'strategic', title: 'Strategic Direct Programmes', sub: 'Air Force · tri-service · advanced autonomy', x: 21, y: 20, horizon: 'Future' },
  { id: 'airborne', title: 'Large Airborne Platforms', sub: 'MALE · HAPS · CCA', x: 79, y: 46, horizon: 'Next' },
  { id: 'maritime-autonomy', title: 'Maritime Autonomy', sub: 'Shipbuilders · naval primes', x: 75, y: 70, horizon: 'Next' },
  { id: 'integrators', title: 'Systems & C2', sub: 'BEL · integrators', x: 59, y: 25, horizon: 'Next' },
  { id: 'space', title: 'Space Autonomy', sub: 'Defence Space · satellite OEMs', x: 83, y: 19, horizon: 'Future' },
];

export default function Buyers() {
  const { mode, present } = useStore();
  const [selected, setSelected] = useState<OpportunityArena | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const explore = mode === 'explore' && !present;
  useEffect(() => { setSelected(null); }, [mode, present]);
  const closeResearch = () => { setSelected(null); lastTrigger.current?.focus(); };
  const openResearch = (id: string) => { lastTrigger.current = document.activeElement as HTMLElement; setSelected(OPPORTUNITY_ARENAS.find((arena) => arena.id === id) ?? null); };

  return <Screen className="opportunity-landscape">
    <Headline title="Where can Shield AI play and through which routes?" sub="Product fit and direct government or platform-partner routes for Hivemind, V-BAT, ViDAR and Aechelon." />
    <div className="radar-body" data-testid={explore ? 'opportunity-explore' : 'opportunity-story'}>
      <div className="opportunity-radar" data-testid="opportunity-landscape-map" aria-label="Opportunity radar: B2G Direct on the left, B2B2G on the right; Now at the foothold, Next on the middle arcs, Future on the outer arc">
        <div className="radar-routes"><h2>B2G Direct</h2><h2>B2B2G <span>/ Platform Route</span></h2></div>
        <div className="radar-field">
          <svg className="radar-geometry" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
            <defs><radialGradient id="radar-glow" cx="50%" cy="90%" r="50%"><stop offset="0%" stopColor="#3B82F6" stopOpacity=".13" /><stop offset="65%" stopColor="#3B82F6" stopOpacity="0" /></radialGradient></defs>
            <rect width="1200" height="560" fill="url(#radar-glow)" />
            <path className="radar-arc radar-outer" d="M 70 40 A 530 480 0 0 0 1130 40" />
            <path className="radar-arc" d="M 220 180 A 380 340 0 0 0 980 180" />
            <path className="radar-arc radar-inner" d="M 390 330 A 210 190 0 0 0 810 330" />
            <path className="radar-divider" d="M 600 30 L 600 520" />
          </svg>
          <div className="radar-horizon radar-horizon-now">Now</div>
          <div className="radar-horizon radar-horizon-next">Next</div>
          <div className="radar-horizon radar-horizon-future">Future</div>
          {RADAR_NODES.map((node) => {
            const content = <><h3>{node.title}</h3><p>{node.sub}</p></>;
            const className = `radar-node radar-node-${node.horizon.toLowerCase()} radar-node-${node.id}`;
            const style = { left: `${node.x}%`, top: `${node.y}%` };
            return explore ? <button key={node.id} data-testid={`arena-${node.id}`} className={className} style={style} onClick={() => openResearch(node.id)} aria-label={`Explore ${node.title}`}>{content}</button>
              : <article key={node.id} data-testid={`arena-${node.id}`} className={className} style={style}>{content}</article>;
          })}
        </div>
      </div>
    </div>
    {explore && <p className="radar-caption">Select an opportunity to explore the research. Horizons show proximity, not priority.</p>}
    <ResearchDrawer arena={selected} onClose={closeResearch} />
  </Screen>;
}
