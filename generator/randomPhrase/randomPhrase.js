import getRandomItem from './../util/getRandomItem';
import ObjectGroup from './../WordGroups/ObjectGroup/ObjectGroup';

import randomSubject from './randomSubject';
import accusativeBeginnings from './accusativeBeginnings';
import dativeBeginnings from './dativeBeginnings';

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

function ucfirst (str) { return str[0].toUpperCase() + str.substring(1); }

const randomPhrase = {

    handleCase: function (kasus, gender, nounCategory, adjectiveCategory, startTextOrTransform) {
        const objectGroup = ObjectGroup.random({ gender, nounCategory, adjectiveCategory });
        const start = typeof startTextOrTransform === 'function' ? startTextOrTransform(objectGroup) : startTextOrTransform;

        const statement = composeSentence([
            [ start ],
            objectGroup.flattenWithStubbedAdjSuffix(kasus)
        ]);

        const key = statement.reduce((memo, item) => (memo += item.text), '');

        const composedObjectGroup = objectGroup.compose(kasus);
        const { noun, article, adjective } = composedObjectGroup;
        const values = { 5: adjective.chunks[1].text };
        const present = { key, values, statement, noun, article, adjective };

        return present;
    },

    nominative: function ({ nounCategory, adjectiveCategory, gender }) {
        const sentence = this.handleCase('0', gender, nounCategory, adjectiveCategory,
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

    accusative: function ({ nounCategory, adjectiveCategory, gender }) {
        const randomAkkStart = getRandomItem(accusativeBeginnings);
        const sentence = this.handleCase( '1', gender, nounCategory, adjectiveCategory, {
            type: 'start',
            text: randomAkkStart
        });

        return sentence;
    },

    dative: function ({ nounCategory, adjectiveCategory, gender }) {
        const kasus = '2';
        const randomDatStart = getRandomItem(dativeBeginnings);
        const indirectObjectGroup = ObjectGroup.random({ gender, nounCategory, adjectiveCategory });

        const directObjectGroup = ObjectGroup.random({ gender, nounCategory,
            include: [ 'article', 'noun' ]
        });

        const statement = composeSentence([
            [ {
                type: 'start',
                text: randomDatStart
            } ],
            indirectObjectGroup.flattenWithStubbedAdjSuffix(kasus),
            directObjectGroup.flatten('0')
        ]);

        const key = statement.reduce((memo, item) => (memo += item.text), '');
        const composedIndirectObjectGroup = indirectObjectGroup.compose(kasus);
        const { noun, article, adjective } = composedIndirectObjectGroup;
        const values = { 5: adjective.chunks[1].text };
        const present = { key, values, statement, noun, article, adjective };
        return present;
    },

    genitive: function ({ nounCategory, adjectiveCategory, gender }) {
        const kasus = '3';

        const owned = ObjectGroup.random({ gender, nounCategory,
            include: [ 'article', 'noun' ]
        });

        const owner = ObjectGroup.random({ gender, nounCategory, adjectiveCategory });

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

        const { adjective, noun, article } = owner.compose(kasus);

        const values = {
            12: adjective.chunks[1].text
        };

        const present = { key, values, statement, noun, article, adjective };
        return present;
    }

};

export default randomPhrase;
