import { useEffect, useState } from 'react';
import { ArrowRight, FileText, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ExploreNote, Field, Headline, HORIZON_META, Pill, Screen, SideDrawer } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { useStore } from '@/store';
import { ACCOUNTS_V2, ACCOUNT_MAP_V2, ANALOGUES, CUSTOMER_PROGRAMMES, PLATFORMS, PLATFORM_MAP, WATCH_ACCOUNTS, type Domain, type Platform, type Posture } from '@/data/platform-ecosystem';
import { OPPORTUNITIES } from '@/data/opportunities';
import { ACCOUNT_MAP } from '@/data/accounts';
import type { Opportunity } from '@/data/types';
import './buyers.css';

type Tab = 'universe' | 'product' | 'customer' | 'platform';
const DOMAINS: { id: Domain; label: string }[] = [{ id: 'air', label: 'Air' }, { id: 'maritime', label: 'Maritime' }, { id: 'weapons', label: 'Weapons' }, { id: 'systems', label: 'Sensors / systems' }];
const SATELLITES = [[20, 23], [50, 15], [80, 23], [80, 68], [50, 76], [20, 68]];
const postureTone = (p: Posture): 'green' | 'blue' | 'amber' | 'grey' | 'neutral' => p === 'PURSUE' ? 'green' : p === 'CO-DEVELOP' ? 'blue' : p === 'SHAPE' || p === 'COMPLEMENT' ? 'amber' : p === 'WATCH' || p === 'DEPRIORITISE' ? 'grey' : 'neutral';

function EvidenceDot({ claimIds, title }: { claimIds: string[]; title: string }) {
  const { openEvidence } = useStore();
  return <button className="account-source-dot" aria-label={`Sources for ${title}`} title="Sources & assumptions" onClick={(e) => { e.stopPropagation(); openEvidence(claimIds, title); }}><FileText size={10} /></button>;
}

const UNIVERSE_LANES = [
  { label: 'Air', ids: ['o-army-vbat', 'o-hal', 'o-male', 'o-cca'] },
  { label: 'Maritime', ids: ['o-navy-vbat', 'o-navy-hm', 'o-grse'] },
  { label: 'Weapons', ids: ['o-tasl', 'o-tracker'] },
  { label: 'Simulation / space', ids: ['o-aechelon', 'o-space'] },
];
const UNIVERSE_HORIZON = { execute: 'Active / near-term', build: 'Emerging', seed: 'Future' };

function OpportunityDrawer({ item, onClose }: { item: Opportunity | null; onClose: () => void }) {
  return <SideDrawer open={!!item} onClose={onClose} title={item?.title ?? ''} eyebrow="Bottom-up opportunity" testId="opportunity-drawer" width="sm:w-[500px]">
    {item && <div className="space-y-5 stagger">
      <div className="flex items-center gap-2"><Pill tone={HORIZON_META[item.horizon].tone}>{HORIZON_META[item.horizon].label}</Pill><SourceButton claimIds={item.claimIds} title={item.title} /></div>
      <Field label="Programme universe"><span className={item.programmeValue.includes('₹') ? 'font-mono text-sig-amber' : 'text-paper-2'}>{item.programmeValue}</span><div className="text-[10px] text-paper-3 mt-1">{item.valueTag}</div></Field>
      <Field label="Government mission">{item.mission}</Field>
      <Field label="Shield wedge"><div className="flex flex-wrap gap-1 mt-1">{item.product.map((p) => <Pill key={p} tone="blue">{p}</Pill>)}</div></Field>
      <div className="grid grid-cols-2 gap-4"><Field label="Customer">{item.buyer}</Field><Field label="Prime / route">{item.prime ?? 'To validate'}</Field></div>
      <Field label="Interpretation">{item.note}</Field>
      <div className="border-t border-line pt-3 text-[10px] font-mono text-paper-3">Programme scale is not assumed to equal Shield-addressable revenue.</div>
    </div>}
  </SideDrawer>;
}

