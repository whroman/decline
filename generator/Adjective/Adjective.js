import { find } from 'lodash';
import assertStringsDefined from './../util/assertStringsDefined.js';
import conjugationTable from 'tables/conjugationTable/data.js';
import WordChunk from './../WordChunk/WordChunk.js';

export default class Adjective {

    constructor (root) {
        assertStringsDefined({ root });
        Object.assign(this, { root });
    }


    getSuffix (objectGender, articleType, grammarCase) {
        const adjSuffix = find(conjugationTable.adjSuffixes.list, {
            objectGender,
            articleType,
            grammarCase
        });

        if (adjSuffix.text === null) {
            const errObj = { objectGender, articleType };
            throw Error(`Adjective Suffix: Given object gender and article type are incompatable ${errObj}`);
        }

        return adjSuffix;
    }

    compose (objectGender, articleType, grammarCase) {
        const { text } = this.getSuffix(objectGender, articleType, grammarCase);

        const composition = [
            new WordChunk(this.root),
            new WordChunk(text)
        ];

        return composition;
    }


}
