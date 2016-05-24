import { find } from 'lodash';

import ConjugationTable from './ConjugationTable.js';
import articleSuffixes from './../articleSuffixes/data.js';
import adjectiveSuffixes from './../adjectiveSuffixes/data.js';

const conjugationTable = new ConjugationTable();

const table = articleSuffixes.slice().map((row) => {
    const foundAdjRow = find(adjectiveSuffixes, (adjRow) => {
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