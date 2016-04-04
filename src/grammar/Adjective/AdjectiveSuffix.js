"use strict";

const GrammarConstruct = require("./../../util/GrammarConstruct.js");
const UniqueList = require("./../../util/UniqueList.js");

class AdjectiveSuffix extends GrammarConstruct {}

class AdjectiveSuffixes extends UniqueList {
    constructor () {
        super();
        this.Model = AdjectiveSuffix;
    }
}

module.exports = AdjectiveSuffixes;