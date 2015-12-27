"use strict";

const randomPhrase = require("./singletons/randomPhrase/randomPhrase.js");

const randomConjugation = randomPhrase.getOne().conjugate(0, 0);

console.log(randomConjugation.text);
console.log(randomPhrase.nominative().text);
console.log(randomPhrase.accusative().text);
