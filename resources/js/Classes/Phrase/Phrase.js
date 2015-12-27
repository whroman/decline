"use strict";

const _ = require("underscore");

class Phrase {

    constructor (nounInstance, adjInstance) {
        this.noun = nounInstance;
        this.adjective = adjInstance
    }

    getArticle (...args) {
        const article = this.noun.getArticle(...args);
        return article.text;
    }

    getAdjective (grammarCase, articleType) {
        let adj = this.adjective.conjugate(
            this.noun.gender,
            articleType,
            grammarCase
        );

        adj = adj || "";
        return adj;
    }

    conjugate (grammarCase, article) {
        const articleType = String(article) === article ? 1 : article;

        const conjArticle = this.getArticle(grammarCase, articleType, article);
        const conjAdj = this.getAdjective(grammarCase, articleType);

        const statement = _.mapObject(conjAdj, (val) => {
            return _.filter([
                conjArticle,
                val,
                this.noun.conjugate(grammarCase)
            ]).join(" ");
        });

        return statement;
    }

}

module.exports = Phrase;