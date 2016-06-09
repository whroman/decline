import { find } from 'lodash';
import conjugationTable from 'tables/conjugationTable/data.js';
import assertStringsDefined from 'generator/util/assertStringsDefined.js';
import WordChunk from 'generator/WordChunk/WordChunk.js';

export default class Adjective {

    constructor ({ root, translations={} }) {
        assertStringsDefined({ root });
        Object.assign(this, { root, translations });
    }


    getSuffix (objectGender, articleType, grammarCase) {
        const adjSuffix = find(conjugationTable.adjSuffixes.list, {
            objectGender,
            articleType,
            grammarCase
        });

        if (adjSuffix.text === null) {
            const errObj = { objectGender, articleType };
            throw Error(`Adjective Suffix: Given object gender and article type are incompatable ${ JSON.stringify(errObj) }`);
        }

        return adjSuffix;
    }

    compose (grammarCase, objectGender, articleType) {
        const { text } = this.getSuffix(objectGender, articleType, grammarCase);

        const composition = [
            new WordChunk(this.root),
            new WordChunk(text)
        ];

        return composition;
    }

}
