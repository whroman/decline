import { random } from 'lodash';

import nouns from 'tables/nouns/data.js';
import adjectives from 'tables/adjectives/data.js';
import articles from 'tables/articles/data.js';
import subjects from 'tables/subjects/data.js';
import articleTypes from 'tables/articleTypes/data.js';

import Noun from './../models/noun/Noun.js';
import Phrase from './../models/phrase/Phrase.js';
import Article from './../models/article/Article.js';

const AKK_BEGINNINGS = [
    'Ich mag',

    'Ich möchte',
    'Du möchtest',
    'Er möchte',
    'Sie möchte',
    'Wir möchten',
    'Ihr möchtet',
    'Sie möchten',

    'Ich habe',
    'Du hast',
    'Er hat',
    'Sie hat',
    'Wir haben',
    'Ihr habt',
    'Sie haben'
];

function getRandomIndex (arr) { return random(0, arr.length - 1); }
function getRandomItem (arr) { return arr[getRandomIndex(arr)]; }
function ucfirst (str) { return str[0].toUpperCase() + str.substring(1); }

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

    getRandomNoun: function ({ gender, category }) {
        const filteredNouns = nouns
            .filter((noun) => {
                if (typeof gender !== 'string') return true;
                const nounBelongs = noun.gender === gender;
                return nounBelongs;
            })
            .filter((noun) => {
                if (typeof category !== 'string') return true;
                const nounBelongs = noun.categories.includes(category);
                return nounBelongs;
            });

        const nounData = getRandomItem(filteredNouns);
        const noun = new Noun(nounData);
        return noun;
    },

    getOne: function ({ gender, category }) {
        const adj = getRandomItem(adjectives);
        const noun = this.getRandomNoun({ gender, category });
        const article = getRandomArticleByGender(noun.gender);
        const phrase = new Phrase(noun, adj, article);
        return phrase;
    },

    handleCase: function (gender, category, textOrTransform, transformCon) {
        const phrase = this.getOne({ gender, category });
        const start = typeof textOrTransform === 'function' ? textOrTransform(phrase) : textOrTransform;
        let { statement } = transformCon(phrase);

        return Object.assign(phrase, { start, statement });
    },

    nominative: function ({ category, gender }) {
        const conjugation = this.handleCase(gender, category, (phrase) => {
            const { gender } = phrase.noun;
            phrase.subject = getRandomSubject('2', gender);
            const nounIsPlural = gender === '3';
            const verb = nounIsPlural ? 'sind' : 'ist';
            const text = [phrase.subject.deText, verb].join(' ');
            return ucfirst(text);
        }, (phrase) => {
            const conjugatedPhrase = phrase.conjugate('0');

            return conjugatedPhrase;
        });
        return conjugation;
    },

    accusative: function ({ category, gender }) {
        const randomItem = getRandomItem(AKK_BEGINNINGS) + ' ';
        const conjugation = this.handleCase(
            gender,
            category,
            randomItem,
            (phrase) => {
                return phrase.conjugate('1');
            }
        );
        return conjugation;
    }

};

function getRandomArticleGivenType (type) {
    const index = random(0, articles[type].length - 1);
    return new Article(articles[type][index], type);
}

function getRandomArticleByGender (genderUID) {
    let articleTypeUID;
    let isInvalid = true;
    const nounIsPlural = genderUID === '3';

    do {
        articleTypeUID = getRandomItem(articleTypes).uid;
        const articleIsIndef = articleTypeUID === '1';
        const articleIsOhne = articleTypeUID === '2';
        isInvalid = (
            (nounIsPlural && articleIsIndef) ||
            (!nounIsPlural && articleIsOhne)
        );
    } while (isInvalid);

    const article = getRandomArticleGivenType(articleTypeUID);
    return article;
}

export default randomPhrase;