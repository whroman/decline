import GrammarConstruct from "./../../util/GrammarConstruct.js";
import UniqueList from "./../../util/UniqueList.js";

class AdjectiveSuffix extends GrammarConstruct {}

class AdjectiveSuffixes extends UniqueList {
    constructor () {
        super();
        this.Model = AdjectiveSuffix;
    }
}

module.exports = AdjectiveSuffixes;