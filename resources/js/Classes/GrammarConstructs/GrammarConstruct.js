"use strict";

const genders = ["male", "female", "neuter", "plural"];
const grammarCases = ["nominative", "accusative", "dative", "genitive"];
const articleTypes = require("./../../data/articleTypes");

class GrammarConstruct {

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

module.exports = GrammarConstruct;