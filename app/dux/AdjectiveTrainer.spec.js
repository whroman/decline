import { assert } from 'chai';
import rewire from 'rewire';
const AdjectiveTrainer = rewire('./AdjectiveTrainer.js');
const {
    initialState,
    mergeCreationParams,
    loadState
} = AdjectiveTrainer;

describe('Dux', () => describe('AdjectiveTrainer', () => {
    describe('reducer', () => {
        it('returns unaltered state when given an unexpected action', () => {
            assert.deepEqual(
                AdjectiveTrainer.default(initialState, { type: 'foo' }),
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
                    nounKategorie: null,
                    adjectiveKategorie: null
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
                    nounKategorie: undefined,
                    adjectiveKategorie: undefined,
                };
                assert.deepEqual(
                    mergeCreationParams(initialState, payload),
                    {
                        amount: undefined,
                        gender: initialState.gender,
                        kasus: initialState.kasus,
                        nounKategorie: initialState.nounKategorie,
                        adjectiveKategorie: initialState.adjectiveKategorie,
                    }
                )
            });
        });
    });

    describe('#loadState', () => {
        it('returns an empty object if localStorage is not available', () => {
            assert.deepEqual(loadState(), {})
        });

        it('returns a parsed JSON from localStorage if localStorage is available', () => {
            const json = { testKey: 'testVal' };
            AdjectiveTrainer.__with__({
                window: {
                    localStorage: {
                        getItem: () => JSON.stringify(json)
                    }
                }
            })(() => {
                assert.deepEqual(loadState(), json);
            });
        });
    });
}));