function UniverseView() {
  const { mode } = useStore();
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const lookup = (id: string) => OPPORTUNITIES.find((o) => o.id === id)!;
  return <div className="universe-view" data-testid="opportunity-universe">
    <div className="universe-legend"><span>Cell width = relative programme universe</span><span>Value shown only where sourced</span><span>Prioritisation follows in 03</span></div>
    <div className="universe-lanes">{UNIVERSE_LANES.map((lane) => <section key={lane.label} className="universe-lane"><h3>{lane.label}</h3><div>{lane.ids.filter((id) => mode === 'explore' || id !== 'o-space').map((id) => { const o = lookup(id); return <button key={id} data-testid={`universe-${id}`} onClick={() => setSelected(o)} className={cn('universe-cell', `universe-size-${Math.min(5, o.size)}`)}><span>{UNIVERSE_HORIZON[o.horizon]}</span><strong>{o.short}</strong><small>{o.programmeValue}</small><em>{o.product.slice(0, 2).join(' + ')}</em></button>; })}</div></section>)}</div>
    <p className="ecosystem-caption"><span>Bottom-up</span> mission → programme → platform → Shield wedge</p>
    <OpportunityDrawer item={selected} onClose={() => setSelected(null)} />
  </div>;
}

function OpportunityChain({ platform, onBack }: { platform: Platform; onBack: () => void }) {
  const fit = platform.shieldFit[0];
  const steps = [
    { over: 'Government mission', main: platform.endUser, sub: platform.mission },
    { over: 'Programme', main: platform.programme, sub: platform.pathway },
    { over: 'Platform prime', main: ACCOUNT_MAP_V2[platform.accountId].name, sub: platform.name },
    { over: 'Current architecture', main: platform.autonomyIncumbent, sub: platform.existingAutonomy },
    { over: 'Shield insertion', main: fit.product, sub: fit.insertionPoint, shield: true },
    { over: 'Next decision', main: platform.nextDecision, sub: 'Management action' },
  ];
  return <div className="opportunity-path" data-testid="opportunity-chain">
    <button className="path-back" onClick={onBack}>← {ACCOUNT_MAP_V2[platform.accountId].name} platforms</button>
    <div className="path-track">{steps.map((step, i) => <div className="contents" key={step.over}>
      <div className={cn('path-step', step.shield && 'path-shield')}><span>{step.over}</span><strong>{step.main}</strong><small>{step.sub}</small>{step.shield && <Pill tone="purple">Hypothesis</Pill>}</div>
      {i < steps.length - 1 && <ArrowRight className="path-arrow" size={16} />}
    </div>)}</div>
  </div>;
}

