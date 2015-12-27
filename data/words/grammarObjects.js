"use strict";

const GrammarObject = require("./../../Classes/Models/GrammarObject.js");

const grammarObjects = [
    // People
    ["Mann",    0],
    ["Männer",  3],
    ["Frau",    1],
    ["Fraun",   3],
    ["Kind",    2],
    ["Kinder",  3],

    // Animals
    ["Hund",    0],
    ["Hündin",  1],
    ["Hunde",   3],
    ["Kater",   0],
    ["Katze",   1],
    ["Katzen",  3],
    ["Maus",    1],
    ["Mäuse",   3]

];

const instances = grammarObjects.map((gO) => {
    return new GrammarObject(...gO);
});

module.exports = instances;