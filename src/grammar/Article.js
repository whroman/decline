import { find } from 'lodash';
import conjugationTable from './../../tables/conjugationTable/data.js';

export default class Article {

    constructor (root, type) {
        Object.assign(this, { root, type });
    }

    conjugate (grammarCase, objectGender) {
        const articleType = this.type;
        const article = find(conjugationTable.articles.list, {
            objectGender, grammarCase, articleType
        });

        if (article.text === null) {
            const errObj = { articleType, objectGender };
            throw Error(`Article: Given gender and type are incompatable ${errObj}`);
        }

        const text = article.text;
        if (articleType === 1 || articleType === 3) {
            return this.root + text;
        }

        return text;
    }

}