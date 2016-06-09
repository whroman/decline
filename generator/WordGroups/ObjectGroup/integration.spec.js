import { assert } from 'chai';

import ObjectGroup from './ObjectGroup';
import Article from 'generator/Words/Article/Article';
import Adjective from 'generator/Words/Adjective/Adjective';
import Noun from 'generator/Words/Noun/Noun';

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
            def: 'den kurzen Kindern',
            indef: null,
            kein: 'kurzen Kindern'
        },
        genitive: {
            def: 'der kurzen Kinder',
            indef: null,
            kein: 'kurzer Kinder'
        },
    },
];

function printStatement (conjugation) {
    const statement = conjugation
        .map((val) => {
            let text;
            console.log(val)
            if (val.length) {
                text = val.reduce((_memo, _val) => {
                    return _memo + _val.text;
                }, '');
            }

            return text;
        })
        .filter((item) => item)
        .join(' ');

    return statement;
}

describe('ObjectGroup', () => {
    describe('.conjugate()', () => {
        [
            'nominative',
            'accusative',
            'dative',
            'genitive'
        ].forEach( (grammarCaseName, grammarCaseIndex) => {
            const grammarCaseUID = String(grammarCaseIndex);
            describe(` - ${grammarCaseName} cases -`, () => {
                tests.forEach( (test) => {
                    const noun = new Noun({
                        root: test.noun[0],
                        gender: test.noun[2]
                    });

                    const adjective = new Adjective({
                        root: test.adj[0],
                    });

                    const genderIndex = test.noun[2];
                    const gender = genders[genderIndex];

                    it(`should work for phrases with ${gender} nouns and definite articles`, () => {
                        const article = new Article({
                            root: '',
                            type: '0'
                        });
                        const phrase = new ObjectGroup({ noun, adjective, article });

                        const conjugation = phrase.compose(grammarCaseUID);
                        const text = printStatement(conjugation);

                        assert.equal(text, test[grammarCaseName].def);
                    });

                    it(`should work for phrases with ${gender} nouns and indefinite articles`, () => {
                        const article = new Article({
                            root: 'ein',
                            type: '1'
                        });
                        const phrase = new ObjectGroup({ noun, adjective, article });
                        const expectedText = test[grammarCaseName].indef;
                        const conjugate = () => phrase.compose(grammarCaseUID);
                        if (expectedText === null) {
                            assert.throws(conjugate);
                        } else {
                            const text = printStatement(conjugate());
                            assert.equal(text, expectedText);
                        }
                    });

                    it(`should work for phrases with ${gender} nouns and without articles`, () => {
                        const article = new Article({
                            root: '',
                            type: '2'
                        });
                        const phrase = new ObjectGroup({ noun, adjective, article });
                        const conjugation = phrase.compose(grammarCaseUID);
                        const text = printStatement(conjugation);
                        assert.equal(text, test[grammarCaseName].kein);
                    });
                });
            });
        });
    });
});
