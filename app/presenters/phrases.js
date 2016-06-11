function presentPhrase ({ start, statement, noun }) {
    const article = statement[0].chunks.reduce((memo, { text }) => {
        return memo + text;
    }, '');

    const untilAdj = [
        start,
        article
    ].filter((item) => item)
    .join(' ') + ' ';

    const adjective = statement[1];
    const adjSuffix = adjective.chunks[1].text;
    const stub = Array(adjSuffix.length + 1).join('_');
    const stubbedValue = adjSuffix;
    adjective.text = adjective.chunks[0].text;
    const object = statement[2].chunks;

    if (!object) throw Error('shouldn\'t occur');

    const present = {
        key: untilAdj + stub + adjective.text,
        values: {
            3: stubbedValue
        },
        statement: [
            {
                type: 'untilAdj',
                text: untilAdj
            },
            {
                type: 'space',
                text: ' '
            },
            {
                type: 'adjectiveRoot',
                text: adjective.chunks[0].text,
                translations: adjective.translations
            },
            {
                type: 'input',
                text: stub
            },
            {
                type: 'space',
                text: ' '
            },
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
