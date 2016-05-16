"use strict";

const _ = require("underscore");

const nouns = require("./../../../fixtures/words/nouns.js");
const adjectives = require("./../../../fixtures/words/adjectives.js");
const articles = require("./../../../fixtures/words/articles");
const subjects = require("./../../../fixtures/words/subjects");
const articleTypes = require("./../../../fixtures/articleTypes");

const Phrase = require("./Phrase.js");
const Article = require("./../Article/Article.js");

const getRandomIndex = (arr) => _.random(0, arr.length - 1);
const getRandomItem = (arr) => arr[getRandomIndex(arr)];

function ucfirst (str) {
    return str[0].toUpperCase() + str.substring(1);
}

function getRandomSubject (type, gender) {
    const filteredSubjects = subjects
        .filter((subject) => {
            return (
                subject.types.includes(type) &&
                subject.genders.includes(gender)
            );
        });

    const subject = getRandomItem(filteredSubjects);
    return subject;
}

const randomPhrase = {

    getRandomNoun: function (category) {
        let filteredNouns = nouns;
        if (typeof category === 'number') {
            filteredNouns = nouns.filter((noun) => noun.categories.includes(category));
        }

        const noun = getRandomItem(filteredNouns);
        return noun;
    },

    getOne: function (category) {
        const adj = getRandomItem(adjectives);
        const noun = this.getRandomNoun(category);

        const article = getRandomArticleGivenGender(noun.gender);

        const phrase = new Phrase(noun, adj, article);
        return phrase;
    },

    handleCase: function (category, textOrTransform, transformCon) {
        const phrase = this.getOne(category);
        const start = typeof textOrTransform === "function" ? textOrTransform(phrase) : textOrTransform;
        let conjugation = transformCon(phrase);

        conjugation.text = start + conjugation.text + '.';
        conjugation.stubbed.text = start + conjugation.stubbed.text + '.';
        conjugation.stubbedSuffix.text = start + conjugation.stubbedSuffix.text + '.';

        return conjugation;
    },

    nominative: function (category) {
        const conjugation = this.handleCase(category, (phrase) => {
            const { gender } = phrase.noun;
            phrase.subject = getRandomSubject(2, gender);
            const nounIsPlural = gender === 3;
            const verb = nounIsPlural ? "sind " : "ist ";
            const text = [phrase.subject.de, verb].join(' ');
            return ucfirst(text + '');
        }, (phrase) => {
            const conjugatedPhrase = phrase.conjugate(0);
            return conjugatedPhrase;
        });

        return conjugation;
    },

    accusative: function (category) {
        const conjugation = this.handleCase(category, "Ich möchte ", (phrase) => {
            return phrase.conjugate(1);
        });

        return conjugation;
    }

};

function getRandomArticleGivenType (type) {
    const index = _.random(0, articles[type].length - 1);
    return new Article(articles[type][index], type);
}

function getRandomArticleGivenGender (gender) {
    let articleType;
    let isInvalid = true;
    const nounIsPlural = gender === 3;

    do {
        articleType = getRandomIndex(articleTypes);
        const articleIsIndef = articleType === 1;
        const articleIsOhne = articleType === 2;
        isInvalid = (
            (nounIsPlural && articleIsIndef) ||
            (!nounIsPlural && articleIsOhne)
        );
    } while (isInvalid)

    const article = getRandomArticleGivenType(articleType);

    return article;
}

module.exports = randomPhrase;