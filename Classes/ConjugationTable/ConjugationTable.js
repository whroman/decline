"use strict";

const _ = require("underscore");

const Collection = require("./../Collection.js");
const Articles = require("./../GrammarConstructs/Articles/Articles.js");
const AdjectiveSuffixes = require("./../GrammarConstructs/AdjectiveSuffixes/AdjectiveSuffixes.js");

class ConjugationTable extends Collection {

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
        const artData = _.clone(data);
        const suffixData = _.clone(data);
        artData.unshift(articleText);
        suffixData.unshift(adjSuffixText);

        this.articles.add(...artData);
        this.adjSuffixes.add(...suffixData);
    }

}

module.exports = ConjugationTable;