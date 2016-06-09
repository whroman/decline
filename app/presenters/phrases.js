function presentPhrase ({ start, statement, noun }) {
    const article = statement[0].reduce((memo, { text }) => {
        return memo + text;
    }, '');

    const untilAdj = [
        start,
        article
    ].filter((item) => item)
    .join(' ') + ' ';

    const adjSuffix = statement[1].chunks[1].text;
    const stub = Array(adjSuffix.length + 1).join('_');
    const stubbedValue = adjSuffix;
    const adjective = statement[1];
    adjective.text = statement[1].chunks[0].text;

    if (!statement[2].text) throw Error('shouldn\'t occur');

    const present = {
        untilAdj, stub, stubbedValue, adjective,
        noun: {
            text: statement[2].text,
            gender: noun.gender,
            translations: noun.translations
        },
        key: untilAdj + stub + adjective.text
    };

    return present;
}

export default function presentPhrases (phrases) {
    return phrases.map(presentPhrase);
}
