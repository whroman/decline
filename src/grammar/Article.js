import { find } from 'lodash';
import conjugationTable from './../../tables/conjugationTable/data.js';

export default class Article {

    constructor (root, type) {
        Object.assign(this, { root, type })
    }

    conjugate (grammarCase, objectGender) {
        const { type } = this;
        const article = find(conjugationTable.articles.list, {
            objectGender, grammarCase,
            articleType: type
        });

        if (article.text === null) {
            const errObj = { type, objectGender };
            throw Error(`Article: Given gender and type are incompatable ${errObj}`)
        };
        const text = article.text

        if (type === 1 || type === 3) {
            return this.root + text;
        }

        return text;
    }

}