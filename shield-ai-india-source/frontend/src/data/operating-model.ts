export interface FunctionalKpi {
  name: string;
  headline?: string;
  definition: string;
  why: string;
  dependency: string;
}

export interface OperatingFunction {
  id: string;
  name: string;
  mandate: string;
  owner: string;
  kpis: FunctionalKpi[];
  diagnostic?: string;
}

// Proposed accountabilities, not a representation of current staffing or performance.
export const OPERATING_FUNCTIONS: OperatingFunction[] = [
  {
    id: 'growth', name: 'Business Development & Ops',
    mandate: 'Create the next large India programmes.', owner: 'India Business Development & Ops lead',
    kpis: [
      { name: 'Qualified strategic pipeline value', headline: 'Strategic pipeline value', definition: 'Value of strategic opportunities with a credible customer sponsor, a defined requirement and a viable path to procurement. Keep programme value and Shield-addressable value explicit.', why: 'Shows the scale of credible future business in a market shaped by a few large programmes.', dependency: 'Hivemind & Solutions Engineering validates technical fit; Finance, Commercial & Legal validates commercial scope.' },
      { name: 'Strategic pursuits crossing gates', headline: 'Pursuits advancing through gates', definition: 'Named strategic pursuits advancing through evidenced gates: technical validation, funded requirement, RFP / procurement and contracting.', why: 'Distinguishes meaningful customer commitment from activity or unqualified interest.', dependency: 'Engineering supplies technical evidence; Finance, Commercial & Legal shapes the contracting route.' },
      { name: 'Pipeline beyond the anchor programme', definition: 'Qualified, Shield-addressable pipeline value outside the existing Army programme, with a named sponsor and procurement path for each pursuit.', why: 'Tests whether India is building material business beyond its current anchor.', dependency: 'Engineering and Programmes confirm that new pursuits can be supported and delivered.' },
    ],
  },
  {
    id: 'programmes', name: 'Programmes & Customer Delivery',
    mandate: 'Deliver contracted customer commitments.', owner: 'India programme lead for each contracted programme',
    kpis: [
      { name: 'Contractual milestones accepted on time', headline: 'Milestones accepted on time', definition: 'Customer-accepted contractual milestones against their agreed dates, with any slippage and its material impact made explicit.', why: 'Measures delivery against the commitments the customer actually accepts.', dependency: 'Procurement & Industrialisation provides production readiness; Finance connects acceptance to billing.' },
      { name: 'Confidence in next two milestones', headline: 'Next-milestone confidence', definition: 'Leadership assessment of whether the next two contractual delivery / acceptance gates will be met based on current programme dependencies.', why: 'Provides an early warning before a customer milestone actually slips.', dependency: 'Procurement and Engineering confirm readiness, unresolved dependencies and recovery actions.' },
      { name: 'Critical customer / programme blockers', definition: 'Only unresolved blockers capable of materially affecting customer acceptance, delivery or programme economics; each has an owner and a required decision date.', why: 'Directs scarce leadership attention to issues that can change programme outcomes.', dependency: 'MD Office resolves cross-functional trade-offs and escalates customer, partner or HQ dependencies.' },
    ],
  },
  {
    id: 'industrialisation', name: 'Procurement & Industrialisation',
    mandate: 'Make JSW / India production executable.', owner: 'India Procurement & Industrialisation lead',
    kpis: [
      { name: 'Next production gate readiness', headline: 'Production readiness', definition: 'Evidence that the people, facilities, approvals, technical transfer and materials required for the next agreed production gate are ready.', why: 'Surfaces gaps before they prevent a production commitment from being met.', dependency: 'JSW and global product teams provide build readiness and technical approvals; Programmes sets the delivery need.' },
      { name: 'Critical-path material coverage', headline: 'Critical-path material coverage', definition: 'Availability or confirmed arrival of components needed on the production critical path, assessed against their required build dates.', why: 'Focuses attention on shortages that could stop production or customer delivery.', dependency: 'JSW, suppliers and global supply chain confirm availability against the programme build plan.' },
      { name: 'Industrialisation / build-plan adherence', definition: 'Actual industrialisation and build milestones against the agreed production plan, including material deviations and recovery dates.', why: 'Tests whether India production can reliably support contracted delivery.', dependency: 'Programmes aligns customer dates; JSW owns partner production execution.' },
    ],
    diagnostic: 'Supplier counts, purchase orders issued and procurement savings are secondary operational diagnostics.',
  },
  {
    id: 'autonomy', name: 'Hivemind & Solutions Engineering',
    mandate: 'Build deployable autonomy capability in India.', owner: 'India Hivemind & Solutions Engineering lead',
    kpis: [
      { name: 'Strategic integrations progressing to operational deployment', headline: 'Integrations reaching deployment', definition: 'Named, programme-relevant integrations advancing through agreed technical and customer gates toward operational deployment. Experiments without a credible deployment path are excluded.', why: 'Shows whether engineering effort is producing autonomy capability that customers can use.', dependency: 'Business Development shapes the customer requirement; Programmes and OEM partners define deployment and acceptance.' },
      { name: 'India-owned execution', headline: 'India-owned execution', definition: 'Critical integration work that the India team can execute and validate locally, with remaining US engineering dependencies explicitly identified.', why: 'Shows whether local capability can support growth without excessive dependence on US engineering.', dependency: 'Global Hivemind provides product access and specialist support; People & HR closes critical skill gaps.' },
      { name: 'Integration / deployment cycle time', definition: 'Elapsed time from an agreed customer / platform requirement through integration and deployment, with dependency delays visible and comparable scope identified.', why: 'Measures the ability to turn a relevant requirement into deployable capability.', dependency: 'OEMs provide platform access; Programmes coordinates acceptance; global engineering resolves product dependencies.' },
    ],
  },
  {
    id: 'finance', name: 'Finance, Commercial & Legal',
    mandate: 'Protect cash and programme economics.', owner: 'India Finance / Commercial lead, supported by global Legal',
    kpis: [
      { name: 'Collections against accepted contractual milestones', headline: 'Cash vs milestones', definition: 'Cash collected against amounts contractually due for accepted milestones, with material overdue amounts and collection blockers identified.', why: 'Connects customer acceptance to realised cash.', dependency: 'Programmes supplies acceptance evidence; the customer and commercial team clear payment requirements.' },
      { name: 'Cost-to-complete vs programme plan', headline: 'Cost-to-complete vs plan', definition: 'Forecast remaining cost to fulfil programme commitments compared with the approved remaining budget, including material risks and changes in scope.', why: 'Exposes deterioration in programme economics while leadership can still act.', dependency: 'Programmes, Procurement and Engineering provide current delivery, build and integration forecasts.' },
      { name: 'Material commercial / contractual exposure', definition: 'Only contractual, payment, liability or compliance exposures large enough to affect programme economics, delivery or the customer relationship.', why: 'Makes consequential commercial risks visible before commitments or losses crystallise.', dependency: 'Business Development shapes commitments; Programmes validates delivery obligations; global Legal advises on material terms.' },
    ],
  },
  {
    id: 'people', name: 'People & HR',
    mandate: 'Build only the capabilities required for execution and growth.', owner: 'India People / HR lead',
    kpis: [
      { name: 'Critical-role coverage', headline: 'Critical-role coverage', definition: 'Execution-critical roles covered by available, qualified people against the needs of committed programmes and credible growth opportunities.', why: 'Tests whether a small team has the capabilities needed to deliver its commitments.', dependency: 'Functional leads define required capability; MD Office resolves resource priorities.' },
      { name: 'Capability gaps blocking programmes', headline: 'Execution-blocking capability gaps', definition: 'Unfilled or insufficient capabilities that materially block a named programme gate, with an accountable functional lead and a closure plan.', why: 'Prioritises gaps by programme consequence.', dependency: 'Programmes and Engineering identify the blocked outcome; MD Office aligns hiring or shared resources.' },
      { name: 'Time to productivity for critical hires', definition: 'Time from joining to independently performing the agreed programme-relevant responsibilities of a critical role, validated by the functional lead.', why: 'Measures when hiring translates into usable execution capacity.', dependency: 'Hiring managers provide onboarding, tools, access and clear responsibilities; global teams enable specialist training.' },
    ],
  },
];
