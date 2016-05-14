"use strict";

const _ = require("underscore");

class Collection {

    addMany (arrayToAdd) {
        _.each(arrayToAdd, (argument) => {
            this.add(...argument);
        });
    }

}

module.exports = Collection;