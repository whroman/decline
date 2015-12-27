"use strict";

const GrammarConstruct = require("./GrammarConstruct.js");
const UniqueList = require("./UniqueList.js");

class Article extends GrammarConstruct {}

class Articles extends UniqueList {
    constructor () {
        super();
        this.Model = Article;
    }
}

module.exports = Articles;