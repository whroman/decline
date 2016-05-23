const regexi = {
    untilAdj:  () => /(^.*?)(?=_+\s)/g,
    stub:       () => /^.*?(\_+)\s.*$/g,
    afterStub:  () => /^.*?_+(.*)/g,
};

function presentPhrase (phrase) {
    const { start, statement, noun } = phrase;
    const untilAdj = [
        start,
        statement[0].text
    ].filter((item) => item)
    .join(' ') + ' ';

    const adjSuffix = statement[1].chunks[1].text;
    const stub = Array(adjSuffix.length + 1).join('_');
    const stubbedValue = adjSuffix;
    const adjective = statement[1];
    adjective.text = statement[1].chunks[0].text

    const afterStub = ' ' + statement[2].text;

    const present = {
        untilAdj, afterStub, stub, stubbedValue, noun, adjective,
        key: untilAdj + afterStub + stub + adjective.text
     };

    return present;
}

export default function presentPhrases (phrases) {
    return phrases.map(presentPhrase);
}