function PlatformDrawer({ platform, onClose }: { platform: Platform; onClose: () => void }) {
  const [deeper, setDeeper] = useState(false);
  const f = platform.shieldFit[0];
  const analogue = f.analogueId ? ANALOGUES[f.analogueId] : null;
  const buyerAccount = platform.endUser.includes('Navy') ? ACCOUNT_MAP['a-navy'] : platform.endUser.includes('Air Force') ? ACCOUNT_MAP['a-iaf'] : platform.endUser.includes('Army') ? ACCOUNT_MAP['a-army'] : platform.endUser.includes('DRDO') || platform.endUser.includes('NSTL') ? ACCOUNT_MAP['a-drdo'] : null;
  const rows = [['Mission', platform.mission], ['Government user', platform.endUser], ['Programme pathway', platform.pathway], ['Platform maturity', platform.maturity], ['Existing autonomy', platform.existingAutonomy], ['Shield insertion', `${f.product} · ${f.insertionPoint}`], ['Why now', platform.whyNow], ['What could block it', platform.blocker], ['Next decision', platform.nextDecision]];
  return <aside className="platform-drawer" data-testid="platform-drawer" aria-label={`${platform.name} opportunity detail`}>
    <div className="platform-drawer-head"><div><span>{ACCOUNT_MAP_V2[platform.accountId].name} · opportunity cell</span><h2>{platform.name}</h2></div><button aria-label="Close platform detail" onClick={onClose}><X size={17} /></button></div>
    <div className="drawer-signals"><Pill tone={postureTone(platform.strategicPosture)}>{platform.strategicPosture}</Pill><Pill>{platform.architectureOpenness} openness</Pill><Pill>{platform.confidence} confidence</Pill></div>
    <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    {(platform.shieldFit.length > 1 || buyerAccount) && <button data-testid="platform-deeper" onClick={() => setDeeper(!deeper)} className="mt-4 text-[10px] text-sig-blue hover:underline">{deeper ? 'Hide deeper route' : 'Buyer chain & alternative wedges'}</button>}
    {deeper && <div className="mt-3 space-y-3 animate-rise">
      {platform.shieldFit.length > 1 && <div><div className="eyebrow">Alternative Shield wedges</div><div className="mt-1 space-y-1">{platform.shieldFit.slice(1).map((x) => <div key={x.product} className="text-[10px] text-paper-2"><span className="text-sig-blue">{x.product}</span> · {x.insertionPoint}</div>)}</div></div>}
      {buyerAccount && <div><div className="eyebrow">Decision chain · {buyerAccount.name}</div><div className="text-[9px] text-paper-3 mt-1">{buyerAccount.geography}</div><ol className="mt-2 space-y-1">{buyerAccount.chain?.map((x, i) => <li key={x.stage} className="rounded border border-line px-2 py-1.5 flex gap-2"><span className="font-mono text-[9px] text-paper-3">{i + 1}</span><div><div className="text-[10px] text-paper">{x.stage}</div><div className="text-[9px] text-paper-3">{x.who}</div></div></li>)}</ol></div>}
    </div>}
    {analogue && <div className="drawer-analogue"><span>Global precedent</span><strong>{analogue.label}</strong><p>{analogue.lesson}</p><SourceButton claimIds={analogue.claimIds} title={analogue.label} size="xs" /></div>}
    <SourceButton claimIds={platform.claimIds} title={`${ACCOUNT_MAP_V2[platform.accountId].name} · ${platform.name}`} className="drawer-source-link" />
  </aside>;
}

