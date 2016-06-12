import getRandomItem from './../util/getRandomItem';
import ObjectGroup from './../WordGroups/ObjectGroup/ObjectGroup';

import Article from './../Words/Article/Article';
import Noun from './../Words/Noun/Noun';
import Adjective from './../Words/Adjective/Adjective';
import randomSubject from './randomSubject';

const space = () => ({
    type: 'space',
    text: ' '
});

function compose ({ kasus, start, objectGroup }) {
    const statement = [ start ]
        .concat(space())
        .concat(objectGroup.flattenWithStubbedAdjSuffix(kasus))
        .concat({
            type: 'punctuation',
            text: '.'
        });

    const key = statement.reduce((memo, item) => (memo += item.text), '');

    const { adjective } = objectGroup.compose(kasus);
    const values = { 5: adjective.chunks[1].text };

    const present = { key, values, statement };
    return present;
}

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

    getRandomObjectGroup: function ({ gender, category }) {
        const adjective = Adjective.random();
        const noun = Noun.random({ gender, category });
        const article = Article.randomByGender(noun.gender);
        const objectGroup = new ObjectGroup({
            article, adjective, noun
        });
        return objectGroup;
    },

    handleCase: function (kasus, gender, category, textOrTransform) {
        const objectGroup = this.getRandomObjectGroup({ gender, category });
        const start = typeof textOrTransform === 'function' ? textOrTransform(objectGroup) : textOrTransform;
        const clause = compose({ kasus, start, objectGroup })
        return clause;
    },

    nominative: function ({ category, gender }) {
        const conjugation = this.handleCase('0', gender, category,
        (objectGroup) => {
            const { gender } = objectGroup.noun;
            const subject = randomSubject('2', gender);
            const nounIsPlural = gender === '3';
            const verb = nounIsPlural ? 'sind' : 'ist';
            const text = [subject.deText, verb].join(' ');
            return {
                type: 'start',
                text: ucfirst(text)
            };
        });

        return conjugation;
    },

    accusative: function ({ category, gender }) {
        const randomAkkStart = getRandomItem(AKK_BEGINNINGS);
        const conjugation = this.handleCase( '1', gender, category, {
            type: 'start',
            text: randomAkkStart
        });
        return conjugation;
    }

};

export default randomPhrase;