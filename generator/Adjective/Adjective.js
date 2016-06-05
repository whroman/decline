import { find } from 'lodash';
import conjugationTable from './../conjugationTable/data.js';

function stub (str) {
    return Array(str.length + 1).join('_');
}

export default class Adjective {

    constructor (root) {
        assertStringsDefined({ root });
        Object.assign(this, { root });
    }


    findSuffix (objectGender, articleType, grammarCase) {
        const suffix = find(conjugationTable.adjSuffixes.list, {
            objectGender,
            articleType,
            grammarCase
        });

        return suffix;
    }

    conjugate (...args) {
        const { text } = this;
        const suffix = this.findSuffix(...args);

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
        const suffix = this.findSuffix(objectGender, articleType, grammarCase);
        return {
            root: this.root,
            suffix: suffix.text,
            fullText: this.root + suffix.text
        };
    }


}
