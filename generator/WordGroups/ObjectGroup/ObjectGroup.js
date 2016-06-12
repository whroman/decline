const space = () => ({
    type: 'space',
    text: ' '
});

export default class ObjectGroup {

    constructor ({ article, adjective, noun }) {
        Object.assign(this, { article, adjective, noun });
    }

    compose (kasus) {
        const { gender } = this.noun;
        const { type } = this.article;
        const items = {
            article: this.article.compose(kasus, gender),
            adjective: this.adjective.compose(kasus, gender, type),
            noun: this.noun.compose(kasus)
        };

        return items;
    }

    flatten (kasus) {
        const composition = this.compose(kasus);
        const { adjective, noun } = composition;
        if (!noun) throw Error('shouldn\'t occur');

        const article = composition.article.chunks.reduce((memo, { text }) => {
            return memo + text;
        }, '');

        const adjRoot = adjective.chunks[0];
        const adjSuffix = adjective.chunks[1];
        const nounText = noun.chunks[0].text;

        const startChunks = article ? [
            {
                type: 'article',
                text: article
            },
            space()
        ] : [];

        const flattened = startChunks.concat([
            {
                type: 'adjectiveRoot',
                text: adjRoot.text,
                translations: adjective.translations
            },
            {
                type: 'adjectiveSuffix',
                text: adjSuffix.text,
                stub: adjSuffix.stub
            },
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