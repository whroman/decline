"use strict";

const grammarObjects = require("./data/grammarObjects.js");
const adjectives = require("./data/adjectives.js");

const Phrase = require("./Classes/Models/Phrase.js");

const foo = new Phrase(grammarObjects[0], adjectives[0]);

console.log(foo.conjugate(0,0));
