"use strict";

const assert = require("chai").assert;

const Phrase = require("./Phrase.js");
const Adjective = require("./../Adjective/Adjective.js");
const Noun = require("./../Noun/Noun.js");
const genders = ["male", "female", "neutral", "plural"];

const tests = [
    {
        noun: ["Mann", 0],
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
        noun: ["Frau", 1],
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
        noun: ["Kind", 2],
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
        noun: ["Kinder", 3],
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
        ["nominative", "accusative", "dative", "genitive"].forEach( (grammarCaseName, grammarCaseIndex) => {
            describe(` - ${grammarCaseName} cases -`, () => {
                tests.forEach( (test) => {
                    const noun = new Noun(...test.noun);
                    const adj = new Adjective(test.adj);
                    const phrase = new Phrase(noun, adj);
                    const genderIndex = test.noun[1];
                    const gender = genders[genderIndex];
                    it(`should work for phrases with ${gender} nouns and definite articles`, () => {
                        const conjugation = phrase.conjugate(grammarCaseIndex, 0);
                        assert.equal(conjugation.text, test[grammarCaseName].def);
                    });     

                    it(`should work for phrases with ${gender} nouns and indefinite articles`, () => {
                        const conjugation = phrase.conjugate(grammarCaseIndex, "ein");
                        assert.equal(conjugation.text, test[grammarCaseName].indef);                        
                    });     

                    it(`should work for phrases with ${gender} nouns and without articles`, () => {
                        const conjugation = phrase.conjugate(grammarCaseIndex, 2);
                        assert.equal(conjugation.text, test[grammarCaseName].kein);
                    });  
                });
            })
        });
    });
});