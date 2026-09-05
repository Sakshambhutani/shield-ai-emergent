import { useEffect, useState } from 'react';
import { ArrowRight, FileText, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Headline, Pill, Screen } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { useStore } from '@/store';
import { ACCOUNTS_V2, ACCOUNT_MAP_V2, ANALOGUES, CUSTOMER_PROGRAMMES, PLATFORMS, PLATFORM_MAP, WATCH_ACCOUNTS, type Domain, type Platform, type Posture } from '@/data/platform-ecosystem';
import './buyers.css';

type Tab = 'product' | 'customer' | 'platform';
const DOMAINS: { id: Domain; label: string }[] = [{ id: 'air', label: 'Air' }, { id: 'maritime', label: 'Maritime' }, { id: 'weapons', label: 'Weapons' }, { id: 'systems', label: 'Sensors / systems' }];
const SATELLITES = [[20, 23], [50, 15], [80, 23], [80, 68], [50, 76], [20, 68]];
const postureTone = (p: Posture): 'green' | 'blue' | 'amber' | 'grey' | 'neutral' => p === 'PURSUE' ? 'green' : p === 'CO-DEVELOP' ? 'blue' : p === 'SHAPE' || p === 'COMPLEMENT' ? 'amber' : p === 'WATCH' || p === 'DEPRIORITISE' ? 'grey' : 'neutral';

function EvidenceDot({ claimIds, title }: { claimIds: string[]; title: string }) {
  const { openEvidence } = useStore();
  return <button className="account-source-dot" aria-label={`Sources for ${title}`} title="Sources & assumptions" onClick={(e) => { e.stopPropagation(); openEvidence(claimIds, title); }}><FileText size={10} /></button>;
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
  const f = platform.shieldFit[0];
  const analogue = f.analogueId ? ANALOGUES[f.analogueId] : null;
  const rows = [['Mission', platform.mission], ['Government user', platform.endUser], ['Programme pathway', platform.pathway], ['Platform maturity', platform.maturity], ['Existing autonomy', platform.existingAutonomy], ['Shield insertion', `${f.product} · ${f.insertionPoint}`], ['Why now', platform.whyNow], ['What could block it', platform.blocker], ['Next decision', platform.nextDecision]];
  return <aside className="platform-drawer" data-testid="platform-drawer" aria-label={`${platform.name} opportunity detail`}>
    <div className="platform-drawer-head"><div><span>{ACCOUNT_MAP_V2[platform.accountId].name} · opportunity cell</span><h2>{platform.name}</h2></div><button aria-label="Close platform detail" onClick={onClose}><X size={17} /></button></div>
    <div className="drawer-signals"><Pill tone={postureTone(platform.strategicPosture)}>{platform.strategicPosture}</Pill><Pill>{platform.architectureOpenness} openness</Pill><Pill>{platform.confidence} confidence</Pill></div>
    <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    {analogue && <div className="drawer-analogue"><span>Global precedent</span><strong>{analogue.label}</strong><p>{analogue.lesson}</p><SourceButton claimIds={analogue.claimIds} title={analogue.label} size="xs" /></div>}
    <SourceButton claimIds={platform.claimIds} title={`${ACCOUNT_MAP_V2[platform.accountId].name} · ${platform.name}`} className="drawer-source-link" />
  </aside>;
}

