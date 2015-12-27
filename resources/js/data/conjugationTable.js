"use strict";

const ConjugationTable = require("./../Classes/ConjugationTable/ConjugationTable.js");
const conjugationTable = new ConjugationTable();

conjugationTable.addMany(
//  Arguments
/*
    article
            adjective suffix
                    objectGender
                       articleType
                          grammarCase
*/
    // Nominative
    ["der",     "e",    0, 0, 0],
    ["die",     "e",    1, 0, 0],
    ["das",     "e",    2, 0, 0],
    ["die",     "en",   3, 0, 0],

    ["",     "er",      0, 1, 0],
    ["e",    "e",       1, 1, 0],
    ["",     "es",      2, 1, 0],
    [null,      null,   2, 1, 0],

    ["",        "er",   0, 2, 0],
    ["",        "es",   1, 2, 0],
    ["",        "e",    2, 2, 0],
    ["",        "e",    3, 2, 0],

    // Accusative
    ["den",     "en",   0, 0, 1],
    ["die",     "e",    1, 0, 1],
    ["das",     "e",    2, 0, 1],
    ["die",     "en",   3, 0, 1],

    ["en",   "en",      0, 1, 1],
    ["e",    "e",       1, 1, 1],
    ["",     "es",      2, 1, 1],
    [null,      null,   3, 1, 1],

    ["",    "en",   0, 2, 1],
    ["",    "es",   1, 2, 1],
    ["",    "e",    2, 2, 1],
    ["",    "e",    3, 2, 1],

    // Dative
    ["dem", "en",   0, 0, 2],
    ["der", "en",   1, 0, 2],
    ["dem", "en",   2, 0, 2],
    ["den", "en",   3, 0, 2],

    ["em",  "en",   0, 1, 2],
    ["er",  "en",   1, 1, 2],
    ["em",  "en",   2, 1, 2],
    [null,  null,   3, 1, 2],

    ["",    "em",   0, 2, 2],
    ["",    "er",   1, 2, 2],
    ["",    "em",   2, 2, 2],
    ["",    "en",   3, 2, 2],

    // Genitive
    ["des", "en",   0, 0, 1],
    ["der", "en",   1, 0, 1],
    ["das", "en",   2, 0, 1],
    ["der", "en",   3, 0, 1],

    ["es",  "en",   0, 1, 1],
    ["er",  "en",   1, 1, 1],
    ["es",  "en",   2, 1, 1],
    [null,  null,   3, 1, 1],

    ["",    "en",   0, 2, 1],
    ["",    "er",   1, 2, 1],
    ["",    "en",   2, 2, 1],
    ["",    "er",   3, 2, 1]

);

module.exports = conjugationTable;