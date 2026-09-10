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
      <div className="flex gap-2"><Pill tone={arena.route === 'direct' ? 'blue' : 'purple'}>{arena.route === 'direct' ? 'B2G' : arena.route === 'psu' ? 'PSU' : 'B2B2G'}</Pill><Pill>{arena.horizon}</Pill></div>
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
  { id: 'maritime-isr', title: 'Indian Navy · Coast Guard', sub: 'Shipborne ISR · Maritime surveillance', x: 11, y: 14, established: false },
  { id: 'airforce', title: 'Indian Air Force', sub: 'Aircraft autonomy · Teaming · Training', x: 35.5, y: 16, established: false },
  { id: 'army', title: 'Indian Army', sub: 'ISR · V-BAT · Hivemind', x: 12.5, y: 44, established: true },
  { id: 'airborne', title: 'Aircraft & UAV OEMs', sub: 'Onboard autonomy · Aircraft integration', x: 64, y: 14, established: false },
  { id: 'integrators', title: 'Defence primes', sub: 'Mission systems · Command & control', x: 89.5, y: 14, established: false },
];

const EXPLORATION_AREAS = [
  'Simulation & training integrators · Aechelon',
  'India engineering for global programmes',
  'Collaborative aircraft & swarms',
  'Surface & undersea autonomy',
  'Space autonomy',
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
    <Headline title="India go-to-market ecosystem" sub="Government customers and industry partners for ISR, autonomy and simulation." />
    <div className="radar-body" data-testid={explore ? 'opportunity-explore' : 'opportunity-story'}>
      <div className="opportunity-radar" data-testid="opportunity-landscape-map" aria-label="Opportunity radar: government customers on the left and industry partners on the right, connected to Shield AI India; areas to explore at the lower right">
        <div className="radar-routes"><h2>Government customers</h2><h2>Industry partners</h2></div>
        <div className="radar-field">
          <svg className="radar-geometry" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <radialGradient id="radar-glow" cx="48%" cy="90%" r="43%">
                <stop offset="0%" stopColor="#299fff" stopOpacity=".2" />
                <stop offset="75%" stopColor="#1471ae" stopOpacity=".025" />
                <stop offset="100%" stopColor="#1471ae" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="radar-sweep" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#359ee9" stopOpacity=".19" />
                <stop offset="100%" stopColor="#359ee9" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="radar-glow-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="75%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </linearGradient>
              <mask id="radar-glow-mask"><rect width="1200" height="560" fill="url(#radar-glow-fade)" /></mask>
            </defs>
            <rect width="1200" height="560" fill="url(#radar-glow)" mask="url(#radar-glow-mask)" />
            <path d="M 570 504 L 435 120 A 370 370 0 0 1 715 125 Z" fill="url(#radar-sweep)" />
            {[90, 140, 190, 215, 265, 330, 395].map((radius, i) =>
              <path key={radius} className={`radar-arc ${i % 2 ? 'radar-arc-dashed' : ''}`} d={`M ${570-radius} 504 A ${radius} ${radius} 0 0 1 ${570+radius} 504`} />
            )}
            <path className="radar-divider" d="M 570 504 V 88" />
            <path className="radar-branch" d="M 132 78 C 135 330 310 431 600 504 M 426 90 C 425 277 456 401 600 504 M 768 78 C 765 269 718 399 600 504 M 1074 78 C 1074 205 860 180 860 280 C 860 390 740 455 600 504" />
            {[[348, 330], [420, 215], [660, 350], [738, 186], [366, 241]].map(([x,y]) => <path key={`${x}-${y}`} className="radar-blip-cross" d={`M ${x-3} ${y} h 6 M ${x} ${y-3} v 6`} />)}
            {[[422, 362], [495, 302], [478, 179], [820, 350]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} className="radar-blip" cx={cx} cy={cy} r="2" />)}
          </svg>
          <article className="radar-node radar-foundation"><h3>Shield AI India</h3></article>
          {RADAR_NODES.map((node) => {
            const content = <><h3>{node.title}</h3><p>{node.sub}</p></>;
            const className = `radar-node ${node.established ? 'radar-node-established' : ''} radar-node-${node.id}`;
            const style = { left: `${node.x}%`, top: `${node.y}%` };
            return explore ? <button key={node.id} data-testid={`arena-${node.id}`} className={className} style={style} onClick={() => openResearch(node.id)} aria-label={`Explore ${node.title}`}>{content}</button>
              : <article key={node.id} data-testid={`arena-${node.id}`} className={className} style={style}>{content}</article>;
          })}
          <div className="radar-exploration-anchor">
            <div className="radar-explore-link" aria-hidden="true" />
          <aside className="radar-exploration" aria-label="Areas to explore">
            <h3>Areas to explore</h3>
            <ul>{EXPLORATION_AREAS.map((area) => <li key={area}><span>{area}</span><span aria-hidden="true">?</span></li>)}</ul>
          </aside>
          </div>
        </div>
      </div>
    </div>
    <ResearchDrawer arena={selected} onClose={closeResearch} />
  </Screen>;
}
