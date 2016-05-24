import Collection from './Collection.js';

export default class UniqueList extends Collection {

    constructor (Model) {
        super();
        this.list = [];
        this.Model = Model;
    }

    add () {
        const instance = new this.Model(...arguments);
        this.list.push(instance);
        return this;
    }

}
