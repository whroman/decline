"use strict";

const GrammarConstruct = require("./../GrammarConstruct.js");
const UniqueList = require("./../UniqueList.js");

class AdjectiveSuffix extends GrammarConstruct {}

class AdjectiveSuffixes extends UniqueList {
    constructor () {
        super();
        this.Model = AdjectiveSuffix;
    }
}

module.exports = AdjectiveSuffixes;