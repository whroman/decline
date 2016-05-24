import Collection from "./../util/Collection.js";
import Articles from "./Articles.js";
import AdjectiveSuffixes from "./AdjectiveSuffix.js";

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
        const artData = data.slice();
        const suffixData = data.slice();
        artData.unshift(articleText);
        suffixData.unshift(adjSuffixText);

        this.articles.add(...artData);
        this.adjSuffixes.add(...suffixData);
    }

}
