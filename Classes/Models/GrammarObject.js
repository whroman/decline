"use strict";

const conjugationTable = require("./../../data/conjugationTable.js");

class GrammarObject {

    constructor (text, gender) {
        this.text = text;
        this.gender = gender;
    };

    getArticle (grammarCase, articleType) {
        const find = {
            objectGender: this.gender,
            grammarCase: grammarCase,
            articleType: articleType
        };

        const article = conjugationTable.articles.findWhere(find);

        return article;
    }

}

module.exports = GrammarObject;