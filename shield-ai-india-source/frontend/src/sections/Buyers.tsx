import { useState } from 'react';
import { ArrowDown, MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Headline, Pill, Screen, accessTone, chainTone } from '@/components/ui';
import { SourceButton } from '@/components/Evidence';
import { PrecedentTag } from '@/components/AccountDrawer';
import { ACCOUNTS, ACCOUNT_MAP, PRODUCTS } from '@/data/accounts';
import { useStore } from '@/store';

type Tab = 'product' | 'customer' | 'oem';

function AccountChip({ id }: { id: string }) {
  const { setAccount } = useStore();
  const a = ACCOUNT_MAP[id];
  return (
    <button data-testid={`account-chip-${id}`} onClick={() => setAccount(id)} className="panel panel-hover px-3 py-2 text-left flex items-center gap-3 w-full">
      <div className="min-w-0 flex-1"><div className="text-sm font-medium truncate">{a.name}</div><div className="text-[11px] text-paper-3 truncate flex items-center gap-1"><MapPin className="h-3 w-3" />{a.city}</div></div>
      <Pill tone={accessTone(a.access)}>{a.access}</Pill>
    </button>
  );
}

function ProductView() {
  const [pid, setPid] = useState('hivemind');
  const p = PRODUCTS.find((x) => x.id === pid)!;
  return (
    <div className="grid md:grid-cols-4 gap-3 flex-1 min-h-0">
      <div className="flex flex-col gap-1">
        {PRODUCTS.map((x) => <button key={x.id} data-testid={`product-${x.id}`} onClick={() => setPid(x.id)} className={cn('text-left rounded px-3 py-2 text-sm transition-colors duration-200 border', pid === x.id ? 'bg-ink-3 border-sig-blue/60 text-paper' : 'border-transparent text-paper-2 hover:bg-ink-2')}>{x.name}</button>)}
      </div>
      <div className="md:col-span-3 grid md:grid-cols-2 gap-3 animate-rise" key={pid}>
        <div className="panel p-4">
          <div className="flex items-center justify-between"><span className="eyebrow">{p.name} · mission areas</span>{p.claimIds.length > 0 && <SourceButton claimIds={p.claimIds} title={p.name} size="xs" />}</div>
          <div className="mt-3 flex flex-col gap-1.5">{p.missions.map((m) => <div key={m} className="flex items-center gap-2 text-sm"><span className="h-px w-4 bg-sig-blue" />{m}</div>)}</div>
          {p.id === 'benchmark' && <div className="mt-3 text-xs text-paper-3 italic">India demand not publicly established — monitor only.</div>}
        </div>
        <div className="panel p-4"><div className="eyebrow mb-3">Likely accounts · click to inspect</div><div className="flex flex-col gap-1.5">{p.accounts.map((a) => <AccountChip key={a} id={a} />)}</div></div>
      </div>
    </div>
  );
}

function Chain({ id }: { id: string }) {
  const a = ACCOUNT_MAP[id];
  if (!a.chain) return <div className="text-xs text-paper-3">Decision chain not mapped for this account.</div>;
  return (
    <ol className="flex flex-col gap-1 stagger" data-testid={`decision-chain-${id}`}>
      {a.chain.map((c, i) => (
        <li key={c.stage} className="flex flex-col items-stretch">
          <div className="panel px-3 py-1.5 flex items-center gap-3">
            <div className="min-w-0 flex-1"><div className="text-xs font-medium">{c.stage}</div><div className="text-[11px] text-paper-2 truncate">{c.who}</div></div>
            <Pill tone={chainTone(c.label)}>{c.label}</Pill>
          </div>
          {i < a.chain!.length - 1 && <ArrowDown className="h-3 w-3 text-paper-3 self-center my-0.5" />}
        </li>
      ))}
    </ol>
  );
}

