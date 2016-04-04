"use strict";

const _ = require("underscore");
const Collection = require("./Collection.js");

class UniqueList extends Collection {

    constructor (Model) {
        super();
        this.list = [];
        _.extend(this, _(this.list))
        this.Model = Model;
    }

    add () {
        const instance = new this.Model(...arguments);
        this.list.push(instance);
        return this;
    }

}

module.exports = UniqueList;