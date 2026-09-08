import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true } });
try {
  const p = await server.ssrLoadModule('/src/data/md-people.ts');
  const { MD_FUNCTIONAL_KPIS } = await server.ssrLoadModule('/src/data/md-functional-kpis.ts');
  const sum = (rows, key) => rows.reduce((total, row) => total + row[key], 0);
  // Reconcile plan, position demand, current roster and chart at the same review date.
  assert.equal(sum(p.PEOPLE_PLAN, 'planned'), p.PEOPLE_TARGET - p.PEOPLE_BASE);
  assert.equal(sum(p.PEOPLE_ROLES, 'count'), p.PEOPLE_TARGET - p.PEOPLE_BASE);
  assert.equal(p.PEOPLE_PLAN.at(-1).cumulative, p.PEOPLE_TARGET);
  assert.equal(sum(p.PEOPLE_ROLES, 'joined') + p.PEOPLE_BASE, p.PEOPLE_HEADCOUNT);
  assert.equal(p.PEOPLE_HEADCOUNT, 26);
  assert.equal(p.PEOPLE_JOINS_DUE - p.PEOPLE_JOINED, p.PEOPLE_JOINING_GAPS.length);
  for (const month of p.PEOPLE_PLAN) {
    const rolesDue = p.PEOPLE_ROLES.filter(r => r.due <= month.due);
    const otherAlreadyJoined = p.PEOPLE_STARTERS.filter(s => s.start <= month.due && !rolesDue.some(r => r.role === s.group));
    assert.ok(sum(rolesDue, 'count') + otherAlreadyJoined.length <= month.cumulative - p.PEOPLE_BASE);
  }
  for (const role of p.PEOPLE_ROLES) {
    assert.ok(role.joined + role.accepted + role.offered <= role.count);
    assert.ok(role.screening + role.interviewing + role.offered + role.accepted + role.joined <= role.applied);
  }
  assert.equal(new Set(p.PEOPLE_STARTERS.map(s => s.id)).size, p.PEOPLE_STARTERS.length);
  for (const starter of p.PEOPLE_STARTERS) {
    assert.ok(starter.start <= starter.due);
    assert.ok(!starter.ready || (starter.ready >= starter.start && starter.ready <= p.PEOPLE_AS_OF));
  }
  assert.equal(p.PEOPLE_READINESS_DUE.length - p.PEOPLE_READY, p.PEOPLE_STARTERS.filter(s => !s.ready && s.due <= p.PEOPLE_AS_OF).length);
  for (const role of p.PEOPLE_CRITICAL_ROLES) {
    const daysAhead = (Date.parse(role.due) - Date.parse(p.PEOPLE_AS_OF)) / 86400000;
    assert.ok(daysAhead >= 0 && daysAhead <= 90);
  }
  assert.ok(p.PEOPLE_UNCOVERED.every(c => c.action && c.owner && c.due));
  const functional = MD_FUNCTIONAL_KPIS.find(team => team.id === 'people').kpis;
  assert.deepEqual(functional.map(k => [k.name, k.value, k.definition]), p.PEOPLE_METRICS.map(k => [k.name, k.value, k.definition]));
  assert.deepEqual(p.PEOPLE_METRICS.map(k => k.value), ['6 / 8', '3 / 4', '5 / 6', '2']);
  console.log('HR scenario checks passed: hiring, readiness, coverage and functional KPIs reconcile.');
} finally {
  await server.close();
}
