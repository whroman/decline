"use strict";

const Adjective = require("./Classes/Models/Adjective.js");
const GrammarObject = require("./Classes/Models/GrammarObject.js");

const Phrase = require("./Classes/Models/Phrase.js");

const dog = new GrammarObject("Hunde", 0);
const schnell = new Adjective("schnell");

const foo = new Phrase(dog, schnell);

console.log(foo.conjugate(0,0));
