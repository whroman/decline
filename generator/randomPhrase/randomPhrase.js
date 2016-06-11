import getRandomItem from './../util/getRandomItem';

// Tables
import adjectives from 'tables/adjectives/data';
import subjects from 'tables/subjects/data';

// Models
import ObjectGroup from './../WordGroups/ObjectGroup/ObjectGroup';
import Adjective from './../Words/Adjective/Adjective';

// Word Generators
import randomArticle from './randomArticle';
import randomNoun from './randomNoun';

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


function getRandomAdjective () {
    const foo = getRandomItem(adjectives);
    const adj = new Adjective({
        root: foo.text,
        translations: foo.translations
    });

    return adj;
}

const randomPhrase = {

    getOne: function ({ gender, category }) {
        const adjective = getRandomAdjective();
        const noun = randomNoun({ gender, category });
        const article = randomArticle(noun.gender);
        const phrase = new ObjectGroup({
            article, adjective, noun
        });
        return phrase;
    },

    handleCase: function (gender, category, textOrTransform, transformCon) {
        const phrase = this.getOne({ gender, category });
        const start = typeof textOrTransform === 'function' ? textOrTransform(phrase) : textOrTransform;
        const statement = transformCon(phrase);

        return Object.assign(phrase, { start, statement });
    },

    nominative: function ({ category, gender }) {
        const conjugation = this.handleCase(gender, category,
        (phrase) => {
            const objectGender = phrase.noun.gender;
            const subject = getRandomSubject('2', objectGender);
            const nounIsPlural = objectGender === '3';
            const verb = nounIsPlural ? 'sind' : 'ist';
            const text = [subject.deText, verb].join(' ');
            return ucfirst(text);
        }, (phrase) => {
            const conjugatedPhrase = phrase.compose('0');
            return conjugatedPhrase;
        });

        return conjugation;
    },

    accusative: function ({ category, gender }) {
        const randomAkkStart = getRandomItem(AKK_BEGINNINGS) + ' ';
        const conjugation = this.handleCase(
            gender,
            category,
            randomAkkStart,
            (phrase) => {
                return phrase.compose('1');
            }
        );
        return conjugation;
    }

};



export default randomPhrase;