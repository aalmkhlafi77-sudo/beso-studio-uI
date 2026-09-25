import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialEffectState, initialEffectState, surfaceModel, animationModel, hoverModel } from '../src/data/effects.js';

test('every adjustable option parameter has a default matching initial state', () => {
  const state = createInitialEffectState();
  for (const [model, key] of [[surfaceModel, 'surfaceParams'], [animationModel, 'animationParams'], [hoverModel, 'hoverParams']]) {
    for (const option of model.options) {
      for (const param of option.params) {
        assert.notEqual(param.default, undefined, `${option.id}.${param.id} needs a default`);
        assert.equal(state[key][option.id][param.id], param.default);
      }
    }
  }
});

test('reset state factory returns independent nested values', () => {
  const first = createInitialEffectState();
  first.surfaceParams.glass.blurAmount = 40;
  assert.equal(initialEffectState.surfaceParams.glass.blurAmount, 16);
  assert.equal(createInitialEffectState().surfaceParams.glass.blurAmount, 16);
});

test('text color and font size have independent defaults', () => {
  const state = createInitialEffectState();
  assert.equal(state.globalParams.textColor, '#ffffff');
  assert.equal(state.globalParams.fontSize, 16);
});

test('button weight and icon settings are included in the reset defaults', () => {
  const state = createInitialEffectState();
  assert.equal(state.globalParams.fontWeight, 600);
  assert.equal(state.globalParams.showIcon, true);
  assert.equal(state.globalParams.iconPosition, 'after');
  assert.equal(state.globalParams.iconType, 'arrow-left');
});
