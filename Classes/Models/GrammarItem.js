"use strict";

const genders = ["male", "female", "neuter", "isPlural"];
const grammarCases = ["nominative", "accusative", "dative", "genitive"];
const articleTypes = ["definite", "indefinite", "zero"];
const isPlural = [false, true];


class GrammarItem {

    constructor (text, objectGender, articleType, isPlural, grammarCase) {
        this.text = text;
        this.grammarCase = grammarCase;
        this.objectGender = objectGender;
        this.articleType = articleType;
        this.isPlural = isPlural;
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

    getIsPlural () {
        return isPlural[this.isPlural];
    }

}

module.exports = GrammarItem;