function CustomerView() {
  const { setAccount } = useStore();
  const [sel, setSel] = useState('a-army');
  const primary = ACCOUNTS.filter((a) => a.kind !== 'oem' && a.id !== 'a-icg');
  return (
    <div className="grid md:grid-cols-5 gap-3 flex-1 min-h-0">
      <div className="md:col-span-2 flex flex-col gap-1.5">
        <div className="eyebrow">Primary</div>
        {primary.map((a) => <button key={a.id} data-testid={`customer-${a.id}`} onClick={() => setSel(a.id)} className={cn('panel px-3 py-2 text-left flex items-center gap-2 transition-colors duration-200', sel === a.id && 'border-sig-blue/60 bg-ink-3')}><div className="flex-1 min-w-0"><div className="text-sm font-medium">{a.name}</div><div className="text-[11px] text-paper-3 truncate">{a.wedge}</div></div><Pill tone={accessTone(a.access)}>{a.access}</Pill></button>)}
        <div className="eyebrow mt-2">Secondary</div>
        <button data-testid="customer-a-icg" onClick={() => setSel('a-icg')} className={cn('panel px-3 py-2 text-left opacity-80', sel === 'a-icg' && 'border-sig-blue/60')}><div className="text-sm">Indian Coast Guard</div><div className="text-[11px] text-paper-3">After Navy reference · no general policing</div></button>
      </div>
      <div className="md:col-span-3 panel p-4 overflow-y-auto animate-rise" key={sel}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div><div className="eyebrow">Decision chain</div><div className="text-base font-medium">{ACCOUNT_MAP[sel].name}</div><div className="text-xs text-paper-3 flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" />{ACCOUNT_MAP[sel].geography}</div></div>
          <div className="flex items-center gap-2"><SourceButton claimIds={ACCOUNT_MAP[sel].claimIds} title={ACCOUNT_MAP[sel].name} /><button data-testid="open-account-detail" onClick={() => setAccount(sel)} className="rounded border border-line px-2.5 py-1 text-xs text-paper-2 hover:text-paper">Account detail</button></div>
        </div>
        <Chain id={sel} />
        <div className="mt-3"><PrecedentTag id={ACCOUNT_MAP[sel].precedentId} /></div>
      </div>
    </div>
  );
}

function OemView() {
  const { setAccount } = useStore();
  const oems = ACCOUNTS.filter((a) => a.kind === 'oem');
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger">
      {oems.map((a) => (
        <div key={a.id} role="button" tabIndex={0} data-testid={`oem-card-${a.id}`} onClick={() => setAccount(a.id)} onKeyDown={(e) => e.key === 'Enter' && setAccount(a.id)} className="panel panel-hover p-4 text-left flex flex-col gap-2 cursor-pointer">
          <div className="flex items-start justify-between gap-2"><div className="text-base font-medium">{a.name}</div><Pill tone={accessTone(a.access)}>Access {a.access}</Pill></div>
          <div className="text-[11px] text-paper-3 flex items-center gap-1"><MapPin className="h-3 w-3" />{a.city}</div>
          <div className="flex flex-wrap gap-1">{a.platforms.slice(0, 2).map((p) => <Pill key={p}>{p}</Pill>)}</div>
          <div className="text-sm text-sig-blue">{a.wedge}</div>
          <div className="mt-auto pt-1"><PrecedentTag id={a.precedentId} /></div>
        </div>
      ))}
      <div className="panel p-4 border-dashed opacity-60 text-xs text-paper-3 flex flex-col gap-1"><span className="eyebrow">Monitor only</span>MDL · BDL · L&T · Adani Defence</div>
    </div>
  );
}

export default function Buyers() {
  const [tab, setTab] = useState<Tab>('product');
  return (
    <Screen>
      <Headline title="Services · platforms · primes" sub="Product → platform → organisation → decision chain → programme. There is no single decision maker." right={
        <div data-testid="buyers-tabs" className="flex rounded border border-line overflow-hidden text-xs">
          {([['product', 'By Shield product'], ['customer', 'By customer'], ['oem', 'By Indian platform / OEM']] as [Tab, string][]).map(([t, l]) => <button key={t} data-testid={`tab-${t}`} onClick={() => setTab(t)} className={cn('px-3 py-1 transition-colors duration-200', tab === t ? 'bg-ink-4 text-paper' : 'text-paper-3 hover:text-paper-2')}>{l}</button>)}
        </div>
      } />
      <div className="md:hidden flex gap-1 text-xs">{(['product', 'customer', 'oem'] as Tab[]).map((t) => <button key={t} onClick={() => setTab(t)} className={cn('px-2 py-1 rounded border border-line capitalize', tab === t && 'bg-ink-4')}>{t}</button>)}</div>
      {tab === 'product' && <ProductView />}
      {tab === 'customer' && <CustomerView />}
      {tab === 'oem' && <OemView />}
    </Screen>
  );
}
