"use strict";

const _ = require("underscore");

const grammarObjects = require("./../../data/words/nouns.js");
const adjectives = require("./../../data/words/adjectives.js");
const articleTypes = require("./../../data/articleTypes");

const Phrase = require("./../../Classes/Phrase/Phrase.js");

var randomPhrase = {

    getOne: function () {
        var objIndex = _.random(0, grammarObjects.length - 1);
        var adjIndex = _.random(0, adjectives.length - 1);

        const phrase = new Phrase(
            grammarObjects[objIndex],
            adjectives[adjIndex]
        );

        return phrase;
    },

    handleCase: function (textOrTransform, transformCon) {
        const phrase = this.getOne();
        const start = String(textOrTransform) === textOrTransform ? textOrTransform : textOrTransform(phrase);
        let conjugation = transformCon(phrase);
        conjugation = _.mapObject(conjugation, (val) => {
            return start + val;
        });

        return conjugation;
    },

    nominative: function () {
        const conjugation = this.handleCase(
        (phrase) => {
            const verb = (phrase.object.gender === 3 ? "sind " : "ist ");
            const text = "Hier " + verb;
            return text;
        }, (phrase) => {
            return phrase.conjugate(0, 1);
        });

        return conjugation;
    },

    accusative: function () {
        const conjugation = this.handleCase("Ich möchte ", (phrase) => {
            const artType = _.random(0, articleTypes.length - 1);
            return phrase.conjugate(1, artType);
        });

        return conjugation;
    }

};

module.exports = randomPhrase;