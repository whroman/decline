import { find } from 'lodash';
import conjugationTable from "./../../tables/conjugationTable/data.js";

export default class Noun {

    constructor (rawNoun) {
        const { text, gender, translations, categories } = rawNoun;
        Object.assign(this, {
            text, gender, translations, categories,
            articleInstance: null,
            adjectiveInstances: []
        });
    };

    compose (grammarCase, adj) {
        const article = this.getArticle(grammarCase);

        const adjWords = this.adjectiveInstances.map((adj) => {
            const { text, translations } = adj;
            const suffix = adj.findSuffix(this.gender, article.articleType, grammarCase)
            return {
                type: 'adjective',
                translations,
                chunks: [
                    {
                        type: "root",
                        text
                    },
                    {
                        type: 'suffix',
                        text: suffix.text
                    }
                ]
            }
        });

        const words = [
            {
                type: 'article',
                id: article.articleType,
                text: article.conjugation
            }
        ].concat(adjWords).concat([{
            type: 'object',
            text: this.conjugation
        }]);

        return words;
    }

    conjugate (grammarCase) {
        const { gender } = this;
        let nounText = this.text;

        const isDative = grammarCase === 2;
        const isGenitive = grammarCase === 3;
        const isPlural = gender === 3;

        if (isDative) {
            if (isPlural) {
                const len = nounText.length - 1;
                if (nounText[len] === "e") nounText = nounText.substring(0, len);
            }
        } else if (isGenitive) {
            const isMaleOrNeutral = gender === 0 || gender === 2;
            if (isMaleOrNeutral) {
                nounText = nounText + "es";
            }
        }

        this.conjugation = nounText;

        const { type, root } = this.articleInstance;
        const article = this.getArticle(grammarCase);


        const artIsIndefinite = article.type === 1;
        if (isPlural && artIsIndefinite) throw Error('FUCK');

        const text = this.compose(grammarCase, this.adjectiveInstances);

        return text;
    }

    getArticle (grammarCase) {
        const articleType = this.articleInstance.type;
        const articleRoot = this.articleInstance.root;
        const findParams = {
            grammarCase, articleType,
            objectGender: this.gender
        };
        console.log(findParams)
        const article = find(conjugationTable.articles.list, findParams);

        if (article.text === null) throw Error('Invalid `findParams`: ' + JSON.stringify(findParams));

        let conjugation;

        if ((articleType === 1 || articleType === 3) && article.text !== null) {
            conjugation = articleRoot + article.text;
        } else {
            conjugation = article.text;
        }

        return Object.assign(article, { conjugation });
    }

    setAdjective (adjInstance) {
        this.adjectiveInstances.push(adjInstance);
    }

    setArticle (articleInstance) {
        Object.assign(this, { articleInstance });
    }
}
