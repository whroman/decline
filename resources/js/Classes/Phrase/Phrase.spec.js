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
    },
];

describe("Phrase", () => {
    describe(".conjugate()", () => {
        ["nominative", "accusative"].forEach( (grammarCaseName, grammarCaseIndex) => {
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
                        const articleDoesntExist = genderIndex === 3;
                        if (articleDoesntExist) {
                            assert.throw( () => {
                                phrase.conjugate(grammarCaseIndex, "ein")
                            });
                        } else {
                            const conjugation = phrase.conjugate(grammarCaseIndex, "ein");
                            assert.equal(conjugation.text, test[grammarCaseName].indef);                        
                        }
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