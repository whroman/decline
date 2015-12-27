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

    getAdjective (grammarCase, articleType) {
        let adj = this.adjective.conjugate(
            this.object.gender,
            articleType,
            grammarCase
        );

        adj = adj || "";
        return adj;
    }

    conjugate (...args) {
        const article = this.getArticle(...args);
        const adj = this.getAdjective(...args);

        const statement = _.mapObject(adj, (val) => {
            return _.filter([
                article,
                val,
                this.object.text
            ]).join(" ");
        });

        return statement;
    }

}

module.exports = Phrase;