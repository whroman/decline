"use strict";

const conjugationTable = require("./../../../fixtures/conjugationTable.js");

class GrammarObject {

    constructor (text, gender) {
        this.text = text;
        this.gender = gender;
    };

    conjugate (grammarCase) {
        let text = this.text;

        const isDative = grammarCase === 2;
        const isGenitive = grammarCase === 3;

        if (isDative) {
            const isPlural = this.gender === 3;
            if (isPlural) {
                const len = text.length - 1;
                if (text[len] === "e") text = text.substring(0, len);
            }
        } else if (isGenitive) {
            const isMaleOrNeutral = this.gender === 0 || this.gender === 2;
            if (isMaleOrNeutral) {
                text = text + "es";
            }
        }

        return text;
    }

    getArticle (grammarCase, articleType, articleRoot) {
        const find = {
            objectGender: this.gender,
            grammarCase, articleType
        };

        const article = conjugationTable.articles.findWhere(find);
        if ((articleType === 1 || articleType === 3) && article.text !== null) {
            article.text = articleRoot + article.text;
        }
        return article;
    }

}

module.exports = GrammarObject;