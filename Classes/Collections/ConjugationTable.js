"use strict";

const _ = require("underscore");

const GrammarItem = require("./../Models/GrammarItem.js");
const Collection = require("./Collection.js");
const UniqueList = require("./UniqueList.js");

class Article extends GrammarItem {}

class AdjectiveSuffix extends GrammarItem {}

class Articles extends UniqueList {
    constructor () {
        super();
        this.Model = Article;
    }
}

class AdjectiveSuffixes extends UniqueList {
    constructor () {
        super();
        this.Model = AdjectiveSuffix;
    }
}

class ConjugationTable extends Collection {

    constructor () {
        super();
        this.articles = new Articles();
        this.adjSuffixes = new AdjectiveSuffixes();
    }

    add (
        articleText, adjSuffixText,
        objectGender, articleType, isPlural, grammarCase
    ) {
        const data = [objectGender, articleType, isPlural, grammarCase];
        const artData = _.clone(data);
        const suffixData = _.clone(data);
        artData.unshift(articleText);
        suffixData.unshift(adjSuffixText);

        this.articles.add(...artData);
        this.adjSuffixes.add(...suffixData);
    }

}

module.exports = ConjugationTable;