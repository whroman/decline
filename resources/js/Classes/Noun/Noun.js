"use strict";

const conjugationTable = require("./../../data/conjugationTable.js");

class GrammarObject {

    constructor (text, gender) {
        this.text = text;
        this.gender = gender;
    };

    getArticle (grammarCase, articleType, articleRoot) {
        const find = {
            objectGender: this.gender,
            grammarCase: grammarCase,
            articleType: articleType
        };

        const article = conjugationTable.articles.findWhere(find);

        if (articleType === 1) article.text = articleRoot + article.text;

        return article;
    }

}

module.exports = GrammarObject;