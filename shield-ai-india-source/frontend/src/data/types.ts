export type EvidenceClass = 'official' | 'shield' | 'industry' | 'modelled';
export type Confidence = 'High' | 'Medium' | 'Low';
export type Horizon = 'execute' | 'build' | 'seed';

export interface Source {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  cls: EvidenceClass;
}

export interface Claim {
  id: string;
  label: string;
  value?: string;
  unit?: string;
  horizon?: string;
  cls: EvidenceClass;
  sourceIds: string[];
  confidence: Confidence;
  interpretation: string;
  assumption?: string;
  formula?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  short: string;
  bet: 'scale' | 'embed' | 'expand' | 'seed';
  horizon: Horizon;
  product: string[];
  mission: string;
  buyer: string;
  prime?: string;
  platform?: string;
  budgetUniverse: string;
  programmeValue: string;
  valueTag: string;
  scores: { urgency: number; fit: number; access: number; budget: number; leverage: number };
  size: number;
  component?: boolean;
  claimIds: string[];
  precedentId?: string;
  note: string;
}

export interface Account {
  id: string;
  name: string;
  kind: 'service' | 'oem' | 'rnd';
  city: string;
  mission: string;
  platforms: string[];
  wedge: string;
  entry: string;
  buyer: string;
  techSponsor: string;
  decisionPath: string;
  geography: string;
  precedentId?: string;
  horizon: string;
  access: 'High' | 'Medium' | 'Low';
  claimIds: string[];
  chain?: { stage: string; who: string; label: string }[];
}

export interface Precedent {
  id: string;
  country: string;
  title: string;
  type: 'Operational deployment' | 'Customer programme' | 'Integration proof' | 'Capability demonstration';
  lesson: string;
  claimIds: string[];
}
