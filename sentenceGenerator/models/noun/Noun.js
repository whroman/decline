import { find } from 'lodash';
import conjugationTable from 'tables/conjugationTable/data.js';

export default class Noun {

    constructor ({ text, gender, translations, categories }) {
        Object.assign(this, {
            text, gender, translations, categories,
            articleInstance: null,
            adjectiveInstances: []
        });
    }

    getComposedAdjectives (articleType, grammarCase) {
        const composed = this.adjectiveInstances.map((adj) => {
            return adj.compose(this.gender, articleType, grammarCase);
        });

        return composed;
    }

    compose (grammarCase) {
        const article = this.getArticle(grammarCase);
        const composedAdjs = this.getComposedAdjectives(article.type, grammarCase);

        const words = [
            {
                type: 'article',
                id: article.type,
                text: article.conjugation
            }
        ].concat(composedAdjs).concat([{
            type: 'object',
            text: this.conjugation
        }]);

        return words;
    }

    conjugate (grammarCase) {
        const { gender } = this;
        let nounText = this.text;

        const isDative = grammarCase === '2';
        const isGenitive = grammarCase === '3';
        const isPlural = gender === '3';

        if (isDative) {
            if (isPlural) {
                const len = nounText.length - 1;
                if (nounText[len] === 'e') nounText = nounText.substring(0, len);
            }
        } else if (isGenitive) {
            const isMaleOrNeutral = gender === '0' || gender === '2';
            if (isMaleOrNeutral) {
                nounText = nounText + 'es';
            }
        }

        this.conjugation = nounText;
        const article = this.getArticle(grammarCase);
        const artIsIndefinite = article.type === '1';
        if (isPlural && artIsIndefinite) throw Error('FUCK');

        const text = this.compose(grammarCase, this.adjectiveInstances);

        return text;
    }

    getArticle (grammarCase) {
        const articleType = this.articleInstance.type;
        const articleRoot = this.articleInstance.root;
        const conjugation = this.articleInstance.conjugate(grammarCase, this.gender);
        return Object.assign(this.articleInstance, { conjugation });
    }

    setAdjective (adjInstance) {
        this.adjectiveInstances.push(adjInstance);
    }

    setArticle (articleInstance) {
        Object.assign(this, { articleInstance });
    }
}
