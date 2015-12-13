"use strict";

class Phrase {

    constructor (objectInstance, adjInstance) {
        this.object = objectInstance;
        this.adjective = adjInstance
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