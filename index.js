"use strict";

const _ = require("underscore");

const grammarObjects = require("./data/words/grammarObjects.js");
const adjectives = require("./data/words/adjectives.js");
const articleTypes = require("./data/articleTypes");

const Phrase = require("./Classes/Models/Phrase.js");

function randomObjAdj () {
    var objIndex = _.random(0, grammarObjects.length - 1);
    var adjIndex = _.random(0, adjectives.length - 1);

    const phrase = new Phrase(
        grammarObjects[objIndex],
        adjectives[adjIndex]
    );

    return phrase;
}

class RandomPhrase {

    getRandomPhrase () {
        var objIndex = _.random(0, grammarObjects.length - 1);
        var adjIndex = _.random(0, adjectives.length - 1);

        const phrase = new Phrase(
            grammarObjects[objIndex],
            adjectives[adjIndex]
        );

        return phrase;
    }

    nominative () {
        const phrase = this.getRandomPhrase();
        let start = "Hier";
        start += phrase.object.gender === 3 ? " sind " : " ist ";
        const conjugation = phrase.conjugate(0, 1, ["adj"]);
        const nomObj = {
            full: start + conjugation.text,
            stubbed: start + conjugation.stubbed
        };

        return nomObj;
    }

    accusative () {
        const phrase = this.getRandomPhrase();
        const artType = _.random(0, articleTypes.length - 1);
        const start = "Ich möchte ";
        const conjugation = phrase.conjugate(0, artType, ["adj"]);
        console.log(conjugation);
        const accObj = {
            full: start + conjugation.text,
            stubbed: start + conjugation.stubbed
        };

        return accObj;
    }

}

const randomConjugation = randomObjAdj().conjugate(0, 0, [
    "adj"
]);

const generator = new RandomPhrase ();

console.log(randomConjugation);
console.log(generator.nominative().stubbed);
console.log(generator.accusative().stubbed);
