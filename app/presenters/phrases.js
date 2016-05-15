const regexi = {
    untilStub:  () => /(^.*?)(?=_+\s)/g,
    afterStub:  () => /^.*?_+(.*)/g,
    stub:       () => /^.*?(\_+)\s.*$/g
};

function presentPhrase (phrase) {
    const { stubbedSuffix } = phrase;
    const present = {
        untilStub:  regexi.untilStub().exec(stubbedSuffix)[1],
        afterStub:  regexi.afterStub().exec(stubbedSuffix)[1],
        stub:       regexi.stub().exec(stubbedSuffix)[1],
    }
    return present;
}

export default function presentPhrases (phrases) {
    return phrases.map(presentPhrase);
}
