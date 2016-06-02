import { assert } from 'chai';
import AdjectiveTrainer, {
    initialState,
    mergeCreationParams
} from 'app/dux/AdjectiveTrainer.js';

describe('Dux', () => {
    describe('AdjectiveTrainer', () => {
        describe('reducer', () => {
            it('returns unaltered state when given an unexpected action', () => {
                assert.deepEqual(
                    AdjectiveTrainer(initialState, { type: 'foo' }),
                    initialState
                );
            });
        });

        describe('#mergeCreationParams(state, payload)', () => {
            context('when all payload keys are defined', () => {
                it('returns `payload`', () => {
                    const payload = {
                        amount: 10,
                        gender: null,
                        kasus: null,
                        kategorie: null
                    };
                    assert.deepEqual(
                        mergeCreationParams(initialState, payload),
                        payload
                    )
                });
            });

            context('when all payload keys are undefined', () => {
                it('returns a merged object between `state` and `payload`', () => {
                    const payload = {
                        amount: undefined,
                        gender: undefined,
                        kasus: undefined,
                        kategorie: undefined
                    };
                    assert.deepEqual(
                        mergeCreationParams(initialState, payload),
                        {
                            amount: undefined,
                            gender: initialState.gender,
                            kasus: initialState.kasus,
                            kategorie: initialState.kategorie
                        }
                    )
                });
            });

        });
    });
});