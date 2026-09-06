import { useState } from 'react';
import { Headline, Screen } from '@/components/ui';
import { DEFAULT_INPUTS, dollars, MD_SOURCES, SCHEDULE, simulate } from '@/data/md-planning';
import { OPERATING_FUNCTIONS } from '@/data/operating-model';
import MdAssumptions from './MdAssumptions';
import MdBusinessReview from './MdBusinessReview';
import './md-dashboard.css';

export default function MdDashboard() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [delay, setDelay] = useState(0);
  const model = simulate(inputs, delay), base = simulate(inputs);
  const priced = inputs.contract !== null;
  const moneyOrUnknown = (amount: number) => priced ? dollars(amount) : 'Unpriced';
  const checks: Record<string,string> = {
    growth: 'Firm orders and executable scope; optional follow-ons kept separate.',
    programmes: 'Accepted delivery lots, next gate and value exposed to slippage.',
    engineering: 'Committed engineering months versus available specialist capacity.',
    industrialisation: 'Technology-transfer, supplier and JSW commissioning gates.',
    industrial: 'Technology-transfer, supplier and JSW commissioning gates.',
    people: `${inputs.headcount} planning posts; validate roster and phased hiring.`,
    finance: 'Customer receipts, cost-to-complete and cash needed before acceptance.',
  };
  return <Screen className="md-dashboard">
    <Headline title="MD Operating Dashboard" sub="Deliver the Army commitment. Build the JSW partnership. Fund the next programme." />
    <div className="md-period"><span>Contract-led planning · 4-year cash view</span><span>Sources reviewed 06 Sep 2026 · Actuals not loaded</span><button className="md-register-button" onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog">Assumptions & evidence ↗</button></div>
    <div className="md-grounding"><span><strong>Army</strong> V-BAT + Hivemind selection announced</span><span><strong>JSW</strong> $90M partner investment · excluded from Shield sales</span></div>
    <section aria-label="Planning economics"><div className="md-section-title"><h2>What can we commit to?</h2><span>Scenario outputs · not actuals or guidance</span></div><div className="md-kpis">
      {[['Firm Shield contract value', priced ? dollars(inputs.contract!) : 'Unpriced', 'Full contract term; optional orders excluded'], ['Year 1 acceptance revenue', moneyOrUnknown(model.years[0].revenue), 'Recognised at modelled acceptance gates'], ['Annual local cost envelope', dollars(model.annualRunCost), `${inputs.headcount} planning posts + non-people overhead`], ['Peak funding needed', model.peakFunding === null ? 'Unpriced' : dollars(model.peakFunding), '48 months · before opening cash / financing']].map(([label, value, note]) => <button className="panel panel-hover md-kpi" key={label} onClick={() => setAssumptionsOpen(true)} aria-haspopup="dialog"><span className="md-kpi-label">{label}<span>↗</span></span><strong className="md-actual">{value}</strong><p className="md-footnote">{note}</p></button>)}
    </div><p className="md-footnote">{priced ? 'Entered contract value is a scenario input, not a verified award amount.' : 'No defensible contract price is established by the sources. Enter validated commercial terms in Assumptions to calculate revenue and programme cash.'} Local cost inputs remain provisional.</p></section>
    <section aria-label="Multi-year execution"><div className="md-section-title"><h2>Contract → acceptance → cash</h2><label className="md-scenario-select">Delivery case<select aria-label="Delivery case" value={delay} onChange={e => setDelay(Number(e.target.value))}><option value={0}>Base execution case</option><option value={6}>Acceptance delayed 6 months</option></select></label></div>
      <div className="md-gates panel">{SCHEDULE.map(g => <div key={g.month}><span>Month {g.month + delay}</span><strong>{g.share * 100}% of contract</strong><small>{g.gate}</small></div>)}</div>
      <details className="md-disclosure md-year-details"><summary>Annual revenue, collections & funding<span>Year 1 starts at mobilisation; no award date assumed</span></summary><div className="md-table-wrap"><table className="md-pnl"><thead><tr><th scope="col">USD millions · scenario</th>{model.years.map(y => <th scope="col" key={y.year}>Year {y.year}</th>)}</tr></thead><tbody>
        <tr><th scope="row">Acceptance-based revenue</th>{model.years.map(y => <td key={y.year}>{moneyOrUnknown(y.revenue)}</td>)}</tr>
        <tr><th scope="row">Customer cash received</th>{model.years.map(y => <td key={y.year}>{moneyOrUnknown(y.receipts)}</td>)}</tr>
        <tr><th scope="row">Supplier cash paid</th>{model.years.map(y => <td key={y.year}>{moneyOrUnknown(y.externalCost)}</td>)}</tr>
        <tr><th scope="row">Local people + overhead</th>{model.years.map(y => <td key={y.year}>{dollars(y.localCost)}</td>)}</tr>
        <tr className="md-subtotal"><th scope="row">Programme contribution after local costs</th>{model.years.map(y => <td key={y.year}>{moneyOrUnknown(y.revenue * (1-inputs.directCost/100)-y.localCost)}</td>)}</tr>
        <tr><th scope="row">Remaining modelled contract value</th>{model.years.map(y => <td key={y.year}>{y.remainingValue === null ? 'Unpriced' : dollars(y.remainingValue)}</td>)}</tr>
        <tr className="md-subtotal"><th scope="row">Cumulative cash before financing</th>{model.years.map(y => <td key={y.year}>{moneyOrUnknown(y.closingCash)}</td>)}</tr>
      </tbody></table></div><p className="md-footnote">{priced ? `${dollars(model.futureReceipts)} receipts fall after Year 4. ` : ''}Contribution matches external cost to accepted scope; supplier cash can be paid earlier. Advance and retention are cash items, not additional revenue. This regional planning view is not the India subsidiary’s statutory P&amp;L.</p></details>
      {priced && delay > 0 && <p className="md-sensitivity" role="status">Six-month delay: Year 1 acceptance revenue changes from {dollars(base.years[0].revenue)} to {dollars(model.years[0].revenue)}. Peak funding changes from {dollars(base.peakFunding!)} to {dollars(model.peakFunding!)}.</p>}
    </section>
    <details className="md-disclosure"><summary>Programmes & strategic partnerships<span>Confirmed anchors and unawarded growth routes</span></summary><MdBusinessReview /></details>
    <details className="md-disclosure"><summary>Functional execution<span>Six functions · evidence needed at each review</span></summary><div className="md-functions">{OPERATING_FUNCTIONS.map(f => <div key={f.id} className="panel md-function"><h3>{f.name}</h3><p className="md-functional-check">{checks[f.id] ?? f.mandate}</p><span className="md-footnote">Owner: {f.owner}</span></div>)}</div></details>
    <section aria-label="MD decisions"><div className="md-section-title"><h2>Decisions before committing more</h2><span>Baseline gaps, not invented operational red flags</span></div><div className="panel md-attention">
      <button onClick={() => setAssumptionsOpen(true)}><span className="md-attention-issue"><strong>Validate the Army commercial baseline</strong><span>Contract value, acceptance, invoicing entity and collections</span></span><span className="md-attention-action"><strong>Protect delivery and funding capacity</strong><span>MD + Finance + Programmes</span></span><span>↗</span></button>
      <button onClick={() => setAssumptionsOpen(true)}><span className="md-attention-issue"><strong>Agree the JSW economic and execution boundary</strong><span>Licence fees, order releases, production gates and support scope</span></span><span className="md-attention-action"><strong>Convert partnership into executable commitments</strong><span>MD + JSW counterpart + Legal</span></span><span>↗</span></button>
      <button onClick={() => setAssumptionsOpen(true)}><span className="md-attention-issue"><strong>Approve a phased team and funding envelope</strong><span>{dollars(model.annualRunCost)} annual local cost in the current case</span></span><span className="md-attention-action"><strong>Hire against funded work and specialist needs</strong><span>MD + People + Engineering + Finance</span></span><span>↗</span></button>
    </div></section>
    <details className="md-disclosure"><summary>Public fact base<span>Source links and limits of what is known</span></summary>{MD_SOURCES.map(s => <div className="md-source-row" key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a><p>{s.fact}</p><small>{s.boundary}</small></div>)}</details>
    <MdAssumptions open={assumptionsOpen} inputs={inputs} onApply={setInputs} onClose={() => setAssumptionsOpen(false)} />
  </Screen>;
}
