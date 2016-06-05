import { find, isString } from 'lodash';
import conjugationTable from 'tables/conjugationTable/data.js';
import assertStringsDefined from './../util/assertStringsDefined.js';

function stub (str) {
    return Array(str.length + 1).join('_');
}

export default class Article {

    constructor (root, type) {
        const props = { root, type }
        assertStringsDefined(props);
        Object.assign(this, props);
    }

    getSuffix (grammarCase, objectGender) {
        const { type } = this;
        const articleSuffix = find(conjugationTable.articles.list, {
            objectGender, grammarCase, articleType: type
        });

        if (articleSuffix.text === null) {
            const errObj = { type, objectGender };
            throw Error(`Article: Given object gender and article type are incompatable ${errObj}`);
        }

        return articleSuffix;
    }

    compose (grammarCase, objectGender) {
        const { text } = this.getSuffix(grammarCase, objectGender);

        const fullText = this.root + text;
        return {
            root: this.root,
            suffix: text,
            suffixStub: stub(text),
            fullText,
            fullStub: stub(fullText)
        };
    }

}