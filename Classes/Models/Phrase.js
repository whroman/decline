"use strict";

class Phrase {

    constructor (objectInstance, adjInstance) {
        this.object = objectInstance;
        this.adjective = adjInstance
    }

    getArticle (...args) {
        const article = this.object.getArticle(...args).text;
        return article;
    }

    getAdjective (grammarCase, articleType, guess) {
        const adj = this.adjective.conjugate(
            this.object.gender,
            articleType,
            grammarCase,
            guess
        );

        return adj ? adj : "";
    }

    conjugate (grammarCase, articleType, guess) {
        const article = this.getArticle(grammarCase, articleType);
        const guessAdj = guess ? guess.indexOf("adj") > -1 : false;

        let statement = [
            this.getAdjective(grammarCase, articleType, guessAdj),
            this.object.text
        ];

        if (article) statement.unshift(article);

        statement = statement.join(" ");

        return statement;
    }

}

module.exports = Phrase;