import Collection from './../util/Collection.js';
import Articles from './Articles.js';
import AdjectiveSuffixes from './AdjectiveSuffix.js';

export default class ConjugationTable extends Collection {

    constructor () {
        super();
        this.articles = new Articles();
        this.adjSuffixes = new AdjectiveSuffixes();
    }

    add (
        articleText, adjSuffixText,
        objectGender, articleType, grammarCase
    ) {
        const data = [objectGender, articleType, grammarCase];
        const artData = [articleText].concat(data);
        const suffixData = [adjSuffixText].concat(data);
        this.articles.add(...artData);
        this.adjSuffixes.add(...suffixData);
    }

}
