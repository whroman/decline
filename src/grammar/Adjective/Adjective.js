"use strict";

const conjugationTable = require("./../../../fixtures/conjugationTable");

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

    stub (word) {
        return Array(word.length + 1).join("_");
    }

    conjugate (...args) {
        const suffix = this.findSuffix(...args);

        const word = {
            text: this.rootText,
            stubbed: this.stub(this.rootText),
            stubbedSuffix: this.rootText
        };

        if (suffix) {
            if (suffix.text) {
                const stubbedSuffix = this.stub(suffix.text);
                word.text += suffix.text;
                word.stubbed += stubbedSuffix;
                word.stubbedSuffix += stubbedSuffix;
            }
        } else {
            console.warn("No conjugation found: ", ...arguments);
        }

        return word;
    }

}

module.exports = Adjective;