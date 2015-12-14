"use strict";

const _ = require("underscore");

const grammarObjects = require("./data/grammarObjects.js");
const adjectives = require("./data/adjectives.js");

const Phrase = require("./Classes/Models/Phrase.js");

function randomPhrase () {
    var objMax = grammarObjects.length - 1;
    var adjMax = adjectives.length - 1;

    var objIndex = _.random(0, objMax);
    var adjIndex = _.random(0, adjMax);

    const phrase = new Phrase(
        grammarObjects[objIndex],
        adjectives[adjIndex]
    );

    return phrase;
}

function randomNominative (artType) {
    const phrase = randomPhrase();
    const start = phrase.object.gender === 3 ? "Das sind " : "Das ist ";

    return start + phrase.conjugate(0, artType);
}

console.log(randomPhrase().conjugate(0,0));
console.log(randomNominative(0));
