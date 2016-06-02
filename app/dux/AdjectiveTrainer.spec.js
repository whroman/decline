import { assert } from 'chai';
import AdjectiveTrainer, { initialState } from 'app/dux/AdjectiveTrainer.js';

describe('Dux', () => {
    describe('AdjectiveTrainer', () => {
        it('returns unaltered state when given an unexpected action', () => {
            assert.deepEqual(
                AdjectiveTrainer(initialState, { type: 'foo' }),
                initialState
            );
        });
    });
});