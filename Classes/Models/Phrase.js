"use strict";

class Phrase {

    constructor (objectInstance, adjInstance) {
        this.object = objectInstance;
        this.adjective = adjInstance
    }

    getArticle (grammarCase, articleType) {
        const article = this.object.getArticle(grammarCase, articleType).text;
        return article;
    }

    getAdjective (grammarCase, articleType) {
        const adj = this.adjective.conjugate(
            this.object.gender,
            articleType,
            grammarCase
        );

        return adj;
    }

    conjugate (...args) {
        const statement = [
            this.getArticle(...args),
            this.getAdjective(...args),
            this.object.text
        ].join(" ");

        return statement;
    }

}

module.exports = Phrase;