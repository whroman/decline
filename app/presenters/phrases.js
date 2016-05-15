const regexi = {
    untilStub:  () => /(^.*?)(?=_+\s)/g,
    afterStub:  () => /^.*?_+(.*)/g,
    stub:       () => /^.*?(\_+)\s.*$/g
};

function presentPhrase (phrase) {
    const { text, stubbedValue } = phrase.stubbedSuffix;
    const present = {
        stubbedValue,
        untilStub:  regexi.untilStub().exec(text)[1],
        afterStub:  regexi.afterStub().exec(text)[1],
        stub:       regexi.stub().exec(text)[1]
    }
    return present;
}

export default function presentPhrases (phrases) {
    return phrases.map(presentPhrase);
}
