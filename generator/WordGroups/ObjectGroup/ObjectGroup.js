export default class ObjectGroup {

    constructor ({ article, adjective, noun }) {
        Object.assign(this, {
            article,
            adjective,
            noun
        });
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

}