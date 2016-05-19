const regexi = {
    untilAdj:  () => /(^.*?)(?=_+\s)/g,
    stub:       () => /^.*?(\_+)\s.*$/g,
    afterStub:  () => /^.*?_+(.*)/g,
};

function presentPhrase (phrase) {
    const { noun, article, stubbedSuffix, stubbed, adjective } = phrase;
    const { text, stubbedValue } = stubbedSuffix;

    const untilAdj =   regexi.untilAdj().exec(stubbed.text)[1];
    const stub =       regexi.stub().exec(text)[1];
    const afterStub =  regexi.afterStub().exec(text)[1];

    const present = {
        untilAdj, afterStub, stub, stubbedValue, adjective, noun,
        key: untilAdj + afterStub + stub + stubbedValue
     };

    return present;
}

export default function presentPhrases (phrases) {
    return phrases.map(presentPhrase);
}
