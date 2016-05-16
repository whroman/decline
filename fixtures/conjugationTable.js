import { find } from "lodash";

const ConjugationTable = require("./../src/grammar/ConjugationTable/ConjugationTable.js");
const conjugationTable = new ConjugationTable();

const adjSuffixTable = [
//  Arguments
/*
    adjective suffix
            objectGender
               articleType
                  grammarCase
*/
    // Nominative
    ["e",    0, 0, 0],
    ["e",    1, 0, 0],
    ["e",    2, 0, 0],
    ["en",   3, 0, 0],

    ["er",   0, 1, 0],
    ["e",    1, 1, 0],
    ["es",   2, 1, 0],
    [null,   3, 1, 0],

    ["er",   0, 2, 0],
    ["e",    1, 2, 0],
    ["es",   2, 2, 0],
    ["e",    3, 2, 0],

    ["er",   0, 3, 0],
    ["e",    1, 3, 0],
    ["es",   2, 3, 0],
    ["en",   3, 3, 0],

    // Accusative
    ["en",   0, 0, 1],
    ["e",    1, 0, 1],
    ["e",    2, 0, 1],
    ["en",   3, 0, 1],

    ["en",   0, 1, 1],
    ["e",    1, 1, 1],
    ["es",   2, 1, 1],
    [null,   3, 1, 1],

    ["en",   0, 2, 1],
    ["e",    1, 2, 1],
    ["es",   2, 2, 1],
    ["e",    3, 2, 1],

    ["en",   0, 3, 1],
    ["e",    1, 3, 1],
    ["es",   2, 3, 1],
    ["en",   3, 3, 1],

    // Dative
    ["en",   0, 0, 2],
    ["en",   1, 0, 2],
    ["en",   2, 0, 2],
    ["en",   3, 0, 2],

    ["en",   0, 1, 2],
    ["en",   1, 1, 2],
    ["en",   2, 1, 2],
    [null,   3, 1, 2],

    ["em",   0, 2, 2],
    ["er",   1, 2, 2],
    ["em",   2, 2, 2],
    ["en",   3, 2, 2],

    ["en",   0, 3, 2],
    ["en",   1, 3, 2],
    ["en",   2, 3, 2],
    ["en",   3, 3, 2],

    // Genitive
    ["en",   0, 0, 3],
    ["en",   1, 0, 3],
    ["en",   2, 0, 3],
    ["en",   3, 0, 3],

    ["en",   0, 1, 3],
    ["en",   1, 1, 3],
    ["en",   2, 1, 3],
    [null,   3, 1, 3],

    ["en",   0, 2, 3],
    ["er",   1, 2, 3],
    ["en",   2, 2, 3],
    ["er",   3, 2, 3],

    ["en",   0, 3, 3],
    ["en",   1, 3, 3],
    ["en",   2, 3, 3],
    ["en",   3, 3, 3]

];

const articleSuffixTable = [
//  Arguments
/*
    article
                objectGender
                   articleType
                      grammarCase
*/
    // Nominative
    ["der",     0, 0, 0],
    ["die",     1, 0, 0],
    ["das",     2, 0, 0],
    ["die",     3, 0, 0],

    ["",        0, 1, 0],
    ["e",       1, 1, 0],
    ["",        2, 1, 0],
    [null,      3, 1, 0],

    ["",        0, 2, 0],
    ["",        1, 2, 0],
    ["",        2, 2, 0],
    ["",        3, 2, 0],

    ["",        0, 3, 0],
    ["e",       1, 3, 0],
    ["",        2, 3, 0],
    ["e",       3, 3, 0],

    // Accusative
    ["den",     0, 0, 1],
    ["die",     1, 0, 1],
    ["das",     2, 0, 1],
    ["die",     3, 0, 1],

    ["en",      0, 1, 1],
    ["e",       1, 1, 1],
    ["",        2, 1, 1],
    [null,      3, 1, 1],

    ["",        0, 2, 1],
    ["",        1, 2, 1],
    ["",        2, 2, 1],
    ["",        3, 2, 1],

    ["en",      0, 3, 1],
    ["e",       1, 3, 1],
    ["",        2, 3, 1],
    ["e",       3, 3, 1],

    // Dative
    ["dem",     0, 0, 2],
    ["der",     1, 0, 2],
    ["dem",     2, 0, 2],
    ["den",     3, 0, 2],

    ["em",      0, 1, 2],
    ["er",      1, 1, 2],
    ["em",      2, 1, 2],
    [null,      3, 1, 2],

    ["",        0, 2, 2],
    ["",        1, 2, 2],
    ["",        2, 2, 2],
    ["",        3, 2, 2],

    ["em",      0, 3, 2],
    ["er",      1, 3, 2],
    ["em",      2, 3, 2],
    ["en",      3, 3, 2],

    // Genitive
    ["des",     0, 0, 3],
    ["der",     1, 0, 3],
    ["des",     2, 0, 3],
    ["der",     3, 0, 3],

    ["es",      0, 1, 3],
    ["er",      1, 1, 3],
    ["es",      2, 1, 3],
    [null,      3, 1, 3],

    ["",        0, 2, 3],
    ["",        1, 2, 3],
    ["",        2, 2, 3],
    ["",        3, 2, 3],

    ["es",      0, 3, 3],
    ["er",      1, 3, 3],
    ["es",      2, 3, 3],
    ["er",      3, 3, 3]
];

const table = articleSuffixTable.slice().map((row) => {
    const foundAdjRow = find(adjSuffixTable, (adjRow) => {
        return (
            row[1] === adjRow[1] &&
            row[2] === adjRow[2] &&
            row[3] === adjRow[3]
        );
    });

    return [row[0], foundAdjRow[0], row[1], row[2], row[3] ];
});

conjugationTable.addMany(table);

export default conjugationTable;