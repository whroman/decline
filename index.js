"use strict";

const randomPhrase = require("./Classes/Models/randomPhrase.js");

const randomConjugation = randomPhrase.getOne().conjugate(0, 0, [
    "adj"
]);

console.log(randomConjugation.text);
console.log(randomPhrase.nominative().text);
console.log(randomPhrase.accusative().text);
