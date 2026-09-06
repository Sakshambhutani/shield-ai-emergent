import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Field, Headline, Pill, Screen, SideDrawer } from '@/components/ui';
import { BET_META } from '@/data/opportunities';
import { EXECUTION_SIGNALS, SCORECARD_SIGNALS, STATUS_META } from '@/data/management';
import { MD_DECISIONS, MD_RISKS, type Decision, type Risk } from '@/data/md';

const ACTIVE_DECISION_IDS = ['d1', 'd2', 'd3'];
const ACTIVE_EXCEPTION_IDS: string[] = [];
const DECISION_VIEW: Record<string, { direction: string; options: string[] }> = {
  d1: { direction: 'Prioritise two sponsor-backed platforms', options: ['Sequence two platforms now', 'Attempt all candidates in parallel', 'Defer platform selection'] },
  d2: { direction: 'Approve the proposed accountability model', options: ['Approve proposed model', 'Revise accountabilities', 'Defer until delivery'] },
  d3: { direction: 'Select against sponsor and trial access', options: ['Shipbuilder-led pathway', 'Electronics-led pathway', 'Parallel qualification'] },
};

const betTone = (bet: string) => (bet === 'scale' ? 'green' : bet === 'embed' ? 'blue' : 'purple') as 'green' | 'blue' | 'purple';
const deadline = (value: string) => value.replace('Month ', 'M').replace(' gate', '');

function OrientationStrip() {
  const unhealthy = EXECUTION_SIGNALS.filter((signal) => signal.status === 'watch' || signal.status === 'off-track');
  return <div data-testid="md-orientation" className="border-y border-line px-4 py-3 flex flex-wrap items-center gap-x-8 gap-y-2">
    <span className="eyebrow">Scorecard</span>
    {SCORECARD_SIGNALS.map((signal) => { const status = STATUS_META[signal.status]; return <Link key={signal.id} to="/kpis" className="inline-flex items-center gap-2 hover:text-paper transition-colors"><span className="text-xs font-medium">{signal.bet}</span><span className={cn('font-mono text-xs', status.className)} aria-label={status.label}>{status.symbol}</span></Link>; })}
    {unhealthy.map((signal) => { const status = STATUS_META[signal.status]; return <span key={signal.id} className="ml-auto inline-flex items-center gap-2"><span className="text-xs">{signal.label.replace(' HEALTH', '')}</span><span className={cn('font-mono text-xs', status.className)}>{status.symbol}</span></span>; })}
  </div>;
}

function DecisionDrawer({ decision, onClose }: { decision: Decision | null; onClose: () => void }) {
  const view = decision ? DECISION_VIEW[decision.id] : null;
  return <SideDrawer open={!!decision} onClose={onClose} title={decision?.decision ?? ''} eyebrow="Decision" testId="decision-drawer" width="sm:w-[500px]">
    {decision && view && <div className="space-y-5 stagger">
      <Field label="Decision">{decision.decision}</Field>
      <Field label="Why now">{decision.why}</Field>
      <Field label="Options"><ul className="mt-1 space-y-2">{view.options.map((option) => <li key={option} className="text-sm text-paper-2">→ {option}</li>)}</ul></Field>
      <Field label="Recommendation"><span className="text-sig-blue">{decision.rec}</span></Field>
      <Field label="Consequence of delay">{decision.delay}</Field>
    </div>}
  </SideDrawer>;
}

function ExceptionDrawer({ risk, onClose }: { risk: Risk | null; onClose: () => void }) {
  return <SideDrawer open={!!risk} onClose={onClose} title={risk?.risk ?? ''} eyebrow="Active exception" testId="risk-drawer">
    {risk && <div className="space-y-5 stagger"><Field label="Cause">{risk.trigger}</Field><Field label="Accountability">{risk.owner}</Field><Field label="Intervention required">{risk.decision}</Field></div>}
  </SideDrawer>;
}

function Decisions({ onOpen }: { onOpen: (decision: Decision) => void }) {
  const decisions = ACTIVE_DECISION_IDS.map((id) => MD_DECISIONS.find((decision) => decision.id === id)).filter((decision): decision is Decision => !!decision);
  return <section data-testid="md-decisions">
    <div className="flex items-center justify-between mb-2"><span className="eyebrow text-sig-blue">Decisions required</span><span className="font-mono text-[10px] text-paper-3">{decisions.length} active</span></div>
    <div className="border-y border-line divide-y divide-line">{decisions.map((decision, index) => <button key={decision.id} data-testid={`decision-${decision.id}`} onClick={() => onOpen(decision)} className="w-full px-2 sm:px-4 py-4 grid grid-cols-[32px_1fr_auto] sm:grid-cols-[36px_minmax(260px,1fr)_minmax(220px,.75fr)_48px] items-center gap-3 text-left hover:bg-ink-2 transition-colors">
      <span className="num text-sm text-paper-3">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-sm sm:text-base font-medium">{decision.decision}</span>
      <span className="hidden sm:flex items-center gap-2 text-xs text-sig-blue"><ArrowRight className="h-3 w-3 shrink-0" />{DECISION_VIEW[decision.id].direction}</span>
      <span className="font-mono text-xs text-sig-amber text-right">{deadline(decision.deadline)}</span>
    </button>)}</div>
  </section>;
}

function Exceptions({ onOpen }: { onOpen: (risk: Risk) => void }) {
  const risks = ACTIVE_EXCEPTION_IDS.map((id) => MD_RISKS.find((risk) => risk.id === id)).filter((risk): risk is Risk => !!risk);
  return <section data-testid="md-exceptions">
    <div className="eyebrow text-sig-amber mb-2">Active exceptions</div>
    {risks.length === 0 ? <div className="border-y border-line px-4 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-3">No active executive exceptions</div> : <div className="border-y border-line divide-y divide-line">{risks.slice(0, 3).map((risk) => <button key={risk.id} onClick={() => onOpen(risk)} className="w-full px-4 py-3 flex items-center gap-4 text-left hover:bg-ink-2"><span className="text-amber-300">▲</span><span className="flex-1 text-sm">{risk.risk}</span><Pill tone={betTone(risk.bet)}>{BET_META[risk.bet].label}</Pill></button>)}</div>}
  </section>;
}

export default function MdDashboard() {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [risk, setRisk] = useState<Risk | null>(null);
  return <Screen>
    <Headline title="Decide. Unblock. Intervene." sub="Scorecard deviations become decisions, unblocks and executive interventions." />
    <div data-testid="md-story" className="flex-1 min-h-0 flex flex-col justify-center gap-7 max-w-6xl w-full mx-auto">
      <OrientationStrip />
      <Decisions onOpen={setDecision} />
      <Exceptions onOpen={setRisk} />
    </div>
    <DecisionDrawer decision={decision} onClose={() => setDecision(null)} />
    <ExceptionDrawer risk={risk} onClose={() => setRisk(null)} />
  </Screen>;
}
