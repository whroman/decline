"use strict";

const GrammarConstruct = require("./../../util/GrammarConstruct.js");
const UniqueList = require("./../../util/UniqueList.js");

class Article extends GrammarConstruct {}

class Articles extends UniqueList {
    constructor () {
        super();
        this.Model = Article;
    }
}

module.exports = Articles;