"use strict";

const _ = require("underscore");

const grammarObjects = require("./data/grammarObjects.js");
const adjectives = require("./data/adjectives.js");
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

function randomNominative () {
    const phrase = randomObjAdj();
    const artType = _.random(0, articleTypes.length - 1);
    const start = phrase.object.gender === 3 ? "Hier sind " : "Hier ist ";
    return start + phrase.conjugate(0, 1, ["adj"]);
}

function randomAccusative () {
    const phrase = randomObjAdj();
    const artType = _.random(0, articleTypes.length - 1);
    const start = "Ich möchte ";
    return start + phrase.conjugate(0, artType, ["adj"]);
}

const randomConjugation = randomObjAdj().conjugate(0, 0, [
    "adj"
]);

console.log(randomConjugation);
console.log(randomNominative());
console.log(randomAccusative());
