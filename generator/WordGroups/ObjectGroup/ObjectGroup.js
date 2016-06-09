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
        const items = [
            this.article.compose(kasus, gender),
            this.adjective.compose(kasus, gender, type),
            this.noun.compose(kasus)
        ];
        console.log(items);
        return items;
    }

}