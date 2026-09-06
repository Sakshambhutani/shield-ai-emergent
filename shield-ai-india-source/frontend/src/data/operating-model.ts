import { PORTFOLIO_TOTALS, TRIAL_CAMPAIGNS } from './md-portfolio';

export interface FunctionalKpi {
  name: string;
  headline?: string;
  definition: string;
  why: string;
  dependency: string;
  value: string;
  target: string;
  trigger: string;
  cadence: string;
  basis: string;
  tone: 'amber' | 'red' | 'green';
}
export interface OperatingFunction {
  id: string;
  name: string;
  mandate: string;
  owner: string;
  kpis: FunctionalKpi[];
  diagnostic?: string;
}
const acceptedReports = TRIAL_CAMPAIGNS.reduce((sum, t) => sum + t.accepted, 0);
const completedFlights = TRIAL_CAMPAIGNS.reduce((sum, t) => sum + t.completed, 0);
// Management-designed targets and fictional snapshots, not company performance.
// Only the first two measures appear on the static Operating Model diagram.
export const OPERATING_FUNCTIONS: OperatingFunction[] = [
{
  "id": "growth",
  "name": "Business Development & Ops",
  "mandate": "Convert customer access into funded, deliverable programmes.",
  "owner": "India BD & Ops lead",
  "kpis": [
    {
      "name": "Funded pursuit gate coverage",
      "headline": "Funded pursuit coverage",
      "value": "1 / 2 routes",
      "target": "2 / 2 before bid commitment",
      "definition": "Routes with a named user sponsor, buying authority, dated funding decision and documented procurement route / active government pursuit routes.",
      "why": "Tests whether the $9.2M opportunity can become a real buying decision.",
      "dependency": "Maritime capital and urgent pilot; Commercial validates the route, Engineering confirms availability.",
      "trigger": "A route lacks a funding or authority checkpoint within 30 days of the bid / pilot decision.",
      "cadence": "Weekly; at every bid decision",
      "basis": "Assume 1 of the 2 maritime routes has all four qualification fields evidenced; the urgent pilot funding checkpoint remains open. Pipeline stays outside bookings.",
      "tone": "amber"
    },
    {
      "name": "Pursuit gates completed by agreed date",
      "headline": "Pursuit gates on time",
      "value": "3 / 4 gates",
      "target": "All gates by agreed date",
      "definition": "Customer or partner-acknowledged gates completed by the original agreed date / pursuit gates due in the last 90 days.",
      "why": "Shows progress from requirements to RFP, paid trial and contract, without treating AoN as an award.",
      "dependency": "Customer procurement team, bid partners and Solutions Engineering.",
      "trigger": "Any missed gate changes the bid date or exceeds 7 days; take a recover / replan / stop decision.",
      "cadence": "Weekly; rolling 90 days",
      "basis": "Assume 4 pursuit gates due in the prior 90 days, 3 completed on time. Record the delayed gate and revised date; do not reset the original baseline.",
      "tone": "amber"
    },
    {
      "name": "Engagement commitments closed",
      "headline": "Engagement follow-through",
      "value": "6 / 8 actions",
      "target": "All actions by agreed date",
      "definition": "Dated customer / partner commitments closed with the promised output / meeting follow-ups due in the last 30 days.",
      "why": "Makes MoD discussions, working lunches and conferences useful through scope, sponsor access or a scheduled next gate.",
      "dependency": "BD owns follow-through; MD and functional leads provide the promised decisions.",
      "trigger": "Any overdue follow-up blocks a customer decision, or remains open for more than 5 working days.",
      "cadence": "Weekly; rolling 30 days",
      "basis": "Assume 8 prior meeting follow-ups due, 6 closed and 2 overdue. The future engagement calendar is separate; meeting attendance does not count as closure.",
      "tone": "amber"
    }
  ]
},
{
  "id": "programmes",
  "name": "Programmes & Customer Delivery",
  "mandate": "Deliver customer deployment and acceptance commitments across the full contract.",
  "owner": "India Programme director",
  "kpis": [
    {
      "name": "Customer acceptance on time",
      "headline": "Customer acceptance on time",
      "value": "4 / 5 gates",
      "target": "At least 95% on time",
      "definition": "Customer-accepted contractual gates completed by their original due date / acceptance gates due in the last 90 days.",
      "why": "Measures the customer outcome that unlocks deployment, invoicing and support.",
      "dependency": "Engineering and JSW enable delivery; customer signs acceptance; Finance invoices.",
      "trigger": "Any customer acceptance slips more than 7 days or moves a contractual receipt.",
      "cadence": "Weekly; rolling 90 days",
      "basis": "Assume 5 historical customer acceptance gates due across the portfolio, 4 accepted on time (80%). These are separate from the future Army 30 Sep commitment.",
      "tone": "amber"
    },
    {
      "name": "Next committed deployment variance",
      "headline": "Deployment forecast vs promise",
      "value": "+14 days",
      "target": "Meet 30 Sep commitment",
      "definition": "Forecast customer-ready deployment date less the agreed commitment date, shown with the programme and affected payment.",
      "why": "Surfaces Army recovery before the customer date is missed.",
      "dependency": "Army user team, field engineering and HQ product release.",
      "trigger": "More than 7 days forecast slip; MD agrees a recovery plan and customer communication within 48 hours.",
      "cadence": "Weekly; after every readiness review",
      "basis": "Army commitment 30 Sep 2026 versus forecast 14 Oct 2026; $2.8M receipt depends on witnessed acceptance. This is a forecast slip, not elapsed lateness as of 07 Sep.",
      "tone": "red"
    },
    {
      "name": "Deployment prerequisite closure",
      "headline": "Deployment prerequisites",
      "value": "5 / 6 ready",
      "target": "6 / 6 before deployment",
      "definition": "Accepted prerequisites for the next deployment: aircraft availability, site readiness, operator training, support cover, approved software configuration and customer acceptance plan.",
      "why": "Prevents a flown test or shipped aircraft from being mistaken for an accepted deployment.",
      "dependency": "Customer site owner, Engineering, HQ Product and support lead.",
      "trigger": "A mandatory prerequisite remains open 14 days before the deployment gate.",
      "cadence": "Weekly; each deployment gate",
      "basis": "Assume 5 of 6 Army prerequisites complete; approved software configuration is pending the HQ release on 25 Sep. All six are required for customer handover.",
      "tone": "amber"
    }
  ]
},
{
  "id": "industrialisation",
  "name": "Industrialisation & JSW Partnership",
  "mandate": "Make the joint production plan executable through Shield and JSW commitments.",
  "owner": "India Industrialisation lead",
  "kpis": [
    {
      "name": "Joint production readiness",
      "headline": "JSW production readiness",
      "value": "8 / 10 checks",
      "target": "10 / 10 before readiness sign-off",
      "definition": "Accepted items on the agreed JSW / Shield readiness checklist / required items for the next production gate.",
      "why": "Keeps factory readiness visible while JSW retains production and supplier ownership.",
      "dependency": "JSW owns factory actions; HQ Product owns transfer documentation; India coordinates.",
      "trigger": "Any mandatory check lacks an owner or forecast completion before the 15 Dec readiness review.",
      "cadence": "Weekly; joint monthly steering review",
      "basis": "The portfolio assumes 8 of 10 checks complete. The two open checks concern JSW factory readiness and HQ documentation, with owners to be agreed on 11 Sep.",
      "tone": "amber"
    },
    {
      "name": "Shield transfer deliverables accepted",
      "headline": "Shield transfer commitments",
      "value": "6 / 8 deliverables",
      "target": "8 / 8 by 15 Oct",
      "definition": "Shield-owned technical-transfer and training deliverables accepted by JSW / deliverables due in the current transfer package.",
      "why": "Measures what Shield can deliver to support JSW production and unlock the $450k transfer payment.",
      "dependency": "HQ documentation and product configuration; India training team; JSW acceptance owner.",
      "trigger": "Any transfer deliverable forecasts late enough to move training or the 31 Oct payment.",
      "cadence": "Weekly until transfer acceptance",
      "basis": "Assume 8 transfer deliverables: 6 accepted, documentation pack due 30 Sep and training acceptance due 15 Oct. The transfer package is a separate denominator from the joint readiness checklist.",
      "tone": "amber"
    },
    {
      "name": "Partner dependency actions closed on time",
      "headline": "Joint dependency closure",
      "value": "5 / 6 actions",
      "target": "All actions on time",
      "definition": "Joint JSW / Shield actions closed with acceptance evidence by the original due date / actions due in the last 30 days.",
      "why": "Shows whether joint steering resolves delivery dependencies.",
      "dependency": "JSW counterpart, HQ transfer lead and India Programme director.",
      "trigger": "An overdue action changes a build or customer date; escalate jointly within 48 hours.",
      "cadence": "Weekly; rolling 30 days",
      "basis": "Assume 6 joint actions due in the prior 30 days, 5 closed on time. Supplier purchase-order counts and factory procurement savings remain JSW operational measures.",
      "tone": "amber"
    }
  ]
},
{
  "id": "autonomy",
  "name": "Hivemind & Solutions Engineering",
  "mandate": "Turn partner integration, field learning and global work into accepted deliverables.",
  "owner": "India Solutions Engineering lead",
  "kpis": [
    {
      "name": "Integration gates accepted on time",
      "headline": "Integration gates accepted",
      "value": "3 / 4 gates",
      "target": "All committed gates on time",
      "definition": "Partner / customer-accepted integration or validation gates on their original due date / technical gates due in the last 90 days.",
      "why": "Connects engineering output to OEM demonstration and Japan / Poland customer packages.",
      "dependency": "OEM platform access, HQ product branch and Programmes acceptance scope.",
      "trigger": "Any missed gate affects deployment, partner demonstration or the next contracted receipt.",
      "cadence": "Weekly; rolling 90 days",
      "basis": "Assume 4 prior technical gates across OEM, Japan and Poland, 3 accepted on time. Count accepted technical outputs, not code volume or experiments.",
      "tone": "amber"
    },
    {
      "name": "Field evidence accepted",
      "headline": "Trial evidence accepted",
      "value": `${acceptedReports} / ${completedFlights} reports`,
      "target": "All reports accepted before customer gate",
      "definition": "Accepted flight evidence reports / completed flights requiring a report, reported separately from the planned flight campaign.",
      "why": "Makes repeated flights across terrains produce a usable acceptance and SDK learning record.",
      "dependency": "Field Test lead produces reports; customer / Programme acceptance owner reviews them.",
      "trigger": "Any unresolved report blocks customer acceptance or waits more than 5 working days for review.",
      "cadence": "After each campaign; weekly roll-up",
      "basis": "Derived from the portfolio: 18 of 24 flights completed, 15 reports accepted. Three completed-flight reports remain in review; six planned flights remain.",
      "tone": "amber"
    },
    {
      "name": "India–HQ deliverables accepted on time",
      "headline": "India–HQ commitment reliability",
      "value": "3 / 4 India · 2 / 3 HQ",
      "target": "All dated commitments on time",
      "definition": "India deliverables accepted by HQ / India deliverables due, and HQ product or specialist commitments accepted by India / HQ commitments due. Keep the two directions separate.",
      "why": "Protects Japan / Poland delivery and routes Army SDK findings into the product plan while exposing HQ dependencies.",
      "dependency": "HQ Product and global programme managers; India Engineering owns SDK and research outputs.",
      "trigger": "A product release or specialist allocation forecasts late against a customer critical path.",
      "cadence": "Weekly; rolling 30 days",
      "basis": "Assume prior 30-day acceptance of 3/4 India outputs and 2/3 HQ inputs. Future checkpoints: HQ staffing 16 Sep, release 25 Sep, India SDK pack 30 Sep and research review 09 Oct.",
      "tone": "amber"
    }
  ]
},
{
  "id": "finance",
  "name": "Finance, Commercial & Legal",
  "mandate": "Turn accepted commitments into cash and protect programme economics and licence rights.",
  "owner": "India Finance & Commercial lead with HQ Legal",
  "kpis": [
    {
      "name": "Contractual receipts collected on time",
      "headline": "Cash received by due date",
      "value": "4 / 5 receipts",
      "target": "At least 95% on time",
      "definition": "Receipts collected by contractual due date / receipts due since the portfolio started on 01 Jun 2026, shown alongside the value and contracting entity.",
      "why": "Separates booked contract value, acceptance, invoicing and cash received.",
      "dependency": "Programmes supplies acceptance; Commercial clears invoicing; each entity Treasury collects.",
      "trigger": "Any invoice overdue more than 7 days or forecast acceptance moves a receipt in the next 90 days.",
      "cadence": "Weekly cash review; monthly close",
      "basis": "Assume all 5 settled first-stage portfolio receipts, totalling $5.33M, were due between 01 Jun and 07 Sep 2026; 4 were on time and 1 was collected 5 days late. Future $3.25M receipts remain conditional on Army and JSW acceptance.",
      "tone": "amber"
    },
    {
      "name": "India operating forecast against allocation",
      "headline": "India spend vs allocation",
      "value": "$615k / $660k",
      "target": "Stay within $660k allocation",
      "definition": "Forecast India people, support and operating cash spend for the next 13 weeks / the agreed India allocation. Show headroom separately from cross-entity contract receipts.",
      "why": "Keeps Army recovery, bid work and engagement spending affordable.",
      "dependency": "People, Engineering and BD supply forecasts; HQ agrees the India funding allocation.",
      "trigger": "Forecast spend exceeds the allocation, or a weekly payment lacks a dated funding transfer.",
      "cadence": "Weekly; rolling 13 weeks",
      "basis": "Assume $615k forecast against $660k allocation, leaving $45k headroom. Forecast includes the $45k Army recovery allowance, $30k first bid tranche and $33k engagement budget. These are inside the forecast, not additions.",
      "tone": "green"
    },
    {
      "name": "Forecast programme margin erosion",
      "headline": "Programme margin vs baseline",
      "value": "33% vs 35%",
      "target": "Preserve 35% baseline",
      "definition": "Forecast contract contribution after matched programme delivery costs / contract value, compared with the approved baseline on unchanged scope.",
      "why": "Makes engineering overruns and unpriced scope visible over a multi-year contract.",
      "dependency": "Programme and Engineering leads forecast remaining effort; HQ Finance validates entity allocations.",
      "trigger": "At least 2 percentage points erosion or an unpriced scope change before work starts.",
      "cadence": "Monthly; at scope or schedule change",
      "basis": "Assume Army contract $20M, baseline delivery cost $13M and current estimate-at-completion $13.4M: margin 35% versus 33%. This programme contribution excludes India overhead, taxes and financing; the independent sensitivity model retains its own inputs.",
      "tone": "amber"
    },
    {
      "name": "Licence obligations ready for next gate",
      "headline": "Licence obligations ready",
      "value": "4 / 5 contracts",
      "target": "5 / 5 before next activation or handover",
      "definition": "Contracts with recorded scope of use, priced rights, activation / expiry dates and agreed renewal / reporting owner / active contracts.",
      "why": "Prevents an integration demonstration from implying production rights and protects licence and renewal value.",
      "dependency": "Global Legal / Product owns rights; Commercial records terms; Engineering controls entitlement handover.",
      "trigger": "Unresolved rights within 30 days of licence activation or any renewal without an owner 90 days before expiry.",
      "cadence": "Monthly; before activation or scope change",
      "basis": "Assume 4 of 5 contract registers complete; Poland test-licence handover scope requires HQ Legal closure by 25 Sep. Licence amounts are included in contract totals; proposed royalties and renewals are not booked twice.",
      "tone": "amber"
    }
  ]
},
{
  "id": "people",
  "name": "People & HR",
  "mandate": "Put qualified people on dated commitments without double-booking India and HQ teams.",
  "owner": "India People lead with Engineering managers",
  "kpis": [
    {
      "name": "Committed engineering capacity coverage",
      "headline": "Committed capacity coverage",
      "value": `${PORTFOLIO_TOTALS.assigned} / ${PORTFOLIO_TOTALS.required} engineers`,
      "target": "28 / 28 for committed programme gates",
      "definition": "Named, available and qualified engineers allocated once to committed work / engineers required by the dated programme plan.",
      "why": "Connects headcount to Army, OEM, JSW, Japan, Poland and protected SDK capacity.",
      "dependency": "Engineering defines needs and allocation; HQ supplies specialists; MD resolves priorities.",
      "trigger": "A critical workstream is uncovered 14 days before its gate or a person is allocated beyond available capacity.",
      "cadence": "Weekly; rolling 90-day allocation",
      "basis": "Derived from the portfolio: Army 9/11, OEM 4/5, JSW 2/2, Japan 3/5, Poland 2/3, SDK/research 2/2. Assigned staff are distinct from open requests and the non-post OEM adviser.",
      "tone": "red"
    },
    {
      "name": "Critical capacity gaps with cover plans",
      "headline": "Critical gap cover plans",
      "value": "3 / 6 provisional",
      "target": "6 / 6 confirmed before required start",
      "definition": "Unfilled required engineering posts with a named proposed cover person and start date / required unfilled posts. Show provisional versus confirmed status; do not count planned cover as assigned capacity.",
      "why": "Tests whether the six-person shortage has a credible closure plan rather than just requisitions.",
      "dependency": "HQ staffing owners, hiring managers and Finance funding allocation.",
      "trigger": "Any gap lacks a confirmed cover date 14 days before the affected milestone.",
      "cadence": "Weekly until all critical gaps have cover",
      "basis": "Assume 3 of the 6 missing posts have provisional named cover: Army 1, Japan 1 and Poland 1. None has started; all remain outside the 22 assigned. MD ratification and HQ confirmation are due 16 Sep. Treat provisional cover as at risk until ratified.",
      "tone": "amber"
    },
    {
      "name": "New staff ready for programme work",
      "headline": "Time to productive deployment",
      "value": "3 / 4 people",
      "target": "All ready within 30 days",
      "definition": "New hires or transfers signed off by the manager as independently ready for their assigned work within 30 days / starters reaching day 30 in the last 90 days.",
      "why": "Measures useful capacity rather than hiring activity, including product access, training and required tools.",
      "dependency": "Manager owns work readiness; HQ Product and IT provide access and enablement.",
      "trigger": "A starter reaches day 30 without readiness sign-off, affecting the assigned programme gate.",
      "cadence": "Monthly; rolling 90 days",
      "basis": "Assume 4 starters reached day 30, 3 were signed off; the fourth needs product-access training and is excluded from the 22 qualified assigned engineers. This historical cohort is separate from the six current staffing gaps.",
      "tone": "amber"
    }
  ]
},
];
