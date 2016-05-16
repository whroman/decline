"use strict";

const conjugationTable = require("./../../../fixtures/conjugationTable.js");

class GrammarObject {

    constructor (deText, enText, gender, categories) {
        Object.assign(this, {
            deText, enText, gender, categories
        });
    };

    conjugate (grammarCase) {
        let deText = this.deText;

        const isDative = grammarCase === 2;
        const isGenitive = grammarCase === 3;

        if (isDative) {
            const isPlural = this.gender === 3;
            if (isPlural) {
                const len = deText.length - 1;
                if (deText[len] === "e") deText = deText.substring(0, len);
            }
        } else if (isGenitive) {
            const isMaleOrNeutral = this.gender === 0 || this.gender === 2;
            if (isMaleOrNeutral) {
                deText = deText + "es";
            }
        }

        return deText;
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