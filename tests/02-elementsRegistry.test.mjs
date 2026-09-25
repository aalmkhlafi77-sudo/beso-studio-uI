import test from 'node:test';
import assert from 'node:assert/strict';
import { ELEMENTS_CONFIG, createInitialWorkspaceState } from '../src/data/elementsRegistry.js';

test('workspace exposes the planned core elements and keeps later engines visible', () => {
  assert.deepEqual(
    ELEMENTS_CONFIG.filter((element) => element.status === 'active').map((element) => element.id),
    ['button', 'card', 'input', 'badge', 'social']
  );
  assert.deepEqual(
    ELEMENTS_CONFIG.filter((element) => element.status === 'coming_soon').map((element) => element.id),
    ['hero', 'particles']
  );
});

test('workspace defaults select the button and keep independent module values', () => {
  const first = createInitialWorkspaceState();
  first.elementParams.card.title = 'Changed';
  const second = createInitialWorkspaceState();

  assert.equal(first.activeElement, 'button');
  assert.equal(second.elementParams.card.title, 'بطاقة Beso الفاخرة');
  assert.equal(second.elementParams.input.placeholder, 'ادخل بريدك هنا...');
  assert.equal(second.elementParams.badge.label, 'عنصر فاخر VIP');
});
