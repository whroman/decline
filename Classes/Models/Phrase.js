"use strict";

const _ = require("underscore");

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
        let adj = this.adjective.conjugate(
            this.object.gender,
            articleType,
            grammarCase,
            guess
        );

        adj = adj || "";
        return adj;
    }

    conjugate (grammarCase, articleType, guess) {
        const guessAdj = guess ? guess.indexOf("adj") > -1 : false;

        const article = this.getArticle(grammarCase, articleType)
        const adj = this.getAdjective(grammarCase, articleType, guessAdj);
        const object = this.object.text;
        const statement = {};

        _.each(adj, (val, key) => {
            statement[key] = _.filter([
                article,
                adj[key],
                object
            ]).join(" ");
        });

        return statement;
    }

}

module.exports = Phrase;