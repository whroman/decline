import { find } from 'lodash';
import getRandomItem from 'generator/util/getRandomItem';
import assertStringsDefined from 'generator/util/assertStringsDefined.js';
import WordChunk from 'generator/WordChunk/WordChunk.js';

// Tables
import adjectives from 'tables/adjectives/roots/data';
import conjugationTable from 'tables/conjugationTable/data.js';

export default class Adjective {

    constructor ({ root, translations={} }) {
        assertStringsDefined({ root });
        Object.assign(this, { root, translations });
    }

    static random ({ category }) {
        const filteredAdjectives = adjectives.filter((adjective) => {
                if (typeof category !== 'string') return true;
                const itBelongs = adjective.categories.includes(0);
                return itBelongs;
            });

        const rawAdj = getRandomItem(filteredAdjectives);
        const adj = new Adjective({
            root: rawAdj.text,
            translations: rawAdj.translations
        });

        return adj;
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

        const composition = {
            translations: this.translations,
            chunks: [
                new WordChunk(this.root),
                new WordChunk(text)
            ]
        };

        return composition;
    }

}
