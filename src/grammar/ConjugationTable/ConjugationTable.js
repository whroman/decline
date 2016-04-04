"use strict";

const _ = require("underscore");

const Collection = require("./../../util/Collection.js");
const Articles = require("./../Articles/Articles.js");
const AdjectiveSuffixes = require("./../Adjective/AdjectiveSuffix.js");

const GrammarConstruct = require("./../../util/GrammarConstruct.js");
const UniqueList = require("./../../util/UniqueList.js");

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