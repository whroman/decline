"use strict";

const Phrase = require("./Classes/Models/Phrase.js");

const foo = new Phrase("Hunde", 0, 1, "schnell");

console.log(foo.conjugate(0,0));
