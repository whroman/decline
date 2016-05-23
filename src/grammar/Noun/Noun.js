import { find } from 'lodash';
import conjugationTable from "./../../../fixtures/conjugationTable.js";

function compose (art, adj, noun) {
    const sentence = [ art, adj, noun]
        // Strip out undefined values
        .filter((item) => item)
        // Return string
        .join(" ");

    return sentence;
}

class Noun {

    constructor (text, eng, gender, categories) {
        Object.assign(this, {
            text, gender, categories,
            translations: { eng },
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

        // console.log(article)

        const words = [
            {
                type: 'article',
                text: article.conjugation
            }
        ].concat(adjWords).concat([{
            type: 'object',
            text: this.conjugation
        }]);

        // const sentence = {
        //     words,
        //     text: words
        //         .map((partOfSpeech) => {
        //             partOfSpeech.text
        //         })
        //         // Strip out undefined values
        //         .filter((item) => item)
        //         .join(' ')
        // };

        // console.log('sentence');
        // console.log(sentence);

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

        console.log('nounText', nounText)
        this.conjugation = nounText;

        const { type, root } = this.articleInstance;
        const article = this.getArticle(grammarCase);


        const artIsIndefinite = article.type === 1;
        if (isPlural && artIsIndefinite) throw Error('FUCK');

        const text = this.compose(grammarCase, this.adjectiveInstances);


        // const conjugation = {
        //     text: text.text,
        //     stubbed: {
        //         text: this.compose(grammarCase, conjugatedAdjectives.reduce((memo, conjAdj) => {
        //             return memo + conjAdj.stubbed.text
        //         }, '')).text,
        //         stubbedValue: this.compose(grammarCase, conjugatedAdjectives.reduce((memo, conjAdj) => {
        //             return memo + conjAdj.stubbed.stubbedValue
        //         }, '')).text
        //     },
        //     stubbedSuffix: {
        //         text: this.compose(grammarCase, conjugatedAdjectives.reduce((memo, conjAdj) => {
        //             return memo + conjAdj.stubbedSuffix.text
        //         }, '')).text,
        //         stubbedValue: this.compose(grammarCase, conjugatedAdjectives.reduce((memo, conjAdj) => {
        //             return memo + conjAdj.stubbedSuffix.stubbedValue
        //         }, '')).text
        //         // conjugatedAdjectives.stubbedSuffix.stubbedValue
        //     }
        // };

        console.log('99123i4123182383')
        console.log(text)
        // console.log(conjugation)
        console.log(article)

        return text;
    }

    getArticle (grammarCase) {
        const articleType = this.articleInstance.type;
        const articleRoot = this.articleInstance.root;


        const foo = this.articleInstance.conjugate(grammarCase, this.gender);

        const article = find(conjugationTable.articles.list, {
            objectGender: this.gender,
            grammarCase, articleType
        });

        if ((articleType === 1 || articleType === 3) && article.text !== null) {
            article.conjugation = articleRoot + article.text;
        }

        // console.log(articleRoot, articleType, article.conjugation, article.text);
        article.conjugation = article.conjugation || '';

        return article;
    }

    setAdjective (adjInstance) {
        this.adjectiveInstances.push(adjInstance);
    }

    setArticle (articleInstance) {
        Object.assign(this, { articleInstance });
    }

}

module.exports = Noun;