import { find } from 'lodash';
import conjugationTable from "./../../../fixtures/conjugationTable.js";

class Article {

    constructor (root, type) {
        Object.assign(this, { root, type })
    }

    conjugate (grammarCase, objectGender) {
        const { type } = this;
        const article = find(conjugationTable.articles.list, {
            objectGender, grammarCase,
            articleType: type
        });

        if (type === 1 || type === 3) {
            return this.root + article.text;
        }

        return article.text;
    }

}

module.exports = Article;