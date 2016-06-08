import { find } from 'lodash';
import conjugationTable from 'tables/conjugationTable/data.js';
import WordChunk from '../WordChunk/WordChunk';

export default class Noun {

    constructor ({ root, gender, translations={}, categories=[] }) {
        Object.assign(this, { root, gender, translations, categories });
    }

    conjugate (grammarCase) {
        const { gender } = this;
        let nounText = this.root;

        const finalChar = nounText[nounText.length - 1];
        const isNominative = grammarCase === '0';
        const isMale = gender === '0';

        const shouldAlterWeakMale = (
            finalChar === 'e' &&
            !isNominative &&
            isMale
        );

        if (shouldAlterWeakMale) nounText += 'n';

        return nounText;
    }

    compose (grammarCase) {
        const text = this.conjugate(grammarCase);
        const composition = [
            new WordChunk(text)
        ];
        return composition;
    }
}
