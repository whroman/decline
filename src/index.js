"use strict";

const randomPhrase = require("./grammar/Phrase/randomPhrase.js");

const randomConjugation = randomPhrase.getOne().conjugate(0, 0);

console.log(randomConjugation.text);
console.log(randomPhrase.nominative().text);
console.log(randomPhrase.accusative().text);
