"use strict";

const _ = require("underscore");

class Collection {

    addMany () {
        _.each(arguments, (argument) => {
            this.add(...argument);
        });
    }

}

module.exports = Collection;