import { ArrowUpRight } from 'lucide-react';
import { ACCOUNT_MAP } from '@/data/accounts';
import { PRECEDENT_MAP } from '@/data/precedents';
import { useStore } from '@/store';
import { Field, Pill, SideDrawer, accessTone, chainTone } from './ui';
import { SourceButton } from './Evidence';

export function PrecedentTag({ id }: { id?: string }) {
  const { openEvidence } = useStore();
  if (!id) return null;
  const p = PRECEDENT_MAP[id];
  return (
    <button data-testid={`precedent-${id}`} onClick={(e) => { e.stopPropagation(); openEvidence(p.claimIds, `Global precedent · ${p.country}`); }} className="group inline-flex items-center gap-1 text-xs text-sig-blue hover:underline">
      Global precedent <ArrowUpRight className="h-3 w-3" />
      <span className="text-paper-3 group-hover:text-paper-2">· {p.country} · {p.type}</span>
    </button>
  );
}

export function AccountDrawer() {
  const { account, setAccount } = useStore();
  const a = account ? ACCOUNT_MAP[account] : null;
  const eyebrow = a ? ({ oem: 'Indian OEM / prime', service: 'B2G customer', rnd: 'R&D / ecosystem' } as const)[a.kind] : '';
  return (
    <SideDrawer open={!!a} onClose={() => setAccount(null)} title={a?.name ?? ''} eyebrow={eyebrow} testId="account-drawer">
      {a && (
        <div className="space-y-4 stagger">
          <div className="flex flex-wrap gap-1.5">
            <Pill tone="blue">{a.horizon}</Pill>
            <Pill tone={accessTone(a.access)}>Access {a.access}</Pill>
            <SourceButton claimIds={a.claimIds} title={a.name} />
          </div>
          <Field label="Mission">{a.mission}</Field>
          <Field label="Platforms"><div className="flex flex-wrap gap-1.5 mt-1">{a.platforms.map((p) => <Pill key={p}>{p}</Pill>)}</div></Field>
          <Field label="Shield wedge"><span className="text-sig-blue">{a.wedge}</span></Field>
          <Field label="Entry route">{a.entry}</Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Buyer">{a.buyer}</Field>
            <Field label="Technical sponsor">{a.techSponsor}</Field>
          </div>
          <Field label="Decision path">{a.decisionPath}</Field>
          <Field label="Geography">{a.geography}</Field>
          {a.precedentId && <Field label="International precedent"><div className="mt-0.5"><PrecedentTag id={a.precedentId} /><div className="text-xs text-paper-2 mt-1">{PRECEDENT_MAP[a.precedentId].lesson}</div></div></Field>}
          {a.chain && (
            <div>
              <div className="eyebrow mb-2">Decision chain</div>
              <ol className="space-y-1.5">
                {a.chain.map((c, i) => (
                  <li key={c.stage} className="panel px-3 py-2 flex items-start gap-3">
                    <span className="num text-xs text-paper-3 mt-0.5">{i + 1}</span>
                    <div className="min-w-0 flex-1"><div className="text-xs font-medium">{c.stage}</div><div className="text-xs text-paper-2">{c.who}</div></div>
                    <Pill tone={chainTone(c.label)}>{c.label}</Pill>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </SideDrawer>
  );
}
