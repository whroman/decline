import articleTypes from './../articles/types/data';
import nounGenders from './../nouns/genders/data';

const grammarCases = ['nominative', 'accusative', 'dative', 'genitive'];

export default class GrammarConstruct {

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
        return nounGenders[this.objectGender];
    }

    getArticleType () {
        return articleTypes[this.articleType];
    }

}
