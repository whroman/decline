import { find } from 'lodash';
import conjugationTable from "./../../../fixtures/conjugationTable";

function stub (str) {
    return Array(str.length + 1).join("_");
}

class Adjective {

    constructor (de, en) {
        Object.assign(this, { de, en });
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
        const suffix = this.findSuffix(...args);

        const word = {
            text: this.de,
            stubbed: {
                text: stub(this.de),
                stubbedValue: this.de
            },
            stubbedSuffix: {
                text: this.de,
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
            console.warn("No conjugation found: ", ...arguments);
        }

        return word;
    }

}

module.exports = Adjective;