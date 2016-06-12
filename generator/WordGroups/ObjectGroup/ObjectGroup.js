import Article from 'generator/Words/Article/Article';
import Noun from 'generator/Words/Noun/Noun';
import Adjective from 'generator/Words/Adjective/Adjective';

const space = () => ({
    type: 'space',
    text: ' '
});

export default class ObjectGroup {

    constructor ({ article = null, adjective = null, noun = null }) {
        Object.assign(this, { article, adjective, noun });
    }

    static random ({ gender, category, include = [
        'adjective', 'noun', 'article'
    ] }) {
        const props = {
            adjective: include.includes('adjective') ? Adjective.random() : null,
            noun: include.includes('noun') ? Noun.random({ gender, category }) : null,
            article: include.includes('article') ? Article.randomByGender(gender) : null,
        };

        const objectGroup = new ObjectGroup(props);
        return objectGroup;
    }

    compose (kasus) {
        const { gender } = this.noun;
        const { type } = this.article;

        const items = {};
        if (this.article) items.article = this.article.compose(kasus, gender);
        if (this.adjective) items.adjective = this.adjective.compose(kasus, gender, type);
        if (this.noun) items.noun = this.noun.compose(kasus);

        return items;
    }

    flatten (kasus) {
        const composition = this.compose(kasus);
        const { adjective, noun } = composition;
        if (!noun) throw Error('shouldn\'t occur');

        const article = composition.article.chunks.reduce((memo, { text }) => {
            return memo + text;
        }, '');

        const nounText = noun.chunks[0].text;

        const startChunks = article ? [
            {
                type: 'article',
                text: article
            },
            space()
        ] : [];

        const adjChunks = adjective ? [
            {
                type: 'adjectiveRoot',
                text: adjective.chunks[0].text,
                translations: adjective.translations
            },
            {
                type: 'adjectiveSuffix',
                text: adjective.chunks[1].text,
                stub: adjective.chunks[1].stub
            }
        ] : [];

        const flattened = startChunks
            .concat(adjChunks)
            .concat([
                space(),
                {
                    type: 'noun',
                    text: nounText,
                    gender: noun.gender,
                    translations: noun.translations
                }
            ]);

        return flattened;
    }

    flattenWithStubbedAdjSuffix (kasus) {
        const flattened = this.flatten(kasus).map((item) => {
            if (item.type === 'adjectiveSuffix') {
                item.type = 'input';
                item.value = item.text;
                item.text = item.stub;
            }

            return item;
        });

        return flattened;
    }

}