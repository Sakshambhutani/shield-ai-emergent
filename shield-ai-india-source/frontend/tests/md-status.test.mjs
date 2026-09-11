import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

test('dashboard status distinguishes unfinished targets, missed deadlines, and missing data', async () => {
 const server = await createServer({server:{middlewareMode:true},appType:'custom'});
 try {
  const {targetTone,budgetTone,dueTone} = await server.ssrLoadModule('/src/sections/md/status.ts');
  assert.equal(targetTone(60,300), 'amber');
  assert.equal(targetTone(60,300,true), 'red');
  assert.equal(targetTone(300,300,true), 'green');
  assert.equal(targetTone(null,300), '');
  assert.equal(targetTone(0,0), '');
  assert.equal(budgetTone(1.5), 'red');
  assert.equal(budgetTone(0), 'green');
  assert.equal(budgetTone(-1), 'green');
  assert.equal(budgetTone(null), '');
  assert.equal(dueTone('2026-10-01','2026-10-01'), 'amber');
  assert.equal(dueTone('2026-09-30','2026-10-01'), 'red');
  assert.equal(dueTone('2026-09-30','2026-10-01',true), 'green');
 } finally { await server.close(); }
});
