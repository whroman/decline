"use strict";

const conjugationTable = require("./../../data/conjugationTable");

class Adjective {

    constructor (rootText) {
        this.rootText = rootText;
    }

    conjugate (objectGender, articleType, grammarCase) {
        let word = "" + this.rootText;

        const suffix = conjugationTable.adjSuffixes.findWhere({
            grammarCase: grammarCase,
            objectGender: objectGender,
            articleType: articleType
        });


        if (suffix) {
            word += suffix.text;
        } else {
            console.warn("No conjugation found: ", ...arguments);
        }
        return word;
    }

}

module.exports = Adjective;