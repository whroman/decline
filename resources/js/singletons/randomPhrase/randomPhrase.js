"use strict";

const _ = require("underscore");

const nouns = require("./../../data/words/nouns.js");
const adjectives = require("./../../data/words/adjectives.js");
const articleTypes = require("./../../data/articleTypes");

const Phrase = require("./../../Classes/Phrase/Phrase.js");

const randomPhrase = {

    getOne: function () {
        const objIndex = _.random(0, nouns.length - 1);
        const adjIndex = _.random(0, adjectives.length - 1);

        const phrase = new Phrase(
            nouns[objIndex],
            adjectives[adjIndex]
        );

        return phrase;
    },

    handleCase: function (textOrTransform, transformCon) {
        const phrase = this.getOne();
        const start = String(textOrTransform) === textOrTransform ? textOrTransform : textOrTransform(phrase);
        let conjugation = transformCon(phrase);
        conjugation = _.mapObject(conjugation, (val) => {
            if (val === null) return val;
            return start + val;
        });

        return conjugation;
    },

    nominative: function () {
        const conjugation = this.handleCase( (phrase) => {
            const verb = (phrase.noun.gender === 3 ? "sind " : "ist ");
            const text = "Hier " + verb;
            return text;
        }, (phrase) => {
            return phrase.conjugate(0, "ein");
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