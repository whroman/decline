"use strict";

const conjugationTable = require("./../../data/conjugationTable");

class Adjective {

    constructor (rootText) {
        this.rootText = rootText;
    }

    findSuffix (objectGender, articleType, grammarCase) {
        let suffix = conjugationTable.adjSuffixes.findWhere({
            grammarCase: grammarCase,
            objectGender: objectGender,
            articleType: articleType
        });

        return suffix;
    }

    conjugate (objectGender, articleType, grammarCase, stub) {
        let word = "" + this.rootText;
        const suffix = this.findSuffix(
            objectGender,
            articleType,
            grammarCase
        );

        if (suffix) {
            if (suffix.text) {
                if (stub) {
                    word += Array(suffix.text.length + 1).join("_");
                } else {
                    word += suffix.text;
                }
            }
        } else {
            console.warn("No conjugation found: ", ...arguments);
        }
        return word;
    }

    stubEnding (...args) {
        let word = "" + this.rootText;
        const suffix = this.findSuffix(...args);

        if (suffix) {
            if (suffix.text) {
                for (var iter in suffix.text.length) {
                    word += "_";
                }
            }
        } else {
            console.warn("No conjugation found: ", ...arguments);
        }
        return word;
    }

}

module.exports = Adjective;