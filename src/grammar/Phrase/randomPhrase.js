"use strict";

const _ = require("underscore");

const nouns = require("./../../../fixtures/words/nouns.js");
const adjectives = require("./../../../fixtures/words/adjectives.js");
const articles = require("./../../../fixtures/words/articles");
const articleTypes = require("./../../../fixtures/articleTypes");

const Phrase = require("./Phrase.js");
const Article = require("./../Article/Article.js");

const randomPhrase = {

    getOne: function () {
        const adjIndex = _.random(0, adjectives.length - 1);
        const adj = adjectives[adjIndex];

        const nounIndex = _.random(0, nouns.length - 1);
        const noun = nouns[nounIndex];

        const article = getRandomArticleGivenGender(noun.gender);

        const phrase = new Phrase(noun, adj, article);
        return phrase;
    },

    handleCase: function (textOrTransform, transformCon) {
        const phrase = this.getOne();
        const start = typeof textOrTransform === "function" ? textOrTransform(phrase) : textOrTransform;
        let conjugation = transformCon(phrase);

        conjugation.text = start + conjugation.text;
        conjugation.stubbed.text = start + conjugation.stubbed.text;
        conjugation.stubbedSuffix.text = start + conjugation.stubbedSuffix.text;

        return conjugation;
    },

    nominative: function () {
        const conjugation = this.handleCase( (phrase) => {
            const nounIsPlural = phrase.noun.gender === 3;
            const verb = nounIsPlural ? "sind " : "ist ";
            const text = "Hier " + verb;
            return text;
        }, (phrase) => {
            const conjugatedPhrase = phrase.conjugate(0);
            return conjugatedPhrase;
        });

        return conjugation;
    },

    accusative: function () {
        const conjugation = this.handleCase("Ich möchte ", (phrase) => {
            return phrase.conjugate(1);
        });

        return conjugation;
    }

};

function getRandomArticleType () {
    const artType = _.random(0, articleTypes.length - 1);
    return artType;
}

function getRandomArticleGivenType (type) {
    const index = _.random(0, articles[type].length - 1);
    return new Article(articles[type][index], type);
}

function getRandomArticleGivenGender (gender) {
    let articleType;
    let isInvalid = true;
    const nounIsPlural = gender === 3;

    do {
        articleType = getRandomArticleType();
        const articleIsIndef = articleType === 1;
        isInvalid = nounIsPlural && articleIsIndef;
    } while (isInvalid)

    const article = getRandomArticleGivenType(articleType);

    return article;
}

module.exports = randomPhrase;