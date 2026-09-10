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
  { id: 'jsw', title: 'JSW Defence', route: 'partner', horizon: 'Now',
    description: 'V-BAT production and sustainment.', shield: 'V-BAT', examples: 'JSW Defence',
    context: 'The established JSW relationship provides the domestic V-BAT manufacturing route. Operator training and MRO are included in the planned ecosystem; detailed service responsibilities, repair scope and readiness dates remain to be agreed.',
    accounts: [], programmes: [], claimIds: ['c-jsw'] },
  { id: 'simulators', title: 'Simulation & training integrators', route: 'partner', horizon: 'Next',
    description: 'Aechelon visual simulation through prospective training-system integrators.', shield: 'Aechelon simulation and synthetic environments',
    context: 'A proposed channel through Indian simulator manufacturers and training-system integrators incorporating Aechelon visual simulation. Specific Indian integrators and demand remain to be validated; this is an area to explore, not an established partnership.',
    accounts: [], programmes: [], claimIds: ['c-aechelon'] },
  { id: 'army', title: 'Army ISR', route: 'direct', horizon: 'Now',
    description: 'An established Army reference provides the current foothold.', shield: 'V-BAT + Hivemind', examples: 'Indian Army',
    context: 'The Army selection and SDK licence establish the current foothold, supported by the JSW domestic manufacturing route. Potential expansion includes broader tactical ISR deployments and locally developed multi-agent mission autonomy. The reported Army drone demand is a directional signal, not a confirmed Shield pipeline.',
    accounts: [], programmes: ['army'], claimIds: ['c-army-select', 'c-army-sdk', 'c-jsw', 'c-army-drones', 'c-hivemind-agnostic'] },
  { id: 'maritime-isr', title: 'Maritime ISR', route: 'direct', horizon: 'Next',
    description: 'Persistent surveillance and shipborne operations extend the ISR foothold.', shield: 'V-BAT + Hivemind + ISR services', examples: 'Indian Navy · Indian Coast Guard',
    context: 'Potential fit spans sensors, distributed sensing, mission/control centres and ISR-as-a-service. Navy shipborne UAS and Coast Guard UAS / MALE needs are distinct: a MALE requirement does not establish V-BAT eligibility. Coast Guard procurement details and service models remain to validate in the retained research.',
    accounts: [], programmes: ['navy', 'coastguard'], claimIds: ['c-nsuas', 'c-rnln', 'c-vidar', 'c-vbat'] },
  { id: 'airforce', title: 'Air Force Teaming', route: 'direct', horizon: 'Next',
    description: 'Potential service-led demand for swarm systems and collaborative air missions.', shield: 'Hivemind Enterprise + mission autonomy', examples: 'Indian Air Force',
    context: 'IAF swarm experimentation and the wider air-teaming ecosystem provide areas to investigate for mission autonomy. Existing indigenous systems and HAL CATS are research signals, not confirmed Shield opportunities. Service access, platform interfaces and programme eligibility require validation.',
    accounts: [], programmes: ['airforce'], claimIds: ['c-ayaan-incumbency', 'c-cats', 'c-nrt', 'c-hivemind-agnostic'] },
  { id: 'defence-space', title: 'Defence Space', route: 'direct', horizon: 'Future',
    description: 'Potential government route for defence surveillance and constellation mission autonomy.', shield: 'Potential Hivemind mission software', examples: 'Defence Space Agency',
    context: 'Defence surveillance and constellation mission management are longer-term areas for discovery. SBS-III is a programme signal; the on-orbit autonomy precedent does not establish a Defence Space Agency requirement or a Shield contract. The direct procurement route remains to validate.',
    accounts: [], programmes: ['space'], claimIds: ['c-sbs3', 'c-novi'] },
  { id: 'airborne', title: 'Aircraft & UAV OEMs', route: 'partner', horizon: 'Next',
    description: 'Become the autonomy layer inside an Indian-built aircraft.', shield: 'Hivemind Enterprise + Solutions', examples: 'HAL · NewSpace; MALE: Tata · Mahindra · Bharat Forge',
    context: 'This route concerns onboard autonomy integrated into an aircraft, with the aircraft manufacturer as the integration counterpart. MALE, HAPS, CCA, future unmanned aircraft and manned-unmanned teaming create platform-led routes. The 87-MALE requirement is one shared programme, not additive opportunities for each potential prime. Names are examples, not confirmed partnerships.',
    accounts: ['hal', 'newspace'], programmes: ['airforce'], claimIds: ['c-male', 'c-male-pipeline', 'c-haps', 'c-cats', 'c-hal-warrior-2026', 'c-lt-incumbent', 'c-adani-incumbent', 'c-tasl-lm'] },
  { id: 'maritime-autonomy', title: 'Maritime autonomy', route: 'partner', horizon: 'Next',
    description: 'Mission autonomy for surface, undersea and shipborne systems.', shield: 'Hivemind Maritime + Solutions', examples: 'Saga Defence · L&T · Adani',
    context: 'Indian naval primes, shipyards and systems companies can provide access to autonomous surface vessels, undersea systems, mine countermeasures, ASW and shipborne unmanned programmes. Product fit must be established separately for each domain.',
    accounts: ['grse', 'kssl', 'mdl'], programmes: [], claimIds: ['c-grse-platforms', 'c-kssl-underwater', 'c-mdl-xlauv', 'c-tt'] },
  { id: 'integrators', title: 'Defence primes', route: 'partner', horizon: 'Next',
    description: 'Potential autonomy integration into mission systems and command-and-control architectures.', shield: 'Potential Hivemind mission-system integration', examples: 'BEL',
    context: 'This route concerns mission systems and command-and-control architectures delivered by a defence prime, with BEL as a prospective example. Potential Hivemind integration requires validation of technical fit, programme access and system interfaces. The aircraft OEM route concerns onboard aircraft autonomy; these routes distinguish integration scope rather than mutually exclusive companies, and must not be counted as additive opportunities within one programme. No established Shield partnership is implied.',
    accounts: ['bel'], programmes: [], claimIds: ['c-bel-platforms', 'c-bel-a2ncs', 'c-hivemind-agnostic'] },
  { id: 'space', title: 'Space Autonomy', route: 'partner', horizon: 'Future',
    description: 'Longer-term possibilities in satellite, constellation and edge autonomy.', shield: 'Potential autonomy / mission software', examples: 'Ananth · Centum',
    context: 'Defence space, satellite autonomy, constellation coordination and edge autonomy remain future possibilities. The route could be through Indian satellite/platform partners or direct strategic programmes. An on-orbit demonstration does not establish current Indian business.',
    accounts: [], programmes: ['space'], claimIds: ['c-sbs3', 'c-novi'] },
];
export const OPPORTUNITY_CLAIM_IDS = [...new Set(OPPORTUNITY_ARENAS.flatMap((arena) => arena.claimIds))];
