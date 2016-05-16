const regexi = {
    untilStub:  () => /(^.*?)(?=_+\s)/g,
    afterStub:  () => /^.*?_+(.*)/g,
    stub:       () => /^.*?(\_+)\s.*$/g
};

function presentPhrase (phrase) {
    const { noun, article, stubbedSuffix } = phrase;
    const { text, stubbedValue } = stubbedSuffix;

    console.log(phrase)

    const untilStub =  regexi.untilStub().exec(text)[1];
    const afterStub =  regexi.afterStub().exec(text)[1];
    const stub =       regexi.stub().exec(text)[1];

    const present = {
        untilStub, afterStub, stub, stubbedValue,
        key: untilStub + afterStub + stub + stubbedValue
     };

    return present;
}

export default function presentPhrases (phrases) {
    return phrases.map(presentPhrase);
}
