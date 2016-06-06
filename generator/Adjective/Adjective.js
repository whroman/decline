import { find } from 'lodash';
import assertStringsDefined from './../util/assertStringsDefined.js';
import conjugationTable from 'tables/conjugationTable/data.js';
import WordChunk from './../WordChunk/WordChunk.js';

export default class Adjective {

    constructor (root) {
        assertStringsDefined({ root });
        Object.assign(this, { root });
    }


    getSuffix (objectGender, articleType, grammarCase) {
        const suffix = find(conjugationTable.adjSuffixes.list, {
            objectGender,
            articleType,
            grammarCase
        });

        return suffix;
    }

    conjugate (...args) {
        const { text } = this;
        const suffix = this.getSuffix(...args);

        const word = {
            text,
            stubbed: {
                text: stub(text),
                stubbedValue: text
            },
            stubbedSuffix: {
                text,
                stubbedValue: ''
            }
        };

        if (suffix) {
            if (suffix.text) {
                const stubbedSuffix = stub(suffix.text);
                word.text += suffix.text;
                word.stubbed.text += stubbedSuffix;
                word.stubbedSuffix.text += stubbedSuffix;
                word.stubbedSuffix.stubbedValue += suffix.text;
            }
        } else {
            throw Error('No conjugation found: ', ...arguments);
        }

        return word;
    }

    compose (objectGender, articleType, grammarCase) {
        const { text } = this.getSuffix(objectGender, articleType, grammarCase);

        const composition = [
            new WordChunk(this.root),
            new WordChunk(text)
        ];

        return composition;
    }


}
