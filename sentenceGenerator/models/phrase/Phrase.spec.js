import { assert } from 'chai';

import Phrase from './Phrase.js';
import Adjective from 'tables/adjectives/Adjective.js';
import Article from './../article/Article.js';
import Noun from './../noun/Noun.js';

const genders = ['male', 'female', 'neutral', 'plural'];

const tests = [
    {
        noun: [
            'Mann', 'man', '0', ['0']
        ],
        adj: ['kurz', ['short']],
        nominative: {
            def: 'der kurze Mann',
            indef: 'ein kurzer Mann',
            kein: 'kurzer Mann'
        },
        accusative: {
            def: 'den kurzen Mann',
            indef: 'einen kurzen Mann',
            kein: 'kurzen Mann'
        },
        dative: {
            def: 'dem kurzen Mann',
            indef: 'einem kurzen Mann',
            kein: 'kurzem Mann'
        },
        genitive: {
            def: 'des kurzen Mannes',
            indef: 'eines kurzen Mannes',
            kein: 'kurzen Mannes'
        },
    },
    {
        noun: [
            'Frau', 'woman', '1', ['0']
        ],
        adj: ['kurz', ['short']],
        nominative: {
            def: 'die kurze Frau',
            indef: 'eine kurze Frau',
            kein: 'kurze Frau'
        },
        accusative: {
            def: 'die kurze Frau',
            indef: 'eine kurze Frau',
            kein: 'kurze Frau'
        },
        dative: {
            def: 'der kurzen Frau',
            indef: 'einer kurzen Frau',
            kein: 'kurzer Frau'
        },
        genitive: {
            def: 'der kurzen Frau',
            indef: 'einer kurzen Frau',
            kein: 'kurzer Frau'
        },
    },
    {
        noun: [
            'Kind', 'child', '2', ['0']
        ],
        adj: ['kurz', ['short']],
        nominative: {
            def: 'das kurze Kind',
            indef: 'ein kurzes Kind',
            kein: 'kurzes Kind'
        },
        accusative: {
            def: 'das kurze Kind',
            indef: 'ein kurzes Kind',
            kein: 'kurzes Kind'
        },
        dative: {
            def: 'dem kurzen Kind',
            indef: 'einem kurzen Kind',
            kein: 'kurzem Kind'
        },
        genitive: {
            def: 'des kurzen Kindes',
            indef: 'eines kurzen Kindes',
            kein: 'kurzen Kindes'
        },
    },
    {
        noun: [
            'Kinder', 'children', '3', ['0']
        ],
        adj: ['kurz', ['short']],
        nominative: {
            def: 'die kurzen Kinder',
            indef: null,
            kein: 'kurze Kinder'
        },
        accusative: {
            def: 'die kurzen Kinder',
            indef: null,
            kein: 'kurze Kinder'
        },
        dative: {
            def: 'den kurzen Kinder',
            indef: null,
            kein: 'kurzen Kinder'
        },
        genitive: {
            def: 'der kurzen Kinder',
            indef: null,
            kein: 'kurzer Kinder'
        },
    },
];

function printStatement (conjugation) {
    const statement = conjugation.statement.map((val) => {
        let text = val.text;
        if (val.chunks) text = val.chunks.reduce((_memo, _val) => {
            return _memo + _val.text;
        }, '');

        return text;
    })
    .filter((item) => item)
    .join(' ');

    return statement;
}

describe('Phrase', () => {
    describe('.conjugate()', () => {
        [
            'nominative',
            'accusative',
            'dative',
            'genitive'
        ].forEach( (grammarCaseName, grammarCaseIndex) => {
            const grammarCaseUID = String(grammarCaseIndex);
            console.log('omg')
            describe(` - ${grammarCaseName} cases -`, () => {
                tests.forEach( (test) => {
                    let noun, adj;
                    beforeEach(() => {
                        noun = new Noun({
                            text: test.noun[0],
                            translations:  {
                                eng: test.noun[1]
                            },
                            gender: test.noun[2],
                            categories: test.noun[3]
                        });
                        adj = new Adjective(...test.adj);
                    });

                    const genderIndex = test.noun[2];
                    const gender = genders[genderIndex];

                    it(`should work for phrases with ${gender} nouns and definite articles`, () => {
                        const art = new Article('', '0');
                        const phrase = new Phrase(noun, adj, art);
                        const conjugation = phrase.conjugate(grammarCaseUID);
                        const text = printStatement(conjugation);

                        assert.equal(text, test[grammarCaseName].def);
                    });

                    it(`should work for phrases with ${gender} nouns and indefinite articles`, () => {
                        const art = new Article('ein', '1');
                        const phrase = new Phrase(noun, adj, art);
                        const expectedText = test[grammarCaseName].indef;
                        const conjugate = () => phrase.conjugate(grammarCaseUID);
                        if (expectedText === null) {
                            assert.throws(conjugate);
                        } else {
                            const text = printStatement(conjugate());
                            assert.equal(text, expectedText);
                        }
                    });

                    it(`should work for phrases with ${gender} nouns and without articles`, () => {
                        const art = new Article('', '2');
                        const phrase = new Phrase(noun, adj, art);
                        const conjugation = phrase.conjugate(grammarCaseUID);
                        const text = printStatement(conjugation);
                        assert.equal(text, test[grammarCaseName].kein);
                    });
                });
            });
        });
    });
});
