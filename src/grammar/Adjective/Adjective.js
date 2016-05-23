import { find } from 'lodash';
import conjugationTable from "./../../../fixtures/conjugationTable";

function stub (str) {
    return Array(str.length + 1).join("_");
}

class Adjective {

    constructor (deu, eng) {
        Object.assign(this, {
            text: deu,
            translations: {
                eng
            }
        });
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
            console.warn("No conjugation found: ", ...arguments);
        }

        console.log(word)

        return word;
    }

}

module.exports = Adjective;