/** Explicit crore values; never infer funding status or amounts from display strings. */
export interface FundingValue {
  crore: number;
  qualifier?: '≈' | '≥';
  status: string;
  period: string;
  scope: string;
  claimIds: string[];
  bucket?: 'contracted' | 'sanctioned' | 'estimated';
  overlapNote?: string;
}
export const AREA_FUNDING: Record<string, FundingValue> = {
  mod: { crore: 82217.82, status: 'Other Equipment acquisition head', period: 'FY2026–27 · annual', scope: 'Other Equipment acquisition head only. Aircraft & Aero Engines and Naval Fleet allocations are excluded. This is a broad equipment funding pool, not an autonomy earmark; the programme cards cover wider capability areas and are not an accounting breakdown of this head.', claimIds: ['c-cap-other-equipment'] },
  'future-drdo': { crore: 17250.25, status: 'DRDO capital R&D pool', period: 'FY2026–27 · annual', scope: 'Capital R&D only, excluding DRDO revenue expenditure. iDEX / ADITI are separate DIO / DDP routes and are not subdivisions of this allocation. Autonomy-specific potential is not established.', claimIds: ['c-drdo-capital', 'c-market-innovation-routes'] },
  'future-coastguard': { crore: 4000, status: 'Coast Guard capital pool', period: 'FY2026–27 · annual', scope: 'Capital allocation only; excludes revenue spending. No separate UAS or autonomy allocation is established.', claimIds: ['c-coastguard-budget'] },
  'future-mha': { crore: 343.66, status: 'CAPF modernisation pool', period: 'FY2026–27 · annual', scope: 'Modernisation Plan IV allocation, not the entire MHA or Police budget. No autonomy earmark is assumed.', claimIds: ['c-capf-modernisation'] },
  'future-space': { crore: 26968, status: 'Reported SBS-III envelope', period: 'Multi-year · target ~2029', scope: 'SBS-III programme envelope used as the available funding context. Same amount as the programme below; do not add twice. Autonomy content is not separately disclosed.', claimIds: ['c-sbs3'] },
};
export const PROGRAMME_FUNDING: Record<string, FundingValue> = {
  'mod-p-tactical': { crore: 16000, qualifier: '≈', status: 'Reported pipeline estimate', period: 'Multi-year · schedule unspecified', scope: 'Broad Army drone demand signal, potentially including individual drone and loitering-munition programmes.', claimIds: ['c-army-drones'], bucket: 'estimated', overlapNote: 'Included in the gross sum; this broad pipeline may overlap individual programmes.' },
  'mod-p-male': { crore: 30050, status: 'Reported tender estimate', period: 'Multi-year · schedule unspecified', scope: 'Full 87-aircraft procurement estimate; not a sanction, autonomy-software allocation or Shield revenue estimate.', claimIds: ['c-male-pipeline'], bucket: 'estimated' },
  'mod-p-loitering': { crore: 1577, status: 'Contracted · reported', period: 'Contract Aug 2026 · 12-month delivery reported', scope: 'Reported combined TASL and NIBE loitering-munition contract value, counted once.', claimIds: ['c-tasl-lm'], bucket: 'contracted' },
  'future-space-satellites': { crore: 26968, status: 'Reported programme value', period: 'Multi-year · target ~2029', scope: 'Full 52-satellite SBS-III programme. Reporting does not establish a separately addressable autonomy allocation.', claimIds: ['c-sbs3'], bucket: 'estimated' },
};
export function formatCrore(value: number, qualifier = '') {
  return `${qualifier}₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })} cr`;
}
export function programmeFundingTotal(ids: string[]) {
  const unique = [...new Set(ids)];
  const included = unique.flatMap(id => {
    const value = PROGRAMME_FUNDING[id];
    return value ? [value] : [];
  });
  const sum = (bucket?: FundingValue['bucket']) => included.filter(v => !bucket || v.bucket === bucket).reduce((total, v) => total + v.crore, 0);
  return { total: sum(), contracted: sum('contracted'), sanctioned: sum('sanctioned'), estimated: sum('estimated'), counted: included.length, undisclosed: unique.filter(id => !PROGRAMME_FUNDING[id]).length, overlapping: unique.filter(id => PROGRAMME_FUNDING[id]?.overlapNote).length, qualifier: included.some(v => v.qualifier === '≥') ? '≥' : included.some(v => v.qualifier === '≈') ? '≈' : '', claimIds: [...new Set(included.flatMap(v => v.claimIds))] };
}
