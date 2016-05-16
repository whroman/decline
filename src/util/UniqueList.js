const Collection = require("./Collection.js");

class UniqueList extends Collection {

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

module.exports = UniqueList;
