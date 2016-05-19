const assert = require("chai").assert;

const Phrase = require("./Phrase.js");
const Adjective = require("./../Adjective/Adjective.js");
const Article = require("./../Article/Article.js");
const Noun = require("./../Noun/Noun.js");
const genders = ["male", "female", "neutral", "plural"];

const tests = [
    {
        noun: ["Mann", "man", 0, [0]],
        adj: "kurz",
        nominative: {
            def: "der kurze Mann",
            indef: "ein kurzer Mann",
            kein: "kurzer Mann"
        },
        accusative: {
            def: "den kurzen Mann",
            indef: "einen kurzen Mann",
            kein: "kurzen Mann"
        },
        dative: {
            def: "dem kurzen Mann",
            indef: "einem kurzen Mann",
            kein: "kurzem Mann"
        },
        genitive: {
            def: "des kurzen Mannes",
            indef: "eines kurzen Mannes",
            kein: "kurzen Mannes"
        },
    },
    {
        noun: ["Frau", 'woman', 1, [1]],
        adj: "kurz",
        nominative: {
            def: "die kurze Frau",
            indef: "eine kurze Frau",
            kein: "kurze Frau"
        },
        accusative: {
            def: "die kurze Frau",
            indef: "eine kurze Frau",
            kein: "kurze Frau"
        },
        dative: {
            def: "der kurzen Frau",
            indef: "einer kurzen Frau",
            kein: "kurzer Frau"
        },
        genitive: {
            def: "der kurzen Frau",
            indef: "einer kurzen Frau",
            kein: "kurzer Frau"
        },
    },
    {
        noun: ["Kind", 'child', 2, [2]],
        adj: "kurz",
        nominative: {
            def: "das kurze Kind",
            indef: "ein kurzes Kind",
            kein: "kurzes Kind"
        },
        accusative: {
            def: "das kurze Kind",
            indef: "ein kurzes Kind",
            kein: "kurzes Kind"
        },
        dative: {
            def: "dem kurzen Kind",
            indef: "einem kurzen Kind",
            kein: "kurzem Kind"
        },
        genitive: {
            def: "des kurzen Kindes",
            indef: "eines kurzen Kindes",
            kein: "kurzen Kindes"
        },
    },
    {
        noun: ["Kinder", 'children', 3, [4]],
        adj: "kurz",
        nominative: {
            def: "die kurzen Kinder",
            indef: null,
            kein: "kurze Kinder"
        },
        accusative: {
            def: "die kurzen Kinder",
            indef: null,
            kein: "kurze Kinder"
        },
        dative: {
            def: "den kurzen Kinder",
            indef: null,
            kein: "kurzen Kinder"
        },
        genitive: {
            def: "der kurzen Kinder",
            indef: null,
            kein: "kurzer Kinder"
        },
    },
];

describe("Phrase", () => {
    describe(".conjugate()", () => {
        [
            "nominative",
            "accusative",
            "dative",
            "genitive"
        ].forEach( (grammarCaseName, grammarCaseIndex) => {
            describe(` - ${grammarCaseName} cases -`, () => {
                tests.forEach( (test) => {
                    const noun = new Noun(...test.noun);
                    const adj = new Adjective(test.adj);
                    const genderIndex = test.noun[1];
                    const gender = genders[genderIndex];
                    it(`should work for phrases with ${gender} nouns and definite articles`, () => {
                        const art = new Article('', 0);
                        const phrase = new Phrase(noun, adj, art);
                        const conjugation = phrase.conjugate(grammarCaseIndex);
                        assert.equal(conjugation.text, test[grammarCaseName].def);
                    });

                    it(`should work for phrases with ${gender} nouns and indefinite articles`, () => {
                        const art = new Article('ein', 1);
                        const phrase = new Phrase(noun, adj, art);
                        const expectedText = test[grammarCaseName].indef;
                        const conjugate = () => phrase.conjugate(grammarCaseIndex);

                        if (expectedText === null) {
                            assert.throws(conjugate);
                        } else {
                            assert.equal(conjugate().text, expectedText);
                        }
                    });

                    it(`should work for phrases with ${gender} nouns and without articles`, () => {
                        const art = new Article('', 2);
                        const phrase = new Phrase(noun, adj, art);
                        const conjugation = phrase.conjugate(grammarCaseIndex);
                        assert.equal(conjugation.text, test[grammarCaseName].kein);
                    });
                });
            })
        });
    });
});
