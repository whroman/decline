"use strict";

const ConjugationTable = require("./../Classes/Collections/ConjugationTable.js");
const conjugationTable = new ConjugationTable();

conjugationTable.addMany(
//  Arguments
/*
    article
                adjective suffix
                        objectGender
                           articleType
                              isPlural
                                 grammarCase
*/
    // Nominative
    ["der",     "e",    0, 0, 0, 0],
    ["die",     "e",    1, 0, 0, 0],
    ["das",     "e",    2, 0, 0, 0],

    ["ein",     "er",   0, 1, 0, 0],
    ["eine",    "e",    1, 1, 0, 0],
    ["ein",     "es",   2, 1, 0, 0],

    ["",        "er",   0, 2, 0, 0],
    ["",        "es",   1, 2, 0, 0],
    ["",        "e",    2, 2, 0, 0],

    ["die",     "en",   0, 0, 1, 0],
    ["die",     "en",   1, 0, 1, 0],
    ["die",     "en",   2, 0, 1, 0],

    [null,      null,   0, 1, 1, 0],
    [null,      null,   1, 1, 1, 0],
    [null,      null,   2, 1, 1, 0],

    ["",        "e",    0, 2, 1, 0],
    ["",        "e",    1, 2, 1, 0],
    ["",        "e",    2, 2, 1, 0],

    // Accusative
    ["den",     "en",   0, 0, 0, 1],
    ["die",     "e",    1, 0, 0, 1],
    ["das",     "e",    2, 0, 0, 1],

    ["einen",   "en",   0, 1, 0, 1],
    ["eine",    "e",    1, 1, 0, 1],
    ["ein",     "es",   2, 1, 0, 1],

    ["",        "en",   0, 2, 0, 1],
    ["",        "es",   1, 2, 0, 1],
    ["",        "e",    2, 2, 0, 1],

    ["die",     "en",   0, 0, 1, 1],
    ["die",     "en",   1, 0, 1, 1],
    ["die",     "en",   2, 0, 1, 1],

    [null,      null,   0, 1, 1, 1],
    [null,      null,   1, 1, 1, 1],
    [null,      null,   2, 1, 1, 1],

    ["",        "e",    0, 2, 1, 1],
    ["",        "e",    1, 2, 1, 1],
    ["",        "e",    2, 2, 1, 1],

    // Dative
    ["dem",     "en",   0, 0, 0, 2],
    ["der",     "en",   1, 0, 0, 2],
    ["dem",     "en",   2, 0, 0, 2],

    ["einem",   "en",   0, 1, 0, 2],
    ["einer",   "en",   1, 1, 0, 2],
    ["einem",   "en",   2, 1, 0, 2],

    ["",        "em",   0, 2, 0, 2],
    ["",        "er",   1, 2, 0, 2],
    ["",        "em",   2, 2, 0, 2],

    ["den",     "en",   0, 0, 1, 2],
    ["den",     "en",   1, 0, 1, 2],
    ["den",     "en",   2, 0, 1, 2],

    [null,      null,   0, 1, 1, 2],
    [null,      null,   1, 1, 1, 2],
    [null,      null,   2, 1, 1, 2],

    ["",        "en",    0, 2, 1, 2],
    ["",        "en",    1, 2, 1, 2],
    ["",        "en",    2, 2, 1, 2],

    // Genitive
    ["des",     "en",   0, 0, 0, 1],
    ["der",     "en",   1, 0, 0, 1],
    ["das",     "en",   2, 0, 0, 1],

    ["eines",   "en",   0, 1, 0, 1],
    ["einer",   "en",   1, 1, 0, 1],
    ["eines",   "en",   2, 1, 0, 1],

    ["",        "en",   0, 2, 0, 1],
    ["",        "er",   1, 2, 0, 1],
    ["",        "en",   2, 2, 0, 1],

    ["der",     "en",   0, 0, 1, 1],
    ["der",     "en",   1, 0, 1, 1],
    ["der",     "en",   2, 0, 1, 1],

    [null,      null,   0, 1, 1, 1],
    [null,      null,   1, 1, 1, 1],
    [null,      null,   2, 1, 1, 1],

    ["",        "er",   0, 2, 1, 1],
    ["",        "er",   1, 2, 1, 1],
    ["",        "er",   2, 2, 1, 1]

);

module.exports = conjugationTable;