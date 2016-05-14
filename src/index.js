"use strict";

const randomPhrase = require("./grammar/Phrase/randomPhrase.js");

const randomConjugation = randomPhrase.getOne().conjugate(0);

console.log(randomConjugation);
console.log(randomPhrase.nominative());
console.log(randomPhrase.accusative());