function EcosystemView() {
  const { mode } = useStore();
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
  return <div className="ecosystem-shell">
    <div className="ecosystem-toolbar"><div className="ecosystem-legend"><span><i className="priority-dot" />priority</span><span><i className="source-dot" />source</span><span>posture = hypothesis</span></div><button data-testid="why-not-toggle" className={cn('why-not-toggle', whyNot && 'active')} disabled={mode !== 'explore'} title={mode !== 'explore' ? 'Available in Explore mode' : undefined} onClick={() => { setWhyNot(!whyNot); setAccountId(null); setPlatformId(null); }}>Why not now?</button></div>
    <div className="ecosystem-workspace"><div className={cn('ecosystem-canvas', account && 'account-active', platform && 'platform-active')} data-testid="ecosystem-canvas">
      {!platform && <>
        {DOMAINS.map((d) => <div key={d.id} className={`domain-region domain-${d.id}`}><span>{d.label}</span></div>)}
        <svg className="account-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{account && platforms.map((p, i) => <line key={p.id} x1="50" y1="46" x2={SATELLITES[i][0]} y2={SATELLITES[i][1]} />)}</svg>
        {ACCOUNTS_V2.map((a) => { const active = a.id === accountId; return <div key={a.id} role="button" tabIndex={0} aria-pressed={active} data-testid={`ecosystem-account-${a.id}`} className={cn('ecosystem-node', `priority-${a.priority}`, active && 'active', account && !active && 'dimmed')} style={{ left: `${active ? 50 : a.x}%`, top: `${active ? 46 : a.y}%` }} onClick={() => selectAccount(a.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && selectAccount(a.id)}><strong>{a.name}</strong><small>{a.posture}</small><EvidenceDot claimIds={a.claimIds} title={a.name} /></div>; })}
        {!account && <button className="watch-cluster" data-testid="watch-cluster" disabled={mode !== 'explore'} title={mode !== 'explore' ? 'Open Explore mode to inspect' : undefined} onClick={() => setWhyNot(true)}><strong>+7</strong><span>Watch / incumbent autonomy</span></button>}
        {account && platforms.map((p, i) => <div key={p.id} role="button" tabIndex={0} data-testid={`platform-node-${p.id}`} className="platform-satellite" style={{ left: `${SATELLITES[i][0]}%`, top: `${SATELLITES[i][1]}%` }} onClick={() => setPlatformId(p.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPlatformId(p.id)}><strong>{p.name}</strong><span>{p.maturity}</span><small>{p.shieldFit[0]?.product ?? 'Discovery'}</small><EvidenceDot claimIds={p.claimIds} title={`${account.name} · ${p.name}`} /></div>)}
        {whyNot && <div className="why-not-layer" data-testid="why-not-view">{WATCH_ACCOUNTS.map((a) => <div className="why-not-node" key={a.id}><div><strong>{a.name}</strong><Pill tone={postureTone(a.posture)}>{a.posture}</Pill></div><span>{a.reason}</span><EvidenceDot claimIds={a.claimIds} title={a.name} /></div>)}</div>}
      </>}
      {platform && <OpportunityChain platform={platform} onBack={() => setPlatformId(null)} />}
    </div>{platform && <PlatformDrawer platform={platform} onClose={() => setPlatformId(null)} />}</div>
    <p className="ecosystem-caption">Government pull <span>×</span> platform value <span>×</span> architectural openness <span>×</span> genuine Shield gap</p>
  </div>;
}

const PRODUCT_GROUPS: Record<string, { label: string; ids: string[] }[]> = {
  Hivemind: [{ label: 'Best insertion', ids: ['grse', 'bel'] }, { label: 'Strategic shape', ids: ['hal', 'bdl', 'kssl', 'mdl'] }, { label: 'Partner / competitor', ids: ['newspace'] }, { label: 'Incumbent / low priority', ids: ['lt', 'adani', 'ideaforge', 'raphe', 'ayaan'] }],
  Tracker: [{ label: 'Best insertion', ids: ['bel', 'paras'] }, { label: 'Validate', ids: ['bdl'] }, { label: 'Low relevance', ids: ['grse', 'hal', 'mdl'] }],
  Vision: [{ label: 'Best insertion', ids: ['bel', 'paras', 'grse'] }, { label: 'Validate', ids: ['hal', 'kssl'] }, { label: 'Low relevance', ids: ['bdl', 'newspace'] }],
  Aechelon: [{ label: 'Development gap', ids: ['hal', 'newspace'] }, { label: 'Validate', ids: ['bel', 'bdl'] }, { label: 'Monitor', ids: ['grse', 'mdl'] }],
};

function ProductView() {
  const [product, setProduct] = useState('Hivemind');
  const name = (id: string) => ACCOUNTS_V2.find((a) => a.id === id)?.name ?? WATCH_ACCOUNTS.find((a) => a.id === id)?.name ?? id;
  return <div className="product-view-v2"><div className="product-rail">{Object.keys(PRODUCT_GROUPS).map((p) => <button key={p} className={cn(product === p && 'active')} onClick={() => setProduct(p)}>{p}</button>)}</div><div className="product-rings" data-testid="product-rings"><div className="product-centre"><span>Shield product</span><strong>{product}</strong></div>{PRODUCT_GROUPS[product].map((g, i) => <section key={g.label} className={`product-ring ring-${i}`}><h3>{g.label}</h3><div>{g.ids.map((id) => <span key={id}>{name(id)}</span>)}</div></section>)}</div></div>;
}

function CustomerView() {
  const [customer, setCustomer] = useState<keyof typeof CUSTOMER_PROGRAMMES>('navy');
  const labels = { navy: 'Indian Navy', army: 'Indian Army', airforce: 'Indian Air Force' };
  return <div className="customer-view-v2"><div className="customer-selector">{(Object.keys(labels) as (keyof typeof labels)[]).map((id) => <button key={id} className={cn(customer === id && 'active')} onClick={() => setCustomer(id)}>{labels[id]}</button>)}</div><div className="customer-map" data-testid="customer-map"><div className="customer-centre"><span>Government mission</span><strong>{labels[customer]}</strong></div>{CUSTOMER_PROGRAMMES[customer].map((p, i) => <div className={`customer-programme cp-${i}`} key={p.id}><span>{p.maturity}</span><strong>{p.name}</strong><small>{p.primes}</small><ArrowRight size={13} /><em>{p.insertion}</em><EvidenceDot claimIds={p.claimIds} title={`${labels[customer]} · ${p.name}`} /></div>)}</div><p className="ecosystem-caption">Government demand → programme → prime candidate → Shield insertion</p></div>;
}

export default function Buyers() {
  const [tab, setTab] = useState<Tab>('platform');
  const tabs: [Tab, string][] = [['product', 'By Shield product'], ['customer', 'By customer'], ['platform', 'By platform / prime']];
  return <Screen className="buyers-screen"><Headline title="Find the insertion point" sub="Sell into specific platforms where customer pull, value, openness and a real capability gap intersect." /><div className="buyers-topline"><div data-testid="buyers-tabs" className="buyers-tabs">{tabs.map(([id, label]) => <button key={id} data-testid={`tab-${id}`} aria-pressed={tab === id} onClick={() => setTab(id)} className={cn(tab === id && 'active')}>{label}</button>)}</div><div className="buyers-thesis"><span>B2B2G</span> Platform value × openness × customer pull</div></div>{tab === 'platform' && <EcosystemView />}{tab === 'product' && <ProductView />}{tab === 'customer' && <CustomerView />}</Screen>;
}
