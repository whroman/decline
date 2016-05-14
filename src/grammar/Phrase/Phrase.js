"use strict";

const _ = require("underscore");

class Phrase {

    constructor (nounInstance, adjInstance, articleInstance) {
        Object.assign(this, {
            noun: nounInstance,
            adjective: adjInstance,
            article: articleInstance
        });
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

    conjugate (grammarCase) {
        const conjArticle = this.article.conjugate(grammarCase, this.noun.gender);
        const conjAdj = this.getAdjective(grammarCase, this.article.type);

        const statement = _.mapObject(conjAdj, (val) => {
            const nounIsPlural = this.noun.gender === 3;
            const artIsIndefinite = this.article.type === 1;
            if (nounIsPlural && artIsIndefinite) throw Error('FUCK');

            return _.filter([
                conjArticle,
                val,
                this.noun.conjugate(grammarCase)
            ]).join(" ");
        });

        return Object.assign({}, this, statement);
    }

}

module.exports = Phrase;