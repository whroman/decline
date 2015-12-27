"use strict";

const Noun = require("./../../Classes/Noun/Noun.js");

const nouns = [
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

const instances = nouns.map((genderedNoun) => {
    return new Noun(...genderedNoun);
});

module.exports = instances;