const space = () => ({
    type: 'space',
    text: ' '
});


function presentPhrase ({ start, statement, noun }) {
    const article = statement[0].chunks.reduce((memo, { text }) => {
        return memo + text;
    }, '');

    console.log(statement);

    const adjective = statement[1];
    const adjRoot = adjective.chunks[0];
    const adjSuffix = adjective.chunks[1];
    const object = statement[2].chunks;

    if (!object) throw Error('shouldn\'t occur');

    const present = {
        key: start + article + adjSuffix.text + object[0].text,
        values: {
            5: adjSuffix.text
        },
        statement: [
            {
                type: 'start',
                text: start
            },
            space(),
            {
                type: 'article',
                text: article
            },
            space(),
            {
                type: 'adjectiveRoot',
                text: adjRoot.text,
                translations: adjective.translations
            },
            {
                type: 'input',
                text: adjSuffix.stub
            },
            space(),
            {
                type: 'noun',
                text: object[0].text,
                gender: noun.gender,
                translations: noun.translations
            }, {
                type: 'punctuation',
                text: '.'
            }
        ]
    };

    return present;
}

export default function presentPhrases (phrases) {
    return phrases.map(presentPhrase);
}
