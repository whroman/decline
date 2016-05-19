import articleTypes from "./../../fixtures/articleTypes";
import genders from "./../../fixtures/genders";

const grammarCases = ["nominative", "accusative", "dative", "genitive"];

class GrammarConstruct {

    constructor (text, objectGender, articleType, grammarCase) {
        this.text = text;
        this.grammarCase = grammarCase;
        this.objectGender = objectGender;
        this.articleType = articleType;
    }

    getGrammarCase () {
        return grammarCases[this.grammarCase];
    }

    getGender () {
        return genders[this.objectGender];
    }

    getArticleType () {
        return articleTypes[this.articleType];
    }

}

module.exports = GrammarConstruct;
