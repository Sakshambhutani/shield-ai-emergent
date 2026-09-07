import type { CUSTOMER_PROGRAMMES } from './platform-ecosystem';

export interface OpportunityArena {
  id: string;
  title: string;
  route: 'direct' | 'psu' | 'partner';
  horizon: 'Now' | 'Next' | 'Future';
  description: string;
  shield: string;
  examples?: string;
  context: string;
  accounts: string[];
  programmes: (keyof typeof CUSTOMER_PROGRAMMES)[];
  claimIds: string[];
}

export const OPPORTUNITY_ARENAS: OpportunityArena[] = [
  { id: 'army', title: 'Army tactical ISR', route: 'direct', horizon: 'Now',
    description: 'An established Army reference provides the current foothold.', shield: 'V-BAT + Hivemind', examples: 'Indian Army',
    context: 'The Army selection and SDK licence establish the beachhead. JSW provides the supporting domestic manufacturing route.',
    accounts: [], programmes: ['army'], claimIds: ['c-army-select', 'c-army-sdk', 'c-jsw'] },
  { id: 'maritime-isr', title: 'Maritime ISR', route: 'direct', horizon: 'Next',
    description: 'Persistent surveillance and shipborne operations extend the ISR foothold.', shield: 'V-BAT + Hivemind + ISR services', examples: 'Navy · Coast Guard',
    context: 'Potential fit spans sensors, distributed sensing, mission/control centres and ISR-as-a-service. Navy shipborne UAS and Coast Guard UAS / MALE needs are distinct: a MALE requirement does not establish V-BAT eligibility. Coast Guard procurement details and service models remain to validate in the retained research.',
    accounts: [], programmes: ['navy', 'coastguard'], claimIds: ['c-nsuas', 'c-rnln', 'c-vidar', 'c-vbat'] },
  { id: 'control', title: 'Mission software / control layer', route: 'direct', horizon: 'Next',
    description: 'Common control and multi-agent coordination across existing drone fleets.', shield: 'Hivemind Solutions + autonomy layer',
    context: 'A potential software route where the user does not need another airframe: common control, multi-platform mission management, ISR command and autonomy orchestration across heterogeneous drones. Demand and interfaces need validation.',
    accounts: ['newspace'], programmes: [], claimIds: ['c-hivemind-agnostic', 'c-army-sdk', 'c-army-drones', 'c-raphe-incumbency', 'c-ayaan-incumbency'] },
  { id: 'strategic', title: 'Strategic direct programmes', route: 'direct', horizon: 'Future',
    description: 'Selected Air Force, tri-service and specialised ISR autonomy programmes.', shield: 'Hivemind + mission autonomy',
    context: 'Longer-term room to expand through advanced autonomy, specialised ISR and strategic government programmes. These are possible domains, not established Shield opportunities.',
    accounts: [], programmes: ['drdo'], claimIds: ['c-hivemind-agnostic', 'c-aechelon'] },
  { id: 'airborne', title: 'Large airborne platform programmes', route: 'partner', horizon: 'Next',
    description: 'Become the autonomy layer inside an Indian-built aircraft.', shield: 'Hivemind Enterprise + Solutions', examples: 'MALE: Tata · Mahindra · Bharat Forge',
    context: 'MALE, HAPS, CCA, future unmanned aircraft and manned-unmanned teaming create platform-led routes. The 87-MALE requirement is one shared programme, not additive opportunities for each potential prime. Names are examples, not confirmed partnerships.',
    accounts: ['hal', 'newspace'], programmes: ['airforce'], claimIds: ['c-male', 'c-male-pipeline', 'c-haps', 'c-cats', 'c-hal-warrior-2026', 'c-lt-incumbent', 'c-adani-incumbent', 'c-tasl-lm'] },
  { id: 'maritime-autonomy', title: 'Maritime autonomy', route: 'partner', horizon: 'Next',
    description: 'Mission autonomy for surface, undersea and shipborne systems.', shield: 'Hivemind Maritime + Solutions', examples: 'Saga Defence · L&T · Adani',
    context: 'Indian naval primes, shipyards and systems companies can provide access to autonomous surface vessels, undersea systems, mine countermeasures, ASW and shipborne unmanned programmes. Product fit must be established separately for each domain.',
    accounts: ['grse', 'kssl', 'mdl'], programmes: [], claimIds: ['c-grse-platforms', 'c-kssl-underwater', 'c-mdl-xlauv', 'c-tt'] },
  { id: 'integrators', title: 'Systems & C2', route: 'psu', horizon: 'Next',
    description: 'Software and orchestration through electronics, C2 and mission-system providers.', shield: 'Hivemind Solutions + orchestration', examples: 'BEL · HAL · Goa Shipyard · GRSE · Mazagon',
    context: 'Some architectures sit with defence electronics, sensor, C2 or mission-system providers. Shield’s potential role is the software, autonomy and orchestration layer, subject to access to system interfaces.',
    accounts: ['bel'], programmes: [], claimIds: ['c-bel-platforms', 'c-bel-a2ncs', 'c-hivemind-agnostic'] },
  { id: 'space', title: 'Space / advanced autonomy', route: 'partner', horizon: 'Future',
    description: 'Longer-term possibilities in satellite, constellation and edge autonomy.', shield: 'Potential autonomy / mission software', examples: 'Ananth · Centum',
    context: 'Defence space, satellite autonomy, constellation coordination and edge autonomy remain future possibilities. The route could be through Indian satellite/platform partners or direct strategic programmes. An on-orbit demonstration does not establish current Indian business.',
    accounts: [], programmes: ['space'], claimIds: ['c-sbs3', 'c-novi'] },
];
export const OPPORTUNITY_CLAIM_IDS = [...new Set(OPPORTUNITY_ARENAS.flatMap((arena) => arena.claimIds))];
