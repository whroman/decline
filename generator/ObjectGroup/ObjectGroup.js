export default class ObjectGroup {

    constructor ({ article, adjective, directObject }) {
        Object.assign(this, {
            article,
            adjective,
            directObject
        });
    }

    compose (kasus) {
        const { gender } = this.directObject;
        const { type } = this.article;
        const items = [
            this.article.compose(kasus, gender),
            this.adjective.compose(kasus, gender, type),
            this.directObject.compose(kasus)
        ];
        return items;
    }

}