"use strict";

const Adjective = require("./Adjective.js");
const GrammarObject = require("./GrammarObject.js");

class Phrase {

    constructor (objectText, objectGender, adjectiveText) {
        this.object = new GrammarObject(objectText, objectGender);
        this.adjective = new Adjective(adjectiveText);
    }

    conjugate (articleType, grammarCase) {
        const article = this.object.getArticle(grammarCase, articleType).text;

        const adj = this.adjective.conjugate(
            this.object.gender,
            articleType,
            grammarCase
        );

        const statement = [
            article,
            adj,
            this.object.text
        ].join(" ");

        return statement;
    }

}

module.exports = Phrase;