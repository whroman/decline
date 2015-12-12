"use strict";

const conjugationTable = require("./../../data/conjugationTable.js");

class GrammarObject {

    constructor (text, gender, isPlural) {
        this.text = text;
        this.gender = gender;
        this.isPlural = isPlural;
    };

    getArticle (grammarCase, articleType) {
        const find = {
            objectGender: this.gender,
            isPlural: this.isPlural,
            grammarCase: grammarCase,
            articleType: articleType
        };

        const article = conjugationTable.articles.findWhere(find);

        return article;
    }

}

module.exports = GrammarObject;