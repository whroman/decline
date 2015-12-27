"use strict";

const assert = require("chai").assert;

const Phrase = require("./Phrase.js");
const Adjective = require("./../Adjective/Adjective.js");
const Noun = require("./../Noun/Noun.js");

describe("Phrase", () => {
    describe(".conjugate()", () => {
        describe("- nominative cases -", () => {
            const noun = new Noun("Mann", 0);
            const adj = new Adjective("kurz");
            const phrase = new Phrase(noun, adj);

            it("should work with definite articles", () => {
                const conjugation = phrase.conjugate(0, 0);
                assert.equal(conjugation.text, "der kurze Mann");
            });     

            it("should work with indefinite articles", () => {
                const conjugation = phrase.conjugate(0, "ein");
                assert.equal(conjugation.text, "ein kurzer Mann");
            });     

            it("should work without articles", () => {
                const conjugation = phrase.conjugate(0, 2);
                assert.equal(conjugation.text, "kurzer Mann");
            });     
        })
    });
});