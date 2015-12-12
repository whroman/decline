"use strict";

const genders = ["male", "female", "neuter", "plural"];
const grammarCases = ["nominative", "accusative", "dative", "genitive"];
const articleTypes = ["definite", "indefinite", "zero"];
const isPlural = [false, true];


class GrammarItem {

    constructor (text, objectGender, articleType, grammarCase) {
        this.text = text;
        this.grammarCase = grammarCase;
        this.objectGender = objectGender;
        this.articleType = articleType;
    }

    getGrammarCase () {
        return grammarCases[this.grammarCase];
    }

    getGender () {
        return genders[this.objectGender];
    }

    getArticleType () {
        return articleTypes[this.articleType];
    }

}

module.exports = GrammarItem;