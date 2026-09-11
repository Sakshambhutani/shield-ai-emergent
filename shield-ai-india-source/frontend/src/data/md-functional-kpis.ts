import { PEOPLE_METRICS } from './md-people';
import { OPERATING_FUNCTIONS, OPERATING_MODEL_KPIS } from './operating-model';

interface KpiSnapshot {
  value: string;
  target: string;
  period: string;
  context: string;
  details: { label: string; text: string }[];
}

// Dedicated build-stage examples; no changes to the Overview portfolio scenario.
const SNAPSHOTS: Record<string, KpiSnapshot[]> = {
  "growth": [
    {
      "value": "1 / 2",
      "target": "2 new customer-backed programmes in six months",
      "period": "Six-month build plan",
      "context": "Illustrative: one Indian platform partner has agreed an ISR integration scope.",
      "details": [
        {
          "label": "Commitment evidence",
          "text": "Named partner engineering team and platform access committed; a customer engineering sponsor owns the evaluation. Written scope and resource commitment required to count."
        },
        {
          "label": "Next commercial decision",
          "text": "Partner sponsor to decide on the paid integration proposal at the next monthly review; proposal scope, decision date and owner recorded in the opportunity log."
        },
        {
          "label": "Army follow-on",
          "text": "Tracked separately from new programmes. No additional Army follow-on award included in this example."
        },
        {
          "label": "Target basis",
          "text": "Two is a proposed management target subject to engineering capacity. Meetings, general MoUs, AoN and RFP activity alone do not qualify."
        }
      ]
    }
  ],
  "programmes": [
    {
      "value": "+7 days",
      "target": "0 days against the agreed milestone date",
      "period": "Illustrative end-of-month-two review",
      "context": "Next milestone: ISR use-case and integration scope agreement. Forecast worsened by 3 days since last week.",
      "details": [
        {
          "label": "Date comparison",
          "text": "Agreed completion: review date + 7 days. Current forecast: review date + 14 days. Previous weekly forecast: review date + 11 days. Variance +7 days; weekly movement +3 days."
        },
        {
          "label": "Completion evidence",
          "text": "Customer-approved ISR use-case scope and agreed integration boundaries, with programme and engineering owners signing off."
        },
        {
          "label": "Accountability",
          "text": "Programme lead owns recovery and confirms customer inputs and partner access at the next weekly review."
        }
      ]
    },
    {
      "value": "75%",
      "target": "100%",
      "period": "Illustrative end-of-month-two review",
      "context": "3 of 4 milestones due were formally accepted on time.",
      "details": [
        {
          "label": "Calculation",
          "text": "Three milestones accepted by their original agreed due dates divided by four milestones due in the reporting period. The fourth remains in the denominator even if accepted late or still outstanding."
        }
      ]
    }
  ],
  "autonomy": [
    { value: "80%", target: "100%", period: "Illustrative end-of-month-two review", context: "4 of 5 engineering outputs due accepted on time.", details: [{ label: "Basis", text: "Acceptance against agreed checks by original due dates; late and outstanding commitments remain in the denominator." }] },
    { value: "2", target: "0", period: "Illustrative end-of-month-two review", context: "Customer inputs and HQ configuration access threaten upcoming engineering commitments.", details: [{ label: "Scope", text: "Critical dependencies tracked by owner, age and required resolution date, including before flight testing." }] }
  ],
  "people": PEOPLE_METRICS,
  "finance": [
    {
      "value": "18 months",
      "target": ">15 months",
      "period": "Six-month hiring-plan funding forecast",
      "context": "Coverage includes planned growth from 20 to 45 people.",
      "details": [
        {
          "label": "Funding basis",
          "text": "User-provided planning assumption: 18 months. The dated cash forecast must include accessible cash and confirmed funding availability against payroll, hiring and other expenditure."
        },
        {
          "label": "Review action",
          "text": "Finance refreshes coverage monthly and after material hiring or expenditure changes. Escalate at 15 months or below, or earlier if any payment precedes funding availability."
        },
        {
          "label": "Reporting boundary",
          "text": "Portfolio contract values, proposed allocations and expected receipts do not automatically count as available India funding."
        }
      ]
    },
    {
      "value": "+5%",
      "target": "\u22640% overspend",
      "period": "Illustrative last closed month",
      "context": "Actual spend $210k against approved budget $200k.",
      "details": [
        {
          "label": "Calculation",
          "text": "($210k \u2212 $200k) \u00f7 $200k \u00d7 100 = +5%, or $10k overspend."
        },
        {
          "label": "Variance explanation",
          "text": "Illustrative $10k unplanned onboarding and equipment expense. Finance and People leads reconcile the expense and revise the remaining-period forecast."
        },
        {
          "label": "Review action",
          "text": "Monthly close review; agree corrective action for overspend and investigate material underspend that signals delayed execution. This is distinct from the existing portfolio\u2019s 13-week forecast."
        }
      ]
    }
  ],
  "industrialisation": [
    {
      "value": "6 / 8",
      "target": "8 / 8 by agreed package completion",
      "period": "Illustrative end-of-month-two transfer review",
      "context": "6 accepted; 6 due by this review; 2 remaining; 0 overdue.",
      "details": [
        {
          "label": "Package boundary",
          "text": "Fixed Shield-to-JSW transfer package, excluding JSW factory output and HQ-to-India knowledge transfer. Counts do not assume equal deliverable value."
        },
        {
          "label": "Remaining deliverables",
          "text": "Documentation pack: HQ transfer lead, receiving owner JSW technical lead, due review date + 14 days. Training demonstration: India training lead, receiving owner JSW training lead, due review date + 28 days."
        },
        {
          "label": "Acceptance evidence",
          "text": "Receiving-owner sign-off against each deliverable\u2019s agreed criteria. Training acceptance requires demonstration of the agreed task, not attendance alone."
        }
      ]
    },
    { "value": "3 / 8 areas", "target": "8 / 8 by agreed onboarding gates", "period": "Illustrative 01 Oct 2026 snapshot", "context": "Eight illustrative capability areas: three onboarded, two evaluating, two qualifying and one selected. Counts represent onboarding coverage, not deliveries.", "details": [{ "label": "Ownership", "text": "Shield supports identification and technical approval; JSW owns commercial selection and onboarding. Supplier records are illustrative." }] },
    { "value": "3 / 4 due", "target": "All due deliverables accepted", "period": "Illustrative 01 Oct 2026 snapshot", "context": "3/5 total accepted; 4 due; 1 overdue; 1 future.", "details": [{ "label": "Pending", "text": "Qualification support package overdue since 30 Sep; onboarding handover due 30 Nov. Separate from production and MRO transfer packages." }] }
  ]
};

export const MD_FUNCTIONAL_KPIS = ['growth', 'programmes', 'autonomy', 'people', 'finance', 'industrialisation'].map(id => {
  const team = OPERATING_FUNCTIONS.find(team => team.id === id)!;
  return {
    id,
    name: id === 'autonomy' ? 'Hivemind Engineering' : team.name,
    owner: team.owner,
    kpis: OPERATING_MODEL_KPIS[id].map((metric, index) => ({ ...metric, ...SNAPSHOTS[id][index] })),
  };
});
