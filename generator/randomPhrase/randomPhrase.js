import getRandomItem from './../util/getRandomItem';
import ObjectGroup from './../WordGroups/ObjectGroup/ObjectGroup';

import Article from './../Words/Article/Article';
import Noun from './../Words/Noun/Noun';
import Adjective from './../Words/Adjective/Adjective';
import randomSubject from './randomSubject';

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

const randomPhrase = {

    getOne: function ({ gender, category }) {
        const adjective = Adjective.random();
        const noun = Noun.random({ gender, category });
        const article = Article.randomByGender(noun.gender);
        const objectGroup = new ObjectGroup({
            article, adjective, noun
        });
        return objectGroup;
    },

    handleCase: function (gender, category, textOrTransform, transformCon) {
        const objectGroup = this.getOne({ gender, category });
        const start = typeof textOrTransform === 'function' ? textOrTransform(objectGroup) : textOrTransform;
        const statement = transformCon(objectGroup);

        return Object.assign(objectGroup, { start, statement });
    },

    nominative: function ({ category, gender }) {
        const conjugation = this.handleCase(gender, category,
        (objectGroup) => {
            const objectGender = objectGroup.noun.gender;
            const subject = randomSubject('2', objectGender);
            const nounIsPlural = objectGender === '3';
            const verb = nounIsPlural ? 'sind' : 'ist';
            const text = [subject.deText, verb].join(' ');
            return ucfirst(text);
        }, (objectGroup) => {
            const conjugatedPhrase = objectGroup.compose('0');
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
            (objectGroup) => {
                return objectGroup.compose('1');
            }
        );
        return conjugation;
    }

};

export default randomPhrase;