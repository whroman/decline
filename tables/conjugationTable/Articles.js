import GrammarConstruct from './../util/GrammarConstruct.js';
import UniqueList from './../util/UniqueList.js';

class Article extends GrammarConstruct {}

export default class Articles extends UniqueList {
    constructor () {
        super();
        this.Model = Article;
    }
}
