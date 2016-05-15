"use strict";

const conjugationTable = require("./../../../fixtures/conjugationTable");

function stub (str) {
    return Array(str.length + 1).join("_");
}

class Adjective {

    constructor (rootText) {
        this.rootText = rootText;
    }

    findSuffix (objectGender, articleType, grammarCase) {
        const find = {
            objectGender,
            articleType,
            grammarCase
        };

        const suffix = conjugationTable.adjSuffixes.findWhere(find);

        return suffix;
    }

    conjugate (...args) {
        const suffix = this.findSuffix(...args);

        const word = {
            text: this.rootText,
            stubbed: {
                text: stub(this.rootText),
                stubbedValue: this.rootText
            },
            stubbedSuffix: {
                text: this.rootText,
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