import { find } from 'lodash';
import getRandomItem from 'generator/util/getRandomItem';
import assertStringsDefined from 'generator/util/assertStringsDefined.js';
import WordChunk from 'generator/WordChunk/WordChunk.js';

// Tables
import articleRoots from 'tables/articles/roots/data.js';
import articleTypes from 'tables/articles/types/data.js';
import conjugationTable from 'tables/conjugationTable/data.js';

export default class Article {

    constructor ({ root, type }) {
        const props = { root, type, chunks: [], translations: {} };
        assertStringsDefined({ root, type });
        Object.assign(this, props);
    }

    static randomByType (type) {
        const root = getRandomItem(articleRoots[type]);
        return new Article({ root, type });
    }

    static randomByGender (genderUID) {
        let articleTypeUID;
        let isInvalid = true;
        const nounIsPlural = genderUID === '3';

        do {
            articleTypeUID = getRandomItem(articleTypes).uid;
            const articleIsIndef = articleTypeUID === '1';
            const articleIsOhne = articleTypeUID === '2';
            isInvalid = (
                (nounIsPlural && articleIsIndef) ||
                (!nounIsPlural && articleIsOhne)
            );
        } while (isInvalid);

        const article = this.randomByType(articleTypeUID);
        return article;
    }

    getSuffix (grammarCase, objectGender) {
        const { type } = this;
        const articleSuffix = find(conjugationTable.articles.list, {
            objectGender, grammarCase, articleType: type
        });

        if (articleSuffix.text === null) {
            const errObj = { type, objectGender };
            throw Error(`Article: Given object gender and article type are incompatable ${ JSON.stringify(errObj) }`);
        }

        return articleSuffix;
    }

    compose (grammarCase, objectGender) {
        const { text, articleType } = this.getSuffix(grammarCase, objectGender);

        const composition = {
            type: articleType,
            translations: this.translations,
            chunks: [
                new WordChunk(this.root),
                new WordChunk(text)
            ]
        };


        return composition;
    }

}