function EcosystemView() {
  const { mode, present } = useStore();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [platformId, setPlatformId] = useState<string | null>(null);
  const [whyNot, setWhyNot] = useState(false);
  const account = accountId ? ACCOUNT_MAP_V2[accountId] : null;
  const platform = platformId ? PLATFORM_MAP[platformId] : null;
  const platforms = account ? PLATFORMS.filter((p) => p.accountId === account.id).slice(0, 6) : [];
  const selectAccount = (id: string) => { setAccountId(accountId === id ? null : id); setPlatformId(null); setWhyNot(false); };
  useEffect(() => {
    const closeLocal = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (platformId) setPlatformId(null);
      else if (accountId) setAccountId(null);
      else if (whyNot) setWhyNot(false);
    };
    window.addEventListener('keydown', closeLocal);
    return () => window.removeEventListener('keydown', closeLocal);
  }, [accountId, platformId, whyNot]);
  useEffect(() => { if (present) { setAccountId(null); setPlatformId(null); setWhyNot(false); } }, [present]);
  return <div className="ecosystem-shell">
    <div className="ecosystem-toolbar"><div className="ecosystem-legend"><span><i className="source-dot" />source</span><span>{mode === 'explore' ? 'posture = management hypothesis' : 'click account → platform cells'}</span></div><button data-testid="why-not-toggle" className={cn('why-not-toggle', whyNot && 'active')} disabled={mode !== 'explore'} title={mode !== 'explore' ? 'Available in Explore mode' : undefined} onClick={() => { setWhyNot(!whyNot); setAccountId(null); setPlatformId(null); }}>Competitive ecosystem</button></div>
    <div className="ecosystem-workspace"><div className={cn('ecosystem-canvas', account && 'account-active', platform && 'platform-active')} data-testid="ecosystem-canvas">
      {!platform && <>
        {DOMAINS.map((d) => <div key={d.id} className={`domain-region domain-${d.id}`}><span>{d.label}</span></div>)}
        <svg className="account-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{account && platforms.map((p, i) => <line key={p.id} x1="50" y1="46" x2={SATELLITES[i][0]} y2={SATELLITES[i][1]} />)}</svg>
        {ACCOUNTS_V2.map((a) => { const active = a.id === accountId; return <div key={a.id} role="button" tabIndex={0} aria-pressed={active} data-testid={`ecosystem-account-${a.id}`} className={cn('ecosystem-node', mode === 'explore' && `priority-${a.priority}`, active && 'active', account && !active && 'dimmed')} style={{ left: `${active ? 50 : a.x}%`, top: `${active ? 46 : a.y}%` }} onClick={() => selectAccount(a.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && selectAccount(a.id)}><strong>{a.name}</strong><small>{mode === 'explore' ? a.posture : a.type}</small><EvidenceDot claimIds={a.claimIds} title={a.name} /></div>; })}
        {!account && <button className="watch-cluster" data-testid="watch-cluster" disabled={mode !== 'explore'} title={mode !== 'explore' ? 'Open Explore mode to inspect' : undefined} onClick={() => setWhyNot(true)}><strong>+7</strong><span>Incumbent / competitive ecosystem</span></button>}
        {account && platforms.map((p, i) => <div key={p.id} role="button" tabIndex={0} data-testid={`platform-node-${p.id}`} className="platform-satellite" style={{ left: `${SATELLITES[i][0]}%`, top: `${SATELLITES[i][1]}%` }} onClick={() => setPlatformId(p.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPlatformId(p.id)}><strong>{p.name}</strong><span>{p.maturity}</span><small>{p.shieldFit[0]?.product ?? 'Discovery'}</small><EvidenceDot claimIds={p.claimIds} title={`${account.name} · ${p.name}`} /></div>)}
        {whyNot && <div className="why-not-layer" data-testid="why-not-view">{WATCH_ACCOUNTS.map((a) => <div className="why-not-node" key={a.id}><div><strong>{a.name}</strong><Pill tone={postureTone(a.posture)}>{a.posture}</Pill></div><span>{a.reason}</span><EvidenceDot claimIds={a.claimIds} title={a.name} /></div>)}</div>}
      </>}
      {platform && <OpportunityChain platform={platform} onBack={() => setPlatformId(null)} />}
     </div>{platform && !present && <PlatformDrawer platform={platform} onClose={() => setPlatformId(null)} />}</div>
    <p className="ecosystem-caption">Government pull <span>×</span> platform value <span>×</span> architectural openness <span>×</span> genuine Shield gap</p>
  </div>;
}

const PRODUCT_GROUPS: Record<string, { claimIds: string[]; groups: { label: string; items: string[] }[] }> = {
  'V-BAT': { claimIds: ['c-vbat', 'c-army-select', 'c-rnln'], groups: [{ label: 'Active India route', items: ['Indian Army', 'JSW industrialisation'] }, { label: 'Maritime pathways', items: ['Indian Navy · NSUAS', 'Indian Coast Guard'] }] },
  Hivemind: { claimIds: ['c-hivemind-agnostic', 'c-army-sdk', 'c-catalyst'], groups: [{ label: 'Existing foundation', items: ['Army · Hivemind SDK'] }, { label: 'Platform integrations', items: ['HAL', 'BEL', 'GRSE', 'KSSL', 'MDL', 'BDL'] }, { label: 'Competitive overlap', items: ['NewSpace', 'Tata', 'ideaForge', 'Raphe', 'Ayaan'] }] },
  'ViDAR / Vision': { claimIds: ['c-vidar', 'c-vidar-usmc'], groups: [{ label: 'Maritime missions', items: ['Indian Navy', 'Indian Coast Guard', 'GRSE shipborne UAV'] }, { label: 'Systems integration', items: ['BEL', 'Paras', 'HAL HAPS'] }] },
  'Tracker C-UAS': { claimIds: ['c-tracker-l3h', 'c-cuas-aon'], groups: [{ label: 'Force protection', items: ['Indian Army', 'Indian Air Force'] }, { label: 'Prime integration', items: ['BEL', 'Paras', 'BDL'] }] },
  Aechelon: { claimIds: ['c-aechelon'], groups: [{ label: 'Simulation / T&E', items: ['DRDO / ADE', 'Indian Air Force', 'HAL', 'NewSpace'] }] },
  'X-BAT': { claimIds: ['c-xbat', 'c-cca'], groups: [{ label: 'Future airpower shaping', items: ['Indian Air Force · CCA', 'HAL future-airpower ecosystem'] }, { label: 'Horizon', items: ['Long-term · requirement shaping'] }] },
  Benchmark: { claimIds: [], groups: [{ label: 'Unvalidated India possibility', items: ['Indian Air Force training analytics'] }] },
};

function ProductView() {
  const { mode } = useStore();
  const [product, setProduct] = useState('V-BAT');
  useEffect(() => { if (mode === 'story' && product === 'Benchmark') setProduct('V-BAT'); }, [mode, product]);
  const products = Object.keys(PRODUCT_GROUPS).filter((p) => mode === 'explore' || p !== 'Benchmark');
  const selected = PRODUCT_GROUPS[product];
  return <div className="product-view-v2"><div className="product-rail">{products.map((p) => <button key={p} data-testid={`product-${p.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className={cn(product === p && 'active')} onClick={() => setProduct(p)}>{p}</button>)}</div><div className="product-rings" data-testid="product-rings"><div className="product-centre"><span>Shield product</span><strong>{product}</strong>{selected.claimIds.length > 0 && <SourceButton claimIds={selected.claimIds} title={product} size="xs" />}</div>{selected.groups.map((g, i) => <section key={g.label} className={`product-ring ring-${i}`}><h3>{g.label}</h3><div>{g.items.map((item) => <span key={item}>{item}</span>)}</div></section>)}</div></div>;
}

function CustomerView() {
  const { mode } = useStore();
  const [customer, setCustomer] = useState<keyof typeof CUSTOMER_PROGRAMMES>('navy');
  const labels: Record<keyof typeof CUSTOMER_PROGRAMMES, string> = { navy: 'Indian Navy', army: 'Indian Army', airforce: 'Indian Air Force', coastguard: 'Coast Guard', drdo: 'DRDO / ADE', space: 'Military space' };
  const customers = (Object.keys(labels) as (keyof typeof labels)[]).filter((id) => mode === 'explore' || ['navy', 'army', 'airforce'].includes(id));
  useEffect(() => { if (mode === 'story' && !['navy', 'army', 'airforce'].includes(customer)) setCustomer('navy'); }, [mode, customer]);
  return <div className="customer-view-v2"><div className="customer-selector">{customers.map((id) => <button key={id} className={cn(customer === id && 'active')} onClick={() => setCustomer(id)}>{labels[id]}</button>)}</div><div className="customer-map" data-testid="customer-map"><div className="customer-centre"><span>Government mission</span><strong>{labels[customer]}</strong></div>{CUSTOMER_PROGRAMMES[customer].map((p, i) => <div className={`customer-programme cp-${i}`} key={p.id}><span>{p.maturity}</span><strong>{p.name}</strong><small>{p.primes}</small><ArrowRight size={13} /><em>{p.insertion}</em><EvidenceDot claimIds={p.claimIds} title={`${labels[customer]} · ${p.name}`} /></div>)}</div><p className="ecosystem-caption">Government demand → programme → prime candidate → Shield insertion</p></div>;
}

export default function Buyers() {
  const [tab, setTab] = useState<Tab>('universe');
  const tabs: [Tab, string][] = [['universe', 'Opportunity universe'], ['product', 'By Shield product'], ['customer', 'By customer'], ['platform', 'By platform / prime']];
  return <Screen className="buyers-screen"><Headline title="Where Shield AI can win in India" sub="See the size and shape of the bottom-up possibility before Section 03 determines where to focus." /><ExploreNote>Explore reveals competitive posture, platform confidence and alternate customer or product routes.</ExploreNote><div className="buyers-topline"><div data-testid="buyers-tabs" className="buyers-tabs">{tabs.map(([id, label]) => <button key={id} data-testid={`tab-${id}`} aria-pressed={tab === id} onClick={() => setTab(id)} className={cn(tab === id && 'active')}>{label}</button>)}</div><div className="buyers-thesis"><span>BOTTOM-UP</span> Programme universe × insertion point</div></div>{tab === 'universe' && <UniverseView />}{tab === 'platform' && <EcosystemView />}{tab === 'product' && <ProductView />}{tab === 'customer' && <CustomerView />}</Screen>;
}
