import { assert } from 'chai';
import Noun from './Noun';

describe('Linguistic Model', () => describe('Noun', () => {
    describe('#constructor', () => {
        it('returns default values when none are passed', () => {
            assert.deepEqual(
                new Noun({}),
                {
                    text: undefined,
                    gender: undefined,
                    translations: undefined,
                    categories: undefined,
                    articleInstance: null,
                    adjectiveInstances: []
                }
            );
        });
    });

    describe('#getArticle', () => {
        it('returns Noun\'s articleInstance along with a `conjugation` key', () => {
            const noun = new Noun({});
            const mockArticle = {
                type: 'fakeType',
                root: 'fakeRoot',
                conjugate: () => 'fakeConjugation'
            };
            noun.setArticle(mockArticle);
            assert(
                noun.getArticle(),
                Object.assign(mockArticle, {
                    conjugation: mockArticle.conjugate()
                })
            );
        });
    })
}));