"use strict";

const conjugationTable = require("./../../../fixtures/conjugationTable.js");

class Article {

    constructor (root, type) {
        Object.assign(this, { root, type })
    }

    conjugate (grammarCase, objectGender) {
        const find = {
            objectGender, grammarCase,
            articleType: this.type
        };

        const article = conjugationTable.articles.findWhere(find);

        if (this.type === 1 || this.type === 3) {
            return this.root + article.text;
        }

        return article.text;
    }

}

module.exports = Article;