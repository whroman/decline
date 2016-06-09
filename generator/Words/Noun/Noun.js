import WordChunk from 'generator/WordChunk/WordChunk';

export default class Noun {

    constructor ({ root, gender, translations={}, categories=[] }) {
        Object.assign(this, { root, gender, translations, categories });
    }

    conjugate (grammarCase) {
        const { gender } = this;
        let nounText = this.root;

        const finalLetter = nounText[nounText.length - 1];
        const isMasculine = gender === '0';
        const isNeuter = gender === '2';
        const isPlural = gender === '3';
        const isNominative = grammarCase === '0';
        const isDative = grammarCase === '2';
        const isGenitive = grammarCase === '3';

        const isStrongMaleNoun = isMasculine && finalLetter === 'e';

        if (isStrongMaleNoun && !isNominative) {
            nounText += 'n';
        } else {
            /*
                For plural nouns in the dative case,
                all nouns which do not already have an -n or -s ending add -n.
            */
            if (isDative) {
                if (isPlural) {
                    if (finalLetter !== 's' && finalLetter !== 'n') {
                        nounText += 'n';
                    }
                }
            }

            /*
                Personal names, all neuter and most masculine nouns have genitive case -(e)s endings:
                    normally -es if one syllable long, -s if more.
            */

            if (isGenitive) {
                if (isMasculine || isNeuter) {
                    if (finalLetter !== 'e') nounText += 'e';
                    nounText += 's';
                }
            }
        }

        // const finalChar = nounText[nounText.length - 1];
        // const isNominative = grammarCase === '0';
        // const isMale = gender === '0';

        // const shouldAlterWeakMale = (
        //     finalChar === 'e' &&
        //     !isNominative &&
        //     isMale
        // );

        // if (shouldAlterWeakMale) nounText += 'n';

        return nounText;
    }

    compose (grammarCase) {
        const text = this.conjugate(grammarCase);
        const composition = new WordChunk(text);
        return composition;
    }
}
