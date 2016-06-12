import getRandomItem from './../util/getRandomItem';
import ObjectGroup from './../WordGroups/ObjectGroup/ObjectGroup';
import randomSubject from './randomSubject';

const space = () => ({
    type: 'space',
    text: ' '
});

function composeWordGroups (wordGroups) {
    const statement = wordGroups.reduce((memo, wordGroup, index) => {
        if (index === 0) return memo.concat(wordGroup);
        return memo.concat(
            space(),
            wordGroup
        );
    }, []);

    return statement;
}

function composeSentence (wordGroups) {
    const statement = composeWordGroups(wordGroups)
        .concat({
            type: 'punctuation',
            text: '.'
        });
    return statement;
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

    handleCase: function (kasus, gender, category, startTextOrTransform) {
        const objectGroup = ObjectGroup.random({ gender, category });
        const start = typeof startTextOrTransform === 'function' ? startTextOrTransform(objectGroup) : startTextOrTransform;

        const statement = composeSentence([
            [ start ],
            objectGroup.flattenWithStubbedAdjSuffix(kasus)
        ]);

        const key = statement.reduce((memo, item) => (memo += item.text), '');

        const { adjective } = objectGroup.compose(kasus);
        const values = { 5: adjective.chunks[1].text };

        const present = { key, values, statement };
        return present;
    },

    nominative: function ({ category, gender }) {
        const sentence = this.handleCase('0', gender, category,
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

        return sentence;
    },

    accusative: function ({ category, gender }) {
        const randomAkkStart = getRandomItem(AKK_BEGINNINGS);
        const sentence = this.handleCase( '1', gender, category, {
            type: 'start',
            text: randomAkkStart
        });
        return sentence;
    },

    genitive: function ({ category, gender }) {
        const kasus = '3';

        const owned = ObjectGroup.random({ gender, category,
            include: [ 'noun', 'article' ]
        });

        const owner = ObjectGroup.random({ gender, category });

        const statement = composeSentence([
            owned.flatten('0'),
            {
                type: 'particle',
                'text': 'von'
            },
            owner.flattenWithStubbedAdjSuffix(kasus)
        ]);

        statement[0].text = ucfirst(statement[0].text);

        const key = statement.reduce((memo, item) => (memo += item.text), '');

        const values = {
            12: owner.compose(kasus).adjective.chunks[1].text
        };

        const present = { key, values, statement };
        return present;
    }

};

export default randomPhrase;