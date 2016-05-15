"use strict";

const _ = require("underscore");

function compose (art, adj, noun) {
    return _.filter([
        art,
        adj,
        noun
    ]).join(" ");
}

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
        const conjAdjective = this.getAdjective(grammarCase, this.article.type);
        const conjNoun = this.noun.conjugate(grammarCase);

        const nounIsPlural = this.noun.gender === 3;
        const artIsIndefinite = this.article.type === 1;
        if (nounIsPlural && artIsIndefinite) throw Error('FUCK');

        const statement = {
            text: compose(conjArticle, conjAdjective.text, conjNoun),
            stubbed: {
                text: compose(conjArticle, conjAdjective.stubbed.text, conjNoun),
                stubbedValue: conjAdjective.stubbed.stubbedValue
            },
            stubbedSuffix: {
                text: compose(conjArticle, conjAdjective.stubbedSuffix.text, conjNoun),
                stubbedValue: conjAdjective.stubbedSuffix.stubbedValue
            }
        };

        return Object.assign({}, this, statement);
    }

}

module.exports = Phrase;