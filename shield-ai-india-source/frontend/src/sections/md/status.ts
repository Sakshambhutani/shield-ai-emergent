export type RagTone = 'red' | 'amber' | 'green' | '';

// An unfinished target is a warning until its reporting deadline has passed.
export function targetTone(actual: number | null, target: number | null, overdue = false): RagTone {
 if (actual === null || target === null || target <= 0) return '';
 return actual >= target ? 'green' : overdue ? 'red' : 'amber';
}
export function budgetTone(variance: number | null): RagTone {
 return variance === null ? '' : variance > 0 ? 'red' : 'green';
}
export function dueTone(due: string, asOf: string, complete = false): RagTone {
 return complete ? 'green' : due < asOf ? 'red' : 'amber';
}
export function metricTone(tone: RagTone): string { return tone ? `mc-${tone}` : ''; }
