import { assert } from 'chai';
import reducer, {
    initialState,
    mergeCreationParams,
    loadState,
    saveState
} from './AdjectiveTrainer';

describe('Dux', () => describe('AdjectiveTrainer', () => {
    describe('reducer', () => {
        it('returns unaltered state when given an unexpected action', () => {
            assert.deepEqual(
                reducer(initialState, { type: 'foo' }),
                initialState
            );
        });
    });

    describe('#mergeCreationParams(state, payload)', () => {
        context('when all payload keys are defined', () => {
            it('explicit filters, including null, override saved defaults @allure.label.story:adjectives.settings @allure.id:settings.explicit', () => {
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
            it('undefined filters inherit saved defaults @allure.label.story:adjectives.settings @allure.id:settings.defaults', () => {
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
        it('returns an empty object if localStorage is not available @allure.label.story:adjectives.settings @allure.id:settings.no-storage', () => {
            assert.deepEqual(loadState(null), {})
        });

        it('returns a parsed JSON from localStorage if localStorage is available @allure.label.story:adjectives.settings @allure.id:settings.load', () => {
            const json = { testKey: 'testVal' };
            const storage = {
                getItem: (key) => {
                    assert.equal(key, 'conjugate');
                    return JSON.stringify(json);
                }
            };
            assert.deepEqual(loadState(storage), json);
        });
    });

    describe('#saveState', () => {
        it('persists filters without persisting generated exercises @allure.label.story:adjectives.settings @allure.id:settings.save', () => {
            const filters = { kasus: 'dative', nounKategorie: null, adjectiveKategorie: '0', gender: '1' };
            const writes = [];
            const storage = { setItem: (key, value) => writes.push([key, value]) };
            const state = Object.assign({}, filters, { amount: 8, collection: ['generated exercise'] });

            assert.deepEqual(saveState(state, storage), filters);
            assert.deepEqual(writes, [['conjugate', JSON.stringify(filters)]]);
            assert.deepEqual(loadState({ getItem: () => writes[0][1] }), filters);
        });

        it('returns filters when browser storage is unavailable @allure.label.story:adjectives.settings @allure.id:settings.save-no-storage', () => {
            assert.deepEqual(saveState(initialState, null), {
                kasus: initialState.kasus,
                nounKategorie: initialState.nounKategorie,
                adjectiveKategorie: initialState.adjectiveKategorie,
                gender: initialState.gender
            });
        });
    });
